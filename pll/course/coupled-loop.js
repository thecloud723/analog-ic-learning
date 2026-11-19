(() => {
  "use strict";
  const defaults={
    referenceHz:40e6, divider:125, resistanceOhm:4700, capacitanceF:100e-12, shuntF:0, pumpOutputResistanceOhm:0, upDelayNs:0, downDelayNs:0,
    pumpA:100e-6, firstReferenceNs:0, initialFeedbackCycles:0, voltageMin:.2, voltageMax:1.6, initialVoltage:.9,
    linear:[[.2,-70],[.9,0],[1.6,70]],
    curved:[[.2,-41],[.55,-25],[.9,0],[1.25,43],[1.6,110]],
  };
  function tuning(v,knots){
    const i=knots.findIndex(([x])=>v<=x+1e-12);
    if(i<=0)return knots[i===0?0:knots.length-1][1];
    const [x0,y0]=knots[i-1], [x1,y1]=knots[i];
    return y0+(y1-y0)*(v-x0)/(x1-x0);
  }
  // Constant pump current into Cp in parallel with the series R-C branch.
  // Public time arguments use ns, as does the feedback-edge scheduler.
  function shuntInterval(node, cap, current, resistance, capacitance, shunt) {
    const sum=capacitance+shunt;
    const tauNs=1e9*resistance*capacitance*shunt/sum;
    const slope=current/sum*1e-9;
    const equilibrium=current*resistance*capacitance/sum;
    const difference=node-cap;
    const amplitude=(difference-equilibrium)*capacitance/sum;
    const decay=dt=>-Math.expm1(-dt/tauNs);
    const control=dt=>node+slope*dt-amplitude*decay(dt);
    const internal=dt=>cap+slope*dt+amplitude*shunt/capacitance*decay(dt);
    const turningRatio=slope*tauNs/amplitude;
    const turningTime=turningRatio>0&&turningRatio<1?-tauNs*Math.log(turningRatio):Infinity;
    function meanControl(start, end) {
      const duration=end-start;
      const averageExponential=tauNs*decay(duration)/duration;
      return node+slope*(start+end)/2-amplitude*(1-Math.exp(-start/tauNs)*averageExponential);
    }
    return {control,internal,turningTime,meanControl};
  }

  // Finite pump output resistance is represented by a conductance to the bias
  // while a branch is active. Other CP states are open circuit.
  function resistiveShuntInterval(node, cap, current, resistance, capacitance, shunt, rout, bias) {
    const g=1/rout, seriesG=1/resistance, ns=1e-9;
    const trace=-(g+seriesG)/shunt*ns-seriesG/capacitance*ns;
    const determinant=g*seriesG/(shunt*capacitance)*ns*ns;
    const fast=(trace-Math.sqrt(Math.max(0,trace*trace-4*determinant)))/2;
    const slow=determinant/fast;
    const equilibrium=bias+current*rout;
    const components=(voltage, slope)=>{
      const displacement=voltage-equilibrium;
      const a=(slope-fast*displacement)/(slow-fast);
      return [a,displacement-a];
    };
    const [a,b]=components(node,(current-g*(node-bias)-seriesG*(node-cap))/shunt*ns);
    const [c,d]=components(cap,seriesG*(node-cap)/capacitance*ns);
    const control=dt=>node+a*Math.expm1(slow*dt)+b*Math.expm1(fast*dt);
    const internal=dt=>cap+c*Math.expm1(slow*dt)+d*Math.expm1(fast*dt);
    const ratio=-slow*a/(fast*b);
    const turningTime=ratio>0&&ratio<1?Math.log(ratio)/(fast-slow):Infinity;
    function meanVoltage(initial,slowAmplitude,fastAmplitude,start,end){
      const duration=end-start;
      const meanDelta=rate=>{
        const z=rate*duration;
        const average=Math.abs(z)<1e-5 ? z/2+z*z/6+z*z*z/24 : Math.expm1(z)/z-1;
        return Math.expm1(rate*start)+Math.exp(rate*start)*average;
      };
      return initial+slowAmplitude*meanDelta(slow)+fastAmplitude*meanDelta(fast);
    }
    const meanControl=(start,end)=>meanVoltage(node,a,b,start,end);
    const meanInternal=(start,end)=>meanVoltage(cap,c,d,start,end);
    return {control,internal,turningTime,meanControl,meanInternal};
  }

  function shuntIntegral(interval, knots, rateForVoltage, horizon) {
    const turning=interval.turningTime;
    const spans=turning<horizon?[[0,turning],[turning,horizon]]:[[0,horizon]];
    const cuts=[0];
    for(const [start,end] of spans){
      const a=interval.control(start),b=interval.control(end);
      // Each span is monotonic. Split at every VCO knot, including its two rails.
      const crossings=[];
      for(const [voltage] of knots){
        if(voltage<=Math.min(a,b)||voltage>=Math.max(a,b))continue;
        let lo=start,hi=end;
        for(let k=0;k<32;k++){
          const mid=(lo+hi)/2;
          if((interval.control(mid)<voltage)===(a<b))lo=mid;else hi=mid;
        }
        crossings.push((lo+hi)/2);
      }
      cuts.push(...crossings.sort((x,y)=>x-y),end);
    }
    return dt=>{
      let sum=0;
      for(let i=1;i<cuts.length&&cuts[i-1]<dt;i++){
        const start=cuts[i-1],end=Math.min(dt,cuts[i]);
        if(end>start)sum+=(end-start)*rateForVoltage(interval.meanControl(start,end));
      }
      return sum;
    };
  }

  function simulate({offset,mismatch,resetDelay,curve,duration=45,config,onEvent,onVcoEdge,nextDivider}){
    const {
      referenceHz,divider,resistanceOhm:resistance,capacitanceF:capacitance,shuntF:shunt,pumpA,pumpOutputResistanceOhm:rout,upDelayNs,downDelayNs,
      voltageMin:floor,voltageMax:ceiling,initialVoltage,firstReferenceNs,initialFeedbackCycles,linear,curved,
    }={...defaults,...config};
    const referenceNs=1e9/referenceHz, targetMHz=referenceHz*divider/1e6;
    const clip=v=>Math.max(floor,Math.min(v,ceiling));
    const knots=curve==="curved"?curved:linear;
    let capacitor=initialVoltage,t=0,phase=initialFeedbackCycles,nextFb=1,nextRef=firstReferenceNs,nextSample=0,reset=Infinity,up=false,dn=false;
    let control=initialVoltage, pumpUp=false, pumpDown=false;
    const pendingUp=[],pendingDown=[];
    const pumpCurrent=()=>pumpA*(Number(pumpUp)-(1-mismatch/100)*Number(pumpDown));
    const data=[];
    let nextVcoEdge=Math.floor(phase*divider)+1;
    let feedbackCount=0, feedbackIndex=0;
    // The divider latches a positive integer count for each feedback interval.
    const scheduleFeedback=()=>{
      const count=nextDivider(feedbackIndex++);
      if(!Number.isSafeInteger(count)||count<=0)throw new RangeError("Invalid feedback divider count");
      feedbackCount+=count;
      if(!Number.isSafeInteger(feedbackCount))throw new RangeError("Feedback edge count exceeds integer precision");
      return feedbackCount/divider;
    };
    if(nextDivider){
      nextFb=scheduleFeedback();
      if(phase>=nextFb)throw new RangeError("Initial phase reaches first feedback edge");
    }
    while(nextSample<=duration*1000){
      const current=pumpCurrent();
      const dv=current/capacitance*1e-9;
      const vAt=dt=>clip(clip(capacitor+dv*dt)+resistance*current);
      const limit=Math.min(nextRef,reset,nextSample,pendingUp[0]?.ns??Infinity,pendingDown[0]?.ns??Infinity);
      const interval=shunt
        ? (rout&&(pumpUp||pumpDown)
          ? resistiveShuntInterval(control,capacitor,current,resistance,capacitance,shunt,rout,initialVoltage)
          : shuntInterval(control,capacitor,current,resistance,capacitance,shunt))
        : null;
      const rate=dt=>(targetMHz+offset+tuning(vAt(dt),knots))/(1000*divider);
      // Within a CP state the effective voltage is piecewise linear.
      // Split at both clamps and each tuning-curve knot for exact trapezoids.
      const cuts=dv?[floor,ceiling,...knots.map(([v])=>v-resistance*current)]
        .map(v=>(v-capacitor)/dv).filter(dt=>dt>0).sort((a,b)=>a-b):[];
      const advanceSeries=dt=>{
        let sum=0,last=0;
        for(const point of cuts){
          if(point>=dt)break;
          sum+=(point-last)*(rate(last)+rate(point))/2;
          last=point;
        }
        return sum+(dt-last)*(rate(last)+rate(dt))/2;
      };
      const advance=interval
        ? shuntIntegral(interval,knots,v=>(targetMHz+offset+tuning(clip(v),knots))/(1000*divider),limit-t)
        : advanceSeries;
      let end=limit, feedback=false;
      if(phase+advance(limit-t)>=nextFb-1e-12){
        let lo=0,hi=limit-t;
        for(let k=0;k<28;k++){
          const mid=(lo+hi)/2;
          if(phase+advance(mid)<nextFb)lo=mid;else hi=mid;
        }
        end=t+hi;
        if(limit-end<1e-7)end=limit;
        feedback=true;
      }
      const dt=end-t;
      const endPhase=phase+advance(dt);
      if(onVcoEdge){
        const reached=(feedback&&nextDivider?feedbackCount:(feedback?nextFb:endPhase)*divider)+1e-9;
        while(nextVcoEdge<=reached){
          const edge=nextVcoEdge++;
          if(feedback && edge===(nextDivider?feedbackCount:nextFb*divider)){
            onVcoEdge({ns:end,edge});
            continue;
          }
          let lo=0,hi=dt;
          for(let k=0;k<28;k++){
            const mid=(lo+hi)/2;
            if((phase+advance(mid))*divider<edge)lo=mid;else hi=mid;
          }
          onVcoEdge({ns:t+hi,edge});
        }
      }
      phase=endPhase;
      if(interval){
        control=interval.control(dt);
        capacitor=interval.internal(dt);
      }else capacitor=clip(capacitor+dv*dt);
      t=end;
      const resetEdge=t===reset, referenceEdge=t===nextRef;
      const prevUp=up,prevDown=dn;
      if(t===reset){up=false;dn=false;reset=Infinity;}
      if(t===nextRef){up=true;nextRef+=referenceNs;}
      if(feedback){
        phase=nextFb;
        nextFb=nextDivider?scheduleFeedback():nextFb+1;
        dn=true;
      }
      let immediateReset=false;
      if(up&&dn&&reset===Infinity){
        if(resetDelay>0)reset=t+resetDelay;
        else {up=false;dn=false;immediateReset=true;}
      }
      if(up!==prevUp)pendingUp.push({ns:t+upDelayNs,state:up});
      if(dn!==prevDown)pendingDown.push({ns:t+downDelayNs,state:dn});
      let pumpEdge=false;
      while(pendingUp[0]?.ns===t){pumpUp=pendingUp.shift().state;pumpEdge=true;}
      while(pendingDown[0]?.ns===t){pumpDown=pendingDown.shift().state;pumpEdge=true;}
      if(onEvent && (referenceEdge || feedback || resetEdge || pumpEdge)){
        onEvent({
          ns:t, referenceEdge, feedbackEdge:feedback, resetEdge:resetEdge||immediateReset,
          up, down:dn, cap:capacitor, phase,
          vctrl:interval?control:clip(capacitor+resistance*pumpCurrent()),
          pumpUp,pumpDown,currentA:pumpCurrent()-(rout&&(pumpUp||pumpDown)?(control-initialVoltage)/rout:0),
        });
      }
      if(t===nextSample){
        const prev=data.at(-1);
        data.push({ns:t,cap:capacitor,phase,mhz:prev?(phase-prev.phase)*divider*1000/referenceNs-targetMHz:offset,
          ...(interval?{vctrl:control}:{})});
        nextSample+=referenceNs;
      }
    }
    return data;
  }
  function lockTime(data){
    let since=null;
    for(const p of data.slice(1)){
      if(Math.abs(p.mhz)>.1){since=null;continue;}
      since??=p.ns;
      if(p.ns-since>=4000)return since/1000;
    }
    return null;
  }
  if(typeof module!=="undefined"&&module.exports){module.exports={simulate,lockTime,shuntInterval,resistiveShuntInterval};return;}
  const lab=document.querySelector('[data-lab="fCoupled"]');
  if(!lab)return;
  const val=id=>Number(document.getElementById(id).value);
  const canvas=lab.querySelector("canvas");
  const status=document.getElementById("f-coupled-result");
  function draw(){
    const config={offset:val("coupled-offset"),mismatch:val("coupled-mismatch"),resetDelay:val("coupled-reset")};
    const ideal=simulate({...config,mismatch:0,resetDelay:0,curve:"linear"});
    const tuned=simulate({...config,mismatch:0,resetDelay:0,curve:"curved"});
    const coupled=simulate({...config,curve:"curved"});
    const points=rows=>rows.map(p=>[p.ns/1000,p.mhz]);
    const values=[...ideal,...tuned,...coupled].map(p=>p.mhz);
    const low=Math.min(-5,...values)-5,high=Math.max(5,...values)+5;
    plot(canvas,{xMin:0,xMax:45,yMin:low,yMax:high,xTicks:ticks([0,10,20,30,40]," µs"),yTicks:ticks([low,0,high].map(x=>Math.round(x))),
      series:[{points:points(ideal),color:blue},{points:points(tuned),color:"#28705d"},{points:points(coupled),color:rust}]});
    const show=rows=>{const t=lockTime(rows);return t===null?"未达判据":t.toFixed(3)+" µs";};
    status.textContent="线性 VCO / 理想 CP "+show(ideal)+" · 分段 VCO / 理想 CP "+show(tuned)+" · 加 CP 非理想后 "+show(coupled)+" · 耦合末点电容电压 "+coupled.at(-1).cap.toFixed(4)+" V";
  }
  lab.addEventListener("change",draw);
  draw();
})();

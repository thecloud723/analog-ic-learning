(() => {
  "use strict";
  const defaults={
    referenceHz:40e6, divider:125, resistanceOhm:4700, capacitanceF:100e-12,
    pumpA:100e-6, voltageMin:.2, voltageMax:1.6, initialVoltage:.9,
    linear:[[.2,-70],[.9,0],[1.6,70]],
    curved:[[.2,-41],[.55,-25],[.9,0],[1.25,43],[1.6,110]],
  };
  function tuning(v,knots){
    const i=knots.findIndex(([x])=>v<=x+1e-12);
    if(i<=0)return knots[i===0?0:knots.length-1][1];
    const [x0,y0]=knots[i-1], [x1,y1]=knots[i];
    return y0+(y1-y0)*(v-x0)/(x1-x0);
  }
  function simulate({offset,mismatch,resetDelay,curve,duration=45,config,onEvent}){
    const {
      referenceHz,divider,resistanceOhm:resistance,capacitanceF:capacitance,pumpA,
      voltageMin:floor,voltageMax:ceiling,initialVoltage,linear,curved,
    }={...defaults,...config};
    const referenceNs=1e9/referenceHz, targetMHz=referenceHz*divider/1e6;
    const clip=v=>Math.max(floor,Math.min(v,ceiling));
    const knots=curve==="curved"?curved:linear;
    let capacitor=initialVoltage,t=0,phase=0,nextFb=1,nextRef=0,nextSample=0,reset=Infinity,up=false,dn=false;
    const data=[];
    while(nextSample<=duration*1000){
      const current=pumpA*(Number(up)-(1-mismatch/100)*Number(dn));
      const dv=current/capacitance*1e-9;
      const vAt=dt=>clip(clip(capacitor+dv*dt)+resistance*current);
      const rate=dt=>(targetMHz+offset+tuning(vAt(dt),knots))/(1000*divider);
      // Within a CP state the effective voltage is piecewise linear.
      // Split at both clamps and each tuning-curve knot for exact trapezoids.
      const cuts=dv?[floor,ceiling,...knots.map(([v])=>v-resistance*current)]
        .map(v=>(v-capacitor)/dv).filter(dt=>dt>0).sort((a,b)=>a-b):[];
      const advance=dt=>{
        let sum=0,last=0;
        for(const point of cuts){
          if(point>=dt)break;
          sum+=(point-last)*(rate(last)+rate(point))/2;
          last=point;
        }
        return sum+(dt-last)*(rate(last)+rate(dt))/2;
      };
      const limit=Math.min(nextRef,reset,nextSample);
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
      phase+=advance(dt);
      capacitor=clip(capacitor+dv*dt);
      t=end;
      const resetEdge=t===reset, referenceEdge=t===nextRef;
      if(t===reset){up=false;dn=false;reset=Infinity;}
      if(t===nextRef){up=true;nextRef+=referenceNs;}
      if(feedback){phase=nextFb++;dn=true;}
      let immediateReset=false;
      if(up&&dn&&reset===Infinity){
        if(resetDelay>0)reset=t+resetDelay;
        else {up=false;dn=false;immediateReset=true;}
      }
      if(onEvent && (referenceEdge || feedback || resetEdge)){
        onEvent({
          ns:t, referenceEdge, feedbackEdge:feedback, resetEdge:resetEdge||immediateReset,
          up, down:dn, cap:capacitor, phase,
        });
      }
      if(t===nextSample){
        const prev=data.at(-1);
        data.push({ns:t,cap:capacitor,phase,mhz:prev?(phase-prev.phase)*divider*1000/referenceNs-targetMHz:offset});
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
  if(typeof module!=="undefined"&&module.exports){module.exports={simulate,lockTime};return;}
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

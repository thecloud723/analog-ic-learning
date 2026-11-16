"use strict";

const deg = 180 / Math.PI;
const tau = 2 * Math.PI;
const selectC = id => document.getElementById(id).value;
const chartC = (i, spec) => plot(lab.querySelectorAll("canvas")[i], spec);
const readout = text => document.getElementById("c-lab-result").textContent = text;
const lineC = (points, color=blue) => ({points,color});

function timeChart(i, traces, end, unit, extras=[]) {
  const all = traces.flatMap(t=>t.points.map(p=>p[1])).concat(extras,0);
  const lo=Math.min(...all), hi=Math.max(...all), pad=.08*Math.max(hi-lo,1e-3);
  const ys=lo===hi?[0]:lo<0&&hi>0?[lo,0,hi]:[lo,hi];
  chartC(i,{xMin:0,xMax:end,yMin:lo-pad,yMax:hi+pad,xTicks:ticks([0,end/4,end/2,3*end/4,end],unit),
    yTicks:ys.map(y=>[y,Number(y.toPrecision(2)).toString()]),series:traces});
}

function pfdDemo() {
  const mode=selectC("pfd-mode"), delay=value("pfd-reset"," ns");
  const events=[];
  for(let i=0;i<6;i++){
    if(3+20*i<=100)events.push([3+20*i,"ref"]);
    const fb={ref:7+20*i,fb:1+20*i,aligned:3+20*i,offset:8+23*i}[mode];
    if(fb<=100)events.push([fb,"fb"]);
  }
  events.sort((a,b)=>a[0]-b[0]);
  const ref=[],fb=[],up=[],dn=[];
  let u=0,d=0,reset=Infinity,chargeTime=0,last=0;
  const change=(t,nextU,nextD)=>{
    chargeTime+=(t-last)*(u-d);
    up.push([t,1.8+.55*u],[t,1.8+.55*nextU]);
    dn.push([t,.8+.55*d],[t,.8+.55*nextD]);
    u=nextU;d=nextD;last=t;
  };
  change(0,0,0);
  for(const [t,k] of events){
    if(reset<t){change(reset,0,0);reset=Infinity;}
    const marks=k==="ref"?ref:fb, y=k==="ref"?4:3;
    marks.push([t,y],[t,y+.55],[t,y]);
    change(t,k==="ref"?1:u,k==="fb"?1:d);
    if(u&&d&&reset===Infinity)reset=t+delay;
  }
  if(reset<=100)change(reset,0,0);
  change(100,u,d);
  chartC(0,{xMin:0,xMax:100,yMin:.5,yMax:4.8,xTicks:ticks([0,20,40,60,80,100]," ns"),yTicks:[[4,"REF"],[3,"FB"],[1.8,"UP"],[.8,"DN"]],
   series:[{...lineC(ref),wrap:true},{...lineC(fb,rust),wrap:true},lineC(up),lineC(dn,rust)].map((s,i)=>i<2?{...s,dots:true,points:s.points.filter((_,k)=>k%3===1)}:s)});
  readout("观察窗内 UP − DN 的净脉宽 "+signed(chargeTime,1)+" ns");
}

function cpPulse(rippleOnly) {
  const mismatch=Number(selectC("cp-mismatch")), capacitance=Number(selectC("cp-cap"));
  const captured=globalThis.pllCP.find(x=>x.m===mismatch&&x.c===capacitance).trace;
  const mean=captured.reduce((a,b)=>a+b,0)/captured.length;
  const points=captured.map((v,i)=>[2*i,1000*(v-mean)]);
  if(!rippleOnly){
    // Preserve the specified 1 ns transition intervals in the teaching current trace.
    timeChart(0,[lineC([[0,0],[1,mismatch],[61,mismatch],[62,0],[1000,0]])],1000," ns");
  }
  timeChart(rippleOnly?0:1,[lineC(points,rippleOnly?blue:rust)],1000," ns");
  const vv=1000*(Math.max(...captured)-Math.min(...captured));
  readout("SPICE 去直流纹波 "+vv.toFixed(3)+" mVpp · 参考平均电压 "+mean.toFixed(5)+" V");
}

function rcRipple() {
  const p=Number(selectC("parallel-cap"))*1e-12;
  const r=1000,c=100e-12,f=40e6,w=tau*f;
  const z={re:r,im:-1/(w*c)};
  const inverse={re:z.re/(z.re*z.re+z.im*z.im),im:-z.im/(z.re*z.re+z.im*z.im)+w*p};
  const absZ=1/Math.hypot(inverse.re,inverse.im);
  const peak=10e-6*absZ*1000;
  timeChart(0,[lineC(samples(0,50,t=>peak*Math.cos(tau*f*t*1e-9)))],50," ns");
  readout("40 MHz 跨阻 "+absZ.toFixed(1)+" Ω · 纹波 "+(2*peak).toFixed(2)+" mVpp");
}

// Time is ns; frequencies are GHz so phase integration gives cycles.
function loopEvents(offsetMHz,gainMHz=100){
  const n=125, target=5, gain=gainMHz/1000, period=25;
  const r=4700, current=100e-6, c=100e-12;
  let cap=.9, t=0, fbPhase=0, nextRef=period, nextFb=1, sample=0, up=0,dn=0;
  const rows=[], events=[];
  for(let guard=0;guard<16000&&sample<=45000;guard++){
    const i=current*(up-dn);
    const slope=i/c*1e-9;
    const f=target+offsetMHz/1000+gain*(cap+i*r-.9);
    const speed=f/n, accel=gain*slope/n;
    const diff=Math.max(0,nextFb-fbPhase);
    const discriminant=speed*speed+2*accel*diff;
    const toFeedback=discriminant>0?2*diff/(speed+Math.sqrt(discriminant)):Infinity;
    const fb=t+toFeedback;
    const next=Math.min(nextRef,fb,sample);
    const dt=next-t;
    cap+=slope*dt;
    fbPhase+=dt*(speed+.5*accel*dt);
    t=next;
    const refEdge=Math.abs(t-nextRef)<1e-7, fbEdge=Math.abs(t-fb)<1e-7;
    if(refEdge){up=1;nextRef+=period;}
    if(fbEdge){dn=1;fbPhase=nextFb;nextFb++;}
    if(up&&dn){up=0;dn=0;}
    const voltage=cap+current*(up-dn)*r;
    const errorMHz=offsetMHz+gainMHz*(voltage-.9);
    if((refEdge||fbEdge)&&events.length<12)events.push([t,refEdge,fbEdge,up,dn,voltage,errorMHz]);
    if(Math.abs(t-sample)<1e-7){
      const phaseError=t/period-fbPhase;
      const averageError=rows.length?-1000*n*(phaseError-rows.at(-1)[3])/period:errorMHz;
      rows.push([t/1000,voltage,averageError,phaseError]);
      sample+=period;
    }
  }
  return {events,rows};
}

function loopView(mode){
  const start=value("loop-offset"," MHz"), gain=Number(selectC("loop-gain"));
  const {events,rows}=loopEvents(start,gain);
  if(mode==="events"){
    const table=document.getElementById("loop-events");
    table.textContent="";
    for(const [time,ref,fb,up,dn,voltage,df] of events){
      const row=table.insertRow();
      for(const v of [time.toFixed(2),ref&&fb?"REF + FB":ref?"REF":"FB",up,dn,voltage.toFixed(4),df.toFixed(2)])
        row.insertCell().textContent=v;
    }
    readout("每个 FB 边沿对应 VCO 相位再走 "+125+" 圈；表中为事件更新后的状态。");
    return;
  }
  const trace=k=>rows.map(row=>[row[0],row[k]]);
  if(mode==="capture"){
    [1,2,3].forEach((k,i)=>timeChart(i,[lineC(trace(k))],45," µs"));
    readout("45 µs 末频偏 "+signed(rows.at(-1)[2],3)+" MHz · 控制电压 "+rows.at(-1)[1].toFixed(3)+" V");
  } else if(mode==="slip"){
    const wrapped=rows.map(([t,,,phase])=>[t,phase-Math.floor(phase+.5)]);
    timeChart(0,[lineC(trace(3)),{...lineC(wrapped,rust),wrap:true}],45," µs");
    let anchor=rows[0][3], count=0;
    for(const row of rows){const cycles=Math.trunc(row[3]-anchor);anchor+=cycles;count+=Math.abs(cycles);}
    readout("按未包裹相位的整圈位移计数："+count+" 次");
  } else {
    const limit=value("lock-limit"," kHz")/1000,dwell=value("lock-dwell"," µs");
    const frequency=trace(2), tolerance=[lineC([[0,limit],[45,limit]],rust),lineC([[0,-limit],[45,-limit]],rust)];
    timeChart(0,[lineC(frequency),...tolerance],45," µs");
    let since=null, confirmed=null;
    for(const [t,e] of frequency){
      if(Math.abs(e)>limit){since=null;continue;}
      since??=t;
      if(t-since>=dwell-1e-9){confirmed=since;break;}
    }
    readout(confirmed===null?"观察窗内未达到保持条件":"首次满足条件的入带时刻 "+confirmed.toFixed(3)+" µs · 保持 "+dwell+" µs");
  }
}

const complex=(r,i)=>({r,i});
const plus=(a,b)=>complex(a.r+b.r,a.i+b.i);
const times=(a,b)=>complex(a.r*b.r-a.i*b.i,a.r*b.i+a.i*b.r);
const over=(a,b)=>{const d=b.r*b.r+b.i*b.i;return complex((a.r*b.r+a.i*b.i)/d,(a.i*b.r-a.r*b.i)/d);};
const one=complex(1,0);
const dB=x=>20*Math.log10(Math.hypot(x.r,x.i));
const eqTerms=(f,z,fn)=>{
  const x=f/fn;
  const den=complex(1-x*x,2*z*x);
  return [over(complex(1,2*z*x),den),over(complex(-x*x,0),den)];
};

function tsPlot(){
  const z=value("ts-damping");
  const xs=samples(2,7,x=>x).map(([x])=>x);
  const curve=i=>xs.map(x=>[x,dB(eqTerms(10**x,z,90000)[i])]);
  chartC(0,{xMin:2,xMax:7,yMin:-125,yMax:10,xTicks:[[2,"100 Hz"],[3,"1 kHz"],[4,"10 kHz"],[5,"100 kHz"],[6,"1 MHz"],[7,"10 MHz"]],yTicks:ticks([-120,-80,-40,0]," dB"),series:[lineC(curve(0)),lineC(curve(1),rust)]});
  const [t,s]=eqTerms(90000,z,90000);
  const sum=plus(t,s);
  readout("fₙ = 90 kHz 时，复数 T + S = "+sum.r.toFixed(4)+" + j"+sum.i.toFixed(4));
}

function evmLoop(f,full){
  const w=tau*f, branch=complex(68,-1/(w*68e-9));
  let z=branch;
  if(full){
    const y=plus(over(one,branch),complex(0,w*390e-12));
    const zDen=plus(times(y,complex(1,w*18*1800e-12)),complex(0,w*1800e-12));
    z=over(one,zDen);
  }
  return times(complex(0,-.015*132e6/(75*w)),z);
}
function evmResponse(full){
  return samples(3,7,x=>x).map(([x])=>{
    const loop=evmLoop(10**x,full);
    let phase=Math.atan2(loop.i,loop.r)*deg;
    if(phase>0)phase-=360;
    return {x,mag:dB(loop),phase,closed:dB(over(loop,plus(one,loop)))};
  });
}
function crossing(s,key,target){
  const i=s.findIndex((p,i)=>i&&p[key]<=target&&s[i-1][key]>target);
  if(i<1)return null;
  const [a,b]=[s[i-1],s[i]];
  return a.x+(b.x-a.x)*(target-a[key])/(b[key]-a[key]);
}
function bode(){
  const key=selectC("bode-view");
  const s=evmResponse(true), simple=evmResponse(false);
  const cross=crossing(s,"mag",0), closed=crossing(s,"closed",-3);
  const l=evmLoop(10**cross,true), pm=180+Math.atan2(l.i,l.r)*deg;
  const limits={mag:[-85,80,[-60,-30,0,30,60]],phase:[-260,-60,[-240,-180,-120,-60]],closed:[-85,12,[-80,-40,-3,0]]}[key];
  chartC(0,{xMin:3,xMax:7,yMin:limits[0],yMax:limits[1],xTicks:[[3,"1 kHz"],[4,"10 kHz"],[5,"100 kHz"],[6,"1 MHz"],[7,"10 MHz"]],
    yTicks:ticks(limits[2],key==="phase"?"°":" dB"),series:[lineC(s.map(p=>[p.x,p[key]])),lineC(simple.map(p=>[p.x,p[key]]),rust)]});
  readout("完整网络：0 dB 交越 "+(10**cross/1e3).toFixed(1)+" kHz · 相位裕量 "+pm.toFixed(1)+"° · 闭环 −3 dB "+(10**closed/1e3).toFixed(1)+" kHz");
}
function step(){
  const z=value("step-damping"),wn=tau*90000,alpha=z*wn,wd=wn*Math.sqrt(1-z*z);
  const e=t=>Math.exp(-alpha*t)*(Math.cos(wd*t)-alpha/wd*Math.sin(wd*t));
  const points=samples(0,18,t=>1-e(t*1e-6));
  timeChart(0,[lineC(points),lineC([[0,1],[18,1]],rust)],18," µs");
  readout("归一化响应峰值 "+Math.max(...points.map(x=>x[1])).toFixed(3)+" · fₙ = 90 kHz");
}

const cRender={
  pfd:pfdDemo, cp:()=>cpPulse(false), ripple:()=>cpPulse(true), rc:rcRipple,
  events:()=>loopView("events"), capture:()=>loopView("capture"),
  slip:()=>loopView("slip"), lock:()=>loopView("lock"), ts:tsPlot, bode, step
};
if(lab&&cRender[lab.dataset.lab]){
  const draw=cRender[lab.dataset.lab];
  lab.addEventListener("input",draw);
  draw();
}

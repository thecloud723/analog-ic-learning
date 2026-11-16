"use strict";

const toPower=db=>10**(db/10);
const toDb=p=>10*Math.log10(p);
const dSelect=id=>document.getElementById(id).value;
const dOn=id=>document.getElementById(id).checked;
const dResult=t=>{document.getElementById("d-result").textContent=t;};
const dLine=(points,color=blue)=>({points,color});
const dSweep=(a,b,fn,n=240)=>Array.from({length:n+1},(_,i)=>{const x=a+(b-a)*i/n;return [x,fn(x)];});
const dCanvas=i=>lab.querySelectorAll("canvas")[i];
const dTicks=[[2,"100 Hz"],[3,"1 kHz"],[4,"10 kHz"],[5,"100 kHz"],[6,"1 MHz"],[7,"10 MHz"],[8,"100 MHz"]];
const dY=(a,b,s)=>Array.from({length:Math.floor((b-a)/s)+1},(_,i)=>[a+i*s,String(a+i*s)]);
function dLog(i,series,{lo=3,hi=7.4,bottom=-175,top=-65}={}){
  plot(dCanvas(i),{xMin:lo,xMax:hi,yMin:bottom,yMax:top,xTicks:dTicks.filter(([x])=>x>=lo&&x<=hi),yTicks:dY(Math.ceil(bottom/20)*20,top,20),series});
}
function ssb(){
  const bw=Number(dSelect("rbw")), random=dOn("random"), tone=dOn("tone");
  const points=x=>-118+10*Math.log10(1+10**(2*(4.1-x)))+10*Math.log10(bw);
  const series=[];
  if(random)series.push(dLine(dSweep(3,6,points)));
  if(tone)series.push(dLine([[5,-155],[5,-88]],rust));
  dLog(0,series,{lo:3,hi:6,bottom:-155,top:-65});
  dResult("RBW "+bw+" Hz · "+(random?"100 kHz 噪声约 "+points(5).toFixed(1)+" dBc/RBW":"随机噪声关闭")+" · "+(tone?"单音 −88 dBc":"单音关闭"));
}
function osc(){
  const q=value("tank-q-d"), v=value("tank-v"), factor=value("tank-f");
  // Equation 56: kTF Rp/Vp² · (f0/(Q·Δf))², with Rp tied to Q for fixed C.
  const f0=5e9, rp=q/(2*Math.PI*f0*800e-15), kT=1.380649e-23*300;
  const thermal=x=>kT*factor*rp/(v*v)*(f0/(q*10**x))**2;
  const curve=x=>toDb(thermal(x)*(1+10000/10**x)+toPower(-158));
  dLog(0,[dLine(dSweep(3,8,curve)),dLine(dSweep(3,8,x=>toDb(thermal(x))),rust)],{lo:3,hi:8,bottom:-185,top:-45});
  dResult("100 kHz · 合成教学谱 "+curve(5).toFixed(1)+" dBc/Hz；热噪声项 "+toDb(thermal(5)).toFixed(1)+" dBc/Hz");
}
const demoPSD=f=>toPower(-150)+toPower(-110)*(1e5/f)**2;
function jitter(lo,hi,psd,fc){
  const logLo=Math.log(lo),logHi=Math.log(hi), n=1600;
  let prev=lo,sum=0;
  for(let i=1;i<=n;i++){const f=Math.exp(logLo+(logHi-logLo)*i/n);sum+=(psd(prev)+psd(f))*.5*(f-prev);prev=f;}
  return Math.sqrt(2*sum)/(2*Math.PI*fc);
}
function rms(){
  const [lo,hi]=dSelect("rms-band").split(":").map(Number), fc=Number(dSelect("carrier"))*1e9;
  const series=[dLine(dSweep(3,8,x=>toDb(demoPSD(10**x))))];
  for(const f of [lo,hi])series.push(dLine([[Math.log10(f),-161],[Math.log10(f),toDb(demoPSD(f))]],rust));
  dLog(0,series,{lo:3,hi:8,bottom:-162,top:-65});
  dResult((lo/1000)+" kHz–"+(hi/1e6)+" MHz · 连续底噪 RMS jitter "+(jitter(lo,hi,demoPSD,fc)*1e12).toFixed(3)+" ps");
}
function mixing(){
  const blocker=value("blocker"," dBm"), pn=value("lo-pn"," dBc/Hz"), bw=Number(dSelect("rx-bw"));
  dResult("折入带内的噪声约 "+(blocker+pn+10*Math.log10(bw)).toFixed(1)+" dBm（单个阻塞音）");
}
function transfer(){
  const fn=value("loop-fn"," kHz")*1000, n=125, z=.7;
  const parts=f=>{
    const x=f/fn, d=(1-x*x)**2+(2*z*x)**2;
    const t2=(1+(2*z*x)**2)/d,s2=x**4/d;
    // REF and FB are phase at PFD inputs; CP is already input-referred phase.
    return [n*n*t2*toPower(-147),s2*demoPSD(f),n*n*t2*toPower(-155),n*n*t2*toPower(-160)];
  };
  const ons=["ref","vco","cp","fb"].map(s=>dOn("noise-"+s));
  const colors=[blue,rust,"#6c538a","#28705d"];
  const series=ons.flatMap((on,i)=>on?[dLine(dSweep(3,8,x=>toDb(parts(10**x)[i])),colors[i])]:[]);
  const sum=x=>parts(10**x).reduce((a,b,i)=>a+(ons[i]?b:0),0);
  if(series.length)series.push(dLine(dSweep(3,8,x=>toDb(sum(x))),"#213549"));
  dLog(0,series,{lo:3,hi:8,bottom:-180,top:-85});
  dResult(series.length?"100 kHz 总计 "+toDb(sum(5)).toFixed(2)+" dBc/Hz":"四个噪声源均关闭");
}
function divider(){
  const m=Number(dSelect("out-div")), fc=5e9;
  const p=f=>demoPSD(f)/m**2;
  dLog(0,[dLine(dSweep(3,8,x=>toDb(demoPSD(10**x)))),dLine(dSweep(3,8,x=>toDb(p(10**x))),rust)],{lo:3,hi:8});
  dResult("相噪降低 "+(20*Math.log10(m)).toFixed(2)+" dB · 12 kHz–20 MHz：分频前 "+(jitter(12000,20e6,demoPSD,fc)*1e12).toFixed(3)+" ps，分频后 "+(jitter(12000,20e6,p,fc/m)*1e12).toFixed(3)+" ps");
}
const evmMarkers=[[3,-95.0518],[4,-105.1543],[5,-108.0194],[6,-116.4369],[7,-141.5219],[8,-149.2126]];
function readEvm(){
  const i=Number(dSelect("evm-holdout")), [x,db]=evmMarkers[i], a=evmMarkers[i-1],b=evmMarkers[i+1];
  const estimate=a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]);
  dLog(0,[dLine(evmMarkers.filter((_,j)=>j!==i)),{...dLine(evmMarkers,rust),dots:true,selected:x}],{lo:3,hi:8,bottom:-155,top:-90});
  dResult("实测标记 "+db.toFixed(2)+" dBc/Hz · 相邻点插值 "+estimate.toFixed(2)+" dBc/Hz · 插值 − 实测 "+signed(estimate-db,2)+" dB");
}
function spurLoc(){
  const f=Number(dSelect("pfd-spur")), carrier=2100;
  plot(dCanvas(0),{xMin:-4,xMax:4,yMin:0,yMax:1.12,xTicks:ticks([-4,-2,0,2,4]," MHz"),yTicks:[[0,""],[1,"载波"]],
    series:[dLine([[0,0],[0,1]]),...[1,2,3].flatMap(n=>[-1,1].map(s=>dLine([[s*n*f,0],[s*n*f,.72-n*.12]],rust)))]});
  dResult("首对参考杂散 "+(carrier-f).toFixed(2)+" / "+(carrier+f).toFixed(2)+" MHz");
}
function coefficients(x,k){
  let r=0,i=0;
  for(let n=0;n<x.length;n++){
    const a=2*Math.PI*n*k/x.length;
    r+=x[n][0]*Math.cos(a)+x[n][1]*Math.sin(a);
    i+=x[n][1]*Math.cos(a)-x[n][0]*Math.sin(a);
  }
  return Math.hypot(r,i)/x.length;
}
function cpSpur(){
  const m=Number(dSelect("d-cp-m")), c=Number(dSelect("d-cp-c")), gain=value("d-gain"," MHz/V")*1e6;
  const v=globalThis.pllCP.find(x=>x.m===m&&x.c===c).trace, len=v.length;
  const mean=v.reduce((a,b)=>a+b,0)/len;
  const delta=v.map(x=>x-mean);
  let phase=0;
  const envelope=delta.map((x,i)=>{
    const q=[Math.cos(phase),Math.sin(phase)];
    phase+=2*Math.PI*gain*2e-9*(x+delta[(i+1)%len])/2;
    return q;
  });
  const ref=coefficients(envelope,0), peak=2*coefficients(delta.map(x=>[x,0]),1);
  const beta=gain*peak/1e6;
  const spectrum=[-3,-2,-1,1,2,3].map(k=>[k,20*Math.log10(Math.max(coefficients(envelope,k)/ref,1e-9))]);
  plot(dCanvas(0),{xMin:-3.3,xMax:3.3,yMin:-145,yMax:7,xTicks:ticks([-3,-2,-1,0,1,2,3]," MHz"),yTicks:dY(-140,0,20),
    series:[dLine([[0,-145],[0,0]]),...spectrum.map(([k,y])=>dLine([[k,-145],[k,y]],rust))]});
  dResult(m===0?"匹配条件下无可辨纹波边带。":"基波峰值 "+(peak*1000).toFixed(3)+" mV · β = "+beta.toFixed(3)+" · +1 MHz 数值投影 "+spectrum[3][1].toFixed(2)+" dBc · 窄带估算 "+(20*Math.log10(beta/2)).toFixed(2)+" dBc");
}
const measured=[[5,-91,-97],[10,-84,-90],[25,-76,-82],[50,-70,-76],[100,-64,-68],[1000,-44,-50]];
function leakage(){
  const active=dSelect("lf-kind")==="active", idx=Number(dSelect("leak-n")), row=measured[idx], cp=active?22e-9:8.2e-9,k=active?63e6:18e6,f=250000;
  const post=active?1/Math.hypot(1,2*Math.PI*f*100*13.3e-9):1;
  const estimate=i=>20*Math.log10(k*i*1e-9*post/(2*Math.PI*cp*f*f));
  const points=measured.map(r=>[Math.log10(r[0]),r[active?2:1]]);
  plot(dCanvas(0),{xMin:.65,xMax:3.05,yMin:-105,yMax:-37,xTicks:[5,10,25,100,1000].map(i=>[Math.log10(i),i+" nA"]),yTicks:dY(-100,-40,10),
    series:[dLine(dSweep(Math.log10(5),3,x=>estimate(10**x))),{...dLine(points,rust),dots:true,selected:Math.log10(row[0])}]});
  dResult("注流 "+row[0]+" nA · 模型 "+estimate(row[0]).toFixed(1)+" dBc · 原图读数约 "+row[active?2:1]+" dBc · 模型 − 图读数 "+signed(estimate(row[0])-row[active?2:1],1)+" dB");
}
const dRender={ssb,osc,rms,mixing,transfer,divider,readEvm,spurLoc,cpSpur,leakage};
if(lab&&dRender[lab.dataset.lab]){
  const draw=dRender[lab.dataset.lab];
  lab.addEventListener("input",draw);
  draw();
}

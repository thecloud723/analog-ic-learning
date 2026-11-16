"use strict";

const modulo=(n,m)=>((n%m)+m)%m;
const average=arr=>arr.reduce((a,b)=>a+b,0)/arr.length;
const eSelect=id=>document.getElementById(id).value;
const eResult=text=>{document.getElementById("e-result").textContent=text;};
function eTable(id, rows){
  const table=document.getElementById(id);
  table.textContent="";
  for(const values of rows){
    const row=table.insertRow();
    for(const v of values)row.insertCell().textContent=v;
  }
}
const eLine=(points,color=blue)=>({points,color});
function eChart(i,series,xMin,xMax,xTicks,yMin,yMax,yTicks){
  plot(lab.querySelectorAll("canvas")[i],{xMin,xMax,yMin,yMax,xTicks,yTicks,series});
}
const eRange=(a,b,fn,n=160)=>Array.from({length:n+1},(_,i)=>{
  const x=a+(b-a)*i/n;return [x,fn(x)];
});
const gcd=(a,b)=>b===0?a:gcd(b,a%b);
function fracRows(num,den,length){
  let residual=0;
  return Array.from({length},(_,n)=>{
    const total=residual+num, carry=Math.floor(total/den);
    residual=total-carry*den;
    return {n,total,carry,residual};
  });
}
function fractional(){
  const num=value("frac-num"), den=16, base=240, period=den/gcd(num,den);
  const fVco=10e6*(base+num/den), rows=fracRows(num,den,period);
  eTable("e-table",rows.map(r=>[r.n+1,base+r.carry,(r.residual/den).toFixed(4),(-1e12*r.residual/den/fVco).toFixed(2)]));
  eResult("周期 "+period+" 拍 · 平均 N "+(base+average(rows.map(r=>r.carry))).toFixed(4)+" · VCO "+(fVco/1e9).toFixed(6)+" GHz");
}
function spectrumAt(data,k,window){
  let re=0,im=0;
  for(let i=0;i<data.length;i++){
    const w=window?window[i]:1, phase=2*Math.PI*k*i/data.length;
    re+=w*data[i]*Math.cos(phase);im-=w*data[i]*Math.sin(phase);
  }
  return re*re+im*im;
}
const powerDb=(power)=>10*Math.log10(Math.max(1e-16,power));
function pattern(){
  const num=value("pattern-num"), den=16, period=den/gcd(num,den);
  const e=fracRows(num,den,period).map(r=>-r.residual/den), mean=average(e);
  const bins=Array.from({length:Math.floor(period/2)},(_,i)=>[10*(i+1)/period,powerDb(spectrumAt(e.map(x=>x-mean),i+1)/period**2)]);
  eChart(0,bins.map(([f,y])=>eLine([[f,-105],[f,y]],rust)),0,5,ticks([0,1,2,3,4,5]," MHz"),-105,0,ticks([-100,-80,-60,-40,-20,0]));
  eResult("序列周期 "+period+" 拍 · 可能的谱线栅格 "+(10/period).toFixed(3)+" MHz · 纵轴按 VCO 圈数平方归一");
}
function firstOrder(){
  const num=value("mash-tenths");
  const rows=fracRows(num,10,10);
  eTable("e-table",rows.map(r=>[r.n+1,(r.total/10).toFixed(1),r.carry,(r.residual/10).toFixed(1)]));
  eResult("十拍合计进位 "+rows.reduce((total,r)=>total+r.carry,0)+" · 末拍残差 "+(rows.at(-1).residual/10).toFixed(1));
}
function mash(code,modulus,count,dither=false){
  let r1=0,r2=0,r3=0,prev2=0,prev3=0,older3=0,seed=0x42e1597a;
  return Array.from({length:count},(_,k)=>{
    seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;
    const x=code+(dither?((seed>>>0)&1?1:-1):0);
    const s1=r1+x,c1=Math.floor(s1/modulus);r1=modulo(s1,modulus);
    const s2=r2+r1,c2=Math.floor(s2/modulus);r2=modulo(s2,modulus);
    const s3=r3+r2,c3=Math.floor(s3/modulus);r3=modulo(s3,modulus);
    const y=c1+c2-prev2+c3-2*prev3+older3;
    prev2=c2;older3=prev3;prev3=c3;
    return {k,r1,r2,r3,c1,c2,c3,y,x};
  });
}
function mashView(){
  const word=value("mash-word"), rows=mash(word,16,16);
  eTable("e-table",rows.map(r=>[r.k+1,r.c1,r.c2,r.c3,r.r1,r.r2,r.r3,r.y]));
  const ntf=(x,order)=>20*order*Math.log10(2*Math.sin(Math.PI*10**x));
  eChart(0,[eLine(eRange(-3,Math.log10(.5),x=>ntf(x,1))),eLine(eRange(-3,Math.log10(.5),x=>ntf(x,3)),rust)],
    -3,Math.log10(.5),[[-3,"0.001"],[-2,"0.01"],[-1,"0.1"],[Math.log10(.5),"0.5"]],-140,25,ticks([-120,-80,-40,0]));
  eResult("前 16 拍 ⟨y⟩ = "+average(rows.map(r=>r.y)).toFixed(4)+" · 目标 "+(word/16).toFixed(4)+"；有限窗含差分边界项");
}
function ditherView(){
  const bits=Number(eSelect("dsm-bits")), mod=2**bits, n=1024;
  const window=Array.from({length:n},(_,i)=>.5-.5*Math.cos(2*Math.PI*i/n)), sumW2=window.reduce((s,w)=>s+w*w,0);
  const get=enabled=>{
    const data=mash(mod/8,mod,n,enabled).map(r=>r.y), mean=average(data);
    const centered=data.map(y=>y-mean);
    return {mean,spec:Array.from({length:n/2},(_,i)=>{
      const k=i+1,factor=k===n/2?1:2;
      return [k/n,powerDb(factor*spectrumAt(centered,k,window)/(n*sumW2))];
    })};
  };
  const off=get(false),on=get(true);
  const pick=(s)=>s.spec.slice(0,Math.floor(n*.05)).reduce((sum,[,d])=>sum+10**(d/10),0);
  eChart(0,[eLine(off.spec),eLine(on.spec,rust)],0,.5,ticks([0,.1,.2,.3,.4,.5]),-135,5,ticks([-120,-90,-60,-30,0]));
  eResult("0–0.05 fₛ 带内功率：无抖动 "+powerDb(pick(off)).toFixed(1)+" dB · 加抖动 "+powerDb(pick(on)).toFixed(1)+" dB；加抖动平均码 "+on.mean.toFixed(5));
}
function quantizedPhase(phase,bins){
  const whole=Math.floor(phase);
  return whole+Math.floor((phase-whole)*bins+1e-12)/bins;
}
function adpll(fcw,ki,delay,bins,steps=64){
  const kp=.48,gain=.25,free=16;
  let ref=0,feedback=0,integrator=0,applied=0;
  const queue=Array(delay).fill(0);
  return Array.from({length:steps},(_,k)=>{
    const measured=quantizedPhase(feedback,bins);
    const error=ref-measured;
    const iNext=integrator+ki*error;
    const requested=kp*error+iNext;
    applied=delay?(queue.push(requested),queue.shift()):requested;
    const nextRate=free+gain*applied;
    const row={k,ref,feedback,measured,error,integrator:iNext,requested,applied,nextRate};
    integrator=iNext;ref+=fcw;feedback+=nextRate;
    return row;
  });
}
function walk(){
  const k=value("adpll-step"),fcw=Number(eSelect("fcw")),r=adpll(fcw,.08,0,64)[k];
  const integer=Math.floor(r.measured);
  eTable("e-table",[[r.k,r.ref.toFixed(4),integer,(r.measured-integer).toFixed(4),r.error.toFixed(4),r.applied.toFixed(4),r.nextRate.toFixed(4)]]);
  eResult("下一拍 DCO 相位增加 "+r.nextRate.toFixed(4)+" 圈；与 FCW 的差为 "+signed(r.nextRate-fcw,4)+" 圈/参考周期");
}
function pi(){
  const delay=Number(eSelect("pi-delay")), ki=value("pi-ki"),rows=adpll(16.2,ki,delay,64);
  const graph=(i,keys)=>{
    const curves=keys.map((key,j)=>eLine(rows.map(r=>[r.k,r[key]]),j===0?blue:rust));
    const ys=curves.flatMap(s=>s.points.map(p=>p[1]));
    const limit=Math.max(.12,...ys.map(Math.abs))*1.12;
    eChart(i,curves,0,63,ticks([0,16,32,48,63]),-limit,limit,[[-limit,(-limit).toFixed(2)],[0,"0"],[limit,limit.toFixed(2)]]);
  };
  graph(0,["error"]);graph(1,["integrator","applied"]);
  const r=rows[value("pi-k")];
  eResult("第 "+r.k+" 拍：误差 "+r.error.toFixed(3)+" 圈 · I "+r.integrator.toFixed(3)+" · 本拍计算命令 "+r.requested.toFixed(3)+" · 本拍应用命令 "+r.applied.toFixed(3)+" · 下一段 DCO "+r.nextRate.toFixed(3)+" 圈/拍");
}
function tdc(){
  const lsb=Number(eSelect("tdc-lsb")), input=value("tdc-in"," ps"), max=15;
  const q=x=>Math.min(max,Math.floor(x/lsb));
  const points=[[0,0]];
  for(let i=1;i<=max;i++)if(i*lsb<=100)points.push([i*lsb,i-1],[i*lsb,i]);
  points.push([100,q(100)]);
  eChart(0,[eLine(points),{...eLine([[input,q(input)]],rust),dots:true}],0,100,ticks([0,20,40,60,80,100]," ps"),0,16,ticks([0,5,10,15]));
  const estimate=q(input)*lsb;
  eResult("码 "+q(input)+" · 回读 "+estimate+" ps · 量化误差 "+(estimate-input)+" ps · 5 GHz 时 "+(estimate/200).toFixed(3)+" 圈"+(input>=16*lsb?" · 已超量程":""));
}
function dtc(){
  const num=Number(eSelect("dtc-num")), lsb=value("dtc-lsb"," ps"), period=200, den=8;
  const rows=fracRows(num,den,8);
  eTable("e-table",rows.map(r=>{
    const needed=r.residual/den*period, code=Math.min(31,Math.round(needed/lsb)), real=code*lsb;
    return [r.n+1,r.carry,needed.toFixed(1),code,real.toFixed(1),signed(real-needed,1)];
  }));
  eResult("按预测残差生成 5 位非负延迟码，DTC 用该码把提前的反馈边沿向后移。");
}
function calibrate(){
  const drift=value("dco-drift"," %"), estimateMode=eSelect("dco-estimate"), delta=value("dco-target"," MHz");
  const f=code=>4800+(2*(1+drift/100))*code+.004*code**2;
  const a=10,b=40,slope=(f(b)-f(a))/(b-a),estimate=estimateMode==="measured"?slope:2;
  const requested=a+Math.round(delta/estimate), code=Math.min(63,Math.max(0,requested)), goal=f(a)+delta;
  const floor=Math.min(4780,goal-10), ceiling=Math.max(5020,goal+10,f(63)+10);
  const frequencies=[4800,4880,4960,5040].filter(y=>y>floor&&y<ceiling);
  eChart(0,[eLine(eRange(0,63,f)),eLine([[0,goal],[63,goal]],rust),{...eLine([[code,f(code)]],rust),dots:true}],
    0,63,ticks([0,16,32,48,63]),floor,ceiling,ticks(frequencies," MHz"));
  eResult("两点斜率 "+slope.toFixed(3)+" MHz/码 · 选码 "+code+(requested!==code?"（限幅）":"")+" · 实际误差 "+signed(f(code)-goal,2)+" MHz");
}
const eRender={fractional,pattern,firstOrder,mashView,ditherView,walk,pi,tdc,dtc,calibrate};
if(lab&&eRender[lab.dataset.lab]){
  const draw=eRender[lab.dataset.lab];
  lab.addEventListener("input",draw);
  draw();
}

(() => {
  "use strict";
  if (!lab) return;
  const field = id => document.getElementById(id).value;
  const output = text => { document.getElementById("f-result").textContent = text; };
  const trace = (points, color = blue) => ({ points, color });
  const make = (n, fn) => Array.from({length:n}, (_,i)=>fn(i));
  function rows(items) {
    const target=document.getElementById("f-rows");
    target.textContent="";
    for(const row of items) {
      const tr=target.insertRow();
      for(const cell of row) tr.insertCell().textContent=cell;
    }
  }
  function design(){
    const full=field("f-model")==="full", response=evmResponse(full);
    const cross=crossing(response,"mag",0), close=crossing(response,"closed",-3);
    const gain=evmLoop(10**cross,full), margin=180+Math.atan2(gain.i,gain.r)*180/Math.PI;
    const key="mag";
    const fullLine=trace(evmResponse(true).map(r=>[r.x,r[key]]));
    const simpleLine=trace(evmResponse(false).map(r=>[r.x,r[key]]),rust);
    plot(lab.querySelector("canvas"),{xMin:3,xMax:7,yMin:-90,yMax:80,
      xTicks:[[3,"1 kHz"],[4,"10 kHz"],[5,"100 kHz"],[6,"1 MHz"],[7,"10 MHz"]],
      yTicks:ticks([-80,-60,-40,-20,0,20,40,60,80]),series:[fullLine,simpleLine]});
    rows([["开环交越",(10**cross/1e3).toFixed(1)+" kHz","模型"],["相位裕量",margin.toFixed(1)+"°","模型"],["闭环 −3 dB",(10**close/1e3).toFixed(1)+" kHz","模型"]]);
    output((full?"实装两节点 RC":"仅串联 R2–C2")+" · 15 GHz 设计点");
  }
  function cpRow(){
    const m=Number(field("f-mismatch")),c=Number(field("f-cap"));
    return globalThis.pllCP.find(row=>row.m===m&&row.c===c);
  }
  const pp=values=>1000*(Math.max(...values)-Math.min(...values));
  function system(){
    const gain=Number(field("f-gain"));
    const {rows:response}=loopEvents(-80,gain);
    const points=response.map(([t,,error])=>[t,error]);
    let first=null,confirmed=null;
    for(const [t,error] of points){
      if(Math.abs(error)>.1){first=null;continue;}
      first??=t;
      if(t-first>=4-1e-9){confirmed=first;break;}
    }
    const low=Math.min(-5,...points.map(p=>p[1]))-5, high=Math.max(5,...points.map(p=>p[1]))+5;
    plot(lab.querySelector("canvas"),{xMin:0,xMax:45,yMin:low,yMax:high,xTicks:ticks([0,10,20,30,40]," µs"),yTicks:ticks([-80,-60,-40,-20,0,20,40,60].filter(y=>y>=low&&y<=high)),series:[trace(points)]});
    const {trace:voltage,m,c}=cpRow();
    const tone=2*coefficients(voltage.map(v=>[v,0]),1);
    const beta=gain*tone;
    const mean=voltage.reduce((sum,v)=>sum+v,0)/voltage.length;
    const delta=voltage.map(v=>v-mean);
    let phase=0;
    const envelope=delta.map((v,i)=>{
      const sample=[Math.cos(phase),Math.sin(phase)];
      phase+=2*Math.PI*gain*1e6*2e-9*(v+delta[(i+1)%delta.length])/2;
      return sample;
    });
    const side=20*Math.log10(coefficients(envelope,1)/coefficients(envelope,0));
    rows([["闭环入带",confirmed===null?"观察窗内未确认":confirmed.toFixed(3)+" µs","C2 教学边沿模型"],
      ["局部纹波",pp(voltage).toFixed(3)+" mVpp","CP-01 ngspice 预跑"],
      ["基波峰值",(1e3*tone).toFixed(3)+" mV","CP-01 单周期 DFT"],
      ["+1 MHz 边带",m&&beta>0?side.toFixed(2)+" dBc":"模型无可辨纹波边带","理想 VCO 基带 DFT；β₁="+beta.toFixed(3)]]);
    output("按当前配置复算 · VCO "+gain+" MHz/V · CP "+m+"% / "+c+" pF");
  }
  function fft(){
    const duration=value("f-window"," µs"), hann=field("f-window-type")==="hann";
    const n=256, fs=n/duration, bin=1/duration, tone=1.07;
    const window=make(n,i=>hann ? .5-.5*Math.cos(2*Math.PI*i/n) : 1);
    const signal=window.map((w,i)=>[w*Math.sin(2*Math.PI*tone*i/fs),0]);
    const norm=window.reduce((a,b)=>a+b,0);
    const spec=make(Math.floor(2/bin)+1,k=>{
      const amplitude=(k===0?1:2)*coefficients(signal,k)*n/norm;
      return [k*bin,20*Math.log10(Math.max(amplitude,1e-6))];
    });
    plot(lab.querySelector("canvas"),{xMin:0,xMax:2,yMin:-105,yMax:5,xTicks:ticks([0,.5,1,1.5,2]," MHz"),yTicks:ticks([-100,-80,-60,-40,-20,0]),series:[trace(spec)]});
    const best=spec.reduce((a,b)=>a[1]>=b[1]?a:b);
    output("频点间隔 "+(1000*bin).toFixed(1)+" kHz · 最大频点 "+best[0].toFixed(3)+" MHz / "+best[1].toFixed(2)+" dB");
  }
  function inspect(){
    const entry=cpRow(),v=entry.trace;
    rows([["失配 / 滤波电容",entry.m+"% / "+entry.c+" pF"],["样本数 / 间隔",v.length+" 点 / 2 ns"],["峰峰值",pp(v).toFixed(3)+" mVpp"]]);
    output("当前选择可导出 time_s,vctrl_v 两列。时间原点是所选稳态周期的第一个采样点。");
  }
  function exportTrace(){
    const entry=cpRow(),csv="time_s,vctrl_v\n"+entry.trace.map((v,i)=>[(i*2e-9).toExponential(9),v].join(",")).join("\n")+"\n";
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
    const a=document.createElement("a");a.href=url;a.download="cp01-m"+entry.m+"-c"+entry.c+"pf.csv";a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  const lessons={fDesign:design,fSystem:system,fFft:fft,fInspect:inspect};
  const draw=lessons[lab.dataset.lab];
  if(draw){
    lab.addEventListener("input",draw);
    document.getElementById("f-export")?.addEventListener("click",exportTrace);
    draw();
  }
})();

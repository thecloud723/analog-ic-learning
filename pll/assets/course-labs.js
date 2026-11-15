(() => {
  'use strict';
  const tau = 2 * Math.PI;
  const colors = ['#086d91','#a94d16','#287650','#7749a0','#677987'];
  const seq = (n, fn) => Array.from({length:n}, (_,i)=>fn(i));
  const fmt = (x,d=2) => Number(x.toFixed(d)).toString();
  const avg = a => a.reduce((s,x)=>s+x,0)/a.length;
  const meanFree = a => { const m=avg(a); return a.map(x=>x-m); };
  const rms = a => Math.sqrt(avg(a.map(x=>x*x)));
  const pk = a => Math.max(...a)-Math.min(...a);
  const db = p => 10*Math.log10(Math.max(1e-30,p));
  const line = (name,x,y,type='line') => ({name,x,y,type});
  const flow = items => '<div class="study-flow">'+items.map((s,i)=>(i?' <span aria-hidden="true">→</span> ':'')+'<span class="study-step">'+s+'</span>').join('')+'</div>';
  function plot(title, xUnit, yUnit, traces, bounds={}) {
    const xs=traces.flatMap(t=>t.x), ys=traces.flatMap(t=>t.y);
    const [a,b]=bounds.x ?? [Math.min(...xs),Math.max(...xs)];
    let [c,d]=bounds.y ?? [Math.min(0,...ys),Math.max(0,...ys)];
    if(c===d){c-=1;d+=1;}
    const left=60, right=412, top=16, bottom=132;
    const X=x=>left+(x-a)/(b-a||1)*(right-left);
    const Y=y=>bottom-(y-c)/(d-c)*(bottom-top);
    const grids=seq(5,i=>{
      const t=i/4, x=left+(right-left)*t, y=bottom-(bottom-top)*t;
      return `<path d="M${x} ${top}V${bottom} M${left} ${y}H${right}" stroke="#e4edf2"/><text x="${x}" y="149" text-anchor="middle">${fmt(a+(b-a)*t)}</text><text x="55" y="${y+4}" text-anchor="end">${fmt(c+(d-c)*t,3)}</text>`;
    }).join('');
    const marks=traces.map(({x,y,type},j)=>{
      const color=colors[j%colors.length];
      if(type==='stem')return x.map((v,i)=>`<path d="M${X(v)} ${bottom}V${Y(y[i])}" stroke="${color}" stroke-width="2"/>`).join('');
      if(!x.length)return '';
      const path=x.map((v,i)=>i===0?'M'+X(v)+' '+Y(y[i]):type==='step'?'H'+X(v)+'V'+Y(y[i]):'L'+X(v)+' '+Y(y[i])).join('');
      return `<path d="${path}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>`;
    }).join('');
    return `<div class="study-card"><h4>${title}</h4><svg viewBox="0 0 430 176" role="img" aria-label="${title}，横轴 ${xUnit}，纵轴 ${yUnit}">
      <svg x="${left}" y="${top}" width="${right-left}" height="${bottom-top}" viewBox="${left} ${top} ${right-left} ${bottom-top}" overflow="hidden">${marks}</svg>
      <g font-size="10.5" fill="#36566b">${grids}<text x="62" y="11">${yUnit}</text><text x="412" y="167" text-anchor="end">${xUnit}</text></g>
    </svg><div class="study-key">${traces.map((t,i)=>`<span style="color:${colors[i%colors.length]}">● ${t.name}</span>`).join('')}</div></div>`;
  }
  const grid = (...plots) => '<div class="study-grid">'+plots.join('')+'</div>';
  const verdict = text => '<output aria-live="polite">'+text+'</output>';
  const table = (heads, rows) => '<div class="study-scroll"><table><thead><tr>'+heads.map(h=>'<th scope="col">'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  const choice = (key,label,entries,initial=entries[0]) => ({key,label,entries,initial});
  const toggle = (key,label,initial=false) => ({key,label,initial});
  const cpControls=[choice('m','下拉电流偏小 (%)',[0,5,10],5),choice('c','滤波电容 (pF)',[5,10,20],10)];
  const cpTrace = ({m,c}) => globalThis.pllCP.find(row=>row.m===m&&row.c===c).trace;
  const pulseShape = ns => Math.max(0,Math.min(1,ns,62-ns));
  function dft(a,k) {
    let re=0,im=0;
    for(let i=0;i<a.length;i++){const angle=tau*k*i/a.length;re+=a[i]*Math.cos(angle);im-=a[i]*Math.sin(angle);}
    return (re*re+im*im)/(a.length*a.length);
  }
  function noise(n) {
    let seed=524287;
    const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return (seed+1)/4294967297;};
    return seq(n,()=>Math.sqrt(-2*Math.log(rand()))*Math.cos(tau*rand()));
  }
  function pfd(events,delay,stop) {
    let up=0,dn=0,resetAt=Infinity,r=0;
    const out=[[0,0,0,0,0,0]];
    for (const [t,kind] of [...events,[stop,'end']]) {
      if(resetAt<=t){out.push([resetAt,up,dn,1,0,0],[resetAt,0,0,0,0,0]);up=dn=0;resetAt=Infinity;r++;}
      if(kind==='ref')up=1;
      if(kind==='fb')dn=1;
      if(up&&dn&&resetAt===Infinity)resetAt=t+delay;
      out.push([t,up,dn,0,kind==='ref'?1:0,kind==='fb'?1:0]);
    }
    return {out,r};
  }
  const loopControls=[choice('r','滤波 R (kΩ)',[2,5,9],5)];
  const loop = r => {
    const wn=tau*1e5, z=.55*r/5, dt=.01e-6;
    let y=0,v=0;
    const x=seq(1001,i=>i*dt*1e6), phase=[], rate=[], drive=[];
    for(const _ of x){
      const e=1-y;
      phase.push(y);rate.push(v/wn);drive.push(e-2*z*v/wn);
      v+=dt*(wn*wn*e-2*z*wn*v);y+=dt*v;
    }
    // Phase step tracking contains the zero of the CP-PLL PI filter.
    const tracked=phase.map((y,i)=>y+2*z*rate[i]);
    const f=seq(101,i=>1e3*10**(4*i/100));
    const mag=f.map(h=>{const q=tau*h/wn;return 20*Math.log10(Math.hypot(1,2*z*q)/(q*q));});
    const angle=f.map(h=>-180+Math.atan(2*z*tau*h/wn)*180/Math.PI);
    const cross=Math.sqrt(2*z*z+Math.sqrt(1+4*z**4))*wn/tau;
    const margin=Math.atan(2*z*tau*cross/wn)*180/Math.PI;
    return {x,tracked,phase,rate,drive,f,mag,angle,margin,cross,z};
  };
  const lockAt = (a,x,tol) => {
    let last=-1;
    for(let i=0;i<a.length;i++)if(Math.abs(a[i]-1)>tol)last=i;
    return x[last+1] ?? null;
  };
  function adpll({gain=1,estimate=1,kp=.3,ki=.04,fcw=16.2,step=64}) {
    let actual=0,target=0,integral=0,frequency=16;
    const rows=[];
    for(let n=0;n<=step;n++){
      if(n>0){target+=fcw;actual+=frequency;}
      const measured=Math.round(actual*64)/64;
      const error=target-measured;
      integral+=ki*error;
      const word=(kp*error+integral)/estimate;
      frequency=16+gain*word;
      rows.push({n,target,measured,error,integral,word,frequency});
    }
    return rows;
  }
  const labs={};
  labs.frequency={
    controls:[choice('r','参考分频 R',[1,2,4]),choice('n','反馈分频 N',[12,16,20],16),choice('d','输出分频 D',[1,2,4])],
    render:({r,n,d})=>flow(['参考 100 MHz','÷ '+r,'PFD '+fmt(100/r)+' MHz','VCO '+fmt(100*n/r)+' MHz','÷ '+d,'输出 '+fmt(100*n/(r*d))+' MHz'])+
      verdict('反馈经 ÷ '+n+' 后为 '+fmt(100/r)+' MHz，与 PFD 参考端相同。')
  };
  labs.phase={
    controls:[choice('offset','初始反馈滞后 (ns)',[0,1,2],1),choice('error','反馈频偏 (MHz)',[-2,0,2],0)],
    render:({offset,error})=>{
      const n=seq(19,i=>i), ref=n.map(i=>i*10), fb=n.map(i=>offset+i*1000/(100+error));
      return grid(plot('边沿序列','时间 (ns)','参考／反馈',[line('参考边沿',ref,ref.map(()=>.45),'stem'),line('反馈边沿',fb,fb.map(()=>1),'stem')],{y:[0,1.2]}),
        plot('反馈边沿相对参考边沿','边沿序号','时间差 (ns)',[line('反馈 − 参考',n,fb.map((v,i)=>v-ref[i]))]))+
        verdict(error===0?'同频时，每对边沿的时间差都保持 '+fmt(offset)+' ns。':error>0?'反馈周期变短。初始滞后会逐拍减小。':'反馈周期变长。反馈边沿逐拍落后。');
    }
  };
  labs.direction={
    controls:[choice('free','VCO 自由振荡频率 (MHz)',[1500,1600,1700],1500)],
    render:({free})=>{
      const ref=100, fb=free/16, lead=fb<ref, same=fb===ref;
      return flow(['REF 100 MHz','FB '+fmt(fb)+' MHz',same?'频率相同':lead?'REF 边沿逐拍走到前面':'FB 边沿逐拍走到前面',same?'无净频率拉动':lead?'UP 占优 → VCTRL 上升':'DN 占优 → VCTRL 下降'])+
        verdict(same?'这里令初始相位对齐。':lead?'正调谐增益下，VCO 加速。':'正调谐增益下，VCO 减速。');
    }
  };
  labs.arch={
    controls:[choice('type','架构',['XOR PLL','CP-PLL','ADPLL'],'CP-PLL')],
    render:({type})=>({
      'XOR PLL':flow(['参考与反馈方波','XOR 占空比','低通与控制电压','VCO','反馈分频'])+verdict('比较两路方波的相位，控制量是电压。'),
      'CP-PLL':flow(['REF / FB 边沿','PFD 脉宽','CP 电流','RC 控制电压','VCO','反馈分频'])+verdict('比较边沿先后，控制量仍然是电压。'),
      'ADPLL':flow(['FCW 目标相位','计数器 + TDC 测得相位','数字 PI','DCO 控制码','相位反馈'])+verdict('比较目标相位码与测得相位码，控制量是数字码。')
    })[type]
  };
  labs.pfd={
    controls:[choice('offset','首个 FB 边沿偏移 (ns)',[-2,0,2],2),choice('drift','FB 每周期额外偏移 (ns)',[-1,0,1],0),choice('node','测点',['REF','FB','UP','DN','RESET'],'UP')],
    render:({offset,drift,node})=>{
      const ref=seq(7,i=>5+i*10), fb=seq(7,i=>5+offset+i*(10+drift));
      const events=[...ref.map(t=>[t,'ref']),...fb.map(t=>[t,'fb'])].sort((a,b)=>a[0]-b[0]);
      const {out}=pfd(events,1,75);
      const x=out.map(row=>row[0]);
      const nodeTraces={
        REF:line('REF 边沿',ref,ref.map(()=>1),'stem'),FB:line('FB 边沿',fb,fb.map(()=>1),'stem'),
        UP:line('UP',x,out.map(r=>r[1]),'step'),DN:line('DN',x,out.map(r=>r[2]),'step'),
        RESET:line('RESET 事件',out.filter(r=>r[3]).map(r=>r[0]),out.filter(r=>r[3]).map(()=>1),'stem')};
      const buttons=['REF','FB','UP','DN','RESET'].map(name=>`<button type="button" data-study-probe="${name}" aria-pressed="${node===name}">${name}</button>`).join(' ');
      return flow(['REF → DFF → UP','FB → DFF → DN','UP ∧ DN → 延迟 1 ns → 两路复位'])+
        '<div class="study-flow" aria-label="PFD 测点">'+buttons+'</div>'+
        grid(plot('输入边沿','时间 (ns)','边沿',[nodeTraces.REF,line('FB 边沿',fb,fb.map(()=>.65),'stem')],{x:[0,75],y:[0,1.2]}),
        plot('所选测点','时间 (ns)','逻辑值',[nodeTraces[node]],{x:[0,75],y:[0,1.2]}))+
        verdict('交换首个边沿的先后，观察 UP/DN 哪一路先拉高。频偏打开时，比较多拍脉宽。');
    }
  };
  labs.cp={
    controls:[...cpControls,choice('node','测点',['UP/DN','I_CP','V_CTRL'],'V_CTRL')],
    render:opts=>{
      const {m,c,node}=opts, v=cpTrace(opts), x=seq(v.length,i=>2*i), ac=meanFree(v).map(p=>1000*p);
      const traces=node==='V_CTRL'?[line('V_CTRL 去直流',x,ac)]:node==='I_CP'?
        [line('净 CP 电流',x,x.map(t=>m*pulseShape(t)))]:
        [line('UP 与 DN 同时有效',x,x.map(pulseShape))];
      const schematic=`<svg viewBox="0 0 430 148" role="img" aria-label="两路电流源接控制端，电容接地，电阻接偏置">
        <g fill="none" stroke="#31596d" stroke-width="2">
        <path d="M80 20V39M80 65V82H342V57M80 82V103M80 129V139 M220 82V103m-12 0h24m-24 7h24m-12 0v29 M342 57l-6 -3 12 -6 -12 -6 12 -6 -6 -4V20 M72 139h16m-13 4h10 M212 139h16m-13 4h10 M72 20h16m-13 -4h10"/>
        <circle cx="80" cy="52" r="13"/><circle cx="80" cy="116" r="13"/><path d="M80 44v15m-4 -5 4 5 4 -5M80 108v15m-4 -5 4 5 4 -5"/>
        </g><g fill="#163247" font-size="12"><text x="99" y="53">UP 100 µA</text><text x="99" y="119">DN ${100-m} µA</text>
        <text x="228" y="75">V_CTRL</text><text x="240" y="114">${c} pF</text><text x="355" y="47">10 kΩ</text><text x="352" y="20">0.9 V</text></g><circle cx="220" cy="82" r="3" fill="#176c88"/></svg>`;
      const probes=['UP/DN','I_CP','V_CTRL'].map(name=>`<button type="button" data-study-probe="${name}" aria-pressed="${node===name}">${name}</button>`).join(' ');
      return grid('<div class="study-card"><h4>局部 SPICE 电路</h4>'+schematic+'<div class="study-key">'+probes+'</div></div>',
        plot(node,'周期内时间 (ns)',node==='V_CTRL'?'电压 (mV)':node==='I_CP'?'电流 (µA)':'逻辑状态',traces,{x:[0,1000]}))+
        verdict('上下脉冲每 1 µs 重叠约 60 ns。V_CTRL 周期纹波 '+fmt(1000*pk(v),3)+' mVpp。');
    }
  };
  labs.ro={
    controls:[choice('n','反相器级数',[3,5,7],5),choice('d','单级传播延迟 (ps)',[8,12,20],12)],
    render:({n,d})=>{
      const t=2*n*d,x=seq(301,i=>i);
      return flow([...seq(n,i=>'反相器 '+(i+1)),'回到第 1 级'])+
        plot('理想数字延迟站模型','时间 (ps)','逻辑值',[line('环上测点',x,x.map(v=>Math.floor(v/(t/2))%2),'step')],{x:[0,300],y:[0,1.2]})+
        verdict('翻转传播一圈用 '+n*d+' ps，再翻回来才走完周期。频率约 '+fmt(1000/t)+' GHz。');
    }
  };
  labs.bank={
    controls:[choice('code','接入的电容单元数',[0,1,2,3,4,5,6,7],3),choice('unit','单元电容 (fF)',[10,25,50],25)],
    render:({code,unit})=>{
      const x=seq(8,i=>i), f=x.map(i=>1e-9/(tau*Math.sqrt(1e-9*(650+i*unit)*1e-15)));
      return flow(['基底 650 fF','接入 '+code+' × '+unit+' fF','总电容 '+(650+code*unit)+' fF'])+
        plot('电容 Bank 的频率档位','接入单元数','频率 (GHz)',[line('理想 LC',x,f,'step'),line('当前档', [code],[f[code]],'stem')],{x:[0,7],y:[Math.min(...f)-.1,Math.max(...f)+.1]})+
        verdict('当前 '+fmt(f[code],3)+' GHz。等量电容步进对应的频率步进逐渐变小。');
    }
  };
  labs.loop9={
    controls:[...loopControls,choice('node','观测量',['相位误差','积分支路','控制量'],'相位误差')],
    render:({r,node})=>{
      const a=loop(r), values={'相位误差':a.tracked.map(v=>1-v),'积分支路':a.rate,'控制量':a.rate.map((v,i)=>v+2*a.z*a.drive[i])};
      return flow(['相位误差','PFD/CP 平均作用','滤波器积分状态','VCO 控制与频率','反馈相位'])+
        plot(node,'时间 (µs)','归一化',[line(node,a.x,values[node])])+
        verdict('理想平均模型对 1 rad 参考相位阶跃的响应。观察误差过零时，哪个状态仍须继续变化。');
    }
  };
  labs.loop10={
    controls:loopControls,
    render:({r})=>{
      const a=loop(r), x=a.f.map(f=>Math.log10(f));
      return grid(plot('开环幅频','log₁₀(频率 / Hz)','增益 (dB)',[line('开环增益',x,a.mag),line('0 dB',[3,7],[0,0])]),
        plot('开环相频','log₁₀(频率 / Hz)','相位 (°)',[line('开环相位',x,a.angle)],{y:[-180,-85]}))+
        verdict('交越频率 '+fmt(a.cross/1000,1)+' kHz，相位裕量 '+fmt(a.margin,1)+'°。调整同一个 R 后去第 11 章比较振铃。');
    }
  };
  labs.loop11={
    controls:[...loopControls,choice('tol','锁定误差带 (%)',[1,2,5],2)],
    render:({r,tol})=>{
      const a=loop(r), t=lockAt(a.tracked,a.x,tol/100);
      return plot('参考相位阶跃与判定带','时间 (µs)','相位 (rad)',[line('输出相位（折回比较端）',a.x,a.tracked),
        line('误差带上界',[0,10],[1+tol/100,1+tol/100]),line('误差带下界',[0,10],[1-tol/100,1-tol/100])])+
        verdict('进入误差带且在记录内不再越界：'+(t===null?'10 µs 内未达到':fmt(t)+' µs')+'。改变误差带会改变读数，响应曲线取决于 R。');
    }
  };
  labs.noise12={
    controls:[toggle('tone','周期性扰动'),toggle('random','随机扰动'),choice('amp','周期偏移峰值 (ps)',[1,3,6],3),
      choice('sigma','随机偏移 RMS (ps)',[.3,1,3],1),choice('band','积分上限 (MHz)',[2,5,12],5)],
    render:({tone,random,amp,sigma,band})=>{
      const n=512, fs=32e6, carrier=1.6e9, df=fs/n, kTone=16;
      const x=seq(n,i=>i/fs*1e6);
      const appliedTone=x.map(t=>tone?amp*Math.sin(tau*t):0);
      const raw=meanFree(noise(n)), normal=rms(raw);
      const jit=raw.map(v=>random?v*sigma/normal:0);
      const timeError=jit.map((v,i)=>v+appliedTone[i]);
      const rad=v=>-tau*carrier*v*1e-12;
      const psd=random?seq(n/2-1,i=>dft(jit.map(rad),i+1)/df):[];
      const side=tone?db(dft(appliedTone.map(rad),kTone)):null;
      const lines=tone?line('载波与 ±1 MHz 边带',[-1,0,1],[side,0,side],'stem'):line('载波',[0],[0],'stem');
      const limit=Math.floor(band*1e6/df);
      const jitter=random?Math.sqrt(2*df*psd.slice(0,limit).reduce((sum,p)=>sum+p,0))/(tau*carrier)*1e12:0;
      const spectra=[plot('离散谱线','距载波的频偏 (MHz)','dBc',[lines],{x:[-4,4],y:[-90,5]})];
      if(random)spectra.push(plot('连续噪声：单边带密度','正频偏 (MHz)','dBc/Hz',[
        line('随机分量 PSD',psd.map((_,i)=>(i+1)*df/1e6),psd.map(db)),
        line('随机抖动积分上限',[band,band],[-190,-100])],{x:[0,16],y:[-190,-100]}));
      return plot('输出边沿相对理想位置的偏差（等间隔观测）','时间 (µs)','偏差 (ps)',[line('边沿误差',x,timeError)],{x:[0,5],y:[-16,16]})+
        grid(...spectra)+verdict((tone?'每侧边带 '+fmt(side,1)+' dBc。':'当前没有周期边带。')+
          (random?' 随机分量从首个非零频点 62.5 kHz 积到 '+band+' MHz：'+fmt(jitter,3)+' ps RMS。':' 打开随机扰动可看到噪声底。'))+
        '<p>从同一串时间误差分离已知的周期分量和随机分量，再做小相位频谱估计。两种纵轴的单位不同。此处的 RMS 只积分随机分量。</p>';
    }
  };
  labs.spur13={
    controls:[...cpControls,choice('gain','VCO 灵敏度 (MHz/V)',[15,30,60],30)],
    render:opts=>{
      const trace=meanFree(opts.imported ?? cpTrace(opts)), ps=seq(trace.length,i=>2*i);
      const v1=2*Math.sqrt(dft(trace,1)), beta=opts.gain*v1;
      let phase=0;
      const edge=trace.map(v=>{phase+=tau*opts.gain*1e6*v*2e-9;return -1e12*phase/(tau*2.1e9);});
      const side=beta>1e-7?db(beta*beta/4):null;
      const band=side===null?line('载波',[0],[0],'stem'):line('载波与第一对边带',[-1,0,1],[side,0,side],'stem');
      return grid(plot(opts.imported?'导入的控制电压纹波':'第 7 章的控制电压纹波','周期内时间 (ns)','mV',[line('V_CTRL 去直流',ps,trace.map(v=>v*1000))]),
        plot('同一纹波造成的边沿误差','周期内时间 (ns)','ps',[line('边沿偏差（相对平均）',ps,meanFree(edge))]),
        plot('第一对参考边带估计','距载波的频偏 (MHz)','dBc',[band],{x:[-4,4],y:[-90,5]}))+
        verdict('纹波基波峰值 '+fmt(1000*v1,3)+' mV。'+(side===null?'本例未检出 1 MHz 边带。':'±1 MHz，每侧约 '+fmt(side,1)+' dBc。'))+
        '<p>取每 1 µs 重复纹波的基波，用 β = K<sub>VCO</sub>·V<sub>1</sub>/f<sub>m</sub> 估计小调制边带。图只画第一对边带。第 7 章的局部 RC 负载用来观察耦合路径，后面的 2.1 GHz 原图展示整机实测频谱。</p>';
    }
  };
  labs.fractional={
    controls:[choice('num','小数分子',[0,1,3,6],3),choice('ref','PFD 频率 (MHz)',[1,10,50],10)],
    render:({num,ref})=>{
      const x=seq(21,i=>i), words=x.map(i=>20+Math.floor((i+1)*num/10)-Math.floor(i*num/10));
      const running=x.map(i=>avg(words.slice(0,i+1)));
      return grid(plot('每拍的整数分频字','参考拍','分频字',[line('N[n]',x,words,'step')],{y:[19.5,21.5]}),
        plot('截至当前拍的平均值','参考拍','平均分频比',[line('运行平均',x,running),line('目标',[0,20],[20+num/10,20+num/10])],{y:[19.8,21.1]}))+
        verdict('目标 N = '+fmt(20+num/10)+'，对应 '+fmt(ref*(20+num/10))+' MHz。整数档位相隔 '+ref+' MHz。');
    }
  };
  function mash(n,dither) {
    const mod=40960, word=12288;
    let a=0,b=0,c=0,p2=0,p3=0,p33=0;
    const d=noise(n).map(v=>v<0?-1:1);
    return seq(n,i=>{
      const input=word+(dither?(d[i]-(d[i-1]??d[0]))*16:0);
      let sum=a+input;const y1=Math.floor(sum/mod);a=sum-y1*mod;
      sum=b+a;const y2=Math.floor(sum/mod);b=sum-y2*mod;
      sum=c+b;const y3=Math.floor(sum/mod);c=sum-y3*mod;
      const combined=y1+y2-p2+y3-2*p3+p33;
      p2=y2;p33=p3;p3=y3;
      return [y1,combined];
    });
  }
  labs.mash={
    controls:[toggle('dither','加入微小 Dither')],
    render:({dither})=>{
      const values=mash(1512,dither).slice(1000), x=seq(48,i=>i);
      const a=values.map(v=>v[0]), b=values.map(v=>v[1]), k=seq(255,i=>i+1);
      const spectrum=v=>{const residual=meanFree(v);return k.map(i=>db(dft(residual,i)));};
      return grid(plot('固定小数 0.3 的逐拍修正字','参考拍','修正整数',[line('一阶',x,a.slice(0,48),'step'),line('MASH 1-1-1',x,b.slice(0,48),'step')]),
        plot('分频修正字的频谱','归一化频率 (f/fPFD)','相对功率 (dB/bin)',[line('一阶',k.map(i=>i/512),spectrum(a)),line('MASH 1-1-1',k.map(i=>i/512),spectrum(b))],{x:[0,.5],y:[-100,0]}))+
        verdict('512 拍均值：一阶 '+fmt(avg(a),3)+'，MASH '+fmt(avg(b),3)+'。频谱取去均值后的整数修正字。');
    }
  };
  labs.digital={
    controls:[choice('fcw','FCW',[16.1,16.2,16.4],16.2),choice('node','测点',['相位误差','PI 积分','DCO 频率'],'相位误差')],
    stepping:true,
    render:({fcw,node,step})=>{
      const rows=adpll({fcw}), row=rows[step], prev=rows[Math.max(0,step-1)];
      const field={'相位误差':'error','PI 积分':'integral','DCO 频率':'frequency'}[node];
      return flow(['FCW '+fcw,'目标累积相位','TDC 量化相位','PI','DCO'])+
        table(['参考拍','目标相位','测得相位','误差','PI 积分','下一拍频率比'],[prev,row].map(r=>[r.n,...['target','measured','error','integral','frequency'].map(k=>fmt(r[k],3))]))+
        plot(node,'参考拍','归一化值',[line(node,rows.slice(0,step+1).map(r=>r.n),rows.slice(0,step+1).map(r=>r[field]))],{x:[0,64]})+
        verdict('点击下一拍。相位单位为周期，频率以参考频率为单位，TDC 分辨率为 1/64 周期。');
    }
  };
  labs.cal={
    controls:[choice('gain','实际 DCO 增益 / 名义增益',[.5,1,1.5],.5),toggle('on','应用测得的增益')],
    render:({gain,on})=>{
      const f0=16, f1=f0+gain*.25, estimate=(f1-f0)/.25;
      const a=adpll({gain}),b=adpll({gain,estimate:on?estimate:1}), x=a.map(r=>r.n);
      return flow(['控制码改变量 +0.25','测量频率比 '+fmt(f0)+' → '+fmt(f1,3),'测得增益 '+fmt(estimate)])+
        plot('用同一增益偏差比较校准前后','参考拍','相位误差 (周期)',[
          line('沿用名义增益',x,a.map(r=>r.error)),line(on?'应用实测增益':'当前设置',x,b.map(r=>r.error))])+
        verdict('PI 给出的频率修正除以所用增益，再转换为 DCO 控制量。');
    }
  };
  labs.accept={
    controls:[...loopControls,...cpControls,choice('noise','噪声预算缩放',[1,2,3],1)],
    render:opts=>{
      const a=loop(opts.r), t=lockAt(a.tracked,a.x,.02);
      const ref=1,n=1600, jitter=Math.hypot(50,45*opts.noise,20);
      const v1=2*Math.sqrt(dft(meanFree(cpTrace(opts)),1)), spur=v1>1e-12?db((30*v1/2)**2):null;
      const rows=[
        ['输出频率','1.600 GHz',fmt(ref*n/1000,3)+' GHz',true],
        ['相位阶跃收敛','≤ 7 µs，2% 误差带',t===null?'10 µs 内未达':fmt(t)+' µs',t!==null&&t<=7],
        ['随机抖动预算','≤ 100 fs RMS',fmt(jitter,1)+' fs RMS',jitter<=100],
        ['第一参考边带','≤ −55 dBc',spur===null?'未检出':fmt(spur,1)+' dBc',spur===null||spur<=-55]
      ];
      return table(['验收项','教学规格','模型读数','判定'],rows.map(([a,b,c,pass])=>[a,b,c,pass?'通过':'未通过']))+
        verdict(rows.filter(row=>row[3]).length+' / 4 项达到教学规格。')+
        '<p>比较端相位响应沿用第 11 章，频率规划用 1 MHz 鉴相频率、N=1600。参考边带沿用第 13 章的 1 MHz 纹波。噪声预算假设三项输出端 RMS 贡献独立，参考 50 fs、VCO 名义 45 fs、其他 20 fs。这是频率规划、平均环路模型、噪声预算和局部纹波模型组成的教学验收。</p>';
    }
  };
  for(const root of document.querySelectorAll('[data-study]')){
    const lab=labs[root.dataset.study];
    if(!lab)continue;
    const slot=root.querySelector('.study-result'), controls=root.querySelector('.study-controls');
    const state={step:1};
    for(const c of lab.controls){
      state[c.key]=c.initial;
      const label=document.createElement('label');
      label.textContent=c.label;
      const input=document.createElement(c.entries?'select':'input');
      if(c.entries){
        c.entries.forEach((entry,i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=String(entry);if(entry===c.initial)option.selected=true;input.append(option);});
      }else{input.type='checkbox';input.checked=c.initial;}
      input.addEventListener('change',()=>{state[c.key]=c.entries?c.entries[Number(input.value)]:input.checked;draw();});
      label.append(input);controls.append(label);
    }
    if(['cp','pfd'].includes(root.dataset.study)){
      slot.addEventListener('click',event=>{
        const name=event.target.closest('[data-study-probe]')?.dataset.studyProbe;
        if(!name)return;
        state.node=name;
        controls.querySelectorAll('select')[2].value=String(lab.controls[2].entries.indexOf(name));
        draw();
        slot.querySelector('[data-study-probe="'+name+'"]').focus();
      });
    }
    if(root.dataset.study==='spur13'){
      const label=document.createElement('label'), file=document.createElement('input');
      const clear=document.createElement('button'), status=document.createElement('span');
      label.textContent='导入第 7 章 vctrl.csv';file.type='file';file.accept='.csv,text/csv';label.append(file);
      clear.type='button';clear.textContent='恢复预跑';clear.disabled=true;
      status.setAttribute('role','status');controls.append(label,clear,status);
      file.addEventListener('change',async()=>{
        const selected=file.files[0];
        if(!selected)return;
        try{
          if(selected.size>100000)throw Error();
          const raw=(await selected.text()).trim().split(/\r?\n/);
          if(raw.shift()!=='time_s,vctrl_v'||raw.length!==500)throw Error();
          state.imported=raw.map((row,i)=>{
            const parts=row.split(',');
            const [time,v]=parts.map(Number);
            if(parts.length!==2 || parts.some(p=>!p.trim()) || !Number.isFinite(time) ||
              !Number.isFinite(v) || Math.abs(time-i*2e-9)>1e-12)throw Error();
            return v;
          });
          controls.querySelectorAll('select').forEach((input,i)=>{if(i<2)input.disabled=true;});
          clear.disabled=false;status.textContent='已导入一个 1 µs 周期。';draw();
        }catch{status.textContent='CSV 格式应为 time_s,vctrl_v，包含 500 个间隔 2 ns 的采样点。';file.value='';}
      });
      clear.addEventListener('click',()=>{
        state.imported=undefined;file.value='';clear.disabled=true;
        controls.querySelectorAll('select').forEach(input=>{input.disabled=false;});
        status.textContent='已恢复预跑结果。';draw();
      });
    }
    let back,next;
    if(lab.stepping){
      back=document.createElement('button');next=document.createElement('button');
      back.type=next.type='button';back.textContent='上一拍';next.textContent='下一拍';controls.append(back,next);
      back.addEventListener('click',()=>{state.step=Math.max(0,state.step-1);draw();});
      next.addEventListener('click',()=>{state.step=Math.min(64,state.step+1);draw();});
    }
    function draw(){
      slot.innerHTML=lab.render(state);
      if(back){back.disabled=state.step===0;next.disabled=state.step===64;}
    }
    draw();
  }
})();

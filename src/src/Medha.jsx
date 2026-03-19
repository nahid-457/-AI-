import{useState,useRef,useEffect}from"react";
const C=["MEDHA-2025","NAHID-OWNER"];
const S=`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Playfair+Display:wght@900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Hind Siliguri',sans-serif;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:rgba(212,175,55,0.3);}
@keyframes up{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes sp{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes fi{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes sh{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.sk{animation:sh 0.4s ease}.mc:hover{transform:translateY(-2px)}textarea:focus{outline:none!important;border-color:rgba(212,175,55,0.4)!important;}`;
const M={
business:{id:"business",icon:"💼",label:"ব্যবসা পরিকল্পনা",en:"Business Plan",color:"#f59e0b",
desc:"আইডিয়া থেকে সম্পূর্ণ পরিকল্পনা",
ex:["ঢাকায় হোম ডেলিভারি রেস্টুরেন্ট করতে চাই","অনলাইনে হ্যান্ডমেড গহনার ব্যবসা","গ্রামে পোল্ট্রি ফার্ম করার পরিকল্পনা"],
sys:"তুমি বাংলাদেশের বাজার বিশেষজ্ঞ। ব্যবসার আইডিয়া থেকে সম্পূর্ণ পরিকল্পনা দাও: বাজার বিশ্লেষণ, খরচ(টাকায়), আয়ের পূর্বাভাস, মার্কেটিং কৌশল, শুরুর ধাপ। ওয়েব সার্চ করে বাস্তব তথ্য দাও।"},
viral:{id:"viral",icon:"🔥",label:"ভাইরাল কন্টেন্ট",en:"Viral Content",color:"#ef4444",
desc:"হুক, স্ক্রিপ্ট ও ক্যাপশন",
ex:["ফুড পেজের জন্য ভাইরাল ফেসবুক পোস্ট","ইউটিউব ভিডিওর আকর্ষণীয় স্ক্রিপ্ট","অনলাইন বিজনেসের বিজ্ঞাপন কপি"],
sys:"তুমি বাংলাদেশের সোশ্যাল মিডিয়া বিশেষজ্ঞ। ৫টি হুক, ফুল স্ক্রিপ্ট, হ্যাশট্যাগ, পোস্টের সেরা সময় দাও। বাংলাদেশী দর্শকের আবেগ স্পর্শ করে এমন কন্টেন্ট বানাও। ট্রেন্ড সার্চ করো।"},
decision:{id:"decision",icon:"🧭",label:"জীবন সিদ্ধান্ত",en:"Life Decision",color:"#8b5cf6",
desc:"বড় সিদ্ধান্তের গভীর বিশ্লেষণ",
ex:["বিদেশে যাবো নাকি দেশেই ক্যারিয়ার?","সরকারি চাকরি নাকি নিজের ব্যবসা?","এই বয়সে বিয়ে করা উচিত কিনা"],
sys:"তুমি জীবন কোচ। বাংলাদেশের বাস্তবতা বোঝো। সুবিধা-অসুবিধা, ৩টি ভবিষ্যৎ পরিস্থিতি, ৫ বছরের প্রজেকশন, আর্থিক প্রভাব ও চূড়ান্ত সুপারিশ দাও। সৎভাবে বলো।"},
research:{id:"research",icon:"📚",label:"গভীর গবেষণা",en:"Deep Research",color:"#06b6d4",
desc:"থিসিস-মানের বিশ্লেষণ",
ex:["বাংলাদেশের গার্মেন্টস শিল্পের বর্তমান অবস্থা","জলবায়ু পরিবর্তন বাংলাদেশের কৃষিতে প্রভাব","বাংলাদেশে ডিজিটাল মার্কেটিং ক্যারিয়ার"],
sys:"তুমি বিশেষজ্ঞ গবেষক। থিসিস-মানের গবেষণা করো: পটভূমি, বর্তমান অবস্থা(তথ্য-পরিসংখ্যান), কারণ-প্রভাব, ভবিষ্যৎ প্রবণতা, উপসংহার। ওয়েব সার্চ করে সর্বশেষ তথ্য দাও।"}};

function Txt({t}){
  return t.split("\n").map((l,i)=>{
    if(!l.trim())return<div key={i}style={{height:6}}/>;
    if(l.match(/^#+/)){const lv=l.match(/^#+/)[0].length;return<div key={i}style={{color:"#f0c040",fontWeight:700,fontSize:lv===1?17:14,marginTop:14,marginBottom:5}}>{l.replace(/^#+\s/,"")}</div>}
    if(l.match(/^[-•*] /))return<div key={i}style={{paddingLeft:12,color:"#d4d4aa",marginBottom:3}}><span style={{color:"#f0c04077",marginRight:7}}>◆</span>{l.slice(2)}</div>;
    if(l.match(/^\d+\. /))return<div key={i}style={{paddingLeft:12,color:"#d4d4aa",marginBottom:3}}><span style={{color:"#f0c04099",marginRight:6}}>{l.match(/^\d+/)[0]}.</span>{l.replace(/^\d+\.\s/,"")}</div>;
    const p=l.split(/(\*\*[^*]+\*\*)/g);
    return<div key={i}style={{color:"#d4d4aa",lineHeight:1.8}}>{p.map((x,j)=>x.startsWith("**")&&x.endsWith("**")?<strong key={j}style={{color:"#f5f0d0"}}>{x.slice(2,-2)}</strong>:x)}</div>;
  });
}

function Gate({onOk}){
  const[code,setCode]=useState("");
  const[err,setErr]=useState("");
  const[shake,setShake]=useState(false);
  const[busy,setBusy]=useState(false);
  const go=()=>{
    if(!code.trim())return;
    setBusy(true);
    setTimeout(()=>{
      if(C.includes(code.trim().toUpperCase())){onOk();}
      else{setErr("কোডটি সঠিক নয়।");setShake(true);setTimeout(()=>setShake(false),500);}
      setBusy(false);
    },600);
  };
  return(
    <div style={{background:"#0b1a0d",minHeight:"100vh",fontFamily:"'Hind Siliguri',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative"}}>
      <style>{S}</style>
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(212,175,55,0.07),transparent)",pointerEvents:"none"}}/>
      <div className={shake?"sk":""}style={{animation:"fi 0.5s ease",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:20,padding:"40px 32px",maxWidth:400,width:"100%",textAlign:"center",position:"relative",zIndex:1}}>
        <div style={{fontFamily:"Playfair Display,serif",color:"#d4af37",fontSize:44,fontWeight:900,marginBottom:4,textShadow:"0 0 24px rgba(212,175,55,0.3)"}}>মেধা</div>
        <div style={{color:"rgba(212,175,55,0.45)",fontSize:10,letterSpacing:3,marginBottom:28}}>PREMIUM AI · বাংলাদেশ</div>
        {[["💼","ব্যবসা পরিকল্পনা"],["🔥","ভাইরাল কন্টেন্ট"],["🧭","জীবন সিদ্ধান্ত"],["📚","গভীর গবেষণা"]].map(([ic,lb])=>(
          <div key={lb}style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"rgba(212,175,55,0.04)",borderRadius:8,border:"1px solid rgba(212,175,55,0.08)",marginBottom:8,textAlign:"left"}}>
            <span style={{fontSize:16}}>{ic}</span>
            <span style={{color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:600}}>{lb}</span>
            <span style={{marginLeft:"auto",fontSize:14}}>🔒</span>
          </div>
        ))}
        <div style={{marginTop:20,marginBottom:8,color:"rgba(255,255,255,0.45)",fontSize:11,letterSpacing:1}}>অ্যাক্সেস কোড দিন</div>
        <input value={code}onChange={e=>{setCode(e.target.value);setErr("");}}onKeyDown={e=>e.key==="Enter"&&go()}placeholder="MEDHA-XXXX"
          style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:10,color:"#f0e8c0",fontSize:15,fontFamily:"'Hind Siliguri',sans-serif",padding:"12px 16px",textAlign:"center",letterSpacing:2,marginBottom:10,transition:"all 0.2s"}}/>
        {err&&<div style={{color:"#f87171",fontSize:12,marginBottom:8}}>{err}</div>}
        <button onClick={go}disabled={busy||!code.trim()}
          style={{width:"100%",background:busy||!code.trim()?"rgba(212,175,55,0.04)":"rgba(212,175,55,0.15)",border:`1px solid ${busy||!code.trim()?"rgba(212,175,55,0.1)":"rgba(212,175,55,0.5)"}`,color:busy||!code.trim()?"rgba(212,175,55,0.3)":"#d4af37",fontSize:14,fontWeight:700,fontFamily:"'Hind Siliguri',sans-serif",padding:"12px",borderRadius:10,cursor:busy||!code.trim()?"not-allowed":"pointer",transition:"all 0.2s"}}>
          {busy?"যাচাই করছি...":"🔓 প্রবেশ করুন"}
        </button>
        <div style={{marginTop:18,padding:12,background:"rgba(0,0,0,0.2)",borderRadius:10,border:"1px solid rgba(255,255,255,0.05)"}}>
          <div style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginBottom:4}}>কোড কিনতে</div>
          <div style={{color:"#d4af37",fontSize:13,fontWeight:600}}>📱 bKash / Nagad</div>
        </div>
      </div>
    </div>
  );
}

export default function Medha(){
  const[ok,setOk]=useState(false);
  const[lang,setLang]=useState("bn");
  const[mode,setMode]=useState("business");
  const[msgs,setMsgs]=useState([]);
  const[inp,setInp]=useState("");
  const[busy,setBusy]=useState(false);
  const[status,setStatus]=useState("");
  const hist=useRef([]);
  const bot=useRef(null);
  const ta=useRef(null);
  const m=M[mode];
  const bn=lang==="bn";
  useEffect(()=>{bot.current?.scrollIntoView({behavior:"smooth"})},[msgs,busy]);
  const resize=el=>{el.style.height="auto";el.style.height=Math.min(el.scrollHeight,120)+"px";};
  const switchMode=id=>{setMode(id);setMsgs([]);hist.current=[];};
  const send=async(txt)=>{
    const t=(txt||inp).trim();
    if(!t||busy)return;
    setInp("");setTimeout(()=>ta.current&&resize(ta.current),0);
    setBusy(true);setStatus(bn?"চিন্তা করছি...":"Thinking...");
    setMsgs(p=>[...p,{role:"user",content:t}]);
    hist.current=[...hist.current,{role:"user",content:t}];
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:m.sys,
          tools:[{type:"web_search_20250305",name:"web_search"}],messages:hist.current})});
      if(!r.ok)throw new Error(`Error ${r.status}`);
      const d=await r.json();
      const srch=d.content.filter(b=>b.type==="tool_use"&&b.name==="web_search").map(b=>b.input?.query||"");
      if(srch.length)setStatus((bn?"খুঁজছি: ":"Searching: ")+srch[0]);
      const rep=d.content.filter(b=>b.type==="text").map(b=>b.text).join("")||(bn?"উত্তর পাওয়া যায়নি।":"No response.");
      hist.current=[...hist.current,{role:"assistant",content:rep}];
      setMsgs(p=>[...p,{role:"assistant",content:rep,srch}]);
    }catch(e){setMsgs(p=>[...p,{role:"assistant",content:"❌ "+e.message,err:true}]);}
    setStatus("");setBusy(false);ta.current?.focus();
  };
  if(!ok)return<Gate onOk={()=>setOk(true)}/>;
  return(
    <div style={{background:"#0b1a0d",minHeight:"100vh",fontFamily:"'Hind Siliguri',sans-serif",display:"flex",flexDirection:"column",position:"relative"}}>
      <style>{S}</style>
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse 80% 50% at 50% 0%,rgba(212,175,55,0.06),transparent)",pointerEvents:"none",zIndex:0}}/>
      {/* Header */}
      <header style={{position:"sticky",top:0,zIndex:20,background:"rgba(11,26,13,0.95)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(212,175,55,0.12)",padding:"11px 18px",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontFamily:"Playfair Display,serif",color:"#d4af37",fontSize:22,fontWeight:900,letterSpacing:1}}>মেধা</span>
        <span style={{color:"rgba(212,175,55,0.35)",fontSize:10,letterSpacing:2}}>AI</span>
        <div style={{marginLeft:"auto",display:"flex",gap:6}}>
          {["bn","en"].map(l=>(
            <button key={l}onClick={()=>setLang(l)}
              style={{padding:"4px 12px",borderRadius:20,border:`1px solid ${lang===l?"#d4af37":"rgba(212,175,55,0.2)"}`,background:lang===l?"rgba(212,175,55,0.15)":"transparent",color:lang===l?"#d4af37":"rgba(212,175,55,0.4)",fontSize:12,cursor:"pointer",fontFamily:"'Hind Siliguri',sans-serif"}}>
              {l==="bn"?"বাংলা":"EN"}
            </button>
          ))}
        </div>
      </header>
      {/* Mode bar */}
      <div style={{position:"sticky",top:50,zIndex:19,background:"rgba(11,26,13,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(212,175,55,0.07)",padding:"10px 14px",display:"flex",gap:8,overflowX:"auto"}}>
        {Object.values(M).map(x=>(
          <button key={x.id}className="mc"onClick={()=>switchMode(x.id)}
            style={{flexShrink:0,padding:"8px 14px",borderRadius:10,border:`1px solid ${mode===x.id?x.color:"rgba(255,255,255,0.07)"}`,background:mode===x.id?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.02)",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontFamily:"'Hind Siliguri',sans-serif"}}>
            <span style={{fontSize:16}}>{x.icon}</span>
            <div style={{textAlign:"left"}}>
              <div style={{color:mode===x.id?x.color:"rgba(255,255,255,0.65)",fontSize:12,fontWeight:600,whiteSpace:"nowrap"}}>{bn?x.label:x.en}</div>
              <div style={{color:"rgba(255,255,255,0.28)",fontSize:10,whiteSpace:"nowrap"}}>{x.desc}</div>
            </div>
          </button>
        ))}
      </div>
      {/* Messages */}
      <main style={{flex:1,overflowY:"auto",padding:"20px 16px 150px",zIndex:1,maxWidth:820,width:"100%",margin:"0 auto"}}>
        {msgs.length===0&&(
          <div style={{animation:"up 0.4s ease",textAlign:"center",marginTop:24}}>
            <div style={{fontSize:44,marginBottom:12}}>{m.icon}</div>
            <div style={{color:m.color,fontWeight:700,fontSize:18,marginBottom:6,fontFamily:"Playfair Display,serif"}}>{bn?m.label:m.en}</div>
            <div style={{color:"rgba(255,255,255,0.3)",fontSize:13,marginBottom:24}}>{m.desc}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,maxWidth:500,margin:"0 auto"}}>
              <div style={{color:"rgba(212,175,55,0.4)",fontSize:10,letterSpacing:2,marginBottom:2}}>— উদাহরণ —</div>
              {m.ex.map((s,i)=>(
                <button key={i}onClick={()=>send(s)}
                  style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(212,175,55,0.13)",borderRadius:10,padding:"11px 16px",color:"rgba(255,255,255,0.55)",fontSize:13,cursor:"pointer",textAlign:"left",transition:"all 0.2s",fontFamily:"'Hind Siliguri',sans-serif",lineHeight:1.5}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(212,175,55,0.4)";e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(212,175,55,0.13)";e.currentTarget.style.color="rgba(255,255,255,0.55)";}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((msg,i)=>(
          <div key={i}style={{animation:"up 0.3s ease",marginBottom:20,display:"flex",flexDirection:"column",alignItems:msg.role==="user"?"flex-end":"flex-start"}}>
            <div style={{fontSize:9,letterSpacing:2,color:msg.role==="user"?"rgba(212,175,55,0.4)":`${m.color}55`,marginBottom:6,fontWeight:600}}>
              {msg.role==="user"?(bn?"▶ আপনি":"▶ YOU"):`◈ ${bn?m.label:m.en}`}
            </div>
            {msg.srch?.length>0&&(
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:7,maxWidth:"88%"}}>
                {msg.srch.map((s,j)=>(
                  <span key={j}style={{background:"rgba(212,175,55,0.06)",border:"1px solid rgba(212,175,55,0.18)",color:"rgba(212,175,55,0.65)",fontSize:10,padding:"2px 8px",borderRadius:3}}>🔍 {s}</span>
                ))}
              </div>
            )}
            <div style={{maxWidth:"88%",padding:"13px 18px",background:msg.role==="user"?"linear-gradient(135deg,rgba(212,175,55,0.09),rgba(34,80,30,0.1))":"rgba(255,255,255,0.03)",border:`1px solid ${msg.role==="user"?"rgba(212,175,55,0.18)":msg.err?"rgba(255,50,50,0.2)":"rgba(255,255,255,0.07)"}`,borderRadius:msg.role==="user"?"12px 2px 12px 12px":"2px 12px 12px 12px",fontSize:14,lineHeight:1.8}}>
              {msg.role==="assistant"?<Txt t={msg.content}/>:<span style={{color:"#f0e8c0"}}>{msg.content}</span>}
            </div>
          </div>
        ))}
        {busy&&(
          <div style={{animation:"up 0.3s ease",marginBottom:18,display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
            <div style={{fontSize:9,letterSpacing:2,color:`${m.color}44`,marginBottom:6}}>◈ {bn?m.label:m.en}</div>
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"2px 12px 12px 12px",padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:14,height:14,border:"2px solid rgba(212,175,55,0.15)",borderTop:`2px solid ${m.color}`,borderRadius:"50%",animation:"sp 0.7s linear infinite",flexShrink:0}}/>
              <span style={{color:"rgba(212,175,55,0.6)",fontSize:13}}>{status}</span>
            </div>
          </div>
        )}
        <div ref={bot}/>
      </main>
      {/* Input */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(11,26,13,0.97)",backdropFilter:"blur(16px)",borderTop:"1px solid rgba(212,175,55,0.09)",padding:"11px 16px 15px",zIndex:20}}>
        <div style={{maxWidth:820,margin:"0 auto",display:"flex",gap:9,alignItems:"flex-end"}}>
          <span style={{color:`${m.color}55`,fontSize:17,paddingBottom:10,flexShrink:0}}>{m.icon}</span>
          <textarea ref={ta}value={inp}onChange={e=>{setInp(e.target.value);resize(e.target);}}onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
            disabled={busy}rows={1}placeholder={bn?`${m.label} মোডে প্রশ্ন বা অনুরোধ লিখুন...`:`Ask anything in ${m.en} mode...`}
            style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.14)",borderRadius:10,color:"#f0e8c0",fontSize:14,fontFamily:"'Hind Siliguri',sans-serif",padding:"10px 14px",resize:"none",lineHeight:1.6,overflowY:"auto"}}/>
          <button onClick={()=>send()}disabled={busy||!inp.trim()}
            style={{background:busy||!inp.trim()?"rgba(212,175,55,0.04)":"rgba(212,175,55,0.13)",border:`1px solid ${busy||!inp.trim()?"rgba(212,175,55,0.09)":"rgba(212,175,55,0.4)"}`,color:busy||!inp.trim()?"rgba(212,175,55,0.25)":"#d4af37",fontSize:13,fontWeight:700,fontFamily:"'Hind Siliguri',sans-serif",padding:"10px 18px",borderRadius:10,cursor:busy||!inp.trim()?"not-allowed":"pointer",transition:"all 0.2s",flexShrink:0}}>
            {busy?"···":bn?"পাঠাও":"SEND"}
          </button>
        </div>
        <div style={{maxWidth:820,margin:"5px auto 0",color:"rgba(255,255,255,0.15)",fontSize:10,textAlign:"center"}}>
          {bn?"Enter চাপুন পাঠাতে · Shift+Enter নতুন লাইন":"Enter to send · Shift+Enter new line"}
        </div>
      </div>
    </div>
  );
       }
      

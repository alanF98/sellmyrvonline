const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#F6F1EA">
<meta name="color-scheme" content="light">
<title>Sell your RV with peace of mind | Sell My RV Online</title>
<meta name="description" content="Get a straightforward cash offer for your RV. Over 30 years of experience, free nationwide pickup, and all paperwork handled.">
<meta property="og:title" content="Sell your RV with peace of mind | Sell My RV Online">
<meta property="og:description" content="Get a straightforward cash offer for your RV. Over 30 years of experience, free nationwide pickup, and all paperwork handled.">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{color-scheme:light;--bg:#F6F1EA;--bg2:#EDE5D8;--ink:#1c1915;--mut:#6b6358;--acc:#9c6a34;--card:#fffdf9;--line:rgba(28,25,21,.14);--hero:#14110e;--accent:#f1dec4;--heroink:#f2ebe0;--herom:#a89d8e;--heroacc:#d09a5a;--heroline:rgba(242,235,224,.16);box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
html{scroll-behavior:smooth;scroll-padding-top:calc(env(safe-area-inset-top,0px) + 80px)}
body{margin:0;background:var(--bg);color:var(--ink);font:400 17px/1.6 Inter,system-ui,-apple-system,"Segoe UI",sans-serif;overflow-x:hidden}
h1,h2,h3{font-family:Fraunces,Georgia,"Times New Roman",serif;font-weight:400;line-height:1.05;margin:0;letter-spacing:-.02em}
em{font-style:italic;color:var(--acc)}
a{color:inherit;text-decoration:none}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
.eyebrow{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--acc);font-weight:600}
#nav{position:fixed;top:14px;left:50%;z-index:50;width:min(calc(100% - 2rem),1180px);transform:translateX(-50%);display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:.45rem .45rem .45rem 1rem;border-radius:999px;background:rgba(246,241,234,.88);-webkit-backdrop-filter:blur(22px) saturate(1.3);backdrop-filter:blur(22px) saturate(1.3);box-shadow:inset 0 0 0 1px rgba(255,255,255,.55),inset 0 1px 0 rgba(255,255,255,.8),0 10px 40px -18px rgba(40,22,6,.45);transition:background .4s}
#nav.s{background:rgba(246,241,234,.95)}
.nlogo{display:flex;align-items:center;flex-shrink:0}
.nlogo img{display:block;height:26px;width:auto}
.nlinks{display:flex;align-items:center;gap:.15rem;list-style:none;margin:0;padding:0}
.nlinks a{display:block;white-space:nowrap;font-size:.8rem;font-weight:500;color:#6C5847;padding:.55rem .95rem;border-radius:999px;transition:color .3s,background .3s}
.nlinks a:hover{color:#1B120A}
.nlinks a.on{color:#1B120A;background:rgba(107,70,30,.09)}
.nright{display:flex;align-items:center;gap:.9rem}
.nphone{font-size:.8rem;font-weight:500;color:#6C5847;transition:color .2s}
.nphone:hover{color:#1B120A}
.nbtn{display:inline-flex;align-items:center;gap:.7rem;padding:.35rem .35rem .35rem 1.15rem;border-radius:999px;background:#95600F;color:#FFF8EC;font:500 .76rem Inter,system-ui,sans-serif;letter-spacing:.02em;white-space:nowrap;box-shadow:0 1px 2px rgba(80,48,12,.06),0 4px 14px -6px rgba(80,48,12,.1);transition:background .4s,box-shadow .4s}
.nbtn:hover{background:#7C4F0B;box-shadow:0 2px 4px rgba(80,48,12,.04),0 14px 30px -14px rgba(80,48,12,.3)}
.nbtn i{width:1.95rem;height:1.95rem;border-radius:50%;display:grid;place-items:center;background:rgba(255,248,236,.16);transition:transform .5s cubic-bezier(.32,.72,0,1)}
.nbtn:hover i{transform:translate(3px,-1px) scale(1.06)}
.nbtn svg{width:14px;height:14px}
.hb{display:none;position:relative;width:46px;height:46px;border-radius:50%;background:#1B120A;border:0;cursor:pointer;flex-shrink:0}
.hb span{position:absolute;left:50%;top:50%;width:18px;height:1.5px;background:#F6F1EA;border-radius:2px;transition:transform .5s cubic-bezier(.32,.72,0,1)}
.hb span:nth-child(1){transform:translate(-50%,-4px)}
.hb span:nth-child(2){transform:translate(-50%,4px)}
.hb.open span:nth-child(1){transform:translate(-50%,0) rotate(45deg)}
.hb.open span:nth-child(2){transform:translate(-50%,0) rotate(-45deg)}
#mm{position:fixed;inset:0;z-index:40;display:flex;flex-direction:column;gap:1.1rem;padding:7rem 1.5rem calc(2rem + env(safe-area-inset-bottom,0px));overflow-y:auto;overscroll-behavior:contain;background:#F6F3EE;color:#1B120A;opacity:0;visibility:hidden;transition:opacity .5s cubic-bezier(.32,.72,0,1),visibility 0s linear .5s}
#mm.open{opacity:1;visibility:visible;transition:opacity .5s cubic-bezier(.32,.72,0,1),visibility 0s}
.mlinks{list-style:none;margin:0;padding:0}
.mlinks a{display:flex;align-items:baseline;gap:1rem;padding:1.05rem 0;border-bottom:1px solid rgba(100,62,18,.14);font:400 2rem/1.1 Fraunces,Georgia,serif;letter-spacing:-.02em}
.mlinks small{font:500 .7rem Inter,system-ui,sans-serif;color:#95600F;letter-spacing:.12em;min-width:1.6rem}
.mdock{margin-top:auto;display:grid;gap:.6rem;padding:.95rem;border-radius:24px;background:linear-gradient(150deg,#2A1C10,#140D07);color:#F4EBDD;box-shadow:0 24px 40px -26px rgba(40,22,8,.85),inset 0 1px 0 rgba(255,236,205,.1)}
.mdock a{display:flex;align-items:center;justify-content:space-between;gap:.8rem;padding:.9rem 1.1rem;border-radius:16px;font-weight:600;font-size:.95rem}
.mdock .mcta{background:#D09A5A;color:#14110e}
.mdock .mcall{background:rgba(244,235,221,.08);color:#F4EBDD}
.mdock .mcall small{display:block;font-weight:400;font-size:.76rem;opacity:.7}
.brands{padding:20px 0;background:var(--bg2);border-bottom:1px solid var(--line)}
.brands .wrap{text-align:center;margin-bottom:12px;line-height:1}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.mq{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.brands .track{--ls:.72;display:flex;align-items:center;width:max-content;animation:m 64s linear infinite}
.brands:hover .track{animation-play-state:paused}
.mlogo{display:block;flex:none;margin:0 2rem;width:calc(var(--w) * var(--ls));height:calc(var(--w) * var(--ls) / var(--r));background:var(--ink);opacity:.82;-webkit-mask:var(--src) center / contain no-repeat;mask:var(--src) center / contain no-repeat}
.mdot{flex:none;width:5px;height:5px;border-radius:50%;background:var(--acc)}
@keyframes m{to{transform:translateX(-50%)}}
.js .r{opacity:0;transform:translateY(24px);transition:opacity .9s cubic-bezier(.2,.7,.2,1) var(--d,0s),transform .9s cubic-bezier(.2,.7,.2,1) var(--d,0s)}
.js .r.in{opacity:1;transform:none}
.sw{width:min(1280px,100% - 96px);margin-inline:auto}
.b{display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;border:0;border-radius:999px;font:500 14px/1.25 Inter,system-ui,sans-serif;cursor:pointer;transition:background .2s,color .2s,box-shadow .2s}
.b svg{width:16px;height:16px;flex-shrink:0}
.b:disabled{opacity:.6;cursor:wait}
.b:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
.gold{background:var(--heroacc);color:var(--hero);box-shadow:0 1px 2px rgba(0,0,0,.05);height:48px;padding:0 24px}
.gold:hover{background:#c58f4d}
.link{background:none;color:var(--heroink);text-decoration:underline;text-underline-offset:4px;height:36px;padding:0}
.link:hover{color:var(--heroacc)}
.dark{background:var(--ink);color:var(--bg);box-shadow:0 1px 3px rgba(0,0,0,.12);height:48px;padding:0 16px;flex:1}
.dark:hover{background:color-mix(in srgb,var(--ink) 90%,transparent)}
.tlink{background:none;color:var(--acc);height:36px;padding:0}
.tlink:hover{text-decoration:underline;text-underline-offset:4px}
.bicon{width:48px;height:48px;padding:0;background:transparent;border:1px solid var(--line);color:var(--ink);flex:none}
.bicon:hover{background:var(--bg2)}
.hero{background:var(--hero);height:calc(100svh - 50px);min-height:640px;max-height:860px;padding-top:98px;color:var(--heroink);display:flex;align-items:center;position:relative;overflow:hidden}
.hero picture{position:absolute;inset:0}
.himg{display:block;width:100%;height:100%;object-fit:cover;object-position:center 59%}
#prog{position:fixed;top:0;left:0;right:0;height:3px;z-index:60;background:var(--heroacc);transform:scaleX(0);transform-origin:0 50%;pointer-events:none}
.js .hero{position:sticky;top:0;z-index:1}
.dim{position:absolute;inset:0;background:#0d0b09;opacity:var(--p,0);pointer-events:none}
.card{position:relative;min-height:calc(100vh + 2px);min-height:calc(100lvh + 2px);display:flex;flex-direction:column;justify-content:center}
.c1{z-index:1;background:var(--bg)}
.c2{z-index:2;border-radius:24px 24px 0 0;box-shadow:0 -1px 0 rgba(28,25,21,.08),0 -24px 50px -26px rgba(0,0,0,.35)}
.c3{z-index:3;background:var(--bg);border-radius:24px 24px 0 0;box-shadow:0 -1px 0 rgba(28,25,21,.08),0 -24px 50px -26px rgba(0,0,0,.35)}
.js .c1,.js .c2{position:sticky;top:0}
.cdim{position:absolute;inset:0;border-radius:inherit;background:#0d0b09;opacity:0;pointer-events:none}
.sheet{position:relative;z-index:2;margin-top:-20px;background:var(--bg);border-radius:24px 24px 0 0;box-shadow:0 -1px 0 rgba(255,255,255,.14),0 -24px 50px -26px rgba(0,0,0,.5)}
.hero::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 60% 48% at 50% 54%,rgba(20,17,14,.42),transparent 72%),linear-gradient(180deg,rgba(20,17,14,.5),rgba(20,17,14,.66) 45%,rgba(20,17,14,.52))}
.hcontent{position:relative;z-index:1;text-align:center;padding-block:35px 65px}
.pill{display:inline-flex;align-items:center;gap:9px;margin:0;padding:9px 16px;border:1px solid var(--heroacc);border-radius:30px;font-size:10px;font-weight:600;letter-spacing:0;text-transform:uppercase;line-height:1.5}
.dot{width:6px;height:6px;border-radius:50%;background:var(--heroacc)}
.hero h1{max-width:900px;margin:26px auto 22px;font-size:82px;font-weight:400;line-height:1.02;letter-spacing:0}
.hero h1 span{color:var(--heroacc);font-size:64px;font-style:italic}
.hcopy{max-width:460px;margin:0 auto;color:rgba(242,235,224,.88);font-size:14px;line-height:1.85;text-shadow:0 1px 14px rgba(20,17,14,.55)}
.hactions{display:flex;justify-content:center;align-items:center;gap:24px;margin-top:26px}
.hassure{display:flex;justify-content:center;align-items:center;gap:8px;margin:24px 0 0;color:rgba(242,235,224,.82);font-size:10px;text-shadow:0 1px 10px rgba(20,17,14,.6)}
.hassure svg{width:14px;height:14px;flex-shrink:0}
.hcap{position:absolute;z-index:2;bottom:30px;right:48px;display:flex;align-items:center;gap:7px;color:rgba(242,235,224,.78);font-size:10px;text-shadow:0 1px 10px rgba(20,17,14,.6)}
.hcap svg{width:14px;height:14px}
.tband{border-bottom:1px solid var(--line)}
.tgrid{display:grid;grid-template-columns:repeat(4,1fr);padding-block:29px}
.titem{display:flex;justify-content:center;align-items:center;gap:14px;border-right:1px solid var(--line)}
.titem:first-child{justify-content:flex-start}
.titem:last-child{border:0}
.titem svg{width:25px;height:25px;color:var(--acc);flex-shrink:0}
.titem strong{display:block;font-size:13px;font-weight:700}
.titem span{display:block;margin-top:4px;color:var(--mut);font-size:11px}
.offer{display:grid;grid-template-columns:.85fr 1.15fr;align-items:start;gap:90px;padding-block:75px 85px}
.label{margin:0 0 19px;color:var(--acc);font-size:10px;font-weight:700;letter-spacing:0;text-transform:uppercase}
.stitle{margin:0;font-size:48px;font-weight:500;line-height:1.1;letter-spacing:0}
.scopy{max-width:440px;margin:19px 0 0;color:var(--mut);font-size:14px;line-height:1.85}
.perks{display:grid;gap:15px;margin-top:28px;font-size:13px}
.perks span{display:flex;align-items:center;gap:10px}
.perks svg{width:17px;height:17px;color:var(--acc);flex-shrink:0}
.ocall{display:flex;align-items:center;gap:13px;margin-top:33px;padding-top:23px;border-top:1px solid var(--line);color:var(--mut);font-size:12px}
.ocall svg{width:24px;height:24px;color:var(--acc);flex-shrink:0}
.ocall a{display:block;margin-top:4px;color:var(--ink);font-size:18px;font-weight:700}
.oform{background:var(--card);border:1px solid var(--line);border-radius:8px;box-shadow:0 12px 36px rgba(20,17,14,.06);padding:28px 30px}
.fhead{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:25px}
.fhead h3{font-size:25px;font-weight:400;letter-spacing:0;line-height:1.2}
.scount{color:var(--mut);font-size:10px;white-space:nowrap}
.prog{display:flex;gap:4px;margin-top:7px}
.prog i{width:27px;height:3px;background:var(--line)}
.prog i.active{background:var(--acc)}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:17px 16px}
.field{display:block;margin:0;font-size:11px;font-weight:700;color:var(--ink)}
.field input,.field textarea{display:block;width:100%;min-height:43px;margin-top:7px;padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);font:400 12px Inter,system-ui,sans-serif;outline:none}
.field input:focus,.field textarea:focus{border-color:var(--acc);box-shadow:0 0 0 2px var(--accent)}
.field textarea{resize:vertical}
.fwide{grid-column:1/-1}
.opt{color:var(--mut);font-weight:400}
.req{color:var(--acc)}
.upl{display:flex;align-items:center;gap:8px;padding-block:17px;color:var(--acc);font-size:11px;cursor:pointer}
.upl input{position:absolute;width:1px;height:1px;opacity:0}
.upl svg{width:15px;height:15px;flex-shrink:0}
.ferr{margin:0 0 16px;color:#c0392b;font-size:12px}
.frow{display:flex;gap:12px}
.fpriv{display:flex;justify-content:center;align-items:center;gap:6px;margin:13px 0 0;color:var(--mut);font-size:9px}
.fpriv svg{width:12px;height:12px}
.hp{position:absolute;left:-9999px}
.thanks{color:var(--acc);margin-bottom:16px}
.thanks svg{width:36px;height:36px}
.oform h3.tt{font-family:Inter,system-ui,sans-serif;font-size:20px;font-weight:600;line-height:1.4}
.pband{background:var(--bg2);padding-block:70px}
.hrow{display:flex;justify-content:space-between;align-items:flex-end;gap:25px}
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:50px;margin-top:42px}
.snum{display:flex;align-items:center;gap:14px;margin-bottom:23px;color:var(--acc);font-size:12px;font-weight:700}
.snum::after{content:"";flex:1;height:1px;background:var(--line)}
.pstep h3{font-size:24px;font-weight:400;letter-spacing:0;line-height:1.2}
.pstep p{margin:12px 0 0;color:var(--mut);font-size:13px;line-height:1.8}
.whys{padding-block:75px}
.bgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:35px;margin-top:35px}
.ben svg{width:25px;height:25px;margin-bottom:18px;color:var(--acc)}
.ben h3{font-size:21px;font-weight:400;letter-spacing:0;line-height:1.2}
.ben p{margin:10px 0 0;color:var(--mut);font-size:12px;line-height:1.85}
.cband{background:var(--hero);color:var(--heroink);padding-block:43px}
.cinner{display:flex;justify-content:space-between;align-items:center;gap:25px}
.cinner h2{margin:0;font-size:40px;font-weight:500;line-height:1.1;letter-spacing:0}
.cinner p{margin:8px 0 0;opacity:.8;font-size:12px}
.sfoot{display:flex;justify-content:space-between;align-items:center;gap:20px;padding-block:31px;color:var(--mut);font-size:10px}
.sfoot p,.sfoot span{margin:0}
.flinks{display:flex;gap:22px}
.flinks a:hover{color:var(--ink)}
@media (min-width:1600px){.hero{min-height:700px}}
@media (max-width:1050px){.sw{width:calc(100% - 56px)}.hero h1{font-size:74px}.hero h1 span{font-size:56px}.offer{gap:40px}}
@media (max-width:700px){
.sw{width:calc(100% - 40px)}
.hero{height:calc(100svh - 150px);min-height:560px;max-height:780px;padding-top:86px}
.himg{object-position:72% center}
.hcontent{padding-block:35px 55px}
.pill{padding:8px 12px;font-size:8px}
.hero h1{margin-top:24px;font-size:48px}
.hero h1 span{font-size:38px}
.hcopy{max-width:340px;font-size:13px}
.hactions{flex-direction:column;gap:16px;margin-top:22px}
.hassure{font-size:9px;line-height:1.5}
.hcap{bottom:30px;right:20px;font-size:8px}
.tgrid{grid-template-columns:1fr 1fr;gap:25px 12px;padding-block:24px}
.titem,.titem:first-child{border:0;justify-content:flex-start;gap:10px}
.titem strong{font-size:11px}.titem span{font-size:9px}.titem svg{width:21px;height:21px}
.offer{grid-template-columns:1fr;gap:32px;padding-block:45px}
.stitle{font-size:41px}
.oform{padding:23px 20px}
.fgrid{gap:16px 12px}
.hrow{display:block}.hrow>a{margin-top:18px}
.sgrid{grid-template-columns:1fr;gap:30px}
.pband,.whys{padding-block:48px}
.js .c1,.js .c2{margin-bottom:50vh;margin-bottom:50svh}
.field input,.field textarea{font-size:16px}
.bgrid{grid-template-columns:1fr 1fr;gap:30px 22px}
.cinner{flex-direction:column;align-items:flex-start}
.cinner h2{font-size:38px}
.sfoot{flex-direction:column;align-items:flex-start;gap:18px;line-height:1.7}
}
@media (prefers-reduced-motion:reduce){.js .hero,.js .c1,.js .c2{margin-bottom:0}.js .hero{position:relative}.js .c1,.js .c2{position:relative}.card{min-height:0;display:block}.cdim{display:none}.dim{display:none}*,*::before,*::after{animation:none!important;transition:none!important}.js .r{opacity:1;transform:none}.brands .track{width:auto;flex-wrap:wrap;justify-content:center}.brands .track>*:nth-child(n+13){display:none}.mq{-webkit-mask-image:none;mask-image:none}}

@media (max-width:1060px){.nphone{display:none}}
@media (max-width:980px){#nav{padding-left:.8rem}.nlinks,.nphone,.nbtn{display:none}.hb{display:block}.nlogo img{height:23px}}
@media (min-width:981px){#mm{display:none}}
</style>
</head>
<body>
<div id="prog" aria-hidden="true"></div><div id="lvh" aria-hidden="true" style="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none"></div>
<nav id="nav" aria-label="Main navigation">
  <a class="nlogo" href="#top" aria-label="Sell My RV Online home"><img src="/logo-wide.png" alt="Sell My RV Online" width="213" height="26"></a>
  <ul class="nlinks">
    <li><a href="#top">Sell Your RV</a></li>
    <li><a href="#how">How It Works</a></li>
    <li><a href="/faq/">FAQs</a></li>
    <li><a href="#contact">Contact Us</a></li>
  </ul>
  <div class="nright">
    <a class="nphone" href="tel:8008631848" aria-label="Call us at 800-863-1848">800-863-1848</a>
    <a class="nbtn" href="#offer">Get your cash offer<i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg></i></a>
    <button class="hb" id="hb" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mm"><span></span><span></span></button>
  </div>
</nav>
<div id="mm" role="dialog" aria-label="Mobile navigation" aria-modal="true" aria-hidden="true">
  <ul class="mlinks">
    <li><a href="#top"><small>01</small>Sell Your RV</a></li>
    <li><a href="#how"><small>02</small>How It Works</a></li>
    <li><a href="/faq/"><small>03</small>FAQs</a></li>
    <li><a href="#contact"><small>04</small>Contact Us</a></li>
  </ul>
  <div class="mdock">
    <a class="mcta" href="#offer">Get your cash offer <span aria-hidden="true">&rarr;</span></a>
    <a class="mcall" href="tel:8008631848"><span>Call us<small>800-863-1848</small></span><span aria-hidden="true">&rarr;</span></a>
  </div>
</div>
<!--/nav-->
<main>
<header class="hero" id="top">
  <picture><source srcset="/hero-sunset.webp" type="image/webp"><img class="himg" src="/hero-sunset.jpg" width="1083" height="744" alt="Luxury motorcoach in the Arizona desert at sunset" fetchpriority="high" decoding="async"></picture>
  <div class="dim" aria-hidden="true"></div>
  <div class="sw hcontent r">
    <p class="pill"><span class="dot"></span>GOOD PEOPLE. FAIR OFFERS. NEW BEGINNINGS.</p>
    <h1>Sell your RV.<br><span>Keep your peace of mind.</span></h1>
    <p class="hcopy">Your coach has taken you places. Now let it take you to your next chapter—with a fair cash offer and none of the hassle.</p>
    <div class="hactions"><a class="b gold" href="#offer">Get my cash offer <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></a><a class="b link" href="#how">See how it works <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></div>
    <p class="hassure"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>No obligation. No hidden fees. Just a real conversation.</p>
  </div>
  <span class="hcap"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>ARIZONA ROOTS. NATIONWIDE REACH.</span>
</header>

<div class="sheet">
<section class="tband" aria-label="Why owners choose us"><div class="sw tgrid">
  <div class="titem"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg><div><strong>Free nationwide pickup</strong><span>Wherever you are, we come to you</span></div></div>
  <div class="titem"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m14 20 2 2 4-4"/></svg><div><strong>We handle the paperwork</strong><span>Including your bank payoff</span></div></div>
  <div class="titem"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg><div><strong>Real people. Always.</strong><span>No call centers. No runaround.</span></div></div>
  <div class="titem"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg><div><strong>30+ years of experience</strong><span>A name you can feel good about</span></div></div>
</div></section>

<section class="brands" aria-label="Brands we know best">
  <p class="sr">Brands we know best: Newell, Prevost, Newmar, Marathon Coach, Renegade RV, ShowHauler.</p>
  <div class="wrap"><span class="eyebrow">Brands we know best</span></div>
  <div class="mq" aria-hidden="true"><div class="track"><span class="mlogo" style="--src:url(/brands/newell.png);--w:188px;--r:10.24"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/prevost.svg);--w:168px;--r:11.76"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/newmar.svg);--w:108px;--r:2.5"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/marathon.svg);--w:98px;--r:2.04"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/renegade.png);--w:150px;--r:4.01"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/showhauler.png);--w:96px;--r:2.09"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/newell.png);--w:188px;--r:10.24"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/prevost.svg);--w:168px;--r:11.76"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/newmar.svg);--w:108px;--r:2.5"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/marathon.svg);--w:98px;--r:2.04"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/renegade.png);--w:150px;--r:4.01"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/showhauler.png);--w:96px;--r:2.09"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/newell.png);--w:188px;--r:10.24"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/prevost.svg);--w:168px;--r:11.76"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/newmar.svg);--w:108px;--r:2.5"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/marathon.svg);--w:98px;--r:2.04"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/renegade.png);--w:150px;--r:4.01"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/showhauler.png);--w:96px;--r:2.09"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/newell.png);--w:188px;--r:10.24"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/prevost.svg);--w:168px;--r:11.76"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/newmar.svg);--w:108px;--r:2.5"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/marathon.svg);--w:98px;--r:2.04"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/renegade.png);--w:150px;--r:4.01"></span><span class="mdot"></span><span class="mlogo" style="--src:url(/brands/showhauler.png);--w:96px;--r:2.09"></span><span class="mdot"></span></div></div>
</section>

<div class="card c1">
<section id="offer" class="sw offer">
  <div class="r">
    <p class="label">YOUR NEXT CHAPTER STARTS HERE</p>
    <h2 class="stitle">A great offer.<br>A fresh start.</h2>
    <p class="scopy">Ready to move on from your coach? Tell us a little about it. We’ll take it from there.</p>
    <div class="perks"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>No obligation. No pressure.</span><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>No listings, tire-kickers, or hidden fees.</span><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>A straightforward offer from a real person.</span></div>
    <div class="ocall"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg><div>Prefer a conversation?<a href="tel:8008631848">800-863-1848</a></div></div>
  </div>
  <div class="r" style="--d:.1s">
    <form class="oform" id="f">
      <div class="fhead"><h3 id="ft">A little about your RV</h3><div><span class="scount" id="sc">STEP 1 OF 2</span><div class="prog"><i class="active"></i><i id="bar2"></i></div></div></div>
      <div id="p1">
        <div class="fgrid">
          <label class="field">Year <span class="req">*</span><input name="year" placeholder="e.g. 2018" inputmode="numeric" pattern="[0-9]{4}" data-r required></label>
          <label class="field">Make <span class="req">*</span><input name="make" placeholder="e.g. Newmar" data-r required></label>
          <label class="field">Model <span class="req">*</span><input name="model" placeholder="e.g. Dutch Star" data-r required></label>
          <label class="field">Mileage <span class="opt">(optional)</span><input name="mi" placeholder="e.g. 35,000" inputmode="numeric"></label>
          <label class="field fwide">Anything else we should know? <span class="opt">(optional)</span><textarea name="c" rows="2" placeholder="Condition, upgrades, or any questions…"></textarea></label>
        </div>
        <label class="upl"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg><span id="fn">Add a photo of your RV</span><span class="opt" id="fo">(optional)</span><input type="file" name="photo" accept="image/*" id="fi"></label>
      </div>
      <div id="p2" hidden>
        <div class="fgrid">
          <label class="field">Your name *<input name="name" autocomplete="name" placeholder="Full name"></label>
          <label class="field">Phone number *<input name="tel" type="tel" autocomplete="tel" placeholder="(555) 123-4567"></label>
          <label class="field">Email address *<input name="email" type="email" autocomplete="email" placeholder="you@example.com"></label>
          <label class="field">ZIP / Postal code *<input name="zip" autocomplete="postal-code" placeholder="ZIP code"></label>
        </div>
        <div style="height:20px"></div>
      </div>
      <div class="hp" aria-hidden="true"><input name="website" tabindex="-1" autocomplete="off"></div>
      <p class="ferr" id="err" role="alert" hidden></p>
      <div class="frow"><button type="button" class="b bicon" id="bk" aria-label="Back to RV details" hidden><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></button><button type="button" class="b dark" id="nx"><span id="nxl">Continue to your cash offer</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button></div>
      <p class="fpriv"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"></rect><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>Your information stays private. No spam, ever.</p>
    </form>
    <div class="oform" id="ok" hidden>
      <div class="thanks"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div>
      <h3 class="tt">Thank you for reaching out.</h3>
      <p class="scopy">A real person will contact you shortly about your RV.</p>
    </div>
  </div>
</section>
<div class="cdim" aria-hidden="true"></div>
</div>

<section class="pband card c2" id="how"><div class="sw">
  <div class="hrow"><div class="r"><p class="label">A SIMPLER WAY TO SELL</p><h2 class="stitle">Three steps. Zero stress.</h2></div><a class="b tlink" href="#offer">The road to your offer <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></a></div>
  <div class="sgrid">
    <div class="pstep r"><div class="snum">01</div><h3>Tell us about your RV</h3><p>Share the year, make, model and mileage. Add a photo if you have one. It only takes a few minutes.</p></div>
    <div class="pstep r" style="--d:.1s"><div class="snum">02</div><h3>Get your cash offer</h3><p>A real person will reach out with an offer backed by more than 30 years in the RV business.</p></div>
    <div class="pstep r" style="--d:.2s"><div class="snum">03</div><h3>We handle the rest</h3><p>We take care of the paperwork, coordinate any bank payoff and pick up your coach at no cost to you.</p></div>
  </div>
</div><div class="cdim" aria-hidden="true"></div>
</section>

<div class="card c3">
<section class="sw whys" id="why">
  <p class="label r">NOT YOUR TYPICAL RV BUYER</p>
  <h2 class="stitle r">Less hassle. More possibility.</h2>
  <div class="bgrid">
    <div class="ben r"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m14 20 2 2 4-4"/></svg><h3>Paperwork, handled.</h3><p>From title transfers to bank payoffs, we take care of the details so you don’t have to.</p></div>
    <div class="ben r" style="--d:.1s"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg><h3>Pickup, on us.</h3><p>Your coach. Your location. We arrange fast, free pickup anywhere in the country.</p></div>
    <div class="ben r" style="--d:.2s"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg><h3>A real person.</h3><p>No call centers. No endless hold music. Just straightforward communication from the start.</p></div>
    <div class="ben r" style="--d:.3s"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg><h3>More cash to you.</h3><p>Our experience and nationwide network help us see the real value in your coach.</p></div>
  </div>
</section>
</div>
</div>
</main>

<section class="cband" id="contact"><div class="sw cinner">
  <div><h2>New roads are waiting.</h2><p>Let’s make selling your RV the easy part.</p></div>
  <a class="b gold" href="tel:8008631848"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>Let’s talk · 800-863-1848 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></a>
</div></section>

<footer class="sw sfoot"><p>© 2026 Southwest Luxury Coach. All rights reserved.</p><nav class="flinks" aria-label="Footer"><a href="/about-us/">About us</a><a href="/faq/">FAQs</a><a href="/privacy-policy/">Privacy policy</a><a href="/sitemap/">Sitemap</a></nav><span>Based in Arizona. Here for you nationwide.</span></footer>

<script>
document.documentElement.classList.add('js');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.r').forEach(function(el){io.observe(el)});
var nav=document.getElementById('nav');addEventListener('scroll',function(){nav.classList.toggle('s',scrollY>10)},{passive:true});
var hb=document.getElementById('hb'),mm=document.getElementById('mm');
function setMenu(o){hb.classList.toggle('open',o);hb.setAttribute('aria-expanded',o);hb.setAttribute('aria-label',o?'Close menu':'Open menu');mm.classList.toggle('open',o);mm.setAttribute('aria-hidden',!o);document.body.style.overflow=o?'hidden':''}
hb.onclick=function(){setMenu(!hb.classList.contains('open'))};
[].forEach.call(mm.querySelectorAll('a'),function(a){a.addEventListener('click',function(){setMenu(false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&mm.classList.contains('open')){setMenu(false);hb.focus()}});
addEventListener('resize',function(){if(innerWidth>980&&mm.classList.contains('open'))setMenu(false)});
var nl=[].slice.call(document.querySelectorAll('.nlinks a[href^="#"]')),hero=document.getElementById('top'),ticking=false;
function onScroll(){ticking=false;
var line=innerHeight*.45,cur='top';['how','contact'].forEach(function(id){var e=document.getElementById(id);if(e&&e.getBoundingClientRect().top<=line)cur=id});
if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur='contact';
nl.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+cur)});
var p=Math.min(1,Math.max(0,scrollY/(hero.offsetHeight*.9)));hero.style.setProperty('--p',(p*.55).toFixed(3));dimCards();
var mx=document.documentElement.scrollHeight-innerHeight;document.getElementById('prog').style.transform='scaleX('+(mx>0?Math.min(1,Math.max(0,scrollY/mx)):0).toFixed(4)+')'}
var cards=[].slice.call(document.querySelectorAll('.card'));
function pins(){cards.slice(0,2).forEach(function(c){c.style.top=Math.min(0,(document.getElementById('lvh').offsetHeight||document.documentElement.clientHeight)-c.offsetHeight)+'px'})}
function dimCards(){var vh=innerHeight;cards.slice(0,2).forEach(function(c,i){var d=c.querySelector('.cdim'),nx=cards[i+1].getBoundingClientRect().top;d.style.opacity=(Math.min(1,Math.max(0,(vh-nx)/vh))*.4).toFixed(3)})}
pins();addEventListener('resize',pins);addEventListener('load',pins);
if(window.ResizeObserver)cards.slice(0,2).forEach(function(c){new ResizeObserver(pins).observe(c)});
addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
addEventListener('resize',onScroll);onScroll();
var f=document.getElementById('f'),p1=document.getElementById('p1'),p2=document.getElementById('p2'),nx=document.getElementById('nx'),bk=document.getElementById('bk'),err=document.getElementById('err'),step=0,sending=false;
var fy=null;
f.addEventListener('focusin',function(e){if(fy===null&&/INPUT|TEXTAREA/.test(e.target.tagName))fy=scrollY});
f.addEventListener('focusout',function(){setTimeout(function(){var a=document.activeElement;if(a&&f.contains(a)&&/INPUT|TEXTAREA/.test(a.tagName))return;if(fy!==null&&Math.abs(scrollY-fy)<300)scrollTo({top:fy,left:0,behavior:'instant'});fy=null},350)});
function go(n){step=n;p1.hidden=n!==0;p2.hidden=n!==1;bk.hidden=n===0;
document.getElementById('ft').textContent=n?'How can we reach you?':'A little about your RV';
document.getElementById('sc').textContent='STEP '+(n+1)+' OF 2';
document.getElementById('bar2').className=n?'active':'';
document.getElementById('nxl').textContent=n?'Get my cash offer':'Continue to your cash offer';
nx.type=n?'submit':'button';err.hidden=true;
[].forEach.call(f.querySelectorAll('input'),function(i){var inP1=p1.contains(i),inP2=p2.contains(i);if(inP1)i.required=i.hasAttribute('data-r')&&n===0;if(inP2)i.required=n===1&&i.name!=='website'})}
nx.onclick=function(e){if(step===0){e.preventDefault();if(f.reportValidity())go(1)}};
bk.onclick=function(){go(0)};
document.getElementById('fi').onchange=function(){var n=this.files&&this.files[0]?this.files[0].name:'';document.getElementById('fn').textContent=n||'Add a photo of your RV';document.getElementById('fo').textContent=n?'':'(optional)'};
f.onsubmit=function(e){e.preventDefault();if(step===0){nx.click();return}if(sending)return;sending=true;nx.disabled=true;document.getElementById('nxl').textContent='Sending your request…';err.hidden=true;
fetch('/api/lead',{method:'POST',body:new FormData(f)}).then(function(r){if(!r.ok)throw new Error('send');f.hidden=true;document.getElementById('ok').hidden=false;document.getElementById('ok').scrollIntoView({block:'center'})}).catch(function(){sending=false;nx.disabled=false;document.getElementById('nxl').textContent='Get my cash offer';err.textContent='We couldn’t send your request. Please try again or call 800-863-1848.';err.hidden=false})};
go(0);
</script>
</body>
</html>
`;

const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Leads | Sell My RV Online</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--bg:#F6F1EA;--bg2:#EDE5D8;--ink:#1c1915;--mut:#6b6358;--acc:#9c6a34;--card:#fffdf9;--line:rgba(28,25,21,.14);--hero:#14110e;--heroink:#f2ebe0;--heroacc:#d09a5a}
@media (prefers-color-scheme:dark){:root{--bg:#14110e;--bg2:#1c1814;--ink:#f2ebe0;--mut:#a89d8e;--acc:#d09a5a;--card:#1f1b16;--line:rgba(242,235,224,.16)}}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.5 Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
h1,h2,h3{font-family:Fraunces,Georgia,serif;font-weight:400;margin:0;letter-spacing:-.02em}
em{font-style:italic;color:var(--acc)}
a{color:inherit}
.wrap{max-width:960px;margin:0 auto;padding:0 20px}
header{background:var(--hero);color:var(--heroink)}
header .wrap{display:flex;align-items:center;justify-content:space-between;height:64px;gap:12px}
.logo{font-family:Fraunces,Georgia,serif;font-size:19px;font-weight:600}.logo em{color:var(--heroacc);font-weight:400}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 18px;border-radius:99px;font:600 14px Inter,sans-serif;border:1px solid var(--ink);background:var(--ink);color:var(--bg);cursor:pointer}
.btn.ghost{background:transparent;color:inherit;border-color:var(--line)}
header .btn.ghost{color:var(--heroink);border-color:rgba(242,235,224,.3)}
.btn:disabled{opacity:.6;cursor:wait}
#login{max-width:420px;margin:12vh auto;padding:0 20px}
#login h1{font-size:38px;margin-bottom:8px}
#login p{color:var(--mut);margin:0 0 20px}
input,select{width:100%;padding:13px 14px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit;font-size:16px}
input:focus,select:focus{outline:none;border-color:var(--acc);box-shadow:0 0 0 3px color-mix(in srgb,var(--acc) 22%,transparent)}
#login .btn{width:100%;margin-top:12px;padding:14px}
.rem{display:flex;align-items:center;gap:8px;margin-top:14px;font-size:14px;color:var(--mut);cursor:pointer}
.rem input{width:auto;margin:0;accent-color:var(--acc)}
.err{color:#c0392b;font-size:14px;margin-top:10px;min-height:20px}
#app{display:none}
.bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:28px 0 18px}
.bar h2{font-size:32px}
.tabs{display:flex;flex-wrap:wrap;gap:8px}
.tab{padding:8px 16px;border-radius:99px;border:1px solid var(--line);background:transparent;color:var(--ink);font:500 14px Inter,sans-serif;cursor:pointer}
.tab.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.lead{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:20px 22px;margin-bottom:12px}
.top{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;align-items:flex-start}
.lead h3{font-size:24px}
.when{color:var(--mut);font-size:13px}
.rv{font-size:17px;font-weight:600;margin:10px 0 2px}
.meta{color:var(--mut);font-size:14px}
.contact{display:flex;flex-wrap:wrap;gap:8px 20px;margin-top:12px;font-size:15px}
.contact a{color:var(--acc);font-weight:600;text-decoration:none}
.contact a:hover{text-decoration:underline}
.note{margin:12px 0 0;padding:10px 12px;background:var(--bg2);border-radius:10px;font-size:14px;white-space:pre-wrap}
.actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px}
.actions select{width:auto;padding:9px 12px;font-size:14px}
.photo img{display:block;max-width:100%;max-height:420px;border-radius:12px;margin-top:12px}
.empty{text-align:center;color:var(--mut);padding:60px 0}
.more{text-align:center;padding:12px 0 48px}
.badge{display:inline-block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;padding:3px 10px;border-radius:99px;border:1px solid var(--line);color:var(--mut)}
.badge.new{background:var(--acc);border-color:var(--acc);color:#fff}
</style>
</head>
<body>
<header><div class="wrap"><span class="logo">Sell My <em>RV</em> Online</span><button class="btn ghost" id="out" style="display:none">Sign out</button></div></header>

<div id="login">
  <h1>Leads <em>admin</em></h1>
  <p>Enter your access token to view the leads. Tick the box below to stay signed in on this device.</p>
  <form id="lf"><input id="tok" type="password" placeholder="Access token" autocomplete="current-password" required>
  <label class="rem"><input type="checkbox" id="rem"> Remember me on this device</label>
  <button class="btn" type="submit" id="lb">Sign in</button>
  <div class="err" id="le" role="alert"></div></form>
</div>

<div id="app"><div class="wrap">
  <div class="bar"><h2>Leads <em id="count"></em></h2><button class="btn ghost" id="rf">Refresh</button></div>
  <div class="tabs" id="tabs"></div>
  <div style="height:16px"></div>
  <div id="list"></div>
  <div class="more"><button class="btn ghost" id="more" style="display:none">Load more</button></div>
</div></div>

<script>
var STATUSES=['new','contacted','offer','closed'];
var LABEL={all:'All','new':'New',contacted:'Contacted',offer:'Offer',closed:'Closed'};
var token='',filter='all',leads=[],lastBefore=null;
try{token=localStorage.getItem('rvtoken')||sessionStorage.getItem('rvtoken')||''}catch(e){}
var $=function(id){return document.getElementById(id)};
function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
function api(path,opts){opts=opts||{};opts.headers=Object.assign({authorization:'Bearer '+token},opts.headers||{});return fetch(path,opts)}
function showApp(on){$('login').style.display=on?'none':'block';$('app').style.display=on?'block':'none';$('out').style.display=on?'inline-flex':'none'}
function signOut(){token='';try{sessionStorage.removeItem('rvtoken');localStorage.removeItem('rvtoken')}catch(e){}leads=[];showApp(false);$('tok').value=''}

function buildTabs(){var t=$('tabs');t.innerHTML='';['all'].concat(STATUSES).forEach(function(s){var b=el('button','tab'+(s===filter?' on':''),LABEL[s]);b.onclick=function(){filter=s;buildTabs();load(true)};t.appendChild(b)})}

function load(reset){
  if(reset){leads=[];lastBefore=null}
  var q='?limit=50';if(filter!=='all')q+='&status='+filter;if(lastBefore)q+='&before='+encodeURIComponent(lastBefore);
  return api('/api/leads'+q).then(function(r){
    if(r.status===401){signOut();$('le').textContent='Invalid token.';throw new Error('401')}
    if(!r.ok)throw new Error('Request failed');
    return r.json();
  }).then(function(j){
    leads=leads.concat(j.leads);
    lastBefore=j.leads.length?j.leads[j.leads.length-1].created_at:lastBefore;
    $('more').style.display=j.leads.length===50?'inline-flex':'none';
    render();
  });
}

function render(){
  var list=$('list');list.innerHTML='';
  $('count').textContent=leads.length?'('+leads.length+(leads.length%50===0?'+':'')+')':'';
  if(!leads.length){list.appendChild(el('div','empty','No leads here yet.'));return}
  leads.forEach(function(l){list.appendChild(card(l))});
}

function card(l){
  var c=el('div','lead');
  var top=el('div','top');
  var left=el('div');left.appendChild(el('h3','',l.name));
  left.appendChild(el('div','when',new Date(l.created_at).toLocaleString()));
  top.appendChild(left);
  top.appendChild(el('span','badge '+l.status,LABEL[l.status]||l.status));
  c.appendChild(top);
  c.appendChild(el('div','rv',[l.year,l.make,l.model].join(' ')));
  c.appendChild(el('div','meta',(l.mileage?l.mileage+' miles · ':'')+'ZIP '+l.zip));
  var ct=el('div','contact');
  var tel=el('a','',l.phone);tel.href='tel:'+l.phone.replace(/[^0-9+]/g,'');ct.appendChild(tel);
  var ml=el('a','',l.email);ml.href='mailto:'+encodeURI(l.email);ct.appendChild(ml);
  c.appendChild(ct);
  if(l.comments)c.appendChild(el('div','note',l.comments));
  var ac=el('div','actions');
  var sel=document.createElement('select');
  STATUSES.forEach(function(s){var o=el('option','',LABEL[s]);o.value=s;if(s===l.status)o.selected=true;sel.appendChild(o)});
  sel.onchange=function(){setStatus(l,sel.value,sel)};
  ac.appendChild(sel);
  var ph=el('div','photo');
  if(l.photo_keys&&l.photo_keys.length){
    var pb=el('button','btn ghost','View photo');
    pb.onclick=function(){pb.disabled=true;pb.textContent='Loading...';
      api('/api/photos/'+l.photo_keys[0]).then(function(r){if(!r.ok)throw new Error();return r.blob()}).then(function(b){
        var im=document.createElement('img');im.alt='Photo submitted for '+l.name;im.src=URL.createObjectURL(b);ph.appendChild(im);pb.remove();
      }).catch(function(){pb.disabled=false;pb.textContent='Photo failed, retry'})};
    ac.appendChild(pb);
  }
  c.appendChild(ac);c.appendChild(ph);
  return c;
}

function setStatus(l,s,sel){
  var prev=l.status;
  api('/api/leads/'+l.id,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({status:s})}).then(function(r){
    if(!r.ok)throw new Error();l.status=s;
    if(filter!=='all'&&s!==filter){leads=leads.filter(function(x){return x.id!==l.id})}
    render();
  }).catch(function(){sel.value=prev;alert('Could not update the status. Try again.')});
}

$('lf').onsubmit=function(e){
  e.preventDefault();token=$('tok').value.trim();$('le').textContent='';$('lb').disabled=true;
  load(true).then(function(){try{var keep=$('rem').checked;sessionStorage.removeItem('rvtoken');localStorage.removeItem('rvtoken');(keep?localStorage:sessionStorage).setItem('rvtoken',token)}catch(x){}showApp(true)}).catch(function(x){if(x.message!=='401')$('le').textContent='Something went wrong. Try again.'}).then(function(){$('lb').disabled=false});
};
$('out').onclick=signOut;
$('rf').onclick=function(){load(true)};
$('more').onclick=function(){load(false)};
buildTabs();
if(token){load(true).then(function(){showApp(true)}).catch(function(){})}
</script>
</body>
</html>
`;

const MAX_PHOTO = 8 * 1024 * 1024;
const STATUSES = ['new', 'contacted', 'offer', 'closed'];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

const clean = (v, max) => String(v ?? '').trim().slice(0, max);

async function authorized(request, env) {
  if (!env.API_TOKEN) return false;
  const given = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(given)),
    crypto.subtle.digest('SHA-256', enc.encode(env.API_TOKEN)),
  ]);
  const x = new Uint8Array(a), y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

async function createLead(request, env, ctx) {
  let form;
  try { form = await request.formData(); } catch { return json({ error: 'Invalid form data' }, 400); }

  // Honeypot: bots fill the hidden field; pretend success.
  if (clean(form.get('website'), 100)) return json({ ok: true });

  const lead = {
    year: clean(form.get('year'), 10),
    make: clean(form.get('make'), 60),
    model: clean(form.get('model'), 80),
    mileage: clean(form.get('mi'), 20),
    comments: clean(form.get('c'), 2000),
    name: clean(form.get('name'), 100),
    phone: clean(form.get('tel'), 30),
    email: clean(form.get('email'), 120),
    zip: clean(form.get('zip'), 12),
  };
  const missing = ['year', 'make', 'model', 'name', 'phone', 'email', 'zip'].filter((k) => !lead[k]);
  if (missing.length) return json({ error: 'Missing required fields' }, 400);
  if (!/^\S+@\S+\.\S+$/.test(lead.email)) return json({ error: 'Invalid email' }, 400);

  const id = crypto.randomUUID();
  let photoKeys = [];
  const photo = form.get('photo');
  if (photo && typeof photo === 'object' && photo.size > 0) {
    if (!photo.type.startsWith('image/')) return json({ error: 'Photo must be an image' }, 400);
    if (photo.size > MAX_PHOTO) return json({ error: 'Photo is too large (max 8 MB)' }, 400);
    const key = `leads/${id}/photo-1`;
    await env.PHOTOS.put(key, photo.stream(), { httpMetadata: { contentType: photo.type } });
    photoKeys = [key];
  }

  const createdAt = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO leads (id, created_at, status, year, make, model, mileage, comments, name, phone, email, zip, photo_keys)
     VALUES (?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, createdAt, lead.year, lead.make, lead.model, lead.mileage, lead.comments,
         lead.name, lead.phone, lead.email, lead.zip, JSON.stringify(photoKeys)).run();

  // Optional push to another service (e.g. the other Cloudflare site). The lead is already saved.
  if (env.WEBHOOK_URL) {
    const payload = { id, created_at: createdAt, status: 'new', ...lead, photo_keys: photoKeys };
    ctx.waitUntil(
      fetch(env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${env.WEBHOOK_SECRET || ''}` },
        body: JSON.stringify(payload),
      }).catch(() => {})
    );
  }
  return json({ ok: true, id }, 201);
}

async function listLeads(url, env) {
  const status = url.searchParams.get('status');
  const before = url.searchParams.get('before');
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1), 200);
  const where = [], args = [];
  if (status && STATUSES.includes(status)) { where.push('status = ?'); args.push(status); }
  if (before) { where.push('created_at < ?'); args.push(before); }
  const sql = `SELECT * FROM leads ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC LIMIT ?`;
  const { results } = await env.DB.prepare(sql).bind(...args, limit).all();
  return json({ leads: results.map((r) => ({ ...r, photo_keys: JSON.parse(r.photo_keys || '[]') })) });
}

async function api(request, env, ctx, url) {
  const { pathname } = url;
  if (pathname === '/api/lead' && request.method === 'POST') return createLead(request, env, ctx);

  if (!(await authorized(request, env))) return json({ error: 'Unauthorized' }, 401);

  if (pathname === '/api/leads' && request.method === 'GET') return listLeads(url, env);

  const lead = pathname.match(/^\/api\/leads\/([\w-]+)$/);
  if (lead && request.method === 'GET') {
    const r = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(lead[1]).first();
    return r ? json({ ...r, photo_keys: JSON.parse(r.photo_keys || '[]') }) : json({ error: 'Not found' }, 404);
  }
  if (lead && request.method === 'PATCH') {
    const body = await request.json().catch(() => ({}));
    if (!STATUSES.includes(body.status)) return json({ error: 'Invalid status' }, 400);
    const r = await env.DB.prepare('UPDATE leads SET status = ? WHERE id = ?').bind(body.status, lead[1]).run();
    return r.meta.changes ? json({ ok: true }) : json({ error: 'Not found' }, 404);
  }

  const photo = pathname.match(/^\/api\/photos\/(leads\/[\w-]+\/photo-\d+)$/);
  if (photo && request.method === 'GET') {
    const obj = await env.PHOTOS.get(photo[1]);
    if (!obj) return json({ error: 'Not found' }, 404);
    return new Response(obj.body, { headers: { 'content-type': obj.httpMetadata?.contentType || 'application/octet-stream' } });
  }
  return json({ error: 'Not found' }, 404);
}

// ---------- Secondary pages (FAQ, About, Privacy, Sitemap): content copied from the original site ----------
const SUB_CSS = `<style>
.phead{background:var(--hero);color:var(--heroink);padding:150px 0 72px;position:relative;overflow:hidden}
.phead::before{content:"";position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,var(--heroacc),transparent 65%);opacity:.14;left:-220px;top:-300px;pointer-events:none}
.phead .wrap{position:relative}
.phead .eyebrow{color:var(--heroacc)}
.phead h1{font-size:clamp(40px,5.5vw,68px);margin:16px 0 0}
.phead p{color:var(--herom);max-width:560px;margin:18px 0 0;font-size:18px}
.doc{padding:72px 0 110px}
.doc .wrap{max-width:820px}
.faq details{border-top:1px solid var(--line)}
.faq details:last-child{border-bottom:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:24px;padding:26px 0;font:400 24px/1.25 Fraunces,Georgia,serif;letter-spacing:-.01em}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";flex:none;width:36px;height:36px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;font:400 22px/1 Inter,sans-serif;color:var(--acc);transition:transform .3s}
.faq details[open] summary::after{transform:rotate(45deg)}
.faq summary:focus-visible{outline:2px solid var(--acc);outline-offset:4px;border-radius:8px}
.faq .ans{padding:0 56px 28px 0;color:var(--mut);margin:0}
.about{display:grid;grid-template-columns:1.35fr 1fr;gap:56px;align-items:start}
.about .txt p{margin:0;color:var(--mut);font-size:18px}
.infocard{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:30px}
.infocard small{display:block;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);font-weight:600;margin-bottom:6px}
.infocard h3{font-size:26px;margin:0 0 22px}
.infocard h3 a:hover{color:var(--acc)}
.infocard .row2{padding-top:18px;margin-top:18px;border-top:1px solid var(--line);color:var(--mut)}
.infocard .row2 b{display:block;color:var(--ink);font-weight:600}
.where{margin-top:64px}
.where h2{font-size:clamp(30px,4vw,44px);margin-bottom:8px}
.where p{margin:0 0 22px;color:var(--mut)}
.map{border-radius:24px;overflow:hidden;border:1px solid var(--line);background:var(--bg2)}
.map iframe{display:block;width:100%;height:380px;border:0}
.legal h3{font-size:28px;margin:46px 0 12px}
.legal h3:first-child{margin-top:0}
.legal p,.legal li{color:var(--mut);margin:0 0 14px}
.legal strong{color:var(--ink);font-weight:600}
.legal ul{padding-left:22px;margin:0 0 14px}
.legal a{color:var(--acc);text-decoration:underline;text-underline-offset:3px}
.smap h2{font-size:30px;margin-bottom:18px}
.smap ul{list-style:none;margin:0;padding:0}
.smap li{border-top:1px solid var(--line)}
.smap li:last-child{border-bottom:1px solid var(--line)}
.smap a{display:flex;justify-content:space-between;align-items:center;padding:18px 0;font-size:18px;transition:color .2s,padding .3s}
.smap a::after{content:"→";color:var(--acc)}
.smap a:hover{color:var(--acc);padding-left:8px}
@media (max-width:900px){.about{grid-template-columns:1fr;gap:32px}.phead{padding:118px 0 56px}.doc{padding:48px 0 80px}.faq summary{font-size:20px}.faq .ans{padding-right:0}.map iframe{height:300px}}
</style>`;

const SUB_SCRIPT = `<script>
(function(){
var nav=document.getElementById('nav');addEventListener('scroll',function(){nav.classList.toggle('s',scrollY>10)},{passive:true});
var hb=document.getElementById('hb'),mm=document.getElementById('mm');
function setMenu(o){hb.classList.toggle('open',o);hb.setAttribute('aria-expanded',o);hb.setAttribute('aria-label',o?'Close menu':'Open menu');mm.classList.toggle('open',o);mm.setAttribute('aria-hidden',!o);document.body.style.overflow=o?'hidden':''}
hb.onclick=function(){setMenu(!hb.classList.contains('open'))};
[].forEach.call(mm.querySelectorAll('a'),function(a){a.addEventListener('click',function(){setMenu(false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&mm.classList.contains('open')){setMenu(false);hb.focus()}});
addEventListener('resize',function(){if(innerWidth>980&&mm.classList.contains('open'))setMenu(false)});
})();
</script>`;

function subpage(o) {
  const head = html.slice(0, html.indexOf('</head>'))
    .replace(/<title>[^<]*<\/title>/, '<title>' + o.title + ' | Sell My RV Online</title>\n<meta name="description" content="' + o.desc + '">');
  const nav = html.slice(html.indexOf('<nav id="nav"'), html.indexOf('<!--/nav-->'))
    .replace(/href="#top"/g, 'href="/"').replace(/href="#how"/g, 'href="/#how"')
    .replace(/href="#contact"/g, 'href="/#contact"').replace(/href="#offer"/g, 'href="/#offer"')
    .replace('<li><a href="/faq/">', o.active ? '<li><a class="on" href="/faq/">' : '<li><a href="/faq/">');
  const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>') + 9);
  return head + SUB_CSS + '\n</head>\n<body>\n' + nav +
    '<header class="phead"><div class="wrap"><span class="eyebrow">' + o.eyebrow + '</span><h1>' + o.h1 + '</h1>' + (o.lead ? '<p>' + o.lead + '</p>' : '') + '</div></header>\n' +
    '<main class="doc"><div class="wrap">' + o.body + '</div></main>\n' + footer + '\n' + SUB_SCRIPT + '\n</body>\n</html>\n';
}

const FAQS = [
  ['How do you establish the value for my RV?', 'We have over 30 years of experience and a network of RV professionals nationwide that help keep us informed of the current market conditions and allow us to make very competitive offers.'],
  ['What items should I leave in my RV when selling to you?', 'Please leave ALL factory items like bedspreads, decorative pillows, furniture, and remotes. Please remove all personal items from the interior and outside bays. Please do not leave any perishable items in the refrigerator.'],
  ['My RV has been damaged, will you still purchase it?', 'Yes, we will adjust the value according to the estimated repair costs. Please disclose any damage when first contacting us for a value.'],
  ['What documents do I need to provide?', 'We will need a copy of the title or registration if you have a loan, last loan statement, copies of any trust or LLC documents if applicable, copy of your driver’s license, bank account number and routing number (can be provided after physical inspection).'],
  ['What documents do you provide?', 'We provide a bill of sale with the mutually agreed upon price. If you have a loan, we will provide the necessary documents to make the payoff for you and obtain a paper title from the DMV.'],
  ['What forms of payments do you suggest?', 'We ONLY use a federal wire transfer so once the funds are in your account they cannot be reversed.'],
  ['When can I cancel my insurance?', 'As soon as funds arrive in your account, and we take physical possession of the RV please cancel your insurance you will no longer have any liability.'],
  ['I have an extended warranty, is it of any value?', 'In most cases we recommend contacting the warranty company to see if they offer a pro-rated refund to you directly.'],
  ['Why should I sell to Sell My RV Online vs selling myself?', 'No hassle sale. No potential for fraud.'],
  ['Why should I trust Sell My RV Online?', 'We have been in the RV business for over 30 years and have perfected the consumer purchase. You will retain physical possession and title until satisfied with funding.'],
  ['I live in a very rural area. How will you arrange to pick up my RV?', 'We have a network of representatives throughout US that are highly experienced in finding their way to the most remote areas.'],
];

const PRIVACY_EMAIL = 'buchananam21@gmail.com';
const PRIVACY_HTML = `
<h3>Introduction</h3>
<p>This Privacy Policy describes how Sell My RV Online collects, uses, and shares your personal information when you visit our website.</p>
<h3>Information We Collect</h3>
<p>We collect the following types of personal information from you:</p>
<p><strong>Contact information: </strong>This includes your name, email address, and phone number.</p>
<p><strong>Usage information:</strong> This includes information about how you use our website, such as the pages you visit and the links you click.</p>
<p><strong>Technical information: </strong>This includes information about your computer hardware and software, such as your IP address, browser type, and operating system.</p>
<p><strong>Cookie information:</strong> We use cookies on our website to remember your preferences, track your browsing activity, and target advertising to you based on your interests. You can choose to disable cookies on your computer by changing your browser settings. However, disabling cookies may prevent you from using some features of our website.</p>
<h3>How We Use Your Information</h3>
<p>We use your personal information for the following purposes:</p>
<p><strong>To provide you with the services you request:</strong> This includes providing you with access to our website and our content.</p>
<p><strong>To improve our website and services:</strong> We use your usage information to improve our website and services, such as by personalizing your experience and identifying areas where we can improve.</p>
<p><strong>To send you marketing communications:</strong> We may use your contact information to send you marketing communications about our products and services. You can opt out of receiving marketing communications at any time by clicking on the “unsubscribe” link in any marketing email.</p>
<p><strong>To comply with the law:</strong> We may use your personal information to comply with applicable laws and regulations.</p>
<h3>Sharing Your Information</h3>
<p>We may share your personal information with third parties in the following circumstances:</p>
<p><strong>With our service providers:</strong> We may share your personal information with our service providers who help us operate our website and provide our services. These service providers are bound by contractual obligations to keep your personal information confidential and to use it only for the purposes for which it was provided.</p>
<p><strong>With law enforcement:</strong> We may share your personal information with law enforcement if we are required to do so by law or if we believe that sharing the information is necessary to prevent or investigate a crime.</p>
<h3>Your Rights</h3>
<p>You have the following rights with respect to your personal information:</p>
<p><strong>The right to access your personal information:</strong> You have the right to request a copy of your personal information that we hold.</p>
<p><strong>The right to correct your personal information:</strong> You have the right to correct any inaccurate or incomplete personal information that we hold about you.</p>
<p><strong>The right to delete your personal information:</strong> You have the right to request that we delete your personal information.</p>
<p><strong>The right to object to the processing of your personal information:</strong> You have the right to object to the processing of your personal information, for example, if you believe that the processing is not necessary for the purposes for which it was collected.</p>
<p><strong>The right to opt out of the sale of your personal information:</strong> If you are a resident of California, you have the right to opt out of the sale of your personal information.</p>
<h3>How to Exercise Your Rights</h3>
<p>To exercise your rights, please contact us at <a href="mailto:${PRIVACY_EMAIL}">${PRIVACY_EMAIL}</a>.</p>
<h3>Security</h3>
<p>We take the security of your personal information very seriously. We use a variety of security measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction.</p>
<h3>Changes to This Privacy Policy</h3>
<p>We may update this Privacy Policy from time to time. If we make any significant changes to the way we collect, use, or share your personal information, we will notify you by email or through a prominent notice on our website.</p>
<h3>Contact Information</h3>
<p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:${PRIVACY_EMAIL}">${PRIVACY_EMAIL}</a>.</p>
<h3>CCPA and VCDPA Compliance</h3>
<p>We comply with the California Consumer Privacy Act (CCPA) and the Virginia Consumer Data Protection Act (VCDPA). These laws give you certain rights with respect to your personal information, including the right to:</p>
<ul>
<li>Request access to your personal information.</li>
<li>Request that we delete your personal information.</li>
<li>Opt out of the sale of your personal information.</li>
<li>To exercise your rights, please contact us at <a href="mailto:${PRIVACY_EMAIL}">${PRIVACY_EMAIL}</a>.</li>
</ul>`;

const ABOUT_ADDRESS = '2432 W. Peoria Ave. Ste. 1074 Phoenix, AZ 85029';
const SITEMAP_LINKS = [
  ['/', 'Sell Your RV – Home Page'], ['/#how', 'How It Works'], ['/faq/', 'FAQs'], ['/about-us/', 'About Us'],
  ['/#contact', 'Contact Us'], ['/privacy-policy/', 'Privacy Policy'], ['/sitemap/', 'Sitemap'],
];

const PAGES = {
  '/faq': subpage({
    title: 'FAQs', desc: 'Answers to common questions about selling your RV to Sell My RV Online: valuation, documents, payment, insurance and pickup.',
    eyebrow: 'FAQs', h1: 'Frequently Asked <em>Questions</em>', active: true,
    body: '<div class="faq">' + FAQS.map(function (f) { return '<details><summary>' + f[0] + '</summary><p class="ans">' + f[1] + '</p></details>'; }).join('') + '</div>',
  }),
  '/about-us': subpage({
    title: 'About Us', desc: 'Sell My RV Online is committed to a hassle-free selling process for pre-owned luxury coaches at the best prices. Located in Phoenix, Arizona.',
    eyebrow: 'About us', h1: 'About <em>Us</em>',
    body: '<div class="about"><div class="txt"><p>Sell My RV Online is committed to providing our customers a hassle-free selling process of their pre-owned luxury coaches at the best prices. Located in Phoenix, Arizona, our sales side of the business offers a variety of Prevost bus conversions and top-end diesel fiberglass RVs. We strive to offer customers a wide variety of RVs to not only fill the dreams of the customer but to suit their budget as well. Customer service before, during, and after the sale is our number one priority.</p></div>' +
      '<aside class="infocard"><small>Call us</small><h3><a href="tel:800-863-1848">800-863-1848</a></h3><div class="row2"><b>Business Hours</b>By appointment only</div></aside></div>' +
      '<section class="where"><h2>We are located in <em>Phoenix, AZ</em></h2><p>' + ABOUT_ADDRESS + '</p><div class="map"><iframe loading="lazy" title="' + ABOUT_ADDRESS + '" src="https://maps.google.com/maps?q=' + encodeURIComponent(ABOUT_ADDRESS) + '&amp;t=m&amp;z=9&amp;output=embed&amp;iwloc=near" referrerpolicy="no-referrer-when-downgrade"></iframe></div></section>',
  }),
  '/privacy-policy': subpage({
    title: 'Privacy Policy', desc: 'How Sell My RV Online collects, uses and shares your personal information, and how to exercise your privacy rights.',
    eyebrow: 'Legal', h1: 'Privacy <em>Policy</em>', body: '<div class="legal">' + PRIVACY_HTML + '</div>',
  }),
  '/sitemap': subpage({
    title: 'Sitemap', desc: 'All pages of Sell My RV Online.', eyebrow: 'Sitemap', h1: '<em>Sitemap</em>',
    body: '<section class="smap"><h2>Pages</h2><ul>' + SITEMAP_LINKS.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('') + '</ul></section>',
  }),
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      try { return await api(request, env, ctx, url); }
      catch (e) { console.error(e); return json({ error: 'Server error' }, 500); }
    }
    if (url.pathname === '/admin' || url.pathname === '/admin/') {
      return new Response(adminHtml, {
        headers: { 'content-type': 'text/html;charset=UTF-8', 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'no-store' },
      });
    }
    const key = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;
    if (PAGES[key]) {
      return new Response(PAGES[key], { headers: { 'content-type': 'text/html;charset=UTF-8' } });
    }
    if (url.pathname === '/') {
      return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
    }
    return env.ASSETS.fetch(request);
  },
};

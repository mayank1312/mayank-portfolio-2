const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)],R=document.documentElement;
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const setTheme=t=>{R.dataset.theme=t;try{localStorage.t=t}catch(e){}};
$('#th').onclick=()=>setTheme(R.dataset.theme=='dark'?'light':'dark');
const pg=(location.pathname.split('/').pop()||'index').replace('.html','');
$$('.nv a').forEach(a=>a.classList.toggle('on',a.getAttribute('href').replace('.html','')==pg));
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||/^(http|mailto|#)|\.pdf$/.test(a.getAttribute('href'))||e.metaKey||e.ctrlKey)return;e.preventDefault();document.body.classList.add('out');setTimeout(()=>location.href=a.href,260)});

/* ---- reveal on load / scroll ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});
function reveal(){let i=0;$$('.b').forEach(e=>{if(e.getBoundingClientRect().top<innerHeight*.92)setTimeout(()=>e.classList.add('on'),i++*90);else io.observe(e)})}
document.fonts.ready.then(()=>setTimeout(reveal,120));
addEventListener('pointermove',e=>{R.style.setProperty('--px',(e.clientX/innerWidth-.5)*2);R.style.setProperty('--py',(e.clientY/innerHeight-.5)*2)});


/* ---- interactions ---- */
$$('.card').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.transform=`perspective(800px) rotateX(${(y/r.height-.5)*-4}deg) rotateY(${(x/r.width-.5)*5}deg)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
$$('.fl').forEach(f=>f.onclick=()=>f.classList.toggle('f'));
const cnt=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cnt.unobserve(e.target);const n=+e.target.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1400);e.target.textContent=Math.round(n*(1-Math.pow(1-k,3)));k<1&&requestAnimationFrame(f)})(t0)}));
$$('[data-n]').forEach(e=>cnt.observe(e));
const dz=$('#dz');if(dz){const ch=$$('.fc',dz),sv=$('svg',dz),draw=()=>{const r=dz.getBoundingClientRect();sv.innerHTML=ch.slice(0,-1).map((c,i)=>{const a=c.getBoundingClientRect(),b=ch[i+1].getBoundingClientRect(),x1=a.right-r.left,y1=a.top+a.height/2-r.top,x2=b.left-r.left,y2=b.top+b.height/2-r.top,m=(x1+x2)/2;return`<path d="M${x1} ${y1}C${m+70} ${y1},${m-70} ${y2},${x2} ${y2}" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="7 7"/>`}).join('')};
  ch.forEach(c=>c.onpointerdown=e=>{c.setPointerCapture(e.pointerId);const ox=e.clientX-c.offsetLeft,oy=e.clientY-c.offsetTop;c.style.cursor='grabbing';c.onpointermove=e=>{c.style.left=Math.max(0,Math.min(dz.clientWidth-c.offsetWidth,e.clientX-ox))+'px';c.style.top=Math.max(0,Math.min(dz.clientHeight-c.offsetHeight,e.clientY-oy))+'px';draw()};c.onpointerup=()=>{c.onpointermove=null;c.style.cursor=''}});
  setTimeout(draw,1500);addEventListener('resize',draw)}
$$('[data-f]').forEach(b=>b.onclick=()=>{$$('[data-f]').forEach(x=>x.classList.toggle('on',x==b));$$('[data-t]').forEach(c=>c.style.display=b.dataset.f=='all'||c.dataset.t.includes(b.dataset.f)?'':'none')});
$$('[data-k]').forEach(b=>b.onclick=()=>{$$('[data-k]').forEach(x=>x.classList.toggle('on',x==b));$$('[data-g]').forEach(g=>g.style.display=b.dataset.k=='all'||g.dataset.g==b.dataset.k?'':'none')});
const rb=$('#roll');if(rb)$('#spin').onclick=()=>{const cl=['L','M','U'];rb.innerHTML=Object.values(D.SK).filter((_,i)=>i<4).map((a,i)=>`<span class="fc ${cl[i%3]}" style="animation-delay:${i*.12}s">${a[Math.random()*a.length|0]}</span>`).join('')+'<span class="mono mut">← your next stack, probably 🎲</span>'};
const ff=$('#cf');if(ff)ff.onsubmit=e=>{e.preventDefault();const f=new FormData(ff);location.href=`mailto:${D.EMAIL}?subject=${encodeURIComponent('Hello from '+f.get('n'))}&body=${encodeURIComponent(f.get('m'))}`};
const cp=$('#copy');if(cp)cp.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(D.EMAIL);cp.textContent='copied ✓';setTimeout(()=>cp.textContent='copy email',1600)};

/* ---- terminal ---- */
const out=$('#out'),inp=$('#in');if(out){
const {P,AW,SK,SOC}=D,PS='<span class=p>mayank@portfolio</span>:<span class=d>~</span>$',print=h=>{const d=document.createElement('div');d.className='l';d.innerHTML=h;out.append(d);out.scrollTop=out.scrollHeight},wait=ms=>new Promise(r=>setTimeout(r,ms)),link=(u,t)=>`<a href="${u}" target="_blank" rel="noopener">${t||u}</a>`;
const FORT=['It works on my machine. Ship the machine.','A semicolon walks into a bar. Compile error.','LLMs hallucinate. So do estimates for "quick fixes".','git blame: the fastest way to meet yourself from 3 weeks ago.','Always test in production. (No. Please don\'t.)'];
const cmds={},hist=[];let hi=0;const def=(n,d,f)=>cmds[n]={d,f};
def('help','list all commands',()=>'<b>Commands</b>\n'+Object.entries(cmds).filter(([k,v])=>v.d).map(([k,v])=>`  <span class=p>${k.padEnd(11)}</span>${v.d}`).join('\n')+'\n<span class=d>tip: Tab autocompletes, ↑/↓ browse history</span>');
def('about','who is this person?',()=>'Mayank Dhingra — full-stack dev building AI-powered apps.\nB.Tech CSE (Data Science) @ GTBIT, GGSIPU, 2023-27.\nSoftware Developer Intern at Matrix Cellular Pvt Ltd.\nPlays chess, writes poems, lives for cricket.');
def('whoami','',()=>'guest — but you could be my next teammate 👀');
def('skills','tech stack, loaded in 6ms',async()=>{for(const[k,v]of Object.entries(SK)){print(`<span class=ok>✔</span> <b>${k.padEnd(22)}</b>${v.join(' · ')}`);await wait(140)}return'<span class=d>5 of 5 stacks loaded (100%)</span>'});
def('projects','list projects (then: open &lt;n&gt;)',()=>P.map((p,i)=>`<span class=p>[${i+1}]</span> <b>${p.n}</b>\n    ${p.d.slice(0,86)}…`).join('\n')+'\n<span class=d>try: open 1</span>');
def('open','open a project/social: open 1 | github | resume',a=>{const k=(a[0]||'').toLowerCase();if(SOC[k]){window.open(SOC[k],'_blank');return`opening ${k}…`}const p=P[+k-1]||P.find(p=>p.n.toLowerCase().startsWith(k));if(!k||!p)return'<span class=e>usage:</span> open &lt;1-5 | github | linkedin | x | resume&gt;';const u=p.l||p.g;if(!u)return`${p.n} is private (for now). Ask me about it!`;window.open(u,'_blank');return`launching <b>${p.n}</b>…`});
def('experience','where I work',()=>'<b>Software Developer Intern</b> — Matrix Cellular Pvt Ltd (Jun 2026 – now)\n  Built a WhatsApp help bot: real-time product suggestions, Python core logic.');
def('education','where I study',()=>'<b>B.Tech CSE (Data Science)</b> — GTBIT, GGSIPU (2023 – 2027)\nVidya Mandir Public School, Faridabad — Class X &amp; XII (PCM)');
def('awards','hackathons &amp; certs',()=>AW.map(a=>`🏆 <b>${a.n}</b> — ${a.d}`).join('\n'));
def('contact','find me online',()=>`Email     ${link('mailto:'+D.EMAIL,D.EMAIL)}\nGitHub    ${link(SOC.github)}\nLinkedIn  ${link(SOC.linkedin)}\nX         ${link(SOC.x)}`);
def('resume','download resume',()=>{window.open(SOC.resume,'_blank');return'fetching resume.pdf …'});
def('neofetch','flex the specs',()=>{const A=[' __  __ ____  ','|  \\/  |  _ \\ ','| |\\/| | | | |','| |  | | |_| |','|_|  |_|____/ ',''],I=['<b>mayank</b>@portfolio','OS: Mayank-OS 2.0','Role: Software Developer Intern','Stack: Next.js · Node · Python','Hobbies: chess · poems · cricket','Theme: '+R.dataset.theme];return A.map((l,i)=>`<span class=p>${l.replace(/</g,'&lt;')}</span>   ${I[i]}`).join('\n')});
def('theme','switch look: theme dark|light',a=>{const t=a[0]=='dark'||a[0]=='light'?a[0]:R.dataset.theme=='dark'?'light':'dark';setTheme(t);return`theme → <b>${t}</b> ✨`});
def('matrix','wake up, Neo',()=>{const cv=document.createElement('canvas');cv.style.cssText='position:fixed;inset:0;z-index:90;pointer-events:none;transition:opacity 1s';cv.width=innerWidth;cv.height=innerHeight;document.body.append(cv);const x=cv.getContext('2d'),n=Math.ceil(cv.width/16),y=Array(n).fill(0),fade=getComputedStyle(document.body).backgroundColor.replace('rgb(','rgba(').replace(')',',.13)'),col=R.dataset.theme=='dark'?'#dff25a':'#3347e6';const t=setInterval(()=>{x.fillStyle=fade;x.fillRect(0,0,cv.width,cv.height);x.fillStyle=col;x.font='14px monospace';y.forEach((v,i)=>{x.fillText(String.fromCharCode(0x30A0+Math.random()*96),i*16,v*16);y[i]=v*16>cv.height&&Math.random()>.975?0:v+1})},45);setTimeout(()=>{clearInterval(t);cv.style.opacity=0;setTimeout(()=>cv.remove(),1000)},4200);return'follow the white rabbit…'});
def('fortune','a dev fortune',()=>'🔮 '+FORT[Math.random()*FORT.length|0]);
def('poem','a poem by the dev',()=>'<i>I push to main at half past two,\nthe build is red, the sky is too.\nOne more commit, one more try —\nsemicolon, you sly guy.</i>');
def('chess','♟ play a move',()=>'  r n b q k b n r\n  p p p p . p p p\n  . . . . . . . .\n  . . . . p . . .\n  . . . . P . . .\n  . . . . . . . .\n  P P P P . P P P\n  R N B Q K B N R\n<span class=d>1. e4 — best by test. Your move.</span>');
def('cricket','live score',()=>'🏏 <b>MAYANK</b> 100* (87)\n   Commits: 6s · Bugs fixed: 4s · Deploys: boundaries\n<span class=d>Needs 1 internship offer to win the match.</span>');
def('ls','list files',()=>'<span class=p>projects/</span>  about.txt  skills.json  resume.pdf  <span class=e>secrets.env</span>');
def('cat','read a file',a=>({'about.txt':cmds.about.f(),'skills.json':JSON.stringify(SK,null,1),'resume.pdf':'binary file. try: <b>resume</b>','secrets.env':'nice try 😏 — API keys live in .env, not on a portfolio.'}[a[0]]||`cat: ${esc(a[0]||'')}: No such file`));
def('cd','',a=>a[0]?`cd: ${esc(a[0])}: permission denied (portfolio, not a server 😉)`:'');
def('pwd','',()=>'/home/guest/mayank-portfolio');
def('date','',()=>new Date().toString());
def('echo','',(a,l)=>esc(l.slice(5)));
def('ping','',()=>'PING mayank.dev: 64 bytes, time=0.1ms — reply: "hire me" 📡');
def('coffee','',()=>'    ( (\n     ) )\n  .______.\n  |      |]\n  \\      /\n   `----\'\n<span class=d>Brewed. Productivity +40%.</span>');
def('git','',a=>a[0]==='push'?'Enumerating objects… <span class=ok>done</span>\nremote: skills pushed to your hiring pipeline ✔':a[0]==='blame'?'all bugs: <b>mayank</b> (3 weeks ago)':'usage: git push | git blame');
def('rm','',a=>/-rf/.test(a.join(' '))?'<span class=e>rm: permission denied</span> — nice try, the portfolio stays. 🛡️':'rm: missing operand');
def('hack','',async()=>{for(const l of['Bypassing firewall…','Injecting payload…','Decrypting… ▓▓▓▓▓▓▓▒▒▒','Access granted.'])print(`<span class=ok>${l}</span>`),await wait(380);return'…just kidding. This is a portfolio. 😄'});
def('sudo','',async a=>{if(a.join(' ')!=='hire mayank')return'guest is not in the sudoers file. This incident will be reported 🚨';for(let i=1;i<=10;i++){print('<span class=ok>'+'█'.repeat(i)+'░'.repeat(10-i)+`</span> verifying skills ${i*10}%`);i>1&&out.lastChild.previousSibling.remove();await wait(160)}setTimeout(()=>location.href='contact.html',1200);return'<span class=ok>ACCESS GRANTED ✔</span> offer letter drafted… opening contact page ↗'});
def('history','',()=>hist.map((h,i)=>` ${i+1}  ${esc(h)}`).join('\n')||'(empty)');
def('clear','clear screen',()=>{out.innerHTML='';return''});
def('exit','',()=>'there is no escape. only more portfolio. 🌀');
async function run(l){print(`${PS} ${esc(l)}`);if(!l.trim())return;hist.push(l);hi=hist.length;const[c,...a]=l.trim().split(/\s+/),f=cmds[c.toLowerCase()];if(!f){print(`<span class=e>command not found:</span> ${esc(c)} — try <b>help</b>`);return}const r=await f.f(a,l);r&&print(r)}
inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const v=inp.value;inp.value='';run(v)}else if(e.key==='ArrowUp'){e.preventDefault();hi=Math.max(0,hi-1);inp.value=hist[hi]||''}else if(e.key==='ArrowDown'){e.preventDefault();hi=Math.min(hist.length,hi+1);inp.value=hist[hi]||''}else if(e.key==='Tab'){e.preventDefault();const m=Object.keys(cmds).filter(k=>k.startsWith(inp.value));if(m.length===1)inp.value=m[0]}else if(e.key==='l'&&e.ctrlKey){e.preventDefault();out.innerHTML=''}});
print('<b>Mayank-OS 2.0</b> — welcome, guest. Type <span class=p>help</span> or tap a command below.');
$('#chp').innerHTML=['help','about','skills','projects','awards','neofetch','theme','matrix','fortune','sudo hire mayank'].map(c=>`<button class="ch">${c}</button>`).join('');
$$('#chp button').forEach(b=>b.onclick=()=>run(b.textContent));
}

/* ---- signature cursor (the lime-core disc from the logo) + dock magnification ---- */
(()=>{
if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const dot=document.createElement('div'),ring=document.createElement('div');dot.className='mc';ring.className='mr';ring.innerHTML='<span></span>';document.body.append(ring,dot);R.classList.add('mc-on');
const lab=ring.firstChild,L=[['input,textarea',null],['.sw','mood'],['.fc','drag'],['summary','peek'],['.fl','flip'],['.logo','home'],['a[target=_blank]','visit ↗'],['a.card','open ↗'],['a[href]','go'],['button,.ch','click']];
let mx=-100,my=-100,rx=-100,ry=-100,live=false;
const place=()=>{dot.style.transform=`translate3d(${mx}px,${my}px,0)`;ring.style.transform=`translate3d(${rx}px,${ry}px,0)`};
(function f(){rx+=(mx-rx)*(calm?1:.2);ry+=(my-ry)*(calm?1:.2);place();requestAnimationFrame(f)})();
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;mx=e.clientX;my=e.clientY;if(!live){live=true;rx=mx;ry=my;R.classList.add('mc-live')}wake()},{passive:true});
document.addEventListener('pointerover',e=>{const t=e.target.closest?e.target:e.target.parentElement;let l;for(const[s,x]of L)if(t.closest(s)){l=x;break}
  R.classList.toggle('mc-hide',l===null);R.classList.toggle('mc-hov',!!l);if(l)lab.textContent=l});
document.addEventListener('pointerdown',()=>R.classList.add('mc-dn'));addEventListener('pointerup',()=>R.classList.remove('mc-dn'));
document.documentElement.addEventListener('pointerleave',()=>{live=false;R.classList.remove('mc-live')});

if(calm)return;
/* dock: elements swell as the pointer approaches, like the macOS dock */
const T=[],add=(sel,max,rad,org,root=document)=>$$(sel,root).forEach(el=>{el.classList.add('dk');el.style.transformOrigin=org;T.push({el,max,rad,s:1,card:el.classList.contains('card')})});
function split(el){const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.append(w);return}const s=document.createElement('span');s.className='dw';[...w].forEach(ch=>{const k=document.createElement('span');k.className='dc';k.textContent=ch;s.append(k)});f.append(s)});c.replaceWith(f)}else if(c.nodeType===1)walk(c)})};walk(el)}
$$('h1,h2').forEach(split);
add('.dc',1.25,95,'50% 90%');
add('.nv a',1.5,120,'50% 50%');add('.logo',1.18,120,'0 60%');add('.sw',1.2,100,'50% 50%');add('.header .btn,header .btn',1.12,140,'50% 50%');
add('.card',1.05,320,'50% 50%');add('.card h3',1.14,220,'0 60%');add('.card p',1.04,200,'0 50%');add('.vis',1.04,220,'50% 50%');
add('.ch',1.14,110,'50% 60%');add('.lk a',1.2,90,'0 60%');add('summary',1.12,110,'0 50%');
add('.stats>div',1.14,190,'0 90%');add('.eb',1.1,140,'0 50%');add('.lead',1.03,200,'0 50%');add('.btn:not(header .btn)',1.1,170,'50% 50%');
add('.tl>div',1.03,220,'0 30%');add('.fl',1.05,200,'50% 50%');add('.fc',1.1,160,'50% 50%');add('.ft a',1.25,90,'50% 80%');add('.big',1.04,260,'0 70%');
let raf=0,lastMove=0;
function wake(){lastMove=performance.now();if(!raf)raf=requestAnimationFrame(tick)}
addEventListener('scroll',wake,{passive:true});
function tick(now){let busy=now-lastMove<220;
  for(const t of T){const r=t.el.getBoundingClientRect();let g=1;
    if(r.width&&r.bottom>-250&&r.top<innerHeight+250){const dx=Math.max(r.left-mx,0,mx-r.right),dy=Math.max(r.top-my,0,my-r.bottom),d=Math.hypot(dx,dy);
      if(live&&d<t.rad)g=1+(t.max-1)*(1+Math.cos(Math.PI*d/t.rad))/2}
    t.s+=(g-t.s)*.3;if(Math.abs(g-t.s)>.002)busy=true;
    const v=Math.abs(t.s-1)<.002?'':t.s.toFixed(3);if(t.v!==v){t.v=v;t.el.style.scale=v;if(t.card)t.el.style.zIndex=v&&t.s>1.01?3:''}}
  raf=busy?requestAnimationFrame(tick):0}
document.addEventListener('pointerleave',wake);
})();
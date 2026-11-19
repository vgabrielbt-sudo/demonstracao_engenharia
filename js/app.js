/* Comportamento compartilhado. Cada bloco só roda se o elemento existir na página. */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const REDUCED=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE=matchMedia("(pointer: fine)").matches;
  const SITE=window.SITE||{};
  const mod=(i,n)=>((i%n)+n)%n;
  let uid=0;

  /* ilustrações e efeitos */
  $$("[data-scene]").forEach(el=>{el.innerHTML=Scenes.scene(el.dataset.scene,"s"+(uid++))});
  $$("[data-fx]").forEach(el=>{el.innerHTML=Scenes.fx(el.dataset.fx)});
  if($("#sqScene")){const h=Scenes.hero();$("#sqScene").innerHTML=h.sq;$("#sqLines").innerHTML=h.lines;$("#heroCrane").innerHTML=h.crane;$("#ground").innerHTML=h.ground}

  /* menu */
  const hdr=$("#top"),mb=$("#menuBtn");
  if(mb){mb.onclick=()=>{const o=hdr.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
    $$("#nav a").forEach(a=>a.addEventListener("click",()=>{hdr.classList.remove("open");mb.setAttribute("aria-expanded","false")}))}
  const yr=$("#yr");if(yr)yr.textContent=new Date().getFullYear();

  /* corte A-A: o novo conteúdo entra por uma linha de corte; o antigo vira desenho azul enquanto sai */
  function cutSwap(host,html,dir,lineParent){
    const lp=lineParent||host;
    $$(".cut-layer",host).forEach((e,i,a)=>{if(i<a.length-1)e.remove()});
    $$(".cut-line",lp).forEach(e=>e.remove());
    const old=$(".cut-layer",host);
    const nw=document.createElement("div");nw.className="cut-layer";nw.innerHTML=html;
    if(REDUCED||!old){host.innerHTML="";host.appendChild(nw);return nw}
    host.appendChild(nw);
    const line=document.createElement("div");line.className="cut-line";line.innerHTML="<i>A</i><i>A</i>";lp.appendChild(line);
    old.classList.add("bp");
    const o={duration:1000,easing:"cubic-bezier(.65,0,.25,1)",fill:"both"};
    const a1=nw.animate([{clipPath:dir>0?"inset(0 100% 0 0)":"inset(0 0 0 100%)"},{clipPath:"inset(0 0 0 0)"}],o);
    line.animate(dir>0?[{left:"0%"},{left:"100%"}]:[{left:"100%"},{left:"0%"}],o);
    a1.finished.then(()=>{old.remove();line.remove();a1.cancel()}).catch(()=>{});
    return nw;
  }

  /* profundidade: mouse (suavizado) + rolagem */
  const scopes=$$(".dscope"), pars=$$("[data-par]");
  if(!REDUCED){
    scopes.forEach(sc=>{
      let tx=0,ty=0,cx=0,cy=0,raf=0;
      const tick=()=>{cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;sc.style.setProperty("--mx",cx.toFixed(3));sc.style.setProperty("--my",cy.toFixed(3));
        raf=(Math.abs(tx-cx)>.002||Math.abs(ty-cy)>.002)?requestAnimationFrame(tick):0};
      if(FINE){
        sc.addEventListener("pointermove",e=>{const r=sc.getBoundingClientRect();tx=(e.clientX-r.left)/r.width*2-1;ty=(e.clientY-r.top)/r.height*2-1;if(!raf)raf=requestAnimationFrame(tick)});
        sc.addEventListener("pointerleave",()=>{tx=ty=0;if(!raf)raf=requestAnimationFrame(tick)});
      }
    });
    let sraf=0;
    const upd=()=>{sraf=0;const vh=innerHeight;
      scopes.forEach(sc=>{const r=sc.getBoundingClientRect();if(r.bottom<-120||r.top>vh+120)return;sc.style.setProperty("--sy",(-r.top).toFixed(1))});
      pars.forEach(el=>{const r=el.getBoundingClientRect(),c=r.top+r.height/2;if(r.bottom<-300||r.top>vh+300)return;
        el.style.setProperty("--py",((c-vh/2)*(parseFloat(el.dataset.par)||.1)).toFixed(1))});
    };
    addEventListener("scroll",()=>{if(!sraf)sraf=requestAnimationFrame(upd)},{passive:true});addEventListener("resize",upd);upd();
  }

  /* cartões com inclinação */
  if(!REDUCED&&FINE)$$("[data-tilt]").forEach(c=>{
    c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      c.style.setProperty("--ry",((x-.5)*12).toFixed(2)+"deg");c.style.setProperty("--rx",((.5-y)*10).toFixed(2)+"deg");
      c.style.setProperty("--gx",(x*100).toFixed(0)+"%");c.style.setProperty("--gy",(y*100).toFixed(0)+"%")});
    c.addEventListener("pointerleave",()=>{c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")});
  });

  /* revelar e ativar efeitos das obras */
  if("IntersectionObserver"in window){
    if(!REDUCED){
      const ro=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");ro.unobserve(en.target)}}),{threshold:.12});
      $$("[data-rv]").forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)return;el.classList.add("rv");ro.observe(el)});
    }
    const lo=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("live");lo.unobserve(en.target)}}),{threshold:.3});
    $$(".ob").forEach(o=>lo.observe(o));
  }else $$(".ob").forEach(o=>o.classList.add("live"));

  /* serviços: cortes técnicos */
  const svcHost=$("#svcHost");
  if(svcHost){
    const SV=SITE.servicos;let idx=0;
    const tabs=$("#svcTabs");
    tabs.innerHTML=SV.map((s,i)=>`<button type="button" role="tab" id="tab-${s.slug}" aria-selected="false" data-i="${i}">${esc(s.nome)}</button>`).join("");
    const svgNow=()=>{const a=$$(".cs",svcHost);return a[a.length-1]};
    function setLayer(id){
      $$("#layers button").forEach(b=>b.setAttribute("aria-expanded",b.dataset.ly===id));
      const svg=svgNow();if(!svg)return;svg.dataset.hi=id;
      $$(".ly",svg).forEach(g=>g.classList.toggle("is-on",g.dataset.ly===id));
    }
    function show(i,dir,first){
      idx=i;const s=SV[i];
      $$("#svcTabs button").forEach((b,k)=>b.setAttribute("aria-selected",k===i));
      $("#svcName").textContent=s.nome;$("#svcDesc").textContent=s.desc;$("#svcRef").textContent=s.ref;
      $("#layers").innerHTML=s.camadas.map(c=>`<li><button type="button" data-ly="${c[0]}" aria-expanded="false">${esc(c[1])}</button><div class="ly-d"><div><p class="spec">${esc(c[2])}</p><p>${esc(c[3])}</p></div></div></li>`).join("");
      const html=`<div class="cut-layer">${Cortes.get(i)}</div>`;
      if(first){svcHost.innerHTML=html}else cutSwap(svcHost,html,dir);
      setLayer(s.camadas[0][0]);
      try{history.replaceState(null,"","#"+s.slug)}catch(_){}
    }
    tabs.addEventListener("click",e=>{const b=e.target.closest("button[data-i]");if(!b)return;const i=+b.dataset.i;if(i!==idx)show(i,i>idx?1:-1)});
    tabs.addEventListener("keydown",e=>{if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;e.preventDefault();const i=mod(idx+(e.key==="ArrowRight"?1:-1),SV.length);show(i,e.key==="ArrowRight"?1:-1);$$("#svcTabs button")[i].focus()});
    $("#layers").addEventListener("click",e=>{const b=e.target.closest("button[data-ly]");if(b)setLayer(b.dataset.ly)});
    $("#layers").addEventListener("mouseover",e=>{const b=e.target.closest("button[data-ly]");if(b&&FINE)setLayer(b.dataset.ly)});
    svcHost.addEventListener("mouseover",e=>{const g=e.target.closest(".ly");if(g&&FINE)setLayer(g.dataset.ly)});
    svcHost.addEventListener("click",e=>{const g=e.target.closest(".ly");if(g)setLayer(g.dataset.ly)});
    const fromHash=()=>{const h=location.hash.replace("#","");const i=SV.findIndex(s=>s.slug===h);return i<0?0:i};
    show(fromHash(),1,true);
    addEventListener("hashchange",()=>{const i=fromHash();if(i!==idx)show(i,i>idx?1:-1)});
  }

  /* sobre: a linha do processo se desenha com a rolagem */
  const tl=$("#tl");
  if(tl){
    const line=$(".tl-line",tl),items=$$("li",tl);
    const upd=()=>{const r=tl.getBoundingClientRect(),vh=innerHeight;
      line.style.setProperty("--p",Math.min(1,Math.max(0,(vh*.6-r.top)/r.height)).toFixed(3));
      items.forEach(li=>li.classList.toggle("on",li.getBoundingClientRect().top<vh*.62))};
    addEventListener("scroll",()=>requestAnimationFrame(upd),{passive:true});addEventListener("resize",upd);upd();
  }

  /* projetos: carrossel com corte A-A */
  const stage=$("#stage");
  if(stage&&SITE.projetos){
    const P=SITE.projetos,N=P.length;let cur=0,tab="desc";
    const slots={};
    [-1,0,1].forEach(s=>{const el=document.createElement("button");el.type="button";el.className="pc";el.dataset.slot=s;
      el.innerHTML='<div class="pc-in"></div>';stage.insertBefore(el,$("#prev"));slots[s]={el,inner:$(".pc-in",el)}});
    const sceneHTML=i=>`<div class="cut-layer">${Scenes.scene(P[i].cena,"c"+(uid++))}</div>`;
    $("#dots").innerHTML=P.map((p,i)=>`<button type="button" data-i="${i}" aria-label="Ir para ${esc(p.nome)}"></button>`).join("");
    const info=anim=>{const p=P[cur];$("#pcat").textContent=p.cat;$("#pname").textContent=p.nome;$("#plink").href="projeto-"+p.slug+".html";
      const body=$("#pbody");body.innerHTML=tab==="desc"?`<p>${esc(p.desc)}</p>`:`<dl class="ficha">${p.ficha.map(f=>`<dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd>`).join("")}</dl>`;
      if(anim&&!REDUCED)body.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:420,delay:380,easing:"ease-out",fill:"backwards"});
      $("#t-desc").setAttribute("aria-selected",tab==="desc");$("#t-ficha").setAttribute("aria-selected",tab==="ficha");
      stage.setAttribute("aria-label","Projetos. Atual: "+p.nome+". Use as setas do teclado para navegar.")};
    const marks=()=>{$$("#dots button").forEach((d,i)=>d.setAttribute("aria-current",i===cur));
      $("#pbPrevN").textContent=P[mod(cur-1,N)].nome;$("#pbNextN").textContent=P[mod(cur+1,N)].nome;
      slots[-1].el.setAttribute("aria-label","Anterior: "+P[mod(cur-1,N)].nome);slots[1].el.setAttribute("aria-label","Próximo: "+P[mod(cur+1,N)].nome);slots[0].el.setAttribute("aria-label","Abrir "+P[cur].nome)};
    function go(i,dir,first){
      cur=mod(i,N);
      if(first)slots[0].inner.innerHTML=sceneHTML(cur);else cutSwap(slots[0].inner,sceneHTML(cur),dir,slots[0].el);
      [-1,1].forEach(s=>{slots[s].inner.innerHTML=sceneHTML(mod(cur+s,N));
        if(!first&&!REDUCED)slots[s].inner.animate([{opacity:0},{opacity:1}],{duration:500,delay:450,fill:"backwards"})});
      marks();info(!first);
    }
    slots[-1].el.onclick=()=>go(cur-1,-1);
    slots[1].el.onclick=()=>go(cur+1,1);
    slots[0].el.onclick=()=>{location.href="projeto-"+P[cur].slug+".html"};
    $("#prev").onclick=$("#pbPrev").onclick=()=>go(cur-1,-1);
    $("#next").onclick=$("#pbNext").onclick=()=>go(cur+1,1);
    $("#dots").addEventListener("click",e=>{const b=e.target.closest("button[data-i]");if(b&&+b.dataset.i!==cur)go(+b.dataset.i,+b.dataset.i>cur?1:-1)});
    $("#t-desc").onclick=()=>{tab="desc";info(false)};$("#t-ficha").onclick=()=>{tab="ficha";info(false)};
    stage.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){e.preventDefault();go(cur-1,-1)}if(e.key==="ArrowRight"){e.preventDefault();go(cur+1,1)}});
    let sx=null;stage.addEventListener("pointerdown",e=>{sx=e.clientX});
    stage.addEventListener("pointerup",e=>{if(sx===null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>60){go(cur+(dx<0?1:-1),dx<0?1:-1)}});
    stage.addEventListener("pointercancel",()=>{sx=null});
    go(0,1,true);
  }

  /* pontos de interesse */
  $$(".hot").forEach(h=>h.addEventListener("click",()=>{const was=h.classList.contains("open");$$(".hot.open").forEach(x=>x.classList.remove("open"));if(!was)h.classList.add("open")}));

  /* contato */
  const form=$("#form");
  if(form&&SITE.servicos){
    const sel=$("#f-tipo");
    sel.innerHTML=SITE.servicos.map(s=>`<option>${esc(s.nome)}</option>`).join("")+`<option>Outro / ainda não sei</option>`;
    try{const q=new URLSearchParams(location.search).get("servico");const k=SITE.servicos.findIndex(s=>s.slug===q);if(k>=0)sel.selectedIndex=k}catch(_){}
    const D=SITE.dados,wa=t=>`https://wa.me/${D.whatsapp}?text=${encodeURIComponent(t)}`;
    $("#waBtn").href=wa("Olá! Gostaria de solicitar um orçamento.");
    $("#mapLink").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(D.endereco);
    $("#map").insertAdjacentHTML("afterbegin",`<svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="640" height="320" fill="#12201E"/><g stroke="#fff" stroke-opacity=".08" fill="none"><path d="M0 70H640M0 160H640M0 250H640M120 0V320M280 0V320M450 0V320M560 0V320"/></g><path d="M0 230C160 200 240 120 380 130S560 60 640 40" stroke="#9AA5A7" stroke-opacity=".5" stroke-width="10" fill="none"/><path d="M300 0L350 320" stroke="#9AA5A7" stroke-opacity=".35" stroke-width="6"/><g transform="translate(330 140)"><circle r="26" fill="#E4611B" fill-opacity=".25"/><circle r="9" fill="#E4611B"/><circle r="3.5" fill="#0F1214"/></g></svg>`);
    const setErr=(id,m)=>{const e=$("#e-"+id);if(!e)return;e.textContent=m||"";const f=e.closest(".fld");if(m)f.setAttribute("data-bad","");else f.removeAttribute("data-bad")};
    form.addEventListener("submit",ev=>{ev.preventDefault();
      const v=n=>$("#f-"+n).value.trim();let first=null;const bad=(id,m)=>{setErr(id,m);if(m&&!first)first=$("#f-"+id)};
      const digits=v("tel").replace(/\D/g,"");
      bad("nome",v("nome").length<2?"Informe seu nome.":"");
      bad("tel",digits.length<10||digits.length>13?"Informe um telefone com DDD.":"");
      bad("email",v("email")&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))?"Esse e-mail parece incompleto.":"");
      bad("msg",v("msg").length<10?"Escreva ao menos uma frase sobre o que precisa.":"");
      bad("ok",$("#f-ok").checked?"":"Marque para podermos retornar o contato.");
      if(first){first.focus();return}
      const t=`Olá! Sou ${v("nome")} e gostaria de solicitar um orçamento.\nServiço: ${sel.value}\nLocal da obra: ${v("local")||"não informado"}\n\n${v("msg")}\n\nContato: ${v("tel")}${v("email")?" · "+v("email"):""}`;
      $("#resPre").textContent=t;$("#resWa").href=wa(t);$("#result").hidden=false;
      $("#result").scrollIntoView({behavior:REDUCED?"auto":"smooth",block:"nearest"});
    });
    $("#resCopy").addEventListener("click",async e=>{const b=e.currentTarget,t=$("#resPre").textContent;
      try{await navigator.clipboard.writeText(t);b.textContent="Mensagem copiada"}
      catch(_){const r=document.createRange();r.selectNodeContents($("#resPre"));const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="Texto selecionado"}
      setTimeout(()=>b.textContent="Copiar mensagem",2200)});
    form.addEventListener("input",e=>{setErr(e.target.id.replace("f-",""),"")});
  }
})();

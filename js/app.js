/* Comportamento compartilhado. Cada bloco só roda se o elemento existir na página. */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const REDUCED=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE=matchMedia("(pointer: fine)").matches;
  const SITE=window.SITE||{};
  const ARROW='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 8h11M9 3.5L13.5 8 9 12.5"/></svg>';
  let uid=0;

  /* ilustrações */
  $$("[data-scene]").forEach(el=>{el.innerHTML=Scenes.scene(el.dataset.scene,"s"+(uid++))});
  const hd=$("#heroDisc");
  if(hd){const h=Scenes.hero();hd.innerHTML=h.disc;$("#heroCrane").innerHTML=h.crane}

  /* menu */
  const hdr=$("#top"),mb=$("#menuBtn");
  if(mb){mb.onclick=()=>{const o=hdr.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
    $$("#nav a").forEach(a=>a.addEventListener("click",()=>{hdr.classList.remove("open");mb.setAttribute("aria-expanded","false")}))}
  const yr=$("#yr");if(yr)yr.textContent=new Date().getFullYear();

  /* profundidade: mouse (com suavização) + rolagem, por contêiner */
  const scopes=$$(".dscope"), pars=$$("[data-par]");
  if(!REDUCED){
    scopes.forEach(sc=>{
      let tx=0,ty=0,cx=0,cy=0,raf=0;
      const tick=()=>{cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;
        sc.style.setProperty("--mx",cx.toFixed(3));sc.style.setProperty("--my",cy.toFixed(3));
        raf=(Math.abs(tx-cx)>.002||Math.abs(ty-cy)>.002)?requestAnimationFrame(tick):0};
      if(FINE){
        sc.addEventListener("pointermove",e=>{const r=sc.getBoundingClientRect();tx=(e.clientX-r.left)/r.width*2-1;ty=(e.clientY-r.top)/r.height*2-1;if(!raf)raf=requestAnimationFrame(tick)});
        sc.addEventListener("pointerleave",()=>{tx=ty=0;if(!raf)raf=requestAnimationFrame(tick)});
      }
    });
    let sraf=0;
    const upd=()=>{sraf=0;const vh=innerHeight;
      scopes.forEach(sc=>{const r=sc.getBoundingClientRect();if(r.bottom<-120||r.top>vh+120)return;sc.style.setProperty("--sy",(-r.top).toFixed(1))});
      pars.forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;
        const sp=parseFloat(el.dataset.par)||.1;el.style.setProperty("--py",(((r.top+r.height/2)-vh/2)*sp).toFixed(1))});
    };
    addEventListener("scroll",()=>{if(!sraf)sraf=requestAnimationFrame(upd)},{passive:true});addEventListener("resize",upd);upd();
  }

  /* cartões com inclinação 3D */
  if(!REDUCED&&FINE)$$("[data-tilt]").forEach(c=>{
    c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      c.style.setProperty("--ry",((x-.5)*12).toFixed(2)+"deg");c.style.setProperty("--rx",((.5-y)*10).toFixed(2)+"deg");
      c.style.setProperty("--gx",(x*100).toFixed(0)+"%");c.style.setProperty("--gy",(y*100).toFixed(0)+"%")});
    c.addEventListener("pointerleave",()=>{c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")});
  });

  /* revelar grupos de cartões */
  const rvs=$$("[data-rv]");
  if(!REDUCED&&"IntersectionObserver"in window){
    const ro=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");ro.unobserve(en.target)}}),{threshold:.12});
    rvs.forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight){return}el.classList.add("rv");ro.observe(el)});
  }

  /* serviços: coluna fixa troca a cena conforme o bloco em foco */
  const blocks=$$(".svx-blocks article");
  if(blocks.length){
    const scenes=$$(".svx-vis .sv-scene"),lbl=$("#svxLbl");
    const setOn=i=>{blocks.forEach((b,k)=>b.classList.toggle("on",k===i));scenes.forEach((s,k)=>s.classList.toggle("on",k===i));if(lbl)lbl.textContent=blocks[i].dataset.name};
    setOn(0);
    const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)setOn(blocks.indexOf(en.target))}),{rootMargin:"-45% 0px -45% 0px"});
    blocks.forEach(b=>io.observe(b));
  }

  /* sobre: linha do processo se desenha com a rolagem */
  const tl=$("#tl");
  if(tl){
    const line=$(".tl-line",tl),items=$$("li",tl);
    const upd=()=>{const r=tl.getBoundingClientRect(),vh=innerHeight;
      const p=Math.min(1,Math.max(0,(vh*.6-r.top)/r.height));line.style.setProperty("--p",p.toFixed(3));
      items.forEach(li=>{const lr=li.getBoundingClientRect();li.classList.toggle("on",lr.top<vh*.62)})};
    addEventListener("scroll",()=>requestAnimationFrame(upd),{passive:true});addEventListener("resize",upd);upd();
  }

  /* projetos: carrossel */
  const stage=$("#stage");
  if(stage&&SITE.projetos){
    const P=SITE.projetos,N=P.length;let cur=0,tab="desc";
    P.forEach((p,i)=>{const c=document.createElement("button");c.type="button";c.className="pc";c.dataset.i=i;
      c.setAttribute("aria-label",p.nome+", "+p.cat);c.innerHTML=Scenes.scene(p.cena,"c"+(uid++));stage.insertBefore(c,$("#prev"))});
    $("#dots").innerHTML=P.map((p,i)=>`<button type="button" data-i="${i}" aria-label="Ir para ${esc(p.nome)}"></button>`).join("");
    const info=anim=>{const p=P[cur];$("#pcat").textContent=p.cat;$("#pname").textContent=p.nome;$("#plink").href="projeto-"+p.id+".html";
      const body=$("#pbody");body.innerHTML=tab==="desc"?`<p>${esc(p.desc)}</p>`:`<dl class="ficha">${p.ficha.map(f=>`<dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd>`).join("")}</dl>`;
      if(anim&&!REDUCED)body.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:420,easing:"ease-out"});
      $("#t-desc").setAttribute("aria-selected",tab==="desc");$("#t-ficha").setAttribute("aria-selected",tab==="ficha")};
    const layout=()=>{$$(".pc",stage).forEach((el,i)=>{let o=(((i-cur)%N)+N)%N;if(o>N/2)o-=N;
      el.style.setProperty("--o",o);el.style.setProperty("--a",Math.abs(o));el.dataset.pos=o;el.setAttribute("aria-hidden",o!==0);el.tabIndex=Math.abs(o)===1?0:-1});
      $("#ghostn").textContent=String(cur+1).padStart(2,"0");
      $$("#dots button").forEach((d,i)=>d.setAttribute("aria-current",i===cur));
      $("#pbPrevN").textContent=P[(cur+N-1)%N].nome;$("#pbNextN").textContent=P[(cur+1)%N].nome};
    const go=(i,a=true)=>{cur=((i%N)+N)%N;layout();info(a)};
    stage.addEventListener("click",e=>{const c=e.target.closest(".pc");if(!c)return;if(+c.dataset.pos!==0)go(+c.dataset.i);else location.href="projeto-"+P[cur].id+".html"});
    $("#prev").onclick=$("#pbPrev").onclick=()=>go(cur-1);
    $("#next").onclick=$("#pbNext").onclick=()=>go(cur+1);
    $("#dots").addEventListener("click",e=>{const b=e.target.closest("button[data-i]");if(b)go(+b.dataset.i)});
    $("#t-desc").onclick=()=>{tab="desc";info(true)};$("#t-ficha").onclick=()=>{tab="ficha";info(true)};
    stage.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){e.preventDefault();go(cur-1)}if(e.key==="ArrowRight"){e.preventDefault();go(cur+1)}});
    let sx=null;stage.addEventListener("pointerdown",e=>{sx=e.clientX});
    stage.addEventListener("pointerup",e=>{if(sx===null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>50)go(cur+(dx<0?1:-1))});
    stage.addEventListener("pointercancel",()=>{sx=null});
    go(0,false);
  }

  /* pontos de interesse (prévia da interação do modelo 3D) */
  $$(".hot").forEach(h=>h.addEventListener("click",()=>{const was=h.classList.contains("open");$$(".hot.open").forEach(x=>x.classList.remove("open"));if(!was)h.classList.add("open")}));

  /* contato */
  const form=$("#form");
  if(form&&SITE.servicos){
    const sel=$("#f-tipo");
    sel.innerHTML=SITE.servicos.map(s=>`<option>${esc(s.nome)}</option>`).join("")+`<option>Outro / ainda não sei</option>`;
    try{const q=new URLSearchParams(location.search).get("servico");if(q&&sel.options[+q-1])sel.selectedIndex=+q-1}catch(_){}
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

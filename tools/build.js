/* Gera as páginas HTML a partir de js/data.js. Uso: node tools/build.js */
const fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.join(__dirname,"..");
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,"js/data.js"),"utf8"),ctx);
const S=ctx.window.SITE,D=S.dados;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ARROW='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 8h11M9 3.5L13.5 8 9 12.5"/></svg>';
const PREV='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 3L6 10l7 7"/></svg>';
const NEXT='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 3l7 7-7 7"/></svg>';
const LOGO='<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="3" y="3" width="34" height="34" fill="none" stroke="#fff" stroke-width="4"/><path d="M3 37L37 3" stroke="#E4611B" stroke-width="5"/></svg>';
const ICONS=[
  '<svg viewBox="0 0 28 28"><path d="M4 21V8h20v13zM4 25h20M4 23v4M24 23v4"/></svg>',
  '<svg viewBox="0 0 28 28"><path d="M3 22L14 6l11 16zM3 22h22M9 14l8 8M20 14l-8 8"/></svg>',
  '<svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="8"/><path d="M14 2v6M14 20v6M2 14h6M20 14h6"/></svg>',
  '<svg viewBox="0 0 28 28"><path d="M3 23h22M6 23V15h5v8M13 23V8h5v15M20 23V12h5"/></svg>'];
const NAV=[["index.html","Início","inicio"],["sobre.html","Sobre","sobre"],["servicos.html","Serviços","servicos"],["projetos.html","Projetos","projetos"],["contato.html","Contato","contato"]];

const head=(title,desc)=>`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#0F1214">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="css/styles.css">
</head>
<body>`;
const header=active=>`<header class="top" id="top"><div class="wrap top-in">
  <a class="brand" href="index.html" aria-label="${esc(D.marca)}, ir ao início">${LOGO}<span><b>${esc(D.marca)}</b><small>ENGENHARIA</small></span></a>
  <nav id="nav" aria-label="Principal"><ul>${NAV.map(n=>`<li><a href="${n[0]}"${n[2]===active?' class="on" aria-current="page"':''}>${n[1]}</a></li>`).join("")}</ul></nav>
  <a class="btn btn-p btn-sm" href="contato.html">Orçamento</a>
  <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
</div></header>`;
const footer=()=>`<footer class="foot"><div class="wrap">
  <div class="foot-grid">
    <div><a class="brand" href="index.html" style="margin-bottom:16px">${LOGO}<span><b>${esc(D.marca)}</b><small>ENGENHARIA</small></span></a><p style="max-width:24rem">Site de demonstração. Todo o conteúdo é ilustrativo e será substituído pelos dados reais da empresa.</p></div>
    <div><h4>Páginas</h4><ul>${NAV.map(n=>`<li><a href="${n[0]}">${n[1]}</a></li>`).join("")}</ul></div>
    <div><h4>Contato</h4><ul><li>${esc(D.telefone)}</li><li>${esc(D.email)}</li><li>${esc(D.endereco)}</li></ul></div>
  </div>
  <div class="legal"><span>© <span id="yr"></span> ${esc(D.marca)}</span><span>${esc(D.registro)}</span><a href="#top">Voltar ao topo ↑</a></div>
</div></footer>
<script src="js/data.js"></script><script src="js/scenes.js"></script><script src="js/app.js"></script>
</body>
</html>
`;
const page=(file,active,title,desc,body)=>fs.writeFileSync(path.join(root,file),head(title,desc)+"\n"+header(active)+"\n<main>\n"+body+"\n</main>\n"+footer());
const sh=(lbl,h,id)=>`<div class="sh"><span class="lbl">${lbl}</span><i class="rule"></i><h2${id?` id="${id}"`:""}>${h}</h2></div>`;
const pad=n=>String(n).padStart(2,"0");
const cta=(h,p)=>`<section class="cta" aria-label="Chamada para orçamento"><div class="ghost" aria-hidden="true">ORÇ</div><div class="wrap cta-in"><div><h2>${h}</h2><p>${p}</p></div><a class="btn btn-k" href="contato.html">Solicitar orçamento ${ARROW}</a></div></section>`;
const phead=(crumbs,h1,lead,visual,ghost)=>`<section class="phead${visual?"":" solo"} dscope"><div class="ghost" aria-hidden="true" data-d style="--d:-10;--f:.06">${ghost}</div><div class="wrap phead-in"><div><p class="crumb mono">${crumbs}</p><h1>${h1}</h1><p class="lead">${lead}</p></div>${visual||""}</div></section>`;
const crumb=(...p)=>['<a href="index.html">Início</a>',...p].join(" <span>/</span> ");
const discVis=(scene,cap)=>`<div class="disc-wrap" data-d style="--d:10;--f:.05"><div class="ring" aria-hidden="true"></div><div class="disc" role="img" aria-label="Ilustração demonstrativa"><div class="sv-scene on" data-scene="${scene}" style="opacity:1;transform:none"></div></div><p class="disc-cap mono"><span>${cap}</span><span>Ilustração</span></p></div>`;
const pn=(prev,next,pre)=>`<div class="wrap"><nav class="pn" aria-label="Navegação entre páginas"><a href="${pre}-${prev.id}.html">${PREV}<span>${esc(prev.nome)}</span></a><a href="${pre}-${next.id}.html"><span>${esc(next.nome)}</span>${NEXT}</a></nav></div>`;

/* ---------- Início ---------- */
const P=S.projetos,SV=S.servicos;
page("index.html","inicio",`${D.marca} — Engenharia`,"Projeto, acompanhamento técnico e responsabilidade assumida em cada etapa. Solicite um orçamento de engenharia.",`
<section class="hero dscope" aria-labelledby="h1">
  <div class="ruler" aria-hidden="true"></div>
  <div class="ghost" aria-hidden="true" data-d style="--d:-14;--f:.07">ENG</div>
  <div class="wrap hero-in">
    <div data-d style="--d:-4;--f:.02">
      <p class="eyebrow mono"><span>${esc(D.marca)}</span><span>·</span><span>Engenharia</span></p>
      <h1 id="h1"><span class="ln">Precisão no projeto.</span><span class="ln">Segurança na execução.</span></h1>
      <p class="lead">Projeto, acompanhamento técnico e responsabilidade assumida em cada etapa. Conte o que você precisa e receba uma proposta clara.</p>
      <div class="cta-row"><a class="btn btn-p" href="contato.html">Solicitar orçamento ${ARROW}</a><a class="btn btn-o" href="projetos.html">Ver projetos</a></div>
    </div>
    <div class="disc-wrap">
      <div class="ring" aria-hidden="true" data-d style="--d:22;--f:.11"></div>
      <div class="disc" id="heroDisc" role="img" aria-label="Ilustração de um guindaste e uma estrutura metálica em construção ao entardecer"></div>
      <div class="crane" id="heroCrane" aria-hidden="true" data-d style="--d:34;--f:.16"></div>
      <p class="disc-cap mono"><span>Ilustração demonstrativa</span><span>Fig. 01</span></p>
    </div>
  </div>
</section>
<div class="bar-wrap"><div class="wrap"><nav class="bar" aria-label="Serviços">${SV.map((s,i)=>`<a href="servico-${s.id}.html">${ICONS[i]}<span>${esc(s.nome)}</span></a>`).join("")}</nav></div></div>

<section class="sec feature feat" aria-labelledby="h-feat">
  <div class="wrap feat-grid">
    <div class="feat-vis dscope" data-rv><div class="ring" aria-hidden="true"></div><div class="disc" style="box-shadow:0 40px 80px rgba(0,0,0,.5)" role="img" aria-label="Ilustração do projeto em destaque"><div data-scene="${P[0].cena}" style="position:absolute;inset:0"></div></div><div class="feat-num" aria-hidden="true" data-par=".05">01</div></div>
    <div data-rv>
      ${sh("Em destaque","Projeto 1","h-feat")}
      <p class="mono" style="color:var(--ember-hi)">${esc(P[0].cat)}</p>
      <p style="margin-top:14px">${esc(P[0].desc)}</p>
      <dl class="strip">${P[0].ficha.slice(0,3).map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join("")}</dl>
      <div class="cta-row"><a class="btn btn-p" href="projeto-1.html">Ver projeto ${ARROW}</a><a class="btn btn-o" href="projetos.html">Todos os projetos</a></div>
    </div>
  </div>
</section>

<section class="sec lt" aria-labelledby="h-dif">
  <div class="wrap">${sh("Diferenciais","Por que contratar","h-dif")}
    <ul class="dband">${S.diferenciais.map((d,i)=>`<li data-rv style="--i:${i}"><h3>${esc(d[0])}</h3><p class="muted">${esc(d[1])}</p></li>`).join("")}</ul>
  </div>
</section>
${cta("Vamos conversar sobre o seu projeto","Descreva o que precisa e a gente retorna com os próximos passos.")}`);

/* ---------- Sobre ---------- */
page("sobre.html","sobre",`Sobre — ${D.marca}`,"Conheça a empresa, a forma de trabalhar e os diferenciais.",`
${phead(crumb("<b>Sobre</b>"),"Engenharia com responsabilidade assinada","Quem somos, como trabalhamos e o que você pode esperar de cada etapa.",discVis("plan","Prancha 01"),"SOBRE")}
<section class="sec lt" aria-labelledby="h-quem"><div class="wrap about-grid">
  <div data-rv>
    <p class="big" id="h-quem">Engenharia é decisão técnica com consequência. Por isso cada trabalho começa pelo <em>entendimento do problema</em>.</p>
    <div class="cols3">
      <div><h3>História</h3><p class="muted">Texto demonstrativo sobre a história da empresa.</p></div>
      <div><h3>Filosofia</h3><p class="muted">Texto demonstrativo sobre a forma de trabalhar.</p></div>
      <div><h3>Responsável técnico</h3><p class="muted">Nome, formação e registro profissional entram aqui.</p></div>
    </div>
  </div>
  <div data-rv>
    <div class="frame"><div class="img" data-scene="plan" role="img" aria-label="Desenho técnico de uma planta baixa com cotas"></div></div>
    <dl class="tblock"><dt>Empresa</dt><dd>${esc(D.marca)}</dd><dt>Registro</dt><dd>${esc(D.registro)}</dd><dt>Endereço</dt><dd>${esc(D.endereco)}</dd><dt>Telefone</dt><dd>${esc(D.telefone)}</dd></dl>
  </div>
</div></section>
<section class="sec" style="background:var(--ink)" aria-labelledby="h-proc"><div class="wrap">${sh("Processo","Como o trabalho acontece","h-proc")}
  <ol class="tl" id="tl" style="list-style:none;margin:0"><div class="tl-line" aria-hidden="true"><i></i></div>${S.processo.map((p,i)=>`<li><span class="mk" aria-hidden="true">${pad(i+1)}</span><h3>${esc(p[0])}</h3><p>${esc(p[1])}</p></li>`).join("")}</ol>
</div></section>
<section class="sec lt" aria-labelledby="h-dif2"><div class="wrap dif-grid">
  <div class="dif-side">${sh("Diferenciais","")}<h2 id="h-dif2" style="font:800 clamp(1.7rem,3.2vw,2.7rem)/1.05 var(--f-display);font-stretch:112%;text-transform:uppercase;margin-top:22px">Por que contratar</h2><p class="muted">Compromissos que orientam o trabalho do primeiro contato à entrega.</p></div>
  <ul class="dif-list">${S.diferenciais.map((d,i)=>`<li data-rv style="--i:${i}"><h3>${esc(d[0])}</h3><p>${esc(d[1])}</p></li>`).join("")}</ul>
</div></section>
${cta("Precisa de um projeto de engenharia?","Fale com a gente e receba uma proposta.")}`);

/* ---------- Serviços ---------- */
page("servicos.html","servicos",`Serviços — ${D.marca}`,"Conheça os serviços de engenharia oferecidos.",`
${phead(crumb("<b>Serviços</b>"),"O que fazemos","Role para percorrer os serviços. Cada um tem sua própria página.","","SERV")}
<section class="sec" style="background:var(--ink)" aria-label="Lista de serviços"><div class="wrap svx">
  <div class="svx-vis" aria-hidden="true"><div class="ring"></div><div class="disc">${SV.map(s=>`<div class="sv-scene" data-scene="${s.cena}"></div>`).join("")}</div><p class="svx-lbl mono"><span id="svxLbl">${esc(SV[0].nome)}</span><span>Ilustração</span></p></div>
  <div class="svx-blocks">${SV.map((s,i)=>`<article data-name="${esc(s.nome)}"><div class="svx-inline" data-scene="${s.cena}" aria-hidden="true"></div><p class="k mono">Serviço ${pad(i+1)}</p><h2>${esc(s.nome)}</h2><p>${esc(s.desc)}</p><dl><div><dt>Para quem</dt><dd>${esc(s.para)}</dd></div></dl><div class="cta-row"><a class="btn btn-p" href="servico-${s.id}.html">Ver detalhes ${ARROW}</a><a class="btn btn-o" href="contato.html?servico=${s.id}">Orçar</a></div></article>`).join("")}</div>
</div></section>
${cta("Não achou o que procura?","Conte o que precisa. A gente avalia e responde.")}`);
SV.forEach((s,i)=>{const prev=SV[(i+SV.length-1)%SV.length],next=SV[(i+1)%SV.length];
page(`servico-${s.id}.html`,"servicos",`${s.nome} — ${D.marca}`,s.desc,`
${phead(crumb('<a href="servicos.html">Serviços</a>',`<b>${esc(s.nome)}</b>`),esc(s.nome),esc(s.desc),discVis(s.cena,"Serviço "+pad(s.id)),pad(s.id))}
<section class="sec lt" aria-labelledby="h-inc"><div class="wrap">${sh("O que inclui","Etapas e entregas","h-inc")}
  <ul class="incl">${s.inclui.map((x,k)=>`<li data-rv style="--i:${k}"><h3>${esc(x[0])}</h3><p class="muted">${esc(x[1])}</p></li>`).join("")}</ul>
  <p style="margin-top:34px;max-width:36rem"><span class="mono" style="color:var(--ember-ink)">Para quem</span><br>${esc(s.para)}</p>
</div></section>
${cta("Quer orçar este serviço?","Informe o local e o que precisa. A gente retorna com a proposta.").replace('href="contato.html"',`href="contato.html?servico=${s.id}"`)}
<section style="background:var(--ink)">${pn(prev,next,"servico")}</section>`)});

/* ---------- Projetos ---------- */
page("projetos.html","projetos",`Projetos — ${D.marca}`,"Projetos e obras de demonstração.",`
${phead(crumb("<b>Projetos</b>"),"Obras e projetos","Cards de demonstração. Clique no projeto em destaque para abrir a página dele.","","PROJ")}
<section class="sec proj" aria-label="Carrossel de projetos"><div class="wrap">
  <div class="proj-grid">
    <div class="stage" id="stage" tabindex="0" role="region" aria-roledescription="carrossel" aria-label="Projetos. Use as setas do teclado para navegar.">
      <div class="ghostn" id="ghostn" aria-hidden="true">01</div>
      <button class="arrow prev" id="prev" type="button" aria-label="Projeto anterior">${PREV}</button>
      <button class="arrow next" id="next" type="button" aria-label="Próximo projeto">${NEXT}</button>
    </div>
    <div class="pinfo" aria-live="polite">
      <p class="cat mono" id="pcat"></p><h3 id="pname"></h3>
      <div class="tabs" role="tablist" aria-label="Detalhes do projeto"><button type="button" role="tab" id="t-desc" aria-selected="true">Descrição</button><button type="button" role="tab" id="t-ficha" aria-selected="false">Ficha técnica</button></div>
      <div class="pbody" id="pbody"></div>
      <div class="cta-row"><a class="btn btn-p" id="plink" href="projeto-1.html">Abrir projeto ${ARROW}</a></div>
    </div>
  </div>
  <div class="pbar"><button type="button" id="pbPrev">${PREV}<span id="pbPrevN"></span></button><div class="dots" id="dots"></div><button type="button" id="pbNext"><span id="pbNextN"></span>${NEXT}</button></div>
</div></section>
<section class="sec lt" aria-labelledby="h-all"><div class="wrap">${sh("Todos","Todos os projetos","h-all")}
  <div class="cards">${P.map((p,i)=>`<a class="tc" href="projeto-${p.id}.html" data-tilt data-rv style="--i:${i}"><div class="im" data-scene="${p.cena}" role="img" aria-label="Ilustração do ${esc(p.nome)}"></div><span class="n" aria-hidden="true">${pad(p.id)}</span><div class="lift"><span class="mono">${esc(p.cat)}</span><b>${esc(p.nome)}</b></div></a>`).join("")}</div>
</div></section>
${cta("Tem um projeto em mente?","Descreva o que precisa e a gente conversa.")}`);

P.forEach((p,i)=>{const prev=P[(i+P.length-1)%P.length],next=P[(i+1)%P.length];
page(`projeto-${p.id}.html`,"projetos",`${p.nome} — ${D.marca}`,p.desc,`
<section class="pj-hero"><div class="wrap pj-in">
  <div><p class="crumb mono">${crumb('<a href="projetos.html">Projetos</a>',`<b>${esc(p.nome)}</b>`)}</p><p class="cat mono">${esc(p.cat)}</p><h1>${esc(p.nome)}</h1><p class="lead">${esc(p.desc)}</p><div class="cta-row"><a class="btn btn-p" href="contato.html">Quero um projeto como este ${ARROW}</a></div></div>
  <div class="vp dscope" role="group" aria-label="Prévia do visualizador do projeto">
    <div data-scene="${p.cena}" data-d style="--d:-10;--f:0;position:absolute;inset:-4%"></div>
    <span class="vlabel mono">Visualizador 3D (prévia)</span>
    ${p.pontos.map(h=>`<button class="hot" type="button" style="left:${h[0]}%;top:${h[1]}%" aria-label="${esc(h[2])}"><span class="tip"><b>${esc(h[2])}</b>${esc(h[3])}</span></button>`).join("")}
    <span class="vhint mono">Passe o mouse nos pontos. Aqui entrará o modelo 3D navegável.</span>
  </div>
</div></section>
<section class="sec lt" aria-label="Detalhes do projeto"><div class="wrap pj-body">
  <div><div class="sh"><span class="lbl">Detalhes</span><i class="rule"></i></div><p class="big" style="max-width:26ch">${esc(p.desc.split(".")[0])}.</p><p class="muted" style="margin-top:20px">${esc(p.desc.split(".").slice(1).join(".").trim())}</p></div>
  <dl class="tblock">${p.ficha.map(f=>`<dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd>`).join("")}</dl>
</div></section>
<section style="background:var(--ink)">${pn(prev,next,"projeto")}</section>`)});

/* ---------- Contato ---------- */
const WA='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.4-4.2A8.5 8.5 0 1 1 8.3 18.7z"/><path d="M9 9.5c.4 2.2 2.3 4 4.5 4.5l1.2-1.2-1.8-.9-.8.8c-.9-.4-1.7-1.2-2.100-2.100l.8-.8-.9-1.800z" fill="currentColor" stroke="none"/></svg>';
page("contato.html","contato",`Contato — ${D.marca}`,"Solicite um orçamento pelo formulário ou pelo WhatsApp.",`
${phead(crumb("<b>Contato</b>"),"Solicite um orçamento","Descreva o que precisa. A gente retorna com os próximos passos.","","CONT")}
<section class="sec contato" aria-label="Contato"><div class="wrap ct-grid">
  <div class="ct-info" data-rv>
    <p>Prefere falar direto? Chame no WhatsApp ou use o formulário ao lado.</p>
    <a class="btn wa" id="waBtn" href="#" target="_blank" rel="noopener">${WA}Atendimento pelo WhatsApp</a>
    <dl class="clist"><div><dt>Telefone</dt><dd>${esc(D.telefone)}</dd></div><div><dt>WhatsApp</dt><dd>${esc(D.whatsappTxt)}</dd></div><div><dt>E-mail</dt><dd>${esc(D.email)}</dd></div><div><dt>Endereço</dt><dd>${esc(D.endereco)}</dd></div><div><dt>Horário</dt><dd>${esc(D.horario)}</dd></div></dl>
    <div class="map" id="map" role="img" aria-label="Mapa ilustrativo da localização"><a class="mono" id="mapLink" href="#" target="_blank" rel="noopener">Abrir no Google Maps</a></div>
  </div>
  <form class="form" id="form" novalidate data-rv>
    <h2>Pedido de orçamento</h2><p class="sub">Campos com * são obrigatórios.</p>
    <div class="fgrid">
      <div class="fld"><label for="f-nome">Nome *</label><input id="f-nome" autocomplete="name" required><span class="err" id="e-nome"></span></div>
      <div class="fld"><label for="f-tel">WhatsApp / telefone *</label><input id="f-tel" type="tel" inputmode="tel" autocomplete="tel" required><span class="err" id="e-tel"></span></div>
      <div class="fld"><label for="f-email">E-mail</label><input id="f-email" type="email" autocomplete="email"><span class="err" id="e-email"></span></div>
      <div class="fld"><label for="f-tipo">Do que você precisa?</label><select id="f-tipo"></select></div>
      <div class="fld full"><label for="f-local">Local da obra (cidade / bairro)</label><input id="f-local" autocomplete="address-level2"></div>
      <div class="fld full"><label for="f-msg">Mensagem *</label><textarea id="f-msg" placeholder="Conte em poucas linhas o que precisa, metragem aproximada e prazo desejado."></textarea><span class="err" id="e-msg"></span></div>
      <div class="fld full"><label class="chk"><input type="checkbox" id="f-ok"><span>Concordo em ser contatado sobre este pedido. Os dados são usados apenas para retorno do orçamento.</span></label><span class="err" id="e-ok"></span></div>
    </div>
    <button class="btn btn-p" type="submit">Preparar pedido ${ARROW}</button>
    <div class="result" id="result" hidden aria-live="polite"><strong>Pedido pronto para envio</strong><pre id="resPre"></pre><div class="row"><a class="btn btn-p btn-sm" id="resWa" href="#" target="_blank" rel="noopener">Enviar pelo WhatsApp</a><button class="btn btn-o btn-sm" type="button" id="resCopy">Copiar mensagem</button></div><small>O pedido só é enviado quando você toca em "Enviar pelo WhatsApp". Este site não guarda as informações digitadas.</small></div>
  </form>
</div></section>`);
console.log("páginas geradas:",fs.readdirSync(root).filter(f=>f.endsWith(".html")).join(", "));

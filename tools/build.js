/* Gera as páginas HTML a partir de js/data.js. Uso: node tools/build.js */
const fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.join(__dirname,"..");
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,"js/data.js"),"utf8"),ctx);
const S=ctx.window.SITE,D=S.dados,P=S.projetos,SV=S.servicos;
fs.readdirSync(root).filter(f=>/^(servico|projeto)-.*\.html$/.test(f)).forEach(f=>fs.unlinkSync(path.join(root,f)));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ARROW='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 8h11M9 3.5L13.5 8 9 12.5"/></svg>';
const PREV='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 3L6 10l7 7"/></svg>';
const NEXT='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 3l7 7-7 7"/></svg>';
const LOGO='<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="3" y="3" width="34" height="34" fill="none" stroke="#fff" stroke-width="4"/><path d="M3 37L37 3" stroke="#E4611B" stroke-width="5"/></svg>';
const ICONS=[
  '<svg viewBox="0 0 28 28"><path d="M3 9h14a6 6 0 016 6v10M3 15h8a2 2 0 012 2v8"/></svg>',
  '<svg viewBox="0 0 28 28"><path d="M5 5h18M5 23h18M14 5v18"/></svg>',
  '<svg viewBox="0 0 28 28"><path d="M14 3v11M7 14h14v6H7zM3 25h22"/></svg>',
  '<svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="4"/><path d="M14 3v4M14 21v4M3 14h4M21 14h4M6 6l3 3M19 19l3 3M22 6l-3 3M9 19l-3 3"/></svg>'];
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
    <div><a class="brand" href="index.html" style="margin-bottom:16px">${LOGO}<span><b>${esc(D.marca)}</b><small>ENGENHARIA</small></span></a><p style="max-width:24rem">Site de demonstração. O conteúdo é ilustrativo e será substituído pelos dados reais da empresa.</p></div>
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
const stamp=(h,p)=>`<section class="stampsec" aria-label="Contato"><div class="wrap"><div class="stamp"><div class="st-main"><h2>${h}</h2><p>${p}</p><a class="tlink" href="contato.html">Solicitar orçamento ${ARROW}</a></div>
  <dl class="st-cells"><div><dt>Telefone</dt><dd>${esc(D.telefone)}</dd></div><div><dt>E-mail</dt><dd>${esc(D.email)}</dd></div><div><dt>Endereço</dt><dd>${esc(D.endereco)}</dd></div><div><dt>Horário</dt><dd>${esc(D.horario)}</dd></div></dl></div></div></section>`;
const phead=(crumbs,h1,lead,ghost)=>`<section class="phead paper dscope"><div class="ghost" aria-hidden="true" data-d style="--d:-10;--f:.06">${ghost}</div><div class="wrap phead-in"><p class="crumb mono">${crumbs}</p><h1>${h1}</h1><p class="lead">${lead}</p></div></section>`;
const crumb=(...p)=>['<a href="index.html">Início</a>',...p].join(" <span>/</span> ");
const pn=(prev,next)=>`<div class="wrap"><nav class="pn" aria-label="Navegação entre projetos"><a href="projeto-${prev.slug}.html">${PREV}<span>${esc(prev.nome)}</span></a><a href="projeto-${next.slug}.html"><span>${esc(next.nome)}</span>${NEXT}</a></nav></div>`;
const FX={frame:"frame",bridge:"bridge",plant:"plant",crane:"crane2"};

/* ---------- Início ---------- */
const ob=(cls,p,par)=>`<a class="ob ${cls}" href="projeto-${p.slug}.html" data-par="${par}"><div class="ob-vis"><div data-scene="${p.cena==="crane"?"crane2":p.cena}"></div><div class="ob-fx" data-fx="${FX[p.cena]}"></div></div><div class="ob-cap"><span class="mono">${esc(p.cat)}</span><b>${esc(p.nome)}</b><i>${esc(p.detalhe)}</i></div></a>`;
page("index.html","inicio",`${D.marca} — Engenharia`,"Projeto, acompanhamento técnico e responsabilidade assumida em cada etapa. Engenharia industrial e civil.",`
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><clipPath id="sqClip" clipPathUnits="objectBoundingBox"><path clip-rule="evenodd" d="M.0625 .875L.9375 .875L.9375 .0625Z M.34375 .765625L.8125 .765625L.8125 .33125Z"/></clipPath></defs></svg>
<section class="hero paper dscope" aria-labelledby="h1">
  <div class="ghost" aria-hidden="true" data-d style="--d:-14;--f:.07">ENG</div>
  <div class="wrap hero-in">
    <div data-d style="--d:-4;--f:.02">
      <h1 id="h1"><span class="ln">Precisão no projeto.</span><span class="ln">Segurança na execução.</span></h1>
      <p class="lead">Engenharia industrial e civil. Projeto, montagem e acompanhamento técnico, com responsabilidade assumida em cada etapa.</p>
    </div>
    <div class="sqw">
      <div class="sq-layer" data-d style="--d:10;--f:.05"><div class="sq" id="sqScene" role="img" aria-label="Esquadro com a imagem de uma obra ao entardecer"></div><div class="sq-lines" id="sqLines" aria-hidden="true"></div></div>
      <div class="ground" id="ground" aria-hidden="true" data-d style="--d:4;--f:.02"></div>
      <div class="crane" id="heroCrane" aria-hidden="true" data-d style="--d:34;--f:.16"></div>
    </div>
  </div>
  <div class="carimbo" aria-hidden="true"><span>Escala</span><b>1:50</b><span>Folha</span><b>A1</b></div>
</section>
<div class="bar-wrap"><div class="wrap"><nav class="bar" aria-label="Serviços">${SV.map((s,i)=>`<a href="servicos.html#${s.slug}">${ICONS[i]}<span>${esc(s.nome)}</span></a>`).join("")}</nav></div></div>

<section class="sec obras" aria-labelledby="h-ob"><div class="wrap">
  ${sh("Obras","Obras e projetos","h-ob")}
  <div class="ob-grid">
    ${ob("ob-a",P[0],"-.04")}${ob("ob-b",P[1],".05")}${ob("ob-c",P[2],"-.03")}${ob("ob-d",P[3],".06")}
    <div class="ob-link"><a class="tlink" href="projetos.html">Ver todos os projetos ${ARROW}</a></div>
  </div>
</div></section>

<section class="sec lt" aria-labelledby="h-dif"><div class="wrap">${sh("Diferenciais","Por que contratar","h-dif")}
  <ul class="dband">${S.diferenciais.map((d,i)=>`<li data-rv style="--i:${i}"><h3>${esc(d[0])}</h3><p class="muted">${esc(d[1])}</p></li>`).join("")}</ul>
</div></section>
${stamp("Vamos conversar sobre o seu projeto","Descreva o que precisa e a gente retorna com os próximos passos.")}`);

/* ---------- Sobre ---------- */
page("sobre.html","sobre",`Sobre — ${D.marca}`,"Conheça a empresa, a forma de trabalhar e os diferenciais.",`
${phead(crumb("<b>Sobre</b>"),"Engenharia com responsabilidade assinada","Quem somos, como trabalhamos e o que você pode esperar de cada etapa.","SOBRE")}
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
  <ol class="tl" id="tl"><div class="tl-line" aria-hidden="true"><i></i></div>${S.processo.map(p=>`<li><span class="mk" aria-hidden="true"></span><h3>${esc(p[0])}</h3><p>${esc(p[1])}</p></li>`).join("")}</ol>
</div></section>
<section class="sec lt" aria-labelledby="h-dif2"><div class="wrap dif-grid">
  <div class="dif-side"><div class="sh" style="margin-bottom:0"><span class="lbl">Diferenciais</span><i class="rule"></i></div><h2 id="h-dif2" style="font:800 clamp(1.7rem,3.2vw,2.7rem)/1.05 var(--f-display);font-stretch:112%;text-transform:uppercase;margin-top:22px">Por que contratar</h2><p class="muted">Compromissos que orientam o trabalho do primeiro contato à entrega.</p></div>
  <ul class="dif-list">${S.diferenciais.map((d,i)=>`<li data-rv style="--i:${i}"><h3>${esc(d[0])}</h3><p>${esc(d[1])}</p></li>`).join("")}</ul>
</div></section>
${stamp("Precisa de um projeto de engenharia?","Fale com a gente e receba uma proposta.")}`);

/* ---------- Serviços ---------- */
page("servicos.html","servicos",`Serviços — ${D.marca}`,"Serviços de engenharia industrial e civil, explicados em corte técnico.",`
${phead(crumb("<b>Serviços</b>"),"O que fazemos","Escolha um serviço e passe o mouse sobre as camadas do corte para ver o material e a função de cada uma.","SERV")}
<section class="sec" style="background:var(--ink)" aria-label="Serviços"><div class="wrap svc">
  <div class="svc-tabs" id="svcTabs" role="tablist" aria-label="Serviços"></div>
  <div class="svc-main">
    <div class="svc-draw"><div class="cutwrap" id="svcHost"></div></div>
    <div class="svc-info"><h2 id="svcName"></h2><p id="svcDesc"></p><p class="ref mono" id="svcRef"></p><ul class="layers" id="layers" aria-label="Camadas do corte"></ul></div>
  </div>
</div></section>
${stamp("Não achou o que procura?","Conte o que precisa. A gente avalia e responde.")}`);

/* ---------- Projetos ---------- */
page("projetos.html","projetos",`Projetos — ${D.marca}`,"Projetos e obras de engenharia industrial e civil.",`
${phead(crumb("<b>Projetos</b>"),"Obras e projetos","Clique no projeto do centro para abrir a página dele, ou nas laterais para trocar.","PROJ")}
<section class="sec proj" aria-label="Carrossel de projetos"><div class="wrap">
  <div class="proj-grid">
    <div class="stage" id="stage" tabindex="0" role="region" aria-roledescription="carrossel" aria-label="Projetos">
      <button class="arrow prev" id="prev" type="button" aria-label="Projeto anterior">${PREV}</button>
      <button class="arrow next" id="next" type="button" aria-label="Próximo projeto">${NEXT}</button>
    </div>
    <div class="pinfo" aria-live="polite">
      <p class="cat mono" id="pcat"></p><h3 id="pname"></h3>
      <div class="tabs" role="tablist" aria-label="Detalhes do projeto"><button type="button" role="tab" id="t-desc" aria-selected="true">Descrição</button><button type="button" role="tab" id="t-ficha" aria-selected="false">Ficha técnica</button></div>
      <div class="pbody" id="pbody"></div>
      <a class="tlink" id="plink" href="projeto-${P[0].slug}.html">Abrir projeto ${ARROW}</a>
    </div>
  </div>
  <div class="pbar"><button type="button" id="pbPrev">${PREV}<span id="pbPrevN"></span></button><div class="dots" id="dots"></div><button type="button" id="pbNext"><span id="pbNextN"></span>${NEXT}</button></div>
</div></section>
<section class="sec lt" aria-labelledby="h-all"><div class="wrap">${sh("Todos","Todos os projetos","h-all")}
  <div class="cards">${P.map((p,i)=>`<a class="tc" href="projeto-${p.slug}.html" data-tilt data-rv style="--i:${i}"><div class="im" data-scene="${p.cena}" role="img" aria-label="Ilustração: ${esc(p.nome)}"></div><div class="lift"><span class="mono">${esc(p.cat)}</span><b>${esc(p.nome)}</b></div></a>`).join("")}</div>
</div></section>
${stamp("Tem um projeto em mente?","Descreva o que precisa e a gente conversa.")}`);

P.forEach((p,i)=>{const prev=P[(i+P.length-1)%P.length],next=P[(i+1)%P.length];
page(`projeto-${p.slug}.html`,"projetos",`${p.nome} — ${D.marca}`,p.desc,`
<section class="pj-hero"><div class="wrap pj-in">
  <div><p class="crumb mono">${crumb('<a href="projetos.html">Projetos</a>',`<b>${esc(p.nome)}</b>`)}</p><p class="cat mono">${esc(p.cat)}</p><h1>${esc(p.nome)}</h1><p class="lead">${esc(p.desc)}</p></div>
  <div class="vp dscope" role="group" aria-label="Prévia do visualizador do projeto">
    <div data-scene="${p.cena}" data-d style="--d:-10;--f:0;position:absolute;inset:-4%"></div>
    <span class="vlabel mono">Visualizador 3D (prévia)</span>
    ${p.pontos.map(h=>`<button class="hot" type="button" style="left:${h[0]}%;top:${h[1]}%" aria-label="${esc(h[2])}"><span class="tip"><b>${esc(h[2])}</b>${esc(h[3])}</span></button>`).join("")}
    <span class="vhint mono">Passe o mouse nos pontos. Aqui entrará o modelo 3D.</span>
  </div>
</div></section>
<section class="sec lt" aria-label="Detalhes do projeto"><div class="wrap pj-body">
  <div><p class="big" style="max-width:26ch">${esc(p.detalhe)}.</p><p class="muted" style="margin-top:20px">${esc(p.desc)}</p></div>
  <dl class="tblock">${p.ficha.map(f=>`<dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd>`).join("")}</dl>
</div></section>
<section style="background:var(--ink)">${pn(prev,next)}</section>
${stamp("Quer um projeto como este?","Conte o que precisa e a gente retorna com uma proposta.")}`)});

/* ---------- Contato ---------- */
const WA='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.4-4.2A8.5 8.5 0 1 1 8.3 18.7z"/><path d="M9 9.5c.4 2.2 2.3 4 4.5 4.5l1.2-1.2-1.8-.9-.8.8c-.9-.4-1.7-1.2-2.1-2.1l.8-.8-.9-1.8z" fill="currentColor" stroke="none"/></svg>';
page("contato.html","contato",`Contato — ${D.marca}`,"Solicite um orçamento pelo formulário ou pelo WhatsApp.",`
${phead(crumb("<b>Contato</b>"),"Solicite um orçamento","Descreva o que precisa. A gente retorna com os próximos passos.","CONT")}
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

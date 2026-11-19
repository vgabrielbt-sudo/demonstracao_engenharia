/* Desenhos gerados em SVG: cenas, hero com esquadro, efeitos dos projetos e cortes técnicos dos serviços.
   Quando houver fotografias ou o modelo 3D, estes desenhos são o que sai. */
(function(){
  const S="#0B0D0E", LN="#D5DEDE", EMB="#F27D3A";
  function lattice(x,y0,y1,w){let d=`M${x} ${y0}V${y1}M${x+w} ${y0}V${y1}`,s=w*1.25,up=true;for(let y=y1;y-s>=y0;y-=s){d+=`M${up?x:x+w} ${y}L${up?x+w:x} ${y-s}`;up=!up}return d}
  function zig(x0,x1,ya,yb,s){let d=`M${x0} ${ya}H${x1}M${x0} ${yb}H${x1}`,up=true;for(let x=x0;x+s<=x1;x+=s){d+=`M${x} ${up?ya:yb}L${x+s} ${up?yb:ya}`;up=!up}return d}
  function skyline(y,op,seed,xa,xb){let r=seed,out="",x=xa;const R=()=>(r=(r*9301+49297)%233280)/233280;while(x<xb){const w=24+R()*46,h=20+R()*90;out+=`<rect x="${x.toFixed(0)}" y="${(y-h).toFixed(0)}" width="${w.toFixed(0)}" height="${(h+120).toFixed(0)}"/>`;x+=w+4+R()*8}return `<g fill="#14100F" opacity="${op}">${out}</g>`}
  const st=w=>`fill="none" stroke="${S}" stroke-width="${w}" stroke-linecap="square"`;
  const sky=(id,c1,c2,c3,gx,gy,W,H)=>`<defs><linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset=".6" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient><radialGradient id="h${id}" cx="${gx}" cy="${gy}" r=".6"><stop offset="0" stop-color="#F27D3A" stop-opacity=".9"/><stop offset="1" stop-color="#F27D3A" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#g${id})"/><rect width="${W}" height="${H}" fill="url(#h${id})"/>`;

  /* ---------- cenas ---------- */
  function scene(kind,id){
    let b="";
    if(kind==="crane"||kind==="crane2"){
      b=sky(id,"#15181B","#4A2B1E","#C9561B",.62,.78,800,600)+skyline(470,.55,7,-10,820)+`<rect y="520" width="800" height="80" fill="${S}"/>`;
      let fr="";for(let x=70;x<=310;x+=60)fr+=`M${x} 520V290`;for(const y of[290,350,410,470])fr+=`M70 ${y}H310`;
      b+=`<path d="${fr}" ${st(5)}/><path d="M70 470L130 410M190 410L250 350M130 350L70 290" ${st(2.5)}/>`;
      b+=`<path d="${lattice(540,80,520,24)}" ${st(2.6)}/><path d="${zig(130,564,92,110,26)}" ${st(2.4)}/><path d="${zig(564,700,92,110,22)}" ${st(2.4)}/>`;
      b+=`<path d="M552 80V34M552 34L180 92M552 34L700 92M552 34L420 92" ${st(1.6)}/><rect x="656" y="108" width="44" height="30" fill="${S}"/>`;
      if(kind==="crane")b+=`<path d="M250 110V232" ${st(1.8)}/><rect x="242" y="232" width="16" height="14" fill="${S}"/><path d="M196 252H304" ${st(6)}/>`;
      b+=`<circle cx="310" cy="290" r="3" fill="#F27D3A"/><circle cx="70" cy="410" r="3" fill="#F27D3A"/><circle cx="190" cy="350" r="3" fill="#F27D3A"/>`;
    }else if(kind==="frame"){
      b=sky(id,"#0F1A1A","#33322B","#B8541C",.3,.86,800,600)+skyline(480,.45,3,-10,820)+`<rect y="510" width="800" height="90" fill="${S}"/>`;
      let fr="";for(let i=0;i<=6;i++){const x=100+i*90;fr+=`M${x} 510V${i<=3?170:260}`}for(const y of[430,350,270])fr+=`M100 ${y}H640`;fr+=`M100 190H370`;
      b+=`<path d="${fr}" ${st(6)}/>`;
      b+=`<path d="M100 510L190 430M190 510L100 430M100 430L190 350M190 430L100 350M460 430L550 350M550 430L460 350M370 350L460 270M460 350L370 270" ${st(2.6)}/>`;
      b+=`<path d="M640 270V150M640 150H700M670 150V510" ${st(2)}/><circle cx="190" cy="350" r="3" fill="#F27D3A"/><circle cx="460" cy="430" r="3" fill="#F27D3A"/>`;
    }else if(kind==="bridge"){
      b=sky(id,"#101719","#3C3A33","#D0601E",.5,.62,800,600)+`<rect y="448" width="800" height="152" fill="#0D1213"/>`;
      let w="";for(let y=462;y<600;y+=16)w+=`M0 ${y}H800`;
      b+=`<path d="${w}" stroke="#F27D3A" stroke-opacity=".12" stroke-width="2" fill="none"/>`;
      b+=`<path d="M0 392H800" ${st(10)}/><rect x="196" y="396" width="26" height="150" fill="${S}"/><rect x="578" y="396" width="26" height="150" fill="${S}"/><rect x="380" y="396" width="40" height="150" fill="${S}"/>`;
      b+=`<path d="M380 392L392 120M420 392L408 120M388 240H412M384 320H416" ${st(7)}/>`;
      let ss="";for(let x=80;x<=720;x+=48){if(Math.abs(x-400)<30)continue;ss+=`M400 132L${x} 390`}b+=`<path d="${ss}" ${st(1.6)}/>`;
    }else if(kind==="plant"){
      b=sky(id,"#171413","#4C2A1B","#D66A22",.84,.3,800,600)+`<rect y="520" width="800" height="80" fill="${S}"/>`;
      for(const[x,hh]of[[90,200],[180,240],[270,180]])b+=`<rect x="${x}" y="${520-hh}" width="70" height="${hh}" fill="${S}"/><ellipse cx="${x+35}" cy="${520-hh}" rx="35" ry="9" fill="${S}"/><path d="M${x+8} ${520-hh-6}L${x+62} ${520-hh-6}" stroke="#2A2D2F" stroke-width="2"/>`;
      b+=`<rect x="360" y="430" width="150" height="90" fill="${S}"/><ellipse cx="435" cy="430" rx="75" ry="14" fill="${S}"/>`;
      let pr="M540 420H760M540 444H760";for(let x=550;x<=750;x+=50)pr+=`M${x} 420V520`;b+=`<path d="${pr}" ${st(5)}/>`;
      b+=`<rect x="700" y="170" width="16" height="350" fill="${S}"/><path d="M708 170V140" ${st(3)}/><ellipse cx="708" cy="128" rx="9" ry="18" fill="#F27D3A"/><ellipse cx="708" cy="132" rx="4" ry="9" fill="#FFD3A6"/>`;
    }else{ /* plan: prancha técnica */
      b=`<rect width="800" height="600" fill="#12201E"/>`;
      let gr="";for(let x=0;x<=800;x+=40)gr+=`M${x} 0V600`;for(let y=0;y<=600;y+=40)gr+=`M0 ${y}H800`;
      b+=`<path d="${gr}" stroke="#fff" stroke-opacity=".06" fill="none"/>`;
      b+=`<g fill="none" stroke="#D5DEDE" stroke-width="4"><rect x="150" y="130" width="500" height="310"/><path d="M150 290H420M420 130V440M420 330H650M530 330V440" stroke-width="3"/></g>`;
      b+=`<g fill="none" stroke="#9AA5A7" stroke-width="1.5"><path d="M200 290a35 35 0 0135 35M470 440a35 35 0 01-35-35"/></g>`;
      b+=`<g stroke="#F27D3A" stroke-width="1.6" fill="none"><path d="M150 98H650M150 90V106M650 90V106M118 130V440M110 130H126M110 440H126"/></g>`;
      b+=`<g font-family="IBM Plex Mono,monospace" font-size="13" fill="#C9D3D3"><text x="365" y="90">00,00 m</text><text x="78" y="290" transform="rotate(-90 78 290)">00,00 m</text><text x="250" y="220">SALA</text><text x="500" y="220">ÁREA TÉCNICA</text><text x="460" y="395">WC</text></g>`;
    }
    return `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${b}</svg>`;
  }

  /* ---------- hero: esquadro, folha de desenho e guindaste inteiro ---------- */
  function hero(){
    let fr="";for(const x of[360,410,460,510,560])fr+=`M${x} 560V${x<=510?320:380}`;
    for(const y of[380,440,500])fr+=`M360 ${y}H560`;fr+=`M360 320H510`;
    fr+=`M360 500L410 440M410 500L360 440M510 440L560 380M560 440L510 380`;
    const sq=`<svg viewBox="0 0 640 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      ${sky("hero","#14171A","#4A2B1E","#C9561B",.7,.7,640,640)}
      <g data-d style="--d:8;--f:.04">${skyline(500,.55,11,-60,720)}</g>
      <g data-d style="--d:16;--f:.08"><path d="${fr}" ${st(5)}/><circle cx="410" cy="380" r="3" fill="#F27D3A"/><circle cx="510" cy="440" r="3" fill="#F27D3A"/><circle cx="360" cy="440" r="3" fill="#F27D3A"/></g>
    </svg>`;
    let tk="";for(let i=0;i<=40;i++){const x=600-i*14,l=i%10===0?24:i%5===0?16:8;tk+=`M${x} 560V${560-l}`}
    for(let i=0;i<=40;i++){const y=560-i*13,l=i%10===0?24:i%5===0?16:8;tk+=`M600 ${y}H${600-l}`}
    const lines=`<svg viewBox="0 0 640 640" overflow="visible" aria-hidden="true">
      <path d="M40 560H600V40Z" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="2"/>
      <path d="M600 54L54 560" stroke="#fff" stroke-opacity=".3" stroke-width="1"/>
      <path d="${tk}" stroke="#fff" stroke-opacity=".7" stroke-width="1.2" fill="none"/>
      <path d="M220 490H520V212Z" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.5"/>
      <path d="M582 560V542H600" fill="none" stroke="${EMB}" stroke-width="2"/>
    </svg>`;
    /* guindaste em coordenadas do esquadro; sai pelo topo e pela base */
    let c=`<path d="${lattice(198,-96,632,24)}" ${st(2.6)}/>`;
    c+=`<path d="${zig(222,620,-60,-40,24)}" ${st(2.4)}/><path d="${zig(80,198,-60,-40,20)}" ${st(2.4)}/>`;
    c+=`<path d="M210 -96V-142M210 -142L620 -60M210 -142L420 -60M210 -142L80 -60" ${st(1.6)}/>`;
    c+=`<rect x="226" y="-36" width="32" height="26" fill="${S}"/><rect x="80" y="-36" width="40" height="34" fill="${S}"/>`;
    c+=`<path d="M470 -40V252" ${st(1.8)}/><rect x="462" y="-46" width="16" height="10" fill="${S}"/><rect x="462" y="252" width="16" height="14" fill="${S}"/><path d="M424 278H516" ${st(6)}/>`;
    c+=`<rect x="170" y="632" width="80" height="8" fill="${S}"/><path d="M170 640L150 640M250 640L272 640" ${st(3)}/><circle cx="620" cy="-50" r="5" fill="#F27D3A"/>`;
    const crane=`<svg viewBox="0 0 800 1000" overflow="visible" aria-hidden="true"><g transform="translate(80 192)">${c}</g></svg>`;
    let gh="M0 1H1000";for(let x=10;x<1000;x+=16)gh+=`M${x} 1L${x-8} 11`;
    const ground=`<svg viewBox="0 0 1000 12" preserveAspectRatio="none" aria-hidden="true"><path d="${gh}" stroke="#fff" stroke-opacity=".4" stroke-width="1.2" fill="none" vector-effect="non-scaling-stroke"/></svg>`;
    return {sq,lines,crane,ground};
  }

  /* ---------- efeitos sobre as obras (mesmo sistema de coordenadas das cenas, 800x600) ---------- */
  const P=(d,i)=>`<path d="${d}" pathLength="100" class="dr" style="--i:${i}"/>`;
  function fx(kind){
    let b="";
    if(kind==="frame"){
      b=P("M100 140H640M100 126V154M640 126V154",0)+P("M706 170V510M692 170H720M692 510H720",1)+P("M52 270h16l-8 12z",2)+P("M52 350h16l-8 12z",3)+P("M52 430h16l-8 12z",4)+P("M100 100V510M190 100V430M280 100V430",5);
    }else if(kind==="bridge"){
      let i=0;for(let x=80;x<=720;x+=48){if(Math.abs(x-400)<30)continue;b+=P(`M400 132L${x} 390`,i++*.5)}
      b+=P("M209 470H591M209 458V482M591 458V482",7);
    }else if(kind==="plant"){
      const d="M125 314V250M215 274V250M305 334V250M125 250H435V424M510 475H530V432H760";
      b=P(d,0)+`<path d="${d}" class="fl"/>`+P("M425 330l20 20v-20l-20 20z",4);
    }else if(kind==="crane2"){
      b=`<path d="M250 110V420" class="gd"/>`+P("M340 232V352M330 232H350M330 352H350",1)+
        `<path class="cb" d="M250 110V232"/><g class="ld"><rect x="242" y="232" width="16" height="14" fill="${EMB}"/><path d="M196 252H304" stroke="${EMB}" stroke-width="6" fill="none"/></g>`;
    }
    return `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${b}</svg>`;
  }

  /* ---------- cortes técnicos (serviços) ---------- */
  const DEFS=`<defs>
    <pattern id="p-steel" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#26302F"/><line x1="0" y1="0" x2="0" y2="8" stroke="#8D9A9B" stroke-width="1.4"/></pattern>
    <pattern id="p-conc" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#1E2827"/><circle cx="3" cy="4" r="1" fill="#7A8786"/><circle cx="11" cy="10" r="1.2" fill="#7A8786"/><path d="M8 2l3 4H5z" fill="none" stroke="#6C7A79" stroke-width=".8"/><circle cx="13" cy="3" r=".7" fill="#7A8786"/></pattern>
    <pattern id="p-insul" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#2A2420"/><path d="M0 6L3 1L6 11L9 1L12 6" fill="none" stroke="#C9A27A" stroke-width="1"/></pattern>
    <pattern id="p-soil" width="18" height="10" patternUnits="userSpaceOnUse"><rect width="18" height="10" fill="#1A1714"/><path d="M1 3H8M10 8H17" stroke="#6F6254" stroke-width="1.2"/></pattern>
    <pattern id="p-grout" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#2D2A1F"/><circle cx="2" cy="2" r=".8" fill="#B09B62"/></pattern>
    <pattern id="p-fluid" width="14" height="8" patternUnits="userSpaceOnUse"><rect width="14" height="8" fill="#10272B"/><path d="M0 4Q3.500 0 7 4T14 4" fill="none" stroke="#3F9AA8" stroke-width="1"/></pattern>
  </defs>`;
  const R=(x,y,w,h,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="${LN}" stroke-width="1.5"/>`;
  const cota=d=>`<path d="${d}" stroke="${EMB}" stroke-width="1.5" fill="none"/>`;
  const eixo=d=>`<path d="${d}" stroke="${EMB}" stroke-width="1" stroke-dasharray="14 4 3 4" fill="none"/>`;
  const wrap=(inner,label)=>`<svg class="cs" viewBox="0 0 800 520" role="img" aria-label="Corte técnico: ${label}">${DEFS}${inner}<g font-family="IBM Plex Mono,monospace" font-size="13" fill="${EMB}" letter-spacing="2"><text x="24" y="36">CORTE A-A</text></g></svg>`;
  const ly=(id,inner)=>`<g class="ly" data-ly="${id}">${inner}</g>`;
  const CORTES=[
    ()=>wrap(
      `<rect x="0" y="500" width="800" height="20" fill="url(#p-soil)"/>`+
      ly("base",R(270,446,260,54,"url(#p-conc)")+`<path d="M320 446V484M480 446V484" stroke="${LN}" stroke-width="3"/>`)+
      ly("suporte",R(332,330,136,16,"url(#p-steel)")+R(250,346,300,14,"url(#p-steel)")+R(392,360,16,72,"url(#p-steel)")+R(250,432,300,14,"url(#p-steel)"))+
      ly("isolamento",`<circle cx="400" cy="205" r="122" fill="url(#p-insul)" stroke="${LN}" stroke-width="1.5"/>`)+
      ly("jaqueta",`<circle cx="400" cy="205" r="125" fill="none" stroke="#B7C2C4" stroke-width="7"/>`)+
      ly("tubo",`<circle cx="400" cy="205" r="78" fill="url(#p-steel)" stroke="${LN}" stroke-width="1.5"/>`)+
      ly("fluido",`<circle cx="400" cy="205" r="62" fill="url(#p-fluid)" stroke="${LN}" stroke-width="1.5"/>`)+
      eixo("M400 60V335M232 205H568")+cota("M272 52H528M272 42V62M528 42V62"),"tubulação isolada sobre suporte"),
    ()=>wrap(
      `<rect x="0" y="500" width="800" height="20" fill="url(#p-soil)"/>`+
      ly("bloco",R(220,404,360,80,"url(#p-conc)")+R(200,484,400,16,"url(#p-conc)"))+
      ly("graute",R(300,396,200,8,"url(#p-grout)"))+
      ly("chapa",R(296,380,208,16,"url(#p-steel)")+`<path d="M316 340V470M484 340V470" stroke="${LN}" stroke-width="3"/>`+R(308,368,16,12,"#AEB8BA")+R(476,368,16,12,"#AEB8BA"))+
      ly("perfil",R(372,70,56,310,"url(#p-steel)")+R(428,130,292,40,"url(#p-steel)")+`<path d="M372 130H428M372 170H428" stroke="${LN}" stroke-width="1.5"/>`)+
      ly("ligacao",R(428,124,10,52,"#8D9A9B")+[[452,142],[452,158],[484,142],[484,158]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#CFD8D9" stroke="${S}" stroke-width="1.5"/>`).join(""))+
      ly("pintura",`<path d="M366 64H434V120H724V180H434V386H366Z" fill="none" stroke="${EMB}" stroke-width="2"/>`)+
      cota("M336 70V380M326 70H346M326 380H346"),"ligação de viga com pilar e base"),
    ()=>wrap(
      ly("solo",`<rect x="0" y="330" width="800" height="190" fill="url(#p-soil)"/><path d="M0 330H350M450 330H800" stroke="#9AA5A7" stroke-width="1.5" stroke-dasharray="10 5" fill="none"/><path d="M700 330l-9-14h18z" fill="none" stroke="#9AA5A7" stroke-width="1.5"/>`)+
      ly("lastro",R(230,456,340,12,"url(#p-conc)"))+
      ly("sapata",`<polygon points="240,456 560,456 560,420 450,390 350,390 240,420" fill="url(#p-conc)" stroke="${LN}" stroke-width="1.5"/>`)+
      ly("pilar",R(350,60,100,330,"url(#p-conc)"))+
      ly("armadura",`<path d="M364 90V444M382 90V444M418 90V444M436 90V444" stroke="#D9A15C" stroke-width="3" fill="none"/><path d="${[110,150,190,230,270,310,350].map(y=>`M358 ${y}H442`).join("")}" stroke="#B88A4E" stroke-width="1.5" fill="none"/><path d="M252 444H548M252 444V424M548 444V424" stroke="#D9A15C" stroke-width="3" fill="none"/>`)+
      cota("M240 494H560M240 484V504M560 484V504"),"sapata e pilar de concreto armado"),
    ()=>wrap(
      `<rect x="0" y="470" width="800" height="50" fill="url(#p-soil)"/>`+
      ly("fundacao",R(180,400,440,70,"url(#p-conc)"))+
      ly("graute",R(200,392,400,8,"url(#p-grout)"))+
      ly("chumbadores",`<path d="M230 360V450M570 360V450" stroke="${LN}" stroke-width="3"/>`+R(222,354,16,8,"#AEB8BA")+R(562,354,16,8,"#AEB8BA"))+
      ly("skid",R(210,368,380,24,"url(#p-steel)"))+
      ly("equipamento",R(290,356,60,12,"#3A4647")+R(236,304,44,28,"#3A4647")+R(230,296,8,44,"#8D9A9B")+R(306,228,28,44,"#3A4647")+R(298,220,44,8,"#8D9A9B")+`<circle cx="320" cy="318" r="48" fill="#3A4647" stroke="${LN}" stroke-width="1.5"/>`+R(368,306,24,24,"#8D9A9B")+R(392,276,150,92,"#2F393B")+`<path d="${[410,426,442,458,474,490,506,522].map(x=>`M${x} 284V360`).join("")}" stroke="#556264" stroke-width="1.5"/>`+R(440,256,50,20,"#3A4647"))+
      eixo("M222 318H566"),"bomba e motor montados sobre base"),
  ];
  window.Scenes={scene,hero,fx};
  window.Cortes={count:CORTES.length,get:i=>CORTES[i]()};
})();

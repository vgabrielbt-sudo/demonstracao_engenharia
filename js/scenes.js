/* Ilustrações demonstrativas geradas em SVG. Substitua por fotografias ou pelo modelo 3D quando existirem. */
(function(){
  function lattice(x,y0,y1,w){let d=`M${x} ${y0}V${y1}M${x+w} ${y0}V${y1}`,s=w*1.25,up=true;for(let y=y1;y-s>=y0;y-=s){d+=`M${up?x:x+w} ${y}L${up?x+w:x} ${y-s}`;up=!up}return d}
  function zig(x0,x1,ya,yb,s){let d=`M${x0} ${ya}H${x1}M${x0} ${yb}H${x1}`,up=true;for(let x=x0;x+s<=x1;x+=s){d+=`M${x} ${up?ya:yb}L${x+s} ${up?yb:ya}`;up=!up}return d}
  function skyline(y,op,seed,xa,xb){let r=seed,out="",x=xa;const R=()=>(r=(r*9301+49297)%233280)/233280;while(x<xb){const w=24+R()*46,h=20+R()*90;out+=`<rect x="${x.toFixed(0)}" y="${(y-h).toFixed(0)}" width="${w.toFixed(0)}" height="${(h+120).toFixed(0)}"/>`;x+=w+4+R()*8}return `<g fill="#14100F" opacity="${op}">${out}</g>`}
  const S="#0B0D0E";
  const st=w=>`fill="none" stroke="${S}" stroke-width="${w}" stroke-linecap="square"`;
  const sky=(id,c1,c2,c3,gx,gy,W,H)=>`<defs><linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset=".6" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient><radialGradient id="h${id}" cx="${gx}" cy="${gy}" r=".6"><stop offset="0" stop-color="#F27D3A" stop-opacity=".9"/><stop offset="1" stop-color="#F27D3A" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#g${id})"/><rect width="${W}" height="${H}" fill="url(#h${id})"/>`;

  function scene(kind,id){
    let b="";
    if(kind==="crane"){
      b=sky(id,"#15181B","#4A2B1E","#C9561B",.62,.78,800,600)+skyline(470,.55,7,-10,820)+`<rect y="520" width="800" height="80" fill="${S}"/>`;
      let fr="";for(let x=70;x<=310;x+=60)fr+=`M${x} 520V290`;for(const y of[290,350,410,470])fr+=`M70 ${y}H310`;
      b+=`<path d="${fr}" ${st(5)}/><path d="M70 470L130 410M190 410L250 350M130 350L70 290" ${st(2.5)}/>`;
      b+=`<path d="${lattice(540,80,520,24)}" ${st(2.6)}/><path d="${zig(130,564,92,110,26)}" ${st(2.4)}/><path d="${zig(564,700,92,110,22)}" ${st(2.4)}/>`;
      b+=`<path d="M552 80V34M552 34L180 92M552 34L700 92M552 34L420 92" ${st(1.6)}/><rect x="656" y="108" width="44" height="30" fill="${S}"/>`;
      b+=`<path d="M250 110V232" ${st(1.8)}/><rect x="242" y="232" width="16" height="14" fill="${S}"/><path d="M196 252H304" ${st(6)}/>`;
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
    }else{
      b=`<rect width="800" height="600" fill="#12201E"/>`;
      let gr="";for(let x=0;x<=800;x+=40)gr+=`M${x} 0V600`;for(let y=0;y<=600;y+=40)gr+=`M0 ${y}H800`;
      b+=`<path d="${gr}" stroke="#fff" stroke-opacity=".06" fill="none"/>`;
      b+=`<g fill="none" stroke="#D5DEDE" stroke-width="4"><rect x="150" y="130" width="500" height="310"/><path d="M150 290H420M420 130V440M420 330H650M530 330V440" stroke-width="3"/></g>`;
      b+=`<g fill="none" stroke="#9AA5A7" stroke-width="1.5"><path d="M200 290a35 35 0 0135 35M470 440a35 35 0 01-35-35"/></g>`;
      b+=`<g stroke="#F27D3A" stroke-width="1.6" fill="none"><path d="M150 98H650M150 90V106M650 90V106M118 130V440M110 130H126M110 440H126"/></g>`;
      b+=`<g font-family="IBM Plex Mono,monospace" font-size="13" fill="#C9D3D3"><text x="365" y="90">00,00 m</text><text x="78" y="290" transform="rotate(-90 78 290)">00,00 m</text><text x="250" y="220">SALA</text><text x="500" y="220">ÁREA TÉCNICA</text><text x="460" y="395">WC</text></g>`;
      b+=`<g fill="none" stroke="#9AA5A7"><rect x="500" y="498" width="270" height="74"/><path d="M500 522H770M640 498V572"/></g><g font-family="IBM Plex Mono,monospace" font-size="11" fill="#C9D3D3"><text x="510" y="515">PRANCHA 01/06</text><text x="510" y="545">ESC 1:50</text><text x="650" y="515">REV A</text><text x="650" y="545">DATA</text></g>`;
    }
    return `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${b}</svg>`;
  }

  /* Hero em camadas: fundo, horizonte e estrutura dentro do disco; guindaste em outra camada, que rompe a borda do círculo. */
  function hero(){
    const disc=`<svg viewBox="0 0 640 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      ${sky("hero","#14171A","#4A2B1E","#C9561B",.6,.8,640,640)}
      <g data-d style="--d:8;--f:.04">${skyline(520,.55,11,-60,720)}</g>
      <g data-d style="--d:18;--f:.09">${(()=>{let fr="";for(let x=40;x<=280;x+=60)fr+=`M${x} 580V270`;for(const y of[270,340,410,480])fr+=`M40 ${y}H280`;
        return `<path d="${fr}" ${st(5)}/><path d="M40 480L100 410M160 410L220 340M100 340L40 270" ${st(2.5)}/><circle cx="160" cy="340" r="3" fill="#F27D3A"/><circle cx="40" cy="410" r="3" fill="#F27D3A"/>`})()}</g>
      <rect y="560" width="640" height="80" fill="${S}"/>
    </svg>`;
    const mx=330, jx=354;
    let c=`<path d="${lattice(mx,-150,560,24)}" ${st(2.6)}/>`;
    c+=`<path d="${zig(jx,700,-96,-78,26)}" ${st(2.4)}/><path d="${zig(206,mx,-96,-78,22)}" ${st(2.4)}/>`;
    c+=`<path d="M342 -150V-186M342 -186L520 -96M342 -186L660 -96M342 -186L206 -96" ${st(1.6)}/><rect x="206" y="-76" width="42" height="30" fill="${S}"/>`;
    c+=`<path d="M520 -78V210" ${st(1.8)}/><rect x="512" y="210" width="16" height="14" fill="${S}"/><path d="M458 232H582" ${st(6)}/>`;
    c+=`<circle cx="700" cy="-87" r="6" fill="#F27D3A"/>`;
    const crane=`<svg viewBox="0 0 800 800" aria-hidden="true"><g transform="translate(20 192)">${c}</g></svg>`;
    return {disc,crane};
  }
  window.Scenes={scene,hero};
})();

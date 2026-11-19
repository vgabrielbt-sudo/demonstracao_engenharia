/* Conteúdo de demonstração (engenharia industrial e civil). Normas e materiais são referências reais usadas como exemplo;
   troque pelos dados da empresa e rode `node tools/build.js` para regerar as páginas. */
window.SITE={
  dados:{
    marca:"Empresa Exemplo",
    registro:"CNPJ 00.000.000/0000-00",
    telefone:"(00) 0000-0000",
    whatsappTxt:"(00) 00000-0000",
    whatsapp:"5500000000000",
    email:"contato@exemplo.com.br",
    endereco:"Endereço da empresa, Cidade/UF",
    horario:"Segunda a sexta, horário comercial"
  },
  servicos:[
    {slug:"tubulacao",nome:"Tubulação industrial",resumo:"Linhas de processo, utilidades e suportes.",
     desc:"Projeto e montagem de linhas para água, vapor, ar e produtos químicos. O corte ao lado mostra o que há dentro de uma linha isolada e apoiada no rack.",
     ref:"ASME B31.3 · tubulação de processo",
     camadas:[
      ["fluido","Fluido de processo","Água, vapor ou produto, conforme o projeto","Define pressão, temperatura e o material do tubo."],
      ["tubo","Tubo de aço carbono","ASTM A106 Gr. B, espessura conforme a pressão","Conduz o fluido e resiste à pressão interna."],
      ["isolamento","Isolamento térmico","Lã de rocha, espessura calculada","Reduz a perda de calor e protege contra queimadura."],
      ["jaqueta","Jaqueta metálica","Alumínio ou aço galvanizado","Protege o isolamento de chuva e impacto."],
      ["suporte","Suporte e sapata","Perfil laminado em aço ASTM A36","Sustenta o peso do tubo e deixa a linha dilatar."],
      ["base","Base de concreto","Concreto armado com chumbadores","Leva a carga do suporte até o solo."]]},
    {slug:"estruturas",nome:"Estruturas metálicas",resumo:"Pórticos, galpões, racks e plataformas.",
     desc:"Fabricação e montagem de estruturas em aço. O corte mostra a ligação de uma viga com o pilar e como o pilar se apoia na fundação.",
     ref:"ABNT NBR 8800 · estruturas de aço",
     camadas:[
      ["perfil","Pilar e viga","Perfil laminado ou soldado, aço ASTM A572 Gr. 50","Resistem às cargas verticais e ao vento."],
      ["ligacao","Ligação parafusada","Parafusos de alta resistência ASTM A325","Une viga e pilar sem solda em campo."],
      ["chapa","Chapa de base e chumbadores","Aço ASTM A36, chumbadores roscados","Fixa o pilar na fundação."],
      ["graute","Graute","Argamassa cimentícia sem retração","Preenche o vão sob a chapa e distribui a carga."],
      ["bloco","Bloco de concreto","Concreto armado, resistência conforme projeto","Recebe a carga do pilar e leva ao solo."],
      ["pintura","Proteção anticorrosiva","Fundo epóxi e acabamento poliuretano","Protege o aço contra a corrosão."]]},
    {slug:"fundacoes",nome:"Fundações e concreto",resumo:"Sapatas, blocos, pisos e estruturas de concreto.",
     desc:"Execução de fundações e peças de concreto armado. O corte mostra o caminho da carga, do pilar até o solo.",
     ref:"ABNT NBR 6118 · estruturas de concreto",
     camadas:[
      ["pilar","Pilar","Concreto armado","Recebe as cargas da estrutura."],
      ["armadura","Armadura","Aço CA-50 nas barras, CA-60 nos estribos","Resiste à tração, que o concreto sozinho não suporta."],
      ["sapata","Sapata","Concreto estrutural, resistência conforme projeto","Espalha a carga numa área maior do solo."],
      ["lastro","Lastro de concreto magro","Concreto simples, cerca de 5 cm","Regulariza o fundo e afasta o aço do solo."],
      ["solo","Solo de apoio","Camada compactada, capacidade definida em sondagem","Recebe a carga final da edificação."]]},
    {slug:"montagem",nome:"Montagem industrial",resumo:"Equipamentos, alinhamento e manutenção.",
     desc:"Instalação e alinhamento de equipamentos rotativos. O corte mostra um conjunto bomba e motor montado sobre base metálica.",
     ref:"Boas práticas de montagem eletromecânica",
     camadas:[
      ["equipamento","Bomba e motor","Bomba centrífuga com acionamento elétrico","Exemplo de equipamento montado e alinhado em campo."],
      ["skid","Base metálica (skid)","Perfis de aço soldados","Mantém bomba e motor alinhados."],
      ["graute","Graute epóxi","Resina epóxi de alta resistência","Fixa a base e absorve vibração."],
      ["chumbadores","Chumbadores","Barras roscadas em aço","Prendem a base à fundação."],
      ["fundacao","Fundação","Bloco de concreto armado","Isola a vibração e sustenta o conjunto."]]}
  ],
  projetos:[
    {slug:"edificio",cena:"frame",cat:"Edificação",nome:"Edifício em estrutura mista",
     desc:"Pilares de aço preenchidos com concreto e vigas metálicas, que permitem vãos maiores e uma obra mais rápida. Lajes em steel deck.",
     ficha:[["Sistema","Pilares mistos e vigas de aço"],["Lajes","Steel deck com concreto"],["Fundação","Sapatas e blocos"],["Referência","ABNT NBR 8800"]],
     detalhe:"Montagem a seco da estrutura",
     pontos:[[24,66,"Pilar misto","Perfil de aço preenchido com concreto."],[50,58,"Viga metálica","Apoia a laje e vence o vão."],[17,80,"Contraventamento","Diagonais que seguram a estrutura contra o vento."]]},
    {slug:"ponte",cena:"bridge",cat:"Infraestrutura",nome:"Ponte estaiada",
     desc:"Tabuleiro sustentado por cabos de aço ligados a um mastro central. O peso é levado do tabuleiro ao mastro e dele às fundações.",
     ficha:[["Sistema","Tabuleiro estaiado"],["Cabos","Aço de alta resistência"],["Fundação","Estacas e blocos"],["Referência","ABNT NBR 7188"]],
     detalhe:"Cabos que tensionam em sequência",
     pontos:[[51,36,"Mastro","Recebe a força de todos os cabos."],[70,51,"Estai","Cabo de aço que sustenta o tabuleiro."],[24,80,"Pilar de apoio","Leva a carga do tabuleiro à fundação."]]},
    {slug:"planta",cena:"plant",cat:"Industrial",nome:"Planta de processo",
     desc:"Vasos, tanques e uma rede de tubulação sobre rack. O desenho organiza os caminhos do fluido e os acessos para manutenção.",
     ficha:[["Tubulação","Aço carbono e inox"],["Equipamentos","Vasos e tanques"],["Suportes","Rack de perfis laminados"],["Referência","ASME B31.3"]],
     detalhe:"Fluxo percorrendo a tubulação",
     pontos:[[27,50,"Vaso","Armazena ou processa o produto."],[88,72,"Rack de tubulação","Estrutura que sustenta as linhas em altura."],[54,78,"Tanque","Armazenamento de produto em baixa pressão."]]},
    {slug:"montagem",cena:"crane",cat:"Montagem",nome:"Obra em montagem",
     desc:"Pórticos de aço sendo içados e posicionados por guindaste de torre. O plano de içamento define a sequência de cada peça.",
     ficha:[["Içamento","Guindaste de torre"],["Estrutura","Pórticos de aço"],["Fundação","Blocos e chumbadores"],["Referência","ABNT NBR 8800"]],
     detalhe:"Içamento e posicionamento da peça",
     pontos:[[69,50,"Torre do guindaste","Treliça que sustenta a lança."],[31,40,"Carga içada","Peça posicionada com cabos e moitão."],[16,70,"Estrutura em montagem","Pórtico ainda sem fechamento."]]}
  ],
  processo:[
    ["Conversa inicial","Entendimento do que o cliente precisa e do local da obra."],
    ["Levantamento","Visita técnica e coleta das informações necessárias."],
    ["Projeto","Desenvolvimento e validação das soluções técnicas."],
    ["Execução","Acompanhamento técnico durante a obra."],
    ["Entrega","Conferência final e entrega da documentação."]
  ],
  diferenciais:[
    ["Qualidade técnica","Cálculo e especificação revisados antes de ir para a obra."],
    ["Planejamento e organização","Escopo, prazo e custo combinados por escrito."],
    ["Atendimento personalizado","Quem conversa com você conhece o seu projeto."],
    ["Compromisso com prazos","Datas acompanhadas durante a execução."],
    ["Segurança e responsabilidade","Normas aplicáveis e documentação de responsabilidade técnica."]
  ]
};

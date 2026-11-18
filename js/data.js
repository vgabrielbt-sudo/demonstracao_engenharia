/* Conteúdo de demonstração. Troque os textos pelos dados reais da empresa e rode `node tools/build.js` para regerar as páginas. */
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
    {id:1,nome:"Serviço 1",resumo:"Descrição curta do serviço.",cena:"crane",
     desc:"Texto demonstrativo sobre o primeiro serviço. Aqui entra a explicação real do que é feito, em que tipo de obra se aplica e o que o cliente recebe.",
     inclui:[["Item 1","Descrição curta do que está incluso neste item do serviço."],["Item 2","Descrição curta do que está incluso neste item do serviço."],["Item 3","Descrição curta do que está incluso neste item do serviço."]],
     para:"Perfil de cliente atendido por este serviço."},
    {id:2,nome:"Serviço 2",resumo:"Descrição curta do serviço.",cena:"frame",
     desc:"Texto demonstrativo sobre o segundo serviço. Aqui entra a explicação real do que é feito, em que tipo de obra se aplica e o que o cliente recebe.",
     inclui:[["Item 1","Descrição curta do que está incluso neste item do serviço."],["Item 2","Descrição curta do que está incluso neste item do serviço."],["Item 3","Descrição curta do que está incluso neste item do serviço."]],
     para:"Perfil de cliente atendido por este serviço."},
    {id:3,nome:"Serviço 3",resumo:"Descrição curta do serviço.",cena:"bridge",
     desc:"Texto demonstrativo sobre o terceiro serviço. Aqui entra a explicação real do que é feito, em que tipo de obra se aplica e o que o cliente recebe.",
     inclui:[["Item 1","Descrição curta do que está incluso neste item do serviço."],["Item 2","Descrição curta do que está incluso neste item do serviço."],["Item 3","Descrição curta do que está incluso neste item do serviço."]],
     para:"Perfil de cliente atendido por este serviço."},
    {id:4,nome:"Serviço 4",resumo:"Descrição curta do serviço.",cena:"plant",
     desc:"Texto demonstrativo sobre o quarto serviço. Aqui entra a explicação real do que é feito, em que tipo de obra se aplica e o que o cliente recebe.",
     inclui:[["Item 1","Descrição curta do que está incluso neste item do serviço."],["Item 2","Descrição curta do que está incluso neste item do serviço."],["Item 3","Descrição curta do que está incluso neste item do serviço."]],
     para:"Perfil de cliente atendido por este serviço."}
  ],
  projetos:[
    {id:1,cena:"frame",cat:"Categoria do projeto",nome:"Projeto 1",desc:"Descrição demonstrativa do primeiro projeto. Aqui entram o desafio técnico, a solução adotada e o resultado entregue.",
     ficha:[["Local","Cidade / UF"],["Área","00 m²"],["Ano","0000"],["Escopo","Etapas executadas"]],
     pontos:[[26,70,"Componente A","Descrição demonstrativa do componente."],[52,44,"Componente B","Descrição demonstrativa do componente."],[78,66,"Componente C","Descrição demonstrativa do componente."]]},
    {id:2,cena:"bridge",cat:"Categoria do projeto",nome:"Projeto 2",desc:"Descrição demonstrativa do segundo projeto. Aqui entram o desafio técnico, a solução adotada e o resultado entregue.",
     ficha:[["Local","Cidade / UF"],["Extensão","00 m"],["Ano","0000"],["Escopo","Etapas executadas"]],
     pontos:[[22,64,"Componente A","Descrição demonstrativa do componente."],[50,32,"Componente B","Descrição demonstrativa do componente."],[76,64,"Componente C","Descrição demonstrativa do componente."]]},
    {id:3,cena:"plant",cat:"Categoria do projeto",nome:"Projeto 3",desc:"Descrição demonstrativa do terceiro projeto. Aqui entram o desafio técnico, a solução adotada e o resultado entregue.",
     ficha:[["Local","Cidade / UF"],["Área","00 m²"],["Ano","0000"],["Escopo","Etapas executadas"]],
     pontos:[[24,52,"Componente A","Descrição demonstrativa do componente."],[54,72,"Componente B","Descrição demonstrativa do componente."],[88,48,"Componente C","Descrição demonstrativa do componente."]]},
    {id:4,cena:"crane",cat:"Categoria do projeto",nome:"Projeto 4",desc:"Descrição demonstrativa do quarto projeto. Aqui entram o desafio técnico, a solução adotada e o resultado entregue.",
     ficha:[["Local","Cidade / UF"],["Área","00 m²"],["Início","Mês / ano"],["Escopo","Etapas executadas"]],
     pontos:[[18,56,"Componente A","Descrição demonstrativa do componente."],[44,40,"Componente B","Descrição demonstrativa do componente."],[80,24,"Componente C","Descrição demonstrativa do componente."]]}
  ],
  processo:[
    ["Conversa inicial","Entendimento do que o cliente precisa e do local da obra."],
    ["Levantamento","Visita técnica e coleta das informações necessárias."],
    ["Projeto","Desenvolvimento e validação das soluções técnicas."],
    ["Execução","Acompanhamento técnico durante a obra."],
    ["Entrega","Conferência final e entrega da documentação."]
  ],
  diferenciais:[
    ["Qualidade técnica","Texto demonstrativo sobre qualidade técnica."],
    ["Planejamento e organização","Texto demonstrativo sobre planejamento e organização."],
    ["Atendimento personalizado","Texto demonstrativo sobre atendimento personalizado."],
    ["Compromisso com prazos","Texto demonstrativo sobre compromisso com prazos."],
    ["Segurança e responsabilidade","Texto demonstrativo sobre segurança e responsabilidade."]
  ]
};

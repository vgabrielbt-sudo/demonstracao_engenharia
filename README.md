# Demonstração Engenharia

Site de demonstração para uma empresa de engenharia industrial e civil. HTML, CSS e JavaScript puros, sem build de front-end.

## Estrutura

- `index.html` início, com hero em esquadro e as obras em composição irregular
- `sobre.html`, `servicos.html`, `projetos.html`, `contato.html`
- `projeto-<nome>.html` uma página por projeto, com pontos de interesse (reserva do modelo 3D)
- `js/data.js` todo o conteúdo editável (dados da empresa, serviços, camadas dos cortes, projetos)
- `js/scenes.js` desenhos em SVG (cenas, hero, efeitos das obras e cortes técnicos)
- `js/app.js` comportamento (profundidade, corte A-A, serviços, carrossel, formulário)
- `tools/build.js` gera as páginas HTML a partir de `js/data.js`

## Como editar

1. Troque os textos em `js/data.js` pelos dados reais (nome, contatos, serviços, projetos).
2. Rode `node tools/build.js` para regerar as páginas.
3. Troque o número de WhatsApp (`dados.whatsapp`, só dígitos, com 55 + DDD).
4. As normas e materiais dos cortes são exemplos de referência. Confira com o responsável técnico antes de publicar.

## Observações

- O formulário de orçamento não tem servidor: ele monta a mensagem e abre o WhatsApp, e a pessoa decide enviar.
- As imagens são ilustrações em SVG. Quando houver fotografias ou o modelo 3D, elas substituem as cenas.
- Fontes do Google Fonts (Archivo, IBM Plex Sans e IBM Plex Mono).

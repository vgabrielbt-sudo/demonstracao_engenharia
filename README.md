# Demonstração Engenharia

Site institucional de demonstração para uma empresa de engenharia. Arquivo único, sem build: HTML, CSS e JavaScript em `index.html`.

## Como usar

- Abra o `index.html` no navegador, ou publique a pasta na Vercel ou no GitHub Pages.
- Todo o conteúdo editável (nome, contatos, serviços, projetos e diferenciais) fica no objeto `SITE`, no começo do `<script>`.
- Os textos entre colchetes, como `[Nome do serviço 1]`, são provisórios e devem ser trocados pelos dados reais da empresa.
- Troque o número de WhatsApp (`SITE.dados.whatsapp`, só dígitos, com 55 + DDD) para o botão de atendimento funcionar.
- As imagens são ilustrações geradas em SVG. Para usar fotografias reais, substitua o conteúdo do disco do hero (`#heroDisc`) e dos cards de projeto.

## Observações

- O formulário de orçamento não tem servidor: ele monta a mensagem e abre o WhatsApp, e a pessoa decide enviar.
- Fontes carregadas do Google Fonts (Archivo, IBM Plex Sans e IBM Plex Mono).

# AprendeSmart — Site institucional

Site institucional da **AprendeSmart**, uma empresa criada por alunos do **Instituto Escola Jovens de Negócios**. A AprendeSmart é uma plataforma de acompanhamento semanal que ajuda estudantes do ensino médio a organizar e manter uma rotina de estudos usando os materiais da própria escola.

Desenvolvido por **CMK Cogit**.

> Este repositório contém **somente o site institucional**. A plataforma (área do aluno, painel da família etc.) ainda não foi desenvolvida e não faz parte deste escopo.

## Páginas

| Arquivo | Página | Conteúdo |
|---|---|---|
| `index.html` | Início | Hero, o problema (dados do diagnóstico), os 4 pilares, ciclo semanal, diferencial, público, bloco EJN, chamada final |
| `sobre.html` | Sobre | Origem no EJN, missão/visão/valores, diagnóstico com alunos, visão dos professores, mercado (TAM/SAM/SOM), equipe |
| `plataforma.html` | Plataforma | Os 4 pilares em detalhe, ciclo semanal, recursos, comparativo com outras soluções, planos previstos, custos |
| `contato.html` | Contato | Formulário de lista de interesse/contato, informações do projeto, perguntas frequentes |
| `404.html` | Erro | Página de "não encontrado" (fora do sitemap, `noindex`) |

## Estrutura

```
├── index.html
├── sobre.html
├── plataforma.html
├── contato.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── assets/
    ├── css/style.css     # todo o estilo (tokens de cor e fonte no :root)
    ├── js/main.js        # menu mobile, animações, formulário
    └── img/              # favicon, ícones e imagem de compartilhamento (OG)
```

HTML, CSS e JS puros: não precisa de build. Basta publicar a pasta em qualquer hospedagem estática.

## Identidade visual

Paleta e fontes tiradas da apresentação oficial (Modelo Canvas de Negócios):

| Token | Cor | Uso |
|---|---|---|
| `--azul` | `#3053A0` | cor principal, seções e títulos |
| `--amarelo` | `#FDAA23` | destaques, botões, detalhes |
| `--cinza` | `#DFDCD0` | fundo (papel quadriculado) |

- **Títulos:** [Ojuju](https://fonts.google.com/specimen/Ojuju)
- **Textos:** [Darker Grotesque](https://fonts.google.com/specimen/Darker+Grotesque)

As duas fontes vêm do Google Fonts. Para trocar alguma depois, altere `--fonte-titulo` / `--fonte-texto` em `assets/css/style.css` e o `<link>` de fontes nas páginas.

## SEO (básico, já configurado)

- `title` e `meta description` próprios em cada página, `lang="pt-BR"`, URL canônica
- Open Graph e Twitter Card com imagem `assets/img/og-aprendesmart.png` (1200×630)
- Dados estruturados (JSON-LD): `Organization`, `WebSite`, `AboutPage`, `Service` com ofertas, `ContactPage`, `FAQPage` e `BreadcrumbList`
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicons
- HTML semântico, um `h1` por página, link "pular para o conteúdo", foco visível e respeito a `prefers-reduced-motion`

Google Search Console **ainda não configurado**. Quando o projeto seguir, envie o `sitemap.xml` por lá.

## Antes de publicar: itens provisórios

1. **Domínio**: as URLs absolutas (canonical, OG, sitemap, robots, JSON-LD) usam `https://aprendesmart.cmkcogit.com.br`. Para trocar todas de uma vez:
   ```bash
   grep -rl "aprendesmart.cmkcogit.com.br" . | xargs sed -i 's#aprendesmart.cmkcogit.com.br#NOVO-DOMINIO#g'
   ```
2. **Link da CMK Cogit no rodapé**: aponta para `https://cmkcogit.com.br` em todas as páginas.
3. **Formulário de contato**: sem endpoint por enquanto. Para receber as mensagens, preencha `data-endpoint` no `<form id="form-contato">` em `contato.html` com a URL de um serviço como Formspree ou Getform (recebe POST em JSON).
4. **Planos e recursos**: aparecem como "previstos", porque a plataforma está em desenvolvimento.

# Zoo Agency — Arquitetura & Decisões de Design

> Landing page de divulgação da **Zoo Agency** (design gráfico para lives/streamers).
> Documento técnico do projeto: como ele é montado e *por quê* das principais escolhas.

---

## 1. Visão geral

É um **site estático de página única** (one-page) feito em **HTML + CSS + JavaScript puro**, sem framework e sem etapa de build. O conteúdo é todo entregue como o navegador recebe — o que está no disco é exatamente o que roda.

A página apresenta a agência, a dupla por trás dela (Coruja e Coelha), números de prova social, um carrossel de clientes atendidos e um carrossel de depoimentos, com CTAs apontando para o WhatsApp/Discord.

---

## 2. Stack & princípios

| Princípio | Decisão | Por quê |
|---|---|---|
| **Sem framework** | HTML/CSS/JS vanilla | É uma landing de marketing. React/Vue trariam build, dependências e complexidade sem benefício. Hospeda em qualquer lugar (GitHub Pages, Hostinger, S3…). |
| **Sem build step** | Arquivos servidos direto | Edição instantânea: salvou → recarregou → viu. Zero toolchain para manter. |
| **Zero dependências de runtime** | Só Google Fonts via CDN | Nada de npm, bundler ou lockfile. O único recurso externo são as fontes. |
| **Conteúdo real no HTML** | Texto fixo no markup | SEO e simplicidade. Não há CMS; o conteúdo muda editando o HTML. |

---

## 3. Estrutura de arquivos

```
landing_page_Klinsmann/
├── index.html          # Toda a estrutura da página (uma única página)
├── estilos.css         # Todo o estilo + design tokens
├── app.js              # Lógica dos carrosséis (clientes/feedbacks)
├── image-slot.js       # Web Component <image-slot> (imagens trocáveis)
├── imagens/
│   ├── logo.png        # Logo Zoo — PNG TRANSPARENTE (header + clientes)
│   ├── logo.jpg        # Logo com fundo escuro (backup, não usado)
│   ├── coruja.png      # Arte do Coruja (seção "sobre nós")
│   ├── coelha.png      # Arte da Coelha (seção "sobre nós")
│   └── paineis/        # Banners prontos dos serviços (3:1)
│       ├── transicoes.png
│       ├── tela.png
│       ├── emotes.png
│       ├── streampacks.png
│       └── caricatura.png
└── Artes para o site-.../   # Bundle-fonte de artes (origem dos assets acima)
```

> **Convenção importante:** o `index.html` precisa ficar na **raiz** do projeto. O `<image-slot>` grava seu estado num arquivo "sidecar" na raiz, então mover o HTML para uma subpasta quebra a persistência das imagens (ver §5.2).

---

## 4. Anatomia da página

Fluxo vertical das seções em [index.html](index.html):

```
┌─────────────────────────────────────────────┐
│ <header>   logo + nav + botão menu (mobile)   │  position: absolute (sobre o banner)
├─────────────────────────────────────────────┤
│ #banner    headline + CTA  |  stack de cards  │  grid 2 colunas; cards inclinados
│ #sobre     Coruja / Coelha (cards alternados) │  layout espelhado (img↔texto)
│ #numeros   +2 / +100 / +120  + CTA orçamento  │  flex centralizado
│ #clientes  carrossel de canais (círculos)     │  ← app.js
│ #feedbacks carrossel de depoimentos (cards)   │  ← app.js
├─────────────────────────────────────────────┤
│ <footer>   nav + redes (insta/discord/zap)    │
└─────────────────────────────────────────────┘
```

O fundo da página é um **gradiente ambiente fixo** em camadas (`body::before` radial laranja + `body::after` vinheta escura), criando o clima "lua laranja" sem usar imagem.

---

## 5. Componentes-chave

### 5.1 Sistema de design (tokens CSS)

Todas as cores, raios e tipografia ficam em variáveis no `:root` de [estilos.css](estilos.css):

```css
:root{
  --bg-0:#150602;  --bg-1:#2a0d04;  --bg-2:#3c1407;   /* marrons escuros */
  --orange:#ff6a1a; --orange-deep:#e8470a; --orange-soft:#ff8a3d;
  --text:#efe2d8;  --muted:#bda092;
  --display:'Saira Condensed', sans-serif;  /* títulos itálico/condensado */
  --body:'Poppins', sans-serif;             /* corpo */
  --radius:18px;   --maxw:1180px;
}
```

Trocar a identidade visual inteira = mexer nessas ~12 linhas. As fontes vêm do Google Fonts (Saira Condensed + Poppins) importadas no topo do CSS.

**Padrões de estilo recorrentes:**
- `.bt_laranja` — botão laranja com gradiente, sombra e hover de "levantar".
- `.titulo` — título duplo: um texto **"fantasma"** gigante e translúcido (`.grande`) atrás do título sólido. Efeito de profundidade sem imagem.
- `.center` — container central (`max-width:1180px`) reutilizado em todas as seções.

### 5.2 `<image-slot>` — o componente que merece atenção

[image-slot.js](image-slot.js) define um **Web Component** (Custom Element + Shadow DOM) para *toda* área de imagem trocável. Em vez de um `<img>` fixo, o dono do site pode **arrastar uma imagem** (ou clicar para escolher) em cima do slot.

```
<image-slot id="sobre-coruja" placeholder="Coruja" src="imagens/coruja.png">
              │                    │                     │
       chave de persistência   estado vazio        fallback (imagem padrão)
```

Como funciona a persistência:
- Os arquivos soltos são salvos (redimensionados p/ WebP) num **sidecar** `.image-slots.state.json` na raiz.
- Leitura via `fetch()`; escrita via `window.omelette.writeFile`.

> ⚠️ **Decisão/limitação central:** `window.omelette.writeFile` **só existe dentro do runtime do Claude Design**. Num servidor estático comum (Hostinger, `python -m http.server`, etc.) o slot fica **somente-leitura**: o arrastar-e-soltar não persiste. Por isso, **as imagens finais do site são fixadas pelo atributo `src=`** — que funciona em qualquer lugar. O drag-and-drop é uma conveniência de edição/preview, não o mecanismo de produção.

Por que usamos esse componente mesmo assim: durante a montagem, permite preencher/preview de imagens sem editar código; e o `src=` garante o resultado final em produção. Padroniza recortes (`shape="circle"`, `mask`, `fit=cover`) em todos os pontos de imagem.

### 5.3 Carrosséis — `app.js`

[app.js](app.js) é uma implementação **vanilla minimalista** (~30 linhas), sem biblioteca. Qualquer elemento com `data-carousel` vira um carrossel:

```html
<div class="carousel-wrap" data-carousel data-step="256"> … </div>
```

- `data-step` = pixels deslocados por clique (256 p/ clientes, 356 p/ feedbacks — largura de 1 card + gap).
- As setas movem um `translateX` na `.carousel-track` (transição CSS), com *clamp* entre `0` e o overflow máximo.
- Recalcula limites no `resize`.

> Decisão: trocamos a `owl.carousel` + jQuery do site original por isso. Removeu ~3 dependências e mantém o comportamento essencial (avançar/voltar) sem peso.

### 5.4 Emblema SVG reutilizável

O logo "Zoo" é um `<symbol>` SVG inline no topo do HTML, reusado via `<use href="#zoo-logo">`. Hoje o header usa o **PNG real** (transparente); o símbolo permanece disponível para ícones vetoriais nítidos em qualquer escala, se necessário.

---

## 6. Decisões de design (o "porquê")

1. **Painéis prontos nos cards de serviço.** A pasta `Paineis/` já trazia os 5 banners (TRANSIÇÕES, TELA ANIMADA, EMOTES E DISTINTIVOS, STREAMPACKS, CARICATURA) com rótulo + logo embutidos. Em vez de recompor isso em CSS (texto + mini-logo sobrepostos), **usamos a arte original direto** — fidelidade total e menos código. Os cards ficam em proporção `3:1` (igual aos PNGs, sem corte).

2. **Stack de cards inclinado.** A coluna direita do banner usa `rotate(-7deg)` + `skewX(-9deg)` para o visual dinâmico de cards empilhados em diagonal — escolha estética que dá energia ao hero.

3. **Logo transparente (PNG).** Sobre o fundo escuro, o PNG com alpha transparente funciona tanto no header quanto dentro dos círculos de clientes, sem "caixa branca". O `.jpg` de fundo escuro ficou só como backup.

4. **Conteúdo real em português.** Substituímos todo o *lorem ipsum* do mock pelas bios reais (Klinsmann/Coruja e Beatriz/Coelha), números reais (+2 / +100 / +120), nomes de canais e depoimentos verdadeiros.

5. **Avatares de cliente = logo (placeholder).** O bundle de artes não incluía as fotos individuais dos canais; usamos o logo como marcador nos 11 círculos. São `<image-slot>`, então cada um aceita o avatar real depois.

6. **Fundo procedural, não imagem.** O clima é feito com gradientes CSS em camadas — carrega instantâneo e escala em qualquer tela.

---

## 7. Fluxo dos assets

```
Artes para o site-.../        →  imagens/            →  referenciado por
  Logo/zoo agency.png         →  logo.png            →  <header> e círculos de clientes
  Artes Dos Donos/Coruja.png  →  coruja.png          →  #sobre (slot coruja)
  Artes Dos Donos/coelha.png  →  coelha.png          →  #sobre (slot coelha)
  Paineis/1_4.png … 5_5.png   →  paineis/*.png       →  #banner (cards de serviço)
```

Os arquivos em `imagens/` são as cópias *de produção*; a pasta `Artes para o site-...` é a **fonte** (não é servida ao usuário, pode sair do deploy final).

---

## 8. Responsividade & acessibilidade

**Estado atual:**
- ✅ `<meta viewport>` presente; SVGs com `aria-label`; HTML semântico (`header/main/section/footer/nav`).
- ⚠️ **Sem `@media` queries ainda** — o layout é desktop-first e ainda não adapta para telas pequenas.
- ⚠️ O botão `.bt_menu_mobile` existe mas **não está conectado** a nenhum JS (não abre menu).

> **Pendência conhecida:** mobile. O grid do banner, o `gap` da nav e os carrosséis precisam de breakpoints; o menu hambúrguer precisa de um toggle em JS.

---

## 9. Como rodar

Por causa do `fetch()` do `<image-slot>`, abra via **servidor HTTP** (não por `file://`):

```bash
cd landing_page_Klinsmann
python3 -m http.server 3000
# abrir http://localhost:3000   (Ctrl+Shift+R para furar cache)
```

Deploy: subir os arquivos da raiz (HTML/CSS/JS + `imagens/`) em qualquer hospedagem estática. A pasta `Artes para o site-...` não é necessária em produção.

---

## 10. Próximos passos sugeridos

- [x] **Responsividade**: `@media` em 960px e 640px — banner, "sobre" e nav adaptam para mobile.
- [x] **Menu mobile**: `.bt_menu_mobile` conectado em `app.js` com toggle `nav-open`.
- [x] **Carousel adaptativo**: `step()` usa 90% da viewport em telas < 640px.
- [x] **Scroll reveal**: `IntersectionObserver` em cards de sobre, números e feedbacks.
- [x] **Imagens WebP**: coruja/coelha/logo convertidas (4 MB → 84 KB, redução de 98%).
- [ ] **Avatares reais** dos 11 canais nos círculos de clientes.
- [ ] **Tela animada / transições**: há vídeos `.mp4` no bundle — considerar usar como preview real nesses serviços.
- [ ] **Favicon** e metas Open Graph apontando para uma imagem hospedada.

---

## 11. Por que não migrar para React (decisão registrada)

Esta questão foi analisada formalmente. A conclusão é **não migrar**, pelos seguintes motivos concretos:

### O que React resolveria neste projeto

- Eliminar os 22 blocos de markup repetitivo (11 clientes + 11 feedbacks) centralizando dados num `content.js`
- Menu mobile com `useState` em vez de classList manual

### Por que o custo não justifica

| Fator | Vanilla (atual) | React + Vite |
|---|---|---|
| Deploy | Arrastar pasta | `npm run build` + arrastar `/dist` |
| Editar texto | Editar `index.html` | Editar `content.js` |
| node_modules | Zero | ~150 MB |
| Build step | Zero | ~1–2s |
| Ferramentas necessárias | Python ou qualquer servidor HTTP | Node.js, npm |

O `image-slot.js` (643 linhas de Web Component com drag-and-drop, persistência e reframe) seria **completamente descartado** em React — substituído por `<img src={...}>` simples. Toda aquela lógica só tem sentido dentro do runtime do Claude Design onde `window.omelette.writeFile` existe; em produção ela nunca é acionada.

### Quando faria sentido migrar

- **Múltiplas páginas** de portfólio por serviço (rotas)
- **Painel admin** para o cliente adicionar depoimentos ou clientes sem editar código
- **Integração com API** (ex: Twitch para buscar avatares reais dos canais)
- **Formulário de orçamento** com validação e envio

### Se migrar no futuro: Vite + React (não Next.js)

Next.js adiciona SSR, file-based routing e deployment Vercel — nenhum desses recursos se aplica a uma landing estática. O output do Vite é uma pasta `/dist` idêntica à estrutura atual, hospedável em qualquer servidor. O CSS existente funciona sem modificação.


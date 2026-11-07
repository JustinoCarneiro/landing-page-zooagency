# Zoo Agency — Landing Page

Landing page institucional da **Zoo Agency**, agência de design gráfico especializada em **transmissões ao vivo (lives/streaming)**: overlays, transições, telas animadas, emotes, streampacks e caricaturas.

Site **estático** (HTML + CSS + JavaScript puro), sem frameworks nem dependências de build.

---

## ✨ Seções

- **Hero** — chamada principal e CTA para os serviços
- **Nossos Serviços** — carrossel com demonstração real de cada serviço (vídeos, emotes, streampacks, caricaturas)
- **Sobre Nós** — Coruja (Klinsmann Santana) e Coelha (Beatriz Silva)
- **Números** — métricas da agência + CTA de orçamento (WhatsApp)
- **Clientes Atendidos** — carrossel de canais com foto clicável (link Twitch) + player de áudio de feedback
- **Feedbacks** — depoimentos reais dos clientes
- **Rodapé** — navegação + redes (Discord, WhatsApp)

---

## 🛠️ Tecnologias

- **HTML5** semântico
- **CSS3** com design tokens (custom properties), grid/flex e media queries
- **JavaScript vanilla** (sem bibliotecas) — carrosséis, menu mobile, player de áudio, scroll reveal
- **Fontes auto-hospedadas** (Saira Condensed + Poppins) — sem chamadas externas

---

## 📁 Estrutura

Tudo o que vai para o ar fica em **`public/`**. O que está fora dela (documentação, `.htaccess`, scripts) nunca é publicado.

```
.
├── public/                 # o site: é esta pasta que vai para a hospedagem
│   ├── index.html          # página única
│   ├── estilos.css         # estilos + design tokens + responsividade
│   ├── app.js              # carrosséis, menu mobile, player de áudio, scroll reveal
│   ├── fonts.css           # @font-face das fontes locais
│   ├── fonts/              # fontes .woff2 auto-hospedadas
│   ├── imagens/            # logo, donos, painéis, serviços, streampacks, og-cover…
│   ├── audios/clientes/    # feedbacks dos canais (atualmente áudios de teste)
│   ├── favicon.ico
│   ├── _headers            # cabeçalhos de segurança e cache (Cloudflare Pages)
│   ├── 404.html            # página de erro
│   ├── robots.txt
│   └── sitemap.xml
├── .htaccess               # só para Apache/HostGator (a Cloudflare ignora); fica como plano B
├── DEPLOY.md, ARQUITETURA.md, README.md
└── scripts/, .ondadev/, …  # ferramentas e metodologia (não são publicadas)
```

Documentação complementar:
- **`ALTERACOES.md`** — registro de todas as alterações (para apresentação ao cliente)
- **`ARQUITETURA.md`** — decisões de arquitetura e design
- **`DEPLOY.md`** — guia de publicação e o que **não** subir

---

## 💻 Rodar localmente

Não precisa de build. Basta servir os arquivos por HTTP:

```bash
cd public && python3 -m http.server 3000
```

Depois abra **http://localhost:3000**.

> Abrir o `index.html` direto pelo `file://` pode falhar com vídeos/áudios — use o servidor local acima.

---

## 🚀 Publicação

O site é estático e roda em qualquer hospedagem. O destino previsto é o **Cloudflare Pages** (gratuito), na conta do cliente, publicando a pasta **`public/`** (sem build). Os cabeçalhos de segurança e o cache vêm do arquivo `public/_headers`; o `.htaccess` só vale em Apache.

Consulte o **`DEPLOY.md`** para o passo a passo (Cloudflare Pages e, como plano B, a HostGator).

## 📌 Pendências (aguardando material do cliente)

- [ ] Fotos de perfil reais dos 11 canais (placeholder atual: logo)
- [ ] Áudios de feedback reais (atualmente tons de teste em `audios/clientes/`)
- [x] URL absoluta de Open Graph (`og:url`, `og:image`, `canonical` apontam para `https://zooagency.com.br`)

---

## 🔒 Segurança

- Todos os links externos usam `rel="noopener"` e abrem em nova aba
- `Content-Security-Policy` restritiva (apenas recursos do próprio site)
- HTTPS forçado e proteção contra clickjacking / MIME sniffing (via `.htaccess`)
- Sem segredos no código — credenciais de API (ex.: Twitch) nunca devem entrar no front-end

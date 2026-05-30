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

```
.
├── index.html          # página única
├── estilos.css         # estilos + design tokens + responsividade
├── app.js              # carrosséis, menu mobile, player de áudio, scroll reveal
├── fonts.css           # @font-face das fontes locais
├── favicon.ico
├── .htaccess           # HTTPS, cabeçalhos de segurança, cache (Apache/HostGator)
├── fonts/              # fontes .woff2 auto-hospedadas
├── imagens/            # logo, donos, painéis, serviços, streampacks, og-cover…
└── audios/clientes/    # feedbacks dos canais (atualmente áudios de teste)
```

Documentação complementar:
- **`ALTERACOES.md`** — registro de todas as alterações (para apresentação ao cliente)
- **`ARQUITETURA.md`** — decisões de arquitetura e design
- **`DEPLOY.md`** — guia de publicação e o que **não** subir

---

## 💻 Rodar localmente

Não precisa de build. Basta servir os arquivos por HTTP:

```bash
python3 -m http.server 3000
```

Depois abra **http://localhost:3000**.

> Abrir o `index.html` direto pelo `file://` pode falhar com vídeos/áudios — use o servidor local acima.

---

## 🚀 Publicação

O site roda em qualquer hospedagem estática. Em servidores **Apache** (ex.: HostGator), o `.htaccess` já aplica HTTPS forçado, cabeçalhos de segurança, cache e compressão.

Consulte o **`DEPLOY.md`** para o passo a passo e a lista do que enviar / não enviar.

> ⚠️ O `.htaccess` é específico de Apache. Em GitHub Pages ou Nginx, esses cabeçalhos precisam ser configurados de outra forma.

---

## 📌 Pendências (aguardando material do cliente)

- [ ] Fotos de perfil reais dos 11 canais (placeholder atual: logo)
- [ ] Áudios de feedback reais (atualmente tons de teste em `audios/clientes/`)
- [ ] URL absoluta de Open Graph quando o domínio estiver definido (há um `TODO` no `<head>`)

---

## 🔒 Segurança

- Todos os links externos usam `rel="noopener"` e abrem em nova aba
- `Content-Security-Policy` restritiva (apenas recursos do próprio site)
- HTTPS forçado e proteção contra clickjacking / MIME sniffing (via `.htaccess`)
- Sem segredos no código — credenciais de API (ex.: Twitch) nunca devem entrar no front-end

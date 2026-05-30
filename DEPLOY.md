# Guia de Publicação — Zoo Agency

Instruções para subir o site para a hospedagem (Hostinger ou similar) de forma segura.

---

## ✅ O que SUBIR para o servidor

Suba **apenas** estes arquivos e pastas para a raiz do site (`public_html`):

```
index.html
estilos.css
app.js
fonts.css
.htaccess
fonts/         (fontes auto-hospedadas)
imagens/       (logo, coruja, coelha, painéis, serviços, streampacks…)
audios/        (feedbacks dos canais)
```

---

## ❌ O que NÃO subir (manter só no computador)

| Item | Por quê |
|---|---|
| `Artes para o site-20260529T194054Z-3-001/` | Pasta de artes-fonte (~26 MB) com MP4s originais, PNGs gigantes e o site antigo. Se subir, fica **tudo público** e pesa o servidor à toa. |
| `ALTERACOES.md` | Documento interno (mostra histórico, número de WhatsApp, pendências). |
| `ARQUITETURA.md` | Documentação técnica interna. |
| `DEPLOY.md` | Este guia. |

> O `.htaccess` já bloqueia o acesso a arquivos `.md` e à pasta de artes como **segunda camada de proteção**, caso algo seja subido por engano. Mas o ideal é nem subir.

---

## 🔒 Segurança aplicada

- **HTTPS forçado** — todo acesso `http://` é redirecionado para `https://` (no `.htaccess`).
- **Cabeçalhos de segurança** — proteção contra clickjacking, MIME sniffing, e uma Content-Security-Policy que só permite recursos do próprio site.
- **Links externos** — todos os links que abrem em nova aba usam `rel="noopener"`.
- **Fontes auto-hospedadas** — não há mais chamada externa ao Google Fonts (privacidade + independência de terceiros).
- **Sem código morto** — o componente `image-slot.js` (ferramenta de design) foi removido; as imagens são `<img>` comuns.

> O `.htaccess` funciona em servidores **Apache** (caso da Hostinger). Em Nginx, os mesmos cabeçalhos precisam ser configurados no bloco `server {}`.

---

## ⚠️ Fotos e áudios dos canais

Quando receber o material dos clientes:

- **Áudios** → substituir os arquivos de teste em `audios/clientes/` mantendo os mesmos nomes (`brunaoencanador.mp3`, `akalixto.mp3`, etc.).
- **Fotos de perfil** → substituir o placeholder de cada círculo de cliente pela imagem real.

### 🚨 Credenciais da API do Twitch — atenção crítica

Se for usar a API do Twitch para baixar os avatares automaticamente:

- O **Client Secret NUNCA pode entrar no código do site** (`.html`/`.js`). Ele ficaria visível para qualquer visitante que abrir o código-fonte da página.
- O script que baixa os avatares roda **apenas localmente, no seu computador**. O site publicado recebe **somente as imagens já baixadas** — nunca as credenciais.

---

## Teste local antes de publicar

```bash
cd landing_page_Klinsmann
python3 -m http.server 3000
```

Abrir `http://localhost:3000` e conferir tudo antes de enviar para a hospedagem.

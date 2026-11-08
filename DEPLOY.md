# Guia de Publicação — Zoo Agency

## Caminho principal: Cloudflare Pages (gratuito)

O site é a pasta **`public/`**. Nada fora dela é publicado (documentação, `.htaccess`, scripts e `.md` ficam de fora).

| Campo no Cloudflare Pages | Valor |
|---|---|
| Framework preset | None |
| Build command | *(vazio)* |
| Build output directory | `public` |
| Production branch | `main` (ou a branch publicada) |

- **Publicação automática (GitHub Actions):** `.github/workflows/deploy-pages.yml` publica `public/` a cada push na `main`
  (projeto Pages `zooagency`, criado por upload direto). Segredos no repositório: `CLOUDFLARE_API_TOKEN`
  (permissão só *Account > Cloudflare Pages > Edit*) e `CLOUDFLARE_ACCOUNT_ID`. O workflow passa `--branch=main`
  para o deploy sair como **produção** (confirmado, ver abaixo).
- **Confirmado em 07/11/2026:** o deploy do Actions sai como **Production** (os dois vídeos sem uso sumiram do ar
  em `zooagency.com.br`). Domínio e `www` ativos, com `www` redirecionando 301 para o apex.
- **Limitação do Pages:** ele **não responde pedidos de trecho (Range/206)** para arquivos estáticos. Testado em um
  iPhone (Safari): os vídeos e o áudio tocaram. Se um dia entrarem vídeos grandes, revalidar no Safari/iOS (saídas:
  Pages Function que devolva 206, ou mídia em um bucket R2 com domínio próprio).
- **HostGator (encerrada):** o site migrou em 07/11/2026. A renovação do plano foi desligada pelo cliente e o ciclo
  (contratado em 28/05/2026) termina no dia 28. A zona DNS já foi limpa em 08/11/2026; não há mais nada a fazer lá.
  Cancelar de imediato **apagaria tudo** e não devolveria o valor (passados 30 dias da contratação).
- **`public/_headers`** substitui o `.htaccess`: aplica os cabeçalhos de segurança (incluindo a CSP) e define o cache. Imagens e áudios têm cache curto (7 dias) porque são trocados mantendo o mesmo nome.
- **`public/404.html`** é obrigatório: sem ele a Cloudflare serve a página inicial em qualquer endereço inexistente.
- **Domínio:** `zooagency.com.br` (Registro.br, titular o cliente) usa os servidores da Cloudflare. A zona tem só 4
  registros: `CNAME @` e `CNAME www` para `zooagency.pages.dev`, SPF `v=spf1 -all` e DMARC `p=reject` (a Zoo não usa
  e-mail no domínio). `www` redireciona 301 para o domínio principal (Redirect Rule "WWW to root").
- **Registro.br:** para trocar os servidores use **Alterar servidores DNS**. **Não use o "Modo avançado"** do DNS deles:
  ele move o domínio para `*.sec.dns.br` e trava a delegação externa por cerca de 2 horas.

---

## Referência histórica: hospedagem Apache (HostGator)

> **Não usar para publicar.** Desde 07/11/2026 o domínio aponta para a Cloudflare: subir arquivos para a HostGator
> não altera o site no ar. Esta seção e o `.htaccess` da raiz ficam só como referência para quem um dia hospedar
> o site em um servidor Apache.

Instruções para subir o site para a hospedagem (Hostinger ou similar) de forma segura.

---

## ✅ O que SUBIR para o servidor

Suba **apenas** o conteúdo da pasta `public/` mais o `.htaccess` (que fica na raiz do repositório) para a raiz do site (`public_html`):

```
public/index.html, estilos.css, app.js, fonts.css, favicon.ico, 404.html
.htaccess      (da raiz do repositório)
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

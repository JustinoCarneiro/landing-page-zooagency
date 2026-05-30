# Zoo Agency — Registro de Alterações

> Documento de acompanhamento para apresentação ao cliente.
> Base de referência: print de tela fornecido pelo cliente em 29/05/2026.

---

## Ponto de partida

O cliente forneceu um **print de tela** da landing page existente (`uploads/index.html`) como referência visual. A partir dele, foi reconstruída a página com um design atualizado e melhorado, mantendo toda a identidade visual laranja/marrom da Zoo Agency.

---

## 1. Reconstrução visual completa

**O que era:** página dependente de jQuery e OWL Carousel (bibliotecas externas pesadas), fontes antigas e layout sem sistema de design definido.

**O que foi feito:** reconstrução completa do HTML, CSS e JavaScript com:

- Novo sistema de design com **tokens de cor** centralizados (fácil de alterar no futuro)
- **Fontes premium**: Saira Condensed (títulos) + Poppins (corpo), via Google Fonts
- **Fundo escuro** com gradiente linear marrom/preto limpo
- **Efeito de títulos fantasma**: texto gigante semitransparente atrás de cada título de seção
- **Cards de depoimento e cliente** com vidro fosco (glassmorphism sutil)
- **Botões laranja** com gradiente, sombra e efeito de "levantar" ao hover
- Zero dependências externas além das fontes — sem jQuery, sem bibliotecas de carousel

---

## 2. Conteúdo real aplicado

**O que era:** textos "lorem ipsum" e dados fictícios em toda a página.

**O que foi feito:** substituição por conteúdo real:

| Seção | Antes | Depois |
|---|---|---|
| Descrição do hero | Lorem ipsum | Texto real sobre a agência |
| Coruja — bio | Lorem ipsum | Bio real do Klinsmann Santana |
| Coelha — bio | Lorem ipsum | Bio real da Beatriz Silva |
| Números | +2 / +50 / +40 | +2 / +100 / +120 (dados reais) |
| Clientes | "Nome do Canal" × 6 | 11 canais reais com links Twitch |
| Feedbacks | Texto repetido × 5 | 11 depoimentos reais de clientes |

---

## 3. Imagens aplicadas

### 3a. Artes dos donos (seção "Sobre Nós")
- **Coruja** (Klinsmann Santana): arte aplicada com máscara quadrada arredondada
- **Coelha** (Beatriz Silva): arte aplicada com máscara quadrada arredondada
- Fonte: `Artes para o site / Artes Dos Donos/`

### 3b. Seção de serviços
Os 5 serviços possuem header com faixa CSS (gradiente laranja + listras diagonais) e conteúdo demonstrado:

| Serviço | Demonstração |
|---|---|
| TRANSIÇÕES | Vídeo real de transição (editado — preto removido, 1.1 MB → 560 KB) |
| TELA ANIMADA | Vídeo real de tela animada |
| EMOTES E DISTINTIVOS | Grade com 4 emotes reais criados para clientes |
| STREAMPACKS | Grade com 4 telas de stream reais |
| CARICATURA | Grade com 4 caricaturas reais de streamers |

### 3c. Logo
- Logo PNG transparente aplicado no header via `<picture>` com fallback
- Logo usado como placeholder nos círculos de clientes (avatares reais: ver Pendências)

---

## 4. Otimização de imagens

**O que era:** imagens PNG originais 3000×3000px servidas diretamente.

**O que foi feito:** conversão para **WebP** com redimensionamento:

| Imagem | Antes | Depois | Redução |
|---|---|---|---|
| Coruja | 2.333 KB | 29 KB | **99%** |
| Coelha | 1.697 KB | 29 KB | **99%** |
| Logo | 780 KB | 26 KB | **97%** |
| **Total** | **~4.8 MB** | **~84 KB** | **98%** |

PNG originais mantidos como fallback para navegadores sem suporte a WebP.

---

## 5. Responsividade

**O que era:** zero adaptação — site "quebrava" em celular.

**O que foi feito:** dois breakpoints cobrindo todos os elementos da página:

### Tablet ≤ 960px
- Seção "Sobre Nós": imagem acima do texto (coluna única)
- Seção de serviços: descrição acima do vídeo/imagens (coluna única)
- Cards de serviço com margem reduzida

### Mobile ≤ 640px
- Menu hambúrguer funcional (abre/fecha com JS)
- Faixa decorativa do fundo desativada
- Hero: fontes e padding reduzidos proporcionalmente
- Header de cada card de serviço: fonte reduzida (34px → 22px)
- Emotes: grade 4 colunas → 2 colunas
- Títulos de seção, números e bios ajustados
- Carrosséis: navegação adaptada à largura da tela
- Footer: espaçamentos compactos

---

## 6. Menu mobile

Botão "menu" conectado ao JavaScript:
- Abre painel de navegação abaixo do header
- Texto alterna entre "menu" e "fechar"
- Fecha automaticamente ao clicar em qualquer link

---

## 7. Carrosséis — melhorias

- **Setas + roda do mouse**: girar a roda sobre qualquer carrossel avança os itens. Quando chega ao fim, a rolagem volta a mover a página normalmente
- **Navegação adaptativa**: em mobile, cada clique/giro avança ~90% da largura da tela (1 card por vez)
- **Serviços**: carrossel de slide completo (1 serviço por vez) com dots indicadores clicáveis

---

## 8. Animações e interações

- **Scroll reveal**: artigos "Sobre Nós", números e feedbacks aparecem com fade + subida ao entrar na tela (IntersectionObserver, sem biblioteca)
- **Botão "voltar ao topo"**: aparece após 400px de scroll, sobe suavemente ao topo, some quando no topo. Visual consistente com a identidade (gradiente laranja)

---

## 9. Fontes — tamanhos aumentados (~15%)

Todos os tamanhos de fonte foram aumentados para melhorar a legibilidade:

| Elemento | Antes | Depois |
|---|---|---|
| Botões / nav | 14px | 16px |
| Parágrafos hero | 16px | 18px |
| Título hero | 52px | 60px |
| ZooAgency (destaque) | 68px | 78px |
| Títulos de seção | 38px | 44px |
| Nomes (Sobre) | 30px | 36px |
| Números (+2/+100/+120) | 76px | 88px |
| Feedback — nome | 19px | 22px |
| Feedback — texto | 13px | 15px |

---

## 10. Fundo — textura e animação

- **Grain**: textura de ruído SVG em 4.5% de opacidade sobre toda a tela — elimina o aspecto "plano" do fundo escuro, dá profundidade e sensação premium
- **Faixa diagonal animada**: entra deslizando do topo em 2.2s com `ease-out` e fica fixada no topo da tela. Mesmo padrão de listras dos cards de serviço (115°, laranja sutil), reforça a coerência do design system. Oculta em mobile

---

## 11. Seção "Clientes Atendidos" — reformulada

**O que era:** cada canal tinha a foto + um botão "conheça o canal".

**O que foi feito:**
- O **botão foi removido**. Agora a própria **foto do canal é clicável** e leva direto ao canal na Twitch (abre em nova aba), com efeito de zoom + brilho ao passar o mouse
- No lugar do botão, foi adicionado um **player de áudio** para o feedback em voz de cada canal, com a legenda "feedback do canal"
- A estrutura está **pronta para receber os arquivos reais** (foto de perfil + áudio de cada canal)
- **Áudios de teste** foram colocados em cada canal (um tom sonoro diferente por canal) só para demonstrar o funcionamento — serão substituídos pelos feedbacks reais

---

## 12. Player de áudio personalizado

**O que era:** o player de áudio usava os controles padrão do navegador (cinza, fora da identidade visual).

**O que foi feito:** player totalmente personalizado na identidade do site:
- **Botão play/pause circular** com gradiente laranja e sombra, igual aos demais botões do site (ícone alterna entre play e pause)
- **Barra de progresso** laranja sobre trilho escuro, dentro de uma "pílula" escura — clicável para avançar/retroceder no áudio
- **Contador de tempo** na fonte do site
- **Apenas um áudio toca por vez** — ao iniciar um canal, os outros pausam automaticamente

**Sobre o tamanho dos áudios:** não há limite técnico rígido. Os áudios só são baixados quando o usuário clica em play (não afetam a velocidade de carregamento da página). Recomendação: formato **MP3**, duração de até ~2-3 minutos, ~1 MB por minuto. Os 11 áudios reais somados ficam em torno de 20 MB, tranquilo para qualquer hospedagem.

---

## 13. Segurança e preparação para publicação

Análise completa da estrutura e aplicação de critérios de segurança (o site é estático, sem backend/banco/formulários, então a superfície de ataque já é pequena):

- **HTTPS forçado + cabeçalhos de segurança** (`.htaccess`): proteção contra clickjacking (`X-Frame-Options`), MIME sniffing (`X-Content-Type-Options`), política de referência e uma `Content-Security-Policy` que só permite recursos do próprio site.
- **Links externos protegidos**: todos os 21 links que abrem em nova aba agora têm `rel="noopener"`.
- **Fontes auto-hospedadas**: o Google Fonts externo foi substituído por arquivos locais (pasta `fonts/`, ~420 KB). Sem chamadas a terceiros — melhora privacidade e independência.
- **Código morto removido**: o componente `image-slot.js` (31 KB, ferramenta do ambiente de design) foi eliminado. As imagens viraram `<img>` comuns — também acaba com um erro 404 que ocorria a cada carregamento (o componente tentava buscar um arquivo de estado inexistente).
- **Proteção de arquivos internos**: o `.htaccess` bloqueia acesso público a arquivos `.md` (documentação) e à pasta de artes-fonte.
- **Guia de publicação** (`DEPLOY.md`): lista o que subir e o que **não** subir, e alerta que o **Client Secret do Twitch nunca pode entrar no código do site** (apenas em script local).

---

## Pendências (aguardando material ou ação)

- [ ] **Fotos de perfil dos 11 canais** — requer credenciais da API do Twitch (Client ID + Secret). Criar app gratuito em [dev.twitch.tv](https://dev.twitch.tv), fornecer as credenciais e o script Python faz o download automático de todos os avatares
- [ ] **Áudios de feedback dos 11 canais** — atualmente há áudios de teste (tons sonoros). Substituir pelos arquivos reais em `audios/clientes/` (mesmo nome de cada canal)
- [ ] **URL absoluta de Open Graph** — quando o domínio estiver definido, trocar `og:image`/`og:url` pela URL completa (há um `TODO` no `<head>` indicando onde)

**Concluído nesta etapa:** Favicon (gerado do logo), imagem Open Graph (gerada do logo). Ícone do Instagram removido do rodapé (não será usado).

---

## Resumo executivo

| Área | Status |
|---|---|
| Design visual completo | ✅ |
| Conteúdo real em todas as seções | ✅ |
| Imagens dos donos (Coruja e Coelha) | ✅ |
| Seção de serviços com vídeos e demos | ✅ |
| Logo no header | ✅ |
| Otimização de imagens (98% menor) | ✅ |
| Responsividade mobile + tablet | ✅ |
| Menu mobile funcional | ✅ |
| Scroll reveal nas seções | ✅ |
| Navegação por roda do mouse | ✅ |
| Fontes aumentadas | ✅ |
| Grain + faixa animada no fundo | ✅ |
| Botão voltar ao topo | ✅ |
| Clientes: foto clicável + player de áudio | ✅ (estrutura pronta, áudios de teste) |
| Player de áudio personalizado | ✅ |
| Segurança + preparação para deploy | ✅ |
| Favicon (aba do navegador) | ✅ |
| Imagem Open Graph (compartilhamento) | ✅ |
| Fotos de perfil dos clientes | ⏳ Aguardando credenciais Twitch |
| Áudios de feedback reais dos clientes | ⏳ Aguardando arquivos |
| URL absoluta de OG (og:url) | ⏳ Aguardando domínio |

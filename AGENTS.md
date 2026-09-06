# Zoo Agency — Contrato canônico de trabalho

## Objetivo

Landing page institucional (one-page) da **Zoo Agency**, agência de design
gráfico para transmissões ao vivo (overlays, transições, telas animadas, emotes,
streampacks, caricaturas). Site **estático** — HTML + CSS + JavaScript puro, sem
framework e sem etapa de build. Metodologia OndaDev — versão em `ONDA_VERSION`.

## Mapa do repositório

| Caminho | Finalidade |
| --- | --- |
| `index.html` | Página única — toda a estrutura. Precisa ficar na **raiz** (ver `ARQUITETURA.md` §5.2). |
| `estilos.css` | Estilos + design tokens (custom properties) + responsividade. |
| `app.js` | Carrosséis, menu mobile, player de áudio, scroll reveal. |
| `fonts.css`, `fonts/` | `@font-face` das fontes auto-hospedadas (Saira Condensed + Poppins). |
| `imagens/`, `audios/` | Assets do site (logos, artes da dupla, painéis de serviço, feedbacks em áudio). |
| `.htaccess` | HTTPS, cabeçalhos de segurança e cache (Apache/HostGator). |
| `ARQUITETURA.md` | Decisões de design e o porquê de cada escolha. |
| `DEPLOY.md` | Procedimento de publicação. |
| `tema-namorados.*`, `reverte_namorados.sh` | Tema sazonal desativável (revertido por padrão). |
| `.ondadev/` | Protocolo de failover de cota e template de handoff entre agentes. |
| `.agents/`, `.claude/` | Skills OndaDev dos agentes (nunca edite os destinos; a fonte é o `onda-starter`). |
| `.github/workflows/` | CI de secret scanning (gitleaks nos commits do PR). |

## Autoridade da informação

| Assunto | Fonte canônica | Papel das demais fontes |
| --- | --- | --- |
| Conteúdo e escopo da página | `index.html` + `README.md` | — (não há CMS; o conteúdo muda editando o markup). |
| Decisão de arquitetura/design | `ARQUITETURA.md` | — |
| Procedimento de publicação | `DEPLOY.md` | — |
| Código e histórico versionado | Git | GitHub registra PRs, revisão e CI. |

## Comandos verificados

```bash
# Servir localmente (não há build)
python3 -m http.server 8000      # ou: npx serve

# Reverter o tema sazonal, se estiver ativo
bash reverte_namorados.sh

# Checkpoint de handoff entre agentes (só metadados seguros)
bash scripts/ai-checkpoint.sh --stdout
```

Não há build, lint ou suíte de testes: o que está no disco é exatamente o que o
navegador roda. Validação é conferência manual no navegador (carrosséis, menu
mobile, player de áudio, CTAs de WhatsApp/Discord) em desktop e mobile.

## Fronteiras e convenções

- **Sem framework, sem build, zero dependência de runtime.** Não introduza npm,
  bundler, lockfile ou biblioteca de terceiros sem uma decisão documentada em
  `ARQUITETURA.md`.
- **`index.html` na raiz**: o padrão de imagens trocáveis grava um sidecar na
  raiz; mover o HTML quebra a persistência.
- **Fontes auto-hospedadas**: nada de chamada externa nova sem decisão.
- **Conteúdo real no HTML** (SEO e simplicidade); texto fixo no markup.
- Responsivo mobile-first; preservar os cabeçalhos de segurança do `.htaccess`.
- Documentação em português claro; nomes técnicos no idioma da tecnologia.

## Segurança e classes de risco

Site de marketing sem backend, login ou dado de cliente. Ainda assim: nunca
versione tokens, chaves de API, credenciais de FTP/hospedagem ou dados pessoais.
Links de contato (WhatsApp/Discord) são públicos e podem ficar no markup.

| Nível | Exemplos | Regra |
| --- | --- | --- |
| R0 | Edição de conteúdo, estilo, cópia de texto, testes locais | Executar e validar normalmente. |
| R1 | Estrutura do `index.html`, `app.js`, `.htaccess`, CI, assets pesados | Declarar impacto, conferir no navegador e pedir revisão de diff. |
| R2 | Publicação em produção (FTP/hospedagem), credenciais, exclusão de assets em uso | Exigir autorização explícita e alvo confirmado. |

## Definition of Done

1. atende a um pedido de conteúdo/ajuste com resultado verificável na página;
2. conferido no navegador em desktop e mobile (o que existe de "teste" aqui);
3. atualiza `README.md` ou `ARQUITETURA.md` quando a estrutura ou uma decisão mudou;
4. não introduz segredo, credencial ou dado pessoal no repositório;
5. passa por revisão proporcional ao risco e deixa um diff compreensível;
6. registra handoff com mudanças, validações, decisões, riscos e pendências.

Não afirme que a publicação foi feita sem evidência.

## Revisão e handoff entre agentes

Claude e Codex seguem este arquivo como núcleo comum. Um autor por PR; o outro
revisa o diff quando o risco (R1/R2) exige. Quando a cota de um agente acaba, o
outro assume por handoff — protocolo na metodologia OndaDev 3.0 (`ONDA_VERSION`),
com `scripts/ai-checkpoint.sh` preenchendo `.ondadev/handoff/current.md`.

Síntese de handoff:

```text
Escopo: …
Mudanças: …
Validações executadas e resultado: …
Decisões/ADRs: …
Riscos, bloqueios e próximos passos: …
```

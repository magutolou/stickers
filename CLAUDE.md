# Álbum Copa 2026 — CLAUDE.md

PWA de álbum de figurinhas da Copa do Mundo 2026 (Panini), compartilhado entre dois irmãos sem login tradicional.

## Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** (via plugin Vite, não PostCSS)
- **Supabase** (PostgreSQL + Realtime + RLS)
- **React Router DOM v7**
- **vite-plugin-pwa** — app instalável como PWA

## Estrutura de pastas

```
src/
  components/
    Layout.tsx        # Barra de navegação inferior (5 abas)
    StickerCard.tsx   # Card de figurinha com status visual
    StickerModal.tsx  # Modal de edição de quantidade (eu / irmão)
  pages/
    Welcome.tsx       # Criação/entrada na coleção (sem login)
    Home.tsx          # Dashboard com estatísticas gerais
    Album.tsx         # Navegação por seleções/grupos
    Section.tsx       # Figurinhas de uma seleção com filtros
    Trades.tsx        # Duplicatas disponíveis para troca
    Progress.tsx      # Progresso por grupo
    Config.tsx        # Links de acesso e logout
  lib/
    supabase.ts       # Client Supabase + tipos TypeScript do banco
    auth.ts           # Lógica de token, criação de coleção, localStorage
    types.ts          # Interfaces TypeScript do domínio
  App.tsx             # Roteamento + AuthCtxContext
supabase/
  migrations/
    001_schema.sql    # Tabelas, RLS e realtime
    002_seed_catalog.sql  # Catálogo completo (980 figurinhas, 48 seleções)
```

## Banco de dados (Supabase)

| Tabela | Descrição |
|---|---|
| `teams` | Catálogo de seleções (`id`, `name`, `group`) |
| `stickers` | Catálogo de figurinhas (`id`, `team_id`, `number`, `player_name`, `is_special`) |
| `collections` | Uma coleção por par de irmãos (`owner_token`, `partner_token`) |
| `collection_stickers` | Estado de cada figurinha: `quantity_me`, `quantity_brother` |

- RLS com políticas públicas (anon key) — sem autenticação tradicional
- Realtime habilitado em `collection_stickers` para sync em tempo real

## Autenticação (sem login)

- O dono cria a coleção → gera par de UUIDs (`owner_token` / `partner_token`)
- Cada irmão acessa via link com seu token: `?token=<uuid>`
- `resolveToken()` busca o `collection_id` e o papel (`owner` | `partner`)
- Estado salvo no `localStorage`: `token`, `collectionId`, `role`

## Rotas

**Não autenticado:** apenas `/` (Welcome)

**Autenticado (dentro do Layout):**
- `/home` — dashboard
- `/album` — seleções por grupo
- `/album/:teamId` — figurinhas da seleção
- `/trocas` — duplicatas
- `/progresso` — progresso por grupo
- `/config` — links e logout

## Variáveis de ambiente

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Comandos úteis

```bash
npm run dev      # dev server
npm run build    # build produção
npm run lint     # ESLint
```

## Convenções do projeto

- Interface em **português** (labels, textos, nomes de rotas)
- Design mobile-first, max-width container centralizado
- Cores de status das figurinhas: cinza = falta, azul = só irmão, laranja = só eu, vermelho = duplicata
- 980 figurinhas no total (grupos A–L + seção FWC especial)
- Dois usuários fixos: **EU** (owner) e **IR** (irmão/partner)

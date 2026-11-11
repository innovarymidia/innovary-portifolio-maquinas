# Template Comercial: Locação de Máquinas e Equipamentos para Construção Civil

Template modular em **React + TypeScript + Tailwind CSS** desenvolvido para personalização rápida por clientes do segmento de locação de máquinas pesadas e equipamentos de engenharia civil.

## Como personalizar sem alterar a estrutura

1. **Dados da empresa, contatos e área de atendimento**: edite `src/config/company.ts`.
2. **Categorias e catálogo da frota**: edite `src/config/catalog.ts`.
3. **Textos do Hero, Diferenciais e Processo**: edite `src/config/sections.ts`.
4. **Identidade visual / tokens**: edite `src/config/theme.ts` e `src/index.css`.
5. **Google Analytics 4, GTM e Meta Pixel**: defina `VITE_GA_MEASUREMENT_ID`, `VITE_GTM_ID` e `VITE_META_PIXEL_ID` no `.env` (veja `.env.example`) ou em `src/config/analytics.ts`.

## Publicação em subpasta na Vercel (`/portifolio-maquinas`)

Por padrão, o `vite.config.ts` usa `base: '/portifolio-maquinas/'` e o `vercel.json` mapeia o subcaminho `/portifolio-maquinas`. Para publicar na raiz (`/`) de um domínio próprio, defina `VITE_BASE_PATH=/` nas variáveis de ambiente da Vercel.

No repositório principal (`www.innovarymidia.com.br`), adicione ao `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/portifolio-maquinas",
      "destination": "https://SEU-PROJETO.vercel.app/portifolio-maquinas"
    },
    {
      "source": "/portifolio-maquinas/:path*",
      "destination": "https://SEU-PROJETO.vercel.app/portifolio-maquinas/:path*"
    }
  ]
}
```

## Comandos

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

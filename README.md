# Innovary | Rental Equipment Template (v2)

Template comercial modular em **React + TypeScript + Tailwind CSS** para empresas de **locação de equipamentos para construção, obras e serviços**.

## Arquitetura modular para personalização rápida

- **Configuração de perfil e módulos** ([src/config/template.ts](src/config/template.ts)): ative ou desative seções (`brands`, `categories`, `catalog`, `differentials`, `process`, `quote`), habilite exibição opcional de preços (`showOptionalPrice`) e escolha as categorias visíveis em `enabledCategoryIds` (incluindo `containers` quando fizer parte da operação do cliente).
- **Biblioteca de categorias e catálogo inteligente** ([src/config/catalog.ts](src/config/catalog.ts)): categorias reutilizáveis e produtos com marca, modelo, especificação, unidade de cobrança, disponibilidade e busca integrada.
- **Empresa, marcas e contatos** ([src/config/company.ts](src/config/company.ts)) e **textos de seções** ([src/config/sections.ts](src/config/sections.ts)).
- **Rastreamento configurável** ([src/config/analytics.ts](src/config/analytics.ts) e `.env.example`): suporte a Google Analytics 4, Google Tag Manager e Meta Pixel.

## Versões no Git

- `v1` (`v1.0.0` / `main` atual): versão original de máquinas pesadas em produção na Vercel.
- `v2`: nova versão principal com catálogo modular de equipamentos de construção, obras e serviços.

## Comandos

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

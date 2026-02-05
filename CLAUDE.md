# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

Sanity Studio is available at http://localhost:3000/studio during development.

## Architecture

This is a Next.js 16 landing page with an embedded Sanity CMS Studio.

### Project Structure

- `src/app/` - Next.js App Router pages
  - `page.tsx` - Main landing page composing section components
  - `studio/[[...tool]]/page.tsx` - Embedded Sanity Studio
  - `layout.tsx` - Root layout with Inter font
- `src/components/` - React components
  - `ui/` - Reusable UI primitives (Button, Card, Accordion, Input, Textarea)
  - Section components: Hero, Features, HowItWorks, Testimonials, Pricing, FAQ, FinalCTA, Navigation, Footer
- `src/sanity/` - Sanity CMS configuration
  - `schemaTypes/` - Content schemas (testimonial, faq)
  - `lib/client.ts` - Sanity client for data fetching
  - `lib/image.ts` - Image URL builder (`urlFor` helper)
  - `structure.ts` - Studio structure configuration
  - `env.ts` - Environment variable helpers
- `sanity.config.ts` - Sanity Studio configuration (basePath: `/studio`)
- `sanity.cli.ts` - Sanity CLI configuration

### CMS-Powered Components

Components that fetch from Sanity use client-side fetching with `useEffect`:
- `Testimonials` - Fetches `testimonial` documents, ordered by `order` field
- `FAQ` - Fetches `faq` documents, ordered by `order` field

Both use GROQ queries via `client.fetch()` from `@/sanity/lib/client`.

### Key Patterns

- Path alias: `@/*` maps to `./src/*`
- Styling: Tailwind CSS v4 with `tailwind-merge` and `class-variance-authority`
- Animations: Framer Motion for scroll animations and transitions
- Images: Use `urlFor()` from `@/sanity/lib/image` for Sanity images

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=<your-dataset>
NEXT_PUBLIC_SANITY_API_VERSION=<api-version>  # Optional, defaults to 2026-02-03
```

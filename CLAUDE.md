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
  - `layout.tsx` - Root layout with Inter font and SEO metadata
  - `sitemap.ts` - Dynamic sitemap generation
  - `robots.ts` - Robots.txt configuration
  - `error.tsx` - Error boundary
- `src/components/` - React components
  - `ui/` - Reusable UI primitives (Button, Card, Accordion, Input, Textarea)
  - Section components: Hero, Features, HowItWorks, Testimonials, Pricing, FAQ, FinalCTA, Navigation, Footer
- `src/sanity/` - Sanity CMS configuration
  - `schemaTypes/` - Content schemas
  - `lib/client.ts` - Sanity client for data fetching
  - `lib/image.ts` - Image URL builder (`urlFor` helper)
  - `structure.ts` - Studio structure configuration
  - `env.ts` - Environment variable helpers
- `sanity.config.ts` - Sanity Studio configuration (basePath: `/studio`)
- `sanity.cli.ts` - Sanity CLI configuration

### Sanity Schemas

| Schema | Description | Key Fields |
|--------|-------------|------------|
| `testimonial` | Customer testimonials | quote, author, role, company, avatar, order |
| `faq` | FAQ items (rich text answers) | question, answer (portable text), order |
| `feature` | Product features | title, description, icon (select), order |
| `pricingPlan` | Pricing tiers | name, description, price, features[], ctaText, popular, order |
| `heroContent` | Hero section (singleton) | headline, subheadline, buttons, heroImage, socialProofText, companyLogos[] |

### CMS-Powered Components

All section components fetch from Sanity with client-side `useEffect`:
- `Hero` - Fetches `heroContent` (singleton, takes first document)
- `Features` - Fetches `feature` documents
- `Testimonials` - Fetches `testimonial` documents
- `Pricing` - Fetches `pricingPlan` documents
- `FAQ` - Fetches `faq` documents (renders portable text)

Each component includes:
- Loading skeletons during fetch
- Error handling with console logging
- Fallback to hardcoded defaults if CMS is empty

### Key Patterns

- Path alias: `@/*` maps to `./src/*`
- Styling: Tailwind CSS v4 with `tailwind-merge` and `class-variance-authority`
- Animations: Framer Motion for scroll animations and transitions
- Images: Use `urlFor()` from `@/sanity/lib/image` for Sanity images
- Rich text: Use `PortableText` from `next-sanity` for portable text fields
- Icons: Feature icons use string identifiers mapped to react-icons (`iconMap` in features.tsx)

### Environment Variables

Required in `.env.local` (see `.env.example`):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=<your-dataset>
NEXT_PUBLIC_SITE_URL=<your-production-url>  # For SEO/sitemap
```

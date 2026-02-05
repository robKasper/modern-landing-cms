# Modern Landing CMS

A modern landing page built with Next.js and Sanity CMS. Features a complete marketing site with CMS-managed testimonials and FAQs.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity (embedded Studio)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+
- A Sanity project (create one at [sanity.io](https://www.sanity.io))

### Setup

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) for the landing page

6. Open [http://localhost:3000/studio](http://localhost:3000/studio) for the Sanity Studio

## Content Management

The Sanity Studio at `/studio` allows you to manage:

- **Testimonials**: Customer quotes with author info and avatars
- **FAQs**: Question and answer pairs

Content is ordered by the `order` field in each document.

## Project Structure

```
src/
├── app/                  # Next.js pages
│   ├── page.tsx          # Landing page
│   └── studio/           # Embedded Sanity Studio
├── components/           # React components
│   └── ui/               # Reusable UI primitives
└── sanity/
    ├── schemaTypes/      # Content schemas
    └── lib/              # Sanity client & utilities
```

## Deployment

Deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/robKasper/modern-landing-cms)

Remember to add your environment variables in the Vercel dashboard.

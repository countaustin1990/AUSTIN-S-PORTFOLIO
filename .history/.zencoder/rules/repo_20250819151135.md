---
description: Repository Information Overview
alwaysApply: true
---

# Augustine's Portfolio Information

## Summary
A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS. The site showcases Augustine Akpokonyan's work as a web developer and includes an AI-powered chatbot assistant that uses OpenAI's API.

## Structure
- **app/**: Next.js app directory containing page components and API routes
- **components/**: React components organized by UI, layout, and sections
- **public/**: Static assets including images
- **lib/**: Utility functions and shared code
- **hooks/**: Custom React hooks

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.2.2
**Framework**: Next.js 13.5.1
**Build System**: Next.js build system
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- React 18.2.0
- Next.js 13.5.1
- Tailwind CSS 3.3.3
- Framer Motion 11.1.10
- OpenAI SDK 4.28.0
- Radix UI components (various)
- next-themes 0.3.0
- ai 2.2.35
- zod 3.23.8

**Development Dependencies**:
- ESLint 8.49.0
- TypeScript 5.2.2
- Autoprefixer 10.4.15
- PostCSS 8.4.30

## Build & Installation
```bash
npm install
npm run build
npm start
```

## Configuration
**Next.js Config**: Static export with ESLint ignored during builds and unoptimized images
**TypeScript Config**: ES5 target with strict type checking
**Tailwind Config**: Custom theme with extended color palette and animations

## API Integration
**OpenAI API**: Integrated for the chatbot functionality with fallback model options
**Environment Variables**: OPENAI_API_KEY required for API access

## Main Components
**Pages**:
- Home page with sections for Hero, About, Skills, Projects, and Contact

**Key Features**:
- Interactive UI with dark/light mode support
- AI-powered chatbot assistant
- Responsive design with Tailwind CSS
- Animated components using Framer Motion

## Entry Points
**Main**: app/page.tsx (Home page)
**Layout**: app/layout.tsx (Root layout with theme provider)
**API Routes**: app/api/chat/route.ts (OpenAI integration)
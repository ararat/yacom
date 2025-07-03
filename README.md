# Yuval Ararat's Personal Website

A modern, high-performance personal portfolio and blog built with Next.js, TypeScript, and optimized for Cloudflare Pages deployment.

[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](./coverage)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](./tsconfig.json)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.21-black.svg)](https://nextjs.org/)

## 🏗️ Architecture Overview

This is a static site generator (SSG) built with Next.js that exports to static files for optimal performance on Cloudflare Pages. The architecture follows modern React patterns with comprehensive TypeScript support and 100% test coverage.

### Key Features

- **🚀 Static Site Generation**: Pre-rendered at build time for maximum performance
- **🖼️ Cloudflare Image Optimization**: Custom image loader using Cloudflare Workers
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **♿ Accessibility**: WCAG compliant with semantic HTML
- **🔍 Full-Text Search**: Real-time blog post filtering
- **📊 SEO Optimized**: Automated sitemap generation and meta tags
- **🧪 100% Test Coverage**: Comprehensive Jest and React Testing Library setup
- **🔒 Security Headers**: CSP and security headers for production

## 📁 Project Structure

```
yacom/
├── 📁 components/           # Reusable React components
│   ├── BlogPost.tsx         # Individual blog post card
│   ├── BlogSection.tsx      # Blog listing with search and infinite scroll
│   ├── Navigation.tsx       # Polymorphic navigation (standard/blog variants)
│   ├── MarkdownContentComponent.tsx  # Routes to appropriate section type
│   ├── StandardSection.tsx  # Regular content sections
│   ├── VideoBackgroundSection.tsx   # Hero sections with video backgrounds
│   └── image.tsx           # Custom image component with Cloudflare optimization
├── 📁 content/             # Markdown content for main sections
│   ├── hero.md             # Homepage hero section
│   ├── about.md            # About section content
│   └── expertise.md        # Expertise section content
├── 📁 posts/               # Blog posts in Markdown format
│   └── *.md                # Individual blog posts with frontmatter
├── 📁 pages/               # Next.js pages (App Router)
│   ├── index.tsx           # Homepage with all sections
│   ├── blog/[slug].tsx     # Dynamic blog post pages
│   ├── _app.tsx            # App wrapper with global styles
│   └── _document.tsx       # Custom document with meta tags
├── 📁 lib/                 # Utility functions and constants
│   ├── contentLoader.ts    # Markdown content loading utilities
│   ├── constants.ts        # Application constants (breakpoints, etc.)
│   └── markdownComponents.tsx  # Custom markdown component renderers
├── 📁 hooks/               # Custom React hooks
│   ├── useContentHeight.ts # Calculates available content height
│   └── useExpandedState.ts # Manages expand/collapse functionality
├── 📁 scripts/             # Build scripts
│   └── generate-sitemap.js # Automated sitemap generation
├── 📁 data/                # Configuration files
│   └── config.json         # Site configuration (title, description, etc.)
├── 📁 public/              # Static assets
│   ├── img/                # Images and favicons
│   ├── vid/                # Video assets
│   └── _headers            # Cloudflare security headers
└── 📁 __tests__/           # Comprehensive test suite (100% coverage)
    ├── components/         # Component tests
    ├── hooks/              # Hook tests
    ├── lib/                # Utility tests
    └── pages/              # Page tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ararat/yacom.git
   cd yacom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server (after build)
npm run lint         # Run ESLint
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## 📝 Content Management

### Adding/Editing Main Sections

Main page sections are managed through markdown files in the `content/` directory:

1. **Hero Section** (`content/hero.md`)
   ```markdown
   ---
   title: "Welcome"
   subtitle: "Your subtitle here"
   ---
   
   # Your hero content
   
   Main hero text content goes here...
   ```

2. **About Section** (`content/about.md`)
   ```markdown
   ---
   title: "About Me"
   ---
   
   # About
   
   Your about content...
   ```

3. **Expertise Section** (`content/expertise.md`)
   ```markdown
   ---
   title: "My Expertise"
   ---
   
   # Expertise
   
   Your expertise content...
   ```

### Navigation Configuration

Navigation is configured in `pages/index.tsx` through the `SECTIONS_CONFIG` array:

```typescript
const SECTIONS_CONFIG: SectionConfig[] = [
  {
    id: "welcome",                    // URL anchor (/#welcome)
    navTitle: "Welcome",              // Navigation link text
    backgroundColor: "bg-amber-600",  // Tailwind background class
    contentFile: "hero",              // Corresponds to content/hero.md
    backgroundVideo: "/vid/site-intro.mp4", // Optional video background
    videoPoster: "/img/yuval-ararat.png",   // Video poster image
    enabled: true,                    // Show/hide section
    hideFromNav: false               // Show/hide from navigation
  },
  {
    id: "about",
    navTitle: "About",
    backgroundColor: "bg-lime-100",
    contentFile: "about",             // Corresponds to content/about.md
    hasImage: true,                   // Enable image display
    imageConfig: {
      src: "/img/yuval-ararat.png",
      alt: "Yuval Ararat",
      width: "200",
      height: "160"
    },
    enabled: true,
    hideFromNav: false
  }
]
```

#### Section Configuration Options

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier and URL anchor |
| `navTitle` | string | Text displayed in navigation |
| `backgroundColor` | string | Tailwind CSS background class |
| `textColor` | string (optional) | Tailwind CSS text color class |
| `contentFile` | string | Markdown file name (without .md) |
| `hasImage` | boolean (optional) | Enable image display |
| `imageConfig` | object (optional) | Image configuration |
| `backgroundVideo` | string (optional) | Path to background video |
| `videoPoster` | string (optional) | Video poster image |
| `enabled` | boolean | Show/hide section |
| `hideFromNav` | boolean (optional) | Hide from navigation menu |

### Creating Blog Posts

Blog posts are markdown files in the `posts/` directory with frontmatter metadata:

1. **Create a new file** in `posts/` directory:
   ```
   posts/2024-01-my-new-post.md
   ```

2. **Add frontmatter and content**:
   ```markdown
   ---
   title: 'My New Blog Post'
   date: '2024-01-15T10:30:00+12:00'
   status: published
   author: 'Yuval Ararat'
   excerpt: 'A brief description of your post for SEO and previews'
   thumbnail: '/img/blog/my-post-thumbnail.jpg'
   category:
     - 'Technology'
     - 'Engineering'
   tags:
     - react
     - nextjs
     - typescript
   ---
   
   # Your Blog Post Title
   
   Your blog content goes here. You can use:
   
   ## Subheadings
   
   - Lists
   - **Bold text**
   - *Italic text*
   - [Links](https://example.com)
   
   ```javascript
   // Code blocks
   const example = 'Hello World';
   ```
   
   > Blockquotes for important notes
   ```

3. **Required Frontmatter Fields**:
   - `title`: Post title (displayed in navigation and cards)
   - `date`: Publication date (ISO 8601 format)
   - `excerpt`: Brief description for SEO and post previews

4. **Optional Frontmatter Fields**:
   - `thumbnail`: Featured image for post card
   - `author`: Post author
   - `category`: Array of categories
   - `tags`: Array of tags for search functionality
   - `status`: `published` or `private` (private posts won't appear)

### Blog Post Search

The blog section includes real-time search functionality that searches across:
- Post titles
- Post descriptions/excerpts
- Post tags

Search is case-insensitive and provides instant results with result count display.

## 🎨 Styling and Theming

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom configuration in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      typography: {
        // Custom prose styles for blog posts
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
```

### Color Scheme

The site uses a carefully selected color palette:
- **Primary Colors**: Amber, Lime, Cyan, Slate
- **Text**: Gray scale with proper contrast ratios
- **Backgrounds**: Gradient-friendly colors for sections

### Responsive Breakpoints

```typescript
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
```

## 🖼️ Image Optimization

### Cloudflare Image Optimization

The custom image component (`components/image.tsx`) leverages Cloudflare Workers for optimal image delivery:

```typescript
const cloudflareImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://image-resize.yuvalararat.workers.dev?width=${width}&quality=${quality}&image=${process.env.site_address}${src}`
}
```

### Image Usage

```jsx
import Img from '../components/image'

<Img
  src="/img/my-image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  priority={false} // Set to true for above-fold images
/>
```

### Image Optimization Benefits

- **Automatic format selection**: WebP/AVIF when supported
- **Responsive sizing**: Automatic width optimization
- **Lazy loading**: Built-in intersection observer
- **Quality optimization**: Automatic quality adjustment
- **CDN delivery**: Global edge cache

## 🔧 Configuration

### Environment Variables

Set in `next.config.js`:

```javascript
module.exports = {
  env: {
    site_address: "https://yacom.pages.dev",    // Development URL
    WEBSITE_URL: "https://yuvalararat.com",     // Production URL
  }
}
```

### Site Configuration

Edit `data/config.json`:

```json
{
  "title": "Your Name",
  "description": "Your site description",
  "repositoryUrl": "https://github.com/yourusername"
}
```

### Security Headers

Security headers are configured in `public/_headers` for Cloudflare Pages:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.adobe.com *.omtrdc.net *.demdex.net *.everesttech.net; connect-src 'self' *.adobe.com *.omtrdc.net *.demdex.net *.everesttech.net *.adobedc.net wss:; img-src 'self' data: https: *.adobe.com *.omtrdc.net *.demdex.net *.everesttech.net; style-src 'self' 'unsafe-inline' *.adobe.com; font-src 'self' data: *.adobe.com; frame-src 'self' *.adobe.com; worker-src 'self'; object-src 'none'; base-uri 'self'
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
```

## 🚀 Deployment

### Cloudflare Pages Deployment

1. **Build the site**:
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `out`
   - Set Node.js version: `18` or higher

### Build Process

The build process includes:

1. **Static generation**: All pages pre-rendered as HTML
2. **Sitemap generation**: Automatic sitemap.xml creation
3. **CSS optimization**: PurgeCSS removes unused styles
4. **Asset optimization**: Images and other assets optimized
5. **Bundle analysis**: Webpack bundle optimization

### Performance Optimizations

- **Static export**: Zero server-side overhead
- **Image optimization**: Cloudflare Workers processing
- **CSS purging**: Remove unused Tailwind classes
- **Bundle splitting**: Optimized JavaScript chunks
- **Preloading**: Critical resources preloaded
- **Compression**: Gzip/Brotli compression via Cloudflare

## 🧪 Testing

### Test Coverage

The project maintains 100% test coverage across:

- **Components**: All React components tested
- **Hooks**: Custom hooks with full coverage
- **Utilities**: All utility functions tested
- **Pages**: Page components and routing tested

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
__tests__/
├── components/          # Component unit tests
│   ├── BlogPost.test.tsx
│   ├── Navigation.test.tsx
│   └── ...
├── hooks/               # Custom hook tests
│   ├── useContentHeight.test.ts
│   └── useExpandedState.test.ts
├── lib/                 # Utility function tests
│   ├── contentLoader.test.ts
│   └── constants.test.ts
└── pages/               # Page component tests
    ├── index.test.tsx
    └── blog/
        └── [slug].test.tsx
```

### Testing Philosophy

- **Unit Testing**: Every component and function tested in isolation
- **Integration Testing**: Component interactions tested
- **Accessibility Testing**: ARIA attributes and semantic HTML verified
- **Performance Testing**: Hook behavior and optimization tested

## 🔍 SEO and Analytics

### SEO Features

- **Automated Sitemap**: Generated during build process
- **Meta Tags**: Proper title and description tags
- **Semantic HTML**: Proper heading hierarchy and structure
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for better search engine understanding

### Analytics Integration

- **Adobe DTM**: Analytics and tag management
- **Core Web Vitals**: Performance monitoring ready
- **Custom Events**: Track user interactions and behavior

## 🛠️ Development

### Code Quality

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Code formatting (configure as needed)
- **Husky**: Git hooks for pre-commit validation

### Architecture Patterns

- **Component Composition**: Modular, reusable components
- **Custom Hooks**: Reusable stateful logic
- **Polymorphic Components**: Single component with multiple variants
- **Static Site Generation**: Pre-rendered content for performance
- **Progressive Enhancement**: Core functionality without JavaScript

### Performance Monitoring

Monitor these key metrics:
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Size**: Keep JavaScript bundles optimized
- **Image Performance**: Monitor Cloudflare optimization
- **Build Time**: Track build performance

## 📋 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make your changes** with appropriate tests
4. **Run the test suite**: `npm test`
5. **Submit a pull request**

### Development Guidelines

- Maintain 100% test coverage
- Follow TypeScript best practices
- Use semantic commit messages
- Update documentation for new features
- Ensure accessibility compliance

## 🔗 Links

- **Live Site**: [https://yuvalararat.com](https://yuvalararat.com)
- **Development**: [https://yacom.pages.dev](https://yacom.pages.dev)
- **Repository**: [https://github.com/ararat/yacom](https://github.com/ararat/yacom)

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
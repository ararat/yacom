---
title: 'Building a Modern Portfolio with Next.js and Cloudflare Pages'
date: '2024-07-03T15:30:00+12:00'
status: published
author: 'Yuval Ararat'
excerpt: 'A deep dive into building a high-performance personal portfolio using Next.js, TypeScript, and Cloudflare Pages, with 100% test coverage and modern web practices.'
thumbnail: '/img/blog/blog-thumbnail.jpeg'
category:
  - 'Web Development'
  - 'Performance'
  - 'Architecture'
tags:
  - nextjs
  - typescript
  - cloudflare
  - performance
  - testing
  - static-site-generation
---

# Building a Modern Portfolio with Next.js and Cloudflare Pages

After years of wrestling with WordPress and its inevitable complexity creep, I decided to build my personal portfolio from scratch. What started as a simple "get my content back online" project evolved into a comprehensive exploration of modern web development practices. Here's the story of building a high-performance, fully tested portfolio that leverages the best of static site generation and edge computing.

## The Problem with Traditional CMSs

WordPress served me well for years, but as any engineer knows, complexity has a way of accumulating. Plugin conflicts, security updates, database maintenance, and the constant battle against technical debt were consuming time I'd rather spend on content creation and actual engineering work.

The final straw came when I realized I was spending more time maintaining the CMS than actually writing. It was time for a change.

## Design Principles

Before writing a single line of code, I established clear principles for the new site:

### 1. Performance First
- Static site generation for zero server-side overhead
- Edge optimization through Cloudflare
- Aggressive caching and asset optimization
- Mobile-first responsive design

### 2. Developer Experience
- TypeScript for type safety and better tooling
- 100% test coverage for confidence in changes
- Hot reloading and fast development cycles
- Clear separation of concerns

### 3. Content-Focused
- Markdown-based content management
- No database dependencies
- Version-controlled content
- Simple blog post creation workflow

### 4. Future-Proof Architecture
- Modern React patterns with hooks
- Component composition over inheritance
- Progressive enhancement
- Extensible design patterns

## Technology Stack

### Core Framework: Next.js 14
Next.js was the obvious choice for its excellent static site generation capabilities, built-in optimizations, and mature ecosystem. The ability to pre-render pages at build time while maintaining the flexibility of React components was exactly what I needed.

```typescript
// next.config.js
module.exports = {
  output: "export",  // Static export for Cloudflare Pages
  images: {
    loader: "imgix",
    path: "/",
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-sitemap.js");
    }
    return config;
  },
};
```

### TypeScript for Type Safety
TypeScript brings compile-time error checking and excellent IDE support. Every component, hook, and utility function is fully typed, making refactoring safe and development more predictable.

```typescript
interface SectionConfig {
  id: string;
  navTitle: string;
  backgroundColor: string;
  contentFile: string;
  backgroundVideo?: string;
  enabled: boolean;
}
```

### Cloudflare Pages for Deployment
Cloudflare Pages provides excellent performance through global edge distribution, while Cloudflare Workers enable custom image optimization. The combination delivers sub-second load times globally.

### Tailwind CSS for Styling
Tailwind's utility-first approach keeps CSS maintainable while enabling rapid development. The built-in purging removes unused styles in production, keeping bundle sizes minimal.

## Architecture Deep Dive

### Component Architecture
The site uses a component composition pattern with clear separation of concerns:

```typescript
// Polymorphic navigation component
<Navigation 
  variant="standard"  // or "blogPost"
  sections={sections}
  SiteTitle={title}
/>
```

This approach allows the same component to handle different layouts while maintaining a single source of truth for navigation logic.

### Content Management Strategy
Content is managed through a hybrid approach:

1. **Main Sections**: Markdown files in `/content/` directory
2. **Blog Posts**: Individual markdown files in `/posts/` with frontmatter
3. **Configuration**: JSON-based site configuration
4. **Navigation**: Code-based configuration for type safety

```markdown
---
title: 'My Blog Post'
date: '2024-07-03T15:30:00+12:00'
excerpt: 'Brief description for SEO'
tags: ['nextjs', 'typescript']
---

# Your Content Here
```

This approach provides the flexibility of a headless CMS while maintaining the simplicity of file-based management.

### Performance Optimizations

#### Custom Image Optimization
Instead of relying on Next.js image optimization (which doesn't work with static exports), I implemented a custom solution using Cloudflare Workers:

```typescript
const cloudflareImageLoader = ({ src, width, quality }) => {
  return `https://image-resize.yuvalararat.workers.dev?width=${width}&quality=${quality}&image=${process.env.site_address}${src}`
}
```

This provides:
- Automatic format selection (WebP/AVIF)
- Responsive sizing
- Quality optimization
- Global CDN delivery

#### Bundle Optimization
PostCSS with PurgeCSS removes unused Tailwind classes:

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    'tailwindcss',
    process.env.NODE_ENV === 'production' ?
      ['@fullhuman/postcss-purgecss', {
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
        ],
      }] : undefined,
  ],
}
```

This typically reduces CSS bundle size by 90%+ in production.

#### Static Site Generation
Every page is pre-rendered at build time, including dynamic blog post routes:

```typescript
export async function getStaticPaths() {
  const files = fs.readdirSync('posts')
  const paths = files.map(filename => ({
    params: { slug: filename.replace('.md', '') }
  }))
  
  return { paths, fallback: false }
}
```

## Testing Strategy

### 100% Test Coverage
One of the project's key requirements was comprehensive test coverage. This provides confidence when refactoring and ensures all edge cases are handled.

```typescript
// Example component test
describe('BlogPost', () => {
  test('should render with correct props', () => {
    const { getByRole } = render(<BlogPost {...props} />)
    const article = getByRole('article')
    expect(article).toBeInTheDocument()
  })
})
```

The test suite includes:
- Component unit tests
- Custom hook tests
- Utility function tests
- Page integration tests
- Accessibility tests

### Testing Infrastructure
Jest with React Testing Library provides a solid foundation:

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
```

This strict coverage requirement ensures no code paths are left untested.

## User Experience Considerations

### Mobile-First Design
The site is built mobile-first with progressive enhancement for larger screens. Touch targets meet accessibility guidelines, and the navigation adapts seamlessly across devices.

### Performance Budget
Core Web Vitals are a priority:
- **LCP**: Under 1.5s through image optimization and static generation
- **FID**: Minimal JavaScript and efficient event handlers
- **CLS**: Proper image dimensions and layout stability

### Accessibility
WCAG 2.1 AA compliance through:
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast ratios

## Content Strategy

### Blog System
The blog system supports:
- Full-text search across titles, descriptions, and tags
- Infinite scroll for performance
- Responsive card layout
- SEO-optimized individual post pages

### Search Implementation
Real-time search with debouncing provides instant results:

```typescript
useEffect(() => {
  const searchLower = searchTerm.toLowerCase();
  const filtered = posts.filter(post => {
    const title = post.frontMatter.title?.toLowerCase() || '';
    const description = post.frontMatter.description?.toLowerCase() || '';
    const tags = post.frontMatter.tags?.toLowerCase() || '';
    
    return title.includes(searchLower) || 
           description.includes(searchLower) || 
           tags.includes(searchLower);
  });
  
  setFilteredPosts(filtered);
}, [searchTerm, posts]);
```

## Deployment and CI/CD

### Cloudflare Pages Integration
The deployment process is fully automated:

1. Code push triggers build on Cloudflare Pages
2. Sitemap generation during webpack build
3. Static export to `/out` directory
4. Global distribution through Cloudflare edge network

### Security Headers
Production security through Cloudflare headers:

```
Content-Security-Policy: default-src 'self'; ...
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
```

## Lessons Learned

### 1. TypeScript Pays Dividends
The upfront investment in TypeScript interfaces and proper typing paid off immediately during development. Refactoring became fearless, and bugs were caught at compile time rather than runtime.

### 2. Test Coverage Drives Design
The 100% coverage requirement forced better component design. Components became more focused and easier to test, leading to better overall architecture.

### 3. Performance is a Feature
Users notice fast sites. The combination of static generation, edge distribution, and optimized assets creates a noticeably snappy experience.

### 4. Simplicity Scales
The markdown-based content system might seem limiting compared to a full CMS, but it's actually liberating. Version control, easy backups, and fast builds more than compensate for the reduced complexity.

## Performance Results

The results speak for themselves:

- **Lighthouse Score**: 100/100/100/100 (Performance/Accessibility/Best Practices/SEO)
- **First Contentful Paint**: < 0.8s
- **Time to Interactive**: < 1.2s
- **Total Blocking Time**: < 50ms
- **Bundle Size**: < 100KB gzipped

## Future Enhancements

The architecture supports several planned enhancements:

### Dark Mode
Theme switching with localStorage persistence and system preference detection.

### Advanced Search
Fuzzy search, tag filtering, and search analytics.

### Performance Monitoring
Core Web Vitals tracking and performance regression detection.

### Service Worker
Offline capability and background sync for better progressive web app features.

## Conclusion

Building this portfolio from scratch was both a learning experience and a practical solution to content management fatigue. The combination of modern tooling, thoughtful architecture, and performance optimization created a platform that's both enjoyable to develop and fast for users.

The key takeaways:

1. **Static site generation** provides unbeatable performance for content-focused sites
2. **TypeScript and testing** create a foundation for confident development
3. **Edge computing** through Cloudflare transforms the user experience
4. **Simple content management** can be more powerful than complex CMSs

For engineers tired of CMS complexity, this approach offers a path back to fundamentals while embracing modern web development practices. The code is the documentation, the tests are the specification, and the performance speaks for itself.

The journey from WordPress to this custom solution wasn't just about technology choices—it was about reclaiming the joy of web development while delivering an exceptional user experience. Mission accomplished.

---

*The complete source code and documentation for this project is available in the repository. Feel free to explore the implementation details and adapt the patterns for your own projects.*
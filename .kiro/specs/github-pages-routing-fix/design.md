# Design Document - GitHub Pages Routing Fix

## Overview

This design addresses the GitHub Pages static hosting limitation where dynamic routes (`[id].astro`) are not properly generated as static pages. The solution ensures all framework, vector database, and protocol pages are pre-generated during build time while maintaining compatibility with other deployment platforms.

## Architecture

### Current Problem Analysis

**Issue:** Astro's `getStaticPaths()` functions in dynamic routes are not properly generating static HTML files during the GitHub Pages build process.

**Root Cause:** The build configuration may not be optimized for static site generation, or there are issues with YAML data loading during the build process.

**Impact:** Users cannot access detail pages directly via URL on GitHub Pages, breaking navigation and user experience.

### Solution Architecture

The solution implements a **Static Site Generation (SSG)** approach that:
1. Ensures all dynamic routes are pre-generated at build time
2. Maintains current code structure and development workflow
3. Provides compatibility across all deployment platforms
4. Preserves all existing functionality and content

## Components and Interfaces

### Component 1: Build Configuration Enhancement

**Purpose:** Ensure Astro properly generates static pages for all dynamic routes

**Implementation:**
- Update `astro.config.mjs` with explicit static site generation settings
- Configure proper output mode for GitHub Pages compatibility
- Ensure YAML plugin integration works correctly during build

**Interface:**
```javascript
export default defineConfig({
  site: 'https://con-fucius.github.io',
  base: '/ai-ml-research-hub',
  output: 'static', // Explicit static generation
  // Additional SSG optimizations
});
```

### Component 2: Dynamic Route Validation

**Purpose:** Verify that all `getStaticPaths()` functions properly return all required paths

**Implementation:**
- Audit `src/pages/frameworks/[id].astro` for proper path generation
- Audit `src/pages/vector_databases/[id].astro` for proper path generation  
- Audit `src/pages/protocols/[id].astro` for proper path generation
- Ensure YAML data loading works correctly in build environment

**Interface:**
```javascript
export async function getStaticPaths() {
  const ymlFiles = await import.meta.glob('../../../_data/category/*.yml');
  // Ensure all files are properly loaded and paths generated
  return paths;
}
```

### Component 3: YAML Data Loading Verification

**Purpose:** Ensure all YAML data files are properly loaded during build process

**Implementation:**
- Verify `@rollup/plugin-yaml` configuration
- Test YAML file imports in build environment
- Ensure all data files are accessible during static generation
- Add error handling for missing or malformed data

**Interface:**
```javascript
// Robust YAML loading with error handling
const ymlFiles = await import.meta.glob('../../../_data/category/*.yml', { eager: true });
const items = Object.values(ymlFiles).map(mod => mod.default).filter(Boolean);
```

### Component 4: Navigation Link Updates

**Purpose:** Ensure all internal navigation uses correct static paths

**Implementation:**
- Verify home page links point to correct static routes
- Update breadcrumb navigation if needed
- Ensure all internal links use proper path structure
- Test navigation flow between all pages

**Interface:**
```astro
<!-- Ensure links match generated static paths -->
<a href={`/frameworks/${item.id}/`}>{item.name}</a>
```

### Component 5: Build Verification System

**Purpose:** Validate that all expected pages are generated during build

**Implementation:**
- Create build verification script
- Check that all expected HTML files are generated
- Validate content rendering in generated pages
- Ensure no broken links in build output

## Data Models

### Static Path Generation Model

```typescript
interface StaticPath {
  params: {
    id: string; // Matches YAML file id field
  };
  props: {
    item: FrameworkData | VectorDBData | ProtocolData;
  };
}
```

### YAML Data Model Validation

```typescript
interface BaseItem {
  id: string; // Required for path generation
  name: string;
  summary: string;
  // Additional fields vary by category
}
```

### Build Output Model

```
dist/
├── index.html
├── frameworks/
│   ├── langchain/
│   │   └── index.html
│   ├── crewai/
│   │   └── index.html
│   └── [other frameworks]/
├── vector_databases/
│   ├── weaviate/
│   │   └── index.html
│   └── [other databases]/
└── protocols/
    ├── mcp/
    │   └── index.html
    └── [other protocols]/
```

## Error Handling

### Build-Time Error Handling

1. **Missing YAML Files:**
   - Graceful handling of missing data files
   - Clear error messages during build
   - Fallback content for missing items

2. **Malformed YAML Data:**
   - Validation of required fields
   - Error reporting for invalid data
   - Build failure prevention

3. **Path Generation Failures:**
   - Logging of failed path generation
   - Identification of problematic data
   - Recovery mechanisms

### Runtime Error Handling

1. **Missing Content:**
   - Fallback content for missing sections
   - Graceful degradation of features
   - User-friendly error messages

2. **Navigation Failures:**
   - 404 page handling
   - Redirect mechanisms for old URLs
   - Breadcrumb fallbacks

## Testing Strategy

### Build Testing

1. **Local Build Verification:**
   - Test `npm run build` locally
   - Verify all expected files are generated
   - Check content accuracy in generated pages

2. **GitHub Actions Testing:**
   - Monitor build logs for errors
   - Verify successful deployment
   - Test page accessibility post-deployment

### Functional Testing

1. **Navigation Testing:**
   - Test all links from home page
   - Verify breadcrumb navigation
   - Test direct URL access

2. **Content Testing:**
   - Verify all YAML data renders correctly
   - Test code syntax highlighting
   - Validate responsive design

3. **Cross-Platform Testing:**
   - Test on GitHub Pages
   - Verify Vercel compatibility
   - Test local development server

### Performance Testing

1. **Page Load Testing:**
   - Measure page load times
   - Test on various connection speeds
   - Verify mobile performance

2. **Build Performance:**
   - Monitor build time
   - Check build output size
   - Verify efficient asset loading

## Implementation Phases

### Phase 1: Diagnosis and Configuration
- Analyze current build output
- Update Astro configuration for optimal SSG
- Fix YAML plugin integration issues

### Phase 2: Route Generation Fix
- Audit and fix all `getStaticPaths()` functions
- Ensure proper YAML data loading
- Test path generation locally

### Phase 3: Build and Deploy
- Test complete build process
- Deploy to GitHub Pages
- Verify all pages are accessible

### Phase 4: Validation and Testing
- Comprehensive testing of all functionality
- Performance optimization
- Cross-platform compatibility verification

## Success Criteria

1. **All Pages Accessible:** Every framework, vector database, and protocol page loads correctly via direct URL
2. **Navigation Works:** All internal links function properly
3. **Content Renders:** All YAML data displays correctly with proper formatting
4. **Platform Compatible:** Works on GitHub Pages, Vercel, and other platforms without changes
5. **Performance Maintained:** Page load times remain optimal
6. **SEO Ready:** All pages are properly indexed and shareable

This design ensures a robust, maintainable solution that resolves the GitHub Pages routing issues while preserving all existing functionality and maintaining deployment flexibility.
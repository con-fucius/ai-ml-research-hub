# Technical Debt & Refactoring Tasks

## Overview
This document tracks all technical debt, postponed features, and refactoring tasks identified during the development of the AI Research Hub. These items should be addressed after completing all content sections (Frameworks, Vector Databases, Protocols).

---

## 1. Code Refactoring & Optimization

### 1.1 Template Efficiency - HIGH PRIORITY
**Issue:** The framework template uses inefficient conditional checks and hardcoded field names
- **Current Problem:** 
  - Bloated conditional check with 8+ field names just to show Official Resources section
  - 25+ individual conditional statements for each link type
  - 100+ lines of repetitive code in template
  - Every new framework requires template modifications
- **Solution:** Implement dynamic approach that loops through framework properties ending with "Url"
- **Benefits:** Reduce template size by ~80%, self-maintaining, better performance
- **Files Affected:** `src/pages/frameworks/[id].astro`

### 1.2 Apply Template Refactoring to All Sections
**Task:** Once framework template is refactored, apply same dynamic approach to:
- Vector Databases template (`src/pages/vector_databases/[id].astro`)
- Protocols template (`src/pages/protocols/[id].astro`)
- **Goal:** Consistent, efficient templates across all sections

---

## 2. Code Syntax Highlighting Enhancement

### 2.1 Syntax Highlighting Colors - MEDIUM PRIORITY
**Current Status:** Code blocks have professional dark background but no syntax highlighting colors
- **Issue:** Need JavaScript library (Prism.js or highlight.js) to parse code and apply color classes
- **Options:**
  - **Prism.js** - Lightweight, good performance, recommended
  - **highlight.js** - More languages, heavier
  - **Keep current** - Clean, fast, no dependencies
- **Decision Needed:** Whether to add external dependency or maintain current clean approach
- **Files Affected:** `src/pages/frameworks/[id].astro`, layout files

### 2.2 Ubuntu Font Verification
**Status:** Ubuntu Mono font is properly loaded but needs verification across all browsers
- **Current:** Font family correctly applied: `'Ubuntu Mono', 'Consolas', 'Monaco', monospace`
- **Task:** Test font rendering across different browsers and devices
- **Fallback:** Ensure graceful degradation to Consolas/Monaco if Ubuntu Mono fails to load

---

## 3. Visual Enhancements & Polish

### 3.1 Card Text Repositioning - LOW PRIORITY
**Issue:** Some framework cards have text positioning issues (Google ADK, Agent Communication Protocol)
- **Status:** Skipped during development as suggested due to complexity
- **Solution:** Implement CSS positioning that maintains responsiveness
- **Files Affected:** `src/pages/index.astro` card styling

### 3.2 Enhanced Visual Features - FUTURE ENHANCEMENTS
**Completed Visual Enhancements:**
- ✅ Enhanced card hover effects (scale + shadows)
- ✅ Code blocks with copy buttons and language labels
- ✅ Timeline with colored dots and connecting lines
- ✅ Navigation improvements with hover effects
- ✅ Fade-in animations and smooth scrolling
- ✅ Typography enhancements with text shadows
- ✅ Sticky navigation and back-to-top button
- ✅ Interactive copy functionality

**Potential Future Enhancements:**
- Search functionality across all content
- Filter buttons for frameworks/databases/protocols
- Expandable sections for long content
- Better mobile responsiveness optimization
- Loading skeleton animations

---

## 4. Content & Data Improvements

### 4.1 Content Verification
**Task:** Review all populated content for accuracy and completeness
- Verify all 67 official resource links are working
- Check all timeline dates and events for accuracy
- Validate all code examples for syntax correctness
- Ensure consistent formatting across all sections

### 4.2 SEO & Meta Optimization
**Task:** Add proper meta tags, descriptions, and SEO optimization
- Page titles and descriptions
- Open Graph tags for social sharing
- Structured data markup
- Sitemap generation

---

## 5. Performance & Deployment

### 5.1 Performance Optimization
**Tasks:**
- Optimize image loading and compression
- Minimize CSS and JavaScript bundles
- Implement proper caching strategies
- Analyze and optimize Core Web Vitals

### 5.2 Deployment Preparation
**Tasks:**
- Configure production build settings
- Set up deployment pipeline
- Configure domain and hosting
- Implement analytics and monitoring

---

## 6. Testing & Quality Assurance

### 6.1 Cross-Browser Testing
**Task:** Test website across all major browsers and devices
- Chrome, Firefox, Safari, Edge
- Mobile devices (iOS, Android)
- Tablet responsiveness
- Accessibility compliance (WCAG guidelines)

### 6.2 Link Validation
**Task:** Automated testing of all external links
- Verify all 67+ official resource links are accessible
- Check for broken or redirected links
- Implement link monitoring for ongoing maintenance

---

## 7. Documentation & Maintenance

### 7.1 Developer Documentation
**Task:** Create comprehensive documentation for future maintenance
- Template structure and customization guide
- Content update procedures
- Deployment and hosting guide
- Troubleshooting common issues

### 7.2 Content Management System
**Future Consideration:** Evaluate need for CMS or automated content updates
- GitHub-based content management
- Automated link checking
- Content versioning and backup

---

## Implementation Priority

### Phase 1 - Critical (Before Public Deployment)
1. Template refactoring for efficiency
2. Cross-browser testing and fixes
3. Link validation and verification
4. SEO and meta optimization

### Phase 2 - Enhancement (Post-Deployment)
1. Code syntax highlighting implementation
2. Performance optimization
3. Advanced visual enhancements
4. Analytics and monitoring setup

### Phase 3 - Future (Ongoing Maintenance)
1. Content management system evaluation
2. Advanced search functionality
3. Community contribution features
4. Mobile app consideration

---

## Notes
- All items in this document were identified during systematic development
- Priority levels can be adjusted based on deployment timeline and requirements
- Some items may be reconsidered based on user feedback post-deployment
- This document should be updated as new technical debt is identified

---

## 8. Scope Additions & Future Content

### 8.1 New Vector Database - HIGH PRIORITY
**Task:** Add Milvus vector database to the vector databases section
- **Status:** To be added after initial development completion
- **Requirements:** Research notes, systematic content population following established approach
- **Files Affected:** `_data/vector_databases/milvus.yml`, home page cards

### 8.2 New Framework - MEDIUM PRIORITY  
**Task:** Add Pydantic AI as a framework to the frameworks section
- **Status:** To be added after initial development completion
- **Requirements:** Research notes, systematic content population following established approach
- **Files Affected:** `_data/frameworks/pydantic-ai.yml`, home page cards

### 8.3 Scope Cleanup - COMPLETED ✅
**Task:** Remove Faiss from vector databases section
- **Reason:** Not a vector database per se
- **Status:** ✅ Completed - Faiss YAML file removed
- **Files Affected:** `_data/vector_databases/faiss.yml` (deleted)

---

**Target Completion:** After all content sections (Frameworks ✅, Vector Databases, Protocols) are populated and verified.
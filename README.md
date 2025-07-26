# 🚀 Nuxt Starter Template

A modern, production-ready Nuxt 4 starter template with best practices, security, and developer experience in mind.

## ✨ Features

### 🎨 Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Nuxt Color Mode](https://color-mode.nuxtjs.org/)** - Dark/light mode with auto detection
- **[Josh W. Comeau's CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/)** - Modern CSS reset for consistent cross-browser styling

### 🛡️ Security & Protection

- **[Nuxt CSRF](https://nuxt.com/modules/security)** - CSRF protection for forms and API endpoints
- **[Nuxt API Shield](https://github.com/rrd108/nuxt-api-shield)** - Rate limiting middleware to protect API endpoints from excessive requests

### 🖼️ Media & Assets

- **[Nuxt Image](https://image.nuxt.com/)** - Optimized images with lazy loading, responsive images, and modern formats

### 🔧 Code Quality & Linting

- **[ESLint](https://eslint.org/)** with **[Anthony Fu's Config](https://github.com/antfu/eslint-config)** - Opinionated ESLint config
- **[Oxlint](https://oxc.rs/)** - Fast JavaScript/TypeScript linter written in Rust
- **[Prettier](https://prettier.io/)** - Code formatter for consistent styling
- **[Lint-staged](https://github.com/okonet/lint-staged)** - Run linters on git staged files

### 📦 Package Management & Dependencies

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Renovate](https://renovatebot.com/)** - Automated dependency updates

### 🔒 Git Hooks & Validation

- **[Husky](https://typicode.github.io/husky/)** - Git hooks for running scripts on git events
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### 🚀 CI/CD & Development

- **GitHub Workflows** - Automated testing and deployment
- **[Act](https://github.com/nektos/act)** - Run GitHub Actions locally for testing

## 🛠️ Getting Started

### Prerequisites

- Node.js (lts - 22.x)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone git@github.com:marwen-mrabti/nuxt-starter.git
cd nuxt-starter
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm generate         # Generate static site

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues

```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

- .env variables validation using zod

```env
# Add your environment variables here
NUXT_SECRET_KEY=your-secret-key-here
```

### ESLint, Oxlint & Prettier

The project uses Anthony Fu's ESLint config. Customize rules in `.eslint.config.mjs`:

```mjs
export default withNuxt(antfu({})).append(
  ...oxlint.configs["flat/recommended"],
);
```

## 🛡️ Security Features

### CSRF Protection

CSRF protection is enabled by default. The module automatically:

- Generates CSRF tokens for forms
- Validates tokens on API requests
- Provides composables for token management
- use $csrfFetch instead of $fetch with POST, PUT and DELETE requests

### API Rate Limiting

API Shield protects your endpoints by:

- Tracking requests per IP address
- Enforcing configurable rate limits
- Preventing brute force attacks

## 🎨 Styling

### CSS Reset

This template includes Josh W. Comeau's modern CSS reset, which:

- Removes default margins and padding
- Sets sensible defaults for modern web development
- Improves cross-browser consistency
- Includes accessibility improvements

### Dark Mode

Color mode is configured with:

- Automatic system preference detection
- Manual toggle support
- Persistent user preference storage
- Tailwind CSS integration

## 🧪 Testing GitHub Actions Locally

Use [Act](https://github.com/nektos/act) to test your GitHub workflows locally:

```bash
# Install act (if not already installed)
# macOS: brew install act
# Or download from GitHub releases

# Run all workflows
pnpm act

# Run specific workflow
pnpm act -W .github/workflows/ci.yml

# Run with specific event
pnpm act push
```

## 📚 Documentation & Resources

- **[Nuxt 4 Documentation](https://nuxt.com/docs)**
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)**
- **[Anthony Fu's ESLint Config](https://github.com/antfu/eslint-config)**
- **[Oxlint Documentation](https://oxc.rs/docs/guide/usage/linter.html)**
- **[Zod Documentation](https://zod.dev/)**
- **[pnpm Documentation](https://pnpm.io/)**
- **[Sentry Documentation](https://docs.sentry.io/platforms/javascript/guides/nuxt/)**

## 🙏 Acknowledgments

- [Anthony Fu](https://github.com/antfu) for the excellent ESLint configuration
- [Josh W. Comeau](https://www.joshwcomeau.com/) for the modern CSS reset
- [Nuxt Team](https://nuxt.com/team) for the amazing framework
- All the maintainers of the tools and libraries used in this template

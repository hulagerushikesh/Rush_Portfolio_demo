# Troubleshooting Guide

## Build Errors Fixed

### 1. Missing autoprefixer Error
**Error:** `Cannot find module 'autoprefixer'`

**Solution:** 
```bash
npm install autoprefixer
```

### 2. ThemeProvider localStorage Error
**Fixed:** Updated ThemeProvider to handle SSR properly by avoiding localStorage access during initial render.

### 3. Image Optimization Issues
**Fixed:** Added `unoptimized` prop to all Image components to prevent build issues with placeholder images.

## Manual Installation Steps

Since there are terminal permission issues, please run these commands manually:

### Step 1: Install Dependencies
```bash
# Install the missing autoprefixer
npm install autoprefixer

# Or install all dependencies fresh
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to `http://localhost:3000`

## Alternative Solutions

### If npm install fails:
1. Try using yarn instead:
   ```bash
   yarn add autoprefixer
   yarn install
   yarn dev
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check Node.js version:
   ```bash
   node --version
   # Should be 18+ for Next.js 15
   ```

### If build still fails:
1. Check for TypeScript errors in your IDE
2. Ensure all imports are correct
3. Verify file paths are accurate

## Common Issues and Solutions

### 1. Hydration Mismatch
- **Cause:** Server and client rendering differences
- **Solution:** Use `useEffect` for client-only code

### 2. Image Loading Issues
- **Cause:** Next.js Image optimization with external URLs
- **Solution:** Added `unoptimized` prop or configure `next.config.js`

### 3. CSS Not Loading
- **Cause:** Missing PostCSS plugins
- **Solution:** Install autoprefixer and ensure postcss.config.js is correct

## Project Structure Verification

Ensure your project has this structure:
```
rush-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── projects/page.tsx
│   │   └── resume/page.tsx
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ThemeProvider.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── next.config.js
```

## Success Indicators

When everything is working correctly, you should see:
- ✅ No build errors in terminal
- ✅ Development server starts on port 3000
- ✅ Website loads with proper styling
- ✅ Dark/light mode toggle works
- ✅ All pages are accessible
- ✅ Responsive design works on mobile

## Getting Help

If you continue to have issues:
1. Check the terminal output for specific error messages
2. Verify all dependencies are installed
3. Ensure Node.js version is compatible
4. Try the alternative installation methods above

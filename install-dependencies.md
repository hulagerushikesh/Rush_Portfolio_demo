# Install Dependencies

Due to terminal permission issues, please run these commands manually in your terminal:

## 1. Install Missing Dependencies

```bash
npm install autoprefixer
```

## 2. Install All Dependencies (if needed)

```bash
npm install
```

## 3. Start Development Server

```bash
npm run dev
```

## Alternative: Use Yarn (if you prefer)

```bash
yarn add autoprefixer
yarn install
yarn dev
```

## If you still get errors, try:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall everything
npm install
```

The main issue was missing `autoprefixer` which is required by PostCSS for Tailwind CSS to work properly.

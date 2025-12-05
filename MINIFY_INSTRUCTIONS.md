# Minification Instructions

This document explains how to minify CSS and JavaScript files to improve PageSpeed scores.

## Quick Minification (Using Node.js)

1. **Install Node.js** (if not already installed): https://nodejs.org/

2. **Run the minification script**:
   ```bash
   node build-minify.js
   ```

3. **Update HTML to use minified files**:
   - Replace `styles.css` with `styles.min.css`
   - Replace `script.js` with `script.min.js`

## Manual Minification (Online Tools)

### CSS Minification:
1. Go to https://www.minifier.org/ or https://cssminifier.com/
2. Copy contents of `styles.css`
3. Paste and minify
4. Save as `styles.min.css`
5. Update HTML: `<link rel="stylesheet" href="styles.min.css">`

### JavaScript Minification:
1. Go to https://www.minifier.org/ or https://javascript-minifier.com/
2. Copy contents of `script.js`
3. Paste and minify
4. Save as `script.min.js`
5. Update HTML: `<script src="script.min.js" defer></script>`

## Automated Build Process

For production deployments, you can:

1. **Use a build tool** like:
   - Webpack
   - Vite
   - Parcel
   - Rollup

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "build": "node build-minify.js",
       "minify-css": "npx clean-css-cli -o styles.min.css styles.css",
       "minify-js": "npx terser script.js -o script.min.js --compress --mangle"
     }
   }
   ```

3. **Run before deployment**:
   ```bash
   npm run build
   ```

## Expected Savings

- **CSS**: ~3.5 KiB savings (13.3 KiB → ~9.8 KiB)
- **JavaScript**: ~3.7 KiB savings (7.9 KiB → ~4.2 KiB)
- **Total**: ~7.2 KiB reduction in payload size

## Notes

- Always keep original files for development
- Test minified files thoroughly before deploying
- Use source maps for debugging if needed
- Consider using a CDN with compression (gzip/brotli)


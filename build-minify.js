// Simple CSS and JS minifier for production build
const fs = require('fs');
const path = require('path');

// Minify CSS
function minifyCSS(inputFile, outputFile) {
    let css = fs.readFileSync(inputFile, 'utf8');
    
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove extra whitespace
    css = css.replace(/\s+/g, ' ');
    
    // Remove spaces around special characters
    css = css.replace(/\s*{\s*/g, '{');
    css = css.replace(/\s*}\s*/g, '}');
    css = css.replace(/\s*;\s*/g, ';');
    css = css.replace(/\s*:\s*/g, ':');
    css = css.replace(/\s*,\s*/g, ',');
    css = css.replace(/\s*>\s*/g, '>');
    css = css.replace(/\s*\+\s*/g, '+');
    css = css.replace(/\s*~\s*/g, '~');
    
    // Remove trailing semicolons before closing braces
    css = css.replace(/;}/g, '}');
    
    // Remove leading/trailing whitespace
    css = css.trim();
    
    fs.writeFileSync(outputFile, css, 'utf8');
    console.log(`✓ Minified CSS: ${path.basename(inputFile)} → ${path.basename(outputFile)}`);
    console.log(`  Size: ${(fs.statSync(inputFile).size / 1024).toFixed(2)} KB → ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
}

// Minify JavaScript
function minifyJS(inputFile, outputFile) {
    let js = fs.readFileSync(inputFile, 'utf8');
    
    // Remove single-line comments (but preserve URLs and important comments)
    js = js.replace(/\/\/[^\n\r]*/g, '');
    
    // Remove multi-line comments (but preserve license comments)
    js = js.replace(/\/\*[\s\S]*?\*\//g, (match) => {
        if (match.includes('license') || match.includes('License') || match.includes('LICENSE')) {
            return match;
        }
        return '';
    });
    
    // Remove extra whitespace
    js = js.replace(/\s+/g, ' ');
    
    // Remove spaces around operators (but be careful with strings)
    js = js.replace(/\s*([=+\-*\/%<>!&|,;:{}()\[\]])\s*/g, '$1');
    
    // Remove leading/trailing whitespace
    js = js.trim();
    
    fs.writeFileSync(outputFile, js, 'utf8');
    console.log(`✓ Minified JS: ${path.basename(inputFile)} → ${path.basename(outputFile)}`);
    console.log(`  Size: ${(fs.statSync(inputFile).size / 1024).toFixed(2)} KB → ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
}

// Run minification
console.log('Starting minification...\n');

if (fs.existsSync('styles.css')) {
    minifyCSS('styles.css', 'styles.min.css');
}

if (fs.existsSync('script.js')) {
    minifyJS('script.js', 'script.min.js');
}

console.log('\n✓ Minification complete!');


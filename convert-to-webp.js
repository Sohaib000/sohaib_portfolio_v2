const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Image URLs from your HTML files
const imageUrls = [
    // Project images from index.html
    { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', name: 'project-1.webp' },
    { url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop', name: 'project-2.webp' },
    { url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop', name: 'project-3.webp' },
    { url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop', name: 'project-4.webp' },
    { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop', name: 'project-5.webp' },
    { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop', name: 'project-6.webp' },
    // Testimonial images
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces', name: 'testimonial-1.webp' },
    { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces', name: 'testimonial-2.webp' },
    { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces', name: 'testimonial-3.webp' },
    // Project detail images
    { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=500&fit=crop', name: 'project-detail-1.webp' },
    { url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=500&fit=crop', name: 'project-detail-2.webp' },
    { url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=500&fit=crop', name: 'project-detail-3.webp' },
    { url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=500&fit=crop', name: 'project-detail-4.webp' },
    { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=500&fit=crop', name: 'project-detail-5.webp' },
    { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=500&fit=crop', name: 'project-detail-6.webp' },
];

// Gallery images from project-detail.html
const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop', name: 'gallery-1-1.webp' },
    { url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=450&fit=crop', name: 'gallery-1-2.webp' },
    { url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=450&fit=crop', name: 'gallery-1-3.webp' },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop', name: 'gallery-1-4.webp' },
    { url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop', name: 'gallery-2-1.webp' },
    { url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop', name: 'gallery-2-2.webp' },
    { url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop', name: 'gallery-2-3.webp' },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop', name: 'gallery-3-1.webp' },
    { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop', name: 'gallery-3-2.webp' },
    { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop', name: 'gallery-3-3.webp' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=450&fit=crop', name: 'gallery-4-1.webp' },
    { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=450&fit=crop', name: 'gallery-4-2.webp' },
    { url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=450&fit=crop', name: 'gallery-4-3.webp' },
    { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=450&fit=crop', name: 'gallery-4-4.webp' },
    { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop', name: 'gallery-5-1.webp' },
    { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop', name: 'gallery-5-2.webp' },
    { url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop', name: 'gallery-5-3.webp' },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop', name: 'gallery-6-1.webp' },
    { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop', name: 'gallery-6-2.webp' },
    { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop', name: 'gallery-6-3.webp' },
];

const allImages = [...imageUrls, ...galleryImages];
const imagesDir = path.join(__dirname, 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download image
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(filepath);
        
        protocol.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Handle redirect
                return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
            }
            
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

// Function to convert image to WebP using sharp (if available) or just rename
async function convertToWebP(inputPath, outputPath) {
    try {
        // Try to use sharp if available
        const sharp = require('sharp');
        await sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(outputPath);
        fs.unlinkSync(inputPath); // Delete original
        return true;
    } catch (err) {
        // If sharp is not available, just copy the file and rename
        // Note: This won't actually convert to WebP, just rename
        // You'll need to install sharp: npm install sharp
        console.log(`Sharp not available. Installing sharp...`);
        console.log(`Please run: npm install sharp`);
        return false;
    }
}

// Main function
async function main() {
    console.log('Starting image download and conversion...\n');
    
    // Check if sharp is installed
    let sharpAvailable = false;
    try {
        require('sharp');
        sharpAvailable = true;
        console.log('✓ Sharp is installed. Images will be converted to WebP.\n');
    } catch (err) {
        console.log('⚠ Sharp is not installed. Installing...\n');
        const { execSync } = require('child_process');
        try {
            execSync('npm install sharp', { stdio: 'inherit' });
            sharpAvailable = true;
            console.log('✓ Sharp installed successfully!\n');
        } catch (installErr) {
            console.log('✗ Failed to install sharp. Please run: npm install sharp\n');
        }
    }
    
    for (let i = 0; i < allImages.length; i++) {
        const image = allImages[i];
        const tempPath = path.join(imagesDir, image.name.replace('.webp', '.tmp'));
        const webpPath = path.join(imagesDir, image.name);
        
        try {
            console.log(`[${i + 1}/${allImages.length}] Downloading ${image.name}...`);
            await downloadImage(image.url, tempPath);
            
            if (sharpAvailable) {
                console.log(`  Converting to WebP...`);
                await convertToWebP(tempPath, webpPath);
                console.log(`  ✓ Saved: ${image.name}\n`);
            } else {
                // Just rename if sharp is not available
                fs.renameSync(tempPath, webpPath);
                console.log(`  ⚠ Saved as: ${image.name} (not converted, sharp not available)\n`);
            }
        } catch (err) {
            console.error(`  ✗ Error processing ${image.name}: ${err.message}\n`);
        }
    }
    
    console.log('✓ Image download and conversion complete!');
    console.log('\nNext step: Update HTML files to use .webp images.');
}

main().catch(console.error);


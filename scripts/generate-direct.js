const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const CommonHTMLGenerator = require('./common-html-generator.js');

// Import CPU data
const cpu6502 = require('../cpus/6502.js');
const cpu65C02 = require('../cpus/65C02.js');

class DirectHTMLGenerator {
    constructor() {
        this.browser = null;
        this.outputDir = './docs';
        this.commonGenerator = new CommonHTMLGenerator();
    }

    async init() {
        console.log('🚀 Starting direct HTML generator...');
        
        // Ensure docs directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
            console.log(`📁 Created docs directory: ${this.outputDir}`);
        }

        console.log('🌐 Launching browser...');
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    generateHTML(cpuName, cpuData, timingData) {
        return this.commonGenerator.generateHTML(cpuName, cpuData, timingData, false);
    }

    async generateFromHTML(html, outputName, format = 'both') {
        console.log(`📄 Generating ${outputName}...`);
        
        const page = await this.browser.newPage();
        await page.setViewport({ width: 1200, height: 1600 });
        
        await page.setContent(html, { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });

        // Wait for fonts to load
        await page.waitForTimeout(3000);

        const results = [];
        let pngPath;

        // Always generate PNG first (needed for PDF)
        if (format === 'png' || format === 'both' || format === 'pdf') {
            pngPath = path.join(this.outputDir, `cheat-sheet-${outputName}.png`);
            await page.screenshot({
                path: pngPath,
                fullPage: true,
                type: 'png'
            });
            
            if (format === 'png' || format === 'both') {
                results.push({ type: 'png', path: pngPath });
                console.log(`   ✅ PNG saved: ${pngPath}`);
            }
        }

        // Generate PDF from PNG image
        if (format === 'pdf' || format === 'both') {
            const pdfPath = await this.generatePDFFromPNG(pngPath, outputName);
            results.push({ type: 'pdf', path: pdfPath });
            console.log(`   ✅ PDF saved: ${pdfPath}`);
        }

        await page.close();
        return results;
    }

    async generatePDFFromPNG(pngPath, outputName) {
        console.log(`   📄 Creating PDF from PNG...`);
        
        // Create a new page for PDF generation
        const pdfPage = await this.browser.newPage();
        
        // Read the PNG file and convert to base64
        const pngBuffer = fs.readFileSync(pngPath);
        const pngBase64 = pngBuffer.toString('base64');
        
        // Get PNG dimensions to calculate proper scaling
        const imageInfo = await this.getImageDimensions(pngPath);
        
        // Create HTML with just the image, sized to fit A4
        const pdfHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .image-container {
            width: 100%;
            text-align: center;
        }
        img {
            max-width: 100%;
            max-height: 100vh;
            width: auto;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="image-container">
        <img src="data:image/png;base64,${pngBase64}" alt="${outputName} Cheat Sheet" />
    </div>
</body>
</html>`;

        await pdfPage.setContent(pdfHTML, { waitUntil: 'networkidle0' });
        
        const pdfPath = path.join(this.outputDir, `cheat-sheet-${outputName}.pdf`);
        
        await pdfPage.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '5mm',
                right: '5mm',
                bottom: '5mm',
                left: '5mm'
            }
        });

        await pdfPage.close();
        return pdfPath;
    }

    async getImageDimensions(imagePath) {
        // Simple method to get image info - we'll use the browser for this
        const page = await this.browser.newPage();
        
        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = imageBuffer.toString('base64');
        
        const dimensions = await page.evaluate((base64) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    resolve({ width: img.width, height: img.height });
                };
                img.src = `data:image/png;base64,${base64}`;
            });
        }, imageBase64);
        
        await page.close();
        return dimensions;
    }

    async generateAll(format = 'both') {
        const results = [];

        try {
            // Generate 6502
            console.log('📊 Generating 6502 cheat sheet...');
            const html6502 = this.generateHTML('6502', cpu6502.default || cpu6502, cpu6502.timing || {});
            const results6502 = await this.generateFromHTML(html6502, '6502', format);
            results.push(...results6502);
        } catch (error) {
            console.error('❌ Failed to generate 6502:', error.message);
        }

        try {
            // Generate 65C02
            console.log('📊 Generating 65C02 cheat sheet...');
            const html65C02 = this.generateHTML('65C02', cpu65C02.default || cpu65C02, cpu65C02.timing || {});
            const results65C02 = await this.generateFromHTML(html65C02, '65C02', format);
            results.push(...results65C02);
        } catch (error) {
            console.error('❌ Failed to generate 65C02:', error.message);
        }

        return results;
    }

    async cleanup() {
        console.log('🧹 Cleaning up...');
        if (this.browser) {
            await this.browser.close();
        }
    }
}

async function main() {
    const args = process.argv.slice(2);
    const formatArg = args.find(arg => arg.startsWith('--format='));
    const format = formatArg ? formatArg.split('=')[1] : 'both';

    if (!['pdf', 'png', 'both'].includes(format)) {
        console.error('❌ Invalid format. Use --format=pdf, --format=png, or --format=both');
        process.exit(1);
    }

    const generator = new DirectHTMLGenerator();

    try {
        await generator.init();
        
        console.log(`📋 Generating cheat sheets in ${format} format...`);
        const results = await generator.generateAll(format);

        console.log('\n🎉 Generation complete!');
        console.log('📊 Summary:');
        results.forEach(result => {
            console.log(`   ${result.type.toUpperCase()}: ${path.basename(result.path)}`);
        });

    } catch (error) {
        console.error('❌ Generation failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        await generator.cleanup();
        process.exit(0);
    }
}

if (require.main === module) {
    main();
}

module.exports = DirectHTMLGenerator;

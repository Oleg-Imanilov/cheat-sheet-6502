const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Import CPU data
const cpu6502 = require('../cpus/6502.js');
const cpu65C02 = require('../cpus/65C02.js');

class DirectHTMLGenerator {
    constructor() {
        this.browser = null;
        this.outputDir = './output';
    }

    async init() {
        console.log('🚀 Starting direct HTML generator...');
        
        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
            console.log(`📁 Created output directory: ${this.outputDir}`);
        }

        console.log('🌐 Launching browser...');
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    generateHTML(cpuName, cpuData, timingData) {
        // Read the font file and encode it as base64
        const fontPath = path.join(__dirname, '..', 'static', 'C64_Pro-STYLE.ttf');
        let fontBase64 = '';
        
        if (fs.existsSync(fontPath)) {
            const fontBuffer = fs.readFileSync(fontPath);
            fontBase64 = fontBuffer.toString('base64');
        }

        // Simple text formatting (replace <> tags with spans)
        const formatText = (text, color = '#080') => {
            return text.replace(/<([^>]+)>/g, `<span style="color:${color};">$1</span>`);
        };

        let contentHTML;

        if (cpuName === '6502') {
            // 6502 uses column-based layout
            const generateCmd6502 = (cmd) => {
                return `
                    <div class="card">
                        <div class="cmdName">${cmd.name}</div>
                        <span style="float: right;">
                            <span style="font-family: c64pro; font-size: 14px;">${formatText(cmd.flags)}</span>
                        </span><br />
                        <span style="font-size: 12px; color: black; padding-top: 2px; display: inline-block;">${formatText(cmd.title)}</span><br />
                        <div class="activeModes">
                            <span style="color: #080;">${formatText(cmd.modes)}</span>
                        </div>
                    </div>
                `;
            };

            const modesTable6502 = `
                <div class='card'>
                    &nbsp;Modes
                    <table style="margin: 4px;">
                        <tbody>
                            <tr><td><span style="font-size: 12px; color: #080;">Accumulator</span></td><td></td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Label</span></td><td>LABEL</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Immediate</span></td><td>#$12</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Zero Page</span></td><td>$12</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Zero Page,X</span></td><td>$12,X</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Zero Page,Y</span></td><td>$12,Y</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Absolute</span></td><td>$1234</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Absolute,X</span></td><td>$1234,X</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Absolute,Y</span></td><td>$1234,Y</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Indirect</span></td><td>($1234)</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Indirect,X</span></td><td>($12,X)</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Indirect,Y</span></td><td>($12),Y</td></tr>
                        </tbody>
                    </table>
                </div>
            `;

            // Generate columns
            const col0 = cpuData.filter(d => d.col == 0).map(cmd => generateCmd6502(cmd)).join('');
            const col1 = cpuData.filter(d => d.col == 1).map(cmd => generateCmd6502(cmd)).join('');
            const col2 = cpuData.filter(d => d.col == 2).map(cmd => generateCmd6502(cmd)).join('');
            const col3 = cpuData.filter(d => d.col == 3).map(cmd => generateCmd6502(cmd)).join('');

            contentHTML = `
                <div style="display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 20px;">
                    <table style="width: 800px; height: 1600px;">
                        <tbody>
                            <tr>
                                <td valign="top">${modesTable6502}${col0}</td>
                                <td valign="top">${col1}</td>
                                <td valign="top">${col2}</td>
                                <td valign="top">${col3}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            // 65C02 uses category-based layout (existing code)
            const categories = [
                'Load & Store',
                'Stack',
                'Bits',
                'Flow',
                'State',
                'Transfer',
                'Misc',
                'Calc',
            ];
            
            const catCol = [
                '#efe',
                '#eff',
                '#eef',
                '#fef',    
                '#ffe',
                '#fee',    
                '#fed',
                '#def'    
            ];

            // Helper function to generate command HTML for 65C02
            const generateCmd65C02 = (cmd, bgColor = '#FFF') => {
                const mode = timingData[cmd.name] || {'?????': 0};
                const modes = Object.keys(mode).map(k => 
                    `<span style="display:inline-block;color:#777;padding-right:6px;">${k}<sup style="color:#060;">${mode[k]}</sup></span>`
                ).join('');

                return `
                    <div class="card flex-item" style="background:${bgColor};">
                        <div class="cmdName">${cmd.name}</div>
                        <span style="float: right;">
                            <span style="font-family: c64pro; font-size: 14px;">${formatText(cmd.flags)}</span>
                        </span><br />
                        <span style="font-size: 12px; color: black; padding-top: 2px; display: inline-block;">${formatText(cmd.title)}</span><br />
                        <div class="activeModes">
                            ${modes}
                        </div>
                    </div>
                `;
            };

            // Generate modes table for 65C02
            const modesTable65C02 = `
                <div class='card flex-item'>
                    <table style="margin: 4px;">
                        <tbody>
                            <tr><td><span style="font-size: 12px; color: #080;">Implied</span></td><td></td></tr>                    
                            <tr><td><span style="font-size: 12px; color: #080;">Accumulator</span></td><td></td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Immediate</span></td><td>#$12</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">ZeroPage</span></td><td>$12</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">ZeroPage,X</span></td><td>$12,X</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">ZeroPage,Y</span></td><td>$12,Y</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Absolute</span></td><td>$1234</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Absolute,X</span></td><td>$1234,X</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Absolute,Y</span></td><td>$1234,Y</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Relative</span></td><td>LABEL</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Ind, zp X</span></td><td>($12,X)</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Ind, abs X</span></td><td>($1234,X)</td></tr>                    
                            <tr><td><span style="font-size: 12px; color: #080;">Ind, zp Y</span></td><td>($12),Y</td></tr>
                            <tr><td><span style="font-size: 12px; color: #080;">Ind, zp</span></td><td>($12)</td></tr>                    
                            <tr><td><span style="font-size: 12px; color: #080;">Ind, abs</span></td><td>($1234)</td></tr>                    
                        </tbody>
                    </table>
                </div>
            `;

            // Generate category lists
            let categoryLists = '';
            const categoryOrder = [0, 4, 2, 3, 1, 5, 7, 6]; // Same order as original
            
            categoryOrder.forEach(ix => {
                const category = categories[ix];
                const bg = catCol[ix] || '#eee';
                const commands = cpuData.filter(d => d.category === category);
                
                categoryLists += `
                    <div class='flex-item cat-title' style='background:${bg};'>${category}</div>
                    ${commands.map(cmd => generateCmd65C02(cmd, bg)).join('')}
                `;
            });

            contentHTML = `
                <div class='flex-container'>
                    <div class='flex-item cat-title'>Modes</div>
                    ${modesTable65C02}
                    ${categoryLists}
                </div>
            `;
        }

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cpuName} Instructions Cheat Sheet</title>
    <style>
        @font-face {
            font-family: c64pro;
            src: url(data:font/truetype;charset=utf-8;base64,${fontBase64}) format('truetype');
        }
        
        * {
            font-family: c64pro, monospace;
            font-size: 14px;
        }

        body {
            background: white;
            padding: 10px;
            margin: 0;
        }

        .card {
            width: ${cpuName === '6502' ? '190px' : '200px'};
            display: inline-block;
            padding: 1px;
            border: 2px solid silver;
            margin-top: 4px;
        }

        .cmdName {
            display: inline-block;
            color: white;
            background: black;
            padding: 3px;
        }

        .activeModes {
            ${cpuName === '65C02' ? 'text-align: right;' : ''}
            margin-top: 2px;
            padding-top: 2px;
            border-top: solid 1px silver;
        }

        .cat-title {
            text-align: center;
            padding: 3px;
            border: 1px solid silver;
            border-radius: 4px;
            margin-top: 8px;
        }

        .flex-container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: center;
            align-items: stretch;
            height: ${cpuName === '65C02' ? '1275px' : '1225px'};
        }

        .flex-item {
            margin-right: 4px;
            flex: 0 1 auto;
        }

        table {
            margin: 4px;
        }

        td {
            font-size: 10px;
        }

        td:last-child {
            text-align: right;
            color: #F0F;
        }
    </style>
</head>
<body>
    <div style="text-align:center;font-size:18px;color:gray;">${cpuName} INSTRUCTIONS</div>
    ${contentHTML}
</body>
</html>`;

        return html;
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

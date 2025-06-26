const path = require('path');
const fs = require('fs');
const CommonHTMLGenerator = require('./common-html-generator.js');

// Import CPU data
const cpu6502 = require('../cpus/6502.js');
const cpu65C02 = require('../cpus/65C02.js');

class HTMLStaticGenerator {
    constructor() {
        this.outputDir = './docs';
        this.commonGenerator = new CommonHTMLGenerator();
    }

    init() {
        console.log('🚀 Starting HTML static generator...');
        
        // Ensure docs directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
            console.log(`📁 Created docs directory: ${this.outputDir}`);
        }
    }

    generateHTML(cpuName, cpuData, timingData) {
        return this.commonGenerator.generateHTML(cpuName, cpuData, timingData, true);
    }

    generateStatic(cpuName, cpuData, timingData) {
        console.log(`📄 Generating ${cpuName} HTML cheat sheet...`);
        
        const html = this.generateHTML(cpuName, cpuData, timingData);
        const outputPath = path.join(this.outputDir, `cheat-sheet-${cpuName}.html`);
        
        fs.writeFileSync(outputPath, html, 'utf8');
        
        console.log(`   ✅ HTML saved: ${outputPath}`);
        return { type: 'html', path: outputPath };
    }

    generateAll() {
        const results = [];

        try {
            // Generate 6502
            console.log('📊 Generating 6502 HTML cheat sheet...');
            const result6502 = this.generateStatic('6502', cpu6502.default || cpu6502, cpu6502.timing || {});
            results.push(result6502);
        } catch (error) {
            console.error('❌ Failed to generate 6502 HTML:', error.message);
        }

        try {
            // Generate 65C02
            console.log('📊 Generating 65C02 HTML cheat sheet...');
            const result65C02 = this.generateStatic('65C02', cpu65C02.default || cpu65C02, cpu65C02.timing || {});
            results.push(result65C02);
        } catch (error) {
            console.error('❌ Failed to generate 65C02 HTML:', error.message);
        }

        // Generate index.html
        try {
            console.log('📊 Generating index page...');
            const indexResult = this.generateIndex();
            results.push(indexResult);
        } catch (error) {
            console.error('❌ Failed to generate index HTML:', error.message);
        }

        return results;
    }

    generateIndex() {
        const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>6502/65C02 CPU Cheat Sheets</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 40px;
            font-size: 1.2em;
        }
        
        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .card {
            position: relative;
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            cursor: pointer;            
        }
        
       
        .card h2 {
            margin: 0 0 10px 0;
            font-size: 1.5em;
        }
        
        .card p {
            margin: 0 0 25px 0;
            opacity: 0.9;
        }
        
        .download-buttons {
            position: absolute;
            bottom: 12px;
            right:12px;
            display: flex;
            gap: 8px;
            margin-top: 15px;
        }
        
        .download-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 6px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 1);
            border-radius: 4px;
            color: #333;
            text-decoration: none;
            font-size: 0.85em;
            font-weight: 500;
            transition: all 0.2s ease;
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .download-btn:hover {
            background: rgba(255, 255, 255, 1);
            border-color: rgba(255, 255, 255, 1);
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        .download-icon {
            width: 14px;
            height: 14px;
            fill: #333;
        }
        
        .card.cpu-6502 {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
        }
        
        .card.cpu-65c02 {
            background: linear-gradient(135deg, #4834d4 0%, #686de0 100%);
        }
        
        .card.hex-table-6502 {
            background: linear-gradient(135deg, #26de81 0%, #20bf6b 100%);
        }
        
        .card.hex-table-65c02 {
            background: linear-gradient(135deg, #fd9644 0%, #f8b500 100%);
        }
        
        .features {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
        }
        
        .features h3 {
            margin-top: 0;
            color: #333;
        }
        
        .features ul {
            color: #555;
            line-height: 1.6;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            color: #888;
            font-size: 0.9em;
        }
        
        .keyboard-shortcuts {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 10px;
            align-items: center;
            margin-top: 15px;
        }
        
        .key {
            background: #333;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: monospace;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🖥️ Retro CPU Cheat Sheets</h1>
        <p class="subtitle"><b>6502</b> and <b>65C02</b> processors</p>
        
        <div class="cards">
            <div class="card cpu-6502" onclick="navigateTo('cheat-sheet-6502.html');">
            
                <h2>6502 CPU</h2>
                <p>Classic 8-bit processor used in Commodore 64, Apple II, NES, and many other systems.</p>
            
                <div class="download-buttons">
                    <a href="#" class="download-btn" onclick="event.stopPropagation(); downloadFile('cheat-sheet-6502.html');">
                        <svg class="download-icon" viewBox="0 0 24 24">
                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                        </svg>
                        HTML
                    </a>
                    <a href="cheat-sheet-6502.png" class="download-btn" onclick="event.stopPropagation();" download>
                        <svg class="download-icon" viewBox="0 0 24 24">
                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                        </svg>
                        PNG
                    </a>
                    <a href="cheat-sheet-6502.pdf" class="download-btn" onclick="event.stopPropagation();" download>
                        <svg class="download-icon" viewBox="0 0 24 24">
                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                        </svg>
                        PDF
                    </a>
                </div>
            </div>
            
            <div class="card cpu-65c02" onclick="navigateTo('cheat-sheet-65C02.html');">
                <h2>65C02 CPU</h2>
                <p>Enhanced version with additional instructions, addressing modes, and bug fixes.</p>
                
                <div class="download-buttons">
                    <a href="#" class="download-btn" onclick="event.stopPropagation(); downloadFile('cheat-sheet-65C02.html');">
                        <svg class="download-icon" viewBox="0 0 24 24">
                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                        </svg>
                        HTML
                    </a>
                    <a href="cheat-sheet-65C02.png" class="download-btn" onclick="event.stopPropagation();" download>
                        <svg class="download-icon" viewBox="0 0 24 24">
                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                        </svg>
                        PNG
                    </a>
                    <a href="cheat-sheet-65C02.pdf" class="download-btn" onclick="event.stopPropagation();" download>
                        <svg class="download-icon" viewBox="0 0 24 24">
                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                        </svg>
                        PDF
                    </a>
                </div>
            </div>
        </div>

        <div class="cards">
            <div class="card hex-table-6502" onclick="navigateTo('6502-hex-table.html');">
                <h2>📊 6502 Hex Table</h2>
                <p>Complete hexadecimal opcode table with all addressing modes and instruction details.</p>
                <div class="download-buttons">
                    <a href="#" class="download-btn" onclick="event.stopPropagation(); downloadFile('6502-hex-table.html');">
                        <svg class="download-icon" viewBox="0 0 24 24">
                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                        </svg>
                        HTML
                    </a>
                </div>
            </div>
            
            <div class="card hex-table-65c02"  onclick="navigateTo('65C02-hex-table.html');">
                <h2>📊 65C02 Hex Table</h2>
                <p>Enhanced hex table including all additional 65C02 instructions and addressing modes.</p>
                <div class="download-buttons">
                    <a href="#" class="download-btn" onclick="event.stopPropagation(); downloadFile('65C02-hex-table.html');">
                        <svg class="download-icon" viewBox="0 0 24 24">
                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                        </svg>
                        HTML
                    </a>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Generated with the 6502/65C02 Cheat Sheet Generator</p>
            <p>Each instruction shows addressing modes, flag effects, and timing information</p>
            <p><a href="https://github.com/Oleg-Imanilov/cheat-sheet-6502" target="_blank" style="color: #667eea; text-decoration: none;">🔗 View on GitHub</a></p>
        </div>
    </div>
    
    <script>
        // Function to force download of HTML files
        async function downloadFile(filename) {
            try {
                const response = await fetch(filename);
                const content = await response.text();
                const blob = new Blob([content], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } catch (error) {
                console.error('Download failed:', error);
                // Fallback to opening in new tab
                window.open(filename, '_blank');
            }
        }
        
        // Function to navigate to cheat sheet
        function navigateTo(filename) {
            window.location.href = filename;
        }
        
    </script>
</body>
</html>`;

        const outputPath = path.join(this.outputDir, 'index.html');
        fs.writeFileSync(outputPath, indexHTML, 'utf8');
        
        console.log(`   ✅ Index page saved: ${outputPath}`);
        return { type: 'html', path: outputPath };
    }
}

async function main() {
    const generator = new HTMLStaticGenerator();

    try {
        generator.init();
        
        console.log('📋 Generating HTML static cheat sheets...');
        const results = generator.generateAll();

        console.log('\n🎉 HTML generation complete!');
        console.log('📊 Summary:');
        results.forEach(result => {
            console.log(`   ${result.type.toUpperCase()}: ${path.basename(result.path)}`);
        });

        console.log('\n💡 Features included:');
        console.log('   • Click cards to highlight them');
        console.log('   • Ctrl+F to search instructions');
        console.log('   • Ctrl+P to print');
        console.log('   • ESC to clear highlights');
        console.log('   • Responsive design for mobile/tablet');
        console.log('   • Print-optimized layout');

    } catch (error) {
        console.error('❌ HTML generation failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = HTMLStaticGenerator;

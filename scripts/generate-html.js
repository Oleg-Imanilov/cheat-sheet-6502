const path = require('path');
const fs = require('fs');

// Import CPU data
const cpu6502 = require('../cpus/6502.js');
const cpu65C02 = require('../cpus/65C02.js');

class HTMLStaticGenerator {
    constructor() {
        this.outputDir = './output';
    }

    init() {
        console.log('🚀 Starting HTML static generator...');
        
        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
            console.log(`📁 Created output directory: ${this.outputDir}`);
        }
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
                <div class="cheat-sheet-container">
                    <table class="main-table">
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
            // 65C02 uses category-based layout
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
            min-height: 100vh;
        }

        .cheat-sheet-container {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 20px;
        }

        .main-table {
            width: 800px;
            height: auto;
            min-height: 1600px;
        }

        .card {
            width: ${cpuName === '6502' ? '190px' : '200px'};
            display: inline-block;
            padding: 1px;
            border: 2px solid silver;
            margin-top: 4px;
            box-sizing: border-box;
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
            font-weight: bold;
        }

        .flex-container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: center;
            align-items: stretch;
            height: ${cpuName === '65C02' ? '1275px' : '1225px'};
            max-width: 1200px;
            margin: 0 auto;
        }

        .flex-item {
            margin-right: 4px;
            flex: 0 1 auto;
        }

        table {
            margin: 4px;
            width: 100%;
        }

        td {
            font-size: 10px;
            padding: 1px 2px;
        }

        td:last-child {
            text-align: right;
            color: #F0F;
        }

        .header {
            text-align: center;
            font-size: 18px;
            color: gray;
            margin-bottom: 20px;
            font-weight: bold;
        }

        /* Print styles */
        @media print {
            body {
                padding: 0;
                margin: 0;
            }
            
            .cheat-sheet-container {
                padding: 10px;
            }
            
            /* Ensure content fits on one page */
            .flex-container {
                height: auto;
                max-height: none;
            }
        }

        /* Responsive styles */
        @media screen and (max-width: 1024px) {
            .flex-container {
                height: auto;
                max-height: none;
                flex-wrap: nowrap;
            }
            
            .cheat-sheet-container {
                padding: 10px;
            }
            
            .main-table {
                width: 100%;
                height: auto;
            }
            
            .card {
                width: auto;
                min-width: 180px;
            }
        }

        @media screen and (max-width: 768px) {
            .main-table tr {
                display: block;
            }
            
            .main-table td {
                display: block;
                width: 100%;
                margin-bottom: 10px;
            }
            
            .flex-container {
                flex-wrap: nowrap;
                height: auto;
            }
        }
    </style>
</head>
<body>
    <div class="header">${cpuName} INSTRUCTIONS</div>
    ${contentHTML}
    
    <script>
        // Add some interactivity for better user experience
        document.addEventListener('DOMContentLoaded', function() {
            // Add click-to-highlight functionality for cards
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('click', function() {
                    // Remove previous highlights
                    cards.forEach(c => c.style.boxShadow = '');
                    // Highlight clicked card
                    this.style.boxShadow = '0 0 10px #007acc';
                });
            });
            
            // Add keyboard shortcuts
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.key === 'p') {
                    e.preventDefault();
                    window.print();
                }
                if (e.key === 'Escape') {
                    // Clear all highlights
                    cards.forEach(c => c.style.boxShadow = '');
                }
            });
            
            // Add search functionality
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search instructions... (Ctrl+F)';
            searchInput.style.cssText = \`
                position: fixed;
                top: 10px;
                right: 10px;
                padding: 5px 10px;
                border: 2px solid #ccc;
                border-radius: 4px;
                font-family: inherit;
                z-index: 1000;
                display: none;
            \`;
            
            document.body.appendChild(searchInput);
            
            // Toggle search with Ctrl+F
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.key === 'f') {
                    e.preventDefault();
                    searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
                    if (searchInput.style.display === 'block') {
                        searchInput.focus();
                    }
                }
            });
            
            // Search functionality
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    if (searchTerm === '' || text.includes(searchTerm)) {
                        card.style.opacity = '1';
                        card.style.filter = 'none';
                    } else {
                        card.style.opacity = '0.3';
                        card.style.filter = 'grayscale(100%)';
                    }
                });
            });
        });
    </script>
</body>
</html>`;

        return html;
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
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            border-color: #007acc;
        }
        
        .card h2 {
            margin: 0 0 10px 0;
            font-size: 1.5em;
        }
        
        .card p {
            margin: 0;
            opacity: 0.9;
        }
        
        .card.cpu-6502 {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
        }
        
        .card.cpu-65c02 {
            background: linear-gradient(135deg, #4834d4 0%, #686de0 100%);
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
        <h1>🖥️ CPU Cheat Sheets</h1>
        <p class="subtitle">Interactive reference guides for 6502 and 65C02 processors</p>
        
        <div class="cards">
            <a href="cheat-sheet-6502.html" class="card cpu-6502">
                <h2>6502 CPU</h2>
                <p>Classic 8-bit processor used in Commodore 64, Apple II, NES, and many other systems.</p>
            </a>
            
            <a href="cheat-sheet-65C02.html" class="card cpu-65c02">
                <h2>65C02 CPU</h2>
                <p>Enhanced version with additional instructions, addressing modes, and bug fixes.</p>
            </a>
        </div>
        
        <div class="features">
            <h3>✨ Interactive Features</h3>
            <ul>
                <li><strong>Click to highlight:</strong> Click any instruction card to highlight it</li>
                <li><strong>Search functionality:</strong> Quickly find specific instructions</li>
                <li><strong>Print optimized:</strong> Clean layout for printing reference sheets</li>
                <li><strong>Responsive design:</strong> Works perfectly on desktop, tablet, and mobile</li>
                <li><strong>Keyboard shortcuts:</strong> Enhanced productivity with hotkeys</li>
            </ul>
            
            <h4>⌨️ Keyboard Shortcuts</h4>
            <div class="keyboard-shortcuts">
                <span class="key">Ctrl+F</span> <span>Toggle search mode</span>
                <span class="key">Ctrl+P</span> <span>Print cheat sheet</span>
                <span class="key">ESC</span> <span>Clear all highlights</span>
                <span class="key">1</span> <span>Go to 6502 cheat sheet</span>
                <span class="key">2</span> <span>Go to 65C02 cheat sheet</span>
            </div>
        </div>
        
        <div class="footer">
            <p>Generated with the 6502/65C02 Cheat Sheet Generator</p>
            <p>Each instruction shows addressing modes, flag effects, and timing information</p>
        </div>
    </div>
    
    <script>
        // Add keyboard navigation for the index page
        document.addEventListener('keydown', function(e) {
            if (e.key === '1') {
                window.location.href = 'cheat-sheet-6502.html';
            } else if (e.key === '2') {
                window.location.href = 'cheat-sheet-65C02.html';
            }
        });
        
        // Add visual feedback for card interactions
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
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

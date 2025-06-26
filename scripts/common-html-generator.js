const path = require('path');
const fs = require('fs');

class CommonHTMLGenerator {
    constructor() {
        this.fontBase64 = this.loadFontBase64();
    }

    loadFontBase64() {
        const fontPath = path.join(__dirname, '..', 'static', 'C64_Pro-STYLE.ttf');
        if (fs.existsSync(fontPath)) {
            const fontBuffer = fs.readFileSync(fontPath);
            return fontBuffer.toString('base64');
        }
        return '';
    }

    formatText(text, color = '#080') {
        return text.replace(/<([^>]+)>/g, `<span style="color:${color};">$1</span>`);
    }

    generateCmd(cmd, timingData = {}, bgColor = '#eff') {
        const mode = timingData[cmd.name] || { '?????': 0 };
        const modes = Object.keys(mode).map(k =>
            `<span style="display:inline-block;color:#777;padding-right:6px;">${k}<sup style="color:#060;">${mode[k]}</sup></span>`
        ).join('');

        return `
            <div class="card flex-item" style="background:${bgColor};">
                <div class="cmdName">${cmd.name}</div>
                <span style="float: right;">
                    <span style="font-family: c64pro; font-size: 14px;">${this.formatText(cmd.flags)}</span>
                </span><br />
                <span style="font-size: 12px; color: black; padding-top: 2px; display: inline-block;">${this.formatText(cmd.title)}</span><br />
                <div class="activeModes">
                    ${modes}
                </div>
            </div>
        `;
    }

    generateModesTable6502() {
        return `
            <div class='card flex-item' style="background:#eee;">
                &nbsp;Modes
                <table style="margin: 4px;">
                    <tbody>
                        <tr><td>Ip</td><td><span class="mode-label">Implied</span></td><td></td></tr>                    
                        <tr><td>Ac</td><td><span class="mode-label">Accumulator</span></td><td></td></tr>
                        <tr><td>Lb</td><td><span class="mode-label">Label</span></td><td>LABEL</td></tr>
                        <tr><td>Im</td><td><span class="mode-label">Immediate</span></td><td>#$12</td></tr>
                        <tr><td>Z</td><td><span class="mode-label">Zero Page</span></td><td>$12</td></tr>
                        <tr><td>Zx</td><td><span class="mode-label">Zero Page,X</span></td><td>$12,X</td></tr>
                        <tr><td>Zy</td><td><span class="mode-label">Zero Page,Y</span></td><td>$12,Y</td></tr>
                        <tr><td>Ab</td><td><span class="mode-label">Absolute</span></td><td>$1234</td></tr>
                        <tr><td>Ax</td><td><span class="mode-label">Absolute,X</span></td><td>$1234,X</td></tr>
                        <tr><td>Ay</td><td><span class="mode-label">Absolute,Y</span></td><td>$1234,Y</td></tr>
                        <tr><td>In</td><td><span class="mode-label">Indirect</span></td><td>($1234)</td></tr>
                        <tr><td>Ix</td><td><span class="mode-label">Indirect,X</span></td><td>($12,X)</td></tr>
                        <tr><td>Iy</td><td><span class="mode-label">Indirect,Y</span></td><td>($12),Y</td></tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    generateContent6502(cpuData, timingData = {}, isForStatic = false) {
        const modesTable = this.generateModesTable6502();

        // Generate columns using flexbox layout like 65C02
        const col0 = cpuData.filter(d => d.col == 0).map(cmd => this.generateCmd(cmd, timingData)).join('');
        const col1 = cpuData.filter(d => d.col == 1).map(cmd => this.generateCmd(cmd, timingData)).join('');
        const col2 = cpuData.filter(d => d.col == 2).map(cmd => this.generateCmd(cmd, timingData)).join('');
        const col3 = cpuData.filter(d => d.col == 3).map(cmd => this.generateCmd(cmd, timingData)).join('');
        const col4 = cpuData.filter(d => d.col == 4).map(cmd => this.generateCmd(cmd, timingData)).join('');

        return `
            <div class='flex-container'>
                <div class='flex-item cat-title' style="background-color:#eef">Modes</div>
                ${modesTable}
                ${col0}
                ${col1}
                ${col2}
                ${col3}
                ${col4}
            </div>
        `;
    }


    generateModesTable65C02() {
        return `
            <div class='card flex-item' style="background:#eee;">
                <table style="margin: 4px;">
                    <tbody>
                        <tr><td>Ip</td><td><span class="mode-label">Implied</span></td><td></td></tr>                    
                        <tr><td>Ac</td><td><span class="mode-label">Accumulator</span></td><td></td></tr>
                        <tr><td>Im</td><td><span class="mode-label">Immediate</span></td><td>#$12</td></tr>
                        <tr><td>Z</td><td><span class="mode-label">ZeroPage</span></td><td>$12</td></tr>
                        <tr><td>Zx</td><td><span class="mode-label">ZeroPage,X</span></td><td>$12,X</td></tr>
                        <tr><td>Zy</td><td><span class="mode-label">ZeroPage,Y</span></td><td>$12,Y</td></tr>
                        <tr><td>Ab</td><td><span class="mode-label">Absolute</span></td><td>$1234</td></tr>
                        <tr><td>Ax</td><td><span class="mode-label">Absolute,X</span></td><td>$1234,X</td></tr>
                        <tr><td>Ay</td><td><span class="mode-label">Absolute,Y</span></td><td>$1234,Y</td></tr>
                        <tr><td>R</td><td><span class="mode-label">Relative</span></td><td>LABEL</td></tr>
                        <tr><td>Ix</td><td><span class="mode-label">Ind, zp X</span></td><td>($12,X)</td></tr>
                        <tr><td>IAx</td><td><span class="mode-label">Ind, abs X</span></td><td>($1234,X)</td></tr>                    
                        <tr><td>Iy</td><td><span class="mode-label">Ind, zp Y</span></td><td>($12),Y</td></tr>
                        <tr><td>Iz</td><td><span class="mode-label">Ind, zp</span></td><td>($12)</td></tr>                    
                        <tr><td>Ia</td><td><span class="mode-label">Ind, abs</span></td><td>($1234)</td></tr>                    
                    </tbody>
                </table>
            </div>
        `;
    }

    get65C02Categories() {
        return {
            categories: [
                'Load & Store',
                'Stack',
                'Bits',
                'Flow',
                'State',
                'Transfer',
                'Misc',
                'Calc',
            ],
            catCol: [
                '#efe',
                '#eff',
                '#eef',
                '#fef',
                '#ffe',
                '#fee',
                '#fed',
                '#def'
            ],
            categoryOrder: [0, 4, 2, 3, 1, 5, 7, 6]
        };
    }

    generateContent65C02(cpuData, timingData = {}) {
        const { categories, catCol, categoryOrder } = this.get65C02Categories();
        const modesTable = this.generateModesTable65C02();

        // Generate category lists
        let categoryLists = '';
        categoryOrder.forEach(ix => {
            const category = categories[ix];
            const bg = catCol[ix] || '#eee';
            const commands = cpuData.filter(d => d.category === category);

            categoryLists += `
                <div class='flex-item cat-title' style='background:${bg};'>${category}</div>
                ${commands.map(cmd => this.generateCmd(cmd, timingData, bg)).join('')}
            `;
        });

        return `
            <div class='flex-container'>
                <div class='flex-item cat-title' style="background-color:#eef">Modes</div>
                ${modesTable}
                ${categoryLists}
            </div>
        `;
    }



    generateBaseCSS(cpuName, isForStatic = false) {
        function getPageHeight(cpuName) {
            return (cpuName === '65C02' ? 1435 : 1125) + 'px';
        }

        const staticStyles = isForStatic ? `
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
            width: 1100px;
            height: auto;
            min-height: 1600px;
        }

        .header {
            text-align: center;
            font-size: 18px;
            color: gray;
            margin-bottom: 20px;
            font-weight: bold;
        }

        /* Force consistent layout for static HTML to match PNG */
        .flex-container {
            height: ${getPageHeight(cpuName)} !important;
            max-width: 1400px;
            margin: 0 auto;
        }

        .card {
            box-sizing: content-box !important; /* Match PNG generation */
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
            
            /* Keep fixed dimensions for print */
            .flex-container {
                height: ${getPageHeight(cpuName)} !important;
                max-height: none;
            }
        }

        /* Remove responsive styles that cause layout differences */
        ` : `
        body {
            background: white;
            padding: 10px;
            margin: 0;
        }`;

        return `
        @font-face {
            font-family: c64pro;
            src: url(data:font/truetype;charset=utf-8;base64,${this.fontBase64}) format('truetype');
        }
        
        * {
            font-family: c64pro, monospace;
            font-size: 14px;
        }

        ${staticStyles}

        .card {
            width: ${cpuName === '6502' ? '220px' : '240px'};
            display: inline-block;
            padding: 1px;
            border: 2px solid silver;
            margin-top: 4px;
            box-sizing: content-box; /* Ensure consistent box model */
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
            height: ${getPageHeight(cpuName)};
            ${isForStatic ? 'max-width: 1400px; margin: 0 auto;' : ''}
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


        .mode-label {
            font-size: 12px;
            color: #080;
        }
        `;
    }

    generateHTML(cpuName, cpuData, timingData = {}, isForStatic = false) {
        let contentHTML;

        if (cpuName === '6502') {
            contentHTML = this.generateContent6502(cpuData, timingData, false); // Always use non-static content for consistency
        } else {
            contentHTML = this.generateContent65C02(cpuData, timingData);
        }

        const css = this.generateBaseCSS(cpuName, isForStatic);
        const headerText = isForStatic ? `<div class="header">${cpuName} INSTRUCTIONS</div>` : `<div style="text-align:center;font-size:18px;color:gray;">${cpuName} INSTRUCTIONS</div>`;

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cpuName} Instructions Cheat Sheet</title>
    <style>
        ${css}
    </style>
</head>
<body>
    ${headerText}
    ${contentHTML}
    ${isForStatic ? this.generateInteractiveScript() : ''}
</body>
</html>`;
    }

    generateInteractiveScript() {
        return `
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
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 3px;
                background: white;
                z-index: 1000;
                font-family: Arial, sans-serif;
                font-size: 12px;
            \`;
            
            document.body.appendChild(searchInput);
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    if (searchTerm === '' || text.includes(searchTerm)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
            
            // Add Ctrl+F shortcut for search
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.key === 'f') {
                    e.preventDefault();
                    searchInput.focus();
                }
            });
        });
    </script>`;
    }
}

module.exports = CommonHTMLGenerator;

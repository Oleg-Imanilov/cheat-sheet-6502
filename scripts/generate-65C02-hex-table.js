import cpu65C02 from '../cpus/65C02.js';
import fs from 'fs';
import path from 'path';

// Create a map of hex codes to instruction names and addressing modes
function createHexMap() {
    const hexMap = {};
    
    cpu65C02.forEach(instruction => {
        if (instruction.hex) {
            Object.entries(instruction.hex).forEach(([mode, hexCode]) => {
                hexMap[hexCode.toUpperCase()] = {
                    name: instruction.name,
                    mode: mode,
                    title: instruction.title,
                    category: instruction.category || 'General'
                };
            });
        }
    });
    
    return hexMap;
}

// Generate HTML for the 16x16 hex table
function generateHexTable() {
    const hexMap = createHexMap();
    
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>65C02 CPU Instruction Set - Hex Table</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            margin: 20px;
            background-color: #f0f0f0;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 10px;
        }
        
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }
        
        .hex-table {
            border-collapse: collapse;
            margin: 0 auto;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .hex-table th,
        .hex-table td {
            width: 60px;
            height: 60px;
            border: 1px solid #ddd;
            text-align: center;
            vertical-align: middle;
            font-size: 11px;
            font-weight: bold;
        }
        
        .hex-table th {
            background-color: #4a4a4a;
            color: white;
            font-size: 12px;
        }
        
        .hex-table td {
            position: relative;
            cursor: pointer;
        }
        
        .hex-code {
            position: absolute;
            top: 2px;
            left: 2px;
            font-size: 8px;
            color: #666;
        }
        
        .instruction {
            font-size: 10px;
            color: #333;
            margin-top: 8px;
        }
        
        .mode {
            font-size: 7px;
            color: #888;
            margin-top: 2px;
        }
        
        .valid-instruction {
            background-color: #e8f5e8;
        }
        
        .invalid-instruction {
            background-color: #f8f8f8;
            color: #ccc;
        }
        
        /* Category-based color coding */
        .category-load---store {
            background-color: #e8f4fd;
        }
        
        .category-calc {
            background-color: #fff2e8;
        }
        
        .category-flow {
            background-color: #ffe8e8;
        }
        
        .category-stack {
            background-color: #fff8e8;
        }
        
        .category-state {
            background-color: #f8f8f8;
        }
        
        .category-transfer {
            background-color: #e8fff8;
        }
        
        .category-bits {
            background-color: #f0e8ff;
        }
        
        .category-misc {
            background-color: #f4fde8;
        }
        
        .legend {
            margin-top: 20px;
            text-align: center;
        }
        
        .legend-item {
            display: inline-block;
            margin: 2px 5px;
            padding: 3px 8px;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: 10px;
        }
        
        .legend-invalid {
            background-color: #f8f8f8;
        }
        
        .tooltip {
            position: absolute;
            background-color: #333;
            color: white;
            padding: 5px 8px;
            border-radius: 4px;
            font-size: 10px;
            z-index: 1000;
            display: none;
            white-space: nowrap;
            max-width: 300px;
        }
        
        .stats {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>65C02 CPU Instruction Set - Hexadecimal Opcode Table</h1>
        <div class="subtitle">Enhanced version of the 6502 with additional instructions and addressing modes</div>
        
        <table class="hex-table">
            <thead>
                <tr>
                    <th></th>`;
    
    // Header row with column hex digits
    for (let col = 0; col < 16; col++) {
        html += `<th>${col.toString(16).toUpperCase()}</th>`;
    }
    html += `</tr>
            </thead>
            <tbody>`;
    
    // Generate table rows
    let validCount = 0;
    let totalCount = 0;
    const categoryMap = new Map();
    
    for (let row = 0; row < 16; row++) {
        html += `<tr>`;
        html += `<th>${row.toString(16).toUpperCase()}</th>`; // Row header
        
        for (let col = 0; col < 16; col++) {
            const hexCode = (row * 16 + col).toString(16).toUpperCase().padStart(2, '0');
            const instruction = hexMap[hexCode];
            totalCount++;
            
            if (instruction) {
                validCount++;
                const category = instruction.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
                const categoryClass = `category-${category}`;
                
                // Count categories for stats
                if (!categoryMap.has(instruction.category)) {
                    categoryMap.set(instruction.category, 0);
                }
                categoryMap.set(instruction.category, categoryMap.get(instruction.category) + 1);
                
                html += `<td class="valid-instruction ${categoryClass}" data-hex="${hexCode}" data-instruction="${instruction.name}" data-mode="${instruction.mode}" data-title="${instruction.title}" data-category="${instruction.category}">
                    <div class="hex-code">${hexCode}</div>
                    <div class="instruction">${instruction.name}</div>
                    <div class="mode">${instruction.mode}</div>
                </td>`;
            } else {
                html += `<td class="invalid-instruction" data-hex="${hexCode}">
                    <div class="hex-code">${hexCode}</div>
                    <div class="instruction">-</div>
                </td>`;
            }
        }
        html += `</tr>`;
    }
    
    html += `</tbody>
        </table>
        
        <div class="legend">
            <div class="legend-item category-load---store">Load & Store</div>
            <div class="legend-item category-calc">Calc</div>
            <div class="legend-item category-flow">Flow</div>
            <div class="legend-item category-stack">Stack</div>
            <div class="legend-item category-state">State</div>
            <div class="legend-item category-transfer">Transfer</div>
            <div class="legend-item category-bits">Bits</div>
            <div class="legend-item category-misc">Misc</div>
            <div class="legend-item legend-invalid">Invalid/Illegal</div>
        </div>
        
        <div class="stats">
            <strong>Statistics:</strong> ${validCount} valid instructions out of ${totalCount} possible opcodes (${Math.round(validCount/totalCount*100)}% coverage)
        </div>
        
        <div class="tooltip" id="tooltip"></div>
    </div>
    
    <script>
        // Add hover tooltips
        const cells = document.querySelectorAll('.hex-table td');
        const tooltip = document.getElementById('tooltip');
        
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', (e) => {
                const hex = e.target.dataset.hex;
                const instruction = e.target.dataset.instruction;
                const mode = e.target.dataset.mode;
                const title = e.target.dataset.title;
                const category = e.target.dataset.category;
                
                if (instruction && instruction !== '-') {
                    tooltip.innerHTML = \`<strong>Opcode:</strong> $\{hex\}<br\><strong>Instruction:</strong> $\{instruction\}<br\><strong>Mode:</strong> $\{mode\}<br\><strong>Category:</strong> $\{category\}<br\><strong>Description:</strong> $\{title\}\`;
                } else {
                    tooltip.innerHTML = \`<strong>Opcode:</strong> $\{hex\}<br\>Invalid/Illegal instruction\`;
                }
                
                tooltip.style.display = 'block';
            });
            
            cell.addEventListener('mousemove', (e) => {
                tooltip.style.left = (e.pageX + 10) + 'px';
                tooltip.style.top = (e.pageY - 10) + 'px';
            });
            
            cell.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        });
    </script>
</body>
</html>`;
    
    return html;
}

// Main function to generate and save the HTML file
function main() {
    try {
        const html = generateHexTable();
        const outputDir = path.join(process.cwd(), 'docs');
        
        // Create docs directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const outputPath = path.join(outputDir, '65C02-hex-table.html');
        fs.writeFileSync(outputPath, html, 'utf8');
        
        console.log(`✅ 65C02 Hex table generated successfully: ${outputPath}`);
        console.log('📊 16x16 table with all hex opcodes (00-FF) created');
        console.log('🎯 Valid instructions are color-coded by category');
        console.log('❌ Invalid/illegal opcodes are shown in gray');
        console.log('🔧 Enhanced 65C02 features highlighted');
        
    } catch (error) {
        console.error('❌ Error generating 65C02 hex table:', error.message);
        process.exit(1);
    }
}

// Run the script
main();

import cpu6502 from '../cpus/6502.js';
import fs from 'fs';
import path from 'path';

// Create a map of hex codes to instruction names and addressing modes
function createHexMap() {
    const hexMap = {};
    
    cpu6502.forEach(instruction => {
        if (instruction.hex) {
            Object.entries(instruction.hex).forEach(([mode, hexCode]) => {
                hexMap[hexCode.toUpperCase()] = {
                    name: instruction.name,
                    mode: mode,
                    title: instruction.title
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
    <title>6502 CPU Instruction Set - Hex Table</title>
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
            margin-bottom: 30px;
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
        
        .legend {
            margin-top: 20px;
            text-align: center;
        }
        
        .legend-item {
            display: inline-block;
            margin: 0 15px;
            padding: 5px 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
        }
        
        .legend-valid {
            background-color: #e8f5e8;
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
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>6502 CPU Instruction Set - Hexadecimal Opcode Table</h1>
        
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
    for (let row = 0; row < 16; row++) {
        html += `<tr>`;
        html += `<th>${row.toString(16).toUpperCase()}</th>`; // Row header
        
        for (let col = 0; col < 16; col++) {
            const hexCode = (row * 16 + col).toString(16).toUpperCase().padStart(2, '0');
            const instruction = hexMap[hexCode];
            
            if (instruction) {
                html += `<td class="valid-instruction" data-hex="${hexCode}" data-instruction="${instruction.name}" data-mode="${instruction.mode}" data-title="${instruction.title}">
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
            <div class="legend-item legend-valid">Valid Instruction</div>
            <div class="legend-item legend-invalid">Invalid/Illegal Opcode</div>
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
                
                if (instruction && instruction !== '-') {
                    tooltip.innerHTML = \`Opcode: $\{hex\}<br\>Instruction: $\{instruction\}<br\>Mode: $\{mode\}<br\>Description: $\{title\}\`;
                } else {
                    tooltip.innerHTML = \`Opcode: $\{hex\}<br\>Invalid/Illegal instruction\`;
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
        
        const outputPath = path.join(outputDir, '6502-hex-table.html');
        fs.writeFileSync(outputPath, html, 'utf8');
        
        console.log(`✅ Hex table generated successfully: ${outputPath}`);
        console.log('📊 16x16 table with all hex opcodes (00-FF) created');
        console.log('🎯 Valid instructions are highlighted in green');
        console.log('❌ Invalid/illegal opcodes are shown in gray');
        
    } catch (error) {
        console.error('❌ Error generating hex table:', error.message);
        process.exit(1);
    }
}

// Run the script
main();

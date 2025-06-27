# [6502/65C02 CPU Cheat Sheet Generator](https://oleg-imanilov.github.io/cheat-sheet-6502/)

##                  [Browse and download](https://oleg-imanilov.github.io/cheat-sheet-6502/)

A simple, direct generator for creating 6502 and 65C02 CPU instruction cheat sheets in PNG and PDF formats.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Generate cheat sheets:
```bash
npm run generate           # Generate both PNG and PDF for both CPUs
npm run generate-png       # Generate PNG files only
npm run generate-pdf       # Generate PDF files only
npm run generate-both      # Generate both PNG and PDF for both CPUs
npm run generate-html      # Generate interactive HTML files only
npm run generate-hex-table # Generate 6502 hexadecimal instruction table
npm run generate-65C02-hex-table # Generate 65C02 hexadecimal instruction table
npm run generate-all       # Generate all files (PNG, PDF, HTML, and hex tables)
```

## Output

Generated files will be saved in the `docs/` directory:
- `cheat-sheet-6502.png` / `cheat-sheet-6502.pdf` / `cheat-sheet-6502.html`
- `cheat-sheet-65C02.png` / `cheat-sheet-65C02.pdf` / `cheat-sheet-65C02.html`
- `6502-hex-table.html` - 6502 hexadecimal instruction reference table
- `65C02-hex-table.html` - 65C02 hexadecimal instruction reference table
- `index.html` - Landing page with links to both HTML cheat sheets

![Cheat sheet 65C02](docs/cheat-sheet-65C02.png)
![Cheat sheet 6502](docs/cheat-sheet-6502.png)

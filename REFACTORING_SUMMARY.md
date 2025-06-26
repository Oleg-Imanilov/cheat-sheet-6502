# Code Refactoring Summary

## Overview
Successfully extracted common HTML generation functionality from `generate-direct.js` and `generate-html.js` into a shared `common-html-generator.js` module.

## Files Modified

### 1. New File: `scripts/common-html-generator.js`
**Purpose**: Contains all shared HTML generation logic

**Key Features**:
- `CommonHTMLGenerator` class with reusable methods
- Font loading and base64 encoding
- Text formatting utilities
- 6502 and 65C02 specific HTML generation
- CSS generation with responsive and print styles
- Interactive JavaScript functionality

**Main Methods**:
- `loadFontBase64()` - Loads and encodes the C64 Pro font
- `formatText(text, color)` - Formats text with color spans
- `generateCmd6502(cmd)` - Generates 6502 command cards
- `generateModesTable6502()` - Creates 6502 addressing modes table
- `generateContent6502(cpuData, isForStatic)` - Builds 6502 layout
- `generateCmd65C02(cmd, timingData, bgColor)` - Generates 65C02 command cards
- `generateModesTable65C02()` - Creates 65C02 addressing modes table
- `generateContent65C02(cpuData, timingData)` - Builds 65C02 layout
- `generateBaseCSS(cpuName, isForStatic)` - Creates base CSS styles
- `generateHTML(cpuName, cpuData, timingData, isForStatic)` - Main HTML generation
- `generateInteractiveScript()` - Adds search and interaction features

### 2. Modified: `scripts/generate-direct.js`
**Changes**:
- Added import for `CommonHTMLGenerator`
- Added `commonGenerator` instance to constructor
- Replaced entire `generateHTML` method with single line calling common generator
- Removed ~400 lines of duplicated code

### 3. Modified: `scripts/generate-html.js`
**Changes**:
- Added import for `CommonHTMLGenerator`
- Added `commonGenerator` instance to constructor
- Replaced entire `generateHTML` method with single line calling common generator
- Removed ~400 lines of duplicated code

## Benefits

### Code Maintenance
- **Single Source of Truth**: HTML generation logic now exists in one place
- **Consistency**: Both generators now produce identical output for the same input
- **Easier Updates**: Changes to styling, layout, or functionality only need to be made once

### Code Quality
- **Reduced Duplication**: Eliminated ~800 lines of duplicated code
- **Better Organization**: Related functionality grouped together
- **Improved Testability**: Common functionality can be tested independently

### Flexibility
- **Configurable Output**: The `isForStatic` parameter allows different styling for different use cases
- **Extensible**: Easy to add new CPU types or modify existing layouts
- **Reusable**: The common generator can be used by other scripts if needed

## Technical Details

### Parameters
The common generator uses an `isForStatic` boolean parameter to differentiate between:
- **Static HTML** (`true`): Includes responsive design, print styles, and interactive features
- **Direct PDF/PNG** (`false`): Simplified styling optimized for puppeteer rendering

### Font Handling
- Font is loaded once during constructor initialization
- Base64 encoding cached for reuse across multiple generations

### CSS Architecture
- Base styles shared between both formats
- Conditional styles applied based on CPU type and output format
- Responsive design for mobile/tablet compatibility
- Print-optimized layouts

### Interactive Features (Static Only)
- Click-to-highlight functionality for instruction cards
- Search functionality with Ctrl+F shortcut
- Print optimization with Ctrl+P
- Escape key to clear highlights

## File Size Reduction
- `generate-direct.js`: Reduced from ~450 lines to ~50 lines
- `generate-html.js`: Reduced from ~700+ lines to ~50 lines
- Total reduction: ~1100 lines of code

## Testing
Both generators were tested and confirmed to work correctly:
- `generate-html.js` successfully generated HTML files
- `generate-direct.js` successfully generated PNG files
- Output quality and functionality maintained

The refactoring maintains complete backward compatibility while significantly improving code maintainability.

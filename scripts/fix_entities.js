const fs = require('fs');
const path = require('path');

const replacements = [
    { target: /&#9776;/g, replacement: '&#9776;' },
    { target: /Ă˘Â˜Â°/g, replacement: '&#9776;' },
    { target: /â˜°/g, replacement: '&#9776;' },
    { target: /ĂÂÂ/g, replacement: '&#9776;' },
    { target: /☰/g, replacement: '&#9776;' },
    { target: /←/g, replacement: '&#8592;' }
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Aggressively replace anything inside the menu-toggle div with the entity
    // Matches: <div class="menu-toggle ...">...</div>
    content = content.replace(/(<div class="menu-toggle[^>]*>)([\s\S]*?)(<\/div>)/g, '$1&#9776;$3');

    // Also handle cases like <div class="menu-toggle ..."> ? </div> from education.html

    // Also handle other entities and potential mangles
    replacements.forEach(r => {
        content = content.replace(r.target, r.replacement);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated icons/entities in: ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'node_modules' || file === '.git' || file === 'scripts') return;
            walk(fullPath);
        } else if (file.endsWith('.html')) {
            processFile(fullPath);
        }
    });
}

const targetDir = 'C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website';
walk(targetDir);
console.log('Entity restoration complete.');

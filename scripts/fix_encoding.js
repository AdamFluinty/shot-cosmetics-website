const fs = require('fs');
const path = require('path');

const replacements = [
    // Menu icons
    { target: 'â˜°', replacement: '☰' },
    // Handle the case where the icon became a literal question mark in the toggle
    { target: '<div class="menu-toggle" id="mobile-menu" style="z-index: 10005; cursor: pointer;">?</div>', replacement: '<div class="menu-toggle" id="mobile-menu" style="z-index: 10005; cursor: pointer;">☰</div>' },
    { target: '<div class="menu-toggle" id="mobile-menu">?</div>', replacement: '<div class="menu-toggle" id="mobile-menu">☰</div>' },
    { target: '<div class="menu-toggle contact-header-fix" id="mobile-menu" style="z-index: 10005; cursor: pointer;">â˜°', replacement: '<div class="menu-toggle contact-header-fix" id="mobile-menu" style="z-index: 10005; cursor: pointer;">☰' },

    // Polish diacritics - UTF-8 mangled to ANSI/Windows-1250 patterns
    { target: 'Ăł', replacement: 'ó' },
    { target: 'Ĺ‚', replacement: 'ł' },
    { target: 'Ĺ›', replacement: 'ś' },
    { target: 'Ä™', replacement: 'ę' },
    { target: 'Ĺš', replacement: 'Ś' },
    { target: 'Ĺ„', replacement: 'ń' },
    { target: 'Ä…', replacement: 'ą' },
    { target: 'Ĺş', replacement: 'ź' },
    { target: 'Ĺ»', replacement: 'Ż' },
    { target: 'Ĺż', replacement: 'ż' },
    { target: 'Ä†', replacement: 'Ć' },
    { target: 'Ä‡', replacement: 'ć' },
    { target: 'Ă“', replacement: 'Ó' },
    { target: 'Ĺť', replacement: 'Ż' },
    { target: 'Ĺš', replacement: 'Ś' },

    // More complex words often found mangled
    { target: 'WĹ‚oska', replacement: 'Włoska' },
    { target: 'WĹ‚osĂłw', replacement: 'Włosów' },
    { target: 'WĹ‚oszech', replacement: 'Włoszech' },
    { target: 'pielÄ™gnacjÄ™', replacement: 'pielęgnację' },
    { target: 'ktĂłra', replacement: 'która' },
    { target: 'Ĺ‚Ä…czy', replacement: 'łączy' },
    { target: 'naturÄ™', replacement: 'naturę' },
    { target: 'zaawansowanÄ…', replacement: 'zaawansowaną' },
    { target: 'technologiÄ™', replacement: 'technologię' },
    { target: 'technologiÄ…', replacement: 'technologią' },
    { target: 'Ĺ‚Ä…czÄ…', replacement: 'łączą' },
    { target: 'pielÄ™gnacja', replacement: 'pielęgnacja' },
    { target: 'PielÄ™gnacja', replacement: 'Pielęgnacja' },
    { target: 'RozjaĹ›nianie', replacement: 'Rozjaśnianie' },
    { target: 'rozjaĹ›nianie', replacement: 'rozjaśnianie' },
    { target: 'doskonaĹ‚oĹ›ci', replacement: 'doskonałości' },
    { target: 'pewnoĹ›Ä‡', replacement: 'pewność' },
    { target: 'kaĹĽdego', replacement: 'każdego' },
    { target: 'historiÄ™', replacement: 'historię' },
    { target: 'TradycjÄ™', replacement: 'Tradycję' },
    { target: 'Ĺšwiat', replacement: 'Świat' },
    { target: 'siÄ™', replacement: 'się' }
];

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'node_modules' || file === '.git' || file === 'scripts') return;
            walk(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            replacements.forEach(({ target, replacement }) => {
                content = content.split(target).join(replacement);
            });

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed: ${fullPath}`);
            }
        }
    });
}

walk('C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website');
console.log('Encoding fix completed.');

const fs = require('fs');
const path = require('path');

const replacements = [
    // Double-mangled or specific patterns
    { target: 'Ă˘Â˜Â°', replacement: '☰' },
    { target: 'ÄąÂ ódzkie', replacement: 'Łódzkie' },
    { target: 'ÄąÂ ukasz', replacement: 'Łukasz' },
    { target: 'ÄąÂ ', replacement: 'Ł' },

    // Standard UTF-8 interpreted as ANSI/Latin1
    { target: 'Ĺ‚', replacement: 'ł' },
    { target: 'Ăł', replacement: 'ó' },
    { target: 'Ĺš', replacement: 'Ś' },
    { target: 'Ĺ›', replacement: 'ś' },
    { target: 'Ä™', replacement: 'ę' },
    { target: 'Ä…', replacement: 'ą' },
    { target: 'Ĺ„', replacement: 'ń' },
    { target: 'Ĺş', replacement: 'ź' },
    { target: 'ĹĽ', replacement: 'ż' },
    { target: 'Ĺť', replacement: 'Ż' },
    { target: 'Ä†', replacement: 'Ć' },
    { target: 'Ä‡', replacement: 'ć' },
    { target: 'Ă“', replacement: 'Ó' },
    { target: 'Ĺƒ', replacement: 'Ń' },

    // Common words for safety
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
    { target: 'siÄ™', replacement: 'się' },
    { target: 'OsiÄ…gniÄ™cia', replacement: 'Osiągnięcia' },
    { target: 'AktualnoĹ›ci', replacement: 'Aktualności' },
    { target: 'Ĺ›wiecie', replacement: 'świecie' },
    { target: 'NOWOĹšÄ†', replacement: 'NOWOŚĆ' },
    { target: 'juĹĽ', replacement: 'już' },
    { target: 'dostÄ™pna', replacement: 'dostępna' },
    { target: 'DoĹ‚Ä…cz', replacement: 'Dołącz' },
    { target: 'ZnajdĹş', replacement: 'Znajdź' },
    { target: 'poniĹĽszy', replacement: 'poniższy' },
    { target: 'wojewĂłdztwo', replacement: 'województwo' },
    { target: 'zastrzeĹĽone', replacement: 'zastrzeżone' },
    { target: 'Wszelkie', replacement: 'Wszelkie' }
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

const targetDir = 'C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website';
walk(targetDir);
console.log('Restoration complete.');

const fs = require('fs');
const path = require('path');

const replacements = [
    // Use the EXACT mangled strings from view_file logs
    { target: 'WĹ,oska', replacement: 'Włoska' },
    { target: 'pielÄ™gnacjÄ™', replacement: 'pielęgnację' },
    { target: 'ktĂłra', replacement: 'która' },
    { target: 'Ĺ,Ä...czy', replacement: 'łączy' },
    { target: 'naturÄ™', replacement: 'naturę' },
    { target: 'zaawansowanÄ…', replacement: 'zaawansowaną' },
    { target: 'technologiÄ…', replacement: 'technologią' },
    { target: '<li>? ', replacement: '<li>• ' },
    { target: '<span>?? ', replacement: '<span>• ' }, // Simple bullet for icons for now
    { target: 'â€“', replacement: '–' },
    { target: 'â˜°', replacement: '☰' },
    { target: 'Ĺ adowanie', replacement: 'Ładowanie' },
    { target: 'ÄąÂ ódzkie', replacement: 'Łódzkie' },
    { target: 'ÄąÂ ukasz', replacement: 'Łukasz' },
    { target: 'ÄąÂ ', replacement: 'Ł' },
    { target: 'Ă˘Â˜Â°', replacement: '☰' },
    { target: 'WarmiĹ„sko', replacement: 'Warmińsko' },
    { target: 'warmiĹ„sko', replacement: 'warmińsko' },
    { target: 'maĹ‚opolskie', replacement: 'małopolskie' },
    { target: 'MaĹ‚opolskie', replacement: 'Małopolskie' },
    { target: 'dolnoĹ›lÄ…skie', replacement: 'dolnośląskie' },
    { target: 'DolnoĹ›lÄ…skie', replacement: 'Dolnośląskie' },
    { target: 'Ĺ‚Ăłdzkie', replacement: 'łódzkie' },
    { target: 'Ĺ›wiÄ™tokrzyskie', replacement: 'świętokrzyskie' },
    { target: 'zastrzeĹĽone', replacement: 'zastrzeżone' },
    { target: 'UlubieĹ„cy', replacement: 'Ulubieńcy' },
    { target: 'formuĹ‚a', replacement: 'formuła' },
    { target: 'nawilĹĽenie', replacement: 'nawilżenie' },
    { target: 'obciÄ…ĹĽania', replacement: 'obciążania' },
    { target: 'GĹ‚Ä™boka', replacement: 'Głęboka' },
    { target: 'AktualnoĹ›ci', replacement: 'Aktualności' },
    { target: 'Ĺ›wiecie', replacement: 'świecie' },
    { target: 'NOWOĹšÄ†', replacement: 'NOWOŚĆ' },
    { target: 'juĹĽ', replacement: 'już' },
    { target: 'dostÄ™pna', replacement: 'dostępna' },
    { target: 'DoĹ‚Ä…cz', replacement: 'Dołącz' },
    { target: 'ZnajdĹş', replacement: 'Znajdź' },
    { target: 'wojewĂłdztwo', replacement: 'województwo' }
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
                console.log(`Tactical fix applied: ${fullPath}`);
            }
        }
    });
}

const targetDir = 'C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website';
walk(targetDir);
console.log('Tactical restoration complete.');

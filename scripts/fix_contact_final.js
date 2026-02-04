const fs = require('fs');
const path = require('path');

const filePath = 'C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website/pages/contact.html';
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
    // Use the EXACT strings from the view_file output
    { target: 'Ă˘Â˜Â°', replacement: '☰' },
    { target: 'ÄąÂ ódzkie', replacement: 'Łódzkie' },
    { target: 'ÄąÂ ukasz', replacement: 'Łukasz' },
    { target: 'ÄąÂ Ăłdzkie', replacement: 'Łódzkie' }, // Also handle other possible variants
    { target: 'ÄąÂ ', replacement: 'Ł' } // If there's a lone Ł mangled
];

replacements.forEach(({ target, replacement }) => {
    content = content.split(target).join(replacement);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final fixed contact.html');

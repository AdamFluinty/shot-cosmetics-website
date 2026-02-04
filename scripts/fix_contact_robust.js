const fs = require('fs');
const filePath = 'C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website/pages/contact.html';
let content = fs.readFileSync(filePath, 'utf8');

// These are the exact strings as they appear in the view_file output
const mappings = [
    { from: 'Ă˘Â˜Â°', to: '☰' },
    { from: 'ÄąÂ ', to: 'Ł' },
    { from: 'Ä…', to: 'ą' },
    { from: 'Ĺ‚', to: 'ł' },
    { from: 'Ăł', to: 'ó' },
    { from: 'Ĺ›', to: 'ś' },
    { from: 'Ä™', to: 'ę' },
    { from: 'Ĺş', to: 'ź' },
    { from: 'Ĺ„', to: 'ń' },
    { from: 'Ĺ»', to: 'Ż' },
    { from: 'Ĺż', replacement: 'ż' },
    { from: 'Ä†', to: 'Ć' },
    { from: 'Ä‡', to: 'ć' }
];

mappings.forEach(m => {
    // Escape special characters in the 'from' string if any
    const escaped = m.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');
    content = content.replace(regex, m.to);
});

// Final check for the specific Ł mangles found
content = content.replace(/ÄąÂ ódzkie/g, 'Łódzkie');
content = content.replace(/ÄąÂ ukasz/g, 'Łukasz');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Byte-level (simulated) fix completed for contact.html');

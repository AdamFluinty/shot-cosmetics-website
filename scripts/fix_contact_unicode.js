const fs = require('fs');
const filePath = 'C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website/pages/contact.html';
let content = fs.readFileSync(filePath, 'utf8');

// Using unicode escapes to be 100% sure we match the mangled characters
// Ă˘Â˜Â°
const mangledIcon = '\u0102\u02D8\u00C2\u02DC\u00B0';
content = content.replace(new RegExp(mangledIcon, 'g'), '☰');

// ÄąÂ ódzkie -> Ä (U+00C4) ą (U+0105) Â (U+00C2) space?
// Actually ÄąÂ is simpler.
const mangledLodz = '\u00C4\u0105\u00C2\u00A0'; // ÄąÂ followed by NBSP often
content = content.replace(/\u00C4\u0105\u00C2\u00A0/g, 'Ł');
content = content.replace(/\u00C4\u0105\u00C2/g, 'Ł'); // Variant without space

// More mangles from view_file:
// RozjaĹ›nianie -> Ĺ› (U+0139)
content = content.replace(/\u0139/g, 'ś');
content = content.replace(/\u013A/g, 'Ś');
content = content.replace(/\u0102/g, 'ć'); // Sometimes Ă is ć? No.

// Let's just do a broad cleanup of the known mangled sequences I see in the file:
const map = {
    'Ăł': 'ó',
    'Ĺ‚': 'ł',
    'Ĺ›': 'ś',
    'Ä™': 'ę',
    'Ĺš': 'Ś',
    'Ĺ„': 'ń',
    'Ä…': 'ą',
    'Ĺş': 'ź',
    'Ĺ»': 'Ż',
    'Ĺż': 'ż',
    'Ä†': 'Ć',
    'Ä‡': 'ć',
    'Ĺš': 'Ś',
    'Ĺť': 'Ż'
};

for (let [m, r] of Object.entries(map)) {
    content = content.split(m).join(r);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Unicode targeted fix completed.');

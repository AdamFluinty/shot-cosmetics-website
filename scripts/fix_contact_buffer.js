const fs = require('fs');
const filePath = 'C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website/pages/contact.html';
let buffer = fs.readFileSync(filePath);

function replaceBuffer(buf, targetStr, replacementStr) {
    let target = Buffer.from(targetStr, 'utf8');
    let replacement = Buffer.from(replacementStr, 'utf8');
    let index = buf.indexOf(target);
    while (index !== -1) {
        buf = Buffer.concat([
            buf.slice(0, index),
            replacement,
            buf.slice(index + target.length)
        ]);
        index = buf.indexOf(target, index + replacement.length);
    }
    return buf;
}

// Targeted replacements based on what we see in view_file
// Note: We use the literal strings from the log, hoping Buffer.from(..., 'utf8') matches them.
buffer = replaceBuffer(buffer, 'Ă˘Â˜Â°', '☰');
buffer = replaceBuffer(buffer, 'ÄąÂ ódzkie', 'Łódzkie');
buffer = replaceBuffer(buffer, 'ÄąÂ ukasz', 'Łukasz');
buffer = replaceBuffer(buffer, 'ÄąÂ ', 'Ł');
buffer = replaceBuffer(buffer, 'Ĺ›wiat', 'Świat');
buffer = replaceBuffer(buffer, 'pielÄ™gnacja', 'pielęgnacja');
buffer = replaceBuffer(buffer, 'PielÄ™gnacja', 'Pielęgnacja');
buffer = replaceBuffer(buffer, 'siÄ™', 'się');

fs.writeFileSync(filePath, buffer);
console.log('Buffer-level fix completed for contact.html');

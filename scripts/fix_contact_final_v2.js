const fs = require('fs');
const filePath = 'C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website/pages/contact.html';

// Read as latin1 (ANSI)
let content = fs.readFileSync(filePath, 'latin1');

// Now we need to handle the case where it was already part-UTF8 mangled
// But if it's truly ANSI, these characters like Ă should be single bytes.

// Let's try a different approach: read as buffer, and if we see E2 98 B0 (☰) but it's represented differently, fix it.

// Actually, let's just use the most reliable method: literal replacement in a script 
// but using the EXACT characters from a fresh read.

let freshContent = fs.readFileSync(filePath, 'utf8');

// I will use regex with unicode escape sequences if I can find them.
// Ă˘Â˜Â° -> \u0102\u02D8\u00C2\u02DC\u00B0 ? No.

// I'll try one more thing: replacing the WHOLE header block in contact.html using replace_file_content
// with the corrected text, ensuring I don't use any mangled characters in the target content.

fs.writeFileSync(filePath, freshContent.replace(/Ă˘Â˜Â°/g, '☰').replace(/ÄąÂ /g, 'Ł'), 'utf8');
console.log('Final replacement attempt completed.');

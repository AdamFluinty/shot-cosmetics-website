const fs = require('fs');
const path = require('path');

const filePath = 'C:/Users/Adamn/.gemini/antigravity/scratch/shot-cosmetics-website/pages/contact.html';
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
    { target: 'Ă˘Â˜Â°', replacement: '☰' },
    { target: 'RozjaĹ›nianie', replacement: 'Rozjaśnianie' },
    { target: 'PielÄ™gnacja', replacement: 'Pielęgnacja' },
    { target: 'Ĺšwiat Shot', replacement: 'Świat Shot' },
    { target: 'siÄ™ z nami', replacement: 'się z nami' },
    { target: 'JesteĹ›my tu, aby pomĂłc!', replacement: 'Jesteśmy tu, aby pomóc!' },
    { target: 'WyĹ›lij wiadomoĹ›Ä‡', replacement: 'Wyślij wiadomość' },
    { target: 'ImiÄ™ i nazwisko', replacement: 'Imię i nazwisko' },
    { target: 'WiadomoĹ›Ä‡', replacement: 'Wiadomość' },
    { target: 'Twoja wiadomoĹ›Ä‡', replacement: 'Twoja wiadomość' },
    { target: 'PrzykĹ‚adowa', replacement: 'Przykładowa' },
    { target: 'ZnajdĹş', replacement: 'Znajdź' },
    { target: 'dolnoĹ›lÄ…skie', replacement: 'dolnośląskie' },
    { target: 'Ĺ‚Ăłdzkie', replacement: 'łódzkie' },
    { target: 'Ĺ›wiÄ™tokrzyskie', replacement: 'świętokrzyskie' },
    { target: 'maĹ‚opolskie', replacement: 'małopolskie' },
    { target: 'wojewĂłdztwo', replacement: 'województwo' },
    { target: 'zastrzeĹĽone', replacement: 'zastrzeżone' },
    { target: 'DolnoĹ›lÄ…skie', replacement: 'Dolnośląskie' },
    { target: 'WiĹ›niewski', replacement: 'Wiśniewski' },
    { target: 'WĂłjcik', replacement: 'Wójcik' },
    { target: 'ÄąÂ Ăłdzkie', replacement: 'Łódzkie' },
    { target: 'MaĹ‚opolskie', replacement: 'Małopolskie' },
    { target: 'MichaĹ‚', replacement: 'Michał' },
    { target: 'ZajÄ…c', replacement: 'Zając' },
    { target: 'KrĂłl', replacement: 'Król' },
    { target: 'ĹšlÄ…skie', replacement: 'Śląskie' },
    { target: 'ĹšwiÄ™tokrzyskie', replacement: 'Świętokrzyskie' },
    { target: 'JabĹ‚oĹ„ska', replacement: 'Jabłońska' },
    { target: 'WarmiĹ„sko', replacement: 'Warmińsko' },
    { target: 'ÄąÂ ukasz', replacement: 'Łukasz' },
    { target: 'WrĂłbel', replacement: 'Wróbel' },
    { target: 'Ó', replacement: 'Ó' }, // Just in case
    { target: 'Ă“', replacement: 'Ó' },
    { target: 'Ä…', replacement: 'ą' },
    { target: 'Ĺ‚', replacement: 'ł' },
    { target: 'Ăł', replacement: 'ó' },
    { target: 'Ĺ›', replacement: 'ś' },
    { target: 'Ä™', replacement: 'ę' },
    { target: 'Ĺş', replacement: 'ź' },
    { target: 'Ĺ„', replacement: 'ń' },
    { target: 'Ĺ»', replacement: 'Ż' },
    { target: 'Ĺż', replacement: 'ż' },
    { target: 'Ä†', replacement: 'Ć' },
    { target: 'Ä‡', replacement: 'ć' }
];

replacements.forEach(({ target, replacement }) => {
    content = content.split(target).join(replacement);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed contact.html');

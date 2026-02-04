const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '../assets/data/products_v2.json');
const OUTPUT_FILE = path.join(__dirname, '../assets/data/shot_full_content.json');

const trainings = [
    {
        title: "Szkolenie Podstawowe: Koloryzacja DNA",
        description: "Opanuj podstawy naszej nowej, rewolucyjnej technologii koloryzacji. Dowiedz się, jak wykorzystać kolagen i kwasy owocowe.",
        date: "2024-11-15T10:00:00.000Z",
        location: "Warszawa, Centrum Szkoleniowe Shot",
        capacity_status: "Dostępne"
    },
    {
        title: "Blond Mastery - Warsztaty Praktyczne",
        description: "Zaawansowane techniki rozjaśniania i tonowania dla uzyskania idealnych blondów. Intensywne warsztaty na modelkach.",
        date: "2024-11-22T10:00:00.000Z",
        location: "Kraków, Hotel Galaxy",
        capacity_status: "Lista Rezerwowa"
    },
    {
        title: "Pielęgnacja Zimowa i Trychologia",
        description: "Jak dbać o włosy w trudnych warunkach zimowych? Poznaj nasze procedury zabiegowe i diagnozę skóry głowy.",
        date: "2024-12-05T18:00:00.000Z",
        location: "Online (Webinar)",
        capacity_status: "Dostępne"
    }
];

const articles = [
    {
        title: "Targi Look 2024",
        slug: "targi-look-2024",
        excerpt: "Zobacz naszą relację z największych targów fryzjerskich w Polsce.",
        content: [{ type: "paragraph", children: [{ type: "text", text: "Dziękujemy za setki odwiedzin stoiska Shot Cosmetics!" }] }]
    },
    {
        title: "Nowe Maski Care & Glamour",
        slug: "nowe-maski-care-glamour",
        excerpt: "Rozszerzamy naszą linię pielęgnacyjną o maski do włosów wysokoporowatych.",
        content: [{ type: "paragraph", children: [{ type: "text", text: "Już dostępne u Dystrybutorów." }] }]
    },
    {
        title: "Trendy na Lato 2024",
        slug: "trendy-lato-2024",
        excerpt: "Słoneczne refleksy i naturalny blask. Zobacz, co będzie modne.",
        content: [{ type: "paragraph", children: [{ type: "text", text: "Przewodnik po trendach wakacyjnych." }] }]
    },
    {
        title: "Akademia Shot w Rzymie",
        slug: "akademia-shot-rzym",
        excerpt: "Relacja z wyjazdu naszych Top Edukatorów do głównej siedziby Shot we Włoszech.",
        content: [{ type: "paragraph", children: [{ type: "text", text: "Inspirujący wyjazd szkoleniowy." }] }]
    }
];

try {
    const rawData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const data = JSON.parse(rawData);

    // Merge everything into one object
    const finalData = {
        categories: data.categories, // Product hierarchy
        trainings: trainings,
        articles: articles
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 4));
    console.log('Successfully created shot_full_content.json');
} catch (err) {
    console.error('Error merging data:', err);
}

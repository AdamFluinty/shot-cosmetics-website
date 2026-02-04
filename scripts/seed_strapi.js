const fs = require('fs');
const path = require('path');
// Uses native global fetch (Node 18+)

const STRAPI_URL = 'http://localhost:1337/api';
// WARNING: REPLACE WITH YOUR STRAPI API TOKEN
const API_TOKEN = 'YOUR_STRAPI_API_TOKEN';

const PRODUCTS_FILE = path.join(__dirname, '../assets/data/shot_full_content.json');

async function seed() {
    try {
        console.log('Reading FULL master data...');
        const rawData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        const data = JSON.parse(rawData);

        console.log(`Found ${data.categories.length} top-level categories.`);

        // 1. Seed Products (Categories hierarchy)
        for (const cat of data.categories) {
            await processCategory(cat);
        }

        // 2. Seed Trainings (from JSON)
        if (data.trainings) {
            console.log('Seeding Trainings from master file...');
            for (const t of data.trainings) {
                await createEntry('trainings', t);
            }
        }

        // 3. Seed Articles (from JSON)
        if (data.articles) {
            console.log('Seeding Articles from master file...');
            for (const a of data.articles) {
                await createEntry('articles', a);
            }
        }

        console.log('Seeding complete!');
    } catch (error) {
        console.error('Seeding failed:', error);
    }
}

// Image Helper
async function uploadPlaceholderImage() {
    try {
        console.log('Uploading placeholder image (mock implementation)...');
        // NOTE: Real implementation requires 'form-data' package or Node 18+ FormData with fetch
        // For this script to remain dependency-free (except native fetch), we skip complex upload.
        // If Strapi is local, we could technically copy files to public/uploads, but API upload is cleaner.
        console.log('Skipping image upload to keep script dependency-free.');
        return null;
    } catch (e) {
        console.error('Image upload failed:', e);
        return null;
    }
}

async function processCategory(catData, parentId = null) {
    console.log(`Processing Category: ${catData.name}`);

    // 1. Create Category
    const category = await createEntry('categories', {
        name: catData.name,
        slugname: catData.id || slugify(catData.name),
        description: catData.description,
        parent: parentId
    });

    if (!category) return;

    // 2. Process Subcategories (if any)
    if (catData.subcategories && catData.subcategories.length > 0) {
        for (const sub of catData.subcategories) {
            await processCategory(sub, category.id);
        }
    }

    // 3. Process Products (if any)
    if (catData.products && catData.products.length > 0) {
        for (const prod of catData.products) {
            await createEntry('products', {
                name: prod.name,
                description: prod.desc,
                shortDescription: prod.desc, // mapping desc to shortDescription as well
                volume: prod.capacity,
                category: category.id
                // image: placeholderImageId // TODO: Uncomment when image upload is enabled
            });
        }
    }
}

async function createSampleEvent() {
    console.log('Creating sample Event (Article)...');
    await createEntry('articles', {
        title: "Pokaz Fryzjerski 2024",
        slug: "pokaz-fryzjerski-2024",
        excerpt: "Wielkie wydarzenie w Warszawie. Zobacz najnowsze trendy.",
        content: [
            {
                type: "paragraph",
                children: [{ type: "text", text: "Zapraszamy na niesamowity pokaz..." }]
            }
        ]
    });
}

async function createEntry(collection, data) {
    try {
        const response = await fetch(`${STRAPI_URL}/${collection}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify({ data })
        });

        const result = await response.json();

        if (!response.ok) {
            // Check if error is "duplicate" (already exists) - simplistic check
            if (result.error && result.error.message.includes('unique')) {
                console.log(`  -> Entry "${data.name || data.title}" likely exists. Skipping.`);
                return null; // Return null so we don't try to add children to non-existant ID if logic differs, but here simplistic
            }
            console.error(`  Error creating ${collection} item "${data.name || data.title}":`, result.error?.message || result);
            return null;
        }

        console.log(`  -> Created ${collection}: ${data.name || data.title} (ID: ${result.data.id})`);
        return result.data;
    } catch (e) {
        console.error(`Network error creating ${collection}:`, e.message);
        return null;
    }
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

seed();

async function seedTrainings() {
    console.log('Seeding Trainings...');
    const trainings = [
        {
            title: "Szkolenie Podstawowe: Koloryzacja DNA",
            description: "Opanuj podstawy naszej nowej, rewolucyjnej technologii koloryzacji. Dowiedz się, jak wykorzystać kolagen i kwasy owocowe.",
            date: "2024-11-15T10:00:00.000Z", // 15 LIS
            location: "Warszawa, Centrum Szkoleniowe Shot",
            capacity_status: "Dostępne"
        },
        {
            title: "Blond Mastery - Warsztaty Praktyczne",
            description: "Zaawansowane techniki rozjaśniania i tonowania dla uzyskania idealnych blondów. Intensywne warsztaty na modelkach.",
            date: "2024-11-22T10:00:00.000Z", // 22 LIS
            location: "Kraków, Hotel Galaxy",
            capacity_status: "Lista Rezerwowa"
        },
        {
            title: "Pielęgnacja Zimowa i Trychologia",
            description: "Jak dbać o włosy w trudnych warunkach zimowych? Poznaj nasze procedury zabiegowe i diagnozę skóry głowy.",
            date: "2024-12-05T18:00:00.000Z", // 05 GRU
            location: "Online (Webinar)",
            capacity_status: "Dostępne"
        }
    ];

    for (const t of trainings) {
        await createEntry('trainings', t);
    }
}

async function seedArticles() {
    console.log('Seeding Articles (News/Events)...');
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

    for (const a of articles) {
        await createEntry('articles', a);
    }
}

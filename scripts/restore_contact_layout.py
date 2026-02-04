import os
import re

def restore():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    index_path = os.path.join(base_dir, 'index.html')
    contact_path = os.path.join(base_dir, 'pages', 'contact.html')

    # Read Index
    with open(index_path, 'r', encoding='utf-8') as f:
        index_content = f.read()

    # Extract SVG
    svg_match = re.search(r'<svg.*?class="map".*?</svg>', index_content, re.DOTALL)
    if not svg_match:
        print("Error: Could not find SVG map in index.html")
        return

    svg_content = svg_match.group(0).replace('assets/', '../assets/')

    # Distributors Data (Hardcoded from backup to ensure integrity)
    DISTRIBUTORS_JS = """
    const distributors = {
        'POL3141': { name: 'Jan Nowak', phone: '500 100 100', email: 'wroclaw@shot.pl', label: 'Dolnośląskie' },
        'POL3145': { name: 'Anna Kowalska', phone: '500 200 200', email: 'torun@shot.pl', label: 'Kujawsko-pomorskie' },
        'POL3151': { name: 'Piotr Wiśniewski', phone: '500 300 300', email: 'lublin@shot.pl', label: 'Lubelskie' },
        'POL3143': { name: 'Maria Wójcik', phone: '500 400 400', email: 'zielonagora@shot.pl', label: 'Lubuskie' },
        'POL3147': { name: 'Krzysztof Kaczmarek', phone: '500 500 500', email: 'lodz@shot.pl', label: 'Łódzkie' },
        'POL3170': { name: 'Agnieszka Mazur', phone: '500 600 600', email: 'krakow@shot.pl', label: 'Małopolskie' },
        'POL3148': { name: 'Tomasz Krawczyk', phone: '500 700 700', email: 'warszawa@shot.pl', label: 'Mazowieckie' },
        'POL3167': { name: 'Barbara Piotrowska', phone: '500 800 800', email: 'opole@shot.pl', label: 'Opolskie' },
        'POL3152': { name: 'Michał Grabowski', phone: '500 900 900', email: 'rzeszow@shot.pl', label: 'Podkarpackie' },
        'POL3150': { name: 'Ewa Zając', phone: '600 100 100', email: 'bialystok@shot.pl', label: 'Podlaskie' },
        'POL3140': { name: 'Adam Pawlak', phone: '600 200 200', email: 'gdansk@shot.pl', label: 'Pomorskie' },
        'POL3146': { name: 'Magdalena Król', phone: '600 300 300', email: 'katowice@shot.pl', label: 'Śląskie' },
        'POL3149': { name: 'Marcin Wieczorek', phone: '600 400 400', email: 'kielce@shot.pl', label: 'Świętokrzyskie' },
        'POL3139': { name: 'Monika Jabłońska', phone: '600 500 500', email: 'olsztyn@shot.pl', label: 'Warmińsko-mazurskie' },
        'POL3144': { name: 'Łukasz Wróbel', phone: '600 600 600', email: 'poznan@shot.pl', label: 'Wielkopolskie' },
        'POL3142': { name: 'Katarzyna Nowicka', phone: '600 700 700', email: 'szczecin@shot.pl', label: 'Zachodniopomorskie' }
    };
    """

    # Build New Contact Content (Matching Premium Layout in Screenshots)
    new_html = f"""<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kontakt - Shot Cosmetics</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css?v=2">
    <style>
        /* Contact Page Specific Styles */
        .contact-header-fix {{ color: var(--color-text) !important; }}
        
        .map-section {{
            padding: 6rem 0;
        }}

        .voivodship {{
            cursor: pointer;
            transition: all 0.3s ease;
            fill: #e0e0e0; /* Default gray from screenshot */
            stroke: #ffffff;
            stroke-width: 1px;
        }}
        
        .voivodship:hover, .voivodship.active {{
            fill: var(--color-purple-dark); /* Dark Purple active state */
        }}

        .info-card {{
            background: #ffffff;
            padding: 3rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.05); /* Soft shadow */
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }}

        .form-control {{
            background: #ffffff;
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 1rem;
            width: 100%;
            margin-bottom: 1rem;
            font-family: var(--font-body);
        }}
        
        label {{
            font-weight: 700;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            display: block;
            color: #333;
        }}

        .gold-box {{
            background: #C5A065; /* Contact Gold */
            color: white;
            padding: 3rem;
            border-radius: 4px;
        }}

        .gold-box p, .gold-box a {{
            color: white;
            opacity: 0.9;
            text-decoration: none;
        }}
    </style>
</head>

<body>

    <header>
        <div class="container">
            <nav>
                <a href="../index.html" class="logo">Shot<span style="color:var(--color-gold)">.</span></a>
                <!-- Forced hamburger fix -->
                <div class="menu-toggle contact-header-fix" id="mobile-menu" style="z-index: 10001; cursor: pointer;" onclick="document.querySelector('.nav-links').classList.toggle('active')">☰</div>
                <ul class="nav-links">
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="about.html">O Nas</a></li>
                    <li class="dropdown">
                        <a href="products.html" class="dropdown-toggle">Produkty</a>
                        <ul class="dropdown-menu">
                            <li><a href="products.html?cat=koloryzacja">Koloryzacja</a></li>
                            <li><a href="products.html?cat=rozjasnianie">Rozjaśnianie</a></li>
                            <li class="has-submenu">
                                <a href="products.html?cat=pielegnacja">Pielęgnacja</a>
                                <ul class="submenu">
                                    <li><a href="products.html?cat=pielegnacja&sub=0">Color Care</a></li>
                                    <li><a href="products.html?cat=pielegnacja&sub=1">Simply Blond</a></li>
                                    <li><a href="products.html?cat=pielegnacja&sub=2">Anti-Age</a></li>
                                    <li><a href="products.html?cat=pielegnacja&sub=3">Anti-Stress</a></li>
                                    <li><a href="products.html?cat=pielegnacja&sub=4">Texturizing</a></li>
                                    <li><a href="products.html?cat=pielegnacja&sub=5">Tricoilogy</a></li>
                                    <li><a href="products.html?cat=pielegnacja&sub=6">Sun</a></li>
                                </ul>
                            </li>
                            <li><a href="products.html?cat=zabiegi-kuracje">Zabiegi</a></li>
                            <li><a href="products.html?cat=techniczne">Techniczne</a></li>
                            <li><a href="products.html?cat=stylizacja">Stylizacja</a></li>
                        </ul>
                    </li>
                    <li><a href="education.html">Edukacja</a></li>
                    <li><a href="news.html">Świat Shot</a></li>
                    <li><a href="contact.html" class="active">Kontakt</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <!-- Contact Header -->
        <section class="container text-center" style="padding-top: 8rem; padding-bottom: 4rem;">
            <h1 style="margin-bottom: 1rem; color: var(--color-purple-dark);">Skontaktuj się z nami</h1>
            <p style="color: var(--color-text-light);">Jesteśmy tu, aby pomóc!</p>
        </section>

        <!-- Form Section -->
        <section class="container" style="margin-bottom: 6rem;">
            <div class="grid-2-cols" style="align-items: stretch;">
                <div style="background: white; padding: 3rem; box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
                    <h2 style="color: var(--color-purple-dark); margin-bottom: 2rem;">Wyślij wiadomość</h2>
                    <form>
                        <div class="form-group">
                            <label>Imię i nazwisko</label>
                            <input type="text" class="form-control" placeholder="Jan Kowalski">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" placeholder="jan@email.com">
                        </div>
                        <div class="form-group">
                            <label>Wiadomość</label>
                            <textarea class="form-control" rows="4" placeholder="Twoja wiadomość..."></textarea>
                        </div>
                        <button type="submit" class="btn" style="background: var(--color-purple-dark); color: white; width: 100%; padding: 1rem; border: none; font-weight: 700; letter-spacing: 1px; cursor: pointer;">WYŚLIJ</button>
                    </form>
                </div>
                
                <div class="gold-box">
                    <h2 style="color: white; margin-bottom: 2rem;">Informacje kontaktowe</h2>
                    <div style="margin-bottom: 2rem;">
                        <span style="display:block; font-weight:700; margin-bottom:0.5rem;">Adres</span>
                        <p>Shot Cosmetics Polska<br>ul. Przykładowa 123<br>00-001 Warszawa</p>
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <span style="display:block; font-weight:700; margin-bottom:0.5rem;">Telefon</span>
                        <p>+48 22 123 45 67</p>
                    </div>
                    <div>
                        <span style="display:block; font-weight:700; margin-bottom:0.5rem;">Email</span>
                        <a href="mailto:kontakt@shot.pl">kontakt@shot.pl</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="container text-center" style="margin-bottom: 4rem;">
            <span style="font-size: 0.8rem; letter-spacing: 2px; color: var(--color-purple-dark); text-transform: uppercase;">Dystrybucja</span>
        </div>

        <!-- Map Section -->
        <section class="container text-center" style="margin-bottom: 3rem;">
           <h2 style="color: var(--color-purple-dark); font-size: 2.5rem; margin-bottom: 1rem;">Znajdź Dystrybutora w Twoim Regionie</h2>
        </section>

        <section class="container map-section" style="margin-bottom: 6rem;">
            <div class="grid-2-cols" style="gap: 4rem; align-items: center;">
                <!-- Map -->
                <div>
                   {svg_content}
                   <p style="text-align: center; margin-top: 1rem; color: #ccc; font-size: 0.8rem;">Kliknij na województwo</p>
                </div>

                <!-- Info Panel -->
                <div class="info-card">
                    <h3 id="dist-region" style="color: var(--color-purple-dark); margin-bottom: 2rem; font-size: 2rem;">Wybierz region</h3>
                    <div style="display: flex; gap: 2rem; align-items: center;">
                        <div style="width: 80px; height: 80px; background: #f5f5f5; border-radius: 50%; overflow: hidden; flex-shrink: 0;">
                             <img id="dist-photo" src="../assets/images/educator1.png" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;" alt="Opiekun">
                        </div>
                        <div>
                            <small style="text-transform: uppercase; letter-spacing: 1px; color: #999; font-size: 0.7rem;">Opiekun Marki</small>
                            <h4 id="dist-name" style="margin: 0.2rem 0; font-size: 1.3rem;">-</h4>
                            
                            <small style="text-transform: uppercase; letter-spacing: 1px; color: #999; font-size: 0.7rem; display: block; margin-top: 1rem;">Telefon</small>
                            <p id="dist-phone" style="margin: 0;">-</p>

                            <small style="text-transform: uppercase; letter-spacing: 1px; color: #999; font-size: 0.7rem; display: block; margin-top: 1rem;">Email</small>
                            <a id="dist-email" href="#" style="color: var(--color-purple-dark); text-decoration: none;">-</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <footer>
        <div class="container text-center">
            <p>&copy; 2024 Shot Cosmetics Polska. Wszystkie prawa zastrzeżone.</p>
        </div>
    </footer>

    <script src="../js/main.js"></script>
    <script>
        {DISTRIBUTORS_JS}

        const infoName = document.getElementById('dist-name');
        const infoPhone = document.getElementById('dist-phone');
        const infoEmail = document.getElementById('dist-email');
        const infoRegion = document.getElementById('dist-region');

        function initMap() {{
            const paths = document.querySelectorAll('.voivodship');
            
            // Initial Set (Warszawa)
            setActiveRegion('POL3148');

            paths.forEach(path => {{
                path.addEventListener('click', function () {{
                    setActiveRegion(this.id);
                }});
            }});
        }}

        function setActiveRegion(id) {{
            const paths = document.querySelectorAll('.voivodship');
            paths.forEach(p => p.classList.remove('active'));

            const activePath = document.getElementById(id);
            if (activePath) activePath.classList.add('active');

            const data = distributors[id];
            if (data) {{
                infoRegion.textContent = data.label;
                infoName.textContent = data.name;
                infoPhone.textContent = data.phone;
                infoEmail.textContent = data.email;
                infoEmail.href = 'mailto:' + data.email;
            }}
        }}

        document.addEventListener('DOMContentLoaded', initMap);
    </script>
</body>
</html>"""

    with open(contact_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print("Successfully restored contact.html layout.")

if __name__ == "__main__":
    restore()

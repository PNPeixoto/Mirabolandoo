class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('mirabolando_lang') || 'pt-BR';
        this.init();
    }

    init() {
        this.applyLanguage(this.currentLang);
        this.createSwitcherUI();

        // Listen for custom event to update other components if needed
        window.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.language;
            this.updateActiveSwitcher();
            this.updateTexts();
        });
    }

    setLanguage(lang) {
        if (!translations[lang]) return;

        this.currentLang = lang;
        localStorage.setItem('mirabolando_lang', lang);

        // Dispatch event so other parts of the app can react
        const event = new CustomEvent('languageChanged', { detail: { language: lang } });
        window.dispatchEvent(event);

        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        document.documentElement.lang = lang;
        this.updateTexts();
        this.updatePlaceholders();
        this.updateActiveSwitcher();
    }

    updateTexts() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[this.currentLang] && translations[this.currentLang][key]) {
                if (element.innerHTML.includes('<span') || element.innerHTML.includes('<br>')) {
                    // Careful with HTML content
                    element.innerHTML = translations[this.currentLang][key];
                } else {
                    element.innerText = translations[this.currentLang][key];
                }
            }
        });
    }

    updatePlaceholders() {
        const elements = document.querySelectorAll('[data-i18n-placeholder]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[this.currentLang] && translations[this.currentLang][key]) {
                element.placeholder = translations[this.currentLang][key];
            }
        });
    }

    createSwitcherUI() {
        const nav = document.querySelector('.home-nav') || document.querySelector('header .header-content') || document.querySelector('nav');
        if (!nav) return;

        if (document.getElementById('lang-switcher')) return;

        const switcherContainer = document.createElement('div');
        switcherContainer.id = 'lang-switcher';
        switcherContainer.className = 'lang-switcher';

        const languages = [
            { code: 'pt-BR', label: 'Brasil', flag: 'https://flagcdn.com/w40/br.png' },
            { code: 'en', label: 'USA', flag: 'https://flagcdn.com/w40/us.png' },
            { code: 'es', label: 'España', flag: 'https://flagcdn.com/w40/es.png' }
        ];

        languages.forEach(lang => {
            const btn = document.createElement('button');
            btn.className = `lang-btn ${this.currentLang === lang.code ? 'active' : ''}`;
            btn.ariaLabel = `Mudar para ${lang.label}`;

            const img = document.createElement('img');
            img.src = lang.flag;
            img.alt = lang.label;
            img.width = 24;
            img.height = 18;

            btn.appendChild(img);
            btn.onclick = () => this.setLanguage(lang.code);
            switcherContainer.appendChild(btn);
        });

        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.appendChild(switcherContainer);
        } else {
            const simpleNav = document.querySelector('nav');
            if (simpleNav) {
                simpleNav.appendChild(switcherContainer);
            }
        }
    }

    updateActiveSwitcher() {
        const btns = document.querySelectorAll('.lang-btn');
        // We know the order: pt-BR, en, es
        const langOrder = ['pt-BR', 'en', 'es'];

        btns.forEach((btn, index) => {
            const btnLang = langOrder[index];
            if (btnLang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

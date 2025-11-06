// Simple i18n implementation for Conflict Cost Analysis

class I18n {
    constructor() {
        this.currentLang = 'en'; // Default language
        this.translations = {};
        this.supportedLanguages = {
            'en': '🇬🇧 English',
            'de': '🇩🇪 Deutsch',
            'es': '🇪🇸 Español',
            'pt': '🇵🇹 Português',
            'it': '🇮🇹 Italiano',
            'pl': '🇵🇱 Polski',
            'bg': '🇧🇬 Български',
            'hi': '🇮🇳 हिन्दी',
            'kn': '🇮🇳 ಕನ್ನಡ'
        };
    }

    async init() {
        // Check if language is stored in localStorage
        const savedLang = localStorage.getItem('conflictCostLang');
        if (savedLang && this.supportedLanguages[savedLang]) {
            this.currentLang = savedLang;
        }

        await this.loadLanguage(this.currentLang);
        this.updatePage();
        this.attachEventListeners();
    }

    async loadLanguage(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load language: ${lang}`);
            }
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('conflictCostLang', lang);
        } catch (error) {
            console.error('Error loading language:', error);
            // Fallback to English if error
            if (lang !== 'en') {
                await this.loadLanguage('en');
            }
        }
    }

    t(key) {
        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value;
    }

    updatePage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translation;
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Update page title
        document.title = this.t('page.title');

        // Update language dropdown
        const currentLangElement = document.getElementById('currentLanguage');
        if (currentLangElement) {
            currentLangElement.textContent = this.supportedLanguages[this.currentLang];
        }

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    attachEventListeners() {
        // Language selector click handlers
        document.querySelectorAll('.lang-selector').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const lang = e.currentTarget.getAttribute('data-lang');
                await this.loadLanguage(lang);
                this.updatePage();
            });
        });
    }
}

// Global i18n instance
const i18n = new I18n();

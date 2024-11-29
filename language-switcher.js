// Translation dictionary
const translations = {
    th: {} // Will be populated dynamically
};

// Function to translate text using fetch API
async function translateText(text, targetLang) {
    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        return data[0][0][0];
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
}

// Function to translate all elements with data-translate attribute
async function translatePage(lang) {
    if (lang === 'en') {
        // Restore original English content
        document.querySelectorAll('[data-translate], [data-translate-address]').forEach(element => {
            const originalText = element.getAttribute('data-original-text');
            if (originalText) {
                element.textContent = originalText;
            }
        });
        updateButtonState('en');
        return;
    }

    // Store original text and translate to target language
    const elements = document.querySelectorAll('[data-translate], [data-translate-address]');
    for (const element of elements) {
        // Store original text if not already stored
        if (!element.getAttribute('data-original-text')) {
            element.setAttribute('data-original-text', element.textContent);
        }

        const originalText = element.getAttribute('data-original-text');
        
        // Check if we already have the translation
        if (!translations[lang][originalText]) {
            translations[lang][originalText] = await translateText(originalText, lang);
        }
        
        element.textContent = translations[lang][originalText];
    }
    
    updateButtonState(lang);
}

// Function to change language
function changeLanguage(lang) {
    translatePage(lang);
    localStorage.setItem('selectedLanguage', lang);
}

// Update button states
function updateButtonState(lang) {
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${lang}-btn`).classList.add('active');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Restore last selected language
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== 'en') {
        changeLanguage(savedLanguage);
    }
});

// Translation dictionary
const translations = {
    th: {} // Will be populated dynamically
};

// Function to translate text using fetch API
async function translateText(text, targetLang) {
    try {
        // Add dt=t&dt=bd to get better address translations
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&dt=bd&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        
        // Ensure we get the full translation
        let translatedText = '';
        data[0].forEach(item => {
            if (item[0]) {
                translatedText += item[0];
            }
        });
        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
}

// Function to translate all elements with data-translate attribute
async function translatePage(lang) {
    if (lang === 'en') {
        // Restore original English content
        document.querySelectorAll('[data-translate], address').forEach(element => {
            const originalText = element.getAttribute('data-original-text');
            if (originalText) {
                element.textContent = originalText;
            }
        });
        updateButtonState('en');
        return;
    }

    // Store original text and translate to target language
    const elements = document.querySelectorAll('[data-translate], address');
    for (const element of elements) {
        // Skip empty elements
        if (!element.textContent.trim()) continue;

        // Store original text if not already stored
        if (!element.getAttribute('data-original-text')) {
            element.setAttribute('data-original-text', element.textContent.trim());
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

// Rest of the code remains the same
function changeLanguage(lang) {
    translatePage(lang);
    localStorage.setItem('selectedLanguage', lang);
}

function updateButtonState(lang) {
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${lang}-btn`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== 'en') {
        changeLanguage(savedLanguage);
    }
});

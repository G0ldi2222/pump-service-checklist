function changeLanguage(lang) {
    // Hide all language elements
    document.querySelectorAll('[lang]').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show elements for selected language
    document.querySelectorAll(`[lang="${lang}"]`).forEach(el => {
        el.style.display = 'block';
    });
    
    // Update button states
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${lang}-btn`).classList.add('active');
}

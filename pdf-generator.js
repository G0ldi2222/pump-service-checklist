function generatePDF() {
    // Force English language for PDF generation
    const originalLanguage = localStorage.getItem('selectedLanguage');
    if (originalLanguage !== 'en') {
        changeLanguage('en');
    }

    const element = document.querySelector('.content-wrapper');
    
    const opt = {
        filename: 'pump-service-checklist.pdf',
        margin: [15, 15, 15, 15], // Slightly larger margins for better readability
        image: { 
            type: 'jpeg', 
            quality: 0.98 
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            letterRendering: true,
            logging: false,
            windowWidth: 1200 // Fixed width for consistent rendering
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            putOnlyUsedFonts: true,
            compress: true
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.page-break-before',
            after: '.page-break-after',
            avoid: ['tr', 'td', '.checklist-item', '.important-notes li']
        }
    };

    // Generate PDF
    html2pdf().from(element).set(opt).save().then(() => {
        // Restore original language after PDF generation
        if (originalLanguage !== 'en') {
            setTimeout(() => changeLanguage(originalLanguage), 1000);
        }
    });
}

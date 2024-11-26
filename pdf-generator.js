function generatePDF() {
    const element = document.querySelector('.content-wrapper');
    
    const opt = {
        filename: 'pump-service-checklist.pdf',
        margin: [10, 10, 10, 10],
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            letterRendering: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            putOnlyUsedFonts: true
        },
        pagebreak: { mode: 'avoid-all' }
    };

    html2pdf().from(element).set(opt).save();
}

// Initialize jsPDF
window.jsPDF = window.jspdf.jsPDF;

// Set current date
document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date().toLocaleDateString('en-GB');
    document.getElementById('currentDate').textContent = currentDate;
});

// Language switching
function changeLanguage(lang) {
    const buttons = document.querySelectorAll('.language-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${lang}-btn`).classList.add('active');
}

// PDF Generation Configuration
const PDF_CONFIG = {
    format: 'a4',
    unit: 'mm',
    orientation: 'portrait',
    margins: {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
    }
};

// Prepare content for PDF
function prepareForPDF(element) {
    // Add PDF generation class
    document.body.classList.add('generating-pdf');
    
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Apply print-specific styles
    clone.style.width = '210mm';
    clone.style.padding = '0';
    clone.style.margin = '0 auto';
    clone.style.background = 'white';
    
    // Remove navigation elements
    const navbar = clone.querySelector('.navbar');
    if (navbar) navbar.remove();
    
    return clone;
}

// Generate PDF
async function generatePDF() {
    try {
        // Store original language
        const originalLanguage = localStorage.getItem('selectedLanguage');
        if (originalLanguage !== 'en') {
            changeLanguage('en');
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Get content element
        const content = document.querySelector('.content-wrapper');
        if (!content) throw new Error('Content not found');

        // Configure html2canvas
        const html2canvasOptions = {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            scrollY: -window.scrollY,
            windowWidth: content.scrollWidth,
            windowHeight: content.scrollHeight,
            onclone: (clonedDoc) => {
                const clonedContent = clonedDoc.querySelector('.content-wrapper');
                if (clonedContent) {
                    prepareForPDF(clonedContent);
                }
            }
        };

        // Create canvas
        const canvas = await html2canvas(content, html2canvasOptions);
        
        // Calculate dimensions
        const imgWidth = 210 - (PDF_CONFIG.margins.left + PDF_CONFIG.margins.right);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Initialize PDF
        const pdf = new jsPDF({
            orientation: PDF_CONFIG.orientation,
            unit: PDF_CONFIG.unit,
            format: PDF_CONFIG.format,
            compress: true
        });

        // Add content to PDF
        let position = PDF_CONFIG.margins.top;
        const pageHeight = 297 - (PDF_CONFIG.margins.top + PDF_CONFIG.margins.bottom);

        // Add pages
        while (position < imgHeight) {
            // Add image
            pdf.addImage(
                canvas.toDataURL('image/jpeg', 1.0),
                'JPEG',
                PDF_CONFIG.margins.left,
                position === PDF_CONFIG.margins.top ? PDF_CONFIG.margins.top : -(position - PDF_CONFIG.margins.top),
                imgWidth,
                imgHeight,
                '',
                'FAST'
            );

            position += pageHeight;

            // Add new page if needed
            if (position < imgHeight) {
                pdf.addPage();
            }
        }

        // Save PDF
        pdf.save('pump-service-checklist.pdf');

        // Cleanup
        document.body.classList.remove('generating-pdf');

        // Restore original language
        if (originalLanguage !== 'en') {
            setTimeout(() => changeLanguage(originalLanguage), 500);
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please check the console for details.');
        document.body.classList.remove('generating-pdf');
    }
}

// Attach PDF generation to button
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-pdf-btn');
    if (generateButton) {
        generateButton.onclick = generatePDF;
    }
}); 
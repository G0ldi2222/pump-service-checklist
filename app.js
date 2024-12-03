// Initialize jsPDF
window.jsPDF = window.jspdf.jsPDF;

// Set current date
document.addEventListener('DOMContentLoaded', () => {
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const date = new Date();
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit'
        };
        currentDateElement.textContent = date.toLocaleDateString('en-GB', options);
    }
});

// PDF Generation Configuration
const PDF_CONFIG = {
    format: 'a4',
    orientation: 'portrait',
    unit: 'mm',
    compress: true,
    hotfixes: ['px_scaling'],
    precision: 16
};

// Prepare content for PDF
function prepareForPDF(element) {
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Remove navigation elements
    const navbar = clone.querySelector('.navbar');
    if (navbar) navbar.remove();
    
    // Add PDF generation class
    clone.classList.add('generating-pdf');
    
    // Set fixed dimensions
    clone.style.width = '210mm';
    clone.style.minHeight = '297mm';
    clone.style.margin = '0';
    clone.style.padding = '0';
    clone.style.background = 'white';
    
    return clone;
}

// Generate PDF
async function generatePDF() {
    try {
        // Show loading state
        document.body.classList.add('generating-pdf');
        const generateBtn = document.getElementById('generate-pdf-btn');
        if (generateBtn) {
            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating PDF...';
        }

        // Get content element
        const content = document.querySelector('.content-wrapper');
        if (!content) throw new Error('Content element not found');

        // Configure html2canvas
        const scale = window.devicePixelRatio > 1 ? 2 : 1.5;
        const html2canvasOptions = {
            scale: scale,
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
            },
            backgroundColor: 'white'
        };

        // Create canvas
        const canvas = await html2canvas(content, html2canvasOptions);
        
        // Calculate dimensions
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Create PDF
        const pdf = new jsPDF({
            orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Add image to PDF
        pdf.addImage(
            canvas.toDataURL('image/jpeg', 1.0),
            'JPEG',
            0,
            0,
            imgWidth,
            imgHeight,
            '',
            'FAST'
        );

        // Save PDF
        const fileName = `Pump-Service-Checklist_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);

    } catch (error) {
        console.error('PDF Generation Error:', error);
        alert('Error generating PDF. Please try again.');
    } finally {
        // Reset UI state
        document.body.classList.remove('generating-pdf');
        const generateBtn = document.getElementById('generate-pdf-btn');
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate PDF';
        }
    }
}

// Add event listener for PDF generation
document.getElementById('generate-pdf-btn')?.addEventListener('click', generatePDF); 
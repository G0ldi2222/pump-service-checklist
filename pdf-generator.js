function generatePDF() {
    try {
        // Update date before generating PDF
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        document.getElementById('currentDate').textContent = formattedDate;

        // Force English language for PDF generation
        const originalLanguage = localStorage.getItem('selectedLanguage');
        if (originalLanguage !== 'en') {
            changeLanguage('en');
        }

        // Get the content element
        const element = document.querySelector('.content-wrapper');
        if (!element) {
            console.error('Content wrapper not found');
            return;
        }

        // Apply print styles
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                body {
                    margin: 0;
                    padding: 0;
                    background: white;
                }
                .content-wrapper {
                    padding: 10mm;
                    background: white;
                    width: 210mm;
                    box-sizing: border-box;
                    font-size: 10pt;
                }
                .header-card {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5mm;
                }
                .header-left {
                    flex: 2;
                }
                .header-right {
                    flex: 1;
                    text-align: right;
                }
                .document-info {
                    text-align: left;
                    margin-left: auto;
                    width: fit-content;
                }
                .document-info p {
                    margin: 0 0 2mm 0;
                    font-size: 10pt;
                    line-height: 1.3;
                }
                .document-info p:last-child {
                    margin-bottom: 0;
                }
                h2 {
                    margin: 3mm 0 2mm 0;
                    page-break-after: avoid;
                    font-size: 12pt;
                }
                .form-section {
                    margin-bottom: 3mm;
                }
                #pump-information-section,
                #operating-information-section {
                    page-break-inside: avoid;
                    break-inside: avoid;
                }
                #customer-preparation-section {
                    page-break-before: always;
                    break-before: page;
                }
                input[type="text"],
                input[type="email"],
                input[type="number"],
                input[type="date"],
                textarea {
                    border: 1px solid black !important;
                    background: white !important;
                    padding: 2px 4px !important;
                    margin: 1mm 0 !important;
                    font-size: 10pt !important;
                    font-family: inherit !important;
                    width: calc(100% - 8px) !important;
                    min-height: 20px !important;
                    box-sizing: border-box !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                .navbar {
                    display: none !important;
                }
                .pump-info,
                .operating-info {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3mm;
                    margin-bottom: 3mm;
                }
                .checklist-group {
                    page-break-inside: avoid;
                    margin-bottom: 3mm;
                }
                .checklist-item {
                    margin-bottom: 1mm;
                    display: flex;
                    align-items: flex-start;
                }
                .checklist-item input[type="checkbox"] {
                    margin: 3px 6px 0 0;
                }
                label {
                    margin-bottom: 1mm;
                    display: block;
                    font-weight: normal;
                }
                #operating-information-section {
                    margin-top: 3mm;
                }
            }
        `;
        document.head.appendChild(style);

        // Configure html2pdf options
        const opt = {
            margin: [10, 10, 10, 10],
            filename: 'pump-service-checklist.pdf',
            pagebreak: { 
                mode: ['css', 'avoid-all'],
                before: '#customer-preparation-section'
            },
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                scrollX: 0,
                scrollY: -window.scrollY
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        // Generate PDF
        return html2pdf()
            .from(element)
            .set(opt)
            .save()
            .then(() => {
                // Clean up
                document.head.removeChild(style);
                
                // Restore original language
                if (originalLanguage !== 'en') {
                    setTimeout(() => changeLanguage(originalLanguage), 1000);
                }
            })
            .catch(error => {
                console.error('PDF generation failed:', error);
                document.head.removeChild(style);
                if (originalLanguage !== 'en') {
                    changeLanguage(originalLanguage);
                }
                throw error;
            });
    } catch (error) {
        console.error('Error in generatePDF:', error);
        alert('Failed to generate PDF. Please try again.');
    }
}

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

        // Ensure all content is loaded
        const contentPromises = [
            'customer-info-content',
            'pump-info-content',
            'operating-conditions-content',
            'customer-preparation-content'
        ].map(id => {
            const element = document.getElementById(id);
            return element && element.children.length > 0 ? 
                Promise.resolve() : 
                new Promise(resolve => setTimeout(resolve, 1000));
        });

        // Wait for images to load
        const images = Array.from(element.getElementsByTagName('img'));
        const imagePromises = images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        });

        // Apply print styles
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                * {
                    margin: 0 !important;
                    padding: 0 !important;
                    box-sizing: border-box !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                
                body {
                    background: white !important;
                    font-family: Arial, sans-serif !important;
                    font-size: 10pt !important;
                    line-height: 1.2 !important;
                    color: black !important;
                    -webkit-font-smoothing: antialiased !important;
                }

                .content-wrapper {
                    width: 100% !important;
                    padding: 5mm !important;
                    background: white !important;
                }

                .navbar {
                    display: none !important;
                }

                /* Header */
                .header-card {
                    display: flex !important;
                    justify-content: space-between !important;
                    margin-bottom: 3mm !important;
                }

                .header-left {
                    flex: 2 !important;
                }

                .header-right {
                    flex: 1 !important;
                    text-align: right !important;
                }

                .company-address p,
                .document-info p {
                    margin: 0 !important;
                    line-height: 1.2 !important;
                    font-size: 10pt !important;
                }

                .qr-code {
                    width: 25mm !important;
                    height: 25mm !important;
                    margin-top: 2mm !important;
                }

                /* Sections */
                .form-section {
                    margin-bottom: 2mm !important;
                    background: white !important;
                }

                h1 {
                    font-size: 12pt !important;
                    margin-bottom: 3mm !important;
                    font-weight: bold !important;
                }

                h2 {
                    font-size: 11pt !important;
                    margin: 1mm 0 !important;
                    font-weight: bold !important;
                }

                /* Grid layouts */
                .pump-info,
                .operating-info,
                .customer-info {
                    display: grid !important;
                    grid-template-columns: 1fr 1fr !important;
                    gap: 2mm !important;
                    margin-bottom: 2mm !important;
                }

                /* Form elements */
                input[type="text"],
                input[type="email"],
                input[type="number"],
                input[type="date"],
                textarea {
                    border: 1px solid black !important;
                    padding: 1mm !important;
                    margin: 0 !important;
                    height: 5mm !important;
                    min-height: 5mm !important;
                    font-size: 10pt !important;
                    background: white !important;
                    font-family: Arial, sans-serif !important;
                }

                /* Checklist items */
                .checklist-group {
                    margin-bottom: 1mm !important;
                    background: white !important;
                }

                .checklist-item {
                    display: flex !important;
                    align-items: flex-start !important;
                    margin-bottom: 0.5mm !important;
                }

                .checklist-item:last-child {
                    margin-bottom: 0 !important;
                }

                .checklist-item input[type="checkbox"] {
                    margin: 1px 2px 0 0 !important;
                    width: 3mm !important;
                    height: 3mm !important;
                }

                /* Images */
                img {
                    max-width: 100% !important;
                    height: auto !important;
                    display: block !important;
                }

                /* Remove ALL page breaks */
                * {
                    page-break-before: avoid !important;
                    page-break-after: avoid !important;
                    page-break-inside: auto !important;
                }
            }
        `;
        document.head.appendChild(style);

        // Wait for all content and images to load
        return Promise.all([...contentPromises, ...imagePromises]).then(() => {
            // Configure html2pdf options
            const opt = {
                margin: [5, 5, 5, 5],
                filename: 'pump-service-checklist.pdf',
                image: { 
                    type: 'jpeg', 
                    quality: 1.0 
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    scrollY: -window.scrollY,
                    scrollX: 0,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    windowWidth: document.documentElement.clientWidth,
                    windowHeight: document.documentElement.clientHeight,
                    logging: false,
                    removeContainer: true,
                    imageTimeout: 15000,
                    onclone: function(clonedDoc) {
                        Array.from(clonedDoc.querySelectorAll('input[type="text"], textarea')).forEach(input => {
                            if (!input.value) {
                                input.style.height = '5mm';
                            }
                        });
                    }
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                    compress: true,
                    precision: 16
                },
                pagebreak: { mode: 'avoid-all' }
            };

            return html2pdf()
                .from(element)
                .set(opt)
                .toPdf()
                .get('pdf')
                .then(pdf => {
                    pdf.setProperties({
                        title: 'Pump Service Checklist',
                        subject: 'Service Documentation',
                        creator: 'Pump Service System',
                        producer: 'html2pdf.js'
                    });
                    return pdf;
                })
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
        });
    } catch (error) {
        console.error('Error in generatePDF:', error);
        alert('Failed to generate PDF. Please try again.');
    }
}

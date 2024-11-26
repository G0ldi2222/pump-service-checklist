function generatePDF() {
    const element = document.body;
    const opt = {
        margin: 10,
        filename: 'pump-service-checklist.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(element).save();
}

# Pump Service Checklist

A bilingual (English/Thai) web application for documenting pump service procedures with dynamic translation capabilities.

## Live Demo

Visit the live application at: https://g0ldi2222.github.io/pump-service-checklist/

## Features

- Bilingual support (English/Thai)
- Dynamic form validation
- PDF generation
- Responsive design
- Automatic date handling
- Input sanitization
- Comprehensive error handling

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/G0ldi2222/pump-service-checklist.git
cd pump-service-checklist
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

4. Open `index.html` in your browser to view the application.

## GitHub Pages Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process:

1. Updates the `gh-pages` branch
2. Serves the content from the root directory
3. Makes the application available at the GitHub Pages URL

## Dependencies

- jsPDF (PDF generation)
- html2canvas (HTML to canvas conversion)
- DOMPurify (Input sanitization)
- Jest (Testing)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- Make sure to fill out all required fields before generating PDF
- For best results, use Chrome browser
- Enable JavaScript for full functionality

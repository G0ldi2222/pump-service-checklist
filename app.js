// Initialize jsPDF
const { jsPDF } = window.jspdf;

// Form validation and utility functions
const FormValidator = {
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validatePhone: (phone) => {
        const re = /^[+]?[\d\s-]{8,}$/;
        return re.test(phone);
    },
    
    validateRequired: (value) => {
        return value.trim().length > 0;
    },
    
    sanitizeInput: (input) => {
        return DOMPurify.sanitize(input.trim());
    }
};

// Error handling utility
const ErrorHandler = {
    showError: (element, message) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        element.parentNode.appendChild(errorDiv);
        element.classList.add('error');
    },
    
    clearError: (element) => {
        const errorDiv = element.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
            element.classList.remove('error');
        }
    },
    
    clearAllErrors: () => {
        document.querySelectorAll('.error-message').forEach(err => err.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }
};

// PDF Generation Configuration
const PDF_CONFIG = {
    format: 'a4',
    orientation: 'portrait',
    unit: 'mm',
    compress: true,
    hotfixes: ['px_scaling'],
    precision: 16,
    optimization: {
        compress: true,
        quality: 0.95
    },
    // A4 dimensions in mm
    width: 210,
    height: 297,
    margin: 10
};

// Initialize the application
function initializeApp() {
    // Cache DOM elements
    const elements = {
        currentDate: document.getElementById('currentDate'),
        generateBtn: document.getElementById('generate-pdf-btn'),
        form: document.querySelector('form'),
        requiredInputs: document.querySelectorAll('input[required], textarea[required]')
    };

    // Set current date
    if (elements.currentDate) {
        const date = new Date();
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit'
        };
        elements.currentDate.textContent = date.toLocaleDateString('en-GB', options);
    }
    
    // Add form validation
    if (elements.requiredInputs.length > 0) {
        elements.requiredInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => ErrorHandler.clearError(input));
        });
    }

    // Add PDF generation event listener
    if (elements.generateBtn) {
        console.log('Adding PDF generation listener');
        elements.generateBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await generatePDF();
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error generating PDF. Please try again.');
            }
        });
    }

    return elements;
}

// Validate individual field
function validateField(field) {
    ErrorHandler.clearError(field);
    
    const value = FormValidator.sanitizeInput(field.value);
    
    if (!FormValidator.validateRequired(value)) {
        ErrorHandler.showError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !FormValidator.validateEmail(value)) {
        ErrorHandler.showError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && !FormValidator.validatePhone(value)) {
        ErrorHandler.showError(field, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

// Validate all fields
function validateForm() {
    ErrorHandler.clearAllErrors();
    let isValid = true;
    
    document.querySelectorAll('input[required], textarea[required]').forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Generate PDF with improved error handling and performance
async function generatePDF() {
    console.log('Starting PDF generation');
    if (!validateForm()) {
        alert('Please fill in all required fields correctly before generating PDF');
        return;
    }

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

        console.log('Preparing content for PDF');
        
        // Create a clone for PDF generation
        const clone = content.cloneNode(true);
        
        // Create a temporary container with specific dimensions
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        // Set exact A4 dimensions and scaling
        container.style.width = `${PDF_CONFIG.width}mm`;
        container.style.minHeight = `${PDF_CONFIG.height}mm`;
        container.style.background = 'white';
        container.style.padding = `${PDF_CONFIG.margin}mm`;
        container.style.boxSizing = 'border-box';
        
        // Prepare clone styles
        clone.style.width = '100%';
        clone.style.height = 'auto';
        clone.style.position = 'relative';
        clone.style.overflow = 'visible';
        
        // Remove navbar from clone
        const navbar = clone.querySelector('.navbar');
        if (navbar) navbar.remove();

        // Process all input fields and textareas
        clone.querySelectorAll('input, textarea').forEach(field => {
            if (field.type === 'checkbox') {
                // Handle checkboxes
                const wrapper = document.createElement('div');
                wrapper.className = 'pdf-checkbox';
                wrapper.style.display = 'inline-block';
                wrapper.style.width = '20px';
                wrapper.style.height = '20px';
                wrapper.style.border = '2px solid #333';
                wrapper.style.borderRadius = '3px';
                wrapper.style.backgroundColor = field.checked ? '#333' : 'white';
                wrapper.style.position = 'relative';
                
                if (field.checked) {
                    // Add checkmark for checked boxes
                    wrapper.innerHTML = '✓';
                    wrapper.style.color = 'white';
                    wrapper.style.textAlign = 'center';
                    wrapper.style.lineHeight = '18px';
                    wrapper.style.fontSize = '14px';
                }
                
                field.parentNode.replaceChild(wrapper, field);
            } else if (field.classList.contains('hours-input')) {
                // Special handling for training hours input
                const value = field.value.trim();
                const wrapper = document.createElement('span');
                wrapper.className = 'pdf-field-value hours-value';
                wrapper.style.display = 'inline-block';
                wrapper.style.minWidth = '50px';
                wrapper.style.padding = '2px 8px';
                wrapper.style.border = '1px solid #ccc';
                wrapper.style.borderRadius = '4px';
                wrapper.style.marginLeft = '8px';
                wrapper.style.marginRight = '8px';
                wrapper.textContent = value;
                field.parentNode.replaceChild(wrapper, field);
            } else {
                // Handle regular input fields and textareas
                const value = field.value;
                const wrapper = document.createElement('div');
                wrapper.className = 'pdf-field-value';
                wrapper.style.minHeight = field.offsetHeight + 'px';
                wrapper.style.padding = '4px 8px';
                wrapper.style.border = '1px solid #ccc';
                wrapper.style.borderRadius = '4px';
                wrapper.style.wordBreak = 'break-word';
                wrapper.style.whiteSpace = 'pre-wrap';
                wrapper.textContent = value;
                field.parentNode.replaceChild(wrapper, field);
            }
        });

        // Additional styling for the safety training section
        const safetyTrainingSection = clone.querySelector('label[for="safety_training"]');
        if (safetyTrainingSection) {
            safetyTrainingSection.style.display = 'flex';
            safetyTrainingSection.style.alignItems = 'center';
            safetyTrainingSection.style.gap = '8px';
            safetyTrainingSection.style.flexWrap = 'nowrap';
        }

        // Add clone to container and container to body
        container.appendChild(clone);
        document.body.appendChild(container);

        console.log('Generating canvas');
        // Generate canvas with improved settings
        const canvas = await html2canvas(container, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            allowTaint: true,
            backgroundColor: 'white',
            windowWidth: container.scrollWidth,
            windowHeight: container.scrollHeight,
            logging: true,
            onclone: (clonedDoc) => {
                // Additional processing of cloned document if needed
                const clonedContent = clonedDoc.querySelector('.content-wrapper');
                if (clonedContent) {
                    clonedContent.style.transform = 'scale(1)';
                    clonedContent.style.transformOrigin = 'top left';
                }
            }
        });

        // Clean up
        document.body.removeChild(container);
        
        console.log('Creating PDF');
        // Create PDF with proper dimensions
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Calculate dimensions to maintain aspect ratio
        const imgWidth = PDF_CONFIG.width - (PDF_CONFIG.margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add content to PDF with proper scaling
        pdf.addImage(
            canvas.toDataURL('image/jpeg', 1.0), // Use maximum quality
            'JPEG',
            PDF_CONFIG.margin,
            PDF_CONFIG.margin,
            imgWidth,
            imgHeight,
            undefined,
            'FAST'
        );

        // If content is longer than one page, add additional pages
        if (imgHeight > (PDF_CONFIG.height - (PDF_CONFIG.margin * 2))) {
            let currentHeight = PDF_CONFIG.height - (PDF_CONFIG.margin * 2);
            while (currentHeight < imgHeight) {
                pdf.addPage();
                pdf.addImage(
                    canvas.toDataURL('image/jpeg', 1.0),
                    'JPEG',
                    PDF_CONFIG.margin,
                    -(currentHeight) + PDF_CONFIG.margin,
                    imgWidth,
                    imgHeight,
                    undefined,
                    'FAST'
                );
                currentHeight += PDF_CONFIG.height - (PDF_CONFIG.margin * 2);
            }
        }

        // Save PDF
        const fileName = `Pump-Service-Checklist_${new Date().toISOString().split('T')[0]}.pdf`;
        console.log('Saving PDF:', fileName);
        pdf.save(fileName);

    } catch (error) {
        console.error('PDF Generation Error:', error);
        alert(`Error generating PDF: ${error.message}. Please try again.`);
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

// Initialize the application when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ... existing code ... 
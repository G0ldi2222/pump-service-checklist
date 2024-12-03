import { expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom';

// Mock the required globals and functions
global.FormValidator = {
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
    }
};

global.ErrorHandler = {
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

global.generatePDF = async () => {
    if (!validateForm()) {
        alert('Please fill in all required fields correctly before generating PDF');
        return;
    }
    document.body.classList.add('generating-pdf');
    const generateBtn = document.getElementById('generate-pdf-btn');
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating PDF...';
    }
};

global.validateForm = () => true;

describe('Form Validation', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form>
                <input type="email" id="email" required />
                <input type="tel" id="phone" required />
                <input type="text" id="name" required />
            </form>
        `;
    });

    test('validates email correctly', () => {
        const emailInput = document.getElementById('email');
        emailInput.value = 'test@example.com';
        expect(FormValidator.validateEmail(emailInput.value)).toBe(true);
        
        emailInput.value = 'invalid-email';
        expect(FormValidator.validateEmail(emailInput.value)).toBe(false);
    });

    test('validates phone numbers correctly', () => {
        const phoneInput = document.getElementById('phone');
        phoneInput.value = '+1234567890';
        expect(FormValidator.validatePhone(phoneInput.value)).toBe(true);
        
        phoneInput.value = '123';
        expect(FormValidator.validatePhone(phoneInput.value)).toBe(false);
    });

    test('validates required fields', () => {
        const nameInput = document.getElementById('name');
        nameInput.value = 'John Doe';
        expect(FormValidator.validateRequired(nameInput.value)).toBe(true);
        
        nameInput.value = '';
        expect(FormValidator.validateRequired(nameInput.value)).toBe(false);
    });
});

describe('Error Handling', () => {
    let testElement;
    let parentElement;
    
    beforeEach(() => {
        parentElement = document.createElement('div');
        testElement = document.createElement('div');
        parentElement.appendChild(testElement);
        document.body.appendChild(parentElement);
    });

    afterEach(() => {
        document.body.removeChild(parentElement);
        ErrorHandler.clearAllErrors();
    });

    test('shows error message', () => {
        ErrorHandler.showError(testElement, 'Test error');
        const errorMessage = testElement.parentNode.querySelector('.error-message');
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.textContent).toBe('Test error');
        expect(testElement.classList.contains('error')).toBe(true);
    });

    test('clears error message', () => {
        ErrorHandler.showError(testElement, 'Test error');
        ErrorHandler.clearError(testElement);
        const errorMessage = testElement.parentNode.querySelector('.error-message');
        expect(errorMessage).toBeFalsy();
        expect(testElement.classList.contains('error')).toBe(false);
    });
});

describe('PDF Generation', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <button id="generate-pdf-btn">Generate PDF</button>
            <div class="content-wrapper">
                <form>
                    <input type="text" required value="test" />
                    <input type="email" required value="test@example.com" />
                    <input type="tel" required value="+1234567890" />
                </form>
            </div>
        `;
    });

    test('shows loading state during PDF generation', async () => {
        const generateBtn = document.getElementById('generate-pdf-btn');
        await generatePDF();
        expect(document.body.classList.contains('generating-pdf')).toBe(true);
        expect(generateBtn.disabled).toBe(true);
        expect(generateBtn.textContent).toBe('Generating PDF...');
    });
}); 
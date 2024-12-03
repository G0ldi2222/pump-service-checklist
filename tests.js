// Import testing library (Jest-like syntax)
import { expect } from '@jest/globals';

// Mock DOM elements
const mockElements = {
    currentDate: document.createElement('div'),
    generateBtn: document.createElement('button'),
    form: document.createElement('form'),
    requiredInputs: [
        Object.assign(document.createElement('input'), { type: 'text', required: true }),
        Object.assign(document.createElement('input'), { type: 'email', required: true }),
        Object.assign(document.createElement('input'), { type: 'tel', required: true })
    ]
};

// Form Validator Tests
describe('FormValidator', () => {
    describe('validateEmail', () => {
        test('should validate correct email addresses', () => {
            expect(FormValidator.validateEmail('test@example.com')).toBe(true);
            expect(FormValidator.validateEmail('user.name+tag@example.co.uk')).toBe(true);
        });

        test('should reject invalid email addresses', () => {
            expect(FormValidator.validateEmail('invalid-email')).toBe(false);
            expect(FormValidator.validateEmail('test@')).toBe(false);
            expect(FormValidator.validateEmail('@example.com')).toBe(false);
        });
    });

    describe('validatePhone', () => {
        test('should validate correct phone numbers', () => {
            expect(FormValidator.validatePhone('+1234567890')).toBe(true);
            expect(FormValidator.validatePhone('020 7123 4567')).toBe(true);
        });

        test('should reject invalid phone numbers', () => {
            expect(FormValidator.validatePhone('123')).toBe(false);
            expect(FormValidator.validatePhone('abc')).toBe(false);
        });
    });

    describe('validateRequired', () => {
        test('should validate non-empty values', () => {
            expect(FormValidator.validateRequired('test')).toBe(true);
            expect(FormValidator.validateRequired('  test  ')).toBe(true);
        });

        test('should reject empty values', () => {
            expect(FormValidator.validateRequired('')).toBe(false);
            expect(FormValidator.validateRequired('   ')).toBe(false);
        });
    });

    describe('sanitizeInput', () => {
        test('should sanitize HTML content', () => {
            expect(FormValidator.sanitizeInput('<script>alert("xss")</script>test'))
                .toBe('test');
        });

        test('should trim whitespace', () => {
            expect(FormValidator.sanitizeInput('  test  ')).toBe('test');
        });
    });
});

// Error Handler Tests
describe('ErrorHandler', () => {
    let testElement;
    
    beforeEach(() => {
        testElement = document.createElement('div');
        document.body.appendChild(testElement);
    });

    afterEach(() => {
        document.body.removeChild(testElement);
    });

    test('should show error message', () => {
        ErrorHandler.showError(testElement, 'Test error');
        const errorMessage = testElement.parentNode.querySelector('.error-message');
        expect(errorMessage).not.toBeNull();
        expect(errorMessage.textContent).toBe('Test error');
        expect(testElement.classList.contains('error')).toBe(true);
    });

    test('should clear error message', () => {
        ErrorHandler.showError(testElement, 'Test error');
        ErrorHandler.clearError(testElement);
        const errorMessage = testElement.parentNode.querySelector('.error-message');
        expect(errorMessage).toBeNull();
        expect(testElement.classList.contains('error')).toBe(false);
    });
});

// PDF Generation Tests
describe('PDF Generation', () => {
    beforeEach(() => {
        // Mock HTML2Canvas and jsPDF
        global.html2canvas = jest.fn().mockResolvedValue({
            height: 1000,
            width: 800,
            toDataURL: () => 'mock-data-url'
        });
        global.jsPDF = jest.fn().mockReturnValue({
            addImage: jest.fn(),
            save: jest.fn()
        });
    });

    test('should validate form before generating PDF', async () => {
        const validateFormSpy = jest.spyOn(window, 'validateForm');
        await generatePDF();
        expect(validateFormSpy).toHaveBeenCalled();
    });

    test('should show loading state during PDF generation', async () => {
        const generateBtn = mockElements.generateBtn;
        await generatePDF();
        expect(document.body.classList.contains('generating-pdf')).toBe(true);
        expect(generateBtn.disabled).toBe(true);
        expect(generateBtn.textContent).toBe('Generating PDF...');
    });

    test('should handle PDF generation errors', async () => {
        global.html2canvas = jest.fn().mockRejectedValue(new Error('Test error'));
        const consoleSpy = jest.spyOn(console, 'error');
        const alertSpy = jest.spyOn(window, 'alert');
        
        await generatePDF();
        
        expect(consoleSpy).toHaveBeenCalledWith('PDF Generation Error:', expect.any(Error));
        expect(alertSpy).toHaveBeenCalledWith('Error generating PDF: Test error. Please try again.');
    });
});

// Language Switcher Tests
describe('Language Switcher', () => {
    let languageSwitcher;

    beforeEach(() => {
        localStorage.clear();
        languageSwitcher = new LanguageSwitcher();
    });

    test('should initialize with default language', () => {
        expect(languageSwitcher.currentLanguage).toBe('en');
    });

    test('should switch languages', () => {
        languageSwitcher.setLanguage('th');
        expect(languageSwitcher.currentLanguage).toBe('th');
        expect(localStorage.getItem('selectedLanguage')).toBe('th');
    });

    test('should update UI elements when switching languages', () => {
        const element = document.createElement('div');
        element.setAttribute('data-translate', 'company-name');
        document.body.appendChild(element);

        languageSwitcher.setLanguage('th');
        expect(element.textContent).toBe('บริษัท วอเตอร์ฟิลด์ เอเชีย จำกัด');

        document.body.removeChild(element);
    });
});

// Run tests
describe('Integration Tests', () => {
    test('should handle form submission and PDF generation', async () => {
        // Fill form with valid data
        mockElements.requiredInputs.forEach(input => {
            input.value = input.type === 'email' ? 'test@example.com' : 'test';
        });

        // Trigger form submission
        await generatePDF();

        // Check if PDF was generated
        expect(global.jsPDF).toHaveBeenCalled();
    });
}); 
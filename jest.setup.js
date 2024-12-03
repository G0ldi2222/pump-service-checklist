import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
global.localStorage = localStorageMock;

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

// Mock DOMPurify
global.DOMPurify = {
    sanitize: jest.fn(input => input)
};

// Setup document body
document.body.innerHTML = `
    <div id="currentDate"></div>
    <button id="generate-pdf-btn">Generate PDF</button>
    <div class="content-wrapper">
        <form>
            <input type="text" required />
            <input type="email" required />
            <input type="tel" required />
            <textarea required></textarea>
        </form>
    </div>
`; 
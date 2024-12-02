// Translation dictionary
const translations = {
    en: {
        // Header content
        "company-name": "Water Field Asia Co., Ltd.",
        "address-line1": "623 Soi Onnut 70/1 Sub 2",
        "address-line2": "Pravet Sub-District, Pravet District,",
        "address-line3": "Bangkok 10250",
        "tel": "Tel.: +66 2320 1994",
        "document-no": "Document No: FM-WFA-SER-057",
        "revision": "Revision: 00",
        "date": "Date:",
        
        // Main sections
        "page-title": "PUMP SERVICE CHECKLIST - Part 1",
        "customer-info": "1. Customer Information",
        "pump-info": "2. Pump Information",
        "operating-conditions": "3. Operating Conditions",
        "customer-preparation": "4. Customer Preparation Checklist",
        
        // Customer Information Fields
        "Customer Name": "Customer Name",
        "Contact Person": "Contact Person",
        "Phone Number": "Phone Number",
        "Email": "Email",
        "Service Location": "Service Location",
        "Date": "Date",
        
        // Pump Information Fields
        "Pump Type": "Pump Type",
        "Serial Number": "Serial Number",
        "Size": "Size",
        "Year of Manufacturing": "Year of Manufacturing",
        "Motor Power (kW)": "Motor Power (kW)",
        "Speed (rpm)": "Speed (rpm)",
        
        // Operating Conditions Fields
        "Temperature (°C)": "Temperature (°C)",
        "Flow Rate (m³/h)": "Flow Rate (m³/h)",
        "Suction Pressure (bar)": "Suction Pressure (bar)",
        "Discharge Pressure (bar)": "Discharge Pressure (bar)",
        "Total Head (m)": "Total Head (m)",
        "Pumped Medium": "Pumped Medium",
        "Description of Issues/Reason for Service": "Description of Issues/Reason for Service",
        
        // Button Labels
        "Generate PDF": "Generate PDF",
        "English": "English",
        "Thai": "ไทย",
        
        // Alt Text
        "Water Field Asia Logo": "Water Field Asia Logo",
        "QR Code": "QR Code",
        
        // Pre-service section
        "pre-service-requirements": "Pre-Service Requirements",
        "system-flush": "System flushed (if hazardous/hardening materials)",
        "safety-training": "Safety Training required?",
        "hours": "hours",
        "harmless-form": "Declaration of Harmlessness form (in the operation manual)",
        "sds": "Safety Data Sheet (SDS) (if applicable)",
        "alignment-report": "Latest alignment report (if available)",
        "operating-records": "Operating condition records (if available) - for example vibration assessment records",
        
        // Pump preparation section
        "pump-preparation": "Pump Preparation (By Customer or WFA)",
        "pump-isolation": "Pump isolated from power supply (customer responsibility)",
        "valves-locked": "Suction/discharge valves locked (customer responsibility)",
        "pump-drained": "Pump drained (customer responsibility)",
        "aux-systems-disconnected": "Auxiliary systems disconnected for example external sensors etc. (customer responsibility)",
        "coupling-guard-removed": "Coupling guard removed",
        "coupling-disconnected": "Coupling disconnected",
        "pump-cleaned": "Pump cleaned externally",
        "openings-protected": "All openings protected",
        "photos-taken": "Photographs taken (if possible)",
        
        // Important notes
        "important-notes": "Important Notes:",
        "note-1": "All work must be performed by qualified personnel only",
        "note-2": "Maintain proper documentation throughout the service process",
        "note-3": "Use only OEM parts or approved equivalents",
        "note-4": "Follow all safety protocols, especially regarding magnetic coupling hazards",
        "note-5": "Refer to manufacturer's manual for specific torque values and clearances",
        "note-6": "Required for magnetic coupling handling - keep sensitive items at minimum 1m distance"
    },
    th: {
        // Header content
        "company-name": "บริษัท วอเตอร์ฟิลด์ เอเชีย จำกัด",
        "address-line1": "623 ซอยอ่อนนุช 70/1 แยก 2",
        "address-line2": "แขวงประเวศ เขตประเวศ",
        "address-line3": "กรุงเทพมหานคร 10250",
        "tel": "โทร: +66 2320 1994",
        "document-no": "เลขที่เอกสาร: FM-WFA-SER-057",
        "revision": "ครั้งที่แก้ไข: 00",
        "date": "วันที่:",
        
        // Main sections
        "page-title": "รายการตรวจสอบการบริการปั๊ม - ส่วนที่ 1",
        "customer-info": "1. ข้อมูลลูกค้า",
        "pump-info": "2. ข้อมูลปั๊ม",
        "operating-conditions": "3. สภาวะการทำงาน",
        "customer-preparation": "4. รายการเตรียมความพร้อมของลูกค้า",
        
        // Customer Information Fields
        "Customer Name": "ชื่อลูกค้า",
        "Contact Person": "ผู้ติดต่อ",
        "Phone Number": "หมายเลขโทรศัพท์",
        "Email": "อีเมล",
        "Service Location": "สถานที่ให้บริการ",
        "Date": "วันที่",
        
        // Pump Information Fields
        "Pump Type": "ประเภทปั๊ม",
        "Serial Number": "หมายเลขเครื่อง",
        "Size": "ขนาด",
        "Year of Manufacturing": "ปีที่ผลิต",
        "Motor Power (kW)": "กำลังมอเตอร์ (kW)",
        "Speed (rpm)": "ความเร็ว (rpm)",
        
        // Operating Conditions Fields
        "Temperature (°C)": "อุณหภูมิ (°C)",
        "Flow Rate (m³/h)": "อัตราการไหล (m³/h)",
        "Suction Pressure (bar)": "ความดันด้านดูด (bar)",
        "Discharge Pressure (bar)": "ความดันด้านจ่าย (bar)",
        "Total Head (m)": "เฮดรวม (m)",
        "Pumped Medium": "ของเหลวที่สูบ",
        "Description of Issues/Reason for Service": "คำอธิบายปัญหา/เหตุผลในการเข้าบริการ",
        
        // Button Labels
        "Generate PDF": "สร้าง PDF",
        "English": "English",
        "Thai": "ไทย",
        
        // Alt Text
        "Water Field Asia Logo": "โลโก้ วอเตอร์ฟิลด์ เอเชีย",
        "QR Code": "คิวอาร์โค้ด",
        
        // Pre-service section
        "pre-service-requirements": "ข้อกำหนดก่อนการให้บริการ",
        "system-flush": "ระบบได้รับการล้าง (กรณีมีวัสดุอันตราย/แข็งตัว)",
        "safety-training": "ต้องการการฝึกอบรมด้านความปลอดภัย?",
        "hours": "ชั่วโมง",
        "harmless-form": "แบบฟอร์มรับรองความปลอดภัย (ในคู่มือการใช้งาน)",
        "sds": "เอกสารข้อมูลความปลอดภัย (SDS) (ถ้ามี)",
        "alignment-report": "รายงานการปรับแนวล่าสุด (ถ้ามี)",
        "operating-records": "บันทึกสภาวะการทำงาน (ถ้ามี) - เช่น บันทึกการประเมินการสั่นสะเทือน",
        
        // Pump preparation section
        "pump-preparation": "การเตรียมปั๊ม (โดยลูกค้าหรือ WFA)",
        "pump-isolation": "ปั๊มถูกแยกออกจากแหล่งจ่ายไฟ (ความรับผิดชอบของลูกค้า)",
        "valves-locked": "วาล์วดูดและจ่ายถูกล็อค (ความรับผิดชอบของลูกค้า)",
        "pump-drained": "ปั๊มถูกระบายน้ำ (ความรับผิดชอบของลูกค้า)",
        "aux-systems-disconnected": "ระบบเสริมถูกตัดการเชื่อมต่อ เช่น เซ็นเซอร์ภายนอก ฯลฯ (ความรับผิดชอบของลูกค้า)",
        "coupling-guard-removed": "ฝาครอบคัปปลิ้งถูกถอดออก",
        "coupling-disconnected": "คัปปลิ้งถูกถอดการเชื่อมต่อ",
        "pump-cleaned": "ปั๊มถูกทำความสะอาดภายนอก",
        "openings-protected": "ช่องเปิดทั้งหมดได้รับการป้องกัน",
        "photos-taken": "ถ่ายภาพแล้ว (ถ้าเป็นไปได้)",
        
        // Important notes
        "important-notes": "หมายเหตุสำคัญ:",
        "note-1": "งานทั้งหมดต้องดำเนินการโดยบุคลากรที่มีคุณสมบัติเท่านั้น",
        "note-2": "รักษาเอกสารที่เหมาะสมตลอดกระบวนการให้บริการ",
        "note-3": "ใช้เฉพาะอะไหล่ OEM หรือที่ได้รับการรับรองเท่านั้น",
        "note-4": "ปฏิบัติตามข้อกำหนดด้านความปลอดภัยทั้งหมด โดยเฉพาะเกี่ยวกับอันตรายจากคัปปลิ้งแม่เหล็ก",
        "note-5": "อ้างอิงคู่มือผู้ผลิตสำหรับค่าแรงบิดและระยะห่างที่เฉพาะเจาะจง",
        "note-6": "จำเป็นสำหรับการจัดการคัปปลิ้งแม่เหล็ก - เก็บอุปกรณ์ที่บอบบางให้ห่างอย่างน้อย 1 เมตร"
    }
};

let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

function translateElements(elements) {
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key && translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    // Translate all elements with data-translate attribute
    const translatableElements = document.querySelectorAll('[data-translate]');
    translateElements(translatableElements);
}

// Wait for DOM to be ready before setting up observer
document.addEventListener('DOMContentLoaded', function() {
    // Set up MutationObserver to handle dynamically added content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const translatableElements = mutation.target.querySelectorAll('[data-translate]');
                if (translatableElements.length > 0) {
                    translateElements(translatableElements);
                }
            }
        });
    });

    // Start observing the document body with the configured parameters
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Initialize language
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLanguage);

    // Add event listeners to language buttons
    document.getElementById('en-btn')?.addEventListener('click', () => changeLanguage('en'));
    document.getElementById('th-btn')?.addEventListener('click', () => changeLanguage('th'));
});

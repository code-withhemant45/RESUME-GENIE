
import { ResumeData } from './resumeTypes';
import { parsePDFContent } from './pdfImport';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source using the available version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const importResumeFromFile = async (file: File): Promise<ResumeData> => {
  return new Promise((resolve, reject) => {
    // Check file type
    if (file.type === "application/json") {
      // Handle JSON import
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          if (event.target?.result) {
            const importedData = JSON.parse(event.target.result as string) as ResumeData;
            
            // Validate imported data structure
            if (!importedData.contactInfo || !importedData.experienceItems) {
              throw new Error("Invalid resume data format");
            }
            
            // Ensure backward compatibility with template selection
            if (!importedData.selectedTemplate) {
              importedData.selectedTemplate = "classic";
            }
            
            resolve(importedData);
          } else {
            reject(new Error("Failed to read file"));
          }
        } catch (error) {
          reject(new Error("Invalid JSON format"));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };
      
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      // Handle PDF import using pdf.js
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          if (event.target?.result) {
            const arrayBuffer = event.target.result as ArrayBuffer;
            
            // Use pdf.js to parse the PDF with proper error handling
            try {
              console.log("PDF.js version:", pdfjsLib.version);
              
              // Load the PDF document
              const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
              const pdfDocument = await loadingTask.promise;
              
              // Extract text from all pages
              const numPages = pdfDocument.numPages;
              let fullText = '';
              
              for (let i = 1; i <= numPages; i++) {
                const page = await pdfDocument.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + '\n';
              }
              
              // Parse the extracted text into resume data
              const extractedData = parsePDFContent(fullText);
              resolve(extractedData);
            } catch (pdfError: any) {
              console.error("PDF.js error:", pdfError);
              reject(new Error("Error parsing PDF content"));
            }
          } else {
            reject(new Error("Failed to read PDF file"));
          }
        } catch (error) {
          console.error("PDF parsing error:", error);
          reject(new Error("Error parsing PDF content"));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Error reading PDF file"));
      };
      
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error("Unsupported file type. Please upload a JSON or PDF file."));
    }
  });
};


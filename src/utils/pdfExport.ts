
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (resumeRef: React.RefObject<HTMLDivElement>) => {
  if (!resumeRef.current) return false;

  try {
    const element = resumeRef.current;
    const originalDisplay = element.style.display;
    const originalPosition = element.style.position;
    const originalBackground = element.style.background;
    
    // Temporarily modify for better PDF rendering
    element.style.display = "inline-block";
    element.style.position = "relative";
    element.style.background = "white";
    
    // Deep clone the node to apply styles that will only affect the PDF
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = `${element.offsetWidth}px`;
    document.body.appendChild(clone);
    
    // Apply specific styles to improve badge appearance in PDF
    const badges = clone.querySelectorAll(".bg-resume-light.text-resume-primary");
    badges.forEach(badge => {
      const badgeElement = badge as HTMLElement;
      badgeElement.style.borderRadius = "9999px";
      badgeElement.style.padding = "2px 8px";
      badgeElement.style.backgroundColor = "#F1F0FB";
      badgeElement.style.color = "#1A1F2C";
      badgeElement.style.display = "inline-block";
      badgeElement.style.margin = "2px";
    });
    
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 800,
      width: element.offsetWidth,
      height: element.offsetHeight
    });
    
    // Remove the clone after rendering
    document.body.removeChild(clone);
    
    // Restore original styles
    element.style.display = originalDisplay;
    element.style.position = originalPosition;
    element.style.background = originalBackground;
    
    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF with proper dimensions
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Add clickable hyperlinks
    const links = element.querySelectorAll("a");
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href) {
        const rect = link.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        // Calculate position in PDF coordinates
        const x = (rect.left - elementRect.left) * pdfWidth / element.offsetWidth;
        const y = (rect.top - elementRect.top) * pdfHeight / element.offsetHeight;
        const width = rect.width * pdfWidth / element.offsetWidth;
        const height = rect.height * pdfHeight / element.offsetHeight;
        
        // Add link annotation to the PDF
        pdf.link(x, y, width, height, { url: href });
      }
    });
    
    pdf.save("resume.pdf");
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};

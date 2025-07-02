
import { useRef } from "react";
import { ResumeData, exportToPDF, templates } from "@/utils/resumeUtils";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectSection from "./ProjectSection";
import CertificationSection from "./CertificationSection";
import { Button } from "./ui/button";
import { FileText, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ResumePreviewProps {
  resumeData: ResumeData;
  updateContactInfo: (info: Partial<ResumeData["contactInfo"]>) => void;
  updateAboutContent: (content: string) => void;
  updateExperienceItems: (items: ResumeData["experienceItems"]) => void;
  updateEducationItems: (items: ResumeData["educationItems"]) => void;
  updateSkillItems: (items: ResumeData["skillItems"]) => void;
  updateProjectItems: (items: ResumeData["projectItems"]) => void;
  updateCertificationItems: (items: ResumeData["certificationItems"]) => void;
  isEditing: boolean;
  selectTemplate: (templateId: string) => void;
}

const ResumePreview = ({
  resumeData,
  updateContactInfo,
  updateAboutContent,
  updateExperienceItems,
  updateEducationItems,
  updateSkillItems,
  updateProjectItems,
  updateCertificationItems,
  isEditing,
  selectTemplate
}: ResumePreviewProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    // Scroll to top of resume to ensure proper rendering
    if (resumeRef.current) {
      window.scrollTo({
        top: resumeRef.current.offsetTop,
        behavior: "smooth"
      });
      
      // Short delay to ensure scrolling completes
      setTimeout(async () => {
        const result = await exportToPDF(resumeRef);
        if (result) {
          toast.success("Resume exported successfully");
        } else {
          toast.error("Failed to export resume");
        }
      }, 200);
    }
  };

  const getTemplateClass = () => {
    switch (resumeData.selectedTemplate) {
      case "modern":
        return "font-sans";
      case "creative":
        return "font-serif";
      case "minimalist":
        return "font-mono";
      default:
        return "";
    }
  };

  const getTemplateStyles = () => {
    const baseStyles = {
      minHeight: "1056px",
      padding: "30px"
    };

    switch (resumeData.selectedTemplate) {
      case "modern":
        return {
          ...baseStyles,
          borderTop: "5px solid #3b82f6",
          fontFamily: "'Inter', sans-serif"
        };
      case "creative":
        return {
          ...baseStyles,
          background: "linear-gradient(to bottom right, #ffffff, #f3f4f6)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
        };
      case "minimalist":
        return {
          ...baseStyles,
          borderLeft: "1px solid #e5e7eb",
          borderRight: "1px solid #e5e7eb"
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          <span className="font-medium dark:text-white">Template:</span>
          <Select 
            value={resumeData.selectedTemplate} 
            onValueChange={selectTemplate}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Export as PDF
        </Button>
      </div>
      
      <div
        ref={resumeRef}
        className={`bg-white max-w-[800px] mx-auto ${getTemplateClass()} ${isEditing ? "" : "border border-gray-200 rounded-lg"} pdf-export-container`}
        style={getTemplateStyles()}
      >
        <ContactSection
          contactInfo={resumeData.contactInfo}
          updateContactInfo={updateContactInfo}
          isEditing={false}
        />
        
        <div className="mt-6">
          <AboutSection
            content={resumeData.aboutContent}
            updateContent={updateAboutContent}
            isEditing={false}
          />
        </div>
        
        <div className="mt-6">
          <EducationSection
            items={resumeData.educationItems}
            updateItems={updateEducationItems}
            isEditing={false}
          />
        </div>
        
        <div className="mt-6">
          <ExperienceSection
            items={resumeData.experienceItems}
            updateItems={updateExperienceItems}
            isEditing={false}
          />
        </div>
        
        <div className="mt-6">
          <SkillsSection
            items={resumeData.skillItems}
            updateItems={updateSkillItems}
            isEditing={false}
          />
        </div>
        
        <div className="mt-6">
          <ProjectSection
            items={resumeData.projectItems}
            updateItems={updateProjectItems}
            isEditing={false}
          />
        </div>
        
        <div className="mt-6">
          <CertificationSection
            items={resumeData.certificationItems}
            updateItems={updateCertificationItems}
            isEditing={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;

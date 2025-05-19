
import { useState, useEffect, useRef } from "react";
import { ResumeData, defaultResumeData, importResumeFromFile } from "@/utils/resumeUtils";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectSection from "./ProjectSection";
import CertificationSection from "./CertificationSection";
import ResumePreview from "./ResumePreview";
import { Button } from "./ui/button";
import { Edit, Eye, Save, Upload, Download, Trash2, Undo } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const LOCAL_STORAGE_KEY = "resumeData";

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isEditing, setIsEditing] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDataDialog, setShowDataDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialLoadComplete = useRef(false);
  
  useEffect(() => {
    // Try to load saved resume data when component mounts
    if (!initialLoadComplete.current) {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData) as ResumeData;
          // Ensure backward compatibility with older saved data
          if (!parsedData.selectedTemplate) {
            parsedData.selectedTemplate = "classic";
          }
          setResumeData(parsedData);
          toast.info("Loaded saved resume data", {
            description: "Your previous work has been restored"
          });
        } catch (e) {
          console.error("Error loading saved resume data:", e);
          toast.error("Could not load saved data");
        }
      }
      initialLoadComplete.current = true;
    }
  }, []);
  
  // Auto-save changes to localStorage when resumeData changes
  useEffect(() => {
    if (initialLoadComplete.current) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
      setHasUnsavedChanges(false);
    }
  }, [resumeData]);
  
  const updateContactInfo = (info: Partial<ResumeData["contactInfo"]>) => {
    setResumeData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        ...info
      }
    }));
    setHasUnsavedChanges(true);
  };
  
  const updateAboutContent = (content: string) => {
    setResumeData(prev => ({
      ...prev,
      aboutContent: content
    }));
    setHasUnsavedChanges(true);
  };
  
  const updateExperienceItems = (items: ResumeData["experienceItems"]) => {
    setResumeData(prev => ({
      ...prev,
      experienceItems: items
    }));
    setHasUnsavedChanges(true);
  };
  
  const updateEducationItems = (items: ResumeData["educationItems"]) => {
    setResumeData(prev => ({
      ...prev,
      educationItems: items
    }));
    setHasUnsavedChanges(true);
  };
  
  const updateSkillItems = (items: ResumeData["skillItems"]) => {
    setResumeData(prev => ({
      ...prev,
      skillItems: items
    }));
    setHasUnsavedChanges(true);
  };
  
  const updateProjectItems = (items: ResumeData["projectItems"]) => {
    setResumeData(prev => ({
      ...prev,
      projectItems: items
    }));
    setHasUnsavedChanges(true);
  };
  
  const updateCertificationItems = (items: ResumeData["certificationItems"]) => {
    setResumeData(prev => ({
      ...prev,
      certificationItems: items
    }));
    setHasUnsavedChanges(true);
  };
  
  const selectTemplate = (templateId: string) => {
    setResumeData(prev => ({
      ...prev,
      selectedTemplate: templateId
    }));
    setHasUnsavedChanges(true);
    toast.success(`Template changed to ${templateId}`);
  };
  
  const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
    setHasUnsavedChanges(false);
    toast.success("Resume saved to browser storage");
  };
  
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved) as ResumeData;
        setResumeData(parsedData);
        toast.success("Resume loaded from browser storage");
      } catch (e) {
        toast.error("Failed to load saved resume");
      }
    } else {
      toast.info("No saved resume found");
    }
  };
  
  const clearSavedData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setResumeData(defaultResumeData);
    toast.success("Saved data cleared");
    setShowDataDialog(false);
  };
  
  const resetToDefault = () => {
    setResumeData(defaultResumeData);
    toast.info("Reset to default template");
    setShowDataDialog(false);
  };
  
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Show loading toast for PDF imports which might take longer
      let loadingToast: string | number | undefined;
      
      if (file.type === "application/pdf") {
        loadingToast = toast.loading("Processing PDF file...");
      }
      
      importResumeFromFile(file)
        .then((importedData) => {
          setResumeData(importedData);
          toast.success(`Resume imported successfully from ${file.type === "application/pdf" ? "PDF" : "JSON"} file`);
          
          // Dismiss loading toast if it exists
          if (loadingToast) {
            toast.dismiss(loadingToast);
          }
          
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        })
        .catch((error) => {
          // Dismiss loading toast if it exists
          if (loadingToast) {
            toast.dismiss(loadingToast);
          }
          
          toast.error(`Import failed: ${error.message}`);
        });
    }
  };
  
  const exportResumeFile = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.contactInfo.fullName.replace(/\s+/g, '_')}_resume.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Resume exported as JSON file");
  };
  
  return <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-lime-600 dark:text-lime-500">ResumeGenie</h1>
        
        <div className="flex items-center flex-wrap gap-2">
          {/* Hidden file input for import */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          
          <Dialog open={showDataDialog} onOpenChange={setShowDataDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Undo className="h-4 w-4" />
                Data Options
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Resume Data Management</DialogTitle>
                <DialogDescription>
                  Manage your saved resume data
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <Alert>
                  <AlertTitle>Auto-saving is enabled</AlertTitle>
                  <AlertDescription>
                    Your resume data is automatically saved to your browser's local storage as you make changes.
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-col gap-3">
                  <Button onClick={loadFromLocalStorage} variant="outline" className="w-full">
                    Load Latest Saved Data
                  </Button>
                  
                  <Button onClick={exportResumeFile} variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data as JSON
                  </Button>
                  
                  <Button onClick={resetToDefault} variant="outline" className="w-full">
                    Reset to Default Template
                  </Button>
                  
                  <Button onClick={clearSavedData} variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Saved Data
                  </Button>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="secondary" onClick={() => setShowDataDialog(false)}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={handleImportClick} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          
          <Button variant="outline" onClick={exportResumeFile} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          
          <Button variant={isEditing ? "default" : "outline"} className="flex items-center gap-2" onClick={toggleEditMode}>
            {isEditing ? <>
                <Eye className="h-4 w-4" />
                Preview
              </> : <>
                <Edit className="h-4 w-4" />
                Edit
              </>}
          </Button>
          
          <Button 
            onClick={saveToLocalStorage} 
            className="flex items-center gap-2"
            disabled={!hasUnsavedChanges}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {isEditing ? <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-foreground dark:text-white">Personal Details</h2>
              <ContactSection contactInfo={resumeData.contactInfo} updateContactInfo={updateContactInfo} isEditing={true} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <SkillsSection items={resumeData.skillItems} updateItems={updateSkillItems} isEditing={true} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <CertificationSection items={resumeData.certificationItems} updateItems={updateCertificationItems} isEditing={true} />
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <AboutSection content={resumeData.aboutContent} updateContent={updateAboutContent} isEditing={true} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <ExperienceSection items={resumeData.experienceItems} updateItems={updateExperienceItems} isEditing={true} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <ProjectSection items={resumeData.projectItems} updateItems={updateProjectItems} isEditing={true} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <EducationSection items={resumeData.educationItems} updateItems={updateEducationItems} isEditing={true} />
            </div>
          </div>
        </div> : <div className="bg-resume-light dark:bg-gray-800 rounded-lg p-4">
          <ResumePreview resumeData={resumeData} updateContactInfo={updateContactInfo} updateAboutContent={updateAboutContent} updateExperienceItems={updateExperienceItems} updateEducationItems={updateEducationItems} updateSkillItems={updateSkillItems} updateProjectItems={updateProjectItems} updateCertificationItems={updateCertificationItems} isEditing={false} selectTemplate={selectTemplate} />
        </div>}
    </div>;
};

export default ResumeEditor;

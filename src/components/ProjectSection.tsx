import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectItem, generateUniqueId } from "@/utils/resumeUtils";
import { Trash, Briefcase, Link as LinkIcon } from "lucide-react";

interface ProjectSectionProps {
  items: ProjectItem[];
  updateItems: (items: ProjectItem[]) => void;
  isEditing: boolean;
}

const ProjectSection = ({
  items,
  updateItems,
  isEditing
}: ProjectSectionProps) => {
  const handleItemChange = <K extends keyof ProjectItem>(
    id: string,
    field: K,
    value: ProjectItem[K]
  ) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateItems(updatedItems);
  };

  const addNewItem = () => {
    const newItem: ProjectItem = {
      id: generateUniqueId(),
      title: "New Project",
      description: "Project description",
      startDate: "Jan 2023",
      endDate: "Present",
      link: "",
      technologies: "React, TypeScript"
    };
    updateItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    updateItems(updatedItems);
  };

  const formatUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium">Projects</h3>
          <Button 
            type="button" 
            onClick={addNewItem} 
            variant="outline"
            size="sm"
          >
            Add Project
          </Button>
        </div>

        {items.map((item) => (
          <div key={item.id} className="space-y-4 border border-gray-200 p-4 rounded-lg">
            <div className="flex justify-between">
              <h4 className="font-medium">Project Details</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={item.title}
                  onChange={(e) => handleItemChange(item.id, "title", e.target.value)}
                  placeholder="Project title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <span className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" /> Link (optional)
                  </span>
                </label>
                <Input
                  value={item.link || ""}
                  onChange={(e) => handleItemChange(item.id, "link", e.target.value)}
                  placeholder="Project link or demo URL"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  value={item.startDate}
                  onChange={(e) => handleItemChange(item.id, "startDate", e.target.value)}
                  placeholder="e.g. Jan 2023"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  value={item.endDate}
                  onChange={(e) => handleItemChange(item.id, "endDate", e.target.value)}
                  placeholder="e.g. Present"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Technologies Used</label>
                <Input
                  value={item.technologies}
                  onChange={(e) => handleItemChange(item.id, "technologies", e.target.value)}
                  placeholder="e.g. React, TypeScript, Node.js"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                  placeholder="Describe your project, what you built, and your role"
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No projects added yet</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-resume-primary border-b border-resume-border pb-1 mb-3 flex items-center gap-2">
        <Briefcase className="h-4 w-4" /> PROJECTS
      </h3>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h4 className="font-bold">{item.title}</h4>
                <span className="text-sm text-resume-secondary">
                  {item.startDate} - {item.endDate}
                </span>
              </div>
              
              <div className="text-sm text-resume-accent mb-1">
                {item.technologies}
                {item.link && (
                  <span className="ml-2">
                    <a href={formatUrl(item.link)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-resume-primary hover:text-resume-accent">
                      <LinkIcon className="h-3 w-3" /> Link
                    </a>
                  </span>
                )}
              </div>
              
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-resume-secondary italic">No projects listed</p>
      )}
    </div>
  );
};

export default ProjectSection;

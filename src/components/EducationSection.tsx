
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EducationItem, generateUniqueId } from "@/utils/resumeUtils";
import { Trash } from "lucide-react";

interface EducationSectionProps {
  items: EducationItem[];
  updateItems: (items: EducationItem[]) => void;
  isEditing: boolean;
}

const EducationSection = ({
  items,
  updateItems,
  isEditing
}: EducationSectionProps) => {
  const handleItemChange = (id: string, field: keyof EducationItem, value: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateItems(updatedItems);
  };

  const addNewItem = () => {
    const newItem: EducationItem = {
      id: generateUniqueId(),
      institution: "University/College Name",
      degree: "Degree Type",
      field: "Field of Study",
      startDate: "Start Year",
      endDate: "End Year",
      location: "Location"
    };
    
    updateItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    updateItems(updatedItems);
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium">Education</h3>
          <Button 
            type="button" 
            onClick={addNewItem} 
            variant="outline"
            size="sm"
          >
            Add Education
          </Button>
        </div>
        
        {items.map((item) => (
          <div key={item.id} className="p-4 border border-resume-border rounded-md space-y-4">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Institution</label>
                <Input
                  value={item.institution}
                  onChange={(e) => handleItemChange(item.id, "institution", e.target.value)}
                  placeholder="University/College Name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Degree</label>
                <Input
                  value={item.degree}
                  onChange={(e) => handleItemChange(item.id, "degree", e.target.value)}
                  placeholder="e.g. Bachelor's, Master's"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Field of Study</label>
                <Input
                  value={item.field}
                  onChange={(e) => handleItemChange(item.id, "field", e.target.value)}
                  placeholder="e.g. Computer Science"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={item.location}
                  onChange={(e) => handleItemChange(item.id, "location", e.target.value)}
                  placeholder="City, State"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  value={item.startDate}
                  onChange={(e) => handleItemChange(item.id, "startDate", e.target.value)}
                  placeholder="e.g. 2015"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  value={item.endDate}
                  onChange={(e) => handleItemChange(item.id, "endDate", e.target.value)}
                  placeholder="e.g. 2019"
                />
              </div>
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No education added yet</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-resume-primary border-b border-resume-border pb-1 mb-3">EDUCATION</h3>
      
      {items.map((item) => (
        <div key={item.id} className="mb-4">
          <div className="flex flex-wrap justify-between">
            <h4 className="font-semibold">{item.institution}</h4>
            <span className="text-sm text-resume-secondary">{item.startDate} - {item.endDate}</span>
          </div>
          
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-resume-accent">
              {item.degree} in {item.field}
            </p>
            <span className="text-sm text-resume-secondary">{item.location}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;

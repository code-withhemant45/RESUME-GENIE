import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExperienceItem, generateUniqueId } from "@/utils/resumeUtils";
import { Trash } from "lucide-react";
interface ExperienceSectionProps {
  items: ExperienceItem[];
  updateItems: (items: ExperienceItem[]) => void;
  isEditing: boolean;
}
const ExperienceSection = ({
  items,
  updateItems,
  isEditing
}: ExperienceSectionProps) => {
  const handleItemChange = (id: string, field: keyof ExperienceItem, value: string) => {
    const updatedItems = items.map(item => item.id === id ? {
      ...item,
      [field]: value
    } : item);
    updateItems(updatedItems);
  };
  const addNewItem = () => {
    const newItem: ExperienceItem = {
      id: generateUniqueId(),
      company: "Company Name",
      position: "Position Title",
      startDate: "Start Date",
      endDate: "End Date",
      location: "Location",
      description: "Describe your responsibilities and achievements"
    };
    updateItems([...items, newItem]);
  };
  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    updateItems(updatedItems);
  };
  if (isEditing) {
    return <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium">Work Experience</h3>
          <Button type="button" onClick={addNewItem} variant="outline" size="sm">
            Add Experience
          </Button>
        </div>
        
        {items.map(item => <div key={item.id} className="p-4 border border-resume-border rounded-md space-y-4">
            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input value={item.company} onChange={e => handleItemChange(item.id, "company", e.target.value)} />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Input value={item.position} onChange={e => handleItemChange(item.id, "position", e.target.value)} />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input value={item.startDate} onChange={e => handleItemChange(item.id, "startDate", e.target.value)} placeholder="e.g. Jan 2020" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input value={item.endDate} onChange={e => handleItemChange(item.id, "endDate", e.target.value)} placeholder="e.g. Present" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input value={item.location} onChange={e => handleItemChange(item.id, "location", e.target.value)} placeholder="City, State or Remote" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea value={item.description} onChange={e => handleItemChange(item.id, "description", e.target.value)} placeholder="Describe your responsibilities and achievements" rows={3} />
            </div>
          </div>)}
        
        {items.length === 0 && <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No experience added yet</p>
          </div>}
      </div>;
  }
  return <div>
      <h3 className="text-lg font-bold text-resume-primary border-b border-resume-border pb-1 mb-3">EXPERIENCE</h3>
      
      {items.map(item => <div key={item.id} className="mb-4">
          <div className="flex flex-wrap justify-between">
            <h4 className="font-semibold">{item.position}</h4>
            <span className="text-sm text-resume-secondary">{item.startDate} - {item.endDate}</span>
          </div>
          
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-violet-800">{item.company}</p>
            <span className="text-sm text-resume-secondary">{item.location}</span>
          </div>
          
          <p className="text-sm mt-2">{item.description}</p>
        </div>)}
    </div>;
};
export default ExperienceSection;
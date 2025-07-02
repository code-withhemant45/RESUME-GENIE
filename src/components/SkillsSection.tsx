import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkillItem, generateUniqueId, groupSkillsByCategory } from "@/utils/resumeUtils";
import { Trash, Code } from "lucide-react";

interface SkillsSectionProps {
  items: SkillItem[];
  updateItems: (items: SkillItem[]) => void;
  isEditing: boolean;
}

const categoryLabels = {
  languages: "Programming Languages",
  frontend: "Frontend",
  backend: "Backend",
  frameworks: "Frameworks",
  database: "Database",
  tools: "Tools",
  versionControl: "Version Control"
};

const SkillsSection = ({
  items,
  updateItems,
  isEditing
}: SkillsSectionProps) => {
  const handleItemChange = (id: string, name: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, name } : item
    );
    updateItems(updatedItems);
  };

  const handleCategoryChange = (id: string, category: SkillItem["category"]) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, category } : item
    );
    updateItems(updatedItems);
  };

  const addNewItem = () => {
    const newItem: SkillItem = {
      id: generateUniqueId(),
      name: "New Skill",
      category: "languages"
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
          <h3 className="text-xl font-medium text-foreground">Skills</h3>
          <Button 
            type="button" 
            onClick={addNewItem} 
            variant="outline"
            size="sm"
          >
            Add Skill
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Input
                value={item.name}
                onChange={(e) => handleItemChange(item.id, e.target.value)}
                placeholder="Enter a skill"
                className="flex-1"
              />
              
              <Select 
                value={item.category} 
                onValueChange={(value) => handleCategoryChange(item.id, value as SkillItem["category"])}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
        
        {items.length === 0 && (
          <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No skills added yet</p>
          </div>
        )}
      </div>
    );
  }

  const categorizedSkills = groupSkillsByCategory(items);
  
  return (
    <div>
      <h3 className="text-lg font-bold text-resume-primary border-b border-resume-border pb-1 mb-3 flex items-center gap-2">
        <Code className="h-4 w-4" /> SKILLS
      </h3>
      
      <div className="space-y-2">
        {Object.entries(categorizedSkills).map(([category, skills]) => {
          if (skills && skills.length > 0) {
            return (
              <div key={category} className="flex items-start gap-2">
                <span className="font-bold text-sm text-black min-w-fit">
                  {categoryLabels[category as keyof typeof categoryLabels]}:
                </span>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => (
                    <span 
                      key={skill.id}
                      className="skill-badge"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F1F0FB',
                        color: '#1A1F2C',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '500',
                        border: '1px solid #E5E7EB',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        lineHeight: '1.2',
                        margin: '1px'
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
      
      {items.length === 0 && (
        <p className="text-sm text-resume-secondary italic">No skills listed</p>
      )}
    </div>
  );
};

export default SkillsSection;

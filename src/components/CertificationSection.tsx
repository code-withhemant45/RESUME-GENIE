import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CertificationItem, generateUniqueId } from "@/utils/resumeUtils";
import { Trash, Award, Link as LinkIcon } from "lucide-react";

interface CertificationSectionProps {
  items: CertificationItem[];
  updateItems: (items: CertificationItem[]) => void;
  isEditing: boolean;
}

const CertificationSection = ({
  items,
  updateItems,
  isEditing
}: CertificationSectionProps) => {
  const handleItemChange = <K extends keyof CertificationItem,>(id: string, field: K, value: CertificationItem[K]) => {
    const updatedItems = items.map(item => item.id === id ? {
      ...item,
      [field]: value
    } : item);
    updateItems(updatedItems);
  };

  const addNewItem = () => {
    const newItem: CertificationItem = {
      id: generateUniqueId(),
      name: "New Certification",
      organization: "Issuing Organization",
      issueDate: "Jan 2023",
      expiryDate: "",
      credentialId: "",
      link: ""
    };
    updateItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
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
    return <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium">Certifications</h3>
          <Button type="button" onClick={addNewItem} variant="outline" size="sm" className="font-normal rounded-sm px-0 py-0 mx-[5px]">
            Add Certification
          </Button>
        </div>

        {items.map(item => <div key={item.id} className="space-y-4 border border-gray-200 p-4 rounded-lg">
            <div className="flex justify-between">
              <h4 className="font-medium">Certification Details</h4>
              <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Certification Name</label>
                <Input value={item.name} onChange={e => handleItemChange(item.id, "name", e.target.value)} placeholder="e.g. AWS Certified Developer" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Issuing Organization</label>
                <Input value={item.organization} onChange={e => handleItemChange(item.id, "organization", e.target.value)} placeholder="e.g. Amazon Web Services" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Date</label>
                <Input value={item.issueDate} onChange={e => handleItemChange(item.id, "issueDate", e.target.value)} placeholder="e.g. Jan 2023" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date (if applicable)</label>
                <Input value={item.expiryDate || ""} onChange={e => handleItemChange(item.id, "expiryDate", e.target.value)} placeholder="e.g. Jan 2026" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Credential ID (optional)</label>
                <Input value={item.credentialId || ""} onChange={e => handleItemChange(item.id, "credentialId", e.target.value)} placeholder="e.g. ABC-123456" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <span className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" /> Verification Link (optional)
                  </span>
                </label>
                <Input value={item.link || ""} onChange={e => handleItemChange(item.id, "link", e.target.value)} placeholder="e.g. verify.example.com/abc123" />
              </div>
            </div>
          </div>)}

        {items.length === 0 && <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No certifications added yet</p>
          </div>}
      </div>;
  }

  return <div>
      <h3 className="text-lg font-bold text-resume-primary border-b border-resume-border pb-1 mb-3 flex items-center gap-2">
        <Award className="h-4 w-4" /> CERTIFICATIONS
      </h3>

      {items.length > 0 ? <div className="space-y-3">
          {items.map(item => <div key={item.id} className="mb-2">
              <div className="flex justify-between items-start">
                <h4 className="font-bold">{item.name}</h4>
                <span className="text-sm text-resume-secondary">
                  {item.issueDate}{item.expiryDate ? ` - ${item.expiryDate}` : ""}
                </span>
              </div>
              
              <div className="text-sm text-resume-accent">
                {item.organization}
              </div>
              
              <div className="text-xs text-resume-secondary flex flex-wrap gap-x-3 gap-y-1 mt-1">
                {item.credentialId && <span>Credential ID: {item.credentialId}</span>}
                
                {item.link && <a href={formatUrl(item.link)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-resume-primary hover:text-resume-accent">
                    <LinkIcon className="h-3 w-3" /> Verify
                  </a>}
              </div>
            </div>)}
        </div> : <p className="text-sm text-resume-secondary italic">No certifications listed</p>}
    </div>;
};

export default CertificationSection;

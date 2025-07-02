
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";

interface AboutSectionProps {
  content: string;
  updateContent: (content: string) => void;
  isEditing: boolean;
}

const AboutSection = ({
  content,
  updateContent,
  isEditing
}: AboutSectionProps) => {
  if (isEditing) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-medium">About</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium">Professional Summary</label>
          <Textarea
            value={content}
            onChange={(e) => updateContent(e.target.value)}
            placeholder="Write a brief summary highlighting your skills, experience, and career objectives..."
            rows={5}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-resume-primary border-b border-resume-border pb-1 mb-3 flex items-center gap-2">
        <Info className="h-4 w-4" /> ABOUT
      </h3>
      <p className="text-sm mb-4 text-resume-primary">{content}</p>
    </div>
  );
};

export default AboutSection;

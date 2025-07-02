import { Input } from "@/components/ui/input";
import { ContactInfo } from "@/utils/resumeUtils";
import { Link, Github, Linkedin, Globe, Code } from "lucide-react";

interface ContactSectionProps {
  contactInfo: ContactInfo;
  updateContactInfo: (updatedInfo: Partial<ContactInfo>) => void;
  isEditing: boolean;
}

const ContactSection = ({
  contactInfo,
  updateContactInfo,
  isEditing
}: ContactSectionProps) => {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    updateContactInfo({
      [field]: value
    });
  };

  const formatUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  if (isEditing) {
    return <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input value={contactInfo.fullName} onChange={e => handleChange("fullName", e.target.value)} placeholder="Your full name" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Professional Title</label>
            <Input value={contactInfo.title} onChange={e => handleChange("title", e.target.value)} placeholder="e.g. Software Engineer" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={contactInfo.email} onChange={e => handleChange("email", e.target.value)} placeholder="your.email@example.com" type="email" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input value={contactInfo.phone} onChange={e => handleChange("phone", e.target.value)} placeholder="(123) 456-7890" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input value={contactInfo.location} onChange={e => handleChange("location", e.target.value)} placeholder="City, State" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input value={contactInfo.website || ""} onChange={e => handleChange("website", e.target.value)} placeholder="yourwebsite.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              <span className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </span>
            </label>
            <Input value={contactInfo.linkedin || ""} onChange={e => handleChange("linkedin", e.target.value)} placeholder="linkedin.com/in/yourprofile" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              <span className="flex items-center gap-1">
                <Github className="h-4 w-4" /> GitHub
              </span>
            </label>
            <Input value={contactInfo.github || ""} onChange={e => handleChange("github", e.target.value)} placeholder="github.com/yourusername" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              <span className="flex items-center gap-1">
                <Link className="h-4 w-4" /> Portfolio
              </span>
            </label>
            <Input value={contactInfo.portfolio || ""} onChange={e => handleChange("portfolio", e.target.value)} placeholder="portfolio.yourdomain.com" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              <span className="flex items-center gap-1">
                <Code className="h-4 w-4" /> LeetCode
              </span>
            </label>
            <Input value={contactInfo.leetcode || ""} onChange={e => handleChange("leetcode", e.target.value)} placeholder="leetcode.com/yourusername" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              <span className="flex items-center gap-1">
                <Code className="h-4 w-4" /> CodeChef
              </span>
            </label>
            <Input value={contactInfo.codechef || ""} onChange={e => handleChange("codechef", e.target.value)} placeholder="codechef.com/users/yourusername" />
          </div>
        </div>
      </div>;
  }
  return <div className="print:text-sm">
      <h1 className="text-3xl font-bold text-resume-primary">{contactInfo.fullName}</h1>
      <h2 className="text-xl font-medium mt-1 text-blue-800">{contactInfo.title}</h2>
      
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-resume-secondary">
        <span>{contactInfo.email}</span>
        <span>•</span>
        <span>{contactInfo.phone}</span>
        <span>•</span>
        <span>{contactInfo.location}</span>
        
        <div className="w-full mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {contactInfo.website && <a href={formatUrl(contactInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-resume-primary hover:text-resume-accent">
              <Globe className="h-3 w-3" /> {contactInfo.website}
            </a>}
          
          {contactInfo.linkedin && <a href={formatUrl(contactInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-resume-primary hover:text-resume-accent">
              <Linkedin className="h-3 w-3" /> LinkedIn
            </a>}
          
          {contactInfo.github && <a href={formatUrl(contactInfo.github)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-resume-primary hover:text-resume-accent">
              <Github className="h-3 w-3" /> GitHub
            </a>}
          
          {contactInfo.portfolio && <a href={formatUrl(contactInfo.portfolio)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-resume-primary hover:text-resume-accent">
              <Link className="h-3 w-3" /> Portfolio
            </a>}
          
          {contactInfo.leetcode && <a href={formatUrl(contactInfo.leetcode)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-resume-primary hover:text-resume-accent">
              <Code className="h-3 w-3" /> LeetCode
            </a>}
          
          {contactInfo.codechef && <a href={formatUrl(contactInfo.codechef)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-resume-primary hover:text-resume-accent">
              <Code className="h-3 w-3" /> CodeChef
            </a>}
        </div>
      </div>
    </div>;
};

export default ContactSection;


import ResumeEditor from "@/components/ResumeEditor";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-end mb-2">
          <ThemeToggle />
        </div>
        <ResumeEditor />
      </div>
    </div>
  );
};

export default Index;

# Resume Your Way

A modern, customizable resume builder built with **React**, **TypeScript**, **Vite**, and [shadcn/ui](https://ui.shadcn.com/). Effortlessly create, edit, preview, and export beautiful resumes in your browser.

---

## Features

- **Live Resume Editing**: Intuitive editor for personal details, experience, education, skills, projects, and certifications.
- **Multiple Templates**: Switch between several professionally designed resume templates.
- **Dark/Light Mode**: Toggle between light and dark themes.
- **Import/Export**:
  - Import from JSON or PDF (basic parsing).
  - Export your resume as JSON or high-quality PDF.
- **Auto-Save**: All changes are saved to your browser's local storage.
- **No Account Required**: All data stays on your device.

---

## Demo

(https://resume-genie-yq44.vercel.app/)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) / [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/)

### Installation

```bash
# Clone the repository
$ git clone https://github.com/your-username/resume-your-way.git
$ cd resume-your-way

# Install dependencies
$ npm install
# or
$ pnpm install
# or
$ yarn install
```

### Running Locally

```bash
# Start the development server
$ npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Building for Production

```bash
$ npm run build
$ npm run preview
```

---

## Usage

- **Edit**: Fill in your personal, professional, and educational details.
- **Switch Templates**: Use the template selector in preview mode.
- **Import**: Bring in data from a JSON or PDF file.
- **Export**: Download your resume as JSON or PDF.
- **Auto-Save**: Your progress is saved automatically in your browser.

---

## Technologies Used

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)
- [react-query](https://tanstack.com/query/latest)
- [react-router-dom](https://reactrouter.com/)
- [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://github.com/niklasvh/html2canvas) (PDF export)
- [pdf-parse](https://github.com/modesty/pdf-parse) (PDF import)

---

## Folder Structure

```
resume-your-way-main/
├── public/           # Static assets
├── src/
│   ├── components/   # React components (editor, preview, sections, UI)
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components (Index, NotFound)
│   ├── utils/        # Resume data types, import/export, helpers
│   └── App.tsx       # Main app entry
├── index.html        # HTML entry point
├── package.json      # Project metadata & scripts
└── ...
```

---

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, features, or improvements.

---


---

## Credits

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [html2canvas](https://github.com/niklasvh/html2canvas)
- [pdf-parse](https://github.com/modesty/pdf-parse) 

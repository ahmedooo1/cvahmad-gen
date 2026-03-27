import { Mail, MapPin, Github, Briefcase, GraduationCap, Award, Code, ExternalLink, Download, FileDown, Edit3, Eye, Palette, Plus, Trash2, Printer } from "lucide-react";
import { toPng } from "html-to-image";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableCell, TableRow, WidthType, VerticalAlign, BorderStyle, AlignmentType, ImageRun } from "docx";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useRef, useState } from "react";

const pdfVfs =
  (pdfFonts as any)?.pdfMake?.vfs ??
  (pdfFonts as any)?.vfs ??
  (pdfFonts as any)?.default?.pdfMake?.vfs ??
  (pdfFonts as any)?.default?.vfs;

if (pdfVfs) {
  (pdfMake as any).vfs = pdfVfs;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

interface CVData {
  name: string;
  title: string;
  subtitle: string;
  profileImage: string;
  email: string;
  location: string;
  github: string;
  portfolio: string;
  linkedin: string;
  profileText1: string;
  profileText2: string;
  valuesText: string;
  languages: string[];
  interests: string[];
  certifications: string[];
  frontendSkills: string[];
  backendSkills: string[];
  devopsSkills: string[];
  experiences: Experience[];
  projects: Project[];
  education: {
    degree: string;
    field: string;
    description: string;
  };
}

interface DesignConfig {
  primaryColor: string;
  secondaryColor: string;
  sidebarBg: string;
  accentColor: string;
}

type SidebarSectionKey = "profile" | "contact" | "stats" | "skills";
type MainSectionKey = "about" | "experience" | "projects" | "education";

export default function App() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [sidebarOrder, setSidebarOrder] = useState<SidebarSectionKey[]>(["profile", "contact", "stats", "skills"]);
  const [mainOrder, setMainOrder] = useState<MainSectionKey[]>(["about", "experience", "projects", "education"]);
  const [draggingSidebarSection, setDraggingSidebarSection] = useState<SidebarSectionKey | null>(null);
  const [draggingMainSection, setDraggingMainSection] = useState<MainSectionKey | null>(null);

  const [cvData, setCVData] = useState<CVData>({
    name: "Ahmad Ahmad",
    title: "Développeur Full-Stack",
    subtitle: "Master 2 · Expert en Ingénierie informatique",
    profileImage: "",
    email: "ahmad-ahmad@mail.com",
    location: "Rouen, Normandie",
    github: "github.com/ahmedooo1",
    portfolio: "ahmadahmad.aaweb.fr",
    linkedin: "linkedin.com/in/ahmad-web",
    profileText1: "Étudiant, développeur full-stack et membre de l'équipe de transformation numérique (ETN 76) de la Direction générale des Finances publiques, je conçois des interfaces attractives, des backends scalables et des expériences web mémorables depuis la Normandie.",
    profileText2: "Je réalise des solutions web full-stack et des interfaces attractives, en concevant des expériences centrées utilisateur, optimisées pour la performance et la maintenabilité.",
    valuesText: "Valeurs: Curieux, rigoureux et orienté utilisateur, je veille aux métriques et à la maintenabilité. J'adore prototyper de nouvelles idées et les accompagner jusqu'au déploiement.",
    languages: ['Français : courant', 'Anglais : B1', 'Kurde : maternelle', 'Turc : B1', 'Arabe : courant'],
    interests: ['Calligraphie', 'Dessin', 'Musique', 'Sport (Cardio, Musculation)', 'Coder des projets personnels'],
    certifications: [
      'Bac+2 : Developpeur web et web mobile',
      'Bac+3 : Concepteur developpeur d\'application',
      'Bac+5 : Expert en ingenierie informatique'
    ],
    frontendSkills: ['Nuxt.js', 'Vue.js', 'Next.js', 'Tailwind'],
    backendSkills: ['PHP', 'Node.js', 'Symfony', 'FastAPI'],
    devopsSkills: ['Docker', 'GitHub Actions', 'VPS', 'nginx'],
    experiences: [
      {
        id: '1',
        company: "Direction générale des Finances publiques",
        role: "Transformation numérique · ETN 76",
        period: "Oct 2023 - Aujourd'hui",
        description: "Alternance à Rouen. Déploiement de workflows, monitoring d'applications critiques et automatisations LibreOffice / backends PHP & Node.",
        skills: ['PHP', 'Node.js', 'Symfony', 'Automatisations']
      },
      {
        id: '2',
        company: "Need for School",
        role: "Étudiant · Rouen",
        period: "Nov 2021 - Aujourd'hui",
        description: "Réalisation de modules full-stack, mentorat de nouvelles promos, support des équipes produit/promo.",
        skills: ['Node.js', 'Symfony', 'MVC', 'Sprint planning']
      },
      {
        id: '3',
        company: "HDM Network",
        role: "Stage · Belgique (remote)",
        period: "Jan - Juin 2023",
        description: "Missions Node.js, planification agile et contribution à des prototypes clients internationaux en remote.",
        skills: ['Node.js', 'APIs REST', 'Sprints agiles']
      }
    ],
    projects: [
      {
        id: '1',
        title: "RappelAnniv",
        description: "Web app PHP/JS compatible SQLite & MySQL. Elle gère les listes d'anniversaires et envoie des rappels via Telegram ou email.",
        skills: ['PHP', 'JavaScript', 'Telegram API', 'SQLite']
      },
      {
        id: '2',
        title: "Need For Eat",
        description: "Frontend Nuxt.js pour restaurants : gestion de menus, catégories, commandes et adaptation mobile.",
        skills: ['Nuxt.js', 'Vue.js', 'Design system', 'API Node.js']
      },
      {
        id: '3',
        title: "MemoGenie v1.1",
        description: "Chatbot IA capable de lire des PDF, générer des images, écrire du code, traduire dans 50+ langues et garder tout contexte actif.",
        skills: ['Node.js', 'API IA', 'Conversation persistante']
      },
      {
        id: '4',
        title: "La Bonne Gestion Immobilière",
        description: "Jeu multijoueur inspiré du Monopoly pour entraîner les agents DGFiP aux situations immobilières.",
        skills: ['JavaScript', 'Plateau spirale', 'Multijoueur']
      }
    ],
    education: {
      degree: "Master 2 - Expert en Ingénierie informatique",
      field: "Développement web · Need for School",
      description: "En alternance à la DGFiP tout en accompagnant les produits Need for School. Documentation, automatisation des pipelines et liaison entre le design et les équipes techniques."
    }
  });

  const [design, setDesign] = useState<DesignConfig>({
    primaryColor: "#2563eb",
    secondaryColor: "#9333ea",
    sidebarBg: "#0f172a",
    accentColor: "#93c5fd"
  });

  const moveItem = <T,>(items: T[], from: number, to: number): T[] => {
    const result = [...items];
    const [moved] = result.splice(from, 1);
    result.splice(to, 0, moved);
    return result;
  };

  const getSectionOrder = <T extends string>(orderedKeys: T[], key: T): number => {
    const index = orderedKeys.indexOf(key);
    return index === -1 ? orderedKeys.length : index;
  };

  const handleSidebarDrop = (targetKey: SidebarSectionKey) => {
    if (!draggingSidebarSection || draggingSidebarSection === targetKey) return;

    setSidebarOrder((prev) => {
      const from = prev.indexOf(draggingSidebarSection);
      const to = prev.indexOf(targetKey);
      if (from === -1 || to === -1) return prev;
      return moveItem(prev, from, to);
    });
    setDraggingSidebarSection(null);
  };

  const handleMainDrop = (targetKey: MainSectionKey) => {
    if (!draggingMainSection || draggingMainSection === targetKey) return;

    setMainOrder((prev) => {
      const from = prev.indexOf(draggingMainSection);
      const to = prev.indexOf(targetKey);
      if (from === -1 || to === -1) return prev;
      return moveItem(prev, from, to);
    });
    setDraggingMainSection(null);
  };

  const captureCVImageData = async (): Promise<string> => {
    if (!cvRef.current) {
      throw new Error("CV introuvable pour la capture");
    }

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const target = cvRef.current;
    return toPng(target, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      width: target.scrollWidth,
      height: target.scrollHeight,
      style: {
        margin: '0',
        transform: 'none',
        borderRadius: '0',
        boxShadow: 'none'
      }
    });
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;

    try {
      const imgData = await captureCVImageData();

      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [0, 0, 0, 0] as [number, number, number, number],
        content: [
          {
            image: imgData,
            fit: [595.28, 841.89],
            alignment: 'left',
          },
        ],
      };

      (pdfMake as any).createPdf(docDefinition).download(`CV_${cvData.name.replace(/\s/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  const printCV = async () => {
    try {
      if (editMode) {
        setEditMode(false);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      const imgData = await captureCVImageData();
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      iframe.setAttribute("aria-hidden", "true");

      iframe.srcdoc = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Impression CV</title>
            <style>
              @page { size: A4 portrait; margin: 0; }
              html, body {
                margin: 0;
                padding: 0;
                width: 210mm;
                height: 297mm;
                overflow: hidden;
                background: #fff;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: left top;
                display: block;
                background: #fff;
              }
            </style>
          </head>
          <body>
            <img src="${imgData}" alt="CV" />
          </body>
        </html>
      `;

      document.body.appendChild(iframe);

      const cleanup = () => {
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      };

      iframe.onload = () => {
        const iframeWindow = iframe.contentWindow;
        if (!iframeWindow) {
          cleanup();
          return;
        }

        iframeWindow.focus();
        iframeWindow.print();

        // Cleanup after print dialog lifecycle finishes.
        setTimeout(cleanup, 1500);
      };
    } catch (error) {
      console.error('Erreur lors de l\'impression:', error);
      alert('Impossible de lancer l\'impression. Veuillez réessayer.');
    }
  };

  const downloadWord = () => {
    const cleanHex = (color: string) => color.replace('#', '');

    const leftSectionTitle = (text: string) => new Paragraph({
      spacing: { before: 220, after: 120 },
      border: {
        top: { color: "FFFFFF", space: 1, style: BorderStyle.SINGLE, size: 10 },
        bottom: { color: "FFFFFF", space: 1, style: BorderStyle.SINGLE, size: 10 },
      },
      children: [
        new TextRun({ text, bold: true, color: "FFFFFF", size: 22 }),
      ],
    });

    const rightSectionTitle = (text: string) => new Paragraph({
      spacing: { before: 220, after: 100 },
      children: [
        new TextRun({ text, bold: true, color: cleanHex(design.primaryColor), size: 26 }),
      ],
    });

    const leftBody = (text: string, bold = false) => new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text, color: "E2E8F0", size: 18, bold })],
    });

    const rightBody = (text: string) => new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text, color: "1E293B", size: 20 })],
    });

    const rightMuted = (text: string) => new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text, color: "64748B", size: 18 })],
    });

    const leftChildren: Paragraph[] = [];

    if (cvData.profileImage.startsWith("data:image")) {
      try {
        const base64 = cvData.profileImage.split(",")[1];
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        leftChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
            children: [
              new ImageRun({
                data: bytes,
                transformation: { width: 100, height: 100 },
              }),
            ],
          })
        );
      } catch {
        // Ignore image conversion issue and continue with text-only profile header.
      }
    }

    leftChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [new TextRun({ text: cvData.name, bold: true, color: "FFFFFF", size: 34 })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [new TextRun({ text: cvData.title, color: cleanHex(design.accentColor), size: 24 })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 160 },
        children: [new TextRun({ text: cvData.subtitle, color: "CBD5E1", size: 18 })],
      }),

      leftSectionTitle("CONTACT"),
      leftBody(`Email: ${cvData.email}`),
      leftBody(`Localisation: ${cvData.location}`),
      leftBody(`GitHub: ${cvData.github}`),
      leftBody(`Portfolio: ${cvData.portfolio}`),
      leftBody(`LinkedIn: ${cvData.linkedin}`),

      leftSectionTitle("LANGUES"),
      ...cvData.languages.map((lang) => leftBody(`• ${lang}`)),

      leftSectionTitle("CENTRES D'INTERET"),
      ...cvData.interests.map((interest) => leftBody(`• ${interest}`)),

      leftSectionTitle("COMPETENCES"),
      leftBody(`Interfaces: ${cvData.frontendSkills.join(", ")}`),
      leftBody(`Backend: ${cvData.backendSkills.join(", ")}`),
      leftBody(`DevOps: ${cvData.devopsSkills.join(", ")}`)
    );

    const rightChildren: Paragraph[] = [
      rightSectionTitle("PROFIL"),
      rightBody(cvData.profileText1),
      rightBody(cvData.profileText2),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: cvData.valuesText, bold: true, color: cleanHex(design.primaryColor), size: 20 })],
      }),

      rightSectionTitle("EXPERIENCE"),
      ...cvData.experiences.flatMap((exp) => [
        new Paragraph({
          spacing: { after: 40 },
          children: [new TextRun({ text: exp.company, bold: true, color: "0F172A", size: 22 })],
        }),
        rightMuted(`${exp.role} | ${exp.period}`),
        rightBody(exp.description),
        rightMuted(`Tech: ${exp.skills.join(", ")}`),
      ]),

      rightSectionTitle("PROJETS SELECTIONNES"),
      ...cvData.projects.flatMap((proj) => [
        new Paragraph({
          spacing: { after: 40 },
          children: [new TextRun({ text: proj.title, bold: true, color: "0F172A", size: 22 })],
        }),
        rightBody(proj.description),
        rightMuted(`Tech: ${proj.skills.join(", ")}`),
      ]),

      rightSectionTitle("FORMATION"),
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: cvData.education.degree, bold: true, color: "0F172A", size: 22 })],
      }),
      rightMuted(cvData.education.field),
      rightBody(cvData.education.description),

      rightSectionTitle("CERTIFICATIONS"),
      ...cvData.certifications.map((cert) => rightBody(`• ${cert}`)),
    ];

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        children: [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.TOP,
                    shading: { fill: cleanHex(design.sidebarBg) },
                    margins: { top: 120, bottom: 120, left: 120, right: 100 },
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                      bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                      left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                      right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                    children: leftChildren,
                  }),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.TOP,
                    margins: { top: 120, bottom: 120, left: 120, right: 120 },
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                      bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                      left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                      right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                    children: rightChildren,
                  }),
                ],
              }),
            ],
          }),
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `CV_${cvData.name.replace(/\s/g, '_')}.docx`);
    });
  };

  const addExperience = () => {
    setCVData({
      ...cvData,
      experiences: [...cvData.experiences, {
        id: Date.now().toString(),
        company: "Nouvelle Entreprise",
        role: "Nouveau Poste",
        period: "Date - Date",
        description: "Description de l'expérience",
        skills: []
      }]
    });
  };

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experiences: cvData.experiences.filter(exp => exp.id !== id)
    });
  };

  const addProject = () => {
    setCVData({
      ...cvData,
      projects: [...cvData.projects, {
        id: Date.now().toString(),
        title: "Nouveau Projet",
        description: "Description du projet",
        skills: []
      }]
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setCVData((prev) => ({ ...prev, profileImage: result }));
      }
    };
    reader.readAsDataURL(file);

    // Reset input value so selecting the same file again still triggers onChange.
    event.target.value = "";
  };

  const removeProject = (id: string) => {
    setCVData({
      ...cvData,
      projects: cvData.projects.filter(proj => proj.id !== id)
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 print:min-h-0 print:bg-white">
      <div className="max-w-7xl mx-auto p-8 print:max-w-none print:p-0">
        {/* Action Bar */}
        <div className="flex justify-between items-center gap-4 mb-6 print:hidden">
          <div className="flex gap-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl ${
                editMode
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-slate-700 text-white hover:bg-slate-800'
              }`}
            >
              {editMode ? <><Eye className="w-5 h-5" /> Aperçu</> : <><Edit3 className="w-5 h-5" /> Éditer</>}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={printCV}
              className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Printer className="w-5 h-5" />
              Imprimer
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <FileDown className="w-5 h-5" />
              PDF
            </button>
            <button
              onClick={downloadWord}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Word
            </button>
          </div>
        </div>

        {editMode && (
          <p className="mb-4 text-sm text-slate-600 print:hidden">
            Glisse-depose actif: tu peux reorganiser les blocs de la sidebar et les sections principales.
          </p>
        )}

        {/* Color Palette Editor */}
        {editMode && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 print:hidden">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl">Palette de Couleurs</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm mb-2">Couleur Primaire</label>
                <input
                  type="color"
                  value={design.primaryColor}
                  onChange={(e) => setDesign({...design, primaryColor: e.target.value})}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Couleur Secondaire</label>
                <input
                  type="color"
                  value={design.secondaryColor}
                  onChange={(e) => setDesign({...design, secondaryColor: e.target.value})}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Fond Sidebar</label>
                <input
                  type="color"
                  value={design.sidebarBg}
                  onChange={(e) => setDesign({...design, sidebarBg: e.target.value})}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Couleur Accent</label>
                <input
                  type="color"
                  value={design.accentColor}
                  onChange={(e) => setDesign({...design, accentColor: e.target.value})}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        <div ref={cvRef} className={`bg-white rounded-2xl shadow-2xl overflow-hidden print:rounded-none print:shadow-none print:ring-0 ${editMode ? 'ring-4 ring-blue-400' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] print:grid-cols-[350px_1fr]">
            {/* Sidebar */}
            <aside style={{background: `linear-gradient(to bottom right, ${design.sidebarBg}, ${design.sidebarBg}dd)`}} className="text-white p-8">
              <div className="flex flex-col gap-8">
                {/* Profile */}
                <div
                  className={`text-center pb-6 border-b border-slate-700 ${editMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  style={{ order: getSectionOrder(sidebarOrder, "profile") }}
                  draggable={editMode}
                  onDragStart={() => setDraggingSidebarSection("profile")}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleSidebarDrop("profile")}
                  onDragEnd={() => setDraggingSidebarSection(null)}
                >
                  <div
                    style={{background: `linear-gradient(to bottom right, ${design.primaryColor}, ${design.secondaryColor})`}}
                    className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center"
                  >
                    {cvData.profileImage ? (
                      <img
                        src={cvData.profileImage}
                        alt={`Photo de ${cvData.name}`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-5xl">{cvData.name.split(' ').map(n => n[0]).join('')}</span>
                    )}
                  </div>
                  {editMode && (
                    <div className="flex justify-center gap-2 mb-4">
                      <label className="px-3 py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                        Choisir une photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      {cvData.profileImage && (
                        <button
                          onClick={() => setCVData({ ...cvData, profileImage: "" })}
                          className="px-3 py-1.5 text-xs rounded-md bg-red-500/80 hover:bg-red-500 transition-colors"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  )}
                  <h1
                    className={`text-3xl mb-2 ${editMode ? 'px-2 py-1 rounded hover:bg-white/10 cursor-text' : ''}`}
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onBlur={(e) => setCVData({...cvData, name: e.currentTarget.textContent || ''})}
                  >
                    {cvData.name}
                  </h1>
                  <p
                    style={{color: design.accentColor}}
                    className={`${editMode ? 'px-2 py-1 rounded hover:bg-white/10 cursor-text' : ''}`}
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onBlur={(e) => setCVData({...cvData, title: e.currentTarget.textContent || ''})}
                  >
                    {cvData.title}
                  </p>
                  <p
                    className={`text-slate-400 text-sm mt-2 ${editMode ? 'px-2 py-1 rounded hover:bg-white/10 cursor-text' : ''}`}
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onBlur={(e) => setCVData({...cvData, subtitle: e.currentTarget.textContent || ''})}
                  >
                    {cvData.subtitle}
                  </p>
                </div>

                {/* Contact */}
                <div
                  className={`space-y-4 ${editMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  style={{ order: getSectionOrder(sidebarOrder, "contact") }}
                  draggable={editMode}
                  onDragStart={() => setDraggingSidebarSection("contact")}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleSidebarDrop("contact")}
                  onDragEnd={() => setDraggingSidebarSection(null)}
                >
                  <h3 className="text-lg mb-3" style={{color: design.accentColor}}>Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{color: design.accentColor}} />
                      <a
                        href={`mailto:${cvData.email}`}
                        className={`hover:opacity-80 transition-colors break-all ${editMode ? 'px-2 py-1 rounded hover:bg-white/10 cursor-text' : ''}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onBlur={(e) => setCVData({...cvData, email: e.currentTarget.textContent || ''})}
                      >
                        {cvData.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 flex-shrink-0" style={{color: design.accentColor}} />
                      <span
                        className={`${editMode ? 'px-2 py-1 rounded hover:bg-white/10 cursor-text' : ''}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onBlur={(e) => setCVData({...cvData, location: e.currentTarget.textContent || ''})}
                      >
                        {cvData.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Github className="w-4 h-4 flex-shrink-0" style={{color: design.accentColor}} />
                      <a
                        href={`https://${cvData.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:opacity-80 transition-colors ${editMode ? 'px-2 py-1 rounded hover:bg-white/10 cursor-text' : ''}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onBlur={(e) => setCVData({...cvData, github: e.currentTarget.textContent || ''})}
                      >
                        {cvData.github}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <ExternalLink className="w-4 h-4 flex-shrink-0" style={{color: design.accentColor}} />
                      <a
                        href={`https://${cvData.portfolio.replace(/^https?:\/\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:opacity-80 transition-colors ${editMode ? 'px-2 py-1 rounded hover:bg-white/10 cursor-text' : ''}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onBlur={(e) => setCVData({...cvData, portfolio: e.currentTarget.textContent || ''})}
                      >
                        {cvData.portfolio}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <ExternalLink className="w-4 h-4 flex-shrink-0" style={{color: design.accentColor}} />
                      <a
                        href={`https://${cvData.linkedin.replace(/^https?:\/\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:opacity-80 transition-colors ${editMode ? 'px-2 py-1 rounded hover:bg-white/10 cursor-text' : ''}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onBlur={(e) => setCVData({...cvData, linkedin: e.currentTarget.textContent || ''})}
                      >
                        {cvData.linkedin}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div
                  className={`space-y-4 ${editMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  style={{ order: getSectionOrder(sidebarOrder, "stats") }}
                  draggable={editMode}
                  onDragStart={() => setDraggingSidebarSection("stats")}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleSidebarDrop("stats")}
                  onDragEnd={() => setDraggingSidebarSection(null)}
                >
                  <h3 className="text-lg mb-3" style={{color: design.accentColor}}>Statistiques</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl" style={{color: design.accentColor}}>4+</div>
                      <div className="text-xs text-slate-400">Années</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl" style={{color: design.accentColor}}>20+</div>
                      <div className="text-xs text-slate-400">Repos</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl" style={{color: design.accentColor}}>10+</div>
                      <div className="text-xs text-slate-400">Projets</div>
                    </div>
                  </div>
                </div>

                {/* Skills Categories */}
                <div
                  className={`space-y-4 ${editMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  style={{ order: getSectionOrder(sidebarOrder, "skills") }}
                  draggable={editMode}
                  onDragStart={() => setDraggingSidebarSection("skills")}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleSidebarDrop("skills")}
                  onDragEnd={() => setDraggingSidebarSection(null)}
                >
                  <h3 className="text-lg mb-3" style={{color: design.accentColor}}>Compétences</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-slate-300 mb-2">Interfaces</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cvData.frontendSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 bg-slate-700 text-xs rounded ${editMode ? 'hover:bg-slate-600 cursor-text' : ''}`}
                            contentEditable={editMode}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newSkills = [...cvData.frontendSkills];
                              newSkills[idx] = e.currentTarget.textContent || '';
                              setCVData({...cvData, frontendSkills: newSkills});
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                        {editMode && (
                          <button
                            onClick={() => setCVData({...cvData, frontendSkills: [...cvData.frontendSkills, 'Nouvelle']})}
                            className="px-2 py-1 bg-slate-600 text-xs rounded hover:bg-slate-500"
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-300 mb-2">Backend</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cvData.backendSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 bg-slate-700 text-xs rounded ${editMode ? 'hover:bg-slate-600 cursor-text' : ''}`}
                            contentEditable={editMode}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newSkills = [...cvData.backendSkills];
                              newSkills[idx] = e.currentTarget.textContent || '';
                              setCVData({...cvData, backendSkills: newSkills});
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                        {editMode && (
                          <button
                            onClick={() => setCVData({...cvData, backendSkills: [...cvData.backendSkills, 'Nouvelle']})}
                            className="px-2 py-1 bg-slate-600 text-xs rounded hover:bg-slate-500"
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-300 mb-2">DevOps</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cvData.devopsSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 bg-slate-700 text-xs rounded ${editMode ? 'hover:bg-slate-600 cursor-text' : ''}`}
                            contentEditable={editMode}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newSkills = [...cvData.devopsSkills];
                              newSkills[idx] = e.currentTarget.textContent || '';
                              setCVData({...cvData, devopsSkills: newSkills});
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                        {editMode && (
                          <button
                            onClick={() => setCVData({...cvData, devopsSkills: [...cvData.devopsSkills, 'Nouvelle']})}
                            className="px-2 py-1 bg-slate-600 text-xs rounded hover:bg-slate-500"
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4" style={{ order: 100 }}>
                  <h3 className="text-lg mb-3" style={{color: design.accentColor}}>Langues</h3>
                  <ul className="space-y-2 text-sm text-slate-200">
                    {cvData.languages.map((language, idx) => (
                      <li key={idx} className="list-disc list-inside">
                      <span
                        className={`${editMode ? 'px-1 rounded hover:bg-slate-600 cursor-text' : ''}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const newLanguages = [...cvData.languages];
                          newLanguages[idx] = e.currentTarget.textContent || '';
                          setCVData({...cvData, languages: newLanguages});
                        }}
                      >
                        {language}
                      </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4" style={{ order: 101 }}>
                  <h3 className="text-lg mb-3" style={{color: design.accentColor}}>Centres d'intérêt</h3>
                  <ul className="space-y-2 text-sm text-slate-200">
                    {cvData.interests.map((interest, idx) => (
                      <li key={idx} className="list-disc list-inside">
                      <span
                        className={`${editMode ? 'px-1 rounded hover:bg-slate-600 cursor-text' : ''}`}
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const newInterests = [...cvData.interests];
                          newInterests[idx] = e.currentTarget.textContent || '';
                          setCVData({...cvData, interests: newInterests});
                        }}
                      >
                        {interest}
                      </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="p-8 lg:p-12">
              <div className="flex flex-col gap-10">
                {/* About */}
                <section
                  className={editMode ? 'cursor-grab active:cursor-grabbing' : ''}
                  style={{ order: getSectionOrder(mainOrder, "about") }}
                  draggable={editMode}
                  onDragStart={() => setDraggingMainSection("about")}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleMainDrop("about")}
                  onDragEnd={() => setDraggingMainSection(null)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-6 h-6" style={{color: design.primaryColor}} />
                    <h2 className="text-2xl text-slate-900">Profil</h2>
                  </div>
                  <div className="space-y-4 text-slate-700">
                    <p
                      className={`leading-relaxed ${editMode ? 'px-2 py-1 rounded hover:bg-slate-100 cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      onBlur={(e) => setCVData({...cvData, profileText1: e.currentTarget.textContent || ''})}
                    >
                      {cvData.profileText1}
                    </p>
                    <p
                      className={`leading-relaxed ${editMode ? 'px-2 py-1 rounded hover:bg-slate-100 cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      onBlur={(e) => setCVData({...cvData, profileText2: e.currentTarget.textContent || ''})}
                    >
                      {cvData.profileText2}
                    </p>
                    <div
                      className={`border-l-4 p-4 rounded ${editMode ? 'hover:bg-slate-100 cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                      style={{
                        backgroundColor: `${design.primaryColor}10`,
                        borderLeftColor: design.primaryColor
                      }}
                    >
                      <p
                        className="text-sm text-slate-700"
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onBlur={(e) => setCVData({...cvData, valuesText: e.currentTarget.textContent || ''})}
                      >
                        <strong>{cvData.valuesText}</strong>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Experience */}
                <section
                  className={editMode ? 'cursor-grab active:cursor-grabbing' : ''}
                  style={{ order: getSectionOrder(mainOrder, "experience") }}
                  draggable={editMode}
                  onDragStart={() => setDraggingMainSection("experience")}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleMainDrop("experience")}
                  onDragEnd={() => setDraggingMainSection(null)}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="w-6 h-6" style={{color: design.primaryColor}} />
                    <h2 className="text-2xl text-slate-900">Expérience</h2>
                    {editMode && (
                      <button
                        onClick={addExperience}
                        className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4" /> Ajouter
                      </button>
                    )}
                  </div>
                  <div className="space-y-6">
                    {cvData.experiences.map((exp, index) => (
                      <div
                        key={exp.id}
                        className={`border-l-2 pl-6 pb-6 relative ${editMode ? 'hover:bg-slate-50 rounded-r-lg' : ''}`}
                        style={{borderColor: index === 0 ? design.primaryColor : '#cbd5e1'}}
                      >
                        {editMode && (
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="absolute -left-3 top-0 w-6 h-6 bg-red-600 text-white rounded-full hover:bg-red-700 flex items-center justify-center"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3
                              className={`text-lg text-slate-900 ${editMode ? 'px-2 py-1 rounded hover:bg-white cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                              contentEditable={editMode}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const newExp = [...cvData.experiences];
                                newExp[index].company = e.currentTarget.textContent || '';
                                setCVData({...cvData, experiences: newExp});
                              }}
                            >
                              {exp.company}
                            </h3>
                            <p
                              style={{color: index === 0 ? design.primaryColor : '#64748b'}}
                              className={`${editMode ? 'px-2 py-1 rounded hover:bg-white cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                              contentEditable={editMode}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const newExp = [...cvData.experiences];
                                newExp[index].role = e.currentTarget.textContent || '';
                                setCVData({...cvData, experiences: newExp});
                              }}
                            >
                              {exp.role}
                            </p>
                          </div>
                          <span
                            className={`text-sm text-slate-500 ${editMode ? 'px-2 py-1 rounded hover:bg-white cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                            contentEditable={editMode}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newExp = [...cvData.experiences];
                              newExp[index].period = e.currentTarget.textContent || '';
                              setCVData({...cvData, experiences: newExp});
                            }}
                          >
                            {exp.period}
                          </span>
                        </div>
                        <p
                          className={`text-slate-700 mb-3 ${editMode ? 'px-2 py-1 rounded hover:bg-white cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const newExp = [...cvData.experiences];
                            newExp[index].description = e.currentTarget.textContent || '';
                            setCVData({...cvData, experiences: newExp});
                          }}
                        >
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((tech, skillIdx) => (
                            <span
                              key={skillIdx}
                              className={`px-3 py-1 text-xs rounded-full ${editMode ? 'cursor-text hover:opacity-80' : ''}`}
                              style={{
                                backgroundColor: index === 0 ? `${design.primaryColor}20` : '#f1f5f9',
                                color: index === 0 ? design.primaryColor : '#334155'
                              }}
                              contentEditable={editMode}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const newExp = [...cvData.experiences];
                                newExp[index].skills[skillIdx] = e.currentTarget.textContent || '';
                                setCVData({...cvData, experiences: newExp});
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Projects */}
                <section
                  className={editMode ? 'cursor-grab active:cursor-grabbing' : ''}
                  style={{ order: getSectionOrder(mainOrder, "projects") }}
                  draggable={editMode}
                  onDragStart={() => setDraggingMainSection("projects")}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleMainDrop("projects")}
                  onDragEnd={() => setDraggingMainSection(null)}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Code className="w-6 h-6" style={{color: design.primaryColor}} />
                    <h2 className="text-2xl text-slate-900">Projets Sélectionnés</h2>
                    {editMode && (
                      <button
                        onClick={addProject}
                        className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4" /> Ajouter
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cvData.projects.map((project, index) => (
                      <div key={project.id} className={`border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow relative ${editMode ? 'hover:bg-slate-50' : ''}`}>
                        {editMode && (
                          <button
                            onClick={() => removeProject(project.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full hover:bg-red-700 flex items-center justify-center"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                        <div className="flex items-start justify-between mb-3">
                          <h3
                            className={`text-lg text-slate-900 ${editMode ? 'px-2 py-1 rounded hover:bg-white cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                            contentEditable={editMode}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newProj = [...cvData.projects];
                              newProj[index].title = e.currentTarget.textContent || '';
                              setCVData({...cvData, projects: newProj});
                            }}
                          >
                            {project.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </div>
                        <p
                          className={`text-slate-700 text-sm mb-4 ${editMode ? 'px-2 py-1 rounded hover:bg-white cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const newProj = [...cvData.projects];
                            newProj[index].description = e.currentTarget.textContent || '';
                            setCVData({...cvData, projects: newProj});
                          }}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((tech, skillIdx) => (
                            <span
                              key={skillIdx}
                              className={`px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded ${editMode ? 'cursor-text hover:bg-slate-200' : ''}`}
                              contentEditable={editMode}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const newProj = [...cvData.projects];
                                newProj[index].skills[skillIdx] = e.currentTarget.textContent || '';
                                setCVData({...cvData, projects: newProj});
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section
                  className={editMode ? 'cursor-grab active:cursor-grabbing' : ''}
                  style={{ order: getSectionOrder(mainOrder, "education") }}
                  draggable={editMode}
                  onDragStart={() => setDraggingMainSection("education")}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleMainDrop("education")}
                  onDragEnd={() => setDraggingMainSection(null)}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-6 h-6" style={{color: design.primaryColor}} />
                    <h2 className="text-2xl text-slate-900">Formation</h2>
                  </div>
                  <div
                    className={`border rounded-xl p-6 ${editMode ? 'hover:shadow-lg cursor-text' : ''}`}
                    style={{
                      background: `linear-gradient(to right, ${design.primaryColor}10, ${design.secondaryColor}10)`,
                      borderColor: `${design.primaryColor}40`
                    }}
                  >
                    <h3
                      className={`text-lg text-slate-900 mb-2 ${editMode ? 'px-2 py-1 rounded hover:bg-white border-2 border-transparent hover:border-blue-300' : ''}`}
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      onBlur={(e) => setCVData({...cvData, education: {...cvData.education, degree: e.currentTarget.textContent || ''}})}
                    >
                      {cvData.education.degree}
                    </h3>
                    <p
                      className={`text-slate-700 mb-3 ${editMode ? 'px-2 py-1 rounded hover:bg-white cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      onBlur={(e) => setCVData({...cvData, education: {...cvData.education, field: e.currentTarget.textContent || ''}})}
                    >
                      {cvData.education.field}
                    </p>
                    <p
                      className={`text-slate-600 text-sm ${editMode ? 'px-2 py-1 rounded hover:bg-white cursor-text border-2 border-transparent hover:border-blue-300' : ''}`}
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      onBlur={(e) => setCVData({...cvData, education: {...cvData.education, description: e.currentTarget.textContent || ''}})}
                    >
                      {cvData.education.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="text-sm text-slate-900 mb-2">Certifications</h4>
                      <ul className="space-y-1 text-sm text-slate-700">
                        {cvData.certifications.map((certification, idx) => (
                          <li key={idx} className="list-disc list-inside">
                            <span
                              className={`${editMode ? 'px-1 rounded hover:bg-white cursor-text border border-transparent hover:border-blue-300' : ''}`}
                              contentEditable={editMode}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const newCerts = [...cvData.certifications];
                                newCerts[idx] = e.currentTarget.textContent || '';
                                setCVData({ ...cvData, certifications: newCerts });
                              }}
                            >
                              {certification}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

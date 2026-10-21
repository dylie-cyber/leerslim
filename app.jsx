import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  FolderPlus,
  Folder,
  FileText,
  Share2,
  Printer,
  CheckCircle2,
  XCircle,
  Sun,
  Moon,
  Globe,
  Plus,
  Trash2,
  Edit3,
  ChevronLeft,
  Award,
  Sparkles,
  Upload,
  BookOpen,
  Users,
  Download,
  Copy,
  Check,
  Key,
  HelpCircle
} from 'lucide-react';

// ==========================================
// TRANSLATIONS (AFRIKAANS & ENGLISH)
// ==========================================
const TRANSLATIONS = {
  af: {
    appName: 'LeerSmart NPO',
    tagline: 'Gratis KI Skoolwerk Skandeerder & Toets Skepper',
    navHome: 'Vakke',
    navCreate: 'Skep Toets',
    navCommunity: 'NPO Hub',
    navSettings: 'Sleutel',
    subjectsTitle: 'My Vakvouers',
    newSubjectPlaceholder: 'Nuwe vak naam (bv. Natuurwetenskappe)...',
    addSubject: 'Skep Vouer',
    renameSubject: 'Hernoem',
    deleteSubject: 'Vee uit',
    testsCount: 'toetse',
    noTestsInFolder: 'Nog geen toetse in hierdie vakvouer nie.',
    createFirstTest: 'Skandeer Skoolwerk & Skep Toets',
    uploadTitle: 'Laai Skoolwerk Foto’s Op (Onbeperk)',
    uploadSub: 'Neem foto’s van jou handboek, klasnotas of werkkaarte.',
    addPhotosBtn: 'Voeg Foto’s By',
    loadSampleBtn: 'Laai Voorbeeld Skoolwerk Nota',
    photosSelected: 'foto(’s) gelaai',
    clearAll: 'Verwyder alles',
    testTitleLabel: 'Toets Titel',
    testTitlePlaceholder: 'bv. Graad 9 Selstruktuur & Stelsels Toets',
    selectSubjectLabel: 'Kies Vakvouer',
    questionCountLabel: 'Aantal Vrae',
    generateBtn: 'Genereer KI Vraestel & Memo',
    generatingText: 'KI ontleed jou skoolwerk foto’s en bou jou vraestel...',
    digitalMode: 'Digitale Toets',
    printMode: 'Drukbare Vraestel & Memo',
    showMemo: 'Wys Memorandum',
    hideMemo: 'Versteek Memorandum',
    printBtn: 'Druk / Stoor as PDF',
    shareBtn: 'Deel na NPO Gemeenskap',
    whatsappShare: 'Deel Toets via WhatsApp / Teks',
    copied: 'Gekopieer!',
    submitTestBtn: 'Merk My Toets (KI Nasien)',
    gradingText: 'KI Onderwyser merk jou geskrewe antwoorde...',
    retakeBtn: 'Probeer Weer',
    sectionA: 'AFDELING A: Meervoudige Keuse',
    sectionB: 'AFDELING B: Geskrewe Vrae',
    yourAnswer: 'Skryf jou antwoord hier...',
    memoLabel: 'Nasienmemorandum Antwoord:',
    aiFeedbackLabel: 'KI Onderwyser Terugvoer:',
    totalMarks: 'Totaal',
    studentName: 'Leerder Naam',
    gradeLabel: 'Graad / Klas',
    dateLabel: 'Datum',
    timeAllocation: 'Tyd: 45 Minute',
    npoTitle: 'LeerSmart NPO Gemeenskap Hub',
    npoSub: 'Gratis gedeelde vraestelle vir alle leerders. Kopieer enige toets na jou eie vakvouer.',
    saveToMyFolder: 'Stoor in My Vakke',
    savedSuccess: 'Toets gestoor in jou vakvouer!',
    apiModalTitle: 'Google Gemini KI Sleutel (Opsioneel)',
    apiModalDesc: 'Plak jou gratis Gemini API-sleutel (van aistudio.google.com) om lewendige foto-analise te gebruik. Sonder ’n sleutel werk die slim ingeboude toets-opwekker steeds 100%!',
    saveKey: 'Stoor Sleutel',
    capsLevels: {
      7: 'Vlak 7: Uitstaande Prestasie (80–100%)',
      6: 'Vlak 6: Meriete Prestasie (70–79%)',
      5: 'Vlak 5: Beduidende Prestasie (60–69%)',
      4: 'Vlak 4: Voldoende Prestasie (50–59%)',
      3: 'Vlak 3: Matige Prestasie (40–49%)',
      2: 'Vlak 2: Elementêre Prestasie (30–39%)',
      1: 'Vlak 1: Nie Behaal Nie (0–29%)'
    }
  },
  en: {
    appName: 'StudySmart NPO',
    tagline: 'Free AI Schoolwork Scanner & Test Generator',
    navHome: 'Subjects',
    navCreate: 'Create Test',
    navCommunity: 'NPO Hub',
    navSettings: 'AI Key',
    subjectsTitle: 'My Subject Folders',
    newSubjectPlaceholder: 'New subject name (e.g. Natural Sciences)...',
    addSubject: 'Add Folder',
    renameSubject: 'Rename',
    deleteSubject: 'Delete',
    testsCount: 'tests',
    noTestsInFolder: 'No tests in this subject folder yet.',
    createFirstTest: 'Scan Schoolwork & Create Test',
    uploadTitle: 'Upload Schoolwork Photos (Unlimited)',
    uploadSub: 'Snap photos of your textbook, class notes, or worksheets.',
    addPhotosBtn: 'Add Photos',
    loadSampleBtn: 'Load Sample Schoolwork Note',
    photosSelected: 'photo(s) uploaded',
    clearAll: 'Clear all',
    testTitleLabel: 'Test Title',
    testTitlePlaceholder: 'e.g. Grade 9 Cell Structure & Systems Test',
    selectSubjectLabel: 'Select Subject Folder',
    questionCountLabel: 'Number of Questions',
    generateBtn: 'Generate AI Test & Memo',
    generatingText: 'AI is reading your schoolwork photos and building your test...',
    digitalMode: 'Digital Test',
    printMode: 'Printable Exam & Memo',
    showMemo: 'Show Memorandum',
    hideMemo: 'Hide Memorandum',
    printBtn: 'Print / Save as PDF',
    shareBtn: 'Share to NPO Community',
    whatsappShare: 'Share Test via WhatsApp / Text',
    copied: 'Copied!',
    submitTestBtn: 'Grade My Test (AI Marker)',
    gradingText: 'AI Teacher is grading your written answers...',
    retakeBtn: 'Retake Test',
    sectionA: 'SECTION A: Multiple Choice',
    sectionB: 'SECTION B: Written Questions',
    yourAnswer: 'Write your answer here...',
    memoLabel: 'Marking Memorandum Answer:',
    aiFeedbackLabel: 'AI Teacher Feedback:',
    totalMarks: 'Total',
    studentName: 'Student Name',
    gradeLabel: 'Grade / Class',
    dateLabel: 'Date',
    timeAllocation: 'Time: 45 Minutes',
    npoTitle: 'StudySmart NPO Community Hub',
    npoSub: 'Free shared practice tests for all students. Save any community test into your folders.',
    saveToMyFolder: 'Save to My Subjects',
    savedSuccess: 'Test saved to your subject folder!',
    apiModalTitle: 'Google Gemini AI Key (Optional)',
    apiModalDesc: 'Paste your free Gemini API key (from aistudio.google.com) for live photo OCR generation. Without a key, the built-in smart test generator still works 100%!',
    saveKey: 'Save Key',
    capsLevels: {
      7: 'Level 7: Outstanding Achievement (80–100%)',
      6: 'Level 6: Meritorious Achievement (70–79%)',
      5: 'Level 5: Substantial Achievement (60–69%)',
      4: 'Level 4: Adequate Achievement (50–59%)',
      3: 'Level 3: Moderate Achievement (40–49%)',
      2: 'Level 2: Elementary Achievement (30–39%)',
      1: 'Level 1: Not Achieved (0–29%)'
    }
  }
};

// ==========================================
// INITIAL DEFAULT DATA
// ==========================================
const INITIAL_SUBJECTS = [
  { id: 'sub-1', name: 'Natuurwetenskappe / Natural Sciences', color: '#3b82f6' },
  { id: 'sub-2', name: 'Wiskunde / Mathematics', color: '#10b981' },
  { id: 'sub-3', name: 'EBW / EMS', color: '#f59e0b' },
  { id: 'sub-4', name: 'Tegnologie / Technology', color: '#8b5cf6' }
];

const INITIAL_TESTS = [
  {
    id: 'test-demo-1',
    subjectId: 'sub-1',
    title: 'Graad 9: Selle, Mitochondria & Spysvertering / Cells & Systems',
    createdAt: '2026-10-21',
    language: 'af',
    totalMarks: 15,
    bestScore: null,
    bestLevel: null,
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'Watter organel staan bekend as die "kragsentrale" van die sel omdat dit sellulêre respirasie uitvoer? / Which organelle is the powerhouse of the cell?',
        options: [
          'Selkern (Nucleus)',
          'Mitochondrion',
          'Vakuool (Vacuole)',
          'Selwand (Cell Wall)'
        ],
        correctIndex: 1,
        marks: 2,
        explanation: 'Die mitochondrion stel energie (ATP) vry uit glukose tydens sellulêre respirasie.'
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'Watter struktuur kom SLEGS in plantselle voor en NIE in dierselle nie? / Which structure is found ONLY in plant cells?',
        options: [
          'Selmembraan (Cell membrane)',
          'Sitoplasma (Cytoplasm)',
          'Chloroplaste en Selwand (Chloroplasts & Cell wall)',
          'Mitochondria'
        ],
        correctIndex: 2,
        marks: 2,
        explanation: 'Plantselle het chloroplaste vir fotosintese en ’n stewige selwand van sellulose.'
      },
      {
        id: 'q3',
        type: 'mcq',
        question: 'Wat is die hooffunksie van die selkern (nucleus)?',
        options: [
          'Beheer alle selaktiwiteite en bevat oorerflike DNS (DNA)',
          'Vervaardig sonlig vir die plant',
          'Pomp bloed deur die liggaam',
          'Verteer voedsel in die maag'
        ],
        correctIndex: 0,
        marks: 2,
        explanation: 'Die selkern bevat chromatien/DNS en beheer al die chemiese prosesse en oorerwing in die sel.'
      },
      {
        id: 'q4',
        type: 'written',
        question: 'Verduidelik twee belangrike verskille tussen ’n plantsel en ’n diersel. / Explain two key differences between a plant cell and an animal cell.',
        marks: 4,
        memoAnswer: '1. Plantselle het ’n vaste selwand en chloroplaste vir fotosintese, terwyl dierselle dit nie het nie. 2. Plantselle het ’n groot sentrale vakuool, terwyl dierselle klein of tydelike vakuole het.',
        keywords: ['selwand', 'chloroplas', 'vakuool', 'cell wall', 'chloroplast', 'vacuole', 'fotosintese']
      },
      {
        id: 'q5',
        type: 'written',
        question: 'Beskryf die proses van sellulêre respirasie en noem wat die sel gebruik en vrystel. / Describe cellular respiration and what it uses and releases.',
        marks: 5,
        memoAnswer: 'Sellulêre respirasie vind in die mitochondria plaas waar glukose en suurstof (O2) afgebreek word om energie (ATP) vry te stel, met koolstofdioksied (CO2) en water as byprodukte.',
        keywords: ['glukose', 'suurstof', 'energie', 'mitochondria', 'koolstofdioksied', 'glucose', 'oxygen', 'energy', 'atp']
      }
    ]
  }
];

const INITIAL_COMMUNITY_TESTS = [
  ...INITIAL_TESTS,
  {
    id: 'comm-2',
    subjectId: 'sub-3',
    author: 'HTS Gemeenskap / NPO',
    title: 'Graad 9 EBW: Vraag, Aanbod & Rekeningkundige Vergelyking',
    createdAt: '2026-10-20',
    language: 'af',
    totalMarks: 10,
    questions: [
      {
        id: 'cq1',
        type: 'mcq',
        question: 'Wat is die korrekte rekeningkundige vergelyking (Accounting Equation)?',
        options: [
          'Bates = Eienaarsbelang + Laste (Assets = Owner’s Equity + Liabilities)',
          'Bates = Laste - Inkomste',
          'Eienaarsbelang = Bates + Laste',
          'Laste = Bates + Uitgawes'
        ],
        correctIndex: 0,
        marks: 2,
        explanation: 'Bates (Assets) is altyd gelyk aan Eienaarsbelang (Owner’s Equity) plus Laste (Liabilities).'
      },
      {
        id: 'cq2',
        type: 'mcq',
        question: 'Volgens die wet van vraag (Law of Demand), wat gebeur as die prys van ’n produk daal?',
        options: [
          'Die hoeveelheid gevra daal',
          'Die hoeveelheid gevra styg (meer verbruikers koop dit)',
          'Die aanbod verdwyn heeltemal',
          'Verbruikers hou op koop'
        ],
        correctIndex: 1,
        marks: 2,
        explanation: 'Wanneer die prys daal, neem die hoeveelheid gevra deur verbruikers toe.'
      },
      {
        id: 'cq3',
        type: 'written',
        question: 'Verduidelik die verskil tussen ’n Bate (Asset) en ’n Las (Liability) in ’n besigheid en gee een voorbeeld van elk.',
        marks: 6,
        memoAnswer: 'Bates is besittings van waarde wat aan die besigheid behoort (bv. voertuie, toerusting, kontant). Laste is skuld wat die besigheid aan ander skuld (bv. ’n banklening of krediteure).',
        keywords: ['besit', 'waarde', 'skuld', 'lening', 'kontant', 'toerusting', 'own', 'debt', 'loan', 'cash', 'asset']
      }
    ]
  }
];

// Helper to calculate South African CAPS Level (1 - 7)
function getCapsLevel(percentage) {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
}

export default function App() {
  // Theme & Language
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState('af');
  const t = TRANSLATIONS[lang];

  // Navigation: 'home' | 'folder' | 'create' | 'test' | 'community'
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState('sub-1');
  const [activeTest, setActiveTest] = useState(null);

  // Persistent Data
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('leersmart_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [tests, setTests] = useState(() => {
    const saved = localStorage.getItem('leersmart_tests');
    return saved ? JSON.parse(saved) : INITIAL_TESTS;
  });

  const [communityTests, setCommunityTests] = useState(() => {
    const saved = localStorage.getItem('leersmart_community');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_TESTS;
  });

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('leersmart_gemini_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Subject Management State
  const [newSubjectName, setNewSubjectName] = useState('');
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [editingSubjectName, setEditingSubjectName] = useState('');

  // Photo Upload & AI Test Creation State (Unlimited Photos)
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [testTitle, setTestTitle] = useState('');
  const [createSubjectId, setCreateSubjectId] = useState('sub-1');
  const [numQuestions, setNumQuestions] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  // Active Test Taking & Grading State
  const [viewMode, setViewMode] = useState('digital'); // 'digital' | 'print'
  const [showMemoInPrint, setShowMemoInPrint] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});
  const [isGrading, setIsGrading] = useState(false);
  const [gradeReport, setGradeReport] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('leersmart_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('leersmart_tests', JSON.stringify(tests));
  }, [tests]);

  useEffect(() => {
    localStorage.setItem('leersmart_community', JSON.stringify(communityTests));
  }, [communityTests]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // ==========================================
  // SUBJECT FOLDER HANDLERS
  // ==========================================
  const handleAddSubject = () => {
    if (!newSubjectName.trim()) return;
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
    const newSub = {
      id: 'sub-' + Date.now(),
      name: newSubjectName.trim(),
      color: colors[subjects.length % colors.length]
    };
    setSubjects([...subjects, newSub]);
    setNewSubjectName('');
    setCreateSubjectId(newSub.id);
  };

  const handleRenameSubject = (id) => {
    if (!editingSubjectName.trim()) return;
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, name: editingSubjectName.trim() } : s)));
    setEditingSubjectId(null);
  };

  const handleDeleteSubject = (id) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter((s) => s.id !== id));
    setTests(tests.filter((tItem) => tItem.subjectId !== id));
  };

  // ==========================================
  // UNLIMITED PHOTO UPLOAD & SAMPLE NOTE
  // ==========================================
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPhotos((prev) => [
          ...prev,
          {
            id: 'img-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
            name: file.name,
            dataUrl: event.target.result
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleLoadSampleSchoolworkPhoto = () => {
    // Creates a clear visual sample schoolwork note on a canvas so user can test immediately
    const canvas = document.createElement('canvas');
    canvas.width = 700;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fef9c3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Lined notebook paper lines
    ctx.strokeStyle = '#93c5fd';
    ctx.lineWidth = 1;
    for (let y = 60; y < canvas.height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Red margin line
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(65, 0);
    ctx.lineTo(65, canvas.height);
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('GRAAD 9 NATUURWETENSKAPPE / NATURAL SCIENCES', 80, 50);

    ctx.font = '17px sans-serif';
    const notes = [
      'Onderwerp: Plant- en Dierselle & Sellulêre Respirasie',
      '1. Selkern (Nucleus): Bevat DNS (DNA) en beheer alle selaktiwiteite.',
      '2. Mitochondria: Die "kragsentrale" van die sel. Voer sellulêre',
      ' respirasie uit (Glukose + Suurstof -> Energie/ATP + CO2 + Water).',
      '3. Plantselle vs Dierselle:',
      ' - Plantselle het ’n vaste Selwand (Cell Wall) en Chloroplaste.',
      ' - Chloroplaste bevat chlorofil vir Fotosintese.',
      ' - Plantselle het een groot sentrale vakuool.',
      '4. Spysverteringstelsel breek voedsel af in oplosbare voedingstowwe.'
    ];

    notes.forEach((line, index) => {
      ctx.fillText(line, 80, 92 + index * 32);
    });

    const dataUrl = canvas.toDataURL('image/png');
    setUploadedPhotos((prev) => [
      ...prev,
      {
        id: 'sample-' + Date.now(),
        name: 'Graad9_Skoolwerk_Nota.png',
        dataUrl
      }
    ]);
    if (!testTitle) {
      setTestTitle(
        lang === 'af'
          ? 'Graad 9 Natuurwetenskappe: Selle & Respirasie'
          : 'Grade 9 Natural Sciences: Cells & Respiration'
      );
    }
  };

  // ==========================================
  // AI TEST GENERATION (GEMINI VISION + FALLBACK)
  // ==========================================
  const handleGenerateTest = async () => {
    if (uploadedPhotos.length === 0) {
      handleLoadSampleSchoolworkPhoto();
    }

    setIsGenerating(true);
    const chosenTitle =
      testTitle.trim() ||
      (lang === 'af' ? `Skoolwerk Toets (${new Date().toLocaleDateString()})` : `Schoolwork Test (${new Date().toLocaleDateString()})`);

    try {
      if (apiKey.trim()) {
        // Live Gemini API call with all uploaded photos
        const imageParts = uploadedPhotos.map((photo) => {
          const base64Data = photo.dataUrl.split(',')[1];
          const mimeType = photo.dataUrl.substring(photo.dataUrl.indexOf(':') + 1, photo.dataUrl.indexOf(';'));
          return {
            inlineData: {
              mimeType: mimeType || 'image/png',
              data: base64Data
            }
          };
        });

        const promptText = `You are a South African high school teacher (CAPS curriculum).
Read all the schoolwork photos provided and create a test in ${lang === 'af' ? 'Afrikaans' : 'English'} with ${numQuestions} questions (mix of 'mcq' and 'written').
Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "id": "q1",
      "type": "mcq",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "marks": 2,
      "explanation": "..."
    },
    {
      "id": "q2",
      "type": "written",
      "question": "...",
      "marks": 4,
      "memoAnswer": "...",
      "keywords": ["keyword1", "keyword2", "keyword3"]
    }
  ]
}`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }, ...imageParts] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          if (parsed.questions && parsed.questions.length > 0) {
            const totalMarks = parsed.questions.reduce((sum, q) => sum + (Number(q.marks) || 2), 0);
            const newTest = {
              id: 'test-' + Date.now(),
              subjectId: createSubjectId,
              title: chosenTitle,
              createdAt: new Date().toISOString().slice(0, 10),
              language: lang,
              totalMarks,
              questions: parsed.questions
            };
            setTests([newTest, ...tests]);
            openTest(newTest);
            setIsGenerating(false);
            return;
          }
        }
      }

      // Built-in Smart Fallback Generator (works 100% offline/without API key)
      await new Promise((r) => setTimeout(r, 1400));
      const fallbackQuestions =
        lang === 'af'
          ? [
              {
                id: 'q1',
                type: 'mcq',
                question: 'Watter sel-organel is verantwoordelik vir sellulêre respirasie en energie-vrystelling (ATP)?',
                options: ['Selkern (Nucleus)', 'Mitochondrion', 'Ribosoom', 'Selwand'],
                correctIndex: 1,
                marks: 2,
                explanation: 'Die mitochondrion breek glukose en suurstof af om energie (ATP) vry te stel.'
              },
              {
                id: 'q2',
                type: 'mcq',
                question: 'Watter twee strukture kom in plantselle voor, maar NIE in dierselle nie?',
                options: [
                  'Sitoplasma en Selkern',
                  'Selwand en Chloroplaste',
                  'Mitochondria en Selmembraan',
                  'Ribosome en Vakuole'
                ],
                correctIndex: 1,
                marks: 2,
                explanation: 'Slegs plantselle het ’n sellulose selwand en chloroplaste vir fotosintese.'
              },
              {
                id: 'q3',
                type: 'mcq',
                question: 'Wat bevat die selkern (nucleus) wat oorerflike eienskappe bepaal?',
                options: ['Chlorofil', 'DNS (DNA) / Chromatien', 'Stysel', 'Sellulose'],
                correctIndex: 1,
                marks: 2,
                explanation: 'Die selkern huisves DNS (DNA) wat die genetiese kode van die organisme bevat.'
              },
              {
                id: 'q4',
                type: 'written',
                question: 'Verduidelik die funksie van chloroplaste in ’n plantsel en noem die proses wat daarin plaasvind.',
                marks: 4,
                memoAnswer:
                  'Chloroplaste bevat groen chlorofil wat sonlig absorbeer om fotosintese uit te voer, waartydens die plant glukose (voedsel) en suurstof vervaardig.',
                keywords: ['chlorofil', 'sonlig', 'fotosintese', 'glukose', 'suurstof', 'voedsel']
              },
              {
                id: 'q5',
                type: 'written',
                question: 'Onderskei tussen die vakuole van ’n plantsel en ’n diersel, en verduidelik die doel van sellulêre respirasie.',
                marks: 5,
                memoAnswer:
                  'Plantselle het een groot sentrale vakuool wat vorm en turgordruk gee, terwyl dierselle klein vakuole het. Sellulêre respirasie gebruik glukose en suurstof in die mitochondria om energie vry te stel.',
                keywords: ['groot', 'vakuool', 'klein', 'glukose', 'suurstof', 'energie', 'mitochondria']
              }
            ]
          : [
              {
                id: 'q1',
                type: 'mcq',
                question: 'Which cell organelle is known as the powerhouse of the cell because it carries out cellular respiration?',
                options: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Cell Wall'],
                correctIndex: 1,
                marks: 2,
                explanation: 'The mitochondrion breaks down glucose and oxygen to release energy (ATP).'
              },
              {
                id: 'q2',
                type: 'mcq',
                question: 'Which two structures are present in plant cells but NOT in animal cells?',
                options: [
                  'Cytoplasm and Nucleus',
                  'Cell Wall and Chloroplasts',
                  'Mitochondria and Cell Membrane',
                  'Ribosomes and Vacuoles'
                ],
                correctIndex: 1,
                marks: 2,
                explanation: 'Only plant cells have a rigid cellulose cell wall and chloroplasts for photosynthesis.'
              },
              {
                id: 'q3',
                type: 'mcq',
                question: 'What hereditary material is stored inside the nucleus of a cell?',
                options: ['Chlorophyll', 'DNA / Chromatin', 'Starch', 'Cellulose'],
                correctIndex: 1,
                marks: 2,
                explanation: 'The nucleus contains DNA which directs cell activities and hereditary traits.'
              },
              {
                id: 'q4',
                type: 'written',
                question: 'Explain the main function of chloroplasts in a plant cell and name the process that takes place inside them.',
                marks: 4,
                memoAnswer:
                  'Chloroplasts contain chlorophyll which absorbs sunlight to perform photosynthesis, producing glucose and oxygen for the plant.',
                keywords: ['chlorophyll', 'sunlight', 'photosynthesis', 'glucose', 'oxygen', 'food']
              },
              {
                id: 'q5',
                type: 'written',
                question: 'Compare the vacuoles of plant and animal cells, and state the inputs and outputs of cellular respiration.',
                marks: 5,
                memoAnswer:
                  'Plant cells have a large central vacuole for support, while animal cells have small vacuoles. Cellular respiration uses glucose and oxygen in the mitochondria to release energy (ATP), carbon dioxide, and water.',
                keywords: ['large', 'vacuole', 'small', 'glucose', 'oxygen', 'energy', 'mitochondria']
              }
            ];

      const selectedQs = fallbackQuestions.slice(0, numQuestions);
      const totalMarks = selectedQs.reduce((sum, q) => sum + q.marks, 0);

      const newTest = {
        id: 'test-' + Date.now(),
        subjectId: createSubjectId,
        title: chosenTitle,
        createdAt: new Date().toISOString().slice(0, 10),
        language: lang,
        totalMarks,
        questions: selectedQs
      };

      setTests([newTest, ...tests]);
      openTest(newTest);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const openTest = (testObj) => {
    setActiveTest(testObj);
    setUserAnswers({});
    setGradeReport(null);
    setViewMode('digital');
    setActiveTab('test');
  };

  // ==========================================
  // SMART CAPS GRADING SYSTEM (LEVEL 1 - 7)
  // ==========================================
  const handleGradeTest = async () => {
    if (!activeTest) return;
    setIsGrading(true);

    await new Promise((r) => setTimeout(r, 700));

    let earnedMarks = 0;
    const questionResults = {};

    for (const q of activeTest.questions) {
      const ans = userAnswers[q.id];

      if (q.type === 'mcq') {
        const isCorrect = Number(ans) === Number(q.correctIndex);
        const awarded = isCorrect ? q.marks : 0;
        earnedMarks += awarded;
        questionResults[q.id] = {
          awarded,
          maxMarks: q.marks,
          isCorrect,
          feedback: isCorrect
            ? lang === 'af'
              ? 'Korrek! Volpunte.'
              : 'Correct! Full marks.'
            : q.explanation
        };
      } else {
        // Written answer smart rubric evaluation
        const textAns = (ans || '').trim().toLowerCase();
        if (!textAns) {
          questionResults[q.id] = {
            awarded: 0,
            maxMarks: q.marks,
            isCorrect: false,
            feedback: lang === 'af' ? 'Geen antwoord ingevul nie.' : 'No answer provided.'
          };
        } else {
          const keywords = q.keywords || [];
          const matched = keywords.filter((kw) => textAns.includes(kw.toLowerCase()));
          const wordCount = textAns.split(/\s+/).length;

          let ratio = keywords.length > 0 ? matched.length / Math.min(keywords.length, 4) : 0.5;
          if (wordCount >= 12 && ratio < 0.5) ratio += 0.25;
          ratio = Math.min(1, ratio);

          const awarded = Math.max(1, Math.round(q.marks * ratio));
          earnedMarks += awarded;

          questionResults[q.id] = {
            awarded,
            maxMarks: q.marks,
            isCorrect: awarded >= q.marks * 0.75,
            feedback:
              awarded === q.marks
                ? lang === 'af'
                  ? 'Uitstekende antwoord! Alle sleutelkonsepte van die memorandum is genoem.'
                  : 'Excellent answer! All key memorandum concepts were covered.'
                : lang === 'af'
                ? `Goeie poging (${awarded}/${q.marks}). Vergelyk jou antwoord met die memorandum hieronder vir volpunte.`
                : `Good effort (${awarded}/${q.marks}). Compare your answer with the memorandum below for full marks.`
          };
        }
      }
    }

    const percentage = Math.round((earnedMarks / activeTest.totalMarks) * 100);
    const capsLevel = getCapsLevel(percentage);

    const report = {
      earnedMarks,
      totalMarks: activeTest.totalMarks,
      percentage,
      capsLevel,
      questionResults
    };

    setGradeReport(report);

    // Save best score to test inside subject folder
    setTests((prev) =>
      prev.map((item) =>
        item.id === activeTest.id
          ? {
              ...item,
              bestScore: item.bestScore !== null ? Math.max(item.bestScore, percentage) : percentage,
              bestLevel: capsLevel
            }
          : item
      )
    );

    setIsGrading(false);
  };

  // ==========================================
  // NPO SHARING & WHATSAPP EXPORT
  // ==========================================
  const handleShareToCommunity = (testObj) => {
    if (!communityTests.some((c) => c.id === testObj.id)) {
      setCommunityTests([{ ...testObj, author: 'LeerSmart NPO Leerder' }, ...communityTests]);
    }
    showToast(lang === 'af' ? 'Gedeel op die NPO Gemeenskap Hub!' : 'Shared to the NPO Community Hub!');
  };

  const handleCopyShareText = (testObj) => {
    const lines = [
      `📘 *${testObj.title}* (${t.appName})`,
      `${t.totalMarks}: ${testObj.totalMarks}`,
      ''
    ];
    testObj.questions.forEach((q, idx) => {
      lines.push(`${idx + 1}. ${q.question} (${q.marks})`);
      if (q.type === 'mcq' && q.options) {
        q.options.forEach((opt, oIdx) => {
          lines.push(` ${String.fromCharCode(65 + oIdx)}) ${opt}`);
        });
      }
      lines.push('');
    });
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedId(testObj.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSaveCommunityTest = (commTest) => {
    const cloned = {
      ...commTest,
      id: 'test-saved-' + Date.now(),
      subjectId: selectedSubjectId || subjects[0].id
    };
    setTests([cloned, ...tests]);
    showToast(t.savedSuccess);
  };

  // ==========================================
  // RENDER UI (SAMSUNG ONE UI ANDROID STYLE)
  // ==========================================
  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-black text-zinc-100' : 'bg-slate-100 text-slate-900'}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* Top App Bar (Hidden when printing formal test paper) */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b px-4 py-3 print:hidden ${darkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg leading-tight tracking-tight flex items-center gap-1.5">
                {t.appName}
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                  CAPS
                </span>
              </h1>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{t.tagline}</p>
            </div>
          </div>

          {/* Language (AF / EN), API Key & Dark/Light Mode Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'af' ? 'en' : 'af')}
              className={`px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 border transition ${
                darkMode
                  ? 'bg-zinc-900 border-zinc-700 text-blue-400 hover:bg-zinc-800'
                  : 'bg-slate-100 border-slate-300 text-blue-700 hover:bg-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'af' ? 'AF' : 'EN'}
            </button>

            <button
              onClick={() => setShowKeyModal(true)}
              className={`p-2 rounded-2xl border transition ${
                darkMode ? 'bg-zinc-900 border-zinc-700 text-amber-400' : 'bg-slate-100 border-slate-300 text-amber-600'
              }`}
              title="Gemini API Key"
            >
              <Key className="w-4 h-4" />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-2xl border transition ${
                darkMode ? 'bg-zinc-900 border-zinc-700 text-yellow-400' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-2xl mx-auto px-4 pt-5 pb-28 print:p-0 print:max-w-none">
        {/* ========================================== */}
        {/* TAB 1: SUBJECT FOLDERS (HOME) */}
        {/* ========================================== */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Samsung One UI Hero Banner */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                    {lang === 'af' ? '100% Gratis NPO Projek' : '100% Free NPO Project'}
                  </span>
                  <h2 className="text-2xl font-extrabold">
                    {lang === 'af' ? 'Skandeer Notas. Slaag Jou Eksamen.' : 'Scan Notes. Ace Your Exams.'}
                  </h2>
                  <p className="text-sm text-blue-100 max-w-md">
                    {lang === 'af'
                      ? 'Laai onbeperkte foto’s van jou skoolboeke op en laat KI ’n volledige vraestel en memorandum uitwerk.'
                      : 'Upload unlimited photos of your schoolbooks and let AI generate a full test and marking memo.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('create')}
                className="mt-4 w-full py-3 px-4 rounded-2xl bg-white text-blue-700 font-bold text-sm flex items-center justify-center gap-2 shadow hover:bg-blue-50 transition"
              >
                <Camera className="w-4 h-4" />
                {t.createFirstTest}
              </button>
            </div>

            {/* Create New Subject Folder Bar */}
            <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-blue-500" />
                {t.subjectsTitle}
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                  placeholder={t.newSubjectPlaceholder}
                  className={`flex-1 px-4 py-2.5 rounded-2xl text-sm border outline-none ${
                    darkMode
                      ? 'bg-zinc-950 border-zinc-700 text-white placeholder-zinc-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  onClick={handleAddSubject}
                  className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  {t.addSubject}
                </button>
              </div>
            </div>

            {/* Subject Folder Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {subjects.map((sub) => {
                const subTests = tests.filter((item) => item.subjectId === sub.id);
                const isEditing = editingSubjectId === sub.id;

                return (
                  <div
                    key={sub.id}
                    className={`p-5 rounded-3xl border transition flex flex-col justify-between ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                        : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div
                          onClick={() => {
                            if (!isEditing) {
                              setSelectedSubjectId(sub.id);
                              setActiveTab('folder');
                            }
                          }}
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow"
                            style={{ backgroundColor: sub.color }}
                          >
                            <Folder className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {isEditing ? (
                              <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="text"
                                  value={editingSubjectName}
                                  onChange={(e) => setEditingSubjectName(e.target.value)}
                                  className={`w-full px-2.5 py-1 rounded-xl text-sm border ${
                                    darkMode ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-slate-50 border-slate-300'
                                  }`}
                                />
                                <button
                                  onClick={() => handleRenameSubject(sub.id)}
                                  className="px-2.5 py-1 bg-blue-600 text-white rounded-xl text-xs font-bold"
                                >
                                  OK
                                </button>
                              </div>
                            ) : (
                              <>
                                <h4 className="font-bold text-base truncate">{sub.name}</h4>
                                <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                                  {subTests.length} {t.testsCount}
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Rename & Delete Folder Actions */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingSubjectId(sub.id);
                              setEditingSubjectName(sub.name);
                            }}
                            className={`p-1.5 rounded-xl ${darkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-slate-100 text-slate-500'}`}
                            title={t.renameSubject}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {subjects.length > 1 && (
                            <button
                              onClick={() => handleDeleteSubject(sub.id)}
                              className={`p-1.5 rounded-xl ${darkMode ? 'hover:bg-zinc-800 text-red-400' : 'hover:bg-slate-100 text-red-500'}`}
                              title={t.deleteSubject}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSubjectId(sub.id);
                        setActiveTab('folder');
                      }}
                      className={`mt-4 w-full py-2 rounded-2xl text-xs font-bold transition ${
                        darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {lang === 'af' ? 'Maak Vakvouer Oop →' : 'Open Subject Folder →'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* SUBJECT FOLDER VIEW */}
        {/* ========================================== */}
        {activeTab === 'folder' && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveTab('home')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-500 hover:underline"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.subjectsTitle}
            </button>

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold">
                {subjects.find((s) => s.id === selectedSubjectId)?.name}
              </h2>
              <button
                onClick={() => {
                  setCreateSubjectId(selectedSubjectId);
                  setActiveTab('create');
                }}
                className="px-3.5 py-2 rounded-2xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                {t.navCreate}
              </button>
            </div>

            {tests.filter((item) => item.subjectId === selectedSubjectId).length === 0 ? (
              <div className={`p-8 rounded-3xl border text-center space-y-3 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                <FileText className="w-10 h-10 mx-auto text-blue-500 opacity-75" />
                <p className="text-sm font-medium">{t.noTestsInFolder}</p>
                <button
                  onClick={() => {
                    setCreateSubjectId(selectedSubjectId);
                    setActiveTab('create');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-blue-600 text-white text-xs font-bold"
                >
                  {t.createFirstTest}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {tests
                  .filter((item) => item.subjectId === selectedSubjectId)
                  .map((testItem) => (
                    <div
                      key={testItem.id}
                      onClick={() => openTest(testItem)}
                      className={`p-5 rounded-3xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                        darkMode
                          ? 'bg-zinc-900 border-zinc-800 hover:border-blue-500'
                          : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
                      }`}
                    >
                      <div className="space-y-1">
                        <h3 className="font-bold text-base">{testItem.title}</h3>
                        <div className={`flex flex-wrap items-center gap-3 text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                          <span>{testItem.questions.length} vrae / questions</span>
                          <span>•</span>
                          <span>
                            {t.totalMarks}: {testItem.totalMarks}
                          </span>
                          {testItem.bestScore !== null && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                              Beste: {testItem.bestScore}% (Vlak {testItem.bestLevel})
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="px-3.5 py-2 rounded-2xl bg-blue-600 text-white text-xs font-bold shrink-0">
                        {lang === 'af' ? 'Begin' : 'Open'}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: CREATE TEST (UNLIMITED PHOTOS) */}
        {/* ========================================== */}
        {activeTab === 'create' && (
          <div className="space-y-5">
            <div className={`p-5 rounded-3xl border space-y-4 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div>
                <h2 className="text-lg font-extrabold flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-500" />
                  {t.uploadTitle}
                </h2>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {t.uploadSub}
                </p>
              </div>

              {/* Hidden Multiple File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />

              {/* Upload & Sample Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3.5 px-4 rounded-2xl border-2 border-dashed border-blue-500/60 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold text-sm flex items-center justify-center gap-2 transition"
                >
                  <Upload className="w-4 h-4" />
                  {t.addPhotosBtn}
                </button>

                <button
                  onClick={handleLoadSampleSchoolworkPhoto}
                  className={`py-3.5 px-4 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 transition ${
                    darkMode
                      ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-amber-400'
                      : 'bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {t.loadSampleBtn}
                </button>
              </div>

              {/* Unlimited Photo Preview Grid */}
              {uploadedPhotos.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-400">
                      ✓ {uploadedPhotos.length} {t.photosSelected}
                    </span>
                    <button
                      onClick={() => setUploadedPhotos([])}
                      className="text-red-400 hover:underline"
                    >
                      {t.clearAll}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {uploadedPhotos.map((photo, index) => (
                      <div key={photo.id} className="relative group rounded-2xl overflow-hidden border border-zinc-700 aspect-square bg-zinc-950">
                        <img
                          src={photo.dataUrl}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-md">
                          #{index + 1}
                        </span>
                        <button
                          onClick={() => setUploadedPhotos(uploadedPhotos.filter((p) => p.id !== photo.id))}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Test Configuration */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold mb-1">{t.testTitleLabel}</label>
                  <input
                    type="text"
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    placeholder={t.testTitlePlaceholder}
                    className={`w-full px-4 py-2.5 rounded-2xl text-sm border outline-none ${
                      darkMode ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">{t.selectSubjectLabel}</label>
                    <select
                      value={createSubjectId}
                      onChange={(e) => setCreateSubjectId(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-2xl text-sm border outline-none ${
                        darkMode ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-slate-50 border-slate-300'
                      }`}
                    >
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      {t.questionCountLabel}: {numQuestions}
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="5"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(Number(e.target.value))}
                      className="w-full accent-blue-600 mt-2"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerateTest}
                disabled={isGenerating}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {isGenerating ? t.generatingText : t.generateBtn}
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* ACTIVE TEST (DIGITAL & PRINTABLE PAPER) */}
        {/* ========================================== */}
        {activeTab === 'test' && activeTest && (
          <div className="space-y-5">
            {/* Top Mode Controls (Hidden on paper print) */}
            <div className="flex flex-wrap items-center justify-between gap-2 print:hidden">
              <button
                onClick={() => setActiveTab('folder')}
                className="inline-flex items-center gap-1 text-sm font-bold text-blue-500"
              >
                <ChevronLeft className="w-4 h-4" />
                {lang === 'af' ? 'Terug na Vak' : 'Back to Subject'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode(viewMode === 'digital' ? 'print' : 'digital')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 border ${
                    darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  <Printer className="w-4 h-4 text-blue-500" />
                  {viewMode === 'digital' ? t.printMode : t.digitalMode}
                </button>

                <button
                  onClick={() => handleShareToCommunity(activeTest)}
                  className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {t.shareBtn}
                </button>
              </div>
            </div>

            {/* ========================================== */}
            {/* MODE A: INTERACTIVE DIGITAL TEST */}
            {/* ========================================== */}
            {viewMode === 'digital' && (
              <div className="space-y-4">
                <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                  <h2 className="text-xl font-extrabold">{activeTest.title}</h2>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    {t.totalMarks}: {activeTest.totalMarks} • CAPS Level 1–7 Smart Grading
                  </p>
                </div>

                {/* Grade Report Banner */}
                {gradeReport && (
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                        CAPS Uitslag / Result
                      </span>
                      <Award className="w-7 h-7 text-yellow-300" />
                    </div>
                    <div className="text-3xl font-black">
                      {gradeReport.earnedMarks} / {gradeReport.totalMarks} ({gradeReport.percentage}%)
                    </div>
                    <p className="text-sm font-bold text-emerald-100">
                      {t.capsLevels[gradeReport.capsLevel]}
                    </p>
                    <button
                      onClick={() => {
                        setGradeReport(null);
                        setUserAnswers({});
                      }}
                      className="mt-2 px-4 py-2 rounded-xl bg-white text-emerald-800 text-xs font-extrabold"
                    >
                      {t.retakeBtn}
                    </button>
                  </div>
                )}

                {/* Questions List */}
                {activeTest.questions.map((q, index) => {
                  const qResult = gradeReport?.questionResults?.[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-3xl border space-y-3 ${
                        darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-sm sm:text-base">
                          {index + 1}. {q.question}
                        </h3>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                          {q.marks} {lang === 'af' ? 'punte' : 'marks'}
                        </span>
                      </div>

                      {q.type === 'mcq' ? (
                        <div className="space-y-2">
                          {q.options.map((opt, oIndex) => {
                            const selected = userAnswers[q.id] === oIndex;
                            return (
                              <button
                                key={oIndex}
                                onClick={() =>
                                  !gradeReport && setUserAnswers({ ...userAnswers, [q.id]: oIndex })
                                }
                                className={`w-full text-left px-4 py-3 rounded-2xl text-sm border transition flex items-center justify-between ${
                                  selected
                                    ? 'border-blue-500 bg-blue-500/15 font-bold'
                                    : darkMode
                                    ? 'border-zinc-800 bg-zinc-950 hover:bg-zinc-800'
                                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                                }`}
                              >
                                <span>
                                  {String.fromCharCode(65 + oIndex)}. {opt}
                                </span>
                                {gradeReport && Number(q.correctIndex) === oIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <textarea
                          rows={3}
                          disabled={!!gradeReport}
                          value={userAnswers[q.id] || ''}
                          onChange={(e) => setUserAnswers({ ...userAnswers, [q.id]: e.target.value })}
                          placeholder={t.yourAnswer}
                          className={`w-full p-3.5 rounded-2xl text-sm border outline-none ${
                            darkMode
                              ? 'bg-zinc-950 border-zinc-700 text-white placeholder-zinc-500'
                              : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      )}

                      {/* Feedback & Memorandum after submitting */}
                      {qResult && (
                        <div
                          className={`p-3.5 rounded-2xl text-xs space-y-1.5 border ${
                            qResult.isCorrect
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          }`}
                        >
                          <div className="font-extrabold flex items-center justify-between">
                            <span>{t.aiFeedbackLabel}</span>
                            <span>
                              {qResult.awarded} / {qResult.maxMarks}
                            </span>
                          </div>
                          <p>{qResult.feedback}</p>
                          {q.memoAnswer && (
                            <p className="pt-1 text-zinc-300">
                              <strong>{t.memoLabel}</strong> {q.memoAnswer}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {!gradeReport && (
                  <button
                    onClick={handleGradeTest}
                    disabled={isGrading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg"
                  >
                    {isGrading ? t.gradingText : t.submitTestBtn}
                  </button>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* MODE B: PRINTABLE FORMAL SCHOOL EXAM PAPER */}
            {/* ========================================== */}
            {viewMode === 'print' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-2xl bg-blue-600 text-white text-xs font-bold flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    {t.printBtn}
                  </button>
                  <button
                    onClick={() => setShowMemoInPrint(!showMemoInPrint)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold border ${
                      darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-300'
                    }`}
                  >
                    {showMemoInPrint ? t.hideMemo : t.showMemo}
                  </button>
                </div>

                {/* Printable White Exam Sheet */}
                <div className="bg-white text-black p-8 rounded-3xl shadow-md border border-slate-300 print:shadow-none print:border-none space-y-6">
                  <div className="border-b-2 border-black pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                          {t.appName} • Formele Assessering / Formal Assessment
                        </p>
                        <h1 className="text-2xl font-black mt-1">{activeTest.title}</h1>
                      </div>
                      <div className="text-right text-sm font-bold border-2 border-black px-3 py-1.5">
                        {t.totalMarks}: {activeTest.totalMarks}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 text-xs font-semibold">
                      <div>{t.studentName}: ______________________</div>
                      <div>{t.gradeLabel}: ____________</div>
                      <div>{t.timeAllocation}</div>
                    </div>
                  </div>

                  {/* Exam Questions */}
                  <div className="space-y-5">
                    {activeTest.questions.map((q, idx) => (
                      <div key={q.id} className="space-y-2">
                        <div className="flex justify-between font-bold text-sm">
                          <span>
                            {idx + 1}. {q.question}
                          </span>
                          <span>[{q.marks}]</span>
                        </div>
                        {q.type === 'mcq' ? (
                          <div className="grid grid-cols-2 gap-1.5 pl-4 text-sm">
                            {q.options.map((opt, oIdx) => (
                              <div key={oIdx}>
                                ◯ {String.fromCharCode(65 + oIdx)}) {opt}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3 pl-4 pt-2">
                            <div className="border-b border-dotted border-slate-400 h-5" />
                            <div className="border-b border-dotted border-slate-400 h-5" />
                            <div className="border-b border-dotted border-slate-400 h-5" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Formal Marking Memorandum */}
                  {showMemoInPrint && (
                    <div className="pt-6 mt-8 border-t-2 border-dashed border-black space-y-3">
                      <h2 className="text-lg font-black uppercase">
                        Nasienmemorandum / Marking Memorandum
                      </h2>
                      {activeTest.questions.map((q, idx) => (
                        <div key={q.id} className="text-xs space-y-0.5">
                          <p className="font-bold">
                            {idx + 1}. ({q.marks} punte/marks):{' '}
                            {q.type === 'mcq'
                              ? `${String.fromCharCode(65 + q.correctIndex)} - ${q.options[q.correctIndex]}`
                              : q.memoAnswer}
                          </p>
                          {q.explanation && <p className="text-slate-600">{q.explanation}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: NPO COMMUNITY HUB */}
        {/* ========================================== */}
        {activeTab === 'community' && (
          <div className="space-y-4">
            <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                {t.npoTitle}
              </h2>
              <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                {t.npoSub}
              </p>
            </div>

            {communityTests.map((comm) => (
              <div
                key={comm.id}
                className={`p-5 rounded-3xl border space-y-3 ${
                  darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base">{comm.title}</h3>
                    <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                      {comm.questions.length} vrae • {t.totalMarks}: {comm.totalMarks}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => openTest(comm)}
                    className="px-3.5 py-2 rounded-2xl bg-blue-600 text-white text-xs font-bold"
                  >
                    {lang === 'af' ? 'Oefen Nou' : 'Practice Now'}
                  </button>

                  <button
                    onClick={() => handleSaveCommunityTest(comm)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold border flex items-center gap-1.5 ${
                      darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-slate-100 border-slate-300'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t.saveToMyFolder}
                  </button>

                  <button
                    onClick={() => handleCopyShareText(comm)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold border flex items-center gap-1.5 ${
                      darkMode ? 'bg-zinc-800 border-zinc-700 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {copiedId === comm.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === comm.id ? t.copied : t.whatsappShare}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ========================================== */}
      {/* OPTIONAL GEMINI API KEY MODAL */}
      {/* ========================================== */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              {t.apiModalTitle}
            </h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
              {t.apiModalDesc}
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className={`w-full px-4 py-2.5 rounded-2xl text-sm border outline-none ${
                darkMode ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-slate-50 border-slate-300'
              }`}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.setItem('leersmart_gemini_key', apiKey.trim());
                  setShowKeyModal(false);
                  showToast('API Sleutel gestoor / Key saved!');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                {t.saveKey}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* SAMSUNG ONE UI BOTTOM NAVIGATION BAR */}
      {/* ========================================== */}
      <nav
        className={`fixed bottom-0 inset-x-0 z-30 border-t backdrop-blur-md print:hidden ${
          darkMode ? 'bg-zinc-950/95 border-zinc-800' : 'bg-white/95 border-slate-200'
        }`}
      >
        <div className="max-w-md mx-auto grid grid-cols-3 py-2 px-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-1.5 rounded-2xl transition ${
              activeTab === 'home' || activeTab === 'folder' ? 'text-blue-500 font-bold' : 'text-zinc-400'
            }`}
          >
            <Folder className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">{t.navHome}</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`flex flex-col items-center py-1.5 rounded-2xl transition ${
              activeTab === 'create' ? 'text-blue-500 font-bold' : 'text-zinc-400'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">{t.navCreate}</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`flex flex-col items-center py-1.5 rounded-2xl transition ${
              activeTab === 'community' ? 'text-blue-500 font-bold' : 'text-zinc-400'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">{t.navCommunity}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

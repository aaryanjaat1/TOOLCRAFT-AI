import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Mail, Linkedin, Sun, Moon, Search, ChevronDown, ChevronRight, Check, Activity, Calculator, Calendar, Percent, Tag, ArrowRightLeft, QrCode, Lock, Loader2, Circle, Dices, Sparkles, Heart, AlignLeft, Type, Code2, Globe, Zap, Database, Smartphone, ListTodo, Wallet, Flame, Youtube, Music, TrendingUp, Hash, UserCheck, Image, Clock, BarChart2, GraduationCap, UserX, AlertTriangle, Briefcase, Keyboard, Coffee, ArrowUpRight, DollarSign, Shield } from 'lucide-react';
import { NeonButton, CursorGlow, BackToTop, AnimatedSection } from './components/UiKit';
import { Hero3D } from './components/Hero3D';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  BMICalculator, EMICalculator, AgeCalculator, GSTCalculator, QRGenerator, PasswordGenerator,
  SpinWheel, CoinToss, DiceRoller, LuckyNumber, LoveCalculator,
  TextStatistics, TextUtility, DevConverter, SeoPreview,
  DomainTool, WebAnalyzer, DummyDataGen, DeviceInfo,
  TodoTracker, BudgetTracker, HabitTracker,
  UnitConverter, PercentageCalculator, BasicCalculator, DiscountCalculator,
  YouTubeTitleGen, ReelHooksGen, ViralityScore, HashtagReach, BioAudit, ThumbnailAnalyzer, PostTimeOptimizer, EngagementRate,
  ExamRankPredictor, AttendanceCalc, ProjectRisk, InternshipScore, TypingRank, SalaryHike, OfficeScore
} from './components/Calculators';

// --- Tool Data & Categorization ---
const toolsList = [
  // Health & Finance
  { id: 'bmi', component: <BMICalculator />, icon: <Activity />, name: 'BMI Calculator', description: 'Calculate Body Mass Index and check health category.', tags: 'health weight mass index' },
  { id: 'emi', component: <EMICalculator />, icon: <Calculator />, name: 'EMI Calculator', description: 'Calculate monthly loan payments and total interest.', tags: 'finance loan interest bank' },
  { id: 'age', component: <AgeCalculator />, icon: <Calendar />, name: 'Age Calculator', description: 'Calculate your exact age in years, months, and days.', tags: 'date birthday years' },
  { id: 'gst', component: <GSTCalculator />, icon: <Percent />, name: 'GST Calculator', description: 'Calculate Goods and Services Tax amounts easily.', tags: 'tax finance money' },
  { id: 'discount', component: <DiscountCalculator />, icon: <Tag />, name: 'Discount Calculator', description: 'Find final price after discount and tax.', tags: 'finance sale price off' },
  
  // Math & Units
  { id: 'basic-calc', component: <BasicCalculator />, icon: <Calculator />, name: 'Basic Calculator', description: 'Standard calculator for quick arithmetic.', tags: 'math add subtract multiply' },
  { id: 'unit-conv', component: <UnitConverter />, icon: <ArrowRightLeft />, name: 'Unit Converter', description: 'Convert length, weight, and temperature units.', tags: 'length weight temp measure' },
  { id: 'percent', component: <PercentageCalculator />, icon: <Percent />, name: 'Percentage Calc', description: 'Calculate percentages, changes, and fractions.', tags: 'math percent change' },
  
  // Utilities
  { id: 'qr', component: <QRGenerator />, icon: <QrCode />, name: 'QR Code Generator', description: 'Generate custom QR codes for links or text.', tags: 'link scan barcode' },
  { id: 'password', component: <PasswordGenerator />, icon: <Lock />, name: 'Strong Password', description: 'Generate secure, random passwords instantly.', tags: 'security crypto privacy' },
  
  // Fun
  { id: 'spin', component: <SpinWheel />, icon: <Loader2 className="animate-spin" />, name: 'Spin the Wheel', description: 'Spin a virtual wheel to pick a random prize.', tags: 'game random prize luck' },
  { id: 'coin', component: <CoinToss />, icon: <Circle />, name: 'Coin Toss', description: 'Flip a 3D virtual coin for heads or tails.', tags: 'heads tails random decision' },
  { id: 'dice', component: <DiceRoller />, icon: <Dices />, name: 'Dice Roller', description: 'Roll 3D dice with custom side counts.', tags: 'game number random' },
  { id: 'lucky', component: <LuckyNumber />, icon: <Sparkles />, name: 'Lucky Number', description: 'Generate your lucky number for the day.', tags: 'rng random generator' },
  { id: 'love', component: <LoveCalculator />, icon: <Heart />, name: 'Love Calculator', description: 'Check relationship compatibility score.', tags: 'fun relationship percentage' },
  
  // Text & Productivity
  { id: 'text-stats', component: <TextStatistics />, icon: <AlignLeft />, name: 'Text Statistics', description: 'Count words, characters, and reading time.', tags: 'word count char count reading time' },
  { id: 'text-util', component: <TextUtility />, icon: <Type />, name: 'Text Utility', description: 'Clean, format, trim, and manipulate text.', tags: 'clean format case trim duplicate' },
  { id: 'dev-convert', component: <DevConverter />, icon: <Code2 />, name: 'Dev Converter', description: 'Format JSON, Base64, and URL encoding.', tags: 'json base64 url encode decode minify' },
  { id: 'seo-preview', component: <SeoPreview />, icon: <Search />, name: 'SEO Preview', description: 'Preview Google search result snippets.', tags: 'google serp meta title description' },

  // Web & Niche
  { id: 'domain', component: <DomainTool />, icon: <Globe />, name: 'Domain Generator', description: 'Generate creative domain name ideas.', tags: 'name web url available' },
  { id: 'web-perf', component: <WebAnalyzer />, icon: <Zap />, name: 'Speed Analyzer', description: 'Simulate website performance and SEO audit.', tags: 'seo speed performance audit' },
  { id: 'dummy', component: <DummyDataGen />, icon: <Database />, name: 'Dummy Data', description: 'Generate mock JSON or CSV data for testing.', tags: 'json csv dev mock' },
  { id: 'device', component: <DeviceInfo />, icon: <Smartphone />, name: 'Device Info', description: 'View your browser, OS, and screen details.', tags: 'browser user agent screen' },

  // Personal Trackers
  { id: 'todo', component: <TodoTracker />, icon: <ListTodo />, name: 'Task Master', description: 'Manage your daily to-do list effectively.', tags: 'todo list task tracker' },
  { id: 'budget', component: <BudgetTracker />, icon: <Wallet />, name: 'Budget Tracker', description: 'Track income, expenses, and current balance.', tags: 'finance expense income money' },
  { id: 'habit', component: <HabitTracker />, icon: <Flame />, name: 'Habit Streak', description: 'Track daily habits and build streaks.', tags: 'goal streak habit' },

  // Social & Viral
  { id: 'yt-title', component: <YouTubeTitleGen />, icon: <Youtube />, name: 'YouTube Title Gen', description: 'Generate high-CTR viral video titles.', tags: 'youtube viral ctr video' },
  { id: 'reel-hook', component: <ReelHooksGen />, icon: <Music />, name: 'Reel Hooks', description: 'Create scroll-stopping captions and hooks.', tags: 'instagram tiktok caption viral' },
  { id: 'viral-score', component: <ViralityScore />, icon: <TrendingUp />, name: 'Virality Score', description: 'AI analysis of your content\'s viral potential.', tags: 'ai check post caption' },
  { id: 'hashtag', component: <HashtagReach />, icon: <Hash />, name: 'Hashtag Reach', description: 'Estimate hashtag reach and competition.', tags: 'instagram reach growth' },
  { id: 'bio-audit', component: <BioAudit />, icon: <UserCheck />, name: 'Bio Audit', description: 'Score and optimize your Instagram bio.', tags: 'instagram profile check' },
  { id: 'thumb-text', component: <ThumbnailAnalyzer />, icon: <Image />, name: 'Thumbnail Text', description: 'Check thumbnail text impact and length.', tags: 'youtube image text check' },
  { id: 'post-time', component: <PostTimeOptimizer />, icon: <Clock />, name: 'Best Post Time', description: 'Find the best time to post on social media.', tags: 'schedule social media' },
  { id: 'engage-calc', component: <EngagementRate />, icon: <BarChart2 />, name: 'Engagement Rate', description: 'Calculate influencer engagement metrics.', tags: 'calculator influencer metrics' },

  // Career & Education
  { id: 'exam-rank', component: <ExamRankPredictor />, icon: <GraduationCap />, name: 'Exam Rank Predictor', description: 'Predict your rank based on marks scored.', tags: 'student marks rank education' },
  { id: 'attendance', component: <AttendanceCalc />, icon: <UserX />, name: 'Attendance Manager', description: 'Calculate attendance percentage and bunkers.', tags: 'student class bunk percentage' },
  { id: 'project-risk', component: <ProjectRisk />, icon: <AlertTriangle />, name: 'Deadline Risk', description: 'Analyze project deadline feasibility.', tags: 'work project task management' },
  { id: 'internship', component: <InternshipScore />, icon: <Briefcase />, name: 'Internship Ready', description: 'Check your readiness for corporate jobs.', tags: 'student career job' },
  { id: 'typing', component: <TypingRank />, icon: <Keyboard />, name: 'Typing Rank', description: 'See where your typing speed ranks globally.', tags: 'speed wpm keyboard' },
  { id: 'salary', component: <SalaryHike />, icon: <DollarSign />, name: 'Salary Hike', description: 'Predict your next salary appraisal.', tags: 'job money career' },
  { id: 'office-score', component: <OfficeScore />, icon: <Coffee />, name: 'Office Score', description: 'Calculate your daily productivity score.', tags: 'productivity work efficiency' },
];

const categories = [
  {
    title: "Health & Personal",
    items: [
      { name: "BMI Calculator", id: "bmi" },
      { name: "Age Calculator", id: "age" },
      { name: "Task Master", id: "todo" },
      { name: "Habit Streak", id: "habit" }
    ]
  },
  {
    title: "Career & Education",
    items: [
      { name: "Attendance Manager", id: "attendance" },
      { name: "Exam Rank Predictor", id: "exam-rank" },
      { name: "Internship Ready", id: "internship" },
      { name: "Salary Hike", id: "salary" },
      { name: "Office Score", id: "office-score" },
      { name: "Typing Rank", id: "typing" },
      { name: "Deadline Risk", id: "project-risk" }
    ]
  },
  {
    title: "Social Media & Viral",
    items: [
      { name: "YouTube Title Gen", id: "yt-title" },
      { name: "Reel Hooks Gen", id: "reel-hook" },
      { name: "Virality Score AI", id: "viral-score" },
      { name: "Hashtag Reach", id: "hashtag" },
      { name: "Bio Audit", id: "bio-audit" },
      { name: "Thumbnail Text", id: "thumb-text" },
      { name: "Best Post Time", id: "post-time" },
      { name: "Engagement Calc", id: "engage-calc" }
    ]
  },
  {
    title: "Finance",
    items: [
      { name: "EMI Calculator", id: "emi" },
      { name: "GST Calculator", id: "gst" },
      { name: "Budget Tracker", id: "budget" },
      { name: "Discount Calc", id: "discount" }
    ]
  },
  {
    title: "Math & Units",
    items: [
      { name: "Unit Converter", id: "unit-conv" },
      { name: "Percentage Calc", id: "percent" },
      { name: "Basic Calculator", id: "basic-calc" }
    ]
  },
  {
    title: "Web & Dev Tools",
    items: [
      { name: "Domain Generator", id: "domain" },
      { name: "Speed Analyzer", id: "web-perf" },
      { name: "Dummy Data Gen", id: "dummy" },
      { name: "Device Info", id: "device" },
      { name: "Dev Converter", id: "dev-convert" }
    ]
  },
  {
    title: "Text & Utilities",
    items: [
      { name: "QR Generator", id: "qr" },
      { name: "Password Gen", id: "password" },
      { name: "Text Statistics", id: "text-stats" },
      { name: "Text Utility", id: "text-util" },
      { name: "SEO Preview", id: "seo-preview" }
    ]
  },
  {
    title: "Fun & Engagement",
    items: [
      { name: "Dice Roller", id: "dice" },
      { name: "Spin the Wheel", id: "spin" },
      { name: "Coin Toss", id: "coin" },
      { name: "Lucky Number", id: "lucky" },
      { name: "Love Calculator", id: "love" },
    ]
  }
];

// --- Navbar ---
interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
  onNavigate: (id: string) => void;
  onToolSelect: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDark, onNavigate, onToolSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Dropdown States
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if click is inside desktop menu OR mobile menu
      const inDesktop = dropdownRef.current && dropdownRef.current.contains(target);
      const inMobile = mobileMenuRef.current && mobileMenuRef.current.contains(target);
      
      // If click is outside both, close dropdowns
      if (!inDesktop && !inMobile) {
        setToolsDropdownOpen(false);
        setActiveCategory(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  const handleToolClick = (toolId: string) => {
    // For desktop: close dropdown. For mobile: close menu completely.
    setToolsDropdownOpen(false);
    setActiveCategory(null);
    setIsOpen(false);
    onToolSelect(toolId);
  };

  return (
    <nav className={`fixed top-0 w-full z-[60] transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('root')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 dark:from-neonBlue dark:to-neonPurple flex items-center justify-center text-white dark:text-slate-900 font-black">T</div>
          ToolCraft<span className="text-blue-600 dark:text-neonBlue">.ai</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center" ref={dropdownRef}>
          {/* Tools Dropdown Trigger */}
          <div className="relative group">
            <button 
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className={`flex items-center gap-1 text-sm font-bold tracking-wide transition-colors ${toolsDropdownOpen ? 'text-blue-600 dark:text-neonBlue' : 'text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Tools
              <ChevronDown size={14} className={`transition-transform duration-300 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Tools Dropdown Menu */}
            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 mt-4 w-60 bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-visible p-2 animate-fade-in-up">
                {categories.map((cat) => (
                  <div key={cat.title} className="relative">
                    <button
                      onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all font-medium ${
                        activeCategory === cat.title 
                        ? 'bg-blue-50 dark:bg-neonBlue/10 text-blue-700 dark:text-neonBlue' 
                        : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {cat.title}
                      <ChevronRight size={14} className={`transition-transform ${activeCategory === cat.title ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Nested Sub-Menu (Desktop - Flies out to the LEFT) */}
                    {activeCategory === cat.title && (
                      <div className="relative md:absolute md:right-full md:-top-1 md:mr-2 w-full md:w-56 bg-white dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-2 z-50">
                        {cat.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleToolClick(item.id)}
                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center gap-2 font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-neonPurple"></span>
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => handleNavClick('about')} className="text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-bold tracking-wide">About</button>
          <button onClick={() => handleNavClick('contact')} className="text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-bold tracking-wide">Contact</button>
          
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:scale-110 transition-transform border border-slate-200 dark:border-slate-700">
             {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
           <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white z-[70] border border-slate-200 dark:border-slate-700">
             {isDark ? <Sun size={18} /> : <Moon size={18} />}
           </button>
           <button className="text-slate-900 dark:text-white cursor-pointer z-[70]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Fixed Full Overlay) */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-40 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        <div className="flex flex-col h-full overflow-y-auto pt-28 px-4 space-y-2 custom-scrollbar overscroll-contain">
          
          {/* Tools Accordion */}
          <div className="rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 transition-all shrink-0">
            <button 
              onClick={(e) => { e.stopPropagation(); setToolsDropdownOpen(!toolsDropdownOpen); }}
              className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
            >
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-neonBlue"></span>
                Tools Library
              </span>
              <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 pointer-events-none ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${toolsDropdownOpen ? 'max-h-[2500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-3 pb-3 space-y-1">
                {categories.map((cat) => (
                  <div key={cat.title} className="rounded-xl overflow-hidden bg-white/50 dark:bg-black/20">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveCategory(activeCategory === cat.title ? null : cat.title); }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200
                        ${activeCategory === cat.title 
                        ? 'text-blue-700 dark:text-neonBlue bg-slate-100 dark:bg-slate-800' 
                        : 'text-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10'
                        }`}
                    >
                      <span className="pointer-events-none">{cat.title}</span>
                      <ChevronRight size={14} className={`transition-transform duration-300 pointer-events-none ${activeCategory === cat.title ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeCategory === cat.title ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-white/5">
                        {cat.items.map((item) => (
                           <button 
                             key={item.id} 
                             onClick={(e) => { e.stopPropagation(); handleToolClick(item.id); }}
                             className="flex items-center gap-3 w-full text-left px-4 py-3 text-xs font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-neonBlue hover:bg-white dark:hover:bg-white/5 rounded-lg transition-all group"
                           >
                             <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 group-hover:bg-blue-600 dark:group-hover:bg-neonBlue transition-colors pointer-events-none"></div>
                             <span className="pointer-events-none">{item.name}</span>
                           </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
             <button onClick={() => handleNavClick('about')} className="flex-1 px-5 py-4 font-bold text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl transition-colors border border-slate-200 dark:border-white/5">About</button>
             <button onClick={() => handleNavClick('contact')} className="flex-1 px-5 py-4 font-bold text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl transition-colors border border-slate-200 dark:border-white/5">Contact</button>
          </div>
          
          {/* Scroll Spacer to ensure last items are visible above mobile browser bars */}
          <div className="h-32 shrink-0 w-full" aria-hidden="true"></div>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showHero, setShowHero] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'about' | 'contact'>('home');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleNavigate = (view: string) => {
    if (view === 'root') {
      setCurrentView('home');
      setSelectedToolId(null);
    } else {
      // @ts-ignore
      setCurrentView(view);
      setSelectedToolId(null);
    }
  };

  const handleToolSelect = (id: string) => {
    setSelectedToolId(id);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroComplete = () => {
    setShowHero(false);
  };

  // Filter tools
  const filteredTools = toolsList.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTool = selectedToolId ? toolsList.find(t => t.id === selectedToolId) : null;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {showHero && <Hero3D onComplete={handleHeroComplete} />}
      
      <CursorGlow />
      
      {!showHero && (
        <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards', animationDuration: '1s' }}>
          <Navbar 
            isDark={darkMode} 
            toggleTheme={toggleTheme} 
            onNavigate={handleNavigate}
            onToolSelect={handleToolSelect}
          />

          <main className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
            {currentView === 'admin' ? (
              <AdminDashboard onLogout={() => handleNavigate('root')} />
            ) : currentView === 'home' ? (
              <>
                {activeTool ? (
                  <div className="max-w-4xl mx-auto animate-fade-in-up">
                    <button 
                      onClick={() => setSelectedToolId(null)}
                      className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-neonBlue mb-6 transition-colors font-bold text-sm"
                    >
                      <span className="p-1 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:-translate-x-1 transition-transform">
                        <ChevronDown size={16} className="rotate-90" />
                      </span>
                      Back to Tools
                    </button>
                    <div className="min-h-[600px]">
                      {activeTool.component}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {/* Hero Section - Full Height Viewport */}
                    <div className="flex flex-col items-center min-h-[calc(100vh-8rem)] text-center max-w-4xl mx-auto mb-10">
                       
                       {/* Centered Content */}
                       <div className="flex-1 flex flex-col justify-center items-center space-y-8 w-full">
                           <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                             The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neonBlue dark:to-neonPurple animate-pulse-slow">Dev & Life</span> Toolkit
                           </h1>
                           <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                             Access 40+ premium tools, calculators, and generators. Completely free, open-source, and privacy-focused.
                           </p>
                           
                           <div className="relative w-full max-w-2xl mx-auto group">
                              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-neonBlue transition-colors">
                                 <Search size={24} />
                              </div>
                              <input 
                                type="text" 
                                placeholder="Search tools (e.g., 'bmi', 'qr code', 'password')..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-5 pl-16 pr-8 text-xl shadow-2xl shadow-slate-200/50 dark:shadow-none focus:ring-4 focus:ring-blue-600/20 dark:focus:ring-neonBlue/20 outline-none transition-all hover:scale-[1.02] focus:scale-[1.02]"
                              />
                           </div>
                       </div>

                       {/* Bottom Scroll Indicator */}
                       <button 
                         onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
                         className="pb-12 text-slate-400 hover:text-blue-600 dark:hover:text-neonBlue transition-colors animate-bounce cursor-pointer pt-8"
                         aria-label="Scroll down"
                       >
                         <div className="flex flex-col items-center gap-2 text-sm font-bold tracking-widest uppercase opacity-70">
                            Explore Tools
                            <ChevronDown size={24} />
                         </div>
                       </button>
                    </div>

                    {/* Tools Grid - Below the fold */}
                    <div id="tools-grid" className="scroll-mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                       {filteredTools.length > 0 ? filteredTools.map((tool, idx) => (
                          <AnimatedSection key={tool.id} delay={idx * 30}>
                             <div 
                               onClick={() => handleToolSelect(tool.id)}
                               className="group h-full bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-neonBlue/10 relative overflow-hidden"
                             >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform scale-150 group-hover:rotate-12 duration-500 text-blue-600 dark:text-neonBlue">
                                   {tool.icon}
                                </div>
                                
                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-700 dark:text-white mb-4 group-hover:bg-blue-600 dark:group-hover:bg-neonBlue group-hover:text-white transition-colors duration-300">
                                   {tool.icon}
                                </div>
                                
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-neonBlue transition-colors">{tool.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{tool.description}</p>
                             </div>
                          </AnimatedSection>
                       )) : (
                          <div className="col-span-full py-20 text-center">
                             <div className="inline-block p-4 rounded-full bg-slate-100 dark:bg-white/5 mb-4 text-slate-400">
                                <Search size={32} />
                             </div>
                             <h3 className="text-xl font-bold text-slate-700 dark:text-white">No tools found</h3>
                             <p className="text-slate-500">Try searching for something else like "finance" or "health".</p>
                          </div>
                       )}
                    </div>
                  </div>
                )}
              </>
            ) : (
               <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in-up">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                     <AlertTriangle size={32} className="text-yellow-500" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Work in Progress</h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md text-center mb-8">
                     The <span className="font-bold text-slate-900 dark:text-white">{currentView}</span> page is currently being built. Check back soon for updates.
                  </p>
                  <NeonButton onClick={() => handleNavigate('root')}>Return Home</NeonButton>
               </div>
            )}
          </main>
        </div>
      )}
      <BackToTop />
    </div>
  );
};

export default App;
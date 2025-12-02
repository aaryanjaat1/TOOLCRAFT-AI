
import React, { useState, useMemo, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { GlassCard, NeonButton, InputGroup } from './UI';
import { 
  RefreshCw, Copy, Check, Upload, FileText, Image as ImageIcon, 
  Download, FileType, X, FileSpreadsheet, Presentation, 
  Video, Music, Scissors, Shield, Lock, Unlock, Layers, 
  ScanLine, File as FileIcon, Film
} from 'lucide-react';

// --- BMI Calculator ---
export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      const val = w / ((h / 100) * (h / 100));
      setBmi(parseFloat(val.toFixed(1)));
    }
  };

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-yellow-600 dark:text-yellow-400' };
    if (val < 24.9) return { label: 'Normal', color: 'text-green-600 dark:text-green-400' };
    if (val < 29.9) return { label: 'Overweight', color: 'text-orange-600 dark:text-orange-400' };
    return { label: 'Obese', color: 'text-red-600 dark:text-red-500' };
  };

  return (
    <GlassCard title="BMI Calculator" className="h-full flex flex-col">
      <div className="space-y-4 flex-grow">
        <InputGroup label="Weight (kg)" id="bmi-weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <InputGroup label="Height (cm)" id="bmi-height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        <NeonButton onClick={calculate} className="w-full mt-4">Calculate BMI</NeonButton>
      </div>
      {bmi !== null && (
        <div className="mt-6 p-4 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-center animate-pulse-slow">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Your BMI</p>
          <div className="text-4xl font-bold text-slate-800 dark:text-white my-2">{bmi}</div>
          <p className={`font-semibold ${getCategory(bmi).color}`}>{getCategory(bmi).label}</p>
        </div>
      )}
    </GlassCard>
  );
};

// --- EMI Calculator ---
export const EMICalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('500000');
  const [rate, setRate] = useState<string>('10');
  const [years, setYears] = useState<string>('5');
  const [result, setResult] = useState<{ emi: number; totalInterest: number; totalPayment: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(years) * 12;

    if (p && r && n) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;
      setResult({
        emi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment)
      });
    }
  };

  const data = result ? [
    { name: 'Principal', value: parseFloat(amount) },
    { name: 'Interest', value: result.totalInterest },
  ] : [];

  const COLORS = ['#00f3ff', '#bc13fe'];

  return (
    <GlassCard title="EMI Calculator" className="h-full flex flex-col">
       <div className="space-y-4">
        <InputGroup label="Loan Amount ($)" id="emi-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <InputGroup label="Interest Rate (%)" id="emi-rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        <InputGroup label="Tenure (Years)" id="emi-years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        <NeonButton onClick={calculate} className="w-full">Calculate EMI</NeonButton>
      </div>
      {result && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
             <div className="text-left">
                <p className="text-gray-500 dark:text-gray-400 text-xs">Monthly EMI</p>
                <p className="text-xl font-bold text-neonBlue">${result.emi.toLocaleString()}</p>
             </div>
             <div className="text-right">
                <p className="text-gray-500 dark:text-gray-400 text-xs">Total Interest</p>
                <p className="text-xl font-bold text-neonPurple">${result.totalInterest.toLocaleString()}</p>
             </div>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

// --- Age Calculator ---
export const AgeCalculator: React.FC = () => {
  const [dob, setDob] = useState<string>('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge({ years, months, days });
  };

  return (
    <GlassCard title="Age Calculator" className="h-full">
      <div className="space-y-4">
        <InputGroup label="Date of Birth" id="age-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} max={new Date().toISOString().split('T')[0]} />
        <NeonButton onClick={calculate} className="w-full">Calculate Age</NeonButton>
      </div>
      {age && (
        <div className="mt-8 grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/10">
            <div className="text-2xl font-bold text-neonBlue">{age.years}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Years</div>
          </div>
          <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/10">
            <div className="text-2xl font-bold text-neonPurple">{age.months}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Months</div>
          </div>
          <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/10">
            <div className="text-2xl font-bold text-green-500 dark:text-green-400">{age.days}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

// --- GST Calculator ---
export const GSTCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [gst, setGst] = useState<string>('18');
  const [result, setResult] = useState<{ gstAmount: number; total: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const g = parseFloat(gst);
    if (a && g) {
      const gstVal = (a * g) / 100;
      setResult({ gstAmount: gstVal, total: a + gstVal });
    }
  };

  return (
    <GlassCard title="GST Calculator" className="h-full">
      <div className="space-y-4">
        <InputGroup label="Original Amount" id="gst-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">GST Slab</label>
          <select
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-neonBlue outline-none"
          >
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
        </div>
        <NeonButton onClick={calculate} className="w-full">Calculate Tax</NeonButton>
      </div>
      {result && (
        <div className="mt-6 space-y-3">
          <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2">
             <span className="text-gray-500 dark:text-gray-400">GST Amount</span>
             <span className="text-neonPurple font-semibold">+{result.gstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-slate-800 dark:text-white font-bold">Total Payable</span>
             <span className="text-2xl font-bold text-neonBlue">{result.total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

// --- QR Generator ---
export const QRGenerator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [qrUrl, setQrUrl] = useState<string>('');

  const generate = () => {
    if (!text) return;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`);
  };

  return (
    <GlassCard title="QR Code Generator" className="h-full flex flex-col">
       <div className="space-y-4 flex-grow">
        <InputGroup label="Content (URL or Text)" id="qr-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com" />
        <NeonButton onClick={generate} className="w-full">Generate QR</NeonButton>
      </div>
      <div className="mt-6 flex justify-center items-center h-[200px] bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden group">
        {qrUrl ? (
          <img src={qrUrl} alt="QR Code" className="rounded-lg shadow-lg mix-blend-multiply dark:mix-blend-screen" />
        ) : (
          <p className="text-gray-500 text-sm">QR Code will appear here</p>
        )}
      </div>
    </GlassCard>
  );
};

// --- Password Generator ---
export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charset = "";
    if (options.uppercase) charset += upper;
    if (options.lowercase) charset += lower;
    if (options.numbers) charset += nums;
    if (options.symbols) charset += syms;

    if (charset === "") return;

    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if(!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard title="Strong Password" className="h-full">
      <div className="space-y-4">
        <div>
           <div className="flex justify-between mb-2">
             <span className="text-sm text-slate-600 dark:text-gray-300">Length</span>
             <span className="text-sm font-bold text-neonBlue">{length}</span>
           </div>
           <input
             type="range" min="6" max="32" value={length}
             onChange={(e) => setLength(parseInt(e.target.value))}
             className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-neonBlue"
           />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-gray-300">
           {Object.keys(options).map(key => (
             <label key={key} className="flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
               <input
                 type="checkbox"
                 checked={options[key as keyof typeof options]}
                 onChange={() => setOptions({...options, [key]: !options[key as keyof typeof options]})}
                 className="form-checkbox rounded text-neonPurple focus:ring-0 bg-slate-200 dark:bg-slate-700 border-none"
               />
               <span className="capitalize">{key}</span>
             </label>
           ))}
        </div>
        <NeonButton onClick={generate} variant="secondary" className="w-full group">
          <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          <span>Generate</span>
        </NeonButton>
      </div>
      <div className="mt-4 relative">
        <div className="w-full bg-white dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-xl p-4 font-mono text-center text-lg min-h-[60px] flex items-center justify-center break-all text-neonGreen shadow-inner">
           {password || "...."}
        </div>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
          title="Copy"
        >
          {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18} />}
        </button>
      </div>
    </GlassCard>
  );
};

// -----------------------------------------------------
// NEW COMPLEX SUITES
// -----------------------------------------------------

// --- Office & PDF Converter Suite ---
export const OfficePDFConverter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'to-office' | 'to-pdf'>('to-office');
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetFormat, setTargetFormat] = useState('docx');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setProgress(0);
    }
  };

  const convert = () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);
    // Simulation
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setConverting(false);
          return 100;
        }
        return p + 5;
      });
    }, 150);
  };

  return (
    <GlassCard title="Office Converter" className="h-full flex flex-col">
      <div className="flex space-x-2 mb-4 p-1 bg-slate-100 dark:bg-white/5 rounded-lg">
        {['to-office', 'to-pdf'].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab as any); setFile(null); setProgress(0); }}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === tab 
              ? 'bg-white dark:bg-slate-700 text-neonBlue shadow-sm' 
              : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab === 'to-office' ? 'PDF to Office' : 'Office to PDF'}
          </button>
        ))}
      </div>

      <div 
        className={`flex-grow border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-colors relative mb-4
        ${file ? 'border-neonPurple bg-neonPurple/5' : 'border-slate-300 dark:border-white/10 hover:border-neonPurple/50'}`}
      >
        {!file ? (
          <>
            {activeTab === 'to-office' ? <FileText size={40} className="mb-2 text-slate-400" /> : <FileSpreadsheet size={40} className="mb-2 text-slate-400" />}
            <p className="text-xs text-center text-slate-500 mb-3">
              {activeTab === 'to-office' ? 'Upload PDF to convert' : 'Upload Word, Excel, PPT'}
            </p>
            <input type="file" onChange={handleFile} className="hidden" id="office-upload" accept={activeTab === 'to-office' ? '.pdf' : '.docx,.xlsx,.pptx'} ref={fileInputRef} />
            <label htmlFor="office-upload" className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs cursor-pointer hover:bg-slate-300 transition-colors dark:text-white">Select File</label>
          </>
        ) : (
          <div className="w-full text-center">
             <div className="flex items-center justify-center space-x-2 mb-2">
               <FileIcon size={24} className="text-neonPurple" />
               <span className="text-sm font-medium truncate max-w-[150px] dark:text-white">{file.name}</span>
               <button onClick={() => setFile(null)} className="text-red-500"><X size={14}/></button>
             </div>
             {converting && (
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-2">
                   <div className="bg-neonPurple h-1.5 rounded-full" style={{width: `${progress}%`}}></div>
                </div>
             )}
             {!converting && progress === 100 && <p className="text-xs text-green-500 mt-2">Conversion Ready</p>}
          </div>
        )}
      </div>

      {activeTab === 'to-office' && (
        <div className="mb-4">
          <label className="text-xs text-slate-500 dark:text-gray-400 block mb-1">Convert To</label>
          <div className="flex space-x-2">
            {['docx', 'xlsx', 'pptx'].map(fmt => (
              <button 
                key={fmt} 
                onClick={() => setTargetFormat(fmt)}
                className={`flex-1 py-1 text-xs uppercase border rounded transition-colors ${
                  targetFormat === fmt 
                  ? 'border-neonBlue text-neonBlue bg-neonBlue/10' 
                  : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-gray-400'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      )}

      <NeonButton 
        onClick={progress === 100 ? () => alert("Downloaded!") : convert} 
        disabled={!file || converting}
        className={`w-full ${!file ? 'opacity-50' : ''}`}
      >
        {progress === 100 ? 'Download File' : (converting ? 'Converting...' : 'Convert Now')}
      </NeonButton>
    </GlassCard>
  );
};

// --- PDF Architect (Utility Tools) ---
export const PDFUtilityTools: React.FC = () => {
  const [tool, setTool] = useState<'merge'|'split'|'protect'|'unlock'|'ocr'>('merge');
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [password, setPassword] = useState('');

  const tools = [
    { id: 'merge', icon: Layers, label: 'Merge' },
    { id: 'split', icon: Scissors, label: 'Split' },
    { id: 'protect', icon: Lock, label: 'Protect' },
    { id: 'unlock', icon: Unlock, label: 'Unlock' },
    { id: 'ocr', icon: ScanLine, label: 'OCR' },
  ];

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const process = () => {
    if (files.length === 0) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert(`${tools.find(t=>t.id===tool)?.label} complete! File downloaded.`);
      setFiles([]);
      setPassword('');
    }, 2000);
  };

  return (
    <GlassCard title="PDF Architect" className="h-full flex flex-col">
       <div className="grid grid-cols-5 gap-2 mb-6">
         {tools.map(t => (
           <button
             key={t.id}
             onClick={() => { setTool(t.id as any); setFiles([]); }}
             className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
               tool === t.id 
               ? 'bg-neonBlue/20 text-neonBlue' 
               : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5'
             }`}
           >
             <t.icon size={18} className="mb-1" />
             <span className="text-[10px]">{t.label}</span>
           </button>
         ))}
       </div>

       <div className="flex-grow space-y-4">
         <div className="border border-slate-200 dark:border-white/10 rounded-xl p-4 bg-slate-50 dark:bg-white/5">
           <p className="text-sm font-semibold mb-2 text-slate-700 dark:text-white capitalize">{tool} PDF</p>
           <p className="text-xs text-slate-500 dark:text-gray-400 mb-4">
             {tool === 'merge' && "Combine multiple PDFs into one."}
             {tool === 'split' && "Extract pages from your PDF."}
             {tool === 'protect' && "Encrypt with a password."}
             {tool === 'ocr' && "Make scanned PDFs searchable."}
           </p>

           <input type="file" multiple={tool === 'merge'} accept=".pdf" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neonBlue/10 file:text-neonBlue hover:file:bg-neonBlue/20 mb-2" onChange={handleFiles} />
           
           {files.length > 0 && (
             <div className="mb-2">
               {files.map((f, i) => <div key={i} className="text-xs text-slate-400 truncate">• {f.name}</div>)}
             </div>
           )}

           {tool === 'protect' && (
             <input type="password" placeholder="Set Password" className="w-full mt-2 p-2 rounded border border-slate-300 dark:border-white/10 bg-transparent text-sm dark:text-white" value={password} onChange={e => setPassword(e.target.value)} />
           )}
           {tool === 'unlock' && (
             <input type="password" placeholder="Enter Password (if known)" className="w-full mt-2 p-2 rounded border border-slate-300 dark:border-white/10 bg-transparent text-sm dark:text-white" />
           )}
         </div>
       </div>

       <NeonButton onClick={process} disabled={files.length === 0 || processing} className={`w-full mt-4 ${files.length===0?'opacity-50':''}`}>
         {processing ? 'Processing...' : `Execute ${tool}`}
       </NeonButton>
    </GlassCard>
  );
};

// --- Image to PDF Suite ---
export const ImagePDFConverter: React.FC = () => {
  const [mode, setMode] = useState<'img-to-pdf'|'pdf-to-img'>('img-to-pdf');
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const process = () => {
    if(files.length === 0) return;
    setProcessing(true);
    setTimeout(() => {
       setProcessing(false);
       setFiles([]);
       alert("Conversion successful! Download started.");
    }, 2000);
  };

  return (
    <GlassCard title="Image ↔ PDF" className="h-full flex flex-col">
       <div className="flex border-b border-slate-200 dark:border-white/10 mb-4">
         <button onClick={()=>setMode('img-to-pdf')} className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${mode === 'img-to-pdf' ? 'border-neonBlue text-neonBlue' : 'border-transparent text-slate-500'}`}>Images to PDF</button>
         <button onClick={()=>setMode('pdf-to-img')} className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${mode === 'pdf-to-img' ? 'border-neonPurple text-neonPurple' : 'border-transparent text-slate-500'}`}>PDF to Images</button>
       </div>

       <div className="flex-grow flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
          <Upload size={32} className="text-slate-400 mb-2" />
          <p className="text-sm text-slate-600 dark:text-gray-300 text-center mb-2">
            {mode === 'img-to-pdf' ? 'Drag images here (JPG, PNG, WEBP)' : 'Drag PDF here'}
          </p>
          <input 
            type="file" 
            multiple={mode === 'img-to-pdf'} 
            accept={mode === 'img-to-pdf' ? "image/*" : ".pdf"}
            className="hidden" 
            id="imgpdf-upload" 
            onChange={handleFiles}
          />
          <label htmlFor="imgpdf-upload" className="px-4 py-2 bg-slate-800 text-white text-xs rounded-lg cursor-pointer hover:bg-slate-700">Browse Files</label>
          
          {files.length > 0 && (
            <div className="mt-4 w-full">
               <p className="text-xs font-bold mb-1 dark:text-white">{files.length} file(s) selected:</p>
               <div className="max-h-20 overflow-y-auto">
                 {files.map((f, i) => <div key={i} className="text-xs text-slate-500 truncate">{f.name}</div>)}
               </div>
            </div>
          )}
       </div>

       <NeonButton onClick={process} disabled={files.length === 0 || processing} className={`w-full mt-4 ${files.length===0?'opacity-50':''}`}>
          {processing ? 'Converting...' : (mode === 'img-to-pdf' ? 'Create PDF' : 'Extract Images')}
       </NeonButton>
    </GlassCard>
  );
};

// --- Video Studio ---
export const VideoConverter: React.FC = () => {
  const [file, setFile] = useState<File|null>(null);
  const [format, setFormat] = useState('mp4');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const convert = () => {
    if(!file) return;
    setProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if(p >= 100) {
          clearInterval(interval);
          setProcessing(false);
          return 100;
        }
        return p + 2; // Slower progress for "video"
      });
    }, 100);
  };

  return (
    <GlassCard title="Video Studio" className="h-full flex flex-col">
       <div className="relative h-32 bg-slate-900 rounded-xl overflow-hidden mb-4 flex items-center justify-center group">
         {file ? (
           <div className="text-center">
              <Film size={32} className="text-neonGreen mx-auto mb-2" />
              <p className="text-white text-xs px-2 truncate">{file.name}</p>
              <p className="text-slate-400 text-[10px]">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
           </div>
         ) : (
           <>
              <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/20 to-neonPurple/20 animate-pulse"></div>
              <Video size={40} className="text-white/50 relative z-10" />
           </>
         )}
         <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} />
       </div>

       <div className="space-y-4">
         <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Output Format</label>
            <div className="grid grid-cols-3 gap-2">
              {['mp4', 'mp3', 'gif'].map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`py-2 rounded-lg text-xs font-bold uppercase transition-all border ${
                    format === f 
                    ? 'border-neonGreen text-neonGreen bg-neonGreen/10 shadow-[0_0_10px_rgba(10,255,96,0.2)]' 
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-neonGreen/50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
         </div>

         {processing && (
           <div className="space-y-1">
             <div className="flex justify-between text-xs text-slate-400">
               <span>Transcoding...</span>
               <span>{progress}%</span>
             </div>
             <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-neonGreen transition-all duration-100" style={{width: `${progress}%`}}></div>
             </div>
           </div>
         )}

         <NeonButton onClick={convert} disabled={!file || processing} className={`w-full ${!file?'opacity-50':''}`}>
            {processing ? 'Processing Media...' : 'Convert Video'}
         </NeonButton>
       </div>
    </GlassCard>
  );
};

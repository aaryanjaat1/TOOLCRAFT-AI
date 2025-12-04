import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { GlassCard, NeonButton, InputGroup } from './UI';
import { 
  RefreshCw, Copy, Check, Download, Dices, Sparkles, Heart, Circle,
  AlignLeft, Type, Code2, Globe, Eraser, Scissors, FileJson,
  Search, Database, Smartphone, CheckSquare, DollarSign, Activity, 
  Trash2, Plus, ArrowRight, Wifi, Battery, Monitor, Calculator, 
  Scale, Percent, Tag, Delete, Youtube, Instagram, Twitter, Hash,
  BarChart2, Clock, Image, ThumbsUp, GraduationCap, Briefcase, 
  TrendingUp, AlertTriangle, Keyboard, UserCheck, Calendar, Loader2
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
    if (val < 18.5) return { label: 'Underweight', color: 'text-yellow-700 dark:text-yellow-400' };
    if (val < 24.9) return { label: 'Normal', color: 'text-green-700 dark:text-green-400' };
    if (val < 29.9) return { label: 'Overweight', color: 'text-orange-700 dark:text-orange-400' };
    return { label: 'Obese', color: 'text-red-700 dark:text-red-500' };
  };

  return (
    <GlassCard title="BMI Calculator" className="h-full flex flex-col">
      <div className="space-y-4 flex-grow">
        <InputGroup label="Weight (kg)" id="bmi-weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <InputGroup label="Height (cm)" id="bmi-height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        <NeonButton onClick={calculate} className="w-full mt-4">Calculate BMI</NeonButton>
      </div>
      {bmi !== null && (
        <div className="mt-6 p-4 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-300 dark:border-white/10 text-center animate-pulse-slow">
          <p className="text-slate-600 dark:text-gray-400 text-sm font-medium">Your BMI</p>
          <div className="text-4xl font-bold text-slate-900 dark:text-white my-2">{bmi}</div>
          <p className={`font-bold ${getCategory(bmi).color}`}>{getCategory(bmi).label}</p>
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

  const COLORS = ['#0284c7', '#9333ea'];

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
                <p className="text-slate-600 dark:text-gray-400 text-xs font-semibold">Monthly EMI</p>
                <p className="text-xl font-bold text-blue-600 dark:text-neonBlue">${result.emi.toLocaleString()}</p>
             </div>
             <div className="text-right">
                <p className="text-slate-600 dark:text-gray-400 text-xs font-semibold">Total Interest</p>
                <p className="text-xl font-bold text-purple-600 dark:text-neonPurple">${result.totalInterest.toLocaleString()}</p>
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
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '12px', color: '#475569' }}/>
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
          <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg border border-slate-300 dark:border-white/10">
            <div className="text-2xl font-bold text-blue-600 dark:text-neonBlue">{age.years}</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-gray-400">Years</div>
          </div>
          <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg border border-slate-300 dark:border-white/10">
            <div className="text-2xl font-bold text-purple-600 dark:text-neonPurple">{age.months}</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-gray-400">Months</div>
          </div>
          <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg border border-slate-300 dark:border-white/10">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{age.days}</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-gray-400">Days</div>
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
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-1">GST Slab</label>
          <select
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue outline-none transition-all duration-300 focus:scale-[1.02]"
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
          <div className="flex justify-between border-b border-slate-300 dark:border-white/10 pb-2">
             <span className="text-slate-600 dark:text-gray-400 font-medium">GST Amount</span>
             <span className="text-purple-600 dark:text-neonPurple font-bold">+{result.gstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-slate-900 dark:text-white font-bold">Total Payable</span>
             <span className="text-2xl font-bold text-blue-600 dark:text-neonBlue">{result.total.toFixed(2)}</span>
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
  
  const downloadQR = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Browser blocked automatic download. Please right-click the image and select 'Save Image As'.");
    }
  };

  return (
    <GlassCard title="QR Code Generator" className="h-full flex flex-col">
       <div className="space-y-4 flex-grow">
        <InputGroup label="Content (URL or Text)" id="qr-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com" />
        <NeonButton onClick={generate} className="w-full">Generate QR</NeonButton>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center space-y-4">
        <div className="h-[200px] w-full bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-300 dark:border-white/10 relative overflow-hidden flex items-center justify-center transition-all hover:shadow-lg">
          {qrUrl ? (
            <img src={qrUrl} alt="QR Code" className="rounded-lg shadow-lg mix-blend-multiply dark:mix-blend-screen" />
          ) : (
            <p className="text-slate-500 text-sm">QR Code will appear here</p>
          )}
        </div>
        {qrUrl && (
          <NeonButton onClick={downloadQR} variant="secondary" className="w-full">
            <Download size={16} className="mr-2" /> Download QR
          </NeonButton>
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
             <span className="text-sm text-slate-700 dark:text-gray-300 font-medium">Length</span>
             <span className="text-sm font-bold text-blue-600 dark:text-neonBlue">{length}</span>
           </div>
           <input
             type="range" min="6" max="32" value={length}
             onChange={(e) => setLength(parseInt(e.target.value))}
             className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-neonBlue"
           />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-gray-300 font-medium">
           {Object.keys(options).map(key => (
             <label key={key} className="flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
               <input
                 type="checkbox"
                 checked={options[key as keyof typeof options]}
                 onChange={() => setOptions({...options, [key]: !options[key as keyof typeof options]})}
                 className="form-checkbox rounded text-purple-600 dark:text-neonPurple focus:ring-0 bg-slate-200 dark:bg-slate-700 border-none mr-2 transition-transform active:scale-90"
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
      <div className="mt-4 relative group">
        <div className="w-full bg-white dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-xl p-4 font-mono text-center text-lg min-h-[60px] flex items-center justify-center break-all text-green-600 dark:text-neonGreen shadow-inner transition-all group-hover:border-green-500/30">
           {password || "...."}
        </div>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
          title="Copy"
        >
          {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18} />}
        </button>
      </div>
    </GlassCard>
  );
};

// -----------------------------------------------------
// FUN & ENGAGEMENT TOOLS
// -----------------------------------------------------

// --- Enhanced Dice Roller ---
export const DiceRoller: React.FC = () => {
  const [numDice, setNumDice] = useState<number>(1);
  const [sides, setSides] = useState<number>(6);
  const [results, setResults] = useState<number[]>([1]);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    
    // Animate rolling effect
    let step = 0;
    const interval = setInterval(() => {
      setResults(Array.from({length: numDice}, () => Math.floor(Math.random() * sides) + 1));
      step++;
      if (step > 10) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 80);
  };

  const total = results.reduce((a, b) => a + b, 0);

  return (
    <GlassCard title="Dice Roller" className="h-full flex flex-col">
       <div className="grid grid-cols-2 gap-4 mb-4">
         <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">Count</label>
            <div className="flex items-center space-x-2">
               <button onClick={() => setNumDice(Math.max(1, numDice - 1))} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs hover:bg-slate-300 hover:shadow-md active:scale-95 transition-all font-bold text-slate-700 dark:text-white">-</button>
               <span className="font-bold text-lg w-6 text-center text-slate-800 dark:text-white">{numDice}</span>
               <button onClick={() => setNumDice(Math.min(6, numDice + 1))} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs hover:bg-slate-300 hover:shadow-md active:scale-95 transition-all font-bold text-slate-700 dark:text-white">+</button>
            </div>
         </div>
         <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">Type</label>
            <select 
               value={sides} 
               onChange={(e) => setSides(Number(e.target.value))}
               className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue transition-all focus:scale-[1.02] text-slate-900 dark:text-white font-medium"
            >
               <option value="4">D4 (Tetrahedron)</option>
               <option value="6">D6 (Cube)</option>
               <option value="8">D8 (Octahedron)</option>
               <option value="10">D10 (Decahedron)</option>
               <option value="12">D12 (Dodecahedron)</option>
               <option value="20">D20 (Icosahedron)</option>
            </select>
         </div>
       </div>

       <div className="flex-grow flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl mb-4 min-h-[160px] border border-slate-200 dark:border-white/5">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
             {results.map((val, idx) => (
                <div 
                  key={idx} 
                  className={`w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-md transition-transform duration-100 ${rolling ? 'scale-90 rotate-12 opacity-80' : 'scale-100'} ${sides !== 6 ? 'text-white' : ''}`}
                  style={{
                     backgroundColor: sides === 6 ? 'white' : sides === 20 ? '#dc2626' : sides === 12 ? '#9333ea' : sides === 10 ? '#2563eb' : sides === 8 ? '#16a34a' : '#ea580c',
                     borderRadius: sides === 6 ? '12px' : '50%', // Simple approximation for non-D6
                     color: sides === 6 ? '#0f172a' : 'white',
                     border: sides === 6 ? '1px solid #e2e8f0' : 'none'
                  }}
                >
                   {val}
                </div>
             ))}
          </div>
          <div className="text-slate-600 text-sm font-bold">
             Total: <span className="text-blue-600 dark:text-neonBlue font-black text-lg">{total}</span>
          </div>
       </div>
       
       <NeonButton onClick={roll} disabled={rolling} className="w-full">
         <div className="flex items-center gap-2">
            <Dices size={20} /> {rolling ? 'Rolling...' : 'Roll Dice'}
         </div>
       </NeonButton>
    </GlassCard>
  );
};

// --- Spin the Wheel ---
export const SpinWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const segments = ['Prize A', 'Try Again', 'Bonus!', 'Jackpot', 'Mystery', 'No Luck'];
  const colors = ['#0ea5e9', '#d946ef', '#22c55e', '#f43f5e', '#f97316', '#64748b'];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const extraSpins = 5 + Math.random() * 5; 
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (extraSpins * 360) + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      const normalizedAngle = totalRotation % 360;
      const segmentSize = 360 / segments.length;
      const index = Math.floor(((360 - normalizedAngle) % 360) / segmentSize);
      setResult(segments[index]);
    }, 4000);
  };

  return (
    <GlassCard title="Spin the Wheel" className="h-full flex flex-col items-center">
      <div className="relative mb-6 mt-4">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-slate-800 dark:border-t-white z-20 drop-shadow-lg"></div>
        
        <div 
          className="w-40 h-40 rounded-full border-4 border-slate-300 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform cubic-bezier(0.25, 0.1, 0.25, 1)"
          style={{ 
            background: `conic-gradient(
              ${colors[0]} 0deg 60deg, 
              ${colors[1]} 60deg 120deg, 
              ${colors[2]} 120deg 180deg, 
              ${colors[3]} 180deg 240deg, 
              ${colors[4]} 240deg 300deg, 
              ${colors[5]} 300deg 360deg
            )`,
            transform: `rotate(${rotation}deg)`,
            transitionDuration: spinning ? '4s' : '0s'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-white dark:bg-slate-900 rounded-full shadow-inner z-10"></div>
          </div>
        </div>
      </div>
      
      <div className="h-8 mb-2">
         {result && <div className="text-xl font-bold text-blue-600 dark:text-neonBlue animate-pulse">{result}</div>}
      </div>
      
      <NeonButton onClick={spin} disabled={spinning} className="w-full">
        {spinning ? 'Spinning...' : 'Spin Now'}
      </NeonButton>
    </GlassCard>
  );
};

// --- Coin Toss ---
export const CoinToss: React.FC = () => {
  const [side, setSide] = useState<'heads' | 'tails' | null>(null);
  const [flipping, setFlipping] = useState(false);

  const flip = () => {
    if (flipping) return;
    setFlipping(true);
    setSide(null);
    
    // Animation takes 2 seconds
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'heads' : 'tails';
      setSide(result);
      setFlipping(false);
    }, 2000);
  };

  return (
    <GlassCard title="Coin Toss" className="h-full flex flex-col items-center justify-center">
      <div className="flex-grow flex items-center justify-center w-full min-h-[180px] perspective-500">
        <div className={`w-36 h-36 relative ${flipping ? 'animate-coin-flip' : ''}`}>
           {/* Visual Coin */}
           <div className={`w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-[0_10px_20px_rgba(0,0,0,0.3)] border-[6px] border-yellow-200 flex items-center justify-center transform transition-transform duration-500 ${!flipping && side === 'tails' ? 'rotate-y-180' : ''}`}>
              {/* Inner ring */}
              <div className="w-24 h-24 rounded-full border-2 border-yellow-200/50 flex items-center justify-center">
                <span className={`text-4xl font-black text-yellow-100 drop-shadow-md uppercase tracking-wider ${flipping ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
                  {side ? side : 'FLIP'}
                </span>
              </div>
           </div>
        </div>
      </div>
      
      <div className="h-8 mb-4">
        {side && !flipping && (
            <p className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-widest text-center animate-pulse">
            {side}
            </p>
        )}
      </div>

      <NeonButton onClick={flip} disabled={flipping} className="w-full">
        {flipping ? 'Flipping...' : 'Flip Coin'}
      </NeonButton>
    </GlassCard>
  );
};

// --- Lucky Number ---
export const LuckyNumber: React.FC = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [lucky, setLucky] = useState<number | null>(null);

  const generate = () => {
     const minVal = parseInt(min) || 0;
     const maxVal = parseInt(max) || 100;
     if (maxVal < minVal) return;
     
     const num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
     setLucky(num);
  };

  return (
    <GlassCard title="Lucky Number" className="h-full flex flex-col">
       <div className="grid grid-cols-2 gap-4 mb-4">
          <InputGroup label="Min" id="luck-min" type="number" value={min} onChange={e => setMin(e.target.value)} />
          <InputGroup label="Max" id="luck-max" type="number" value={max} onChange={e => setMax(e.target.value)} />
       </div>
       
       <div className="flex-grow flex items-center justify-center py-6">
          {lucky !== null ? (
             <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 dark:from-neonBlue dark:to-neonGreen animate-pulse">
                {lucky}
             </div>
          ) : (
             <div className="text-slate-400 text-sm font-medium">Set range & generate</div>
          )}
       </div>

       <NeonButton onClick={generate} className="w-full">
         <Sparkles size={18} /> Generate
       </NeonButton>
    </GlassCard>
  );
};

// --- Love Calculator ---
export const LoveCalculator: React.FC = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const calculate = () => {
     if (!name1 || !name2) return;
     const combined = (name1 + name2).toLowerCase().replace(/\s/g,'');
     let hash = 0;
     for (let i = 0; i < combined.length; i++) {
        hash = combined.charCodeAt(i) + ((hash << 5) - hash);
     }
     const percentage = Math.abs(hash % 101);
     setScore(percentage);
  };

  return (
    <GlassCard title="Love Calculator" className="h-full flex flex-col">
       <div className="space-y-4 mb-6">
          <InputGroup label="Your Name" id="love-1" value={name1} onChange={e => setName1(e.target.value)} placeholder="Romeo" />
          <InputGroup label="Partner's Name" id="love-2" value={name2} onChange={e => setName2(e.target.value)} placeholder="Juliet" />
       </div>

       <div className="flex-grow flex flex-col items-center justify-center relative min-h-[100px]">
          {score !== null ? (
             <>
               <Heart className={`text-red-600 fill-red-600 animate-pulse transition-all duration-1000 mb-2`} size={48 + (score/2)} />
               <div className="text-4xl font-bold text-slate-900 dark:text-white">{score}%</div>
               <div className="text-xs text-slate-500 mt-1 font-medium">
                 {score > 80 ? 'Soulmates!' : score > 50 ? 'Good Match' : 'Just Friends?'}
               </div>
             </>
          ) : (
             <Heart className="text-slate-300 dark:text-slate-700" size={48} />
          )}
       </div>

       <NeonButton onClick={calculate} variant="secondary" className="w-full mt-4">
          Calculate Love
       </NeonButton>
    </GlassCard>
  );
};

// -----------------------------------------------------
// CONTENT & TEXT PRODUCTIVITY TOOLS
// -----------------------------------------------------

// --- Text Statistics & Analyzer ---
export const TextStatistics: React.FC = () => {
  const [text, setText] = useState('');

  const stats = {
    chars: text.length,
    words: text.trim().split(/\s+/).filter(Boolean).length,
    sentences: text.split(/[.!?]+/).filter(Boolean).length,
    paragraphs: text.split(/\n+/).filter(Boolean).length,
    readingTime: 0
  };
  stats.readingTime = Math.ceil(stats.words / 200); // 200 wpm average

  return (
    <GlassCard title="Text Statistics" className="h-full flex flex-col">
      <textarea
        className="w-full h-32 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-sm outline-none mb-4 resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue focus:scale-[1.01] focus:shadow-md dark:focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] text-slate-900 dark:text-white placeholder-slate-400"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3 flex-grow">
        <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg text-center transition-transform hover:scale-105 border border-slate-200 dark:border-white/5">
           <div className="text-2xl font-bold text-blue-600 dark:text-neonBlue">{stats.words}</div>
           <div className="text-xs text-slate-600 dark:text-slate-500 font-medium">Words</div>
        </div>
        <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg text-center transition-transform hover:scale-105 border border-slate-200 dark:border-white/5">
           <div className="text-2xl font-bold text-purple-600 dark:text-neonPurple">{stats.chars}</div>
           <div className="text-xs text-slate-600 dark:text-slate-500 font-medium">Characters</div>
        </div>
        <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg text-center transition-transform hover:scale-105 border border-slate-200 dark:border-white/5">
           <div className="text-xl font-bold text-slate-800 dark:text-white">{stats.sentences}</div>
           <div className="text-xs text-slate-600 dark:text-slate-500 font-medium">Sentences</div>
        </div>
        <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-lg text-center transition-transform hover:scale-105 border border-slate-200 dark:border-white/5">
           <div className="text-xl font-bold text-slate-800 dark:text-white">{stats.readingTime}m</div>
           <div className="text-xs text-slate-600 dark:text-slate-500 font-medium">Read Time</div>
        </div>
      </div>
      <NeonButton onClick={() => setText('')} variant="secondary" className="w-full mt-4 h-10 py-0">Clear</NeonButton>
    </GlassCard>
  );
};

// --- Text Utility Master ---
export const TextUtility: React.FC = () => {
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');

  const process = (action: string) => {
    let res = text;
    if (action === 'upper') res = text.toUpperCase();
    if (action === 'lower') res = text.toLowerCase();
    if (action === 'title') res = text.toLowerCase().replace(/(?:^|\s)\w/g, a => a.toUpperCase());
    if (action === 'reverse') res = text.split('').reverse().join('');
    if (action === 'trim') res = text.replace(/\s+/g, ' ').trim();
    if (action === 'dedupe') res = [...new Set(text.split('\n'))].join('\n');
    
    setText(res);
    setMsg('Applied: ' + action);
    setTimeout(() => setMsg(''), 2000);
  };

  const copy = () => {
    navigator.clipboard.writeText(text);
    setMsg('Copied!');
    setTimeout(() => setMsg(''), 2000);
  };

  return (
    <GlassCard title="Text Utility" className="h-full flex flex-col">
       <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
         <button onClick={() => process('upper')} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-blue-500 hover:text-white dark:hover:bg-neonBlue dark:hover:text-slate-900 transition-colors whitespace-nowrap active:scale-95 font-medium text-slate-700 dark:text-white">UPPER</button>
         <button onClick={() => process('lower')} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-blue-500 hover:text-white dark:hover:bg-neonBlue dark:hover:text-slate-900 transition-colors whitespace-nowrap active:scale-95 font-medium text-slate-700 dark:text-white">lower</button>
         <button onClick={() => process('title')} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-blue-500 hover:text-white dark:hover:bg-neonBlue dark:hover:text-slate-900 transition-colors whitespace-nowrap active:scale-95 font-medium text-slate-700 dark:text-white">Title Case</button>
         <button onClick={() => process('reverse')} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-blue-500 hover:text-white dark:hover:bg-neonBlue dark:hover:text-slate-900 transition-colors whitespace-nowrap active:scale-95 font-medium text-slate-700 dark:text-white">Reverse</button>
       </div>
       <div className="flex gap-2 mb-3">
         <button onClick={() => process('trim')} className="flex-1 px-2 py-1.5 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-purple-500 hover:text-white dark:hover:bg-neonPurple dark:hover:text-white transition-colors flex items-center justify-center gap-1 active:scale-95 font-medium text-slate-700 dark:text-white"><Scissors size={12}/> Trim Space</button>
         <button onClick={() => process('dedupe')} className="flex-1 px-2 py-1.5 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-purple-500 hover:text-white dark:hover:bg-neonPurple dark:hover:text-white transition-colors flex items-center justify-center gap-1 active:scale-95 font-medium text-slate-700 dark:text-white"><Eraser size={12}/> Dedupe Lines</button>
       </div>
       
       <div className="relative flex-grow">
          <textarea
            className="w-full h-full min-h-[140px] bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-sm outline-none resize-none font-mono transition-all duration-300 focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue focus:scale-[1.01] text-slate-900 dark:text-white placeholder-slate-400"
            placeholder="Type or paste text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {msg && <div className="absolute top-2 right-2 bg-slate-900/90 text-white text-[10px] px-2 py-1 rounded fade-in shadow-md">{msg}</div>}
       </div>

       <div className="flex gap-2 mt-3">
         <NeonButton onClick={() => setText('')} variant="secondary" className="flex-1 h-10 py-0">Clear</NeonButton>
         <NeonButton onClick={copy} className="flex-1 h-10 py-0">Copy</NeonButton>
       </div>
    </GlassCard>
  );
};

// --- Dev Converter & Formatter ---
export const DevConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('json'); // json, base64, url

  const process = (action: 'fmt' | 'min' | 'enc' | 'dec') => {
    try {
      let res = input;
      if (mode === 'json') {
         if (action === 'fmt') res = JSON.stringify(JSON.parse(input), null, 2);
         if (action === 'min') res = JSON.stringify(JSON.parse(input));
      }
      if (mode === 'base64') {
         if (action === 'enc') res = btoa(input);
         if (action === 'dec') res = atob(input);
      }
      if (mode === 'url') {
         if (action === 'enc') res = encodeURIComponent(input);
         if (action === 'dec') res = decodeURIComponent(input);
      }
      setInput(res);
    } catch (e) {
      alert("Invalid input for this operation");
    }
  };

  return (
    <GlassCard title="Dev Converter" className="h-full flex flex-col">
       <div className="flex border-b border-slate-300 dark:border-white/10 mb-3">
          {['json', 'base64', 'url'].map(m => (
             <button 
               key={m} 
               onClick={() => setMode(m)}
               className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${mode === m ? 'text-blue-600 dark:text-neonBlue border-b-2 border-blue-600 dark:border-neonBlue' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
             >
               {m}
             </button>
          ))}
       </div>

       <textarea
          className="w-full flex-grow min-h-[120px] bg-slate-900 text-green-400 border border-slate-700 rounded-lg p-3 text-xs focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue outline-none resize-none font-mono mb-3 shadow-inner"
          placeholder={mode === 'json' ? 'Paste JSON...' : 'Paste Text...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
       />

       <div className="grid grid-cols-2 gap-3">
          {mode === 'json' && (
             <>
                <NeonButton onClick={() => process('fmt')} className="h-9 text-xs py-0">Prettify</NeonButton>
                <NeonButton onClick={() => process('min')} variant="secondary" className="h-9 text-xs py-0">Minify</NeonButton>
             </>
          )}
          {(mode === 'base64' || mode === 'url') && (
             <>
                <NeonButton onClick={() => process('enc')} className="h-9 text-xs py-0">Encode</NeonButton>
                <NeonButton onClick={() => process('dec')} variant="secondary" className="h-9 text-xs py-0">Decode</NeonButton>
             </>
          )}
       </div>
    </GlassCard>
  );
};

// --- SEO SERP Preview ---
export const SeoPreview: React.FC = () => {
  const [title, setTitle] = useState('ToolCraft AI - Premium Web Tools');
  const [desc, setDesc] = useState('Access a suite of free calculators and utilities. Boost productivity with our modern toolkit.');
  const [url, setUrl] = useState('toolcraft.ai/tools/productivity');

  return (
    <GlassCard title="SEO Preview" className="h-full flex flex-col">
       <div className="space-y-3 mb-4">
         <div>
            <label className="text-xs font-bold text-slate-600 mb-1 flex justify-between">
              <span>Title</span>
              <span className={title.length > 60 ? 'text-red-500' : 'text-green-600'}>{title.length}/60</span>
            </label>
            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-sm outline-none transition-all focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue text-slate-900 dark:text-white" value={title} onChange={e => setTitle(e.target.value)} />
         </div>
         <div>
            <label className="text-xs font-bold text-slate-600 mb-1 flex justify-between">
              <span>Description</span>
              <span className={desc.length > 160 ? 'text-red-500' : 'text-green-600'}>{desc.length}/160</span>
            </label>
            <textarea className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-sm outline-none h-16 resize-none transition-all focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue text-slate-900 dark:text-white" value={desc} onChange={e => setDesc(e.target.value)} />
         </div>
       </div>

       <div className="flex-grow bg-white p-4 rounded-xl border border-slate-300 shadow-md overflow-hidden transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] text-slate-700 font-bold border border-slate-200">G</div>
             <div className="flex flex-col">
                <span className="text-[11px] text-slate-900 font-bold">ToolCraft AI</span>
                <span className="text-[10px] text-slate-500 truncate max-w-[200px]">{url}</span>
             </div>
          </div>
          <h4 className="text-[#1a0dab] text-lg leading-tight hover:underline cursor-pointer truncate font-medium">{title}</h4>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2">{desc}</p>
       </div>
    </GlassCard>
  );
};

// --- Domain Generator ---
export const DomainTool: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [domains, setDomains] = useState<{name: string, status: boolean}[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if(!keyword) return;
    setLoading(true);
    setDomains([]);
    
    // Simulate generation and availability check
    setTimeout(() => {
      const tlds = ['.com', '.io', '.ai', '.app', '.xyz', '.net', '.co'];
      const prefixes = ['get', 'use', 'try', 'the', 'my', 'go'];
      const suffixes = ['hq', 'app', 'lab', 'box', 'ify', 'ly'];
      
      const results = [];
      
      // Exact match
      tlds.forEach(tld => {
        results.push({ name: keyword.toLowerCase() + tld, status: Math.random() > 0.7 });
      });
      
      // Mixes
      for(let i=0; i<4; i++) {
        const pre = prefixes[Math.floor(Math.random()*prefixes.length)];
        const suf = suffixes[Math.floor(Math.random()*suffixes.length)];
        const tld = tlds[Math.floor(Math.random()*tlds.length)];
        
        results.push({ name: `${pre}${keyword}${tld}`, status: Math.random() > 0.4 });
        results.push({ name: `${keyword}${suf}${tld}`, status: Math.random() > 0.4 });
      }
      
      setDomains(results.sort((a,b) => (a.status === b.status)? 0 : a.status? -1 : 1).slice(0, 8));
      setLoading(false);
    }, 1200);
  };

  return (
    <GlassCard title="Domain Name Gen" className="h-full flex flex-col">
      <div className="flex gap-2 mb-4">
        <input 
          className="flex-grow bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue focus:scale-[1.01] text-slate-900 dark:text-white"
          placeholder="Enter keyword (e.g. craft)"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && generate()}
        />
        <NeonButton onClick={generate} disabled={loading} className="w-12 px-0 flex items-center justify-center">
          <Search size={18} />
        </NeonButton>
      </div>
      
      <div className="flex-grow overflow-y-auto min-h-[150px] space-y-2 pr-1 custom-scrollbar">
        {loading ? (
          <div className="text-center py-8 text-slate-400 animate-pulse font-medium">Checking global availability...</div>
        ) : domains.length > 0 ? (
          domains.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 transition-colors hover:bg-slate-200 dark:hover:bg-white/10">
              <span className="font-bold text-sm text-slate-800 dark:text-gray-200">{d.name}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.status ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                {d.status ? 'AVAILABLE' : 'TAKEN'}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400 text-xs font-medium">Enter a keyword to generate ideas</div>
        )}
      </div>
    </GlassCard>
  );
};

// --- Web Performance Analyzer (Simulator) ---
export const WebAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [score, setScore] = useState<{perf:number, seo:number, access:number} | null>(null);
  const [stage, setStage] = useState('');

  const analyze = () => {
    if(!url) return;
    setAnalyzing(true);
    setScore(null);
    setStage('Connecting to server...');
    
    // Simulation steps
    setTimeout(() => setStage('Downloading assets...'), 800);
    setTimeout(() => setStage('Analyzing DOM structure...'), 1600);
    setTimeout(() => setStage('Checking SEO meta tags...'), 2400);
    setTimeout(() => setStage('Auditing accessibility...'), 3200);
    setTimeout(() => {
      setScore({
        perf: Math.floor(Math.random() * 40) + 60,
        seo: Math.floor(Math.random() * 30) + 70,
        access: Math.floor(Math.random() * 20) + 80
      });
      setAnalyzing(false);
    }, 4000);
  };

  const Gauge: React.FC<{val: number, label: string, color: string}> = ({val, label, color}) => (
    <div className="flex flex-col items-center animate-fade-in-up">
      <div className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg mb-2 transition-all hover:scale-110 ${color === 'green' ? 'border-green-500 text-green-600 dark:text-green-500' : color === 'orange' ? 'border-orange-500 text-orange-600 dark:text-orange-500' : 'border-red-500 text-red-600 dark:text-red-500'}`}>
        {val}
      </div>
      <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-500">{label}</span>
    </div>
  );

  return (
    <GlassCard title="Site Speed Audit" className="h-full flex flex-col">
       <div className="flex gap-2 mb-6">
         <input 
            className="flex-grow bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue focus:scale-[1.01] text-slate-900 dark:text-white"
            placeholder="https://example.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
         />
         <NeonButton onClick={analyze} disabled={analyzing} className="w-24 px-0 text-xs">
           {analyzing ? '...' : 'Analyze'}
         </NeonButton>
       </div>

       <div className="flex-grow flex items-center justify-center">
         {analyzing ? (
           <div className="text-center">
              <RefreshCw className="animate-spin text-blue-600 dark:text-neonBlue mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-medium">{stage}</p>
           </div>
         ) : score ? (
           <div className="w-full flex justify-around">
              <Gauge val={score.perf} label="Performance" color={score.perf > 80 ? 'green' : score.perf > 50 ? 'orange' : 'red'} />
              <Gauge val={score.seo} label="SEO" color={score.seo > 80 ? 'green' : score.seo > 50 ? 'orange' : 'red'} />
              <Gauge val={score.access} label="Accessibility" color={score.access > 80 ? 'green' : score.access > 50 ? 'orange' : 'red'} />
           </div>
         ) : (
           <div className="text-center text-slate-400 text-xs font-medium">
             <Globe className="mx-auto mb-2 opacity-50" size={32} />
             Enter URL to check performance
           </div>
         )}
       </div>
    </GlassCard>
  );
};

// --- Dummy Data Generator ---
export const DummyDataGen: React.FC = () => {
  const [type, setType] = useState('users');
  const [format, setFormat] = useState('json');
  const [count, setCount] = useState(5);
  const [data, setData] = useState('');

  const generate = () => {
    let res = [];
    const names = ['John', 'Jane', 'Alex', 'Chris', 'Katie', 'Mike'];
    const domains = ['gmail.com', 'yahoo.com', 'work.io', 'tech.net'];
    const products = ['Widget A', 'Super Gadget', 'Pro Tool', 'Smart Device'];
    
    for(let i=1; i<=count; i++) {
      if(type === 'users') {
        const n = names[Math.floor(Math.random()*names.length)];
        res.push({
           id: i,
           name: `${n} Doe`,
           email: `${n.toLowerCase()}${Math.floor(Math.random()*99)}@${domains[Math.floor(Math.random()*domains.length)]}`,
           active: Math.random() > 0.2
        });
      } else {
        res.push({
           id: 100+i,
           product: products[Math.floor(Math.random()*products.length)],
           price: Math.floor(Math.random()*500)+10,
           stock: Math.floor(Math.random()*50)
        });
      }
    }

    if(format === 'json') {
      setData(JSON.stringify(res, null, 2));
    } else {
      // Simple CSV
      const headers = Object.keys(res[0]).join(',');
      const rows = res.map(obj => Object.values(obj).join(',')).join('\n');
      setData(`${headers}\n${rows}`);
    }
  };

  return (
    <GlassCard title="Dummy Data" className="h-full flex flex-col">
       <div className="grid grid-cols-3 gap-2 mb-3">
         <select className="bg-slate-50 dark:bg-slate-800 rounded p-1 text-xs outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={type} onChange={e=>setType(e.target.value)}>
           <option value="users">Users</option>
           <option value="products">Products</option>
         </select>
         <select className="bg-slate-50 dark:bg-slate-800 rounded p-1 text-xs outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={format} onChange={e=>setFormat(e.target.value)}>
           <option value="json">JSON</option>
           <option value="csv">CSV</option>
         </select>
         <input type="number" className="bg-slate-50 dark:bg-slate-800 rounded p-1 text-xs outline-none pl-2 focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={count} onChange={e=>setCount(Number(e.target.value))} min="1" max="50" />
       </div>

       <textarea 
         className="flex-grow bg-slate-900 text-green-400 font-mono text-[10px] p-2 rounded-lg resize-none mb-3 outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue shadow-inner"
         value={data}
         readOnly
         placeholder="Generated data will appear here..."
       />
       
       <NeonButton onClick={generate} className="w-full h-8 text-xs py-0">Generate Data</NeonButton>
    </GlassCard>
  );
};

// --- Device Info ---
export const DeviceInfo: React.FC = () => {
  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    setInfo({
      ua: navigator.userAgent,
      lang: navigator.language,
      platform: navigator.platform,
      screen: `${window.screen.width} x ${window.screen.height}`,
      cores: navigator.hardwareConcurrency || 'N/A',
      memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'N/A',
      online: navigator.onLine ? 'Yes' : 'No'
    });
  }, []);

  const Item = ({label, val}: {label:string, val: string}) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-white/5 last:border-0 hover:bg-slate-100 dark:hover:bg-white/5 px-2 transition-colors rounded">
      <span className="text-xs text-slate-500 font-medium">{label}</span>
      <span className="text-sm font-bold text-slate-800 dark:text-gray-200 truncate max-w-[150px]" title={val}>{val}</span>
    </div>
  );

  return (
    <GlassCard title="My Device Info" className="h-full flex flex-col">
       <div className="flex-grow">
          <Item label="OS / Platform" val={info.platform} />
          <Item label="Screen Res" val={info.screen} />
          <Item label="Language" val={info.lang} />
          <Item label="CPU Cores" val={info.cores} />
          <Item label="Memory (RAM)" val={info.memory} />
          <Item label="Online Status" val={info.online} />
          <div className="mt-2">
            <span className="text-xs text-slate-500 font-medium block mb-1">User Agent</span>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-[10px] text-slate-700 dark:text-gray-400 break-all leading-tight border border-slate-200 dark:border-slate-700">
               {info.ua}
            </div>
          </div>
       </div>
    </GlassCard>
  );
};

// --- Todo Tracker ---
export const TodoTracker: React.FC = () => {
  const [tasks, setTasks] = useState<{id:number, text:string, done:boolean}[]>([
    {id: 1, text: "Check new tools", done: true}
  ]);
  const [input, setInput] = useState('');

  const add = () => {
    if(!input.trim()) return;
    setTasks([...tasks, {id: Date.now(), text: input, done: false}]);
    setInput('');
  };

  const toggle = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? {...t, done: !t.done} : t));
  };

  const remove = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <GlassCard title="Task Master" className="h-full flex flex-col">
       <div className="flex gap-2 mb-4">
          <input 
             className="flex-grow bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue transition-all focus:shadow-md text-slate-900 dark:text-white"
             placeholder="Add a task..."
             value={input}
             onChange={e => setInput(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && add()}
          />
          <button onClick={add} className="bg-blue-600 dark:bg-neonBlue text-white dark:text-slate-900 rounded-lg w-10 flex items-center justify-center hover:opacity-90 active:scale-95 transition-transform"><Plus size={18}/></button>
       </div>
       
       <div className="flex-grow overflow-y-auto space-y-2 max-h-[200px] pr-1 custom-scrollbar">
          {tasks.length > 0 ? tasks.map(t => (
             <div key={t.id} className={`flex items-center gap-3 p-2 rounded-lg transition-colors border ${t.done ? 'bg-slate-100 dark:bg-white/5 opacity-60 border-transparent' : 'bg-white dark:bg-slate-800 shadow-sm border-slate-200 dark:border-slate-700'}`}>
                <button onClick={() => toggle(t.id)} className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${t.done ? 'bg-green-500 border-green-500 text-white' : 'border-slate-400 dark:border-slate-600 text-transparent hover:border-blue-500'}`}>
                   <Check size={12} />
                </button>
                <span className={`flex-grow text-sm font-medium ${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-gray-200'}`}>{t.text}</span>
                <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
             </div>
          )) : <div className="text-center text-slate-400 text-xs mt-8 font-medium">No tasks yet</div>}
       </div>
    </GlassCard>
  );
};

// --- Budget Tracker ---
export const BudgetTracker: React.FC = () => {
  const [items, setItems] = useState<{id:number, desc:string, amount:number, type:'inc'|'exp'}[]>([]);
  const [desc, setDesc] = useState('');
  const [amt, setAmt] = useState('');
  const [type, setType] = useState<'inc'|'exp'>('exp');

  const add = () => {
    if(!desc || !amt) return;
    setItems([{id:Date.now(), desc, amount: parseFloat(amt), type}, ...items]);
    setDesc(''); setAmt('');
  };

  const balance = items.reduce((acc, item) => item.type === 'inc' ? acc + item.amount : acc - item.amount, 0);

  return (
    <GlassCard title="Budget Tracker" className="h-full flex flex-col">
       <div className="bg-slate-800 dark:bg-slate-900 text-white p-4 rounded-xl mb-4 flex justify-between items-center shadow-lg transition-transform hover:scale-[1.02]">
          <span className="text-sm opacity-80 font-medium">Balance</span>
          <span className={`text-xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>${balance.toFixed(2)}</span>
       </div>
       
       <div className="flex gap-2 mb-2">
          <input className="flex-[2] bg-slate-50 dark:bg-slate-800/50 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" placeholder="Item" value={desc} onChange={e=>setDesc(e.target.value)} />
          <input className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" type="number" placeholder="$" value={amt} onChange={e=>setAmt(e.target.value)} />
       </div>
       <div className="flex gap-2 mb-4">
          <button onClick={() => setType('inc')} className={`flex-1 py-1 text-xs rounded font-bold transition-all ${type==='inc' ? 'bg-green-600 text-white shadow-md' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>+ Income</button>
          <button onClick={() => setType('exp')} className={`flex-1 py-1 text-xs rounded font-bold transition-all ${type==='exp' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>- Expense</button>
          <button onClick={add} className="flex-none w-8 bg-blue-600 dark:bg-neonBlue text-white dark:text-slate-900 rounded flex items-center justify-center hover:shadow-md transition-shadow"><ArrowRight size={14}/></button>
       </div>

       <div className="flex-grow overflow-y-auto space-y-2 max-h-[150px] pr-1 custom-scrollbar">
          {items.map(i => (
             <div key={i.id} className="flex justify-between text-xs border-b border-slate-200 dark:border-white/5 py-1 last:border-0 font-medium">
                <span className="text-slate-700 dark:text-gray-300">{i.desc}</span>
                <span className={`font-bold ${i.type === 'inc' ? 'text-green-600' : 'text-red-600'}`}>
                   {i.type==='inc'?'+':'-'} ${i.amount}
                </span>
             </div>
          ))}
       </div>
    </GlassCard>
  );
};

// --- Habit Streak Tracker ---
export const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState([
    {id: 1, name: "Drink Water", streak: 3},
    {id: 2, name: "Read 10 pages", streak: 1}
  ]);
  const [newHabit, setNewHabit] = useState('');

  const add = () => {
    if(!newHabit) return;
    setHabits([...habits, {id: Date.now(), name: newHabit, streak: 0}]);
    setNewHabit('');
  };

  const increment = (id: number) => {
    setHabits(habits.map(h => h.id === id ? {...h, streak: h.streak + 1} : h));
  };

  return (
    <GlassCard title="Habit Streak" className="h-full flex flex-col">
       <div className="flex gap-2 mb-4">
          <input 
             className="flex-grow bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-purple-600 dark:focus:ring-neonPurple transition-all border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" 
             placeholder="New habit..."
             value={newHabit}
             onChange={e=>setNewHabit(e.target.value)}
          />
          <button onClick={add} className="bg-purple-600 dark:bg-neonPurple text-white rounded-lg px-3 text-xs font-bold hover:shadow-md active:scale-95 transition-all">Add</button>
       </div>

       <div className="space-y-3 flex-grow overflow-y-auto pr-1">
          {habits.map(h => (
            <div key={h.id} className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl flex items-center justify-between transition-transform hover:scale-[1.02] border border-slate-200 dark:border-white/5 shadow-sm">
               <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-gray-200">{h.name}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{h.streak} day streak 🔥</div>
               </div>
               <button onClick={() => increment(h.id)} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center text-slate-500">
                  <Check size={14} />
               </button>
            </div>
          ))}
       </div>
    </GlassCard>
  );
};

// --- Unit Converter ---
export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<'length'|'weight'|'temp'>('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [val, setVal] = useState<string>('');
  
  const categories = {
    length: ['m', 'km', 'cm', 'mm', 'ft', 'in', 'yd', 'mi'],
    weight: ['kg', 'g', 'lb', 'oz'],
    temp: ['C', 'F', 'K']
  };

  useEffect(() => {
     setFromUnit(categories[category][0]);
     setToUnit(categories[category][1]);
  }, [category]);

  const convert = () => {
     if(!val) return '---';
     const v = parseFloat(val);
     // ... conversion logic ...
     if (category === 'temp') {
        if(fromUnit === 'C' && toUnit === 'F') return (v * 9/5) + 32;
        if(fromUnit === 'F' && toUnit === 'C') return (v - 32) * 5/9;
        if(fromUnit === 'C' && toUnit === 'K') return v + 273.15;
        if(fromUnit === 'K' && toUnit === 'C') return v - 273.15;
        if(fromUnit === 'F' && toUnit === 'K') return (v - 32) * 5/9 + 273.15;
        if(fromUnit === 'K' && toUnit === 'F') return (v - 273.15) * 9/5 + 32;
        return v;
     }

     const factors: any = {
       length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, ft: 0.3048, in: 0.0254, yd: 0.9144, mi: 1609.34 },
       weight: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 }
     };

     if (!factors[category]) return v;
     const base = v * factors[category][fromUnit];
     return base / factors[category][toUnit];
  };

  const result = convert();

  return (
    <GlassCard title="Unit Converter" className="h-full flex flex-col">
       <div className="flex border-b border-slate-300 dark:border-white/10 mb-4">
         {Object.keys(categories).map(c => (
           <button 
             key={c}
             onClick={() => setCategory(c as any)}
             className={`flex-1 pb-2 text-xs font-bold uppercase transition-all duration-300 ${category === c ? 'text-blue-600 dark:text-neonBlue border-b-2 border-blue-600 dark:border-neonBlue drop-shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
           >
             {c}
           </button>
         ))}
       </div>

       <div className="space-y-4">
          <div className="flex gap-2">
            <input 
              type="number" 
              className="w-1/2 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue transition-all focus:scale-[1.02] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              placeholder="Value"
              value={val}
              onChange={e => setVal(e.target.value)}
            />
            <select 
              className="w-1/2 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-2 text-sm outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue transition-all border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              value={fromUnit}
              onChange={e => setFromUnit(e.target.value)}
            >
              {categories[category].map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
            </select>
          </div>
          
          <div className="flex justify-center text-slate-400"><ArrowRight size={20} className="rotate-90" /></div>

          <div className="flex gap-2">
            <div className="w-1/2 bg-slate-100 dark:bg-white/5 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono truncate border border-slate-300 dark:border-transparent transition-all hover:border-blue-400 font-bold">
               {typeof result === 'number' ? result.toLocaleString(undefined, {maximumFractionDigits: 4}) : result}
            </div>
            <select 
              className="w-1/2 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-2 text-sm outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue transition-all border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              value={toUnit}
              onChange={e => setToUnit(e.target.value)}
            >
              {categories[category].map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
            </select>
          </div>
       </div>
    </GlassCard>
  );
};

// --- Basic Calculator ---
export const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleInput = (val: string) => {
    if(val === 'C') {
       setDisplay('0');
       setEquation('');
    } else if (val === '=') {
       try {
          // eslint-disable-next-line no-eval
          const res = eval(equation.replace(/×/g, '*').replace(/÷/g, '/'));
          setDisplay(String(res));
          setEquation(String(res));
       } catch {
          setDisplay('Error');
       }
    } else {
       if (display === '0' && !['+', '-', '×', '÷'].includes(val)) {
          setDisplay(val);
          setEquation(val);
       } else {
          setDisplay(display + val);
          setEquation(equation + val);
       }
    }
  };

  const btns = ['C', '÷', '×', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'];

  return (
    <GlassCard title="Basic Calculator" className="h-full flex flex-col">
       <div className="bg-slate-900 text-right p-4 rounded-xl mb-4 text-white font-mono text-2xl overflow-hidden shadow-inner border border-slate-700">
          {display}
       </div>
       <div className="grid grid-cols-4 gap-2 flex-grow">
          {btns.map(b => (
             <button 
               key={b}
               onClick={() => handleInput(b)}
               className={`rounded-lg font-bold text-lg transition-all active:scale-95 hover:shadow-lg border ${
                 b === '=' ? 'row-span-2 bg-blue-600 dark:bg-neonBlue text-white dark:text-slate-900 hover:brightness-110 border-transparent' : 
                 ['C', '÷', '×', '-', '+'].includes(b) ? 'bg-slate-200 dark:bg-slate-700 text-purple-700 dark:text-neonPurple hover:bg-slate-300 dark:hover:bg-slate-600 border-slate-300 dark:border-slate-600' : 
                 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
               } ${b === '0' ? 'col-span-2' : ''}`}
             >
               {b}
             </button>
          ))}
       </div>
    </GlassCard>
  );
};

// --- Percentage Calculator ---
export const PercentageCalculator: React.FC = () => {
  const [mode, setMode] = useState<'simple'|'phrase'|'change'>('simple');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const calculate = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if(isNaN(v1) || isNaN(v2)) return null;

    if(mode === 'simple') return (v1 * v2) / 100; // X% of Y
    if(mode === 'phrase') return (v1 / v2) * 100; // X is what % of Y
    if(mode === 'change') return ((v2 - v1) / v1) * 100; // Change from X to Y
    return 0;
  };

  const res = calculate();

  return (
    <GlassCard title="Percentage Calc" className="h-full flex flex-col">
       <div className="flex justify-between mb-4 bg-slate-100 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-transparent">
          <button onClick={()=>setMode('simple')} className={`flex-1 text-[10px] py-1 rounded transition-all duration-300 ${mode==='simple' ? 'bg-white dark:bg-slate-700 shadow-sm text-purple-700 dark:text-neonPurple scale-105 font-bold' : 'text-slate-500 hover:text-slate-700'}`}>% of</button>
          <button onClick={()=>setMode('phrase')} className={`flex-1 text-[10px] py-1 rounded transition-all duration-300 ${mode==='phrase' ? 'bg-white dark:bg-slate-700 shadow-sm text-purple-700 dark:text-neonPurple scale-105 font-bold' : 'text-slate-500 hover:text-slate-700'}`}>what %</button>
          <button onClick={()=>setMode('change')} className={`flex-1 text-[10px] py-1 rounded transition-all duration-300 ${mode==='change' ? 'bg-white dark:bg-slate-700 shadow-sm text-purple-700 dark:text-neonPurple scale-105 font-bold' : 'text-slate-500 hover:text-slate-700'}`}>change</button>
       </div>

       <div className="space-y-3 flex-grow">
          <div className="flex items-center gap-2">
             <span className="text-sm w-8 font-medium text-slate-600 dark:text-gray-400">{mode === 'simple' ? 'What is' : mode === 'phrase' ? '' : 'From'}</span>
             <input type="number" className="flex-grow bg-slate-50 dark:bg-slate-800/50 rounded p-2 outline-none focus:ring-1 focus:ring-purple-600 dark:focus:ring-neonPurple transition-all border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={val1} onChange={e=>setVal1(e.target.value)} placeholder={mode === 'simple' ? '20' : '50'} />
             <span className="text-sm font-medium text-slate-600 dark:text-gray-400">{mode === 'simple' ? '% of' : mode === 'phrase' ? 'is what % of' : 'to'}</span>
          </div>
          <div className="flex items-center gap-2">
             <input type="number" className="flex-grow bg-slate-50 dark:bg-slate-800/50 rounded p-2 outline-none focus:ring-1 focus:ring-purple-600 dark:focus:ring-neonPurple transition-all border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={val2} onChange={e=>setVal2(e.target.value)} placeholder={mode === 'simple' ? '100' : '200'} />
             <span className="text-sm w-4 font-bold text-slate-600 dark:text-gray-400">?</span>
          </div>

          {res !== null && (
             <div className="mt-4 p-4 bg-slate-100 dark:bg-white/5 rounded-xl text-center border border-slate-300 dark:border-white/10">
                <span className="text-xs text-slate-600 dark:text-slate-500 block mb-1 font-medium">Result</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-neonBlue animate-pulse">
                   {res.toFixed(2)}{mode !== 'simple' ? '%' : ''}
                </span>
             </div>
          )}
       </div>
    </GlassCard>
  );
};

// --- Discount Calculator ---
export const DiscountCalculator: React.FC = () => {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');

  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  const t = parseFloat(tax) || 0;

  const saveAmount = (p * d) / 100;
  const afterDisc = p - saveAmount;
  const taxAmount = (afterDisc * t) / 100;
  const final = afterDisc + taxAmount;

  return (
    <GlassCard title="Discount Calc" className="h-full flex flex-col">
       <div className="space-y-3 mb-4">
          <InputGroup label="Original Price" id="disc-price" type="number" value={price} onChange={e=>setPrice(e.target.value)} />
          <div className="flex gap-2">
             <div className="flex-1">
                <label className="text-xs font-bold text-slate-600 mb-1 block">Discount %</label>
                <input type="number" className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue transition-all border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={discount} onChange={e=>setDiscount(e.target.value)} />
             </div>
             <div className="flex-1">
                <label className="text-xs font-bold text-slate-600 mb-1 block">Tax %</label>
                <input type="number" className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neonBlue transition-all border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" value={tax} onChange={e=>setTax(e.target.value)} />
             </div>
          </div>
       </div>

       <div className="space-y-2 bg-slate-100 dark:bg-white/5 p-4 rounded-xl transition-transform hover:scale-[1.01] border border-slate-300 dark:border-white/10">
          <div className="flex justify-between text-sm">
             <span className="text-slate-600 dark:text-slate-500 font-medium">Savings</span>
             <span className="text-green-600 font-bold">-${saveAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-slate-300 dark:border-white/10 pb-2">
             <span className="text-slate-600 dark:text-slate-500 font-medium">Tax</span>
             <span className="text-slate-800 dark:text-gray-300 font-bold">+${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
             <span className="font-bold text-slate-900 dark:text-white">Final Price</span>
             <span className="text-2xl font-bold text-blue-600 dark:text-neonBlue">${final.toFixed(2)}</span>
          </div>
       </div>
    </GlassCard>
  );
};

// --- YouTube Title Generator ---
export const YouTubeTitleGen: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!topic) return;
    setLoading(true);
    setTimeout(() => {
      setTitles([
        `Why ${topic} is Taking Over the World`,
        `The Ultimate Guide to ${topic} (2024)`,
        `I Tried ${topic} for 30 Days`,
        `Stop Doing ${topic} Like This!`,
        `The Secret Truth About ${topic}`,
        `10 ${topic} Hacks You Need to Know`
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <GlassCard title="YouTube Title Generator" className="h-full flex flex-col">
       <div className="flex gap-2 mb-4">
         <input 
           className="flex-grow bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 outline-none transition-all duration-300 focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:scale-[1.01] text-slate-900 dark:text-white"
           placeholder="Enter video topic..."
           value={topic}
           onChange={e => setTopic(e.target.value)}
           onKeyDown={e => e.key === 'Enter' && generate()}
         />
         <NeonButton onClick={generate} disabled={loading} className="w-12 px-0 flex items-center justify-center !bg-gradient-to-r !from-red-600 !to-red-800">
           <Youtube size={18} />
         </NeonButton>
       </div>
       <div className="flex-grow overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {titles.length > 0 ? titles.map((t, i) => (
             <div key={i} className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(t)}>
                <span className="text-sm font-medium text-slate-800 dark:text-gray-200">{t}</span>
                <Copy size={14} className="opacity-0 group-hover:opacity-100 text-slate-400" />
             </div>
          )) : <div className="text-center py-8 text-slate-400 text-xs">Enter topic to generate viral titles</div>}
       </div>
    </GlassCard>
  );
};

// --- Reel Hooks Generator ---
export const ReelHooksGen: React.FC = () => {
    const [niche, setNiche] = useState('');
    const [hooks, setHooks] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const generate = () => {
        if(!niche) return;
        setLoading(true);
        setTimeout(() => {
            setHooks([
                `Stop scrolling if you want to fix ${niche}!`,
                `The number one mistake people make with ${niche}...`,
                `Here is how I mastered ${niche} in 30 days.`,
                `You won't believe this ${niche} hack.`,
                `3 tools for ${niche} you need today.`
            ]);
            setLoading(false);
        }, 1000);
    };

    return (
        <GlassCard title="Reel Hooks Generator" className="h-full flex flex-col">
            <div className="flex gap-2 mb-4">
                <input 
                  className="flex-grow bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-600 dark:focus:ring-neonPurple focus:scale-[1.01] text-slate-900 dark:text-white"
                  placeholder="Enter niche (e.g. Fitness)"
                  value={niche}
                  onChange={e => setNiche(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && generate()}
                />
                <NeonButton onClick={generate} disabled={loading} className="w-12 px-0 flex items-center justify-center">
                    <Sparkles size={18} />
                </NeonButton>
            </div>
            <div className="flex-grow overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {hooks.map((h, i) => (
                    <div key={i} className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(h)}>
                        <span className="text-sm font-medium text-slate-800 dark:text-gray-200">{h}</span>
                        <Copy size={14} className="opacity-0 group-hover:opacity-100 text-slate-400" />
                    </div>
                ))}
            </div>
        </GlassCard>
    );
};

// --- Virality Score ---
export const ViralityScore: React.FC = () => {
    const [idea, setIdea] = useState('');
    const [score, setScore] = useState<number | null>(null);
    const [analyzing, setAnalyzing] = useState(false);

    const analyze = () => {
        if(!idea) return;
        setAnalyzing(true);
        setScore(null);
        setTimeout(() => {
            setScore(Math.floor(Math.random() * 40) + 60); // 60-100
            setAnalyzing(false);
        }, 1500);
    };

    return (
        <GlassCard title="Virality Score AI" className="h-full flex flex-col">
            <textarea
                className="w-full h-32 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-sm outline-none resize-none transition-all focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue text-slate-900 dark:text-white placeholder-slate-400 mb-4"
                placeholder="Describe your content idea..."
                value={idea}
                onChange={e => setIdea(e.target.value)}
            />
            <div className="flex-grow flex items-center justify-center">
                {analyzing ? (
                    <Loader2 className="animate-spin text-blue-600 dark:text-neonBlue" size={32} />
                ) : score !== null ? (
                    <div className="text-center">
                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neonBlue dark:to-neonPurple mb-2">{score}/100</div>
                        <p className="text-sm text-slate-500">{score > 80 ? 'Viral Potential! 🔥' : 'Good, but needs a hook.'}</p>
                    </div>
                ) : (
                    <p className="text-xs text-slate-400">AI analysis of viral probability</p>
                )}
            </div>
            <NeonButton onClick={analyze} disabled={analyzing} className="w-full mt-4">Check Score</NeonButton>
        </GlassCard>
    );
};

// --- Hashtag Reach ---
export const HashtagReach: React.FC = () => {
    const [tag, setTag] = useState('');
    const [data, setData] = useState<{reach: string, competition: string} | null>(null);

    const check = () => {
        if(!tag) return;
        // Mock data
        const reach = Math.floor(Math.random() * 1000000) + 5000;
        const comp = ['Low', 'Medium', 'High', 'Very High'][Math.floor(Math.random() * 4)];
        setData({ reach: reach.toLocaleString(), competition: comp });
    };

    return (
        <GlassCard title="Hashtag Reach" className="h-full flex flex-col">
            <div className="flex gap-2 mb-6">
                 <div className="relative flex-grow">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">#</span>
                    <input className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg pl-7 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue text-slate-900 dark:text-white" value={tag} onChange={e => setTag(e.target.value)} placeholder="hashtag" onKeyDown={e => e.key === 'Enter' && check()} />
                 </div>
                 <NeonButton onClick={check} className="w-12 px-0 flex items-center justify-center"><Search size={18}/></NeonButton>
            </div>
            <div className="flex-grow flex flex-col justify-center space-y-4">
                {data ? (
                    <>
                    <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 text-center">
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Est. Reach</div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">{data.reach}</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 text-center">
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Competition</div>
                        <div className={`text-2xl font-black ${data.competition === 'High' ? 'text-red-500' : 'text-green-500'}`}>{data.competition}</div>
                    </div>
                    </>
                ) : <div className="text-center text-slate-400 text-xs">Enter a hashtag to analyze</div>}
            </div>
        </GlassCard>
    );
};

// --- Bio Audit ---
export const BioAudit: React.FC = () => {
    const [bio, setBio] = useState('');
    const [audit, setAudit] = useState<any>(null);

    const runAudit = () => {
        const hasLink = bio.includes('http') || bio.includes('www');
        const hasEmoji = /\p{Emoji}/u.test(bio);
        const length = bio.length;
        const score = Math.min(100, (hasLink ? 30 : 0) + (hasEmoji ? 20 : 0) + (length > 20 && length < 150 ? 50 : 20));
        setAudit({ score, tips: [
            !hasLink && "Add a link (Linktree/Website)",
            !hasEmoji && "Use emojis to break text",
            (length < 20 || length > 150) && "Keep length between 20-150 chars"
        ].filter(Boolean)});
    };

    return (
        <GlassCard title="Instagram Bio Audit" className="h-full flex flex-col">
            <textarea className="w-full h-24 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-sm outline-none resize-none mb-4 focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue text-slate-900 dark:text-white" placeholder="Paste your bio..." value={bio} onChange={e => setBio(e.target.value)} />
            <NeonButton onClick={runAudit} className="w-full mb-4">Audit Bio</NeonButton>
            {audit && (
                <div className="flex-grow bg-slate-100 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-700 dark:text-white">Score</span>
                        <span className={`text-xl font-black ${audit.score > 70 ? 'text-green-500' : 'text-orange-500'}`}>{audit.score}/100</span>
                    </div>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4">
                        {audit.tips.length > 0 ? audit.tips.map((t: string, i: number) => <li key={i}>{t}</li>) : <li>Great Bio!</li>}
                    </ul>
                </div>
            )}
        </GlassCard>
    );
};

// --- Thumbnail Analyzer ---
export const ThumbnailAnalyzer: React.FC = () => {
    const [text, setText] = useState('');
    
    return (
        <GlassCard title="Thumbnail Text Checker" className="h-full flex flex-col">
            <InputGroup label="Thumbnail Text" id="thumb-txt" value={text} onChange={e => setText(e.target.value)} placeholder="e.g., I QUIT!" />
            <div className="flex-grow flex items-center justify-center bg-slate-900 rounded-xl mb-4 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" className="opacity-30 absolute inset-0 w-full h-full object-cover" alt="bg" />
                <h1 className="relative z-10 text-white font-black text-4xl uppercase drop-shadow-lg text-center px-4 leading-tight transform -rotate-2">
                    {text || "YOUR TEXT"}
                </h1>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className={`p-2 rounded border ${text.length < 20 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>Length: {text.length}/20</div>
                <div className={`p-2 rounded border ${!text.includes(' ') ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>Readability</div>
            </div>
        </GlassCard>
    );
};

// --- Post Time Optimizer ---
export const PostTimeOptimizer: React.FC = () => {
    const [platform, setPlatform] = useState('Instagram');
    const times: any = {
        Instagram: ['9:00 AM', '12:00 PM', '7:00 PM'],
        YouTube: ['2:00 PM', '4:00 PM', '8:00 PM'],
        LinkedIn: ['8:00 AM', '10:00 AM', '1:00 PM'],
        TikTok: ['6:00 AM', '10:00 AM', '9:00 PM']
    };

    return (
        <GlassCard title="Best Time to Post" className="h-full flex flex-col">
            <select className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 outline-none mb-6 focus:ring-2 focus:ring-blue-600 dark:focus:ring-neonBlue text-slate-900 dark:text-white" value={platform} onChange={e => setPlatform(e.target.value)}>
                {Object.keys(times).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <div className="flex-grow space-y-3">
                {times[platform].map((t: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                        <Clock className="text-blue-600 dark:text-neonBlue" />
                        <span className="text-lg font-bold text-slate-800 dark:text-white">{t}</span>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
};

// --- Engagement Rate ---
export const EngagementRate: React.FC = () => {
    const [followers, setFollowers] = useState('');
    const [likes, setLikes] = useState('');
    const [comments, setComments] = useState('');
    const [rate, setRate] = useState<number | null>(null);

    const calc = () => {
        const f = parseFloat(followers);
        const l = parseFloat(likes);
        const c = parseFloat(comments);
        if(f && l && c >= 0) {
            setRate(((l + c) / f) * 100);
        }
    };

    return (
        <GlassCard title="Engagement Calculator" className="h-full flex flex-col">
            <div className="space-y-3 mb-4">
                <InputGroup label="Followers" id="eng-f" type="number" value={followers} onChange={e => setFollowers(e.target.value)} />
                <div className="flex gap-2">
                    <InputGroup label="Likes" id="eng-l" type="number" value={likes} onChange={e => setLikes(e.target.value)} />
                    <InputGroup label="Comments" id="eng-c" type="number" value={comments} onChange={e => setComments(e.target.value)} />
                </div>
            </div>
            <NeonButton onClick={calc} className="w-full">Calculate</NeonButton>
            {rate !== null && (
                <div className="mt-4 text-center p-4 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-300 dark:border-white/10">
                    <div className="text-3xl font-black text-blue-600 dark:text-neonBlue">{rate.toFixed(2)}%</div>
                    <div className="text-xs text-slate-500 font-bold uppercase">Engagement Rate</div>
                </div>
            )}
        </GlassCard>
    );
};

// --- Exam Rank Predictor ---
export const ExamRankPredictor: React.FC = () => {
    const [marks, setMarks] = useState('');
    const [total, setTotal] = useState('100');
    const [rank, setRank] = useState<string>('');

    const predict = () => {
        const m = parseFloat(marks);
        const t = parseFloat(total);
        if(!m || !t) return;
        const percent = (m/t)*100;
        let r = '';
        if(percent > 95) r = 'Top 1%';
        else if(percent > 90) r = 'Top 5%';
        else if(percent > 80) r = 'Top 15%';
        else if(percent > 60) r = 'Average';
        else r = 'Needs Improvement';
        setRank(r);
    };

    return (
        <GlassCard title="Rank Predictor" className="h-full flex flex-col">
            <div className="flex gap-2 mb-4">
                <InputGroup label="Marks Scored" id="rank-m" type="number" value={marks} onChange={e => setMarks(e.target.value)} />
                <InputGroup label="Total Marks" id="rank-t" type="number" value={total} onChange={e => setTotal(e.target.value)} />
            </div>
            <NeonButton onClick={predict} className="w-full">Predict Rank</NeonButton>
            {rank && (
                 <div className="mt-6 text-center animate-bounce-in">
                    <GraduationCap size={48} className="mx-auto text-blue-600 dark:text-neonBlue mb-2" />
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{rank}</div>
                 </div>
            )}
        </GlassCard>
    );
};

// --- Attendance Calculator ---
export const AttendanceCalc: React.FC = () => {
    const [attended, setAttended] = useState('');
    const [total, setTotal] = useState('');
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const a = parseInt(attended);
        const t = parseInt(total);
        if(isNaN(a) || isNaN(t) || t === 0) return;
        const current = (a/t)*100;
        const target = 75;
        let status = '';
        let advice = '';

        if(current >= target) {
            const bunkable = Math.floor((a - 0.75 * t) / 0.75);
            status = 'Safe Zone';
            advice = `You can bunk ${bunkable} classes.`;
        } else {
            const need = Math.ceil((0.75 * t - a) / 0.25);
            status = 'Danger Zone';
            advice = `Attend next ${need} classes.`;
        }
        setRes({ current, status, advice });
    };

    return (
        <GlassCard title="Attendance Manager" className="h-full flex flex-col">
            <div className="flex gap-2 mb-4">
                <InputGroup label="Attended" id="att-a" type="number" value={attended} onChange={e => setAttended(e.target.value)} />
                <InputGroup label="Total" id="att-t" type="number" value={total} onChange={e => setTotal(e.target.value)} />
            </div>
            <NeonButton onClick={calc} className="w-full">Check Status</NeonButton>
            {res && (
                <div className={`mt-4 p-4 rounded-xl border ${res.current >= 75 ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    <div className="text-3xl font-bold mb-1">{res.current.toFixed(1)}%</div>
                    <div className="font-bold mb-1">{res.status}</div>
                    <div className="text-sm">{res.advice}</div>
                </div>
            )}
        </GlassCard>
    );
};

// --- Project Risk ---
export const ProjectRisk: React.FC = () => {
    const [days, setDays] = useState('');
    const [tasks, setTasks] = useState('');
    const [risk, setRisk] = useState('');

    const calc = () => {
        const d = parseFloat(days);
        const t = parseFloat(tasks);
        if(!d || !t) return;
        const ratio = t/d;
        if(ratio < 1) setRisk('Low Risk (Chill)');
        else if(ratio < 3) setRisk('Medium Risk (Focus)');
        else setRisk('High Risk (Panic Mode)');
    };

    return (
        <GlassCard title="Deadline Risk Analysis" className="h-full flex flex-col">
            <InputGroup label="Days Left" id="risk-d" type="number" value={days} onChange={e => setDays(e.target.value)} />
            <InputGroup label="Tasks Remaining" id="risk-t" type="number" value={tasks} onChange={e => setTasks(e.target.value)} />
            <NeonButton onClick={calc} variant="secondary" className="w-full">Analyze</NeonButton>
            {risk && (
                <div className="mt-4 text-center font-bold text-xl text-slate-900 dark:text-white animate-pulse">
                    {risk}
                </div>
            )}
        </GlassCard>
    );
};

// --- Internship Score ---
export const InternshipScore: React.FC = () => {
    const [gpa, setGpa] = useState('');
    const [projects, setProjects] = useState('');
    const [score, setScore] = useState<number | null>(null);

    const calc = () => {
        const g = parseFloat(gpa) || 0;
        const p = parseFloat(projects) || 0;
        const normGpa = g > 4 ? g : g * 2.5; 
        const s = Math.min(100, (normGpa * 6) + (p * 10));
        setScore(Math.round(s));
    };

    return (
        <GlassCard title="Internship Ready?" className="h-full flex flex-col">
            <InputGroup label="GPA / CGPA" id="int-g" type="number" value={gpa} onChange={e => setGpa(e.target.value)} />
            <InputGroup label="Projects Completed" id="int-p" type="number" value={projects} onChange={e => setProjects(e.target.value)} />
            <NeonButton onClick={calc} className="w-full">Get Score</NeonButton>
            {score !== null && (
                <div className="mt-6 relative h-6 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-neonBlue transition-all duration-1000" style={{width: `${score}%`}}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">{score}% Ready</div>
                </div>
            )}
        </GlassCard>
    );
};

// --- Typing Rank ---
export const TypingRank: React.FC = () => {
    const [wpm, setWpm] = useState('');
    const [rank, setRank] = useState('');

    const check = () => {
        const w = parseFloat(wpm);
        if(!w) return;
        if(w < 40) setRank('Novice (Top 60%)');
        else if(w < 60) setRank('Average (Top 40%)');
        else if(w < 80) setRank('Pro (Top 20%)');
        else if(w < 100) setRank('Master (Top 5%)');
        else setRank('God Mode (Top 1%)');
    };

    return (
        <GlassCard title="Typing Speed Rank" className="h-full flex flex-col">
            <InputGroup label="Your WPM" id="type-w" type="number" value={wpm} onChange={e => setWpm(e.target.value)} />
            <NeonButton onClick={check} className="w-full">Check Rank</NeonButton>
            {rank && <div className="mt-6 text-center text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">{rank}</div>}
        </GlassCard>
    );
};

// --- Salary Hike ---
export const SalaryHike: React.FC = () => {
    const [current, setCurrent] = useState('');
    const [rating, setRating] = useState('3');
    const [hike, setHike] = useState<{newSal: number, percent: number} | null>(null);

    const calc = () => {
        const c = parseFloat(current);
        const r = parseFloat(rating);
        if(!c) return;
        const p = r * 3 + Math.random() * 2;
        const increase = c * (p/100);
        setHike({ newSal: c + increase, percent: p });
    };

    return (
        <GlassCard title="Appraisal Predictor" className="h-full flex flex-col">
            <InputGroup label="Current CTC" id="sal-c" type="number" value={current} onChange={e => setCurrent(e.target.value)} />
            <div className="mb-4">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-1">Performance Rating (1-5)</label>
                <input type="range" min="1" max="5" step="0.5" value={rating} onChange={e => setRating(e.target.value)} className="w-full accent-blue-600 dark:accent-neonBlue" />
                <div className="text-center font-bold">{rating}</div>
            </div>
            <NeonButton onClick={calc} className="w-full">Predict</NeonButton>
            {hike && (
                <div className="mt-4 p-4 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-center">
                    <div className="text-sm text-slate-500">Predicted Hike</div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">+{hike.percent.toFixed(1)}%</div>
                    <div className="text-sm font-medium mt-1">New: {hike.newSal.toFixed(0)}</div>
                </div>
            )}
        </GlassCard>
    );
};

// --- Office Score ---
export const OfficeScore: React.FC = () => {
    const [tasks, setTasks] = useState('');
    const [hours, setHours] = useState('');
    const [score, setScore] = useState<number | null>(null);

    const calc = () => {
        const t = parseFloat(tasks);
        const h = parseFloat(hours);
        if(!t || !h) return;
        const val = (t / h) * 10;
        setScore(Math.min(10, Math.max(0, val)));
    };

    return (
        <GlassCard title="Productivity Score" className="h-full flex flex-col">
            <InputGroup label="Tasks Completed" id="off-t" type="number" value={tasks} onChange={e => setTasks(e.target.value)} />
            <InputGroup label="Hours Worked" id="off-h" type="number" value={hours} onChange={e => setHours(e.target.value)} />
            <NeonButton onClick={calc} className="w-full">Calculate</NeonButton>
            {score !== null && (
                <div className="mt-6 flex flex-col items-center">
                    <div className={`text-4xl font-bold ${score > 7 ? 'text-green-500' : score > 4 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {score.toFixed(1)}/10
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                        {score > 7 ? 'Productivity Machine! 🤖' : 'Keep Pushing! 🚀'}
                    </div>
                </div>
            )}
        </GlassCard>
    );
};

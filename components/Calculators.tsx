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
  TrendingUp, AlertTriangle, Keyboard, UserCheck, Calendar
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
            className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-neonBlue outline-none transition-all duration-300 focus:scale-[1.02]"
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
        <div className="h-[200px] w-full bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden flex items-center justify-center transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.15)]">
          {qrUrl ? (
            <img src={qrUrl} alt="QR Code" className="rounded-lg shadow-lg mix-blend-multiply dark:mix-blend-screen" />
          ) : (
            <p className="text-gray-500 text-sm">QR Code will appear here</p>
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
             <label key={key} className="flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
               <input
                 type="checkbox"
                 checked={options[key as keyof typeof options]}
                 onChange={() => setOptions({...options, [key]: !options[key as keyof typeof options]})}
                 className="form-checkbox rounded text-neonPurple focus:ring-0 bg-slate-200 dark:bg-slate-700 border-none mr-2 transition-transform active:scale-90"
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
        <div className="w-full bg-white dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-xl p-4 font-mono text-center text-lg min-h-[60px] flex items-center justify-center break-all text-neonGreen shadow-inner transition-all group-hover:border-neonGreen/30">
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
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Count</label>
            <div className="flex items-center space-x-2">
               <button onClick={() => setNumDice(Math.max(1, numDice - 1))} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs hover:bg-slate-300 hover:shadow-md active:scale-95 transition-all">-</button>
               <span className="font-bold text-lg w-6 text-center">{numDice}</span>
               <button onClick={() => setNumDice(Math.min(6, numDice + 1))} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs hover:bg-slate-300 hover:shadow-md active:scale-95 transition-all">+</button>
            </div>
         </div>
         <div>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">Type</label>
            <select 
               value={sides} 
               onChange={(e) => setSides(Number(e.target.value))}
               className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-neonBlue transition-all focus:scale-[1.02]"
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

       <div className="flex-grow flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl mb-4 min-h-[160px]">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
             {results.map((val, idx) => (
                <div 
                  key={idx} 
                  className={`w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-md transition-transform duration-100 ${rolling ? 'scale-90 rotate-12 opacity-80' : 'scale-100'} ${sides !== 6 ? 'text-white' : ''}`}
                  style={{
                     backgroundColor: sides === 6 ? 'white' : sides === 20 ? '#dc2626' : sides === 12 ? '#9333ea' : sides === 10 ? '#2563eb' : sides === 8 ? '#16a34a' : '#ea580c',
                     borderRadius: sides === 6 ? '12px' : '50%', // Simple approximation for non-D6
                     color: sides === 6 ? '#0f172a' : 'white'
                  }}
                >
                   {val}
                </div>
             ))}
          </div>
          <div className="text-slate-500 text-sm font-medium">
             Total: <span className="text-neonBlue font-bold text-lg">{total}</span>
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
  const colors = ['#00f3ff', '#bc13fe', '#0aff60', '#ff0055', '#ffaa00', '#6b7280'];

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
          className="w-40 h-40 rounded-full border-4 border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl relative transition-transform cubic-bezier(0.25, 0.1, 0.25, 1)"
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
         {result && <div className="text-xl font-bold text-neonBlue animate-pulse">{result}</div>}
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
             <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonGreen animate-pulse">
                {lucky}
             </div>
          ) : (
             <div className="text-slate-400 text-sm">Set range & generate</div>
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
               <Heart className={`text-red-500 fill-red-500 animate-pulse transition-all duration-1000 mb-2`} size={48 + (score/2)} />
               <div className="text-4xl font-bold text-slate-800 dark:text-white">{score}%</div>
               <div className="text-xs text-slate-500 mt-1">
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
        className="w-full h-32 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-sm outline-none mb-4 resize-none transition-all duration-300 focus:ring-2 focus:ring-neonBlue focus:scale-[1.01] focus:shadow-[0_0_15px_rgba(0,243,255,0.1)]"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3 flex-grow">
        <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-lg text-center transition-transform hover:scale-105">
           <div className="text-2xl font-bold text-neonBlue">{stats.words}</div>
           <div className="text-xs text-slate-500">Words</div>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-lg text-center transition-transform hover:scale-105">
           <div className="text-2xl font-bold text-neonPurple">{stats.chars}</div>
           <div className="text-xs text-slate-500">Characters</div>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-lg text-center transition-transform hover:scale-105">
           <div className="text-xl font-bold text-slate-800 dark:text-white">{stats.sentences}</div>
           <div className="text-xs text-slate-500">Sentences</div>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-lg text-center transition-transform hover:scale-105">
           <div className="text-xl font-bold text-slate-800 dark:text-white">{stats.readingTime}m</div>
           <div className="text-xs text-slate-500">Read Time</div>
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
         <button onClick={() => process('upper')} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-neonBlue hover:text-slate-900 transition-colors whitespace-nowrap active:scale-95">UPPER</button>
         <button onClick={() => process('lower')} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-neonBlue hover:text-slate-900 transition-colors whitespace-nowrap active:scale-95">lower</button>
         <button onClick={() => process('title')} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-neonBlue hover:text-slate-900 transition-colors whitespace-nowrap active:scale-95">Title Case</button>
         <button onClick={() => process('reverse')} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-neonBlue hover:text-slate-900 transition-colors whitespace-nowrap active:scale-95">Reverse</button>
       </div>
       <div className="flex gap-2 mb-3">
         <button onClick={() => process('trim')} className="flex-1 px-2 py-1.5 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-neonPurple hover:text-white transition-colors flex items-center justify-center gap-1 active:scale-95"><Scissors size={12}/> Trim Space</button>
         <button onClick={() => process('dedupe')} className="flex-1 px-2 py-1.5 bg-slate-200 dark:bg-slate-700 rounded text-xs hover:bg-neonPurple hover:text-white transition-colors flex items-center justify-center gap-1 active:scale-95"><Eraser size={12}/> Dedupe Lines</button>
       </div>
       
       <div className="relative flex-grow">
          <textarea
            className="w-full h-full min-h-[140px] bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-sm outline-none resize-none font-mono transition-all duration-300 focus:ring-2 focus:ring-neonBlue focus:scale-[1.01]"
            placeholder="Type or paste text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {msg && <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded fade-in">{msg}</div>}
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
       <div className="flex border-b border-slate-200 dark:border-white/10 mb-3">
          {['json', 'base64', 'url'].map(m => (
             <button 
               key={m} 
               onClick={() => setMode(m)}
               className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${mode === m ? 'text-neonBlue border-b-2 border-neonBlue drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]' : 'text-slate-500'}`}
             >
               {m}
             </button>
          ))}
       </div>

       <textarea
          className="w-full flex-grow min-h-[120px] bg-slate-900 text-green-400 border border-slate-700 rounded-lg p-3 text-xs focus:ring-1 focus:ring-neonBlue outline-none resize-none font-mono mb-3"
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
            <label className="text-xs text-slate-500 mb-1 flex justify-between">
              <span>Title</span>
              <span className={title.length > 60 ? 'text-red-500' : 'text-green-500'}>{title.length}/60</span>
            </label>
            <input className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-sm outline-none transition-all focus:ring-1 focus:ring-neonBlue" value={title} onChange={e => setTitle(e.target.value)} />
         </div>
         <div>
            <label className="text-xs text-slate-500 mb-1 flex justify-between">
              <span>Description</span>
              <span className={desc.length > 160 ? 'text-red-500' : 'text-green-500'}>{desc.length}/160</span>
            </label>
            <textarea className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-sm outline-none h-16 resize-none transition-all focus:ring-1 focus:ring-neonBlue" value={desc} onChange={e => setDesc(e.target.value)} />
         </div>
       </div>

       <div className="flex-grow bg-white p-4 rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px]">G</div>
             <div className="flex flex-col">
                <span className="text-[11px] text-slate-800 font-medium">ToolCraft AI</span>
                <span className="text-[10px] text-slate-500 truncate max-w-[200px]">{url}</span>
             </div>
          </div>
          <h4 className="text-[#1a0dab] text-lg leading-tight hover:underline cursor-pointer truncate">{title}</h4>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2">{desc}</p>
       </div>
    </GlassCard>
  );
};

// -----------------------------------------------------
// WEB & NICHE TOOLS
// -----------------------------------------------------

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
          className="flex-grow bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 outline-none transition-all duration-300 focus:ring-2 focus:ring-neonBlue focus:scale-[1.01]"
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
          <div className="text-center py-8 text-slate-400 animate-pulse">Checking global availability...</div>
        ) : domains.length > 0 ? (
          domains.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5 transition-colors hover:bg-slate-100 dark:hover:bg-white/10">
              <span className="font-medium text-sm text-slate-700 dark:text-gray-200">{d.name}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.status ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400'}`}>
                {d.status ? 'AVAILABLE' : 'TAKEN'}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400 text-xs">Enter a keyword to generate ideas</div>
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
      <div className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg mb-2 transition-all hover:scale-110 ${color === 'green' ? 'border-green-500 text-green-500' : color === 'orange' ? 'border-orange-500 text-orange-500' : 'border-red-500 text-red-500'}`}>
        {val}
      </div>
      <span className="text-[10px] uppercase font-bold text-slate-500">{label}</span>
    </div>
  );

  return (
    <GlassCard title="Site Speed Audit" className="h-full flex flex-col">
       <div className="flex gap-2 mb-6">
         <input 
            className="flex-grow bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-neonBlue focus:scale-[1.01]"
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
              <RefreshCw className="animate-spin text-neonBlue mx-auto mb-2" />
              <p className="text-xs text-slate-500">{stage}</p>
           </div>
         ) : score ? (
           <div className="w-full flex justify-around">
              <Gauge val={score.perf} label="Performance" color={score.perf > 80 ? 'green' : score.perf > 50 ? 'orange' : 'red'} />
              <Gauge val={score.seo} label="SEO" color={score.seo > 80 ? 'green' : score.seo > 50 ? 'orange' : 'red'} />
              <Gauge val={score.access} label="Accessibility" color={score.access > 80 ? 'green' : score.access > 50 ? 'orange' : 'red'} />
           </div>
         ) : (
           <div className="text-center text-slate-400 text-xs">
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
         <select className="bg-slate-100 dark:bg-slate-800 rounded p-1 text-xs outline-none focus:ring-1 focus:ring-neonBlue" value={type} onChange={e=>setType(e.target.value)}>
           <option value="users">Users</option>
           <option value="products">Products</option>
         </select>
         <select className="bg-slate-100 dark:bg-slate-800 rounded p-1 text-xs outline-none focus:ring-1 focus:ring-neonBlue" value={format} onChange={e=>setFormat(e.target.value)}>
           <option value="json">JSON</option>
           <option value="csv">CSV</option>
         </select>
         <input type="number" className="bg-slate-100 dark:bg-slate-800 rounded p-1 text-xs outline-none pl-2 focus:ring-1 focus:ring-neonBlue" value={count} onChange={e=>setCount(Number(e.target.value))} min="1" max="50" />
       </div>

       <textarea 
         className="flex-grow bg-slate-900 text-green-400 font-mono text-[10px] p-2 rounded-lg resize-none mb-3 outline-none focus:ring-1 focus:ring-neonBlue"
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
    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 px-2 transition-colors rounded">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800 dark:text-gray-200 truncate max-w-[150px]" title={val}>{val}</span>
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
            <span className="text-xs text-slate-500 block mb-1">User Agent</span>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-[10px] text-slate-600 dark:text-gray-400 break-all leading-tight">
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
             className="flex-grow bg-slate-100 dark:bg-slate-800/50 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-neonBlue transition-all focus:shadow-[0_0_10px_rgba(0,243,255,0.2)]"
             placeholder="Add a task..."
             value={input}
             onChange={e => setInput(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && add()}
          />
          <button onClick={add} className="bg-neonBlue text-slate-900 rounded-lg w-10 flex items-center justify-center hover:opacity-90 active:scale-95 transition-transform"><Plus size={18}/></button>
       </div>
       
       <div className="flex-grow overflow-y-auto space-y-2 max-h-[200px] pr-1 custom-scrollbar">
          {tasks.length > 0 ? tasks.map(t => (
             <div key={t.id} className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${t.done ? 'bg-slate-50 dark:bg-white/5 opacity-60' : 'bg-white dark:bg-slate-800 shadow-sm'}`}>
                <button onClick={() => toggle(t.id)} className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${t.done ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                   {t.done && <Check size={12} />}
                </button>
                <span className={`flex-grow text-sm ${t.done ? 'line-through text-slate-400' : 'text-slate-700 dark:text-gray-200'}`}>{t.text}</span>
                <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
             </div>
          )) : <div className="text-center text-slate-400 text-xs mt-8">No tasks yet</div>}
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
       <div className="bg-slate-900 text-white p-4 rounded-xl mb-4 flex justify-between items-center shadow-lg transition-transform hover:scale-[1.02]">
          <span className="text-sm opacity-80">Balance</span>
          <span className={`text-xl font-bold ${balance >= 0 ? 'text-neonGreen' : 'text-red-400'}`}>${balance.toFixed(2)}</span>
       </div>
       
       <div className="flex gap-2 mb-2">
          <input className="flex-[2] bg-slate-100 dark:bg-slate-800/50 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-neonBlue" placeholder="Item" value={desc} onChange={e=>setDesc(e.target.value)} />
          <input className="flex-1 bg-slate-100 dark:bg-slate-800/50 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-neonBlue" type="number" placeholder="$" value={amt} onChange={e=>setAmt(e.target.value)} />
       </div>
       <div className="flex gap-2 mb-4">
          <button onClick={() => setType('inc')} className={`flex-1 py-1 text-xs rounded font-bold transition-all ${type==='inc' ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>+ Income</button>
          <button onClick={() => setType('exp')} className={`flex-1 py-1 text-xs rounded font-bold transition-all ${type==='exp' ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>- Expense</button>
          <button onClick={add} className="flex-none w-8 bg-neonBlue text-slate-900 rounded flex items-center justify-center hover:shadow-[0_0_10px_rgba(0,243,255,0.4)]"><ArrowRight size={14}/></button>
       </div>

       <div className="flex-grow overflow-y-auto space-y-2 max-h-[150px] pr-1 custom-scrollbar">
          {items.map(i => (
             <div key={i.id} className="flex justify-between text-xs border-b border-slate-100 dark:border-white/5 py-1 last:border-0">
                <span className="text-slate-600 dark:text-gray-300">{i.desc}</span>
                <span className={`font-medium ${i.type === 'inc' ? 'text-green-500' : 'text-red-500'}`}>
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
             className="flex-grow bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-neonPurple transition-all" 
             placeholder="New habit..."
             value={newHabit}
             onChange={e=>setNewHabit(e.target.value)}
          />
          <button onClick={add} className="bg-neonPurple text-white rounded-lg px-3 text-xs font-bold hover:shadow-[0_0_10px_rgba(188,19,254,0.4)] active:scale-95 transition-all">Add</button>
       </div>

       <div className="space-y-3 flex-grow overflow-y-auto pr-1">
          {habits.map(h => (
            <div key={h.id} className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl flex items-center justify-between transition-transform hover:scale-[1.02]">
               <div>
                  <div className="text-sm font-medium text-slate-800 dark:text-gray-200">{h.name}</div>
                  <div className="text-[10px] text-slate-500">{h.streak} day streak 🔥</div>
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

// -----------------------------------------------------
// MATH & UNIT CONVERTERS
// -----------------------------------------------------

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
       <div className="flex border-b border-slate-200 dark:border-white/10 mb-4">
         {Object.keys(categories).map(c => (
           <button 
             key={c}
             onClick={() => setCategory(c as any)}
             className={`flex-1 pb-2 text-xs font-bold uppercase transition-all duration-300 ${category === c ? 'text-neonBlue border-b-2 border-neonBlue drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
           >
             {c}
           </button>
         ))}
       </div>

       <div className="space-y-4">
          <div className="flex gap-2">
            <input 
              type="number" 
              className="w-1/2 bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neonBlue transition-all focus:scale-[1.02]"
              placeholder="Value"
              value={val}
              onChange={e => setVal(e.target.value)}
            />
            <select 
              className="w-1/2 bg-slate-100 dark:bg-slate-800/50 rounded-lg px-2 text-sm outline-none focus:ring-1 focus:ring-neonBlue transition-all"
              value={fromUnit}
              onChange={e => setFromUnit(e.target.value)}
            >
              {categories[category].map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
            </select>
          </div>
          
          <div className="flex justify-center text-slate-400"><ArrowRight size={20} className="rotate-90" /></div>

          <div className="flex gap-2">
            <div className="w-1/2 bg-slate-50 dark:bg-white/5 rounded-lg px-3 py-2 text-slate-800 dark:text-white font-mono truncate border border-transparent transition-all hover:border-neonBlue/30">
               {typeof result === 'number' ? result.toLocaleString(undefined, {maximumFractionDigits: 4}) : result}
            </div>
            <select 
              className="w-1/2 bg-slate-100 dark:bg-slate-800/50 rounded-lg px-2 text-sm outline-none focus:ring-1 focus:ring-neonBlue transition-all"
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
       <div className="flex justify-between mb-4 bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
          <button onClick={()=>setMode('simple')} className={`flex-1 text-[10px] py-1 rounded transition-all duration-300 ${mode==='simple' ? 'bg-white dark:bg-slate-700 shadow-[0_0_10px_rgba(188,19,254,0.3)] text-neonPurple scale-105 font-bold' : 'text-slate-500 hover:text-slate-700'}`}>% of</button>
          <button onClick={()=>setMode('phrase')} className={`flex-1 text-[10px] py-1 rounded transition-all duration-300 ${mode==='phrase' ? 'bg-white dark:bg-slate-700 shadow-[0_0_10px_rgba(188,19,254,0.3)] text-neonPurple scale-105 font-bold' : 'text-slate-500 hover:text-slate-700'}`}>what %</button>
          <button onClick={()=>setMode('change')} className={`flex-1 text-[10px] py-1 rounded transition-all duration-300 ${mode==='change' ? 'bg-white dark:bg-slate-700 shadow-[0_0_10px_rgba(188,19,254,0.3)] text-neonPurple scale-105 font-bold' : 'text-slate-500 hover:text-slate-700'}`}>change</button>
       </div>

       <div className="space-y-3 flex-grow">
          <div className="flex items-center gap-2">
             <span className="text-sm w-8">{mode === 'simple' ? 'What is' : mode === 'phrase' ? '' : 'From'}</span>
             <input type="number" className="flex-grow bg-slate-100 dark:bg-slate-800/50 rounded p-2 outline-none focus:ring-1 focus:ring-neonPurple transition-all" value={val1} onChange={e=>setVal1(e.target.value)} placeholder={mode === 'simple' ? '20' : '50'} />
             <span className="text-sm">{mode === 'simple' ? '% of' : mode === 'phrase' ? 'is what % of' : 'to'}</span>
          </div>
          <div className="flex items-center gap-2">
             <input type="number" className="flex-grow bg-slate-100 dark:bg-slate-800/50 rounded p-2 outline-none focus:ring-1 focus:ring-neonPurple transition-all" value={val2} onChange={e=>setVal2(e.target.value)} placeholder={mode === 'simple' ? '100' : '200'} />
             <span className="text-sm w-4">?</span>
          </div>

          {res !== null && (
             <div className="mt-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl text-center">
                <span className="text-xs text-slate-500 block mb-1">Result</span>
                <span className="text-2xl font-bold text-neonBlue animate-pulse">
                   {res.toFixed(2)}{mode !== 'simple' ? '%' : ''}
                </span>
             </div>
          )}
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
       <div className="bg-slate-900 text-right p-4 rounded-xl mb-4 text-white font-mono text-2xl overflow-hidden shadow-inner">
          {display}
       </div>
       <div className="grid grid-cols-4 gap-2 flex-grow">
          {btns.map(b => (
             <button 
               key={b}
               onClick={() => handleInput(b)}
               className={`rounded-lg font-bold text-lg transition-all active:scale-95 hover:shadow-lg ${
                 b === '=' ? 'row-span-2 bg-neonBlue text-slate-900 hover:brightness-110' : 
                 ['C', '÷', '×', '-', '+'].includes(b) ? 'bg-slate-200 dark:bg-slate-700 text-neonPurple hover:bg-slate-300 dark:hover:bg-slate-600' : 
                 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-slate-700'
               } ${b === '0' ? 'col-span-2' : ''}`}
             >
               {b}
             </button>
          ))}
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
                <label className="text-xs text-slate-500 mb-1 block">Discount %</label>
                <input type="number" className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neonBlue transition-all" value={discount} onChange={e=>setDiscount(e.target.value)} />
             </div>
             <div className="flex-1">
                <label className="text-xs text-slate-500 mb-1 block">Tax %</label>
                <input type="number" className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neonBlue transition-all" value={tax} onChange={e=>setTax(e.target.value)} />
             </div>
          </div>
       </div>

       <div className="space-y-2 bg-slate-50 dark:bg-white/5 p-4 rounded-xl transition-transform hover:scale-[1.01]">
          <div className="flex justify-between text-sm">
             <span className="text-slate-500">Savings</span>
             <span className="text-green-500 font-medium">-${saveAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-slate-200 dark:border-white/10 pb-2">
             <span className="text-slate-500">Tax</span>
             <span className="text-slate-700 dark:text-gray-300">+${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
             <span className="font-bold text-slate-800 dark:text-white">Final Price</span>
             <span className="text-2xl font-bold text-neonBlue">${final.toFixed(2)}</span>
          </div>
       </div>
    </GlassCard>
  );
};

// -----------------------------------------------------
// SOCIAL MEDIA & CREATOR TOOLS
// -----------------------------------------------------

// --- YouTube Title Generator ---
export const YouTubeTitleGen: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if(!topic) return;
    setLoading(true);
    setTitles([]);

    setTimeout(() => {
      const templates = [
        `Why ${topic} is Dead (And What to Do Next)`,
        `I Tried ${topic} for 30 Days - Here's What Happened`,
        `The Ultimate Guide to ${topic} in ${new Date().getFullYear()}`,
        `Stop Doing ${topic} Wrong! (Common Mistakes)`,
        `How to Master ${topic} in 10 Minutes`,
        `The Truth About ${topic} No One Tells You`,
        `${topic} vs. The Competition: Which is Better?`,
        `7 Secret Hacks for ${topic} You Need to Know`,
        `Is ${topic} Worth It? Honest Review`,
        `Beginner's Tutorial: ${topic} Explained Simply`
      ];
      // Shuffle and pick 5
      setTitles(templates.sort(() => 0.5 - Math.random()).slice(0, 5));
      setLoading(false);
    }, 1000);
  };

  return (
    <GlassCard title="YouTube Title Generator" className="h-full flex flex-col">
       <div className="flex gap-2 mb-4">
         <input 
            className="flex-grow bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-neonBlue transition-all focus:scale-[1.01]"
            placeholder="Enter Video Topic (e.g. Coding)"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generate()}
         />
         <NeonButton onClick={generate} disabled={loading} className="w-12 px-0 flex items-center justify-center">
           <Youtube size={18} />
         </NeonButton>
       </div>
       
       <div className="flex-grow overflow-y-auto space-y-2 max-h-[250px] pr-1 custom-scrollbar">
          {loading ? (
             <div className="text-center py-8 text-slate-400 animate-pulse text-xs">Generating viral titles...</div>
          ) : titles.length > 0 ? (
             titles.map((t, i) => (
                <div key={i} className="bg-slate-50 dark:bg-white/5 p-3 rounded-lg border border-slate-100 dark:border-white/5 hover:border-neonBlue/30 hover:bg-slate-100 dark:hover:bg-white/10 transition-all group cursor-pointer" onClick={() => navigator.clipboard.writeText(t)}>
                   <p className="text-sm font-medium text-slate-800 dark:text-white leading-tight">{t}</p>
                   <span className="text-[10px] text-neonBlue opacity-0 group-hover:opacity-100 transition-opacity">Click to copy</span>
                </div>
             ))
          ) : (
             <div className="text-center py-10 text-slate-400 text-xs">Enter a topic to generate high-CTR titles</div>
          )}
       </div>
    </GlassCard>
  );
};

// --- Reel Caption / Hooks Generator ---
export const ReelHooksGen: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [hooks, setHooks] = useState<string[]>([]);
  
  const generate = () => {
     if(!niche) return;
     const templates = [
        `Stop scrolling if you want to master ${niche} 🛑`,
        `The secret to ${niche} that gurus won't tell you 🤫`,
        `POV: You finally figured out ${niche} 🤯`,
        `3 reasons why you're failing at ${niche} 👇`,
        `Save this for your next ${niche} project! 💾`,
        `If you do ${niche}, you NEED to see this...`,
        `Don't make this mistake with ${niche} ❌`,
        `How I went from 0 to Hero in ${niche} 🚀`
     ];
     setHooks(templates);
  };

  return (
    <GlassCard title="Reel Hooks Generator" className="h-full flex flex-col">
       <InputGroup label="Niche / Topic" id="reel-niche" value={niche} onChange={e=>setNiche(e.target.value)} placeholder="e.g. Fitness, AI, Cooking" />
       <NeonButton onClick={generate} className="mb-4">Generate Hooks</NeonButton>
       
       <div className="flex-grow space-y-2 overflow-y-auto max-h-[200px] pr-1">
          {hooks.map((h, i) => (
             <div key={i} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5 transition-transform hover:scale-[1.01]">
                <span className="text-xs text-slate-700 dark:text-gray-200">{h}</span>
                <button onClick={() => navigator.clipboard.writeText(h)} className="text-slate-400 hover:text-neonBlue"><Copy size={12}/></button>
             </div>
          ))}
          {hooks.length === 0 && <div className="text-center text-slate-400 text-xs py-4">Generate scroll-stopping hooks</div>}
       </div>
    </GlassCard>
  );
};

// --- Virality Score Checker ---
export const ViralityScore: React.FC = () => {
  const [text, setText] = useState('');
  const [score, setScore] = useState<number|null>(null);

  const analyze = () => {
     if(!text) return;
     // Fake heuristic logic
     let s = 50;
     if (text.length < 150) s += 10; // Short is good
     if (text.includes('?')) s += 5; // Questions engage
     if (text.match(/👇|🔥|🚀|😱/)) s += 10; // Emojis help
     if (text.match(/you|your|we/i)) s += 5; // Personal
     if (text.match(/secret|hack|mistake|stop/i)) s += 10; // Power words
     setScore(Math.min(99, s));
  };

  return (
    <GlassCard title="Virality Score AI" className="h-full flex flex-col">
       <textarea 
          className="w-full h-24 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-sm focus:ring-2 focus:ring-neonBlue outline-none resize-none mb-3 transition-all focus:scale-[1.01]"
          placeholder="Paste your caption or script here..."
          value={text}
          onChange={e=>setText(e.target.value)}
       />
       <NeonButton onClick={analyze} className="mb-4">Analyze Content</NeonButton>
       
       {score !== null && (
          <div className="text-center p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 animate-fade-in-up">
             <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Viral Potential</div>
             <div className={`text-4xl font-black ${score > 80 ? 'text-neonGreen' : score > 60 ? 'text-neonBlue' : 'text-orange-400'}`}>
                {score}/100
             </div>
             <p className="text-[10px] text-slate-400 mt-2">
                {score > 80 ? "This is 🔥! Post it now." : "Add more hooks or emojis to boost engagement."}
             </p>
          </div>
       )}
    </GlassCard>
  );
};

// --- Hashtag Reach Estimator ---
export const HashtagReach: React.FC = () => {
  const [tags, setTags] = useState('');
  const [reach, setReach] = useState<string|null>(null);

  const estimate = () => {
     if(!tags) return;
     const count = tags.split('#').length - 1 || 1;
     // Random estimate logic
     const base = Math.floor(Math.random() * 50000) + 10000;
     const total = base * count;
     setReach((total > 1000000 ? (total/1000000).toFixed(1)+'M' : (total/1000).toFixed(1)+'K'));
  };

  return (
    <GlassCard title="Hashtag Reach" className="h-full flex flex-col">
       <textarea 
          className="w-full h-20 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-sm focus:ring-2 focus:ring-neonBlue outline-none resize-none mb-3 transition-all focus:scale-[1.01]"
          placeholder="#marketing #business #growth"
          value={tags}
          onChange={e=>setTags(e.target.value)}
       />
       <NeonButton onClick={estimate} className="mb-4">Estimate Reach</NeonButton>
       
       {reach && (
          <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 rounded-xl animate-pulse">
             <span className="text-sm font-medium text-slate-600 dark:text-gray-300">Est. Reach</span>
             <span className="text-2xl font-bold text-neonPurple">{reach}</span>
          </div>
       )}
    </GlassCard>
  );
};

// --- Instagram Bio Audit ---
export const BioAudit: React.FC = () => {
  const [bio, setBio] = useState('');
  const [tips, setTips] = useState<string[]>([]);

  const audit = () => {
     if(!bio) return;
     const t = [];
     if (!bio.includes('http')) t.push("Missing a link! Add a CTA.");
     if ((bio.match(/\n/g) || []).length < 2) t.push("Use line breaks for readability.");
     if (!bio.match(/👇|⬇️|🔗/)) t.push("Add a directional emoji pointing to your link.");
     if (bio.length > 130) t.push("Bio is getting long, keep it punchy.");
     if (t.length === 0) t.push("Great Bio! It looks optimized.");
     setTips(t);
  };

  return (
    <GlassCard title="Insta Bio Audit" className="h-full flex flex-col">
       <textarea 
          className="w-full h-24 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-sm focus:ring-2 focus:ring-neonBlue outline-none resize-none mb-3 transition-all focus:scale-[1.01]"
          placeholder="Paste your bio here..."
          value={bio}
          onChange={e=>setBio(e.target.value)}
          maxLength={150}
       />
       <div className="text-right text-[10px] text-slate-400 mb-2">{bio.length}/150</div>
       <NeonButton onClick={audit} className="mb-4">Audit Bio</NeonButton>
       
       <div className="space-y-1">
          {tips.map((tip, i) => (
             <div key={i} className="flex gap-2 items-start text-xs text-slate-600 dark:text-gray-300 animate-fade-in-up" style={{animationDelay: `${i*100}ms`}}>
                <Check size={14} className="text-neonGreen mt-0.5 flex-none"/> {tip}
             </div>
          ))}
       </div>
    </GlassCard>
  );
};

// --- Thumbnail Text Analyzer ---
export const ThumbnailAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');

  const check = () => {
     const words = text.trim().split(/\s+/).length;
     if (words > 5) setAnalysis("Too many words! Aim for < 5 for impact.");
     else if (text.length === 0) setAnalysis("Enter text.");
     else setAnalysis("Great length! Ensure high contrast colors.");
  };

  return (
    <GlassCard title="Thumbnail Text" className="h-full flex flex-col">
       <div className="relative mb-4">
          <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-slate-600 shadow-lg">
             <span className="text-4xl font-black text-white uppercase drop-shadow-md text-center px-4">{text || "YOUR TEXT"}</span>
          </div>
       </div>
       <input 
          className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-2 text-sm outline-none mb-3 transition-all focus:ring-2 focus:ring-neonBlue focus:scale-[1.01]"
          placeholder="Thumbnail text..."
          value={text}
          onChange={e=>setText(e.target.value)}
       />
       <NeonButton onClick={check}>Analyze</NeonButton>
       {analysis && <p className={`mt-3 text-xs font-medium text-center ${analysis.includes('Too') ? 'text-red-400' : 'text-green-400'}`}>{analysis}</p>}
    </GlassCard>
  );
};

// --- Post Time Optimizer ---
export const PostTimeOptimizer: React.FC = () => {
  const [platform, setPlatform] = useState('instagram');
  const [times, setTimes] = useState<string[]>([]);

  const getTimes = () => {
     // Static best practices data
     const map: any = {
        instagram: ["Mon 9:00 AM", "Wed 11:00 AM", "Fri 2:00 PM"],
        youtube: ["Thu 2:00 PM", "Fri 12:00 PM", "Sun 10:00 AM"],
        tiktok: ["Tue 7:00 AM", "Thu 10:00 AM", "Fri 8:00 PM"],
        twitter: ["Wed 9:00 AM", "Thu 9:00 AM", "Fri 9:00 AM"]
     };
     setTimes(map[platform] || []);
  };

  useEffect(() => { getTimes(); }, [platform]);

  return (
    <GlassCard title="Best Time to Post" className="h-full flex flex-col">
       <div className="flex gap-2 mb-6">
          {['instagram', 'youtube', 'tiktok'].map(p => (
             <button 
                key={p} 
                onClick={() => setPlatform(p)} 
                className={`flex-1 p-2 rounded-lg flex justify-center items-center transition-all duration-300 ${platform === p ? 'bg-neonBlue/20 text-neonBlue border border-neonBlue shadow-[0_0_15px_rgba(0,243,255,0.2)]' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
             >
                {p === 'instagram' && <Instagram size={18} />}
                {p === 'youtube' && <Youtube size={18} />}
                {p === 'tiktok' && <Smartphone size={18} />}
             </button>
          ))}
       </div>
       
       <div className="space-y-3">
          <p className="text-xs text-center text-slate-500 mb-2">Recommended Global Times (EST)</p>
          {times.map((t, i) => (
             <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 transition-transform hover:scale-[1.01]">
                <span className="font-bold text-slate-700 dark:text-white">{t.split(' ')[0]}</span>
                <span className="text-neonPurple font-mono">{t.split(' ').slice(1).join(' ')}</span>
             </div>
          ))}
       </div>
    </GlassCard>
  );
};

// --- Engagement Rate Calculator ---
export const EngagementRate: React.FC = () => {
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [followers, setFollowers] = useState('');
  const [rate, setRate] = useState<string|null>(null);

  const calculate = () => {
     const l = parseFloat(likes) || 0;
     const c = parseFloat(comments) || 0;
     const f = parseFloat(followers) || 1;
     const er = ((l + c) / f) * 100;
     setRate(er.toFixed(2));
  };

  return (
    <GlassCard title="Engagement Rate" className="h-full flex flex-col">
       <div className="space-y-3 mb-4">
          <InputGroup label="Likes" id="er-likes" type="number" value={likes} onChange={e=>setLikes(e.target.value)} />
          <InputGroup label="Comments" id="er-comments" type="number" value={comments} onChange={e=>setComments(e.target.value)} />
          <InputGroup label="Followers" id="er-followers" type="number" value={followers} onChange={e=>setFollowers(e.target.value)} />
       </div>
       <NeonButton onClick={calculate}>Calculate</NeonButton>
       
       {rate && (
          <div className="mt-4 text-center animate-fade-in-up">
             <span className="text-xs text-slate-500 block">Engagement Rate</span>
             <span className="text-3xl font-bold text-neonBlue">{rate}%</span>
          </div>
       )}
    </GlassCard>
  );
};

// -----------------------------------------------------
// CAREER, EDUCATION & PRODUCTIVITY
// -----------------------------------------------------

// --- Exam Rank Predictor ---
export const ExamRankPredictor: React.FC = () => {
  const [marks, setMarks] = useState('');
  const [total, setTotal] = useState('100');
  const [difficulty, setDifficulty] = useState('medium');
  const [rank, setRank] = useState<string|null>(null);

  const predict = () => {
     if(!marks || !total) return;
     const m = parseFloat(marks);
     const t = parseFloat(total);
     const percentage = (m / t) * 100;
     
     // Simulated prediction logic
     let baseRank = 10000;
     if (difficulty === 'hard') baseRank = 5000;
     if (difficulty === 'easy') baseRank = 15000;
     
     // Invert: Higher % = lower rank
     const predicted = Math.max(1, Math.floor(baseRank * (1 - (percentage / 100)) + Math.random() * 50));
     setRank(predicted.toLocaleString());
  };

  return (
    <GlassCard title="Exam Rank Predictor" className="h-full flex flex-col">
       <div className="space-y-3 mb-4">
          <div className="flex gap-2">
            <div className="flex-1">
               <label className="text-xs text-slate-500 mb-1 block">Marks Scored</label>
               <input type="number" className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neonBlue transition-all focus:scale-[1.01]" value={marks} onChange={e=>setMarks(e.target.value)} />
            </div>
            <div className="flex-1">
               <label className="text-xs text-slate-500 mb-1 block">Total Marks</label>
               <input type="number" className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neonBlue transition-all focus:scale-[1.01]" value={total} onChange={e=>setTotal(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Paper Difficulty</label>
            <select className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-neonBlue transition-all" value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
               <option value="easy">Easy</option>
               <option value="medium">Medium</option>
               <option value="hard">Hard</option>
            </select>
          </div>
       </div>
       <NeonButton onClick={predict}>Predict Rank</NeonButton>
       
       {rank && (
          <div className="mt-4 text-center p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 animate-pulse">
             <span className="text-xs text-slate-500 uppercase tracking-widest">Est. Rank</span>
             <div className="text-3xl font-black text-neonPurple mt-1">#{rank}</div>
          </div>
       )}
    </GlassCard>
  );
};

// --- Attendance Shortage Calculator ---
export const AttendanceCalc: React.FC = () => {
  const [total, setTotal] = useState('');
  const [attended, setAttended] = useState('');
  const [required, setRequired] = useState('75');
  const [result, setResult] = useState<{current: number, needed: number, canMiss: number} | null>(null);

  const calculate = () => {
     const t = parseFloat(total);
     const a = parseFloat(attended);
     const r = parseFloat(required);
     if(!t || isNaN(a)) return;

     const current = (a / t) * 100;
     let needed = 0;
     let canMiss = 0;

     if (current < r) {
        // Solve (a + x) / (t + x) = r/100
        needed = Math.ceil((r * t - 100 * a) / (100 - r));
     } else {
        // Solve (a) / (t + x) = r/100
        canMiss = Math.floor((100 * a - r * t) / r);
     }
     setResult({current, needed: Math.max(0, needed), canMiss: Math.max(0, canMiss)});
  };

  return (
    <GlassCard title="Attendance Manager" className="h-full flex flex-col">
       <div className="space-y-3 mb-4">
          <InputGroup label="Total Classes" id="att-total" type="number" value={total} onChange={e=>setTotal(e.target.value)} />
          <InputGroup label="Attended Classes" id="att-attended" type="number" value={attended} onChange={e=>setAttended(e.target.value)} />
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Required % (e.g. 75)</label>
            <input type="number" className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-neonBlue transition-all focus:scale-[1.01]" value={required} onChange={e=>setRequired(e.target.value)} />
          </div>
       </div>
       <NeonButton onClick={calculate}>Check Status</NeonButton>
       
       {result && (
          <div className="mt-4 text-center animate-fade-in-up">
             <div className={`text-2xl font-bold mb-2 ${result.current >= parseFloat(required) ? 'text-green-500' : 'text-red-500'}`}>
                {result.current.toFixed(1)}%
             </div>
             {result.current < parseFloat(required) ? (
                <p className="text-sm text-slate-600 dark:text-gray-300">
                   Attend <span className="font-bold text-slate-900 dark:text-white">{result.needed}</span> more classes to hit target.
                </p>
             ) : (
                <p className="text-sm text-slate-600 dark:text-gray-300">
                   You can bunk <span className="font-bold text-slate-900 dark:text-white">{result.canMiss}</span> classes safely.
                </p>
             )}
          </div>
       )}
    </GlassCard>
  );
};

// --- Project Deadline Risk Analyzer ---
export const ProjectRisk: React.FC = () => {
  const [days, setDays] = useState('');
  const [tasks, setTasks] = useState('');
  const [team, setTeam] = useState('1');
  const [risk, setRisk] = useState<{level: string, color: string} | null>(null);

  const analyze = () => {
     const d = parseFloat(days);
     const t = parseFloat(tasks);
     const m = parseFloat(team);
     if(!d || !t || !m) return;
     
     // Tasks per person per day required
     const load = t / (d * m);
     
     if (load > 3) setRisk({level: 'CRITICAL', color: 'text-red-600'});
     else if (load > 1.5) setRisk({level: 'HIGH', color: 'text-orange-500'});
     else if (load > 0.8) setRisk({level: 'MODERATE', color: 'text-yellow-500'});
     else setRisk({level: 'SAFE', color: 'text-green-500'});
  };

  return (
    <GlassCard title="Deadline Risk AI" className="h-full flex flex-col">
       <div className="grid grid-cols-2 gap-3 mb-4">
          <InputGroup label="Days Left" id="risk-days" type="number" value={days} onChange={e=>setDays(e.target.value)} />
          <InputGroup label="Tasks Left" id="risk-tasks" type="number" value={tasks} onChange={e=>setTasks(e.target.value)} />
       </div>
       <InputGroup label="Team Size" id="risk-team" type="number" value={team} onChange={e=>setTeam(e.target.value)} />
       <NeonButton onClick={analyze} className="mt-2">Analyze Risk</NeonButton>
       
       {risk && (
          <div className="mt-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-between animate-pulse">
             <span className="text-sm font-medium text-slate-600 dark:text-gray-300">Risk Level</span>
             <span className={`text-xl font-black ${risk.color}`}>{risk.level}</span>
          </div>
       )}
    </GlassCard>
  );
};

// --- Internship Readiness Score ---
export const InternshipScore: React.FC = () => {
  const [checks, setChecks] = useState({
     resume: false,
     linkedin: false,
     projects: false,
     skills: false,
     interview: false
  });
  const [score, setScore] = useState<number|null>(null);

  const toggle = (key: keyof typeof checks) => {
     const newChecks = {...checks, [key]: !checks[key]};
     setChecks(newChecks);
     const count = Object.values(newChecks).filter(Boolean).length;
     setScore((count / 5) * 100);
  };

  return (
    <GlassCard title="Internship Ready?" className="h-full flex flex-col">
       <div className="space-y-3 flex-grow">
          {[
            {id: 'resume', label: 'Resume Updated & ATS Friendly'},
            {id: 'linkedin', label: 'LinkedIn Profile Optimized'},
            {id: 'projects', label: '2+ Portfolio Projects Ready'},
            {id: 'skills', label: 'Core Technical Skills Mastered'},
            {id: 'interview', label: 'Mock Interview Practice Done'}
          ].map(item => (
             <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors" onClick={() => toggle(item.id as any)}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checks[item.id as keyof typeof checks] ? 'bg-neonBlue border-neonBlue text-slate-900' : 'border-slate-300 dark:border-slate-600'}`}>
                   {checks[item.id as keyof typeof checks] && <Check size={14} />}
                </div>
                <span className="text-sm text-slate-700 dark:text-gray-300">{item.label}</span>
             </div>
          ))}
       </div>
       
       <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
          <div className="flex justify-between items-center">
             <span className="text-xs font-bold text-slate-500 uppercase">Readiness Score</span>
             <span className={`text-2xl font-bold ${score === 100 ? 'text-neonGreen' : 'text-neonBlue'}`}>{score || 0}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
             <div className="bg-neonBlue h-full transition-all duration-1000 ease-out" style={{width: `${score || 0}%`}}></div>
          </div>
       </div>
    </GlassCard>
  );
};

// --- Typing Speed Rank Predictor ---
export const TypingRank: React.FC = () => {
  const [wpm, setWpm] = useState('');
  const [percentile, setPercentile] = useState<string|null>(null);

  const predict = () => {
     const w = parseFloat(wpm);
     if(!w) return;
     let p = 0;
     // Rough WPM distribution logic
     if (w < 20) p = 10;
     else if (w < 40) p = 40; // Average
     else if (w < 60) p = 70; // Good
     else if (w < 80) p = 90; // Pro
     else if (w < 100) p = 98; // Expert
     else p = 99.9; // Godlike
     
     setPercentile(`Top ${100 - p}%`);
  };

  return (
    <GlassCard title="Typing Rank" className="h-full flex flex-col">
       <InputGroup label="Your Speed (WPM)" id="type-wpm" type="number" value={wpm} onChange={e=>setWpm(e.target.value)} />
       <NeonButton onClick={predict} className="mt-2">Check Rank</NeonButton>
       
       {percentile && (
          <div className="mt-6 text-center animate-fade-in-up">
             <Keyboard size={48} className="mx-auto text-neonPurple mb-2 opacity-80" />
             <div className="text-3xl font-bold text-white">{percentile}</div>
             <p className="text-xs text-slate-400 mt-1">of global typists</p>
          </div>
       )}
    </GlassCard>
  );
};

// --- Salary Hike Prediction Tool ---
export const SalaryHike: React.FC = () => {
  const [ctc, setCtc] = useState('');
  const [rating, setRating] = useState('3');
  const [newCtc, setNewCtc] = useState<string|null>(null);

  const predict = () => {
     const c = parseFloat(ctc);
     if(!c) return;
     const r = parseFloat(rating);
     
     // Hike Logic: 1=0%, 3=8-12%, 5=20%+
     const hikePercent = (r - 1) * 5 + Math.random() * 2; 
     const hike = c * (hikePercent / 100);
     const total = c + hike;
     setNewCtc(total.toFixed(2));
  };

  return (
    <GlassCard title="Salary Hike Predictor" className="h-full flex flex-col">
       <div className="space-y-4 mb-4">
          <InputGroup label="Current CTC (LPA)" id="sal-ctc" type="number" value={ctc} onChange={e=>setCtc(e.target.value)} />
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Performance Rating (1-5)</label>
            <input type="range" min="1" max="5" step="0.5" className="w-full accent-neonBlue" value={rating} onChange={e=>setRating(e.target.value)} />
            <div className="flex justify-between text-[10px] text-slate-400">
               <span>Poor (1)</span>
               <span className="text-neonBlue font-bold text-sm">{rating}</span>
               <span>Star (5)</span>
            </div>
          </div>
       </div>
       <NeonButton onClick={predict}>Predict New CTC</NeonButton>
       
       {newCtc && (
          <div className="mt-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-green-500/30 animate-pulse">
             <span className="text-xs text-slate-500 uppercase">Estimated New Package</span>
             <div className="text-2xl font-bold text-green-500 mt-1">{newCtc} LPA</div>
          </div>
       )}
    </GlassCard>
  );
};

// --- Office Productivity Score ---
export const OfficeScore: React.FC = () => {
  const [focus, setFocus] = useState('');
  const [tasks, setTasks] = useState('');
  const [breaks, setBreaks] = useState('');
  const [score, setScore] = useState<number|null>(null);

  const calculate = () => {
     const f = parseFloat(focus) || 0; // Hours
     const t = parseFloat(tasks) || 0;
     const b = parseFloat(breaks) || 0; // Minutes

     // Formula: (Focus * 10) + (Tasks * 5) - (Breaks/10)
     let s = (f * 10) + (t * 5) - (b / 10);
     setScore(Math.min(100, Math.max(0, Math.round(s))));
  };

  return (
    <GlassCard title="Productivity Score" className="h-full flex flex-col">
       <div className="grid grid-cols-2 gap-3 mb-4">
          <InputGroup label="Focus Hours" id="prod-focus" type="number" value={focus} onChange={e=>setFocus(e.target.value)} />
          <InputGroup label="Tasks Done" id="prod-tasks" type="number" value={tasks} onChange={e=>setTasks(e.target.value)} />
       </div>
       <InputGroup label="Break Mins" id="prod-breaks" type="number" value={breaks} onChange={e=>setBreaks(e.target.value)} />
       
       <NeonButton onClick={calculate} className="mt-2">Get Score</NeonButton>
       
       {score !== null && (
          <div className="mt-4 flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-xl animate-fade-in-up">
             <span className="text-sm font-bold text-slate-700 dark:text-gray-200">Daily Score</span>
             <div className={`text-3xl font-black ${score > 80 ? 'text-neonGreen' : score > 50 ? 'text-neonBlue' : 'text-orange-500'}`}>
                {score}
             </div>
          </div>
       )}
    </GlassCard>
  );
};
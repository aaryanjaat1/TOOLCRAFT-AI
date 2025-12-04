import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, Sector
} from 'recharts';
import { 
  Users, Activity, Server, AlertCircle, TrendingUp, Clock, 
  Globe, Shield, Search, Terminal, LogOut, Mail, Lock, RefreshCw
} from 'lucide-react';
import { GlassCard, NeonButton, InputGroup } from './UI';
import { supabase } from '../lib/supabaseClient';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// --- Helper Functions ---
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return Math.floor(seconds) + " seconds ago";
}

// --- Sub-components ---

const StatCard: React.FC<{ title: string, value: string, sub: string, icon: any, color: string }> = ({ title, value, sub, icon: Icon, color }) => (
  <div className="relative overflow-hidden bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-lg transition-transform hover:-translate-y-1 group">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon size={64} />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-current`}>
          <Icon size={20} className={color.replace('bg-', 'text-')} />
        </div>
        <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider">{title}</h3>
      </div>
      <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{value}</div>
      <div className="text-xs font-medium text-emerald-500 flex items-center gap-1">
        <TrendingUp size={12} /> {sub}
      </div>
    </div>
  </div>
);

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMsg({ type: 'success', text: 'Signup successful! Check email for confirmation or login if auto-confirmed.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setMsg({ type: 'error', text: error.message || 'Authentication failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <GlassCard className="w-full max-w-md p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center mb-6 text-slate-900 dark:text-white">
          <Shield size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin Portal</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
          {isSignUp ? "Create an administrator account." : "Restricted access area. Please authenticate."}
        </p>
        
        <form onSubmit={handleAuth} className="w-full space-y-4">
          <InputGroup 
            label="Email" 
            id="admin-email" 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="admin@toolcraft.ai"
          />
          <InputGroup 
            label="Password" 
            id="admin-pass" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="••••••••"
          />
          
          {msg && (
            <div className={`text-xs font-bold p-2 rounded ${msg.type === 'error' ? 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20' : 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'}`}>
              {msg.text}
            </div>
          )}
          
          <NeonButton type="submit" className="w-full" disabled={loading}>
            {loading ? (isSignUp ? 'Creating...' : 'Authenticating...') : (isSignUp ? 'Create Account' : 'Login')}
          </NeonButton>
        </form>

        <div className="mt-4">
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setMsg(null); }}
            className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-neonBlue underline"
          >
            {isSignUp ? "Already have an account? Login" : "Need an account? Sign Up"}
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

// Custom Active Shape for Pie Chart
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Data State
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [toolUsageData, setToolUsageData] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Data when session is active
  useEffect(() => {
    if (session) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    setDataLoading(true);
    try {
      // 1. Fetch Traffic
      const { data: traffic, error: trafficError } = await supabase
        .from('traffic_stats')
        .select('*')
        .order('date', { ascending: true })
        .limit(7);
      
      if (traffic && !trafficError) {
        // Map database columns to chart keys
        setTrafficData(traffic.map(t => ({ name: t.day_name, visits: t.visits, views: t.views })));
      }

      // 2. Fetch Tools
      const { data: tools, error: toolsError } = await supabase
        .from('tool_stats')
        .select('*')
        .order('usage_count', { ascending: false })
        .limit(5);

      if (tools && !toolsError) {
        setToolUsageData(tools.map(t => ({ name: t.tool_name, value: t.usage_count })));
      }

      // 3. Fetch Logs
      const { data: logs, error: logsError } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (logs && !logsError) {
        setRecentLogs(logs.map(l => ({
          id: l.id,
          action: l.action,
          detail: l.detail,
          ip: l.ip_address,
          time: timeAgo(l.created_at),
          status: l.status
        })));
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (authLoading) {
     return <div className="min-h-[50vh] flex items-center justify-center text-slate-500">Loading auth state...</div>;
  }

  if (!session) {
    return <AdminLogin />;
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Welcome back, <span className="text-blue-600 dark:text-neonBlue">{session.user.email}</span></p>
        </div>
        <div className="flex gap-3">
           <button 
              onClick={fetchDashboardData}
              disabled={dataLoading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
           >
              <RefreshCw size={14} className={dataLoading ? "animate-spin" : ""} /> Refresh
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              <Terminal size={14} /> System Logs
           </button>
           <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors border border-red-500/20">
              <LogOut size={14} /> Logout
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Visits" value="124,592" sub="+12.5% vs last week" icon={Users} color="text-blue-500" />
        <StatCard title="Active Tools" value="42" sub="All systems operational" icon={Activity} color="text-green-500" />
        <StatCard title="Server Load" value="24%" sub="Optimal performance" icon={Server} color="text-purple-500" />
        <StatCard title="Issues" value="3" sub="2 Warnings, 1 Error" icon={AlertCircle} color="text-red-500" />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><TrendingUp size={18} className="text-blue-500"/> Traffic Overview</h3>
             <select className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg px-2 py-1 outline-none border-none">
               <option>Last 7 Days</option>
               <option>Last 30 Days</option>
             </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData.length > 0 ? trafficData : []}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#bc13fe" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#bc13fe" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '0.5rem' }}
                  formatter={(value: number) => [value.toLocaleString(), undefined]}
                />
                <Area type="monotone" dataKey="visits" stroke="#00f3ff" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={3} />
                <Area type="monotone" dataKey="views" stroke="#bc13fe" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Tools Pie Chart */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Search size={18} className="text-purple-500"/> Popular Tools</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={toolUsageData.length > 0 ? toolUsageData : [{name: 'No Data', value: 1}]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  {...({ activeIndex, activeShape: renderActiveShape } as any)}
                >
                  {toolUsageData.length > 0 ? toolUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  )) : <Cell fill="#334155" />}
                </Pie>
                <Tooltip 
                   formatter={(value: number) => [value.toLocaleString(), 'Usage']}
                   contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)', color: '#fff' }}
                   itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}/>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
               <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {toolUsageData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
               </div>
               <div className="text-[10px] text-slate-500 uppercase tracking-wide">Total Runs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Activity Log & Geo Map Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Live Activity Log */}
         <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Clock size={18} className="text-orange-500"/> Recent Activity</h3>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                  <thead className="text-xs uppercase bg-slate-100 dark:bg-white/5 text-slate-500">
                     <tr>
                        <th className="px-4 py-3 rounded-l-lg">Action</th>
                        <th className="px-4 py-3">Detail</th>
                        <th className="px-4 py-3">IP Address</th>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3 rounded-r-lg text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                     {recentLogs.length > 0 ? recentLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                           <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{log.action}</td>
                           <td className="px-4 py-3">{log.detail}</td>
                           <td className="px-4 py-3 font-mono text-xs opacity-70">{log.ip}</td>
                           <td className="px-4 py-3">{log.time}</td>
                           <td className="px-4 py-3 text-right">
                              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                 log.status === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                 log.status === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}>
                                 {log.status}
                              </span>
                           </td>
                        </tr>
                     )) : (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-slate-500">No logs found</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {/* System Info / Map Placeholder */}
         <div className="bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-lg flex flex-col">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Globe size={18} className="text-blue-500"/> User Geography</h3>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 rounded-xl relative overflow-hidden group">
               {/* Abstract Map Dots */}
               <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-full h-full bg-[radial-gradient(circle,_#475569_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
               </div>
               
               {/* Pulsing Dots */}
               <div className="absolute top-1/4 left-1/4">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
               </div>
               <div className="absolute top-1/2 right-1/3">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
               </div>
               <div className="absolute bottom-1/3 left-1/2">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
               </div>

               <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
                  <div className="flex justify-between text-xs text-white font-medium">
                     <span>USA (45%)</span>
                     <span>India (30%)</span>
                     <span>UK (15%)</span>
                  </div>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-2 flex overflow-hidden">
                     <div className="w-[45%] bg-blue-500"></div>
                     <div className="w-[30%] bg-purple-500"></div>
                     <div className="w-[15%] bg-green-500"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
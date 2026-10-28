import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSpreadsheet, Calendar, Mail, FileText, CheckSquare, HardDrive, 
  CheckCircle, ArrowRight, Sparkles, Shield, RefreshCw, ExternalLink, 
  Download, Copy, Lock, User, Globe
} from 'lucide-react';

interface GoogleWorkspaceHubProps {
  onNavigate: (tab: string) => void;
  lang: string;
}

export default function GoogleWorkspaceHub({ onNavigate, lang }: GoogleWorkspaceHubProps) {
  const [user, setUser] = useState<any>(null);
  const [activeTool, setActiveTool] = useState<'drive' | 'calendar' | 'gmail' | 'sheets' | 'docs' | 'tasks'>('drive');
  
  // Tool action states
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastActionStatus, setLastActionStatus] = useState<string | null>(null);

  // Form inputs for Workspace actions
  const [emailRecipient, setEmailRecipient] = useState('');
  const [calendarDate, setCalendarDate] = useState('2026-12-15');
  const [sheetName, setSheetName] = useState('SMID_Identity_Log_2026');
  const [docTitle, setDocTitle] = useState('SMID Official Identity Certificate');
  const [taskTitle, setTaskTitle] = useState('Verify SMID Biometric & Link Social Accounts');

  useEffect(() => {
    const stored = localStorage.getItem('smid_registered_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      if (parsed.email) setEmailRecipient(parsed.email);
    }
  }, []);

  const activeUser = user || {
    name: 'JHON MILLER',
    description: 'Creative Manager',
    accessCode: 'SMID-9876543210',
    country: 'United States',
    phone: '(000) 123 4567',
    email: 'jhon.miller@example.com',
    registeredAt: '12-08-2019',
    expiresAt: '13-08-2028',
    connectedPlatforms: ['Facebook', 'YouTube', 'X / Twitter', 'Instagram', 'LinkedIn']
  };

  // Generic simulation for Google Workspace API integrations
  const handleExecuteWorkspaceAction = (tool: string, actionName: string, successMessage: string) => {
    setIsProcessing(true);
    setLastActionStatus(null);
    setTimeout(() => {
      setIsProcessing(false);
      setLastActionStatus(successMessage);
    }, 1200);
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 text-white relative z-10">
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-3">
          <Globe className="w-3.5 h-3.5" />
          <span>OFFICIAL GOOGLE WORKSPACE SUITE INTEGRATION</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight font-orbitron bg-gradient-to-r from-white via-emerald-200 to-indigo-200 bg-clip-text text-transparent">
          Google Apps & Tools Hub
        </h2>
        <p className="text-xs text-gray-400 mt-2 font-mono max-w-xl mx-auto">
          Seamlessly sync, backup, document, schedule, and email your SMID Identity Credentials across all connected Google Workspace applications.
        </p>
      </div>

      {/* Tool Navigation Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { 
            id: 'drive', 
            name: 'Google Drive', 
            icon: HardDrive, 
            color: 'text-blue-400', 
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/30',
            desc: 'Badge Storage'
          },
          { 
            id: 'calendar', 
            name: 'Calendar', 
            icon: Calendar, 
            color: 'text-amber-400', 
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/30',
            desc: 'Renewal Reminders'
          },
          { 
            id: 'gmail', 
            name: 'Gmail', 
            icon: Mail, 
            color: 'text-red-400', 
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/30',
            desc: 'Send Digital Badge'
          },
          { 
            id: 'sheets', 
            name: 'Google Sheets', 
            icon: FileSpreadsheet, 
            color: 'text-emerald-400', 
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/30',
            desc: 'Social Audit Log'
          },
          { 
            id: 'docs', 
            name: 'Google Docs', 
            icon: FileText, 
            color: 'text-indigo-400', 
            bgColor: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/30',
            desc: 'Certificates'
          },
          { 
            id: 'tasks', 
            name: 'Google Tasks', 
            icon: CheckSquare, 
            color: 'text-cyan-400', 
            bgColor: 'bg-cyan-500/10',
            borderColor: 'border-cyan-500/30',
            desc: 'Verification Items'
          }
        ].map((tool) => {
          const IconComponent = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id as any);
                setLastActionStatus(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-32 ${
                isActive 
                  ? `${tool.bgColor} ${tool.borderColor} shadow-lg shadow-emerald-950/30 ring-2 ring-emerald-500/50` 
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${tool.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold font-orbitron text-white leading-tight">{tool.name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{tool.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Tool Control Box */}
      <div className="bg-slate-950/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* TOOL 1: GOOGLE DRIVE */}
        {activeTool === 'drive' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Google Drive Cloud Storage</h3>
                <p className="text-xs text-gray-400">Store encrypted backup copies of your SMID Lanyard Badge & Identity Tokens</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">Current Identity Backup Payload</h4>
                <div className="text-xs space-y-2 font-mono text-gray-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-gray-500">File Name:</span>
                    <span className="text-white font-bold">{activeUser.name.replace(/\s+/g, '_')}_SMID_Badge.json</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Access ID:</span>
                    <span className="text-emerald-400">{activeUser.accessCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Target Folder:</span>
                    <span className="text-white">/My Drive/SMID_Identity_Backups/</span>
                  </div>
                </div>

                <button
                  onClick={() => handleExecuteWorkspaceAction('drive', 'Backup to Drive', `Successfully saved ${activeUser.name.replace(/\s+/g, '_')}_SMID_Badge.json to Google Drive!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <HardDrive className="w-4 h-4" />}
                  <span>Backup Badge to Google Drive</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Drive Cloud Status</h4>
                <p>Your Google Drive OAuth scope (<code className="text-blue-300">drive.file</code>) allows creating and retrieving app-created SMID credential files safely without exposing your entire drive.</p>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Google Drive OAuth Client connected & scope authorized.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: GOOGLE CALENDAR */}
        {activeTool === 'calendar' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Google Calendar Schedule</h3>
                <p className="text-xs text-gray-400">Schedule automatic SMID identity renewal & bi-annual trust audit reminders</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Create Calendar Event</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Reminder Date</label>
                  <input
                    type="date"
                    value={calendarDate}
                    onChange={(e) => setCalendarDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-white font-bold">Event: Annual SMID Identity & Social Audit</div>
                  <div className="text-gray-400 text-[11px]">Attendees: {activeUser.email}</div>
                  <div className="text-amber-400 text-[10px] font-mono">Recurrence: Annual</div>
                </div>

                <button
                  onClick={() => handleExecuteWorkspaceAction('calendar', 'Schedule Event', `Successfully added Annual SMID Identity Renewal to Google Calendar for ${calendarDate}!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
                  <span>Add Reminder to Google Calendar</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Calendar Integration Benefits</h4>
                <p>Never let your social media passkey or digital trust rating expire without notice. Automated calendar notifications ensure active identity compliance.</p>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Google Calendar OAuth scope (<code className="text-amber-200">calendar.events</code>) ready.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: GMAIL */}
        {activeTool === 'gmail' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Gmail Dispatcher</h3>
                <p className="text-xs text-gray-400">Send encrypted digital SMID badge copies and verification links directly via Gmail</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">Send Badge via Gmail</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Recipient Email Address</label>
                  <input
                    type="email"
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    placeholder="e.g. partner@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-gray-300">
                  <p className="text-red-400 font-bold">Subject: Official SMID Passkey Badge - {activeUser.name}</p>
                  <p className="text-gray-400 text-[10px]">Attached: SMID_Digital_Passkey_Card.pdf & QR Token</p>
                </div>

                <button
                  onClick={() => handleExecuteWorkspaceAction('gmail', 'Send Email', `Digital SMID Badge successfully dispatched to ${emailRecipient} via Gmail!`)}
                  disabled={isProcessing || !emailRecipient}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  <span>Dispatch Badge via Gmail</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">Gmail Integration</h4>
                <p>Send cryptographically verifiable digital proof of your social identity to employers, event organizers, or digital marketplaces.</p>
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Gmail OAuth scope (<code className="text-red-200">gmail.readonly</code>) connected.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 4: GOOGLE SHEETS */}
        {activeTool === 'sheets' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Google Sheets Identity Audit Log</h3>
                <p className="text-xs text-gray-400">Export connected social media handles and cryptographic trust logs into Google Sheets</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Export to Google Sheets</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Spreadsheet Title</label>
                  <input
                    type="text"
                    value={sheetName}
                    onChange={(e) => setSheetName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-gray-300">
                  <p className="text-emerald-400 font-bold">Columns: Platform | Verified Handle | Trust Score | Audit Date</p>
                  <p className="text-gray-400 text-[10px]">Platforms: Facebook, YouTube, X, Instagram, LinkedIn</p>
                </div>

                <button
                  onClick={() => handleExecuteWorkspaceAction('sheets', 'Export Sheet', `Created Google Sheet "${sheetName}" with 5 verified social platforms!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
                  <span>Export Log to Google Sheets</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Sheets Integration</h4>
                <p>Google Sheets gives you full audit visibility over your verified social footprint, timestamps, and trust rating progression over time.</p>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Google Sheets OAuth scope (<code className="text-emerald-200">spreadsheets</code>) ready.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 5: GOOGLE DOCS */}
        {activeTool === 'docs' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Google Docs Official Certificate</h3>
                <p className="text-xs text-gray-400">Generate a formal Google Document formatted as an Official SMID Trust Certificate</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">Generate Google Document</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Document Title</label>
                  <input
                    type="text"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-gray-300">
                  <p className="text-indigo-400 font-bold">Includes: Biometric Seal, Registrar Signature, Audit Log</p>
                  <p className="text-gray-400 text-[10px]">Formatted with official SMID header and cryptographic hash</p>
                </div>

                <button
                  onClick={() => handleExecuteWorkspaceAction('docs', 'Generate Doc', `Official Certificate created in Google Docs as "${docTitle}"!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                  <span>Generate Certificate in Google Docs</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">Docs Integration</h4>
                <p>Google Docs integration formats your SMID identity audit into an editable, printable formal credential document.</p>
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Google Docs OAuth scope (<code className="text-indigo-200">documents</code>) connected.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 6: GOOGLE TASKS */}
        {activeTool === 'tasks' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Google Tasks Checklist</h3>
                <p className="text-xs text-gray-400">Create interactive SMID setup & compliance items inside Google Tasks</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">Add Task Item</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Task Description</label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-gray-300">
                  <p className="text-cyan-400 font-bold">Task List: SMID Identity Compliance</p>
                  <p className="text-gray-400 text-[10px]">Due Date: Today</p>
                </div>

                <button
                  onClick={() => handleExecuteWorkspaceAction('tasks', 'Add Task', `Successfully added task "${taskTitle}" to Google Tasks!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckSquare className="w-4 h-4" />}
                  <span>Push Item to Google Tasks</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">Tasks Integration</h4>
                <p>Stay on top of identity security audits, connected account checks, and biometric renewals directly inside Google Tasks.</p>
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-emerald-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Google Tasks OAuth scope (<code className="text-cyan-200">tasks</code>) connected.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Status Alert Notification */}
        <AnimatePresence>
          {lastActionStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-between gap-3 text-left shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{lastActionStatus}</span>
              </div>
              <button
                onClick={() => setLastActionStatus(null)}
                className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-200 text-[10px] cursor-pointer"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

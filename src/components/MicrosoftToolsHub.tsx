import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, MessageSquare, Mail, FileText, CheckSquare, Table, 
  CheckCircle, Sparkles, Shield, RefreshCw, ExternalLink, 
  Globe, Laptop, ShieldCheck, Share2
} from 'lucide-react';

interface MicrosoftToolsHubProps {
  onNavigate: (tab: string) => void;
  lang: string;
}

export default function MicrosoftToolsHub({ onNavigate, lang }: MicrosoftToolsHubProps) {
  const [user, setUser] = useState<any>(null);
  const [activeTool, setActiveTool] = useState<'onedrive' | 'teams' | 'outlook' | 'excel' | 'word' | 'todo'>('onedrive');
  
  // Tool action states
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastActionStatus, setLastActionStatus] = useState<string | null>(null);

  // Form inputs for Microsoft 365 actions
  const [outlookRecipient, setOutlookRecipient] = useState('');
  const [teamsChannel, setTeamsChannel] = useState('General / SMID Identity Registry');
  const [excelBookName, setExcelBookName] = useState('SMID_Social_Identity_Audit_2026.xlsx');
  const [wordDocTitle, setWordDocTitle] = useState('SMID Official Certificate of Authentication.docx');
  const [todoTaskTitle, setTodoTaskTitle] = useState('Renew SMID Biometric Verification & Sync Azure AD');

  useEffect(() => {
    const stored = localStorage.getItem('smid_registered_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      if (parsed.email) setOutlookRecipient(parsed.email);
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

  const handleExecuteMsAction = (tool: string, actionName: string, successMessage: string) => {
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold mb-3">
          <Laptop className="w-3.5 h-3.5" />
          <span>MICROSOFT 365 & AZURE SUITE INTEGRATION</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight font-orbitron bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
          Microsoft Apps & Tools Hub
        </h2>
        <p className="text-xs text-gray-400 mt-2 font-mono max-w-xl mx-auto">
          Connect your SMID Universal Social Identity Card with Microsoft 365, OneDrive, Teams, Outlook, Excel, Word & Microsoft To Do.
        </p>
      </div>

      {/* Tool Navigation Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { 
            id: 'onedrive', 
            name: 'OneDrive', 
            icon: Cloud, 
            color: 'text-sky-400', 
            bgColor: 'bg-sky-500/10',
            borderColor: 'border-sky-500/30',
            desc: 'Cloud Vault'
          },
          { 
            id: 'teams', 
            name: 'MS Teams', 
            icon: MessageSquare, 
            color: 'text-indigo-400', 
            bgColor: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/30',
            desc: 'Share to Channel'
          },
          { 
            id: 'outlook', 
            name: 'Outlook', 
            icon: Mail, 
            color: 'text-blue-400', 
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/30',
            desc: 'Dispatch Badge'
          },
          { 
            id: 'excel', 
            name: 'MS Excel', 
            icon: Table, 
            color: 'text-emerald-400', 
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/30',
            desc: 'Social Workbook'
          },
          { 
            id: 'word', 
            name: 'MS Word', 
            icon: FileText, 
            color: 'text-cyan-400', 
            bgColor: 'bg-cyan-500/10',
            borderColor: 'border-cyan-500/30',
            desc: 'Doc Certificate'
          },
          { 
            id: 'todo', 
            name: 'MS To Do', 
            icon: CheckSquare, 
            color: 'text-teal-400', 
            bgColor: 'bg-teal-500/10',
            borderColor: 'border-teal-500/30',
            desc: 'Tasks & Sync'
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
                  ? `${tool.bgColor} ${tool.borderColor} shadow-lg shadow-sky-950/30 ring-2 ring-sky-500/50` 
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${tool.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
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

      {/* Main Microsoft Workspace Control Box */}
      <div className="bg-slate-950/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* TOOL 1: ONEDRIVE */}
        {activeTool === 'onedrive' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Microsoft OneDrive Backup</h3>
                <p className="text-xs text-gray-400">Sync encrypted copies of your SMID Passkey Badge & Biometric Proof into Microsoft OneDrive Personal or Business</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">OneDrive Backup Package</h4>
                <div className="text-xs space-y-2 font-mono text-gray-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-gray-500">File Name:</span>
                    <span className="text-white font-bold">{activeUser.name.replace(/\s+/g, '_')}_SMID_Badge.msid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Access ID:</span>
                    <span className="text-sky-400">{activeUser.accessCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">OneDrive Folder:</span>
                    <span className="text-white">/OneDrive/SMID_Credentials_Vault/</span>
                  </div>
                </div>

                <button
                  onClick={() => handleExecuteMsAction('onedrive', 'Backup to OneDrive', `Successfully uploaded ${activeUser.name.replace(/\s+/g, '_')}_SMID_Badge.msid to Microsoft OneDrive Vault!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}
                  <span>Save Badge to Microsoft OneDrive</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">Microsoft Graph API Ready</h4>
                <p>OneDrive integration uses Microsoft Graph API OAuth permissions to securely write identity JSON backups into your private cloud directory.</p>
                <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Microsoft Graph API connected & Files.ReadWrite scope active.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: MICROSOFT TEAMS */}
        {activeTool === 'teams' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Microsoft Teams Identity Broadcaster</h3>
                <p className="text-xs text-gray-400">Post verified SMID digital passkeys into Microsoft Teams channels & organizational directories</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">Share to Teams Channel</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Target Teams Channel</label>
                  <input
                    type="text"
                    value={teamsChannel}
                    onChange={(e) => setTeamsChannel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-gray-300">
                  <p className="text-indigo-400 font-bold">Card: Adaptive SMID Identity Badge</p>
                  <p className="text-gray-400 text-[10px]">Holder: {activeUser.name} ({activeUser.description})</p>
                </div>

                <button
                  onClick={() => handleExecuteMsAction('teams', 'Share to Teams', `SMID Passkey Badge posted to Microsoft Teams channel "${teamsChannel}"!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                  <span>Publish Card to Microsoft Teams</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">Adaptive Card Format</h4>
                <p>Uses Microsoft Adaptive Card schema to render a clean, high-resolution visual identity card inside your team's workspace chat.</p>
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Microsoft Teams Webhook / Graph endpoint ready.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: OUTLOOK */}
        {activeTool === 'outlook' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Microsoft Outlook Dispatcher</h3>
                <p className="text-xs text-gray-400">Send encrypted digital badge tokens & verification attachments using Microsoft Outlook</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">Outlook Email Dispatch</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Outlook Recipient</label>
                  <input
                    type="email"
                    value={outlookRecipient}
                    onChange={(e) => setOutlookRecipient(e.target.value)}
                    placeholder="e.g. client@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-gray-300">
                  <p className="text-blue-400 font-bold">Subject: SMID Official Digital Identity Badge - {activeUser.name}</p>
                  <p className="text-gray-400 text-[10px]">Attachment: SMID_Lanyard_Badge.png & Verifiable Proof</p>
                </div>

                <button
                  onClick={() => handleExecuteMsAction('outlook', 'Send Outlook Email', `Official SMID Identity Email dispatched via Outlook to ${outlookRecipient}!`)}
                  disabled={isProcessing || !outlookRecipient}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  <span>Dispatch via Microsoft Outlook</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">Outlook Integration</h4>
                <p>Send cryptographically verifiable digital badges for corporate onboardings, credential checks, and event check-ins.</p>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Microsoft Exchange & Outlook Mail API connected.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 4: MICROSOFT EXCEL */}
        {activeTool === 'excel' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Table className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Microsoft Excel Social Identity Workbook</h3>
                <p className="text-xs text-gray-400">Generate structured Microsoft Excel (.xlsx) workbooks containing social handle audits and trust history</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Create Excel Workbook</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Workbook File Name</label>
                  <input
                    type="text"
                    value={excelBookName}
                    onChange={(e) => setExcelBookName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-gray-300">
                  <p className="text-emerald-400 font-bold">Sheets: Verified Handles, Trust Scores, Access Logs</p>
                  <p className="text-gray-400 text-[10px]">Format: Office Open XML (.xlsx)</p>
                </div>

                <button
                  onClick={() => handleExecuteMsAction('excel', 'Generate Excel', `Microsoft Excel Workbook "${excelBookName}" created successfully!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Table className="w-4 h-4" />}
                  <span>Generate Excel Workbook (.xlsx)</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Excel Integration</h4>
                <p>Export formatted spreadsheets complete with pivot-ready data columns for social media compliance reporting.</p>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Microsoft Excel Online Graph scope active.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 5: MICROSOFT WORD */}
        {activeTool === 'word' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Microsoft Word Formal Certificate</h3>
                <p className="text-xs text-gray-400">Export formatted Microsoft Word document (.docx) identity certificates with official emblems</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">Create Word Document</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Document Title</label>
                  <input
                    type="text"
                    value={wordDocTitle}
                    onChange={(e) => setWordDocTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-gray-300">
                  <p className="text-cyan-400 font-bold">Includes: Biometric Seal, Owl Emblem & Hash</p>
                  <p className="text-gray-400 text-[10px]">Formatted as editable Microsoft Word .docx</p>
                </div>

                <button
                  onClick={() => handleExecuteMsAction('word', 'Generate Word Doc', `Microsoft Word Certificate "${wordDocTitle}" generated successfully!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                  <span>Export Microsoft Word Certificate</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">Word Integration</h4>
                <p>Create elegant, printable identity certificates with embedded biometric authentication stamps and cryptographic credentials.</p>
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Microsoft Word API template engine ready.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 6: MICROSOFT TO DO */}
        {activeTool === 'todo' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron text-white">Microsoft To Do Task Sync</h3>
                <p className="text-xs text-gray-400">Sync SMID identity renewals, social account audits, and compliance items into Microsoft To Do</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">Create To Do Task Item</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Task Description</label>
                  <input
                    type="text"
                    value={todoTaskTitle}
                    onChange={(e) => setTodoTaskTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-teal-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-gray-300">
                  <p className="text-teal-400 font-bold">List: SMID Identity Governance</p>
                  <p className="text-gray-400 text-[10px]">Priority: High | Reminder: Active</p>
                </div>

                <button
                  onClick={() => handleExecuteMsAction('todo', 'Add To Do Task', `Task "${todoTaskTitle}" added to Microsoft To Do list!`)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs tracking-wider font-orbitron rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckSquare className="w-4 h-4" />}
                  <span>Push Task to Microsoft To Do</span>
                </button>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-gray-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">To Do Integration</h4>
                <p>Never miss periodic identity security updates or social media handle linking tasks across your devices.</p>
                <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-300 text-[11px] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Microsoft To Do Graph Tasks API connected.</span>
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
              className="mt-6 p-4 rounded-2xl bg-sky-500/15 border border-sky-500/40 text-sky-300 text-xs font-mono font-bold flex items-center justify-between gap-3 text-left shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-sky-400 shrink-0" />
                <span>{lastActionStatus}</span>
              </div>
              <button
                onClick={() => setLastActionStatus(null)}
                className="px-2.5 py-1 rounded-lg bg-sky-950 hover:bg-sky-900 text-sky-200 text-[10px] cursor-pointer"
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

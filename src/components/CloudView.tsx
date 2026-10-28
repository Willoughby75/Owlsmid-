import { useState, useEffect, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Upload, Trash2, Download, CheckCircle, Database, RefreshCw, Sparkles, FileText, FileImage } from 'lucide-react';

interface CloudFile {
  name: string;
  size: string;
  uploadedAt: string;
  type: 'pdf' | 'img' | 'doc';
  icon: string;
}

interface CloudViewProps {
  lang: string;
}

export default function CloudView({ lang }: CloudViewProps) {
  const [files, setFiles] = useState<CloudFile[]>([
    { name: 'Birth_Certificate.pdf', size: '1.2 MB', uploadedAt: '2 days ago', type: 'pdf', icon: '📄' },
    { name: 'Government_ID.jpg', size: '2.4 MB', uploadedAt: '1 week ago', type: 'img', icon: '🪪' },
    { name: 'Face_Scan_001.png', size: '856 KB', uploadedAt: '3 days ago', type: 'img', icon: '📸' }
  ]);

  const [syncLogs, setSyncLogs] = useState([
    { message: 'Face_Scan_001.png synced to secure cloud', time: '2h ago', status: 'success' },
    { message: 'Birth_Certificate.pdf uploaded', time: '2d ago', status: 'success' },
    { message: 'Government_ID.jpg uploaded', time: '1w ago', status: 'success' }
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Storage maths
  const parseSizeToMB = (sizeStr: string): number => {
    const parts = sizeStr.split(' ');
    const val = parseFloat(parts[0]);
    if (parts[1] === 'KB') return val / 1024;
    return val;
  };

  const totalUsedStorage = files.reduce((acc, f) => acc + parseSizeToMB(f.size), 0);
  const maxStorage = 5120; // 5 GB in MB
  const usagePercent = Math.min(100, (totalUsedStorage / maxStorage) * 100);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateFileUpload(e.dataTransfer.files[0].name);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateFileUpload(e.target.files[0].name);
    }
  };

  const simulateFileUpload = (filename: string) => {
    setIsUploading(true);
    
    setTimeout(() => {
      // Create new file
      const isPdf = filename.endsWith('.pdf');
      const sizeRandom = (Math.random() * 2 + 0.1).toFixed(1);
      
      const newFile: CloudFile = {
        name: filename,
        size: `${sizeRandom} MB`,
        uploadedAt: 'Just now',
        type: isPdf ? 'pdf' : 'img',
        icon: isPdf ? '📄' : '📸'
      };

      setFiles(prev => [newFile, ...prev]);
      setSyncLogs(prev => [
        { message: `${filename} synced to secure cloud`, time: 'Just now', status: 'success' },
        ...prev
      ]);
      
      setIsUploading(false);
      alert(`Successfully uploaded and encrypted file: ${filename}`);
    }, 1200);
  };

  const handleDeleteFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
    setSyncLogs(prev => [
      { message: `${fileName} deleted from directories`, time: 'Just now', status: 'pending' },
      ...prev
    ]);
  };

  const handleDownloadFile = (fileName: string) => {
    alert(`Secure credential decryption successful! Downloading decrypted payload: ${fileName}`);
  };

  return (
    <div className="py-12 relative z-10 text-white max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight font-orbitron bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
          Encrypted Cloud Storage
        </h2>
        <p className="text-xs text-gray-400 mt-1.5 uppercase tracking-widest font-mono">
          Decentralized verification credential directory
        </p>
      </div>

      {/* Cloud Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-left">
        <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Used Storage</span>
          <span className="text-2xl font-black font-orbitron text-indigo-400">
            {totalUsedStorage.toFixed(2)} MB
          </span>
        </div>
        <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Total Limit</span>
          <span className="text-2xl font-black font-orbitron text-gray-300">5.0 GB</span>
        </div>
        <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Total Files</span>
          <span className="text-2xl font-black font-orbitron text-indigo-400">{files.length}</span>
        </div>
        <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Sync Status</span>
          <span className="text-2xl font-black font-orbitron text-emerald-400 flex items-center gap-1.5">
            ✓ <span className="text-[10px] tracking-widest text-emerald-400 font-mono uppercase font-bold">Active</span>
          </span>
        </div>
      </div>

      {/* Storage usage Progress line */}
      <div className="bg-slate-900/15 border border-slate-800/60 rounded-2xl p-5 mb-10 text-left">
        <div className="flex justify-between items-center text-xs font-semibold text-gray-400 mb-2">
          <span>Overall storage capacity allocation</span>
          <span className="font-mono text-indigo-400 font-bold">{usagePercent.toFixed(4)}% used</span>
        </div>
        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-300 relative"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>

      {/* Upload Zone */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('cloud-file-input')?.click()}
        style={{
          borderColor: isDragging ? '#10b981' : 'rgba(99, 102, 241, 0.3)',
          background: isDragging ? 'rgba(16, 185, 129, 0.05)' : 'rgba(15, 23, 42, 0.3)'
        }}
        className="border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all hover:bg-indigo-950/5 mb-10 select-none group relative overflow-hidden"
      >
        <input 
          type="file" 
          id="cloud-file-input" 
          onChange={handleFileInput}
          className="hidden" 
          accept="image/*,.pdf,.doc,.docx"
        />
        
        <div className="w-16 h-16 bg-indigo-500/10 rounded-full border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-4 group-hover:scale-110 transition-all">
          {isUploading ? (
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
          ) : (
            <Cloud className="w-8 h-8" />
          )}
        </div>

        <h3 className="text-base font-bold text-gray-100 mb-1">
          {isUploading ? 'Uploading & Encrypting Document...' : 'Drop identity documents here or click to browse'}
        </h3>
        <p className="text-xs text-gray-400">
          Accepts PNG, JPG, PDF, DOC up to 50MB each. Safe, encrypted vault storage.
        </p>
      </div>

      {/* Files Grid Header */}
      <div className="text-left mb-4">
        <h3 className="text-lg font-bold font-orbitron tracking-wide text-white">📁 Active Directory Files</h3>
      </div>

      {/* Files grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 hover:border-slate-700/60 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl rounded-xl shrink-0">
                {file.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-100 truncate">{file.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{file.size} • Uploaded {file.uploadedAt}</p>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => handleDownloadFile(file.name)}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-indigo-500 text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteFile(file.name)}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-pink-500 text-gray-400 hover:text-pink-400 transition-all cursor-pointer"
                  title="Delete File"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {files.length === 0 && (
          <div className="col-span-2 py-10 bg-slate-900/20 border border-dashed border-slate-800 rounded-2xl text-center text-xs text-gray-500">
            Vault is empty. Drag and drop verification items to upload credentials.
          </div>
        )}
      </div>

      {/* Sync Log Panel */}
      <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 text-left">
        <h4 className="text-sm font-bold font-orbitron text-gray-300 tracking-wider mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400" /> Active Sync Activity
        </h4>

        <div className="space-y-3 font-mono text-[11px] max-h-48 overflow-y-auto pr-2">
          {syncLogs.map((log, idx) => (
            <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-800/40 last:border-none">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-gray-300">{log.message}</span>
              </div>
              <span className="text-gray-500 shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Award, UserCheck, Lock, CreditCard, CheckCircle, 
  ChevronRight, ChevronLeft, Upload, RefreshCw, Smartphone, 
  Tv, Sparkles, AlertCircle, Copy, Check, Globe, HelpCircle,
  FileText, Fingerprint, Camera, VideoOff
} from 'lucide-react';
import SmidOwlLogo from './SmidOwlLogo';
import owlBgImage from '../assets/images/owl_feather_bg_1784762026936.jpg';
import { playOwlHoot } from '../utils/audio';

interface RegisterViewProps {
  onNavigate: (tab: string) => void;
  lang: string;
}

export default function RegisterView({ onNavigate, lang }: RegisterViewProps) {
  // --- Category Config ---
  const categoryConfig = {
    tsmid: {
      id: 'tsmid',
      name: 'TSMID',
      label: 'Teen Social Media ID',
      color: '#22c55e', // Emerald
      icon: '🎮',
      price: 'FREE',
      methods: ['Birth Certificate / Student ID', 'Selfie / Face Scan Verification', 'Age-Appropriate Content Safety Clearance'],
      fields: ['teenName', 'teenAge', 'dob', 'country', 'phone', 'email'],
      faceScans: 1,
      payment: false
    },
    tasmid: {
      id: 'tasmid',
      name: 'TASMID',
      label: 'Teen & Adult Social Media ID',
      color: '#f59e0b', // Amber/Warning
      icon: '🛡️',
      price: 'FREE',
      methods: ['Parent/Guardian Consent Form', 'Birth Certificate & Parent ID', 'Age-Appropriate Content Safety Clearance'],
      fields: ['parentName', 'parentPetName', 'teenName', 'teenAge', 'schoolName', 'country', 'phone', 'email'],
      faceScans: 2,
      payment: false
    },
    asmid: {
      id: 'asmid',
      name: 'ASMID',
      label: 'Adult Social Media ID',
      color: '#06b6d4', // Cyan/Blue
      icon: '👤',
      price: 'FREE',
      methods: ['Government Identity Card', 'International Passport', 'Driver\'s License'],
      fields: ['name', 'petName', 'dob', 'country', 'phone', 'email'],
      faceScans: 1,
      payment: false
    },
    bsmid: {
      id: 'bsmid',
      name: 'BSMID',
      label: 'Business Social Media ID',
      color: '#a855f7', // Purple
      icon: '🏢',
      price: 'FREE',
      methods: ['Business Registration Certificate', 'Corporate Tax Certificate', 'Utility Verification Bill'],
      fields: ['businessName', 'govVerification', 'country', 'phone', 'email'],
      faceScans: 1,
      payment: false
    },
    minibsmid: {
      id: 'minibsmid',
      name: 'MINIBSMID',
      label: 'Mini Business Social Media ID',
      color: '#ec4899', // Pink
      icon: '🌱',
      price: 'FREE',
      methods: ['Online Storefront Link (Shopify/Etsy/Amazon)', 'Social Commerce Profile URL', 'Domain Purchase Invoice', 'Digital Payment Merchant screen'],
      fields: ['businessName', 'govVerification', 'country', 'phone', 'email'],
      faceScans: 1,
      payment: false
    }
  };

  // --- Registration State ---
  const [selectedCat, setSelectedCat] = useState<'tsmid' | 'tasmid' | 'asmid' | 'bsmid' | 'minibsmid' | null>(null);
  const [isRegStarted, setIsRegStarted] = useState(false);
  const [step, setStep] = useState(1); // 1: Verify, 2: Identity, 3: Biometric, 4: Access, 5: Payment, 6: Review, 7: Success
  
  // Form State
  const [formData, setFormData] = useState({
    verificationMethod: '',
    name: '',
    petName: '',
    parentName: '',
    parentPetName: '',
    teenName: '',
    teenAge: '',
    schoolName: '',
    businessName: '',
    govVerification: '',
    dob: '',
    description: '',
    country: 'United States',
    phone: '',
    email: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    termsAccepted: false
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [accessSignature, setAccessSignature] = useState('');
  const [copied, setCopied] = useState(false);

  // Existing user state check
  const [existingUser, setExistingUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('smid_registered_user');
      if (stored) {
        try {
          setExistingUser(JSON.parse(stored));
        } catch (e) {
          setExistingUser(null);
        }
      } else {
        setExistingUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);
  // Custom/Unknown Document States
  const [isCustomDocument, setIsCustomDocument] = useState(false);
  const [customDocName, setCustomDocName] = useState('');

  // Biometric Scan States
  const [scanProgress, setScanProgress] = useState(0);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [activeScanIndex, setActiveScanIndex] = useState(1); // For TASMID which has 2 scans
  const [scanText, setScanText] = useState('Position face inside the scanner and click Start');
  const [detectedPoints, setDetectedPoints] = useState<string[]>([]);
  const scannerInterval = useRef<NodeJS.Timeout | null>(null);

  // Fullscreen Burst Animation State
  const [showBurst, setShowBurst] = useState(false);

  // --- Real Camera Scan States ---
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraMode, setCameraMode] = useState<'user' | 'environment'>('environment');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const faceVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeStreamRef = useRef<MediaStream | null>(null);

  const startDocumentCamera = async (mode: 'user' | 'environment' = cameraMode) => {
    setCameraError(null);
    setCapturedImage(null);
    
    // Stop any existing stream
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    try {
      const constraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      activeStreamRef.current = stream;
      setCameraActive(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err: any) {
      console.error("Camera access error:", err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStream(fallbackStream);
        activeStreamRef.current = fallbackStream;
        setCameraActive(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
          }
        }, 100);
      } catch (fallbackErr: any) {
        setCameraError(
          "Could not access camera. Please ensure permissions are granted and you are not blocked by browser sandbox. Or use simulated verification."
        );
      }
    }
  };

  const stopDocumentCamera = () => {
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach(track => track.stop());
      activeStreamRef.current = null;
    }
    setCameraStream(null);
    setCameraActive(false);
  };

  const toggleCameraMode = () => {
    const nextMode = cameraMode === 'user' ? 'environment' : 'user';
    setCameraMode(nextMode);
    if (cameraActive) {
      startDocumentCamera(nextMode);
    }
  };

  const captureDocumentPhoto = () => {
    if (!videoRef.current) return;
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (cameraMode === 'user') {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
        
        stopDocumentCamera();
        
        setUploadedFiles(prev => ({
          ...prev,
          [formData.verificationMethod]: `Real_Camera_Scan_${Date.now().toString().slice(-4)}.png`
        }));
      }
    } catch (err) {
      console.error("Failed to capture image:", err);
    }
  };

  const startBiometricFaceCamera = async () => {
    try {
      if (activeStreamRef.current) {
        activeStreamRef.current.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 320, height: 320 },
        audio: false
      });
      activeStreamRef.current = stream;
      if (faceVideoRef.current) {
        faceVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Could not access front camera for biometric face mapping:", err);
    }
  };

  const stopBiometricFaceCamera = () => {
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach(track => track.stop());
      activeStreamRef.current = null;
    }
  };

  // --- Alternative Birth Certificate Helper State ---
  const [showBirthCertificateHelper, setShowBirthCertificateHelper] = useState(false);
  const [showMiniBsmidHelper, setShowMiniBsmidHelper] = useState(false);
  const [miniBsmidForm, setMiniBsmidForm] = useState({
    businessName: '',
    registrationType: 'Online Storefront Link (Shopify/Etsy/Amazon)',
    country: 'United States',
    documentText: 'Active online store link with dynamic custom listings, inventory updates, and integrated secure checkout indicators.'
  });
  const [mbIsLoading, setMbIsLoading] = useState(false);
  const [mbScanStep, setMbScanStep] = useState(0);
  const [mbError, setMbError] = useState<string | null>(null);
  const [mbResult, setMbResult] = useState<{
    isValid: boolean;
    trustScore: number;
    verifiedBusinessName: string;
    verifiedRegistrationType: string;
    verificationSeal: string;
    auditLog: string;
    nextSteps: string;
  } | null>(null);

  const handleVerifyMiniBsmidPapers = async (e: React.FormEvent) => {
    e.preventDefault();
    setMbIsLoading(true);
    setMbError(null);
    setMbResult(null);
    setMbScanStep(1);

    const stages = [
      "Accessing SMID Micro-Biz Register...",
      "Analyzing municipal stamp watermark...",
      "Extracting licensing registry signatures...",
      "Validating business name registration text...",
      "Running Gemini Flash structured document audit..."
    ];

    for (let i = 0; i < stages.length; i++) {
      setMbScanStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const res = await fetch('/api/verify/mini-bsmid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          businessName: miniBsmidForm.businessName,
          registrationType: miniBsmidForm.registrationType,
          country: miniBsmidForm.country,
          documentText: miniBsmidForm.documentText
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Micro-Business Trust Audit failed.");
      }

      const data = await res.json();
      setMbResult(data);
    } catch (err: any) {
      console.error(err);
      setMbError(err.message || "An error occurred during business paper verification.");
    } finally {
      setMbIsLoading(false);
      setMbScanStep(0);
    }
  };

  const handleApplyMbCertificate = () => {
    if (!mbResult) return;
    
    // Auto-populate form details based on Mini BSMID verification results
    setFormData(prev => ({
      ...prev,
      verificationMethod: 'Mini BSMID Verified Digital Token',
      businessName: mbResult.verifiedBusinessName,
      country: miniBsmidForm.country || prev.country
    }));

    // Save virtual file proof
    setUploadedFiles(prev => ({
      ...prev,
      'Mini BSMID Verified Digital Token': `${mbResult.verificationSeal}_starter_audit.pdf`
    }));

    // Automatically generate security sync signature from verification seal
    setAccessSignature(mbResult.verificationSeal);

    // Close helper
    setShowMiniBsmidHelper(false);
  };

  const handleSimulateMbAutoFill = () => {
    setMiniBsmidForm({
      businessName: 'Tosin Awosika Handcrafts',
      registrationType: 'Online Storefront Link (Shopify/Etsy/Amazon)',
      country: 'United Kingdom',
      documentText: 'Active Etsy shop URL: https://www.etsy.com/shop/TosinAwosikaHandcrafts displaying 45 handcrafted crochet accessories, stellar 5-star merchant feedback history, active domain tosinhandcrafts.co.uk DNS record verification, and linked business Instagram page.'
    });
  };
  const [bcForm, setBcForm] = useState({
    fullName: '',
    dob: '',
    parentName: '',
    registryState: 'California Department of Public Health',
    sealNumber: 'BC-918204-CA',
    documentText: 'Official Civil Registry Certificate of Live Birth containing embossed state seal, registrar signature, and microprint background verification.'
  });
  const [bcIsLoading, setBcIsLoading] = useState(false);
  const [bcScanStep, setBcScanStep] = useState(0);
  const [bcError, setBcError] = useState<string | null>(null);
  const [bcResult, setBcResult] = useState<{
    isValid: boolean;
    trustScore: number;
    verifiedName: string;
    verifiedDob: string;
    verificationSeal: string;
    auditLog: string;
    nextSteps: string;
  } | null>(null);

  const handleVerifyBirthCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setBcIsLoading(true);
    setBcError(null);
    setBcResult(null);
    setBcScanStep(1);

    const stages = [
      "Connecting to SMID Secure Trust API...",
      "Extracting digital seal coordinates...",
      "Analyzing registry stamp authenticity...",
      "Validating birth record indexes...",
      "Running Gemini Flash neural watermark audit..."
    ];

    for (let i = 0; i < stages.length; i++) {
      setBcScanStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const res = await fetch('/api/verify/birth-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: bcForm.fullName,
          dob: bcForm.dob,
          parentName: bcForm.parentName,
          documentText: `${bcForm.documentText} [Registry: ${bcForm.registryState}, Seal No: ${bcForm.sealNumber}]`
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Birth Certificate Trust Audit failed.");
      }

      const data = await res.json();
      setBcResult(data);
    } catch (err: any) {
      console.error(err);
      setBcError(err.message || "An error occurred during verification.");
    } finally {
      setBcIsLoading(false);
      setBcScanStep(0);
    }
  };

  const handleApplyBcCertificate = () => {
    if (!bcResult) return;
    
    // Auto-populate form details based on alternative birth certificate verification results
    setFormData(prev => ({
      ...prev,
      verificationMethod: 'Alternative Birth Certificate Trust Token',
      name: bcResult.verifiedName,
      teenName: bcResult.verifiedName,
      dob: bcResult.verifiedDob,
      parentName: bcForm.parentName || prev.parentName
    }));

    // Save virtual file proof
    setUploadedFiles(prev => ({
      ...prev,
      'Alternative Birth Certificate Trust Token': `${bcResult.verificationSeal}_verified_audit.pdf`
    }));

    // Automatically generate security sync signature from birth certificate seal
    setAccessSignature(bcResult.verificationSeal);

    // Close helper
    setShowBirthCertificateHelper(false);
  };

  const handleSimulateAutoFill = () => {
    setBcForm({
      fullName: 'Tosin Awosika',
      dob: '2008-05-15',
      parentName: 'Sarah Awosika',
      registryState: 'London Civil Register & Records Office',
      sealNumber: 'UK-BC-892401-A',
      documentText: 'Certified copy of an entry of birth pursuant to the Births and Deaths Registration Act. Official registrar seal and watermark verified.'
    });
  };

  // File explorer triggering
  const handleFileUpload = (fieldName: string, fileName: string) => {
    setUploadedFiles(prev => ({ ...prev, [fieldName]: fileName }));
  };

  // Trigger registration entry
  const handleStartReg = () => {
    if (!selectedCat) return;
    setIsRegStarted(true);
    setStep(1);
    setIsCustomDocument(false);
    setCustomDocName('');
    // Initialize default verification method
    setFormData(prev => ({
      ...prev,
      verificationMethod: categoryConfig[selectedCat].methods[0]
    }));
  };

  // Navigate steps with validation
  const validateStep = (currentStep: number): boolean => {
    if (!selectedCat) return false;
    const config = categoryConfig[selectedCat];

    if (currentStep === 1) {
      if (!formData.verificationMethod) {
        alert('Please select a verification document method to proceed.');
        return false;
      }
    }

    if (currentStep === 2) {
      if (selectedCat === 'tsmid') {
        if (!formData.teenName || !formData.dob || !formData.email) {
          alert('Please fill out all Teen identity information fields.');
          return false;
        }
        const age = parseInt(formData.teenAge);
        if (isNaN(age) || age < 13 || age > 17) {
          alert('Teen age must be between 13 and 17 for TSMID.');
          return false;
        }
      } else if (selectedCat === 'tasmid') {
        if (!formData.teenName || !formData.parentName || !formData.dob || !formData.email) {
          alert('Please fill out all Teen and Parent/Guardian identity fields.');
          return false;
        }
        const age = parseInt(formData.teenAge);
        if (isNaN(age) || age < 13 || age > 17) {
          alert('Teen age must be between 13 and 17 for TASMID (Teen & Adult Social Media ID) with parental consent.');
          return false;
        }
      } else if (selectedCat === 'asmid') {
        if (!formData.name || !formData.dob || !formData.phone || !formData.email) {
          alert('Please fill out all mandatory Adult Identity fields.');
          return false;
        }
        const birthYear = new Date(formData.dob).getFullYear();
        const currentYear = new Date().getFullYear();
        if (currentYear - birthYear < 18) {
          alert('ASMID requires users to be 18 years or older.');
          return false;
        }
      } else if (selectedCat === 'bsmid') {
        if (!formData.businessName || !formData.govVerification || !formData.email || !formData.phone) {
          alert('Please fill out all Business Registration fields.');
          return false;
        }
      }
    }

    if (currentStep === 3) {
      if (scanState !== 'success') {
        alert('Please complete the simulated circular biometric face scan first.');
        return false;
      }
    }

    if (currentStep === 4) {
      if (connectedPlatforms.length === 0) {
        alert('Please connect at least one social media platform account.');
        return false;
      }
      if (!accessSignature) {
        alert('Please click Generate Sync Signature before continuing.');
        return false;
      }
    }

    if (currentStep === 5) {
      if (config.payment) {
        if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
          alert('Please input credit card details for tier billing validation.');
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      stopDocumentCamera();
      stopBiometricFaceCamera();
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    stopDocumentCamera();
    stopBiometricFaceCamera();
    setStep(prev => Math.max(1, prev - 1));
  };

  // --- Biometric Face Scanner Simulation ---
  const handleStartScan = async () => {
    if (scanState === 'scanning' || scanState === 'success') return;

    setScanState('scanning');
    setScanProgress(0);
    setDetectedPoints([]);
    setScanText(`Initializing high-resolution optical facial mapper [Scan ${activeScanIndex}]...`);

    // Start physical front camera stream
    await startBiometricFaceCamera();

    const points = [
      'Nasal Bridge aligned',
      'Left Pupil locked',
      'Right Pupil locked',
      'Jaw Contour mapped',
      'Temporal outline registered',
      'Biometric hash bound'
    ];

    let currentProgress = 0;
    scannerInterval.current = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(scannerInterval.current!);
        stopBiometricFaceCamera();
        
        const config = selectedCat ? categoryConfig[selectedCat] : null;
        if (config && config.faceScans === 2 && activeScanIndex === 1) {
          setScanState('idle');
          setScanProgress(0);
          setActiveScanIndex(2);
          setScanText('First scan successful! Please look directly forward and click scan for Phase 2 depth verification.');
          alert('Phase 1 complete! Please align once more for Phase 2 structural mapping.');
        } else {
          setScanState('success');
          setScanText('Biometric identification match confirmed and cryptographically locked.');
        }
      } else {
        setScanProgress(currentProgress);
        // Gradually reveal points
        const pointIdx = Math.floor((currentProgress / 100) * points.length);
        if (pointIdx > detectedPoints.length && points[pointIdx - 1]) {
          setDetectedPoints(prev => [...prev, points[pointIdx - 1]]);
          setScanText(`MAPPING: ${points[pointIdx - 1]}...`);
        }
      }
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (scannerInterval.current) clearInterval(scannerInterval.current);
      if (activeStreamRef.current) {
        activeStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // --- Platform Accounts Sync & Access Signature Generator ---
  const togglePlatform = (plat: string) => {
    if (connectedPlatforms.includes(plat)) {
      setConnectedPlatforms(prev => prev.filter(p => p !== plat));
    } else {
      setConnectedPlatforms(prev => [...prev, plat]);
    }
  };

  const handleGenerateSignature = () => {
    if (connectedPlatforms.length === 0) {
      alert('Please connect or choose at least one platform.');
      return;
    }
    // Generate an authentic holographic accession code
    const randSegment = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const signature = `SMID-${randSegment()}-${randSegment()}-${randSegment()}`;
    setAccessSignature(signature);
  };

  // --- Submission Process & Visual Celebration Burst ---
  const handleSubmit = () => {
    if (!formData.termsAccepted) {
      alert('Please read and agree to the SMID terms and biometric data processing clauses.');
      return;
    }

    setShowBurst(true);
    // After 2.5 seconds of glowing success overlay, push into success phase and store in DB
    setTimeout(() => {
      setShowBurst(false);
      setStep(7); // Show success screen

      // Store in local storage to sync layout throughout the site!
      const finalUser = {
        category: selectedCat,
        categoryName: selectedCat ? categoryConfig[selectedCat].name : '',
        categoryLabel: selectedCat ? categoryConfig[selectedCat].label : 'Adult Social Media ID',
        name: formData.name || formData.teenName || formData.businessName || 'JHON MILLER',
        description: formData.description || (selectedCat ? categoryConfig[selectedCat].label : 'Creative Manager'),
        age: formData.teenAge || (formData.dob ? '28' : '28'),
        petName: formData.petName || formData.parentPetName || '',
        parentName: formData.parentName,
        schoolName: formData.schoolName,
        businessName: formData.businessName,
        dob: formData.dob || '03-07-1997',
        country: formData.country || 'United States',
        phone: formData.phone || '(000) 123 4567',
        email: formData.email || 'your email goes here',
        accessCode: accessSignature || '9876543210',
        connectedPlatforms: connectedPlatforms.length > 0 ? connectedPlatforms : ['Facebook', 'YouTube', 'X / Twitter', 'Instagram', 'LinkedIn'],
        faceVerified: true,
        registeredAt: new Date().toLocaleDateString(),
        expiresAt: '13-08-2028',
        filesCount: Object.keys(uploadedFiles).length + 1
      };
      localStorage.setItem('smid_registered_user', JSON.stringify(finalUser));
      
      // Dispatch storage event to trigger immediate header/nav update
      window.dispatchEvent(new Event('storage'));
    }, 2200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessSignature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper lists
  const availablePlatforms = [
    { name: 'X / Twitter', icon: '🐦' },
    { name: 'Facebook', icon: '👥' },
    { name: 'Instagram', icon: '📸' },
    { name: 'LinkedIn', icon: '💼' },
    { name: 'TikTok', icon: '🎵' },
    { name: 'YouTube', icon: '📺' },
    { name: 'Discord', icon: '🎮' },
    { name: 'Snapchat', icon: '👻' }
  ];

  return (
    <div className="py-8 relative z-10 text-white max-w-4xl mx-auto">
      {/* Visual Celebration Burst */}
      <AnimatePresence>
        {showBurst && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.6, rotate: -20 }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-28 h-28 bg-emerald-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-[0_0_50px_rgba(16,185,129,0.5)] border-4 border-emerald-300"
            >
              ✓
            </motion.div>
            <h2 className="text-3xl font-orbitron font-extrabold text-emerald-400 mt-8 tracking-widest uppercase">
              Identity Verified
            </h2>
            <p className="text-gray-400 mt-4 max-w-md text-center text-sm px-6">
              SMID Cryptographic Engine has matched biometric signatures and signed access tokens. Saving details to cloud directory...
            </p>
            <div className="mt-8 flex gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-100" />
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-200" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight font-orbitron bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          SMID Secure Registration
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          {isRegStarted 
            ? `Step ${step} of 6 — ${categoryConfig[selectedCat!].name} Configuration` 
            : 'Select an identity category below to begin secure online credentialing'}
        </p>
      </div>

      {/* ACTIVE REGISTERED USER BANNER */}
      {existingUser && !isRegStarted && (
        <div className="mb-8 bg-emerald-950/60 border-2 border-emerald-500/40 rounded-2xl p-4 text-emerald-300 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 font-bold">
              ✓
            </div>
            <div>
              <p className="font-bold font-orbitron text-white text-xs">
                Active SMID Registration Found!
              </p>
              <p className="text-[11px] text-emerald-300/80 mt-0.5">
                Registered to: <strong className="text-white">{existingUser.name}</strong> ({existingUser.categoryLabel || existingUser.categoryName || 'ASMID'})
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('idcard')}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold font-orbitron text-xs rounded-xl transition-all cursor-pointer shrink-0 shadow-lg flex items-center justify-center gap-1.5 uppercase"
          >
            <span>View My Active ID Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {!isRegStarted ? (
        /* Circular Orbit selector & Category grid */
        <div>
          <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mb-8 flex items-center justify-center">
            {/* Dashed background orbital track */}
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-indigo-500/30 animate-spin" style={{ animationDuration: '40s' }} />

            {/* Glowing Center core with Owl Image & Emblem */}
            <motion.div 
              animate={{
                y: [0, -6, 0],
                boxShadow: [
                  "0 0 35px rgba(99,102,241,0.4)",
                  "0 0 55px rgba(168,85,247,0.6)",
                  "0 0 35px rgba(99,102,241,0.4)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={() => playOwlHoot()}
              className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full bg-slate-950 border-2 border-indigo-400/70 flex flex-col items-center justify-center z-10 select-none cursor-pointer overflow-hidden p-1 shadow-2xl group"
            >
              {/* Silver Owl Theme Background Image */}
              <img 
                src={owlBgImage} 
                alt="SMID Owl" 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="relative z-10 flex flex-col items-center justify-center">
                <SmidOwlLogo size="sm" showSubtitle={false} className="scale-90" />
                <span className="text-[9px] font-bold text-indigo-300 font-mono tracking-widest uppercase mt-0.5 bg-slate-950/80 px-2 py-0.5 rounded-full border border-indigo-500/40 shadow-md">
                  Select Tier
                </span>
              </div>
            </motion.div>

            {/* Orbits - Distribute all 5 categories evenly (360° / 5 = 72° apart) */}
            {Object.values(categoryConfig).map((cat, idx) => {
              const totalCats = Object.keys(categoryConfig).length; // 5
              const angle = (idx * (2 * Math.PI)) / totalCats - Math.PI / 2; // Starts top center (-90deg)
              const radius = 135; // Orbit distance
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isSelected = selectedCat === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCat(cat.id as any);
                    setFormData(prev => ({ ...prev, teenAge: cat.id === 'tsmid' ? '15' : cat.id === 'tasmid' ? '16' : '' }));
                  }}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    borderColor: isSelected ? cat.color : 'rgba(99,102,241,0.3)',
                    boxShadow: isSelected ? `0 0 30px ${cat.color}` : 'none',
                    background: isSelected ? `linear-gradient(135deg, ${cat.color}dd, #0f172a)` : '#0b0f19'
                  }}
                  className="absolute w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 z-20 group shadow-lg"
                >
                  <span className="text-xl mb-0.5">{cat.icon}</span>
                  <span className="text-[10px] font-bold font-orbitron tracking-wider text-gray-200 text-center leading-tight px-1">{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Description of current selection */}
          {selectedCat && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 text-center max-w-xl mx-auto mb-10"
            >
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-xl">{categoryConfig[selectedCat].icon}</span>
                <h4 className="text-lg font-bold font-orbitron" style={{ color: categoryConfig[selectedCat].color }}>
                  {categoryConfig[selectedCat].label} ({categoryConfig[selectedCat].name})
                </h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Verify social profile status for{' '}
                {selectedCat === 'tsmid' && 'Teenagers aged 13-17. Requires age-appropriate verification to ensure safe online interactions with content filters and bullying protection.'}
                {selectedCat === 'tasmid' && 'Teenagers aged 13-17 seeking verified access to adult view with parental consent, age-appropriate content filters, and safe community protections.'}
                {selectedCat === 'asmid' && 'Adults looking for general credential status. Requires government proof-of-age document.'}
                {selectedCat === 'bsmid' && 'Legitimate businesses, registered brands, or corporate entities wanting active verify locks.'}
              </p>
              <div className="flex justify-between items-center bg-slate-950/50 rounded-xl px-4 py-2 border border-slate-800 text-xs">
                <span className="text-gray-400">Monthly Tier Fee:</span>
                <span className="font-bold text-indigo-400">{categoryConfig[selectedCat].price}</span>
              </div>
            </motion.div>
          )}

          <div className="text-center">
            <button
              onClick={handleStartReg}
              disabled={!selectedCat}
              className={`px-10 py-4 font-bold font-orbitron tracking-widest rounded-full shadow-lg shadow-indigo-500/20 transform transition-all cursor-pointer ${
                selectedCat 
                  ? 'bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white hover:-translate-y-0.5' 
                  : 'bg-slate-900 border border-slate-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              🚀 Start Registration
            </button>
          </div>
        </div>
      ) : (
        /* Step Wizard Container */
        <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-800/80 shadow-2xl">
          {/* Step Headers */}
          <div className="hidden sm:flex justify-between items-center mb-8 relative px-4">
            <div className="absolute top-4 left-10 right-10 h-0.5 bg-slate-800 z-0" />
            <div 
              className="absolute top-4 left-10 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 z-0" 
              style={{ width: `${((step - 1) / 5) * 100}%` }}
            />

            {[
              { idx: 1, name: 'Verify' },
              { idx: 2, name: 'Identity' },
              { idx: 3, name: 'Biometric' },
              { idx: 4, name: 'Access' },
              { idx: 5, name: 'Payment' },
              { idx: 6, name: 'Confirm' }
            ].map((st) => (
              <div key={st.idx} className="relative z-10 flex flex-col items-center">
                <div 
                  style={{
                    borderColor: step >= st.idx ? '#6366f1' : 'rgba(148, 163, 184, 0.2)',
                    background: step > st.idx ? '#22c55e' : step === st.idx ? 'linear-gradient(135deg, #6366f1, #ec4899)' : '#0f172a'
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all"
                >
                  {step > st.idx ? '✓' : st.idx}
                </div>
                <span className={`text-[10px] mt-1.5 font-bold tracking-wider ${step >= st.idx ? 'text-indigo-300' : 'text-slate-500'}`}>
                  {st.name}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar (Mobile and active indicator) */}
          <div className="sm:hidden mb-6">
            <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
              <span>Step {step}/6: {['Verify', 'Identity', 'Biometric', 'Access', 'Payment', 'Review'][step - 1]}</span>
              <span>{Math.round((step / 6) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Verification Methods */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {showBirthCertificateHelper ? (
                /* Sleek AI Birth Certificate Trust Verification Portal */
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950 border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-400" />
                        <span className="text-sm font-bold font-orbitron text-indigo-300 uppercase tracking-wider">AI Birth Certificate Trust Validator</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowBirthCertificateHelper(false);
                          setBcResult(null);
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-bold tracking-wider cursor-pointer transition-all"
                      >
                        [Cancel]
                      </button>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed mt-4 mb-6">
                      If you cannot provide standard government ID documents, SMID enables secure alternative onboarding through a verified birth registry document audit. Provide the certificate details below.
                    </p>

                    <form onSubmit={handleVerifyBirthCertificate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Registrant Legal Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Full Name on Certificate"
                            value={bcForm.fullName}
                            onChange={(e) => setBcForm(p => ({ ...p, fullName: e.target.value }))}
                            className="w-full bg-slate-900 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg px-3.5 py-2.5 text-white outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Date of Birth</label>
                          <input 
                            type="date" 
                            required
                            value={bcForm.dob}
                            onChange={(e) => setBcForm(p => ({ ...p, dob: e.target.value }))}
                            className="w-full bg-slate-900 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg px-3.5 py-2.5 text-white outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Parent / Guardian Legal Name</label>
                          <input 
                            type="text" 
                            placeholder="Parent Name on Certificate"
                            value={bcForm.parentName}
                            onChange={(e) => setBcForm(p => ({ ...p, parentName: e.target.value }))}
                            className="w-full bg-slate-900 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg px-3.5 py-2.5 text-white outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Issuing Civil Authority</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. state or municipal registry"
                            value={bcForm.registryState}
                            onChange={(e) => setBcForm(p => ({ ...p, registryState: e.target.value }))}
                            className="w-full bg-slate-900 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg px-3.5 py-2.5 text-white outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Certificate Seal Serial No.</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. BC-102930"
                            value={bcForm.sealNumber}
                            onChange={(e) => setBcForm(p => ({ ...p, sealNumber: e.target.value }))}
                            className="w-full bg-slate-900 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg px-3.5 py-2.5 text-white outline-none transition-all"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={handleSimulateAutoFill}
                            className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-gray-300 font-orbitron font-bold text-[10px] tracking-wider uppercase rounded-lg transition-all cursor-pointer"
                          >
                            ⚡ Autofill Sample Records
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Registry Authentication Watermarks / Notes</label>
                        <textarea 
                          rows={2}
                          value={bcForm.documentText}
                          onChange={(e) => setBcForm(p => ({ ...p, documentText: e.target.value }))}
                          className="w-full bg-slate-900 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg px-3.5 py-2 text-white outline-none font-mono resize-none transition-all"
                        />
                      </div>

                      <div className="pt-4 flex items-center justify-between gap-4">
                        {bcIsLoading ? (
                          <div className="w-full space-y-2 bg-indigo-950/25 p-4 rounded-xl border border-indigo-500/20">
                            <div className="flex justify-between items-center text-[10px] font-mono text-indigo-400">
                              <span>VERIFICATION ENGINE ACTIVE:</span>
                              <span className="font-bold">{bcScanStep * 20}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300"
                                style={{ width: `${bcScanStep * 20}%` }}
                              />
                            </div>
                            <p className="text-[10px] font-mono text-gray-400 text-center animate-pulse mt-1">
                              {bcScanStep === 1 && "Connecting to SMID Secure Trust API..."}
                              {bcScanStep === 2 && "Extracting digital seal coordinates..."}
                              {bcScanStep === 3 && "Analyzing registry stamp authenticity..."}
                              {bcScanStep === 4 && "Validating birth record indexes..."}
                              {bcScanStep === 5 && "Running Gemini Flash neural watermark audit..."}
                            </p>
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 animate-pulse"
                          >
                            <Fingerprint className="w-4 h-4" />
                            <span>Audit & Authenticate Certificate</span>
                          </button>
                        )}
                      </div>
                    </form>

                    {bcError && (
                      <div className="mt-4 p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/30 text-pink-400 text-xs text-left">
                        {bcError}
                      </div>
                    )}

                    {/* Result Screen */}
                    {bcResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-5 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-4 text-left"
                      >
                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                            <span className="text-xs font-bold font-orbitron text-emerald-400 uppercase tracking-wider">Alternative Trust Verified</span>
                          </div>
                          <span className="text-[10px] font-bold font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                            Trust Index: {bcResult.trustScore}%
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Verified Registry Name</span>
                            <span className="font-bold text-gray-200">{bcResult.verifiedName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Verified Date of Birth</span>
                            <span className="font-bold text-gray-200">{bcResult.verifiedDob}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider mb-1">Generated Trust Seal</span>
                          <span className="font-mono text-emerald-400 font-extrabold bg-slate-950 border border-slate-850 px-3 py-1.5 rounded inline-block text-xs">
                            {bcResult.verificationSeal}
                          </span>
                        </div>

                        <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl text-[11px] text-gray-400 leading-relaxed whitespace-pre-line text-left">
                          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block font-orbitron mb-1">AI Audit Ledger Insights</span>
                          {bcResult.auditLog}
                        </div>

                        <button
                          type="button"
                          onClick={handleApplyBcCertificate}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg cursor-pointer"
                        >
                          ✓ Apply Certificate & Proceed
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : showMiniBsmidHelper ? (
                /* Sleek AI Mini BSMID Digital Presence Verification Portal */
                <div className="space-y-6 text-left">
                  <div className="bg-slate-950 border border-pink-500/30 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-pink-400" />
                        <span className="text-sm font-bold font-orbitron text-pink-300 uppercase tracking-wider">AI Mini BSMID Digital Presence Auditor</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowMiniBsmidHelper(false);
                          setMbResult(null);
                        }}
                        className="text-xs text-pink-400 hover:text-pink-300 font-bold tracking-wider cursor-pointer transition-all"
                      >
                        [Cancel]
                      </button>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed mt-4 mb-6">
                      No government papers? No problem! For online-only merchants and micro-entrepreneurs starting small, our AI auditor will scan your active storefront link, social commerce profile, domain purchase info, or payment link to issue a starter trust token.
                    </p>

                    <form onSubmit={handleVerifyMiniBsmidPapers} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Business / Brand Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Tosin Handcrafts"
                            value={miniBsmidForm.businessName}
                            onChange={(e) => setMiniBsmidForm(p => ({ ...p, businessName: e.target.value }))}
                            className="w-full bg-slate-900 border-2 border-slate-850 focus:border-pink-500 text-xs rounded-lg px-3.5 py-2.5 text-white outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Digital Account Type</label>
                          <select 
                            required
                            value={miniBsmidForm.registrationType}
                            onChange={(e) => setMiniBsmidForm(p => ({ ...p, registrationType: e.target.value }))}
                            className="w-full bg-slate-900 border-2 border-slate-850 focus:border-pink-500 text-xs rounded-lg px-3.5 py-2.5 text-white outline-none transition-all"
                          >
                            <option value="Online Storefront Link (Shopify/Etsy/Amazon)">Online Storefront Link (Shopify/Etsy/Amazon)</option>
                            <option value="Social Commerce Profile (Instagram/TikTok/Facebook)">Social Commerce Profile (Instagram/TikTok/Facebook)</option>
                            <option value="Domain Ownership or Website Purchase Invoice">Domain Ownership or Website Purchase Invoice</option>
                            <option value="Digital Payment Merchant Account (Stripe/PayPal)">Digital Payment Merchant Account (Stripe/PayPal)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Target Market Jurisdiction / Country</label>
                          <input 
                            type="text" 
                            required
                            value={miniBsmidForm.country}
                            onChange={(e) => setMiniBsmidForm(p => ({ ...p, country: e.target.value }))}
                            className="w-full bg-slate-900 border-2 border-slate-850 focus:border-pink-500 text-xs rounded-lg px-3.5 py-2.5 text-white outline-none transition-all"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={handleSimulateMbAutoFill}
                            className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-gray-300 font-orbitron font-bold text-[10px] tracking-wider uppercase rounded-lg transition-all cursor-pointer"
                          >
                            ⚡ Autofill Digital Footprint
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Store URL, Social Handle, or Payment Verification Details</label>
                        <textarea 
                          rows={3}
                          value={miniBsmidForm.documentText}
                          onChange={(e) => setMiniBsmidForm(p => ({ ...p, documentText: e.target.value }))}
                          className="w-full bg-slate-900 border-2 border-slate-850 focus:border-pink-500 text-xs rounded-lg px-3.5 py-2 text-white outline-none font-mono resize-none transition-all"
                        />
                      </div>

                      <div className="pt-4 flex items-center justify-between gap-4">
                        {mbIsLoading ? (
                          <div className="w-full space-y-2 bg-pink-950/25 p-4 rounded-xl border border-pink-500/20">
                            <div className="flex justify-between items-center text-[10px] font-mono text-pink-400">
                              <span>VERIFICATION ENGINE ACTIVE:</span>
                              <span className="font-bold">{mbScanStep * 20}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                                style={{ width: `${mbScanStep * 20}%` }}
                              />
                            </div>
                            <p className="text-[10px] font-mono text-gray-400 text-center animate-pulse mt-1">
                              {mbScanStep === 1 && "Analyzing digital store URL or handle..."}
                              {mbScanStep === 2 && "Checking online platform registry status..."}
                              {mbScanStep === 3 && "Extracting customer reviews & product listings..."}
                              {mbScanStep === 4 && "Validating domain WHOIS and SSL records..."}
                              {mbScanStep === 5 && "Running Gemini Flash structured web presence audit..."}
                            </p>
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 animate-pulse"
                          >
                            <Shield className="w-4 h-4" />
                            <span>Audit & Verify Online Presence</span>
                          </button>
                        )}
                      </div>
                    </form>

                    {mbError && (
                      <div className="mt-4 p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/30 text-pink-400 text-xs text-left">
                        {mbError}
                      </div>
                    )}

                    {/* Result Screen */}
                    {mbResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-5 rounded-2xl bg-slate-900 border border-pink-500/30 space-y-4 text-left"
                      >
                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-pink-400 rounded-full animate-ping" />
                            <span className="text-xs font-bold font-orbitron text-pink-400 uppercase tracking-wider">Mini Business Trust Verified</span>
                          </div>
                          <span className="text-[10px] font-bold font-mono text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded">
                            Trust Index: {mbResult.trustScore}%
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Verified Business Name</span>
                            <span className="font-bold text-gray-200">{mbResult.verifiedBusinessName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Document Registration Type</span>
                            <span className="font-bold text-gray-200">{mbResult.verifiedRegistrationType}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider mb-1">Starter Trust Seal</span>
                          <span className="font-mono text-pink-400 font-extrabold bg-slate-950 border border-slate-850 px-3 py-1.5 rounded inline-block text-xs">
                            {mbResult.verificationSeal}
                          </span>
                        </div>

                        <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl text-[11px] text-gray-400 leading-relaxed whitespace-pre-line text-left">
                          <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block font-orbitron mb-1">AI Mini BSMID Audit Insights</span>
                          {mbResult.auditLog}
                        </div>

                        <button
                          type="button"
                          onClick={handleApplyMbCertificate}
                          className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg cursor-pointer"
                        >
                          ✓ Apply Certificate & Proceed
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                /* Standard Step 1 Layout */
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold font-orbitron mb-2">Verification Channel</h3>
                    <p className="text-xs text-gray-400">Choose the standard documentation method for verification</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {categoryConfig[selectedCat!].methods.map((method) => (
                      <label 
                        key={method}
                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                          formData.verificationMethod === method && !isCustomDocument
                            ? 'border-indigo-500 bg-indigo-950/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                            : 'border-slate-800 bg-slate-950/40 hover:border-slate-700/60'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="verificationMethod"
                          checked={formData.verificationMethod === method && !isCustomDocument}
                          onChange={() => {
                            setIsCustomDocument(false);
                            setFormData(p => ({ ...p, verificationMethod: method }));
                          }}
                          className="accent-indigo-500 w-5 h-5 cursor-pointer shrink-0" 
                        />
                        <div className="text-left">
                          <p className="font-semibold text-gray-100 text-sm">{method}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {method.includes('Birth Certificate') && 'Official certified registry document matching parent oversight credentials.'}
                            {method.includes('Parent') && 'Secondary legal guardian identity certificate verifying active status checks.'}
                            {method.includes('ID Card') && 'Institutional credential verifying current attendance status.'}
                            {method.includes('Government Identity') && 'Requires a scan of your Driver\'s License, Passport or National ID.'}
                            {method.includes('Business') && 'Official corporate registry documentation including tax or regulatory serial.'}
                            {method.includes('Online Storefront') && 'Link to your active, custom Shopify, Etsy, or Amazon store (product check).'}
                            {method.includes('Social Commerce') && 'Your professional commercial business profile link (Instagram, TikTok Shop, etc.).'}
                            {method.includes('Domain Purchase') && 'Domain registrar invoice or DNS record details verifying custom web presence.'}
                            {method.includes('Digital Payment') && 'Active PayPal or Stripe merchant account screenshot or connection proof.'}
                            {!method.includes('Birth') && !method.includes('Parent') && !method.includes('ID Card') && !method.includes('Government') && !method.includes('Business') && !method.includes('Storefront') && !method.includes('Social') && !method.includes('Domain') && !method.includes('Payment') && 'Requires secure upload to encrypted directories.'}
                          </p>
                        </div>
                      </label>
                    ))}

                    {/* Custom / Unknown Document Selection */}
                    <div className={`p-5 rounded-2xl border-2 transition-all ${
                      isCustomDocument 
                        ? 'border-indigo-500 bg-indigo-950/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700/60'
                    }`}>
                      <label className="flex items-start gap-4 cursor-pointer">
                        <input 
                          type="radio" 
                          name="verificationMethod"
                          checked={isCustomDocument}
                          onChange={() => {
                            setIsCustomDocument(true);
                            setFormData(p => ({ ...p, verificationMethod: customDocName || 'Custom Unknown Document' }));
                          }}
                          className="accent-indigo-500 w-5 h-5 cursor-pointer shrink-0 mt-1" 
                        />
                        <div className="text-left w-full">
                          <p className="font-semibold text-gray-100 text-sm flex items-center gap-2">
                            <span>📄 Scan Any Custom or Unknown Document</span>
                            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">FLEXIBLE</span>
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Select this option to scan any unregistered papers, custom birth certificates, or municipal documents using our live scanner.
                          </p>
                          
                          {isCustomDocument && (
                            <motion.div 
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 font-orbitron">
                                Type of Document you are scanning
                              </label>
                              <input 
                                type="text"
                                value={customDocName}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCustomDocName(val);
                                  setFormData(p => ({ ...p, verificationMethod: val || 'Custom Unknown Document' }));
                                }}
                                placeholder="e.g. Birth Certificate, City Council Letter, Local Tax Form, Unknown Document..."
                                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
                              />
                            </motion.div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Camera-First Document Scanner */}
                  <div className="bg-slate-950/60 rounded-2xl p-6 border-2 border-slate-800 text-center relative overflow-hidden mb-6">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                        <h4 className="text-xs font-bold font-orbitron text-gray-200 uppercase tracking-wider">SMID Live Document Scanner</h4>
                      </div>
                      
                      {cameraActive && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={toggleCameraMode}
                            className="p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-gray-400 hover:text-white rounded-lg text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer transition-all"
                            title="Switch Front/Back Camera"
                          >
                            <RefreshCw className="w-3 h-3 text-indigo-400 animate-spin" />
                            <span>Switch Camera ({cameraMode === 'user' ? 'Front' : 'Back'})</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {cameraActive ? (
                      /* Active Video Feed with Real-Time Scanning Frame Overlay */
                      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-indigo-500/50 max-w-sm mx-auto shadow-[0_0_35px_rgba(99,102,241,0.3)]">
                        <video 
                          ref={videoRef}
                          autoPlay 
                          playsInline 
                          muted 
                          className="w-full h-64 object-cover"
                        />

                        {/* Real-time Scanning HUD Aligner Overlay */}
                        <div className="absolute inset-3 pointer-events-none rounded-xl border border-indigo-500/30 overflow-hidden flex flex-col justify-between z-10">
                          {/* Subtle Grid Pattern Overlay */}
                          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#6366f120_1px,transparent_1px),linear-gradient(to_bottom,#6366f120_1px,transparent_1px)] bg-[size:16px_16px]" />

                          {/* Real-Time Moving Scanning Frame Beam & Trail */}
                          <motion.div 
                            animate={{ top: ['0%', '94%', '0%'] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 via-indigo-400 to-transparent shadow-[0_0_18px_#38bdf8] z-30"
                          >
                            {/* Scanning Laser Beam Trail Glow */}
                            <div className="absolute top-full left-0 right-0 h-14 bg-gradient-to-b from-cyan-400/25 via-indigo-500/10 to-transparent pointer-events-none" />
                          </motion.div>

                          {/* Pulsing Target Bounding Box Frame */}
                          <motion.div
                            animate={{ 
                              scale: [0.98, 1.01, 0.98],
                              borderColor: ['rgba(99, 102, 241, 0.5)', 'rgba(56, 189, 248, 0.9)', 'rgba(99, 102, 241, 0.5)'] 
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-2 border-2 border-dashed rounded-lg z-20 pointer-events-none"
                          />

                          {/* High-Tech Corner Bracket Reticles HUD */}
                          <div className="absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl z-30 shadow-[0_0_8px_#22d3ee]" />
                          <div className="absolute top-1 right-1 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr z-30 shadow-[0_0_8px_#22d3ee]" />
                          <div className="absolute bottom-1 left-1 w-5 h-5 border-b-2 border-l-2 border-cyan-400 rounded-bl z-30 shadow-[0_0_8px_#22d3ee]" />
                          <div className="absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br z-30 shadow-[0_0_8px_#22d3ee]" />

                          {/* Top Live Scan Status Telemetry Badge */}
                          <div className="relative z-30 flex justify-between items-center p-2">
                            <div className="px-2.5 py-1 rounded-lg bg-slate-950/85 border border-indigo-500/40 text-[9px] font-mono font-bold text-indigo-300 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                              <span>LIVE SCANNING • AES-256 HUD</span>
                            </div>
                            <div className="px-2 py-0.5 rounded bg-slate-950/85 border border-slate-800 text-[8px] font-mono text-cyan-400 font-bold backdrop-blur-md">
                              1080p HUD
                            </div>
                          </div>

                          {/* Center Alignment Target Text Badge */}
                          <div className="relative z-30 self-center my-auto">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-300 uppercase bg-slate-950/90 px-3.5 py-1.5 rounded-lg border border-indigo-500/40 shadow-xl backdrop-blur-md flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                              Align Document Here
                            </span>
                          </div>

                          {/* Bottom Live Processing Telemetry Readout */}
                          <div className="relative z-30 flex justify-between items-center px-2.5 py-1.5 text-[8px] font-mono text-gray-200 bg-slate-950/90 border-t border-indigo-500/30 backdrop-blur-md">
                            <span className="text-emerald-400 font-bold">EDGE DETECT: OPTIMAL</span>
                            <span className="text-cyan-300 font-bold animate-pulse">PROCESSING ENCRYPTION...</span>
                          </div>
                        </div>
                        
                        {/* Live shutter controls */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/90 px-4 py-1.5 rounded-full border border-indigo-500/40 backdrop-blur-md z-30 shadow-2xl">
                          <button
                            type="button"
                            onClick={captureDocumentPhoto}
                            className="p-3 bg-red-650 hover:bg-red-500 text-white rounded-full transition-all cursor-pointer shadow-lg active:scale-95 relative flex items-center justify-center"
                            title="Trigger Shutter"
                          >
                            <span className="block w-6 h-6 bg-white/20 rounded-full animate-ping absolute" />
                            <Camera className="w-4 h-4 text-white relative z-10" />
                          </button>
                          <button
                            type="button"
                            onClick={stopDocumentCamera}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer"
                            title="Turn off camera"
                          >
                            <VideoOff className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : capturedImage ? (
                      /* Captured Preview */
                      <div className="max-w-sm mx-auto space-y-4">
                        <div className="relative rounded-xl overflow-hidden bg-black border border-emerald-500/30">
                          <img 
                            src={capturedImage} 
                            alt="Captured Document" 
                            className="w-full h-56 object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[10px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1 font-bold shadow-md">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>IMAGE SCANNED</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2.5 justify-center">
                          <button
                            type="button"
                            onClick={() => startDocumentCamera(cameraMode)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-gray-300 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Retake Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              // Confirm document is scanned and populate
                              setUploadedFiles(prev => ({
                                ...prev,
                                [formData.verificationMethod]: `Verified_Camera_Scan_${Date.now().toString().slice(-4)}.png`
                              }));
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all cursor-pointer"
                          >
                            Confirm & Use Scan
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Idle Camera Request Area */
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mx-auto border border-indigo-500/20">
                          <Camera className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-200">Start Camera Verification</h4>
                          <p className="text-[11px] text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                            Access your phone or computer's front/back camera to take an instant high-resolution cryptographic scan of your {formData.verificationMethod}.
                          </p>
                        </div>
                        
                        {cameraError && (
                          <p className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl max-w-xs mx-auto">
                            {cameraError}
                          </p>
                        )}

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                          <button 
                            type="button"
                            onClick={() => startDocumentCamera('environment')}
                            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer font-orbitron flex items-center gap-2"
                          >
                            <Camera className="w-4 h-4" />
                            <span>Scan with Back Camera</span>
                          </button>
                          
                          <button 
                            type="button"
                            onClick={() => startDocumentCamera('user')}
                            className="px-5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-gray-300 text-xs font-bold rounded-xl transition-all cursor-pointer font-orbitron flex items-center gap-2"
                          >
                            <RefreshCw className="w-4 h-4 text-indigo-400" />
                            <span>Scan with Front Camera</span>
                          </button>
                        </div>

                        {/* Backwards-compatibility fallback simulator if they have no camera device */}
                        <div className="pt-2 border-t border-slate-900">
                          <button
                            type="button"
                            onClick={() => handleFileUpload(formData.verificationMethod, `Simulated_Scan_${Date.now().toString().slice(-4)}.pdf`)}
                            className="text-[10px] text-gray-500 hover:text-gray-400 underline cursor-pointer transition-all"
                          >
                            Or bypass using simulated document file upload
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mini BSMID Startup Digital Presence Helper Alert Banner */}
                  {(selectedCat === 'minibsmid' || selectedCat === 'bsmid') ? (
                    <div className="p-4 rounded-2xl bg-pink-950/20 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0 mt-0.5">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold font-orbitron text-pink-200">No Government Papers? Start Small!</h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                            If you do not have official registry papers or corporate documents, use our AI Mini BSMID Digital Presence Auditor to quickly verify using active shop links or social profiles.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowMiniBsmidHelper(true)}
                        className="px-4.5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-orbitron font-bold text-[10px] tracking-wider uppercase rounded-xl shadow-md cursor-pointer shrink-0 transition-all"
                      >
                        Audit Online Presence
                      </button>
                    </div>
                  ) : (
                    /* Alternative Trust Portal Helper Alert Banner */
                    <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold font-orbitron text-indigo-200">Missing Standard ID documents?</h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                            Under SMID Alternative Trust directives, you can verify your identity using a Birth Certificate. Use our secure AI Registry Extractor to validate.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowBirthCertificateHelper(true)}
                        className="px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-orbitron font-bold text-[10px] tracking-wider uppercase rounded-xl shadow-md cursor-pointer shrink-0 transition-all"
                      >
                        Use Birth Certificate
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}

          {/* Step 2: Identity Information */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold font-orbitron mb-2">Identity Details</h3>
                <p className="text-xs text-gray-400">Fill standard registry details for security auditing</p>
              </div>

              <div className="space-y-4 mb-6">
                {/* TSMID or TASMID Teen fields */}
                {(selectedCat === 'tsmid' || selectedCat === 'tasmid') && (
                  <>
                    {selectedCat === 'tasmid' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Parent/Guardian Name</label>
                          <input 
                            type="text" 
                            placeholder="Parent / Guardian Full Legal Name"
                            value={formData.parentName}
                            onChange={(e) => setFormData(p => ({ ...p, parentName: e.target.value }))}
                            className="w-full bg-slate-950 border-2 border-slate-800 focus:border-amber-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Parent Alias / Petname</label>
                          <input 
                            type="text" 
                            placeholder="Optional Parent Username"
                            value={formData.parentPetName}
                            onChange={(e) => setFormData(p => ({ ...p, parentPetName: e.target.value }))}
                            className="w-full bg-slate-950 border-2 border-slate-800 focus:border-amber-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {selectedCat === 'tsmid' && (
                      <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-left mb-4">
                        <p className="text-[11px] font-bold text-emerald-400 uppercase font-orbitron mb-1">
                          🎮 Teen Social Media ID (TSMID) Safety Controls
                        </p>
                        <p className="text-[11px] text-gray-300 leading-relaxed">
                          Designed for teenagers aged 13-17 with age-appropriate content filters, safe community access, bullying protection features, and educational resources.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Teen Full Legal Name</label>
                        <input 
                          type="text" 
                          placeholder="Teen Full Name"
                          value={formData.teenName}
                          onChange={(e) => setFormData(p => ({ ...p, teenName: e.target.value }))}
                          className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Teen Age</label>
                        <input 
                          type="number" 
                          placeholder="Teen Age"
                          value={formData.teenAge}
                          onChange={(e) => setFormData(p => ({ ...p, teenAge: e.target.value }))}
                          className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                        />
                      </div>
                    </div>

                    {selectedCat === 'tasmid' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">School / Educational Institution (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="Current School or High School Name"
                            value={formData.schoolName}
                            onChange={(e) => setFormData(p => ({ ...p, schoolName: e.target.value }))}
                            className="w-full bg-slate-950 border-2 border-slate-800 focus:border-amber-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                          />
                        </div>
                        <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-xl text-left">
                          <p className="text-[11px] font-bold text-amber-300 uppercase font-orbitron mb-1">
                            🛡️ Teen & Adult (TASMID) Safety Shield Active
                          </p>
                          <p className="text-[11px] text-gray-400 leading-relaxed">
                            Requires verified parental consent for teen access (ages 13-17) to adult views with automatic age-appropriate content filters and anti-bullying protections.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* ASMID fields */}
                {selectedCat === 'asmid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Full Legal Name</label>
                      <input 
                        type="text" 
                        placeholder="First and Last Legal Name"
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Alias / Custom Brand Petname</label>
                      <input 
                        type="text" 
                        placeholder="Optional Social Alias"
                        value={formData.petName}
                        onChange={(e) => setFormData(p => ({ ...p, petName: e.target.value }))}
                        className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* BSMID fields */}
                {selectedCat === 'bsmid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Registered Entity Name</label>
                      <input 
                        type="text" 
                        placeholder="Business/Company Name"
                        value={formData.businessName}
                        onChange={(e) => setFormData(p => ({ ...p, businessName: e.target.value }))}
                        className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Regulatory Registration / Tax ID</label>
                      <input 
                        type="text" 
                        placeholder="e.g. SEC, VAT or Government Reg ID"
                        value={formData.govVerification}
                        onChange={(e) => setFormData(p => ({ ...p, govVerification: e.target.value }))}
                        className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Standard general fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Date of Birth</label>
                    <input 
                      type="date" 
                      value={formData.dob}
                      onChange={(e) => setFormData(p => ({ ...p, dob: e.target.value }))}
                      className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Country / Region</label>
                    <select 
                      value={formData.country}
                      onChange={(e) => setFormData(p => ({ ...p, country: e.target.value }))}
                      className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none cursor-pointer"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="China">China</option>
                      <option value="Australia">Australia</option>
                      <option value="Brazil">Brazil</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Contact Phone</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Description / Role / Title (Shown on ID Badge)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Creative Manager, SMID Founder, Digital Creator"
                    value={formData.description}
                    onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                    className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Registry Email Address</label>
                  <input 
                    type="email" 
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 text-sm rounded-xl px-4 py-3 text-white transition-all outline-none"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">This serves as your primary master account login profile for SMID directory sync checks.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Biometric Face Scanner */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold font-orbitron mb-2">Circular Face Map Scanning</h3>
                <p className="text-xs text-gray-400">Lock physical identity markers to your cryptographic secure key</p>
              </div>

              <div className="flex flex-col items-center gap-6 mb-8">
                {/* Circular Scanner HUD Graphic */}
                <div className="relative w-52 h-52 flex items-center justify-center">
                  {/* Glowing Orbit Rings */}
                  <div 
                    style={{
                      borderColor: scanState === 'success' ? '#22c55e' : scanState === 'scanning' ? '#6366f1' : 'rgba(99,102,241,0.2)',
                      animationDuration: '5s'
                    }}
                    className="absolute inset-0 rounded-full border-4 animate-spin border-dashed" 
                  />
                  
                  {/* Outer breathing outline */}
                  <div 
                    style={{
                      borderColor: scanState === 'success' ? '#22c55e' : scanState === 'scanning' ? '#ec4899' : 'rgba(99,102,241,0.15)',
                      animationDuration: '8s'
                    }}
                    className="absolute -inset-3 rounded-full border border-dashed animate-spin" 
                  />

                  {/* Camera view inner circle */}
                  <div className="absolute inset-4 rounded-full bg-slate-950 flex flex-col items-center justify-center border border-slate-800 overflow-hidden relative">
                    {/* Live Front Camera Stream */}
                    {scanState === 'scanning' && (
                      <video 
                        ref={faceVideoRef}
                        autoPlay 
                        playsInline 
                        muted 
                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                      />
                    )}

                    {/* Simulated scanning scan-line moving vertically */}
                    {scanState === 'scanning' && (
                      <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] z-20"
                      />
                    )}

                    {/* Face symbol or success check */}
                    {scanState === 'success' ? (
                      <motion.span 
                        initial={{ scale: 0.5 }} 
                        animate={{ scale: 1 }} 
                        className="text-6xl text-emerald-400 z-10"
                      >
                        👤
                      </motion.span>
                    ) : scanState !== 'scanning' ? (
                      <span className="text-5xl text-gray-600 select-none">👤</span>
                    ) : null}

                    {/* Target grid dots (lit on mapping) */}
                    {scanState === 'scanning' && (
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 p-4 gap-2 pointer-events-none opacity-40 z-10">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div 
                            key={i} 
                            style={{ animationDelay: `${i * 0.1}s` }}
                            className="border border-emerald-500/20 rounded-sm animate-pulse" 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="w-64">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-1">
                    <span>PROGRESS:</span>
                    <span className="font-bold text-indigo-400">{scanProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>

                {/* Status Logs */}
                <div className="bg-slate-950/60 rounded-xl px-4 py-3 border border-slate-800/80 w-full max-w-md text-center">
                  <p className={`text-xs font-mono font-medium ${
                    scanState === 'success' ? 'text-emerald-400' : scanState === 'scanning' ? 'text-indigo-400 animate-pulse' : 'text-gray-400'
                  }`}>
                    {scanText}
                  </p>
                  
                  {detectedPoints.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                      {detectedPoints.map((pt, i) => (
                        <span key={i} className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          {pt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interactive scan button */}
                {scanState !== 'success' && (
                  <button
                    onClick={handleStartScan}
                    disabled={scanState === 'scanning'}
                    className={`px-6 py-2.5 rounded-lg font-bold font-orbitron tracking-wider text-xs border cursor-pointer transition-all flex items-center gap-2 ${
                      scanState === 'scanning'
                        ? 'bg-slate-950 border-slate-800 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${scanState === 'scanning' ? 'animate-spin' : ''}`} />
                    {scanState === 'scanning' ? 'Verifying Coordinates...' : `Start Biometric Scan ${activeScanIndex}`}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Social Accounts Platform Access */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold font-orbitron mb-2">Connect Social Profiles</h3>
                <p className="text-xs text-gray-400">Synchronize verified digital profiles to link secure statuses</p>
              </div>

              {/* Grid of platforms */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {availablePlatforms.map((plat) => {
                  const isConnected = connectedPlatforms.includes(plat.name);
                  return (
                    <button
                      key={plat.name}
                      onClick={() => togglePlatform(plat.name)}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isConnected 
                          ? 'border-indigo-500 bg-indigo-950/20 text-white shadow-md' 
                          : 'border-slate-800 bg-slate-950/40 hover:border-slate-700/60 text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <span className="text-2xl mb-1.5">{plat.icon}</span>
                      <span className="text-xs font-semibold">{plat.name}</span>
                      <span className={`text-[9px] mt-1.5 font-bold ${isConnected ? 'text-indigo-400' : 'text-slate-600'}`}>
                        {isConnected ? '✓ Connected' : '+ Connect'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Holographic generated accession code box */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/50 rounded-2xl p-6 border-2 border-indigo-500/20 text-center relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                <h4 className="text-xs font-bold text-indigo-400 font-orbitron uppercase tracking-widest mb-4">SMID Cryptographic Sync Key</h4>
                
                {accessSignature ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center gap-3 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800 mb-3 font-mono text-lg font-bold tracking-widest text-emerald-400">
                      <span>{accessSignature}</span>
                      <button 
                        onClick={copyToClipboard}
                        className="text-gray-400 hover:text-white transition-all cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400 max-w-sm">
                      Copy this signature token. Platforms require this exact string during profile settings integration to render verified credentials.
                    </p>
                  </motion.div>
                ) : (
                  <div className="py-4">
                    <p className="text-xs text-gray-400 mb-4 max-w-xs mx-auto">
                      Generate your unified access signature after choosing linked accounts to connect platforms globally.
                    </p>
                    <button
                      onClick={handleGenerateSignature}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 font-orbitron text-xs font-bold rounded-lg transition-all cursor-pointer"
                    >
                      Generate Sync Signature
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 5: Payment Details */}
          {step === 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold font-orbitron mb-2">Secure Billing Payment</h3>
                <p className="text-xs text-gray-400">Validate recurring tier status of your chosen identification level</p>
              </div>

              {!categoryConfig[selectedCat!].payment ? (
                /* Free tier notice */
                <div className="bg-slate-950/60 rounded-2xl p-8 border border-slate-800 text-center max-w-md mx-auto">
                  <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center text-emerald-400 text-2xl mx-auto mb-4 animate-pulse">
                    🎁
                  </div>
                  <h4 className="text-base font-bold text-gray-100 font-orbitron mb-1">{categoryConfig[selectedCat!].label}</h4>
                  <p className="text-xs text-emerald-400 font-bold mb-3 font-mono">100% FREE VERIFICATION</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    All SMID verification tiers require absolutely zero payment or billing credentials. Click Continue to proceed directly to the final directory confirmation reviews.
                  </p>
                </div>
              ) : (
                /* Card details inputs */
                <div className="max-w-md mx-auto space-y-4">
                  {/* Option toggle buttons */}
                  <div className="grid grid-cols-3 gap-3 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-center">
                    {['card', 'paypal', 'crypto'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, paymentMethod: m }))}
                        className={`py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider cursor-pointer transition-all ${
                          formData.paymentMethod === m 
                            ? 'bg-indigo-600 text-white' 
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  {formData.paymentMethod === 'card' ? (
                    <div className="space-y-4 bg-slate-950/40 p-5 rounded-2xl border border-slate-800/80">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData(p => ({ ...p, cardNumber: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm rounded-lg px-4.5 py-2.5 text-white outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Expiration</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={(e) => setFormData(p => ({ ...p, cardExpiry: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm rounded-lg px-4.5 py-2.5 text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">CVC / CVV</label>
                          <input 
                            type="password" 
                            placeholder="•••"
                            maxLength={4}
                            value={formData.cardCvc}
                            onChange={(e) => setFormData(p => ({ ...p, cardCvc: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm rounded-lg px-4.5 py-2.5 text-white outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 text-center text-xs text-gray-400">
                      {formData.paymentMethod === 'paypal' ? (
                        <p>PayPal credentials check will process securely inside a floating frame popup on final form submission.</p>
                      ) : (
                        <p>Receive your specific crypto verify address (BTC/ETH/SOL) for tier staking upon submitting.</p>
                      )}
                    </div>
                  )}

                  <div className="bg-slate-950/80 rounded-xl px-4 py-3 border border-slate-800 text-xs flex justify-between">
                    <span className="text-gray-400">Monthly Tier Fee:</span>
                    <span className="font-bold text-emerald-400">{categoryConfig[selectedCat!].price}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 6: Review & Final Consent */}
          {step === 6 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold font-orbitron mb-2">Review Registry Entry</h3>
                <p className="text-xs text-gray-400">Audit all information parameters before publishing to SMID registry</p>
              </div>

              {/* Review card */}
              <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-4 mb-6 text-sm">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-800/60">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Verification Level</p>
                    <p className="font-bold font-orbitron text-indigo-400 mt-0.5">{categoryConfig[selectedCat!].label}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Primary Document Method</p>
                    <p className="font-semibold text-gray-200 mt-0.5">{formData.verificationMethod}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-800/60">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Registrant Identification Name</p>
                    <p className="font-semibold text-gray-200 mt-0.5">
                      {formData.teenName || formData.name || formData.businessName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Master Email Contact</p>
                    <p className="font-semibold text-gray-200 mt-0.5">{formData.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-800/60">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Connected Accounts</p>
                    <p className="font-semibold text-gray-200 mt-0.5">{connectedPlatforms.join(', ') || 'None'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Hologram Signature Code</p>
                    <p className="font-mono text-emerald-400 font-bold mt-0.5">{accessSignature || 'Not generated'}</p>
                  </div>
                </div>

                <div className="bg-indigo-950/10 rounded-xl px-4 py-3 border border-indigo-500/15 flex items-center gap-3 text-xs">
                  <Shield className="w-5 h-5 text-indigo-400 shrink-0" />
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    By completing registration, you publish a secure, tamperproof hash proof to our cloud directory. All uploaded scanned files are stored inside encrypted local state blocks.
                  </p>
                </div>
              </div>

              {/* Consent check */}
              <label className="flex items-start gap-3 p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 cursor-pointer select-none mb-6">
                <input 
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData(p => ({ ...p, termsAccepted: e.target.checked }))}
                  className="accent-indigo-500 w-4 h-4 cursor-pointer mt-0.5 shrink-0" 
                />
                <span className="text-xs text-gray-400 leading-relaxed">
                  I explicitly consent to biometric facial verification analysis processing for secure signature generation and declare all information submitted is true under legal perjury penalties.
                </span>
              </label>
            </motion.div>
          )}

          {/* Wizard step navigation controls */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-800/60">
            <button
              onClick={handleBack}
              className="px-5 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold rounded-lg text-gray-300 flex items-center gap-2 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < 6 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer font-orbitron"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!formData.termsAccepted}
                className={`px-8 py-3 font-orbitron font-extrabold text-xs tracking-widest rounded-lg flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                  formData.termsAccepted 
                    ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white' 
                    : 'bg-slate-950 border border-slate-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                ✓ Submit Registration
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 7: Success Page */}
      {step === 7 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-emerald-500/20 shadow-2xl text-center max-w-xl mx-auto"
        >
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-4xl mx-auto mb-6 shadow-[0_0_35px_rgba(16,185,129,0.15)] animate-bounce">
            ✓
          </div>

          <h3 className="text-2xl font-bold font-orbitron mb-2 text-white">Registration Complete!</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
            Your SMID account directory registration signature has been published securely.
          </p>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl mb-8 relative overflow-hidden text-center">
            <span className="text-[10px] font-bold font-orbitron text-indigo-400 uppercase tracking-widest block mb-2">
              Active Access Sync Code
            </span>
            <div className="text-lg md:text-xl font-mono font-black text-emerald-400 tracking-wider bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 inline-block">
              {accessSignature || 'SMID-8E24-F9BC-A125'}
            </div>
            
            {connectedPlatforms.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {connectedPlatforms.map((plat) => (
                  <span key={plat} className="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                    {plat}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all cursor-pointer"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => onNavigate('idcard')}
              className="px-6 py-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-gray-200 font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all cursor-pointer"
            >
              View Active ID Card
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

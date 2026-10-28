import { motion } from 'motion/react';
import { Category } from '../types';

interface CategoriesViewProps {
  onSelectCategory: (cat: Category) => void;
  lang: string;
}

export default function CategoriesView({ onSelectCategory, lang }: CategoriesViewProps) {
  const categories = [
    {
      id: 'tsmid' as Category,
      icon: '🎮',
      title: 'TSMID',
      badge: 'TEEN SOCIAL MEDIA ID',
      desc: 'Designed for teenagers aged 13-17. Requires age-appropriate verification to ensure safe online interactions.',
      features: [
        'Age-appropriate content filters',
        'Safe community access',
        'Bullying protection features',
        'Educational resource links'
      ],
      price: 'FREE',
      colorClass: 'border-emerald-500/30 hover:border-emerald-500 shadow-emerald-500/5',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      priceColor: 'text-emerald-400',
      btnClass: 'bg-emerald-600 hover:bg-emerald-500 text-white'
    },
    {
      id: 'tasmid' as Category,
      icon: '🎓',
      title: 'TASMID',
      badge: 'TEEN & ADULT SOCIAL MEDIA ID',
      desc: 'Designed for Teenage to have access to adult view aged 13-17. Requires parental consent and age-appropriate verification to ensure safe online interactions.',
      features: [
        'Parent/guardian consent required',
        'Age-appropriate content filters',
        'Safe community access',
        'Bullying protection features',
        'Educational resource links'
      ],
      price: 'FREE',
      colorClass: 'border-amber-500/30 hover:border-amber-500 shadow-amber-500/5',
      iconBg: 'bg-amber-500/10 text-amber-400',
      priceColor: 'text-amber-400',
      btnClass: 'bg-amber-600 hover:bg-amber-500 text-white'
    },
    {
      id: 'asmid' as Category,
      icon: '👤',
      title: 'ASMID',
      badge: 'ADULT SOCIAL MEDIA ID',
      desc: 'The standard verification for adults 18+. Prove your real identity across all social platforms and build trust with your audience.',
      features: [
        'Government ID verification',
        'Cross-platform trust badge',
        'Scam protection',
        'Priority support',
        'Content creator verification'
      ],
      price: '$9.99/mo',
      colorClass: 'border-blue-500/30 hover:border-blue-500 shadow-blue-500/5',
      iconBg: 'bg-blue-500/10 text-blue-400',
      priceColor: 'text-blue-400',
      btnClass: 'bg-blue-600 hover:bg-blue-500 text-white'
    },
    {
      id: 'minibsmid' as Category,
      icon: '🌱',
      title: 'Mini BSMID',
      badge: 'ONLINE STARTER ID',
      desc: 'For online micro-merchants, social commerce sellers, and digital creators starting small. Allows verification using active store links, social business profiles, domain receipts, or payment links—no government registration papers required.',
      features: [
        'Active storefront verification (Shopify/Etsy)',
        'Social commerce profile check',
        'No government registration papers needed',
        'Verify with domain & website ownership',
        'Build baseline digital business trust'
      ],
      price: '$14.99/mo',
      colorClass: 'border-pink-500/30 hover:border-pink-500 shadow-pink-500/5',
      iconBg: 'bg-pink-500/10 text-pink-400',
      priceColor: 'text-pink-400',
      btnClass: 'bg-pink-600 hover:bg-pink-500 text-white'
    },
    {
      id: 'bsmid' as Category,
      icon: '🏢',
      title: 'BSMID',
      badge: 'BUSINESS SOCIAL MEDIA ID',
      desc: 'For companies, brands, and organizations. Protect your business identity and build customer trust with verified business credentials.',
      features: [
        'Business registration verify',
        'Brand protection',
        'Customer trust boost',
        'Fraud prevention',
        'API access for platforms'
      ],
      price: '$29.99/mo',
      colorClass: 'border-purple-500/30 hover:border-purple-500 shadow-purple-500/5',
      iconBg: 'bg-purple-500/10 text-purple-400',
      priceColor: 'text-purple-400',
      btnClass: 'bg-purple-600 hover:bg-purple-500 text-white'
    }
  ];

  const compareFeatures = [
    { name: 'Digital ID Card', tsmid: true, tasmid: true, asmid: true, minibsmid: true, bsmid: true },
    { name: 'Trust Score', tsmid: true, tasmid: true, asmid: true, minibsmid: true, bsmid: true },
    { name: 'Parental Consent Check', tsmid: true, tasmid: false, asmid: false, minibsmid: false, bsmid: false },
    { name: 'Student Discounts Verified', tsmid: false, tasmid: true, asmid: false, minibsmid: false, bsmid: false },
    { name: 'Government ID Validation', tsmid: false, tasmid: true, asmid: true, minibsmid: true, bsmid: true },
    { name: 'Business registration', tsmid: false, tasmid: false, asmid: false, minibsmid: true, bsmid: true },
    { name: 'Priority Support', tsmid: false, tasmid: false, asmid: true, minibsmid: false, bsmid: true },
    { name: 'API Integration Access', tsmid: false, tasmid: false, asmid: false, minibsmid: false, bsmid: true }
  ];

  return (
    <div className="py-10 relative z-10">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight font-orbitron bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
        >
          Verification Categories
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          SMID offers tailored verification tiers designed to protect every type of digital identity — from teens and small startups to global corporations.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border ${cat.colorClass} hover:shadow-2xl transition-all duration-300 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-2xl w-12 h-12 rounded-xl flex items-center justify-center ${cat.iconBg}`}>
                  {cat.icon}
                </span>
                <h3 className="text-2xl font-bold font-orbitron text-white">{cat.title}</h3>
              </div>

              <div className="text-xs font-bold tracking-widest text-indigo-400 mb-3">{cat.badge}</div>
              <p className="text-sm text-gray-300 mb-6 line-clamp-4 leading-relaxed">{cat.desc}</p>

              <ul className="space-y-2 mb-8">
                {cat.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer ${cat.btnClass}`}
              >
                Get {cat.title}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden max-w-4xl mx-auto shadow-xl"
      >
        <div className="p-6 bg-slate-950/80 border-b border-slate-800/60">
          <h3 className="text-xl font-bold font-orbitron text-white">Feature Comparison</h3>
          <p className="text-xs text-gray-400 mt-1">Detailed feature breakdown across all verification tiers</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/40 font-orbitron text-xs text-indigo-400 border-b border-slate-800/80">
                <th className="p-4 font-semibold">Feature</th>
                <th className="p-4 font-semibold text-center">TSMID</th>
                <th className="p-4 font-semibold text-center">TASMID</th>
                <th className="p-4 font-semibold text-center">ASMID</th>
                <th className="p-4 font-semibold text-center">Mini BSMID</th>
                <th className="p-4 font-semibold text-center">BSMID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {compareFeatures.map((row: any, idx) => (
                <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-medium text-gray-200">{row.name}</td>
                  <td className="p-4 text-center">
                    {row.tsmid ? <span className="text-emerald-400 font-bold text-lg">✓</span> : <span className="text-red-500 text-lg">✕</span>}
                  </td>
                  <td className="p-4 text-center">
                    {row.tasmid ? <span className="text-emerald-400 font-bold text-lg">✓</span> : <span className="text-red-500 text-lg">✕</span>}
                  </td>
                  <td className="p-4 text-center">
                    {row.asmid ? <span className="text-emerald-400 font-bold text-lg">✓</span> : <span className="text-red-500 text-lg">✕</span>}
                  </td>
                  <td className="p-4 text-center">
                    {row.minibsmid ? <span className="text-pink-400 font-bold text-lg">✓</span> : <span className="text-red-500 text-lg">✕</span>}
                  </td>
                  <td className="p-4 text-center">
                    {row.bsmid ? <span className="text-emerald-400 font-bold text-lg">✓</span> : <span className="text-red-500 text-lg">✕</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

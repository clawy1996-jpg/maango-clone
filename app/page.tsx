"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ShieldCheck, Download, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = async (e?: React.FormEvent, forceRescan: boolean = false) => {
    e?.preventDefault();
    if (!url) return;
    setLoading(true);
    if (!forceRescan) setResult(null);
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, forceRescan })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-[#FACC15] selection:text-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FDFDFD]/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
              <div className="w-full h-full bg-[#FACC15] rounded-xl flex items-center justify-center text-black font-bold shadow-sm">M</div>
            </div>
            <span className="font-bold text-[22px] tracking-tight">Maango</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/about" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors text-gray-500 hover:text-black hover:bg-gray-50">About</Link>
            <Link href="/report" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors text-gray-500 hover:text-black hover:bg-gray-50 flex items-center gap-1.5">
              Report <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] uppercase tracking-wide">New</span>
            </Link>
            <Link href="/blog" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors text-gray-500 hover:text-black hover:bg-gray-50">Blog</Link>
            <Link href="/docs" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors text-gray-500 hover:text-black hover:bg-gray-50">For Developers</Link>
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center pt-24 px-4 text-center">
        {/* Hero */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-600 mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          1,000,677 domains scanned and counting
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-black mb-6 max-w-4xl leading-[1.1]">
          Set Your AI Policy in Minutes
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl font-medium leading-relaxed">
          We check 7 AI policy standards in seconds. See whether bots can crawl, scrape, or train on your website.
          <br className="hidden md:block" /> Free. No signup required. &middot; Results in seconds.
        </p>

        <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="example.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:border-[#FACC15] focus:ring-4 focus:ring-[#FEF08A] transition-all text-lg font-medium placeholder:text-gray-400"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-[#FACC15] hover:bg-[#EAB308] text-black rounded-2xl font-bold text-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? "Scanning..." : "Scan"}
          </button>
        </form>

        <Link href="#" className="text-gray-500 font-medium hover:text-black transition-colors mb-24 flex items-center gap-1">
          Already know what you need? Build your AI policy <span aria-hidden="true">&rarr;</span>
        </Link>

        {/* Results Container */}
        {result && (
          <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-24 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-3xl font-extrabold text-black mb-2">{result.domain}</h3>
                {result.timestamp && (
                  <p className="text-sm text-gray-500 font-medium">
                    {result.cached ? 'Loaded from cache' : 'Scanned just now'} &middot; {new Date(result.timestamp + 'Z').toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleScan(undefined, true)}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  Scan Again
                </button>
                <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase ${result.isProtected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {result.isProtected ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {result.isProtected ? "Protected" : "Unprotected"}
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { label: 'robots.txt', status: result.details?.robotsTxt },
                { label: 'HTTP Headers', status: result.details?.xRobotsTag },
                { label: 'HTML Meta Tags', status: result.details?.metaTags },
                { label: 'ai.txt', status: result.details?.aiTxt }
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <span className="font-semibold text-gray-700">{item.label}</span>
                  <span className={`font-bold flex items-center gap-1.5 ${item.status === 'Protected' ? 'text-green-600' : 'text-red-500'}`}>
                    {item.status === 'Protected' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Suggestions Block */}
            {result.suggestions && result.suggestions.length > 0 && (
              <div className="mt-12 border-t border-gray-100 pt-8">
                <h4 className="text-xl font-extrabold text-black mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#FACC15]" />
                  How to Fix This
                </h4>
                <div className="space-y-6">
                  {result.suggestions.map((suggestion: any, i: number) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <h5 className="font-bold text-lg text-black mb-2">{suggestion.title}</h5>
                      <p className="text-gray-600 mb-4">{suggestion.description}</p>
                      {suggestion.code && (
                        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                          <pre className="text-sm text-green-400 font-mono">
                            <code>{suggestion.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Why this matters */}
        <div className="w-full max-w-5xl mx-auto text-center mb-32">
          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">Why this matters</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-black mb-6">Your content is being used. You just don't know it.</h3>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            AI companies are scraping the web to train their models. If you don't explicitly opt out, your content is fair game.
          </p>
        </div>

        {/* How it works */}
        <div className="w-full max-w-5xl mx-auto text-left mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">How it works</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-black">Three steps. Two minutes. Done.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF08A] text-[#854D0E] flex items-center justify-center mb-8">
                <Search className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-black">Scan your site</h4>
              <p className="text-gray-500 font-medium leading-relaxed">We check 7 AI policy standards and show you exactly where you stand.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF08A] text-[#854D0E] flex items-center justify-center mb-8">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-black">Set your rules</h4>
              <p className="text-gray-500 font-medium leading-relaxed">Block training, allow search, or customize. You decide what AI can and can't do.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF08A] text-[#854D0E] flex items-center justify-center mb-8">
                <Download className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-black">Deploy your policy</h4>
              <p className="text-gray-500 font-medium leading-relaxed">Download your files and upload them. Works with any hosting platform.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full max-w-4xl mx-auto bg-black text-white rounded-[3rem] p-12 sm:p-16 text-center mb-24 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Protect your content in 2 minutes</h2>
          <p className="text-xl text-gray-400 mb-10 font-medium">Scan your site, set your rules, and deploy. Free, no signup required.</p>
          <button className="px-10 py-5 bg-[#FACC15] hover:bg-white text-black rounded-2xl font-extrabold text-xl shadow-lg transition-all">
            Get Started Now
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-[#FDFDFD] pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-[#FACC15] rounded-md flex items-center justify-center text-black font-bold text-xs">M</div>
                <span className="font-bold text-lg text-black">Maango</span>
              </div>
              <p className="text-gray-500 font-medium max-w-sm leading-relaxed">
                Building the trust layer for the agentic web. One registry, every AI policy, any domain.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-6">Product</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li><Link href="/report" className="hover:text-black transition-colors flex items-center gap-2">Report <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] uppercase">New</span></Link></li>
                <li><Link href="/blog" className="hover:text-black transition-colors">Blog</Link></li>
                <li><Link href="/docs" className="hover:text-black transition-colors">For Developers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-6">Legal</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-black transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 font-medium text-sm">
            <p>&copy; 2026 Maango. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

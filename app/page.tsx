"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] font-sans flex flex-col">
      <nav className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#FF8A00] rounded-full flex items-center justify-center text-white font-bold">M</div>
            <span className="font-semibold text-xl">Maango</span>
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center pt-24 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Set Your AI Policy in Minutes</h1>
        <p className="text-xl text-gray-500 mb-10">We check 7 AI policy standards in seconds.</p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto mb-8">
          <input 
            type="text" 
            placeholder="example.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            className="w-full px-4 py-3 border rounded-xl focus:ring-[#FF8A00]"
          />
          <button 
            onClick={handleScan}
            disabled={loading}
            className="px-8 py-3 bg-[#FF8A00] text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Scanning..." : "Scan"}
          </button>
        </div>

        {result && (
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border mb-16 text-left">
            <h3 className="text-xl font-bold mb-4">{result.domain}</h3>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold mb-6 ${result.isProtected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {result.isProtected ? "PROTECTED" : "UNPROTECTED"}
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between border-b pb-2">
                <span className="text-gray-600">robots.txt</span>
                <span className={result.details?.robotsTxt === 'Protected' ? 'text-green-600' : 'text-red-600'}>{result.details?.robotsTxt}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-gray-600">HTTP Headers</span>
                <span className={result.details?.xRobotsTag === 'Protected' ? 'text-green-600' : 'text-red-600'}>{result.details?.xRobotsTag}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-gray-600">HTML Meta Tags</span>
                <span className={result.details?.metaTags === 'Protected' ? 'text-green-600' : 'text-red-600'}>{result.details?.metaTags}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">ai.txt</span>
                <span className={result.details?.aiTxt === 'Protected' ? 'text-green-600' : 'text-red-600'}>{result.details?.aiTxt}</span>
              </li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

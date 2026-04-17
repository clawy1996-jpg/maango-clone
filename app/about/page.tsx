import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans flex flex-col">
      <nav className="sticky top-0 z-50 bg-[#FDFDFD]/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
              <div className="w-full h-full bg-[#FACC15] rounded-xl flex items-center justify-center text-black font-bold shadow-sm">M</div>
            </div>
            <span className="font-bold text-[22px] tracking-tight">Maango</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/about" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors text-black bg-gray-100">About</Link>
            <Link href="/report" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors text-gray-500 hover:text-black hover:bg-gray-50 flex items-center gap-1.5">
              Report <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] uppercase tracking-wide">New</span>
            </Link>
            <Link href="/blog" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors text-gray-500 hover:text-black hover:bg-gray-50">Blog</Link>
            <Link href="/docs" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors text-gray-500 hover:text-black hover:bg-gray-50">For Developers</Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center pt-24 px-4 text-center pb-24">
        <h1 className="text-5xl font-extrabold tracking-tight text-black mb-6">About Maango</h1>
        <p className="text-xl text-gray-500 max-w-2xl">Building the trust layer for the agentic web. One registry, every AI policy, any domain.</p>
      </main>
    </div>
  );
}

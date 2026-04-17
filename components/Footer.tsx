import Link from "next/link";

export default function Footer() {
  return (
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
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { href: "/about", label: "About" },
    { href: "/report", label: "Report", badge: "New" },
    { href: "/blog", label: "Blog" },
    { href: "/docs", label: "For Developers" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFDFD]/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
            <div className="w-full h-full bg-[#FACC15] rounded-xl flex items-center justify-center text-black font-bold shadow-sm text-lg">M</div>
          </div>
          <span className="font-bold text-[22px] tracking-tight">Maango</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                pathname === link.href 
                  ? "text-black bg-gray-100" 
                  : "text-gray-500 hover:text-black hover:bg-gray-50"
              }`}
            >
              {link.label}
              {link.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] uppercase tracking-wide">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

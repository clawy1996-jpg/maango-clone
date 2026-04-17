import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center pt-24 px-4 text-center pb-24">
        <h1 className="text-5xl font-extrabold tracking-tight text-black mb-6">blog</h1>
        <p className="text-xl text-gray-500 max-w-2xl">Building the trust layer for the agentic web. One registry, every AI policy, any domain.</p>
      </main>
    </div>
  );
}

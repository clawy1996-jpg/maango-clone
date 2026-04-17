export default function About() {
  return (
    <main className="max-w-4xl mx-auto pt-24 px-6 pb-24">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-8">
        New Research - Feb 2026
      </div>
      
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-8 leading-tight">
        The permissions layer for the agentic web
      </h1>
      
      <p className="text-xl text-gray-500 leading-relaxed mb-12">
        8 competing AI policy standards. No interoperability. 90% of websites say nothing at all. 
        Maango is building the canonical registry for AI permissions — so agents know what's allowed, 
        and websites control what's permitted.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-gray-100 py-12">
        <div>
          <div className="text-3xl font-bold text-black mb-1">999,316</div>
          <div className="text-sm text-gray-400 font-medium uppercase">Domains Analyzed</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-black mb-1">90.1%</div>
          <div className="text-sm text-gray-400 font-medium uppercase">No AI Policy</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-black mb-1">8</div>
          <div className="text-sm text-gray-400 font-medium uppercase">Standards Parsed</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-black mb-1">Feb 2026</div>
          <div className="text-sm text-gray-400 font-medium uppercase">Last Research</div>
        </div>
      </div>

      <div className="space-y-24">
        <section>
          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">Built for you</h2>
          <h3 className="text-4xl font-extrabold text-black mb-12">What brings you here?</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-bold mb-6">Ship compliant agents</h4>
              <ul className="space-y-8">
                <li>
                  <h5 className="font-bold text-lg mb-2">Compliance on autopilot</h5>
                  <p className="text-gray-500">One API call returns structured permissions for any domain - training, search, and inference. No parsing. No guessing.</p>
                </li>
                <li>
                  <h5 className="font-bold text-lg mb-2">Audit trails built in</h5>
                  <p className="text-gray-500">Every policy check is logged with timestamps. When regulators or publishers ask, you have receipts.</p>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-6">Protect your website</h4>
              <ul className="space-y-8">
                <li>
                  <h5 className="font-bold text-lg mb-2">Understand what AI sees</h5>
                  <p className="text-gray-500">Discover what signals your site sends - or doesn't - to AI crawlers across 8 different standards.</p>
                </li>
                <li>
                  <h5 className="font-bold text-lg mb-2">Declare your policy once</h5>
                  <p className="text-gray-500">Set your AI permissions through Maango and every agent that checks the registry respects them.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-[3rem] p-12 md:p-16">
          <h2 className="text-3xl font-extrabold text-black mb-6">From aggregator to authority</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Today, Maango reads every AI policy standard because no single one is authoritative. robots.txt wasn't built for AI. llms.txt is optional. ai.txt only covers Cloudflare's 20%. The web has 8 competing formats and no source of truth.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            That's the gap we're closing. As website owners claim their domains and declare policies directly through Maango, the registry becomes the canonical layer — not a scraper of fragments, but the place where AI permissions live.
          </p>
        </section>
      </div>
    </main>
  );
}

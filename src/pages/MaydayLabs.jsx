import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Terminal, ShieldCheck, Layers, Zap } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { StickyButtons } from "@/components/StickyButtons";

const isInfoStaging =
  typeof window !== "undefined" && window.location.hostname === "info-staging.dremer10.com";
const liveUrl = isInfoStaging ? "https://maydaylabs.dremer10.com" : "https://maydaylabsllc.dremer10.com";

const MaydayLabs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const capabilities = [
    {
      title: "50 Live Challenges",
      copy: "Work through real production Kubernetes issues using actual kubectl commands against live cluster namespaces.",
      icon: <Terminal className="w-5 h-5 text-violet-300" />,
    },
    {
      title: "Isolated Environments",
      copy: "Each session gets a dedicated namespace that auto-cleans after 15 minutes — safe to break things without consequences.",
      icon: <ShieldCheck className="w-5 h-5 text-sky-300" />,
    },
    {
      title: "Zero Setup Required",
      copy: "The entire platform runs in the browser. No local tooling, no cluster provisioning, just open and learn.",
      icon: <Zap className="w-5 h-5 text-amber-300" />,
    },
    {
      title: "Hints & Debriefs",
      copy: "Built-in hint system and comprehensive post-challenge debriefs help reinforce concepts after every level.",
      icon: <Layers className="w-5 h-5 text-emerald-300" />,
    },
  ];

  const stack = ["Kubernetes", "Next.js", "kubectl", "Namespace Isolation", "Browser-based", "Auto-cleanup"];

  return (
    <div className="bg-gradient-to-b from-[#050914] via-[#0a0b20] to-[#070b18] text-white min-h-screen">
      <StickyButtons />
      <PageWrapper>
        <div className="max-w-5xl mx-auto px-6 py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -left-16 w-64 h-64 bg-violet-500/10 blur-3xl"></div>
            <div className="absolute top-32 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl"></div>
          </div>

          <div className="flex items-center gap-3 text-sm text-violet-100 mb-10 relative z-10">
            <Link to="/projects" className="inline-flex items-center gap-2 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to projects
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">MayDayLabs</span>
          </div>

          <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-14 shadow-2xl mb-12">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-400/10 via-transparent to-sky-400/10 pointer-events-none"></div>
            <div className="grid lg:grid-cols-5 gap-10 items-center relative z-10">
              <div className="space-y-6 lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs tracking-[0.25em] uppercase text-violet-200">
                  Kubernetes Learning Platform
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">MayDayLabs</h1>
                <p className="text-base md:text-lg text-violet-100 leading-relaxed">
                  Learn Kubernetes by breaking things in real, isolated cluster environments — 50 production-grade challenges,
                  zero local setup, entirely in the browser.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500 text-white text-sm font-semibold hover:bg-violet-400 transition-all"
                  >
                    Launch MayDayLabs
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-xl shadow-violet-500/10 aspect-square bg-black/60 p-2">
                  <img
                    src="/images/maydaylabs-llc.png"
                    alt="MayDayLabs preview"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </header>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-6">Platform Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3 hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {cap.icon}
                    <h3 className="text-sm font-semibold text-white">{cap.title}</h3>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{cap.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {stack.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

        </div>
      </PageWrapper>
    </div>
  );
};

export default MaydayLabs;

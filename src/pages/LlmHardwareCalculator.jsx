import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, HardDrive, Calculator, Activity } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { StickyButtons } from "@/components/StickyButtons";

const calcLiveUrl =
  typeof window !== "undefined" && window.location.hostname === "info-staging.dremer10.com"
    ? "https://calc-staging.dremer10.com"
    : "https://calc.dremer10.com";

const LlmHardwareCalculator = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const outputs = [
    {
      title: "Required VRAM",
      copy: "Per-GPU allocation for the selected precision, context, and cache settings.",
      icon: <HardDrive className="w-5 h-5 text-amber-300" />,
    },
    {
      title: "Minimum system RAM",
      copy: "Host memory guidance, especially helpful for unified memory targets and spill tolerance planning.",
      icon: <Activity className="w-5 h-5 text-emerald-300" />,
    },
    {
      title: "On-disk model size",
      copy: "Rough storage footprint to validate that artifacts fit on local NVMe or shared volumes.",
      icon: <HardDrive className="w-5 h-5 text-sky-300" />,
    },
    {
      title: "Number of GPUs needed",
      copy: "Quick cut at single vs multi-GPU needs before you reserve cluster capacity.",
      icon: <Calculator className="w-5 h-5 text-cyan-300" />,
    },
  ];

  const tips = [
    "Try multiple quantization levels to see how VRAM drops as you move from FP16 to INT4.",
    "Bump context length to validate KV cache pressure for chat and RAG-heavy workloads.",
    "Toggle unified memory assumptions when you are sizing Apple Silicon or shared-memory GPUs.",
  ];

  return (
    <div className="bg-gradient-to-b from-[#050914] via-[#0b1530] to-[#06101f] text-white min-h-screen">
      <StickyButtons />
      <PageWrapper>
        <div className="max-w-5xl mx-auto px-6 py-20 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-8 -left-24 w-72 h-72 bg-sky-500/10 blur-3xl"></div>
            <div className="absolute top-48 right-0 w-80 h-80 bg-emerald-500/10 blur-3xl"></div>
          </div>

          <div className="flex items-center gap-3 text-sm text-emerald-100 mb-10 relative z-10">
            <Link to="/projects" className="inline-flex items-center gap-2 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to projects
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">LLM Hardware Calculator Helper</span>
          </div>

          <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-14 shadow-2xl mb-12">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400/10 via-transparent to-emerald-400/10 pointer-events-none"></div>
            <div className="grid lg:grid-cols-5 gap-10 items-center relative z-10">
              <div className="space-y-6 lg:col-span-3">
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">LLM Hardware Calculator Helper</h1>
                <p className="text-base md:text-lg text-slate-100 leading-relaxed">
                  A focused calculator that translates model size, quantization, context window, and cache strategy into VRAM, system RAM, on-disk size, and GPU count estimates—so you can sanity-check specific LLM models prior to deployment. This will help save time and effort upfront.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={calcLiveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 text-black text-sm font-semibold hover:bg-sky-400 transition-all"
                  >
                    Check it Out Live
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-sky-200">What it checks</div>
                  <div className="flex flex-wrap gap-2">
                    {["VRAM", "RAM", "Quantization", "Context length", "KV cache", "GPU count"].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-emerald-100"></div>
                </div>
              </div>
            </div>
          </header>

          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 md:p-10 shadow-xl mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10 pointer-events-none"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[11px] tracking-[0.2em] uppercase text-emerald-200">
                  Outputs
                </div>
                <h3 className="text-2xl font-semibold">What the tool returns</h3>
                <p className="text-sm text-slate-100 leading-relaxed">
                  Each scenario returns a compact readout so you can compare VRAM, host memory, storage, and GPU count across different quantization and context-length combinations.
                </p>
                <ul className="space-y-2 text-sm text-emerald-100 list-disc list-inside">
                  {outputs.map((output) => (
                    <li key={output.title} className="flex items-start gap-2">
                      <span className="pt-0.5 text-emerald-200">•</span>
                      <div>
                        <div className="font-semibold text-white text-sm">{output.title}</div>
                        <div className="text-slate-100 leading-relaxed">{output.copy}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-tr from-white/5 via-white/0 to-white/10 blur-3xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
                  <img
                    src="/images/calc.jpeg"
                    alt="LLM Hardware calculator UI sketch"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6 relative z-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Calculator className="w-5 h-5 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">How people use it</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-100 list-disc list-inside">
                <li>Pre-flight checks before allocating GPU nodes for demo or benchmark runs.</li>
                <li>Quick comparisons of quantization strategies when VRAM is tight.</li>
                <li>Teaching aid for how context length and KV cache affect footprint.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Activity className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">Fast sizing tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-100 list-disc list-inside">
                {tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </PageWrapper>
    </div>
  );
};

export default LlmHardwareCalculator;

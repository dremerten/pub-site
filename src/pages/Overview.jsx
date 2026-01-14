import {experienceData, personalInfo} from "@/data/resume";
import { useState, useEffect, useRef } from "react";
import { StickyButtons } from "@/components/StickyButtons";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Overview = () => {
  const [catCommand, setCatCommand] = useState("");
  const catCommandFull = "cat Key-Achievements.txt";
  const [aboutText, setAboutText] = useState("");
  const aboutFullText = `Key Achievements & Responsibilities

• Optimized application performance and accelerated release cycles by identifying bottlenecks, streamlining deployment workflows, and improving overall system reliability.

• Improved operational efficiency through automation, proactive issue detection, and continuous refinement of infrastructure and testing processes.

• Designed and maintained internal infrastructure for the Aspera WebApps team, ensuring environments were secure, reproducible, and consistently aligned with engineering requirements.

• Prioritized security by reviewing software versions and dependencies, enforcing long-term support (LTS) standards, and maintaining compliance with high-security environments.

• Served as a key contributor to the release cycles of HSTS, Aspera Proxy, HTTP-Gateway, and OTFV (Out-of-File-Validation), ensuring stability, quality, and on-time delivery.

• Enhanced overall product performance and customer satisfaction by contributing to Faspex 5 releases (5.0.0–5.0.14), improving reliability and readiness for production workloads.

• Validated Faspex 5's high-availability architecture using Keepalived multi-proxy failover, MaxScale, and MariaDB Galera Cluster, successfully demonstrating the removal of single points of failure present in Faspex 4.`;
  const scrollContainerRef = useRef(null);

  const scrollPanels = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.95;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < catCommandFull.length) {
          setCatCommand(catCommandFull.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          // Once command is fully typed, show all content instantly
          setTimeout(() => {
            setAboutText(aboutFullText);
          }, 300);
        }
      }, 50);

      return () => clearInterval(timer);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="bg-black text-white relative min-h-screen">
      <StickyButtons />
      {/* Hero Section */}
      <section className="min-h-[35vh] flex flex-col justify-center items-center relative">
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-6 sm:py-8">
          <div className="inline-block mb-4">
            <div className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">Professional Dashboard</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 tracking-tight leading-tight text-white">
              {personalInfo.name}
            </h1>

            {/* Small Professional Snapshot Icons */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* Status */}
              <div className="group relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] text-gray-300">
                  Open to Work
                </div>
              </div>

              {/* Professional */}
              <div className="group relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] text-gray-300">
                  Platform Engineer
                </div>
              </div>

              {/* Security */}
              <div className="group relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] text-gray-300">
                  5+ Years Security
                </div>
              </div>

              {/* CKA */}
              <div className="group relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] text-gray-300">
                  CKA In Progress
                </div>
              </div>
            </div>

            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-3"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Seeking opportunities as a <span className="text-white font-medium">Platform Engineer</span>, <span className="text-white font-medium">(Infrastructure-Focused) DevOps Engineer</span>, or <span className="text-white font-medium">IAM Engineer</span>
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Focus */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto pb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/30 overflow-hidden pt-6 flex flex-col items-center text-center">
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-emerald-100/80 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-300/30 mb-2">
              In Progress
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">CKA — Certified Kubernetes Administrator</h3>
          </div>
          <div className="relative rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4 shadow-lg shadow-cyan-900/30 overflow-hidden pt-6 flex flex-col items-center text-center">
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-cyan-100/80 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-300/30 mb-2">
              In Progress
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">CISSP — Certified Information Systems Security Professional</h3>
          </div>
        </div>
      </section>

      <div className="w-full relative z-10">
        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div ref={scrollContainerRef} className="overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar">
            <div className="flex">
              {/* Experience Timeline Section - Full Width */}
              <section className="py-2 w-full flex-shrink-0 snap-start px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center lg:text-left mb-3">
                    <h2 className="text-xl sm:text-2xl font-light mb-1.5 text-white tracking-tight">Experience Timeline</h2>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
                      My professional journey from Software Apprentice to Senior QA / DevOps Engineer
                    </p>
                  </div>

                  <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-md hover:shadow-lg transition-all duration-300 p-3 sm:p-4 max-h-[340px] sm:max-h-[380px] flex flex-col">
                    <div className="space-y-2.5 overflow-y-auto max-h-[280px] sm:max-h-[320px]">
                      {experienceData.map((exp, index) => (
                        <div key={`exp-${index}`} className="relative pl-4 border-l-2 border-gray-700 hover:border-blue-500 transition-all">
                          <div className="absolute -left-[5px] top-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex items-start justify-between mb-1">
                            <span className="text-xs sm:text-sm font-medium text-white">{exp.position}</span>
                          </div>
                          <div className="text-[10px] sm:text-xs text-gray-300 mb-0.5 font-normal">{exp.company}</div>
                          <div className="text-[10px] text-gray-400 font-normal">{exp.years}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Key Achievements Section - Full Width */}
              <section className="py-2 w-full flex-shrink-0 snap-start px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center lg:text-left mb-3">
                    <h2 className="text-xl sm:text-2xl font-light mb-1.5 text-white tracking-tight">Key Achievements</h2>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
                      Highlights from my professional journey in Platform Engineering and DevOps
                    </p>
                  </div>

                  {/* Terminal Panel */}
                  <div className="relative bg-gray-900 rounded-xl border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-[450px]">
                    {/* Terminal Header */}
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-b border-gray-800 flex items-center justify-between bg-gray-950 rounded-t-xl">
                      <h3 className="text-xs sm:text-sm font-medium text-white">Terminal Output</h3>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-2.5 sm:p-3 h-[394px]">
                      <div className="bg-black border border-gray-800 rounded-lg p-2.5 sm:p-3 w-full h-full overflow-y-auto">
                        <div className="font-mono text-[10px] sm:text-xs h-full w-full flex flex-col">
                          <div className="mb-1.5 overflow-x-auto">
                            <span className="text-green-400">user@devops</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$ {catCommand}</span>
                            {catCommand.length > 0 && catCommand.length < catCommandFull.length && (
                              <span className="animate-pulse bg-green-400 text-green-400">_</span>
                            )}
                          </div>
                          {aboutText && (
                            <div className="text-green-300 leading-relaxed whitespace-pre-wrap break-words text-[10px] sm:text-xs flex-1">
                              {aboutText}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Scroll Controls */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4">
            <button
              type="button"
              aria-label="Scroll to previous panel"
              onClick={() => scrollPanels("prev")}
              className="pointer-events-auto inline-flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/10 shadow-lg backdrop-blur"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll to next panel"
              onClick={() => scrollPanels("next")}
              className="pointer-events-auto inline-flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/10 shadow-lg backdrop-blur"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center gap-2 mt-4 mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div>
        <p className="text-center text-[10px] text-gray-500 mb-4">Swipe to navigate between sections</p>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black text-center border-t border-gray-800 relative z-10 mt-8">
        <p className="mb-4 text-gray-400 text-xs font-normal tracking-wide">{personalInfo.name} © {new Date().getFullYear()}</p>
        <div className="flex justify-center gap-8 text-xs">
          <a href="https://github.com/dremerten" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors font-normal">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default Overview;

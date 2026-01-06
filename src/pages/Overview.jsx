import {experienceData, personalInfo} from "@/data/resume";
import { useState, useEffect } from "react";

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
    <div className="bg-white text-gray-900 relative min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[45vh] flex flex-col justify-center items-center relative">
        <div className="relative z-10 text-center px-6 sm:px-8 max-w-6xl mx-auto py-12 sm:py-20">
          <div className="inline-block mb-10">
            <div className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">Professional Dashboard</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-tight leading-tight text-gray-900">
              {personalInfo.name}
            </h1>

            {/* Small Professional Snapshot Icons */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {/* Status */}
              <div className="group relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs text-gray-600">
                  Open to Work
                </div>
              </div>

              {/* Professional */}
              <div className="group relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs text-gray-600">
                  Platform Engineer
                </div>
              </div>

              {/* Security */}
              <div className="group relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs text-gray-600">
                  5+ Years Security
                </div>
              </div>

              {/* CKA */}
              <div className="group relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs text-gray-600">
                  CKA In Progress
                </div>
              </div>
            </div>

            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-normal leading-relaxed">
              Actively seeking opportunities as a <span className="text-gray-900 font-medium">Platform Engineer</span> or <span className="text-gray-900 font-medium">(Infrastructure-Focused) DevOps Engineer</span>
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Experience Timeline Section */}
        <section className="py-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-light mb-3 text-gray-900 tracking-tight">Experience Timeline</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-normal">
              My professional journey from Software Apprentice to Senior QA / DevOps Engineer
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 p-5 sm:p-6">
            <div className="space-y-4">
              {experienceData.map((exp, index) => (
                <div key={`exp-${index}`} className="relative pl-5 border-l-2 border-gray-200 hover:border-blue-500 transition-all">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-sm sm:text-base font-medium text-gray-900">{exp.position}</span>
                    {exp.status && (
                      <span className="bg-green-50 text-green-700 text-[11px] px-2 py-0.5 rounded-full border border-green-200 font-normal">
                        {exp.status}
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 mb-1 font-normal">{exp.company}</div>
                  <div className="text-[11px] text-gray-500 font-normal">{exp.years}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="mb-6 relative z-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Key Achievements Section */}
        <section className="py-6">
          <div className="text-center mb-6">
            <h2 className="text-4xl sm:text-5xl font-light mb-4 text-gray-900 tracking-tight">Key Achievements</h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto font-normal leading-relaxed">
              Highlights from my professional journey in Platform Engineering and DevOps
            </p>
          </div>

          {/* Terminal Panel */}
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 mb-6 hidden sm:block">
            {/* Terminal Header */}
            <div className="px-5 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-2xl">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Terminal Output</h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-5 sm:p-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 w-full min-h-[420px] sm:min-h-[520px] max-h-[70vh]">
                <div className="font-mono text-[13px] sm:text-sm h-full w-full flex flex-col">
                  <div className="mb-3 overflow-x-auto">
                    <span className="text-green-400">user@devops</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">$ {catCommand}</span>
                    {catCommand.length > 0 && catCommand.length < catCommandFull.length && (
                      <span className="animate-pulse bg-green-400 text-green-400">_</span>
                    )}
                  </div>
                  {aboutText && (
                    <div className="text-green-300 leading-relaxed whitespace-pre-wrap break-words text-xs sm:text-sm flex-1">
                      {aboutText}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-20 px-8 bg-white text-center border-t border-gray-200 relative z-10 mt-24">
        <p className="mb-8 text-gray-700 text-sm font-normal tracking-wide">{personalInfo.name} © {new Date().getFullYear()}</p>
        <div className="flex justify-center gap-12 text-sm">
          <a href="https://github.com/dremerten" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors font-normal">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default Overview;

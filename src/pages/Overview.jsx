import {experienceData, personalInfo, coreSkills, metadataInfo} from "@/data/resume";
import PageWrapper from "@/components/PageWrapper";
import { useState, useEffect } from "react";

// Cockpit Panel Component
const CockpitPanel = ({ children, title, panelNumber, status = "nominal", className = "", headerRight = null }) => {
  const statusColors = {
    nominal: "border-emerald-500/40 shadow-emerald-500/10",
    warning: "border-orange-500/40 shadow-orange-500/10",
    info: "border-blue-500/40 shadow-blue-500/10",
    critical: "border-red-500/40 shadow-red-500/10",
  };

  const statusDotColors = {
    nominal: "bg-emerald-500",
    warning: "bg-orange-500",
    info: "bg-blue-500",
    critical: "bg-red-500 animate-pulse",
  };

  return (
    <div className={`relative bg-gradient-to-br from-[#1a1d23] to-[#0f1117] rounded-lg border-2 ${statusColors[status]} shadow-lg ${className}`}>
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gray-600"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gray-600"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gray-600"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gray-600"></div>

      {/* Panel Header */}
      <div className="px-4 py-2 border-b border-gray-700/50 bg-black/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {panelNumber && (
            <span className="font-mono text-xs text-gray-500 bg-black/50 px-2 py-0.5 rounded border border-gray-700">
              P-{panelNumber}
            </span>
          )}
          <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">{title}</span>
          <div className={`w-2 h-2 rounded-full ${statusDotColors[status]}`}></div>
        </div>
        {headerRight}
      </div>

      {/* Panel Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

const Overview = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "● System Online - All Services Up, Running and Healthy";
  const typingSpeed = 50;

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

  const [healthCheckActive, setHealthCheckActive] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, []);

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

  useEffect(() => {
    const runHealthCheck = () => {
      setHealthCheckActive(true);

      setTimeout(() => {
        setHealthCheckActive(false);
      }, 2000);
    };

    runHealthCheck();

    const interval = setInterval(runHealthCheck, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-br from-[#0a0b0f] via-[#0f1117] to-[#0a0b0f] min-h-screen">
        <PageWrapper>
          <div>
            {/* Main Header Console */}
            <div className="mb-6 bg-gradient-to-r from-black/40 via-black/60 to-black/40 rounded-lg border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/10 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg border-2 border-emerald-500/40 flex items-center justify-center">
                    <div className="font-mono text-2xl font-bold text-emerald-400">AM</div>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-1 tracking-wide">{personalInfo.name}</h1>
                    <p className="text-emerald-400 font-mono text-xs md:text-sm flex items-center gap-2">
                      <span>
                        {displayedText.charAt(0)}
                      </span>
                      {displayedText.slice(1)}
                      {displayedText.length < fullText.length && (
                        <span className="animate-pulse">▋</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono">SYSTEM TIME</div>
                    <div className="text-sm text-gray-300 font-mono">{new Date().toLocaleTimeString()}</div>
                  </div>
                  <button className="bg-emerald-500/10 hover:bg-emerald-500/20 border-2 border-emerald-500/40 px-4 py-2 rounded font-mono text-emerald-400 text-sm transition-all hover:scale-105">
                    ⟳ REFRESH
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* Status Panel */}
              <CockpitPanel title="System Status" panelNumber="01" status="warning" className="animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-orange-500/20 p-3 rounded-lg border border-orange-500/40 animate-pulse">
                    <svg className="w-8 h-8 text-orange-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-bold text-orange-300 mb-2 animate-pulse">
                      <span className="inline-block">AVAILABLE FOR HIRE</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">Actively seeking new opportunities in DevOps/Test Engineering</p>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded border border-orange-500/40 animate-pulse">SEVERITY: INFO</span>
                      <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded border border-emerald-500/40">STATE: ACTIVE</span>
                    </div>
                  </div>
                </div>
              </CockpitPanel>

              {/* Metadata Panel */}
              <CockpitPanel
                title="Configuration Data"
                panelNumber="02"
                status="info"
                headerRight={<span className="text-xs text-gray-500 font-mono">application/json</span>}
              >
                <div className="bg-black/60 border border-gray-700 rounded p-3 font-mono text-xs overflow-x-auto">
                  <pre className="text-gray-400">
{`{
`}{metadataInfo.map((item, index) => {
  const key = item.text.toLowerCase().includes('certified') ? 'certification'
            : item.text.toLowerCase().includes('looking for devops') ? 'status'
            : item.text.toLowerCase().includes('open to work') ? 'location'
            : item.text.toLowerCase().includes('looking for full') ? 'employment'
            : `item_${index}`;
  return (
    <span key={index}>
      {`  `}<span className="text-blue-400">"{key}"</span>{`: `}<span className="text-emerald-400">"{item.text}"</span>{index < metadataInfo.length - 1 ? ',\n' : '\n'}
    </span>
  );
})}{`}`}
                  </pre>
                </div>
              </CockpitPanel>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <CockpitPanel title="Uptime" panelNumber="03" status="nominal" className="hover:scale-105 transition-transform">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">99.99%</div>
                  <div className="flex items-center justify-center gap-1 text-xs mb-3">
                    <span className="text-emerald-500">▲ 0.01%</span>
                  </div>
                  <div className="bg-black/40 border border-gray-700 rounded p-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-mono">GET /health</span>
                      {healthCheckActive && (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                          OK
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CockpitPanel>

              <CockpitPanel title="Years Active" panelNumber="04" status="info" className="hover:scale-105 transition-transform">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-3">7</div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-4/5"></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-mono">2018 - 2025</div>
                </div>
              </CockpitPanel>

              <CockpitPanel title="Security Lead" panelNumber="05" status="warning" className="hover:scale-105 transition-transform">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-3">5+ yrs</div>
                  <div className="text-xs text-gray-400 leading-relaxed">Led, organized, setup and configured IBM Aspera WebApps Products for DISA and STIG Testing for Government Entities</div>
                </div>
              </CockpitPanel>

              <CockpitPanel title="Certifications" panelNumber="06" status="info" className="hover:scale-105 transition-transform">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-3">CKA</div>
                  <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1.5 rounded border border-yellow-500/40 font-mono">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                    IN PROGRESS
                  </div>
                </div>
              </CockpitPanel>
            </div>

            {/* Terminal Panel */}
            <CockpitPanel
              title="Terminal Interface"
              panelNumber="07"
              status="nominal"
              className="mb-4"
              headerRight={
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
              }
            >
              <div className="bg-black/60 border border-gray-700 rounded p-4">
                <div className="font-mono text-xs md:text-sm">
                  <div className="mb-2 overflow-x-auto">
                    <span className="text-green-400">user@devops</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">$ {catCommand}</span>
                    {catCommand.length > 0 && catCommand.length < catCommandFull.length && (
                      <span className="animate-pulse bg-green-400 text-green-400">_</span>
                    )}
                  </div>
                  {aboutText && (
                    <div className="text-green-300 leading-relaxed whitespace-pre-wrap break-words">
                      {aboutText}
                    </div>
                  )}
                </div>
              </div>
            </CockpitPanel>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CockpitPanel title="Experience Timeline" panelNumber="08" status="nominal">
                <div className="space-y-3">
                  {experienceData.map((exp, index) => (
                    <div key={`exp-${index}`} className="relative pl-4 border-l-2 border-blue-500/50 hover:border-emerald-500 transition-all">
                      <div className="absolute -left-[5px] top-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-200">{exp.position}</span>
                        {exp.status && (
                          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded border border-emerald-500/40 font-mono">
                            {exp.status}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mb-1">{exp.company}</div>
                      <div className="text-xs text-gray-500 font-mono">{exp.years}</div>
                    </div>
                  ))}
                </div>
              </CockpitPanel>

              <CockpitPanel title="Core Skills Matrix" panelNumber="09" status="info">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {coreSkills.map((skill, index) => {
                    return (
                      <div key={index} className="bg-black/40 border border-gray-700 rounded p-3 hover:border-blue-500/50 hover:bg-black/60 transition-all text-center">
                        <span className="text-xs text-gray-300 font-medium">{skill}</span>
                      </div>
                    );
                  })}
                </div>
              </CockpitPanel>
            </div>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default Overview;

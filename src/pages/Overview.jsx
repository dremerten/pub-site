import {experienceData, personalInfo, coreSkills, metadataInfo} from "@/data/resume";
import PageWrapper from "@/components/PageWrapper";
import { useState, useEffect } from "react";

const Overview = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "● System Online - All Services Running";
  const typingSpeed = 50;

  const [aboutText, setAboutText] = useState("");
  const aboutFullText = personalInfo.summary.join("\n\n");
  const aboutTypingSpeed = 15;

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
        if (index < aboutFullText.length) {
          setAboutText(aboutFullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, aboutTypingSpeed);

      return () => clearInterval(timer);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div>
      <div className="bg-[#0b0c0e] min-h-screen">
        <PageWrapper>
          <div>
            <div className="mb-6 pb-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-200 mb-1">{personalInfo.name}</h1>
                  <p className="text-emerald-400 font-mono text-xs flex items-center gap-2">
                    <span>
                      {displayedText.charAt(0)}
                    </span>
                    {displayedText.slice(1)}
                    {displayedText.length < fullText.length && (
                      <span className="animate-pulse">▋</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-3 items-center text-xs text-gray-400">
                  <span>Last 7 days</span>
                  <button className="bg-[#1f1f23] hover:bg-[#2a2a2f] hover:scale-105 px-3 py-1.5 rounded border border-gray-700 transition-all">
                    Refresh
                  </button>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3 animate-pulse hover:border-orange-500/50 hover:bg-orange-500/15 hover:scale-105 transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-orange-300 mb-1">Status: Available</div>
                    <p className="text-xs text-gray-300">Actively looking for new opportunities</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <span>Severity: INFO</span>
                      <span>•</span>
                      <span>State: RUNNING</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="bg-[#181b1f] rounded border border-gray-800 p-4 hover:border-emerald-500/50 hover:scale-105 transition-all cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium">UPTIME</span>
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">99.99%</div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-emerald-500">▲</span>
                  <span className="text-emerald-500">0.01%</span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>

              <div className="bg-[#181b1f] rounded border border-gray-800 p-4 hover:border-blue-500/50 hover:scale-105 transition-all cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium">YEARS ACTIVE</span>
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-1">7</div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-4/5"></div>
                </div>
              </div>

              <div className="bg-[#181b1f] rounded border border-gray-800 p-4 hover:border-orange-500/50 hover:scale-105 transition-all cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium">SECURITY LEADERSHIP</span>
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-orange-400 mb-1">5+ yrs</div>
                <div className="text-xs text-gray-500">Led, organized, setup and configured IBM Aspera WebApps Products for DISA and STIG Testing for Government Entities</div>
              </div>

              <div className="bg-[#181b1f] rounded border border-gray-800 p-4 hover:border-purple-500/50 hover:scale-105 transition-all cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium">CERTIFICATIONS</span>
                  <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-1">CKA</div>
                <div className="text-xs text-yellow-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                  In Progress
                </div>
              </div>
            </div>

            <div className="bg-black rounded border border-green-500/30 shadow-lg shadow-green-500/10 mb-3 hover:border-green-500/50 transition-all">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono ml-2">terminal</span>
              </div>
              <div className="p-6">
                <div className="font-mono text-sm">
                  <div className="mb-2">
                    <span className="text-green-400">user@devops</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">$ cat about.txt</span>
                  </div>
                  <div className="text-green-300 leading-relaxed whitespace-pre-wrap">
                    {aboutText}
                    {aboutText.length < aboutFullText.length && (
                      <span className="animate-pulse bg-green-400 text-green-400">_</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-[#181b1f] rounded border border-gray-800 hover:border-emerald-500/30 transition-all">
                <div className="px-4 py-2 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-300">Experience Timeline</span>
                  </div>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                </div>
                <div className="p-4 space-y-3">
                  {experienceData.map((exp, index) => (
                    <div key={`exp-${index}`} className="border-l-2 border-blue-500 pl-3 hover:border-emerald-500 transition-all cursor-default">
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-sm font-medium text-gray-200">{exp.position}</span>
                        {exp.status && (
                          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded border border-emerald-500/30">
                            {exp.status}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mb-1">{exp.company}</div>
                      <div className="text-xs text-gray-500 font-mono">{exp.years}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#181b1f] rounded border border-gray-800 hover:border-blue-500/30 transition-all">
                <div className="px-4 py-2 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 7H7v6h6V7z" />
                      <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-300">Core Skills Matrix</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {coreSkills.map((skill, index) => {
                      const widths = [95, 92, 88, 90, 94, 91, 89, 93, 96, 87];
                      return (
                        <div key={index} className="bg-[#0b0c0e] border border-gray-800 rounded p-2 hover:border-blue-500/50 hover:bg-[#0f1014] hover:scale-105 transition-all cursor-default">
                          <div className="mb-1">
                            <span className="text-xs text-gray-300">{skill}</span>
                          </div>
                          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                              style={{width: `${widths[index] || 90}%`}}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="bg-[#181b1f] rounded border border-gray-800 hover:border-purple-500/30 transition-all">
                <div className="px-4 py-2 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-300">Metadata JSON</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">application/json</span>
                </div>
                <div className="p-4">
                  <div className="bg-[#0b0c0e] border border-gray-800 rounded p-3 font-mono text-xs overflow-x-auto">
                    <pre className="text-gray-400">
{`{
  `}<span className="text-blue-400">"certification"</span>{`: `}<span className="text-emerald-400">"CKA (in progress)"</span>{`,
  `}<span className="text-blue-400">"status"</span>{`: `}<span className="text-emerald-400">"Currently active"</span>{`,
  `}<span className="text-blue-400">"location"</span>{`: `}<span className="text-emerald-400">"Richmond, CA"</span>{`,
  `}<span className="text-blue-400">"name"</span>{`: `}<span className="text-emerald-400">"Andreas Merten"</span>{`
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default Overview;

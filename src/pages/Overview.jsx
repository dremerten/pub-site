import {experienceData, personalInfo, coreSkills, metadataInfo} from "@/data/resume";
import PageWrapper from "@/components/PageWrapper";

const Overview = () => {
  return (
    <div>
      <div className="bg-slate-900 min-h-screen">
        <PageWrapper>
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{personalInfo.name}</h1>
                <p className="text-green-400 font-mono text-sm">● System Online - All Services Running</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-800 px-4 py-2 rounded border border-green-500/30">
                  <div className="text-xs text-slate-400 mb-1">Uptime</div>
                  <div className="text-green-400 font-mono font-bold">99.99%</div>
                </div>
                <div className="bg-slate-800 px-4 py-2 rounded border border-blue-500/30">
                  <div className="text-xs text-slate-400 mb-1">Years Active</div>
                  <div className="text-blue-400 font-mono font-bold">7</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300 font-medium">Experience</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{experienceData[0].position.replace("(Band 8)", "")}</span>
                    <span className="text-green-400 font-mono">Active</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded text-xs text-slate-400">
                    {experienceData[0].company} • {experienceData[0].years}
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300 font-medium">Core Skills</span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {coreSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300 font-medium">Alerts</span>
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-yellow-200">Actively looking for new opportunities</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300 font-medium">Metadata</span>
                  <span className="w-2 h-2 bg-purple-800 rounded-full"></span>
                </div>
                <div className="flex flex-col gap-1">
                  {
                    metadataInfo.map((metadata, index) => {
                      const Icon = metadata.icon;
                      return (
                        <div key={`metadata-info-${index}`} className="flex flex-row gap-2 items-center">
                          <Icon className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-400 text-xs">
                            {metadata.text}
                          </span>
                        </div>
                      );
                    })
                  }
                </div>
                <div className="text-2"></div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4 font-mono">About</h2>
              <div className="flex flex-col gap-4">
                {personalInfo.summary.map((item, index) => (
                  <p key={`summary-${index}`} className="text-slate-300 leading-relaxed">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default Overview;

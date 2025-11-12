import {experienceData, personalInfo, coreSkills} from "@/data/resume";
import PageWrapper from "@/components/PageWrapper";

const Overview = () => {
  return (
    <div>
      <div className="bg-slate-900 min-h-screen">
        <PageWrapper>
          <div className="mmax-w-6xl mxd-auto">
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
                  <div className="text-xs text-slate-400 mb-1">Projects</div>
                  <div className="text-blue-400 font-mono font-bold">{personalInfo.projectCount}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
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
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                </div>
                <div className="text-center py-2">
                  <div className="text-2xl font-bold text-slate-600 font-mono">0</div>
                  <div className="text-xs text-slate-500">No issues detected</div>
                </div>
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

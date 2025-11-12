import PageWrapper from "../components/PageWrapper.jsx";
import { personalInfo, experienceData, skillsData, comments } from "@/data/resume";

const ExperienceItem = ({
  company,
  position,
  years,
  highlights=[]
}) => {
  return (
    <div>
      <span className="text-purple-400">- company:</span> <span className="text-orange-300">"{ company }"</span>
      <div className="ml-4">
        <span className="text-blue-400">position:</span> <span className="text-orange-300">"{ position }"</span><br/>
        <span className="text-blue-400">years:</span> <span className="text-green-300">"{ years }"</span><br/>
        <span className="text-blue-400">highlights:</span><br />
        <div className="ml-4 mt-2 space-y-3">
          {
            highlights.map((item, index) => (
              <>
                <span key={index} className="text-orange-300">- "{ item }"</span>
                <br />
              </>
            ))
          }
        </div>
      </div>
    </div>
  );
}

const SkillsItem = ({type, items}) => {
  return (
    <div className="ml-4 mt-2">
      <span className="text-purple-400">{type}:</span> <span className="text-slate-400">[</span><span className="text-orange-300">"{items.join('", "')}"</span><span className="text-slate-400">]</span><br/>
    </div>
  );
}

const Resume = () => {
  return (
    <PageWrapper>
      <div className="border-2 rounded-md font-mono">
        <div className="border-b-2 pt-2 pb-2 pl-3 pr-3 flex flex-row items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-slate-400 text-sm">resume.yaml</span>
        </div>

        <div className="p-6">
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-blue-400">name:</span> <span className="text-orange-300">"{personalInfo.name}"</span>
            </div>
            <div>
              <span className="text-blue-400">role:</span> <span className="text-orange-300">"{personalInfo.role}"</span>
            </div>

            <div className="mt-6">
              <span className="text-blue-400">experience:</span>
              <div className="ml-4 mt-2 space-y-3">
                {
                  experienceData.map((item, index) => (
                    <ExperienceItem
                      key={index}
                      position={item.position}
                      company={item.company}
                      years={item.years}
                      highlights={item.highlights}
                    />
                  ))
                }
              </div>
            </div>

            <div className="mt-6">
              <span className="text-blue-400">skills:</span>
              {
                skillsData.map((item, index) => (
                  <SkillsItem items={item.items} key={index} type={item.type} />
                ))
              }
            </div>

            <div className="mt-6">
              {comments.map((comment, index) => (
                <span key={index} className="text-slate-600"># {comment}<br/></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Resume;

import {personalInfo} from "@/data/resume";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StickyButtons } from "@/components/StickyButtons";

const Home = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const firstName = personalInfo.name.split(' ')[0];
  const fullHeroText = `Hi There! I'm ${firstName}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullHeroText.slice(0, index + 1));
      index++;
      if (index >= fullHeroText.length) {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [fullHeroText]);

  return (
    <div className="bg-gradient-to-b from-[#050914] via-[#070b16] to-black text-white relative min-h-screen">
      <StickyButtons />
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-[70vh] sm:min-h-[85vh] flex flex-col justify-center items-center relative transition-all duration-700"
      >
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto py-12 sm:py-16">
          <div className="inline-block mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-tight leading-tight text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                {typedText || fullHeroText}
              </span>
              <span className="ml-1 inline-block w-2.5 h-6 align-middle bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
            </h1>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-5"></div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-normal mb-4 text-gray-200 leading-relaxed max-w-4xl mx-auto">
            I’m seeking my next opportunity as a <span className="text-white font-medium">Platform Engineer</span>, <span className="text-white font-medium">Infrastructure-Focused DevOps Engineer</span>, or <span className="text-white font-medium">IAM Engineer</span>.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed font-normal">
            I assist in designing, building, and operating core platforms, infrastructure, and identity systems that development teams rely on for secure and efficient software delivery. My focus is on building stable, scalable, and automated platforms using cloud infrastructure, CI/CD pipelines, container orchestration, and identity-driven access controls. I help create internal systems that reduce operational friction, strengthen security, and empower engineering teams to deliver software quickly, reliably, and with confidence.
          </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 justify-center items-center max-w-3xl mx-auto">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            navigate('/about');
          }}
          className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          About me
        </button>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            navigate('/projects');
          }}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          My Featured Projects
        </button>
        <a
          href="https://www.linkedin.com/in/dremer10/details/recommendations/?detailScreenTabIndex=0"
          target="_blank"
          rel="noopener noreferrer"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-amber-300 font-medium px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:shadow-[0_0_28px_rgba(251,191,36,0.8)] hover:scale-105 relative overflow-hidden cursor-pointer"
              style={{ textShadow: "0 0 8px rgba(251,191,36,0.8)" }}
            >
              Recommendations
            </a>
            
          </div>
        </div>
      </section>

      <div className="pb-20 sm:pb-28" />
    </div>
  );
};

export default Home;

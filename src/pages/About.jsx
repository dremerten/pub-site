import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { StickyButtons } from "@/components/StickyButtons";
import { personalInfo } from "@/data/resume";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#050914] via-[#070b16] to-black text-white min-h-screen">
      <StickyButtons />
      <PageWrapper>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
            <Link to="/home" className="inline-flex items-center gap-2 hover:text-gray-200 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </Link>
          </div>

          <header className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-xs tracking-[0.25em] uppercase">
              About Me
            </div>
            <p className="text-base text-gray-200 leading-relaxed max-w-3xl mt-4 font-normal">
              {personalInfo.summary[0]}
            </p>
          </header>

          <section className="space-y-5 text-base text-gray-200 leading-relaxed font-normal mb-8">
            {personalInfo.summary.slice(1).map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </section>

          <div className="my-10 sm:my-12 border-t border-gray-200"></div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate("/about/showcase")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Next
            </button>
          </div>
        </div>
      </PageWrapper>

    </div>
  );
};

export default About;

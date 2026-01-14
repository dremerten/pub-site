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
            <p className="text-base text-gray-200 leading-relaxed max-w-4xl mt-4 font-normal">
              I come from a non-traditional engineering background, having spent 12 years as a professional chef before making a deliberate career change
              into technology through IBM’s Software Engineer Apprenticeship program. That experience shaped how I work today: staying calm under pressure,
              holding high standards, continuously refining processes, and always prioritizing quality and reliability.
            </p>
          </header>

          <section className="space-y-5 text-base text-gray-200 leading-relaxed font-normal mb-8">
            <p>
              I started at Aspera (an IBM company) as a Software Engineer Apprentice, where I built my foundation in software engineering, systems, and automation.
              I then moved into a QA Engineer role, developing a deep understanding of system behavior, failure modes, and reliability. From there, I progressed
              into QA Automation, where my focus shifted heavily toward building automated systems, improving pipelines, and eliminating manual work through
              tooling and process improvements.
            </p>
            <p>
              Most recently, I’ve been working as a Senior QA / DevOps Engineer, where my responsibilities expanded beyond quality into infrastructure ownership,
              platform stability, automation, and security. Over the last year especially, my work has become increasingly infrastructure- and security-focused,
              including platform reliability, access controls, and building automation that improves both system resilience and security posture.
            </p>
            <p>
              This progression was intentional. I naturally gravitated from testing applications to building the platforms and systems that support them. What began
              as improving quality through automation evolved into strengthening the infrastructure and identity foundations that engineering teams depend on. That’s
              why my next step is toward Platform Engineering, Infrastructure-Focused DevOps, and IAM Engineering roles.
            </p>
            <p>
              My QA background remains one of my strongest assets. It gives me a reliability-first mindset, a strong instinct for risk reduction, and a deep appreciation
              for automation, observability, and resilience. I approach infrastructure and platform engineering with the same discipline: reducing manual toil, improving
              developer experience, hardening systems, and building platforms teams can trust.
            </p>
            <p>
              I’m currently pursuing my CKA certification to further deepen my Kubernetes expertise and continue evolving as a platform-focused engineer with strong
              infrastructure and security foundations.
            </p>
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

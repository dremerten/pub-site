import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { StickyButtons } from "@/components/StickyButtons";

export const projects = [
  {
    title: "DevOps Toolkit",
    subtitle: "Multi-environment CI/CD with full observability",
    description:
      "A production-grade DevSecOps toolkit spanning development through production, featuring automated pipelines, Kubernetes workloads, and live Grafana dashboards.",
    tags: ["Kubernetes", "CI/CD", "Observability"],
    image: "/images/devopstoolkit.png",
    accent: "from-sky-400/30 via-blue-500/10 to-emerald-400/20",
    detailPath: "/projects/devops-toolkit",
    ctas: [
      { label: "View detail", to: "/projects/devops-toolkit", type: "internal" },
      { label: "Dev", href: "https://dev-devops-toolkit.dremer10.com", type: "external" },
      { label: "QA", href: "https://qa-devops-toolkit.dremer10.com", type: "external" },
      { label: "Staging", href: "https://staging-devops-toolkit.dremer10.com", type: "external" },
      { label: "Check it Out Live", href: "https://devops-toolkit.dremer10.com", type: "external" },
    ],
  },
  {
    title: "3D Solar System Simulator",
    subtitle: "Immersive, browser-based exploration",
    description:
      "An interactive 3D solar system built for the web. Explore realistic planetary motion with smooth camera controls, tuned for desktop and mobile.",
    tags: ["3D Web", "Vite", "Responsive"],
    image: "/images/solar_system1.png",
    accent: "from-amber-400/30 via-indigo-500/10 to-purple-500/20",
    detailPath: "/projects/solar-system-simulator",
    ctas: [
      { label: "View detail", to: "/projects/solar-system-simulator", type: "internal" },
      { label: "Check it Out Live", href: "https://solar.dremer10.com", type: "external" },
    ],
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#050914] via-[#070b16] to-black text-white min-h-screen">
      <StickyButtons />
      <PageWrapper>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            data-section="header"
            className={`mb-8 text-center transition-all duration-700 ${
              isVisible.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white shadow-lg shadow-blue-500/20 text-[10px] tracking-[0.2em] uppercase mb-3">
              <Sparkles className="w-3 h-3" />
              Portfolio
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">Featured Projects</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto px-2">
              Explore the latest builds. Each card previews the experience—dive in to see the full write-up, tech stack, and live links.
            </p>
          </div>

          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div
                key={project.title}
                ref={(el) => (sectionRefs.current[idx + 1] = el)}
                data-section={`project-${idx}`}
                className={`transition-all duration-700 cursor-pointer ${
                  isVisible[`project-${idx}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${150 + idx * 50}ms` }}
                role="button"
                tabIndex={0}
                onClick={() => navigate(project.detailPath)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(project.detailPath);
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-blue-500/10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-50 pointer-events-none`}></div>
                  <div className="relative flex flex-col md:grid md:grid-cols-5 gap-3 md:gap-6 p-4 md:p-6 items-center">
                    <div className="w-full md:col-span-2 order-1 md:order-2">
                      <div className="group relative block">
                        <div className="absolute -inset-2 bg-gradient-to-tr from-white/30 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                        <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-xl shadow-blue-500/10 aspect-square bg-black/60 p-1.5">
                          <img src={project.image} alt={`${project.title} preview`} className="w-full h-full object-contain transform group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3 space-y-2 md:space-y-3 order-2 md:order-1 w-full">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      </div>
                      <h2 className="text-xl md:text-3xl font-semibold text-white">{project.title}</h2>
                      <p className="text-xs md:text-sm text-gray-300">{project.subtitle}</p>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 text-white border border-white/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 md:gap-2 pt-1 md:pt-1.5">
                        {project.ctas.map((cta) =>
                          cta.type === "internal" ? (
                            <Link
                              key={cta.label}
                              to={cta.to}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 hover:translate-y-[-1px] hover:shadow-lg hover:shadow-black/40 transition-all cursor-pointer"
                            >
                              {cta.label}
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          ) : (
                            <a
                              key={cta.label}
                              href={cta.href}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-blue-600 text-white border border-blue-600 text-xs font-semibold hover:bg-blue-700 hover:border-blue-700 hover:-translate-y-0.5 transition-all cursor-pointer"
                            >
                              {cta.label}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Projects;

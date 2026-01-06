import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";

const projects = [
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
      { label: "Live App", href: "https://devops-toolkit.dremer10.com", type: "external" },
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
      { label: "Live App", href: "https://solar.dremer10.com", type: "external" },
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
    <div className="bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
      <PageWrapper>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            data-section="header"
            className={`mb-14 text-center transition-all duration-700 ${
              isVisible.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white shadow-lg shadow-blue-500/20 text-xs tracking-[0.2em] uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              Portfolio
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-4">Featured Projects</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              Explore the latest builds. Each card previews the experience—dive in to see the full write-up, tech stack, and live links.
            </p>
          </div>

          <div className="space-y-10">
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
                <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-blue-500/5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-70 pointer-events-none`}></div>
                  <div className="relative flex flex-col md:grid md:grid-cols-5 gap-4 md:gap-10 p-5 md:p-10 items-center">
                    <div className="w-full md:col-span-2 order-1 md:order-2">
                      <div className="group relative block">
                        <div className="absolute -inset-3 bg-gradient-to-tr from-white/50 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                        <div className="relative overflow-hidden rounded-2xl border border-white/80 shadow-2xl shadow-blue-500/10 aspect-square bg-gray-900 p-2">
                          <img src={project.image} alt={`${project.title} preview`} className="w-full h-full object-contain transform group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3 space-y-3 md:space-y-4 order-2 md:order-1 w-full">
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">{project.title}</h2>
                      <p className="text-sm md:text-base text-gray-700">{project.subtitle}</p>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/70 text-gray-800 border border-gray-200">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 md:gap-3 pt-1 md:pt-2">
                        {project.ctas.map((cta) =>
                          cta.type === "internal" ? (
                            <Link
                              key={cta.label}
                              to={cta.to}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-black text-white text-sm font-semibold hover:translate-y-[-1px] hover:shadow-lg hover:shadow-black/15 transition-all"
                            >
                              {cta.label}
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          ) : (
                            <a
                              key={cta.label}
                              href={cta.href}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-gray-300 text-sm font-semibold text-gray-800 bg-white/80 backdrop-blur hover:border-gray-500 hover:-translate-y-0.5 transition-all"
                            >
                              {cta.label}
                              <ExternalLink className="w-4 h-4" />
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

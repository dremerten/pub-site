import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { StickyButtons } from "@/components/StickyButtons";
import { projects } from "./Projects.jsx";

const techStack = [
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes/326CE5" },
  { name: "Python3", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Shell", icon: "https://cdn.simpleicons.org/gnometerminal/241F31" },
  { name: "YAML", icon: "https://cdn.simpleicons.org/yaml/CB171E" },
  { name: "JSON", icon: "https://cdn.simpleicons.org/json/000000" },
  { name: "Terraform", icon: "https://cdn.simpleicons.org/terraform/7B42BC" },
  { name: "Ansible", icon: "https://cdn.simpleicons.org/ansible/EE0000" },
  { name: "AWS", icon: "/icons/aws.svg" },
  { name: "Nginx", icon: "https://cdn.simpleicons.org/nginx/009639" },
  { name: "HAProxy", icon: "/icons/haproxy.svg" },
  { name: "Caddy", icon: "https://cdn.simpleicons.org/caddy/1F88C0" },
  { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF" },
  { name: "Jenkins", icon: "https://cdn.simpleicons.org/jenkins/D24939" },
  { name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Bash", icon: "https://cdn.simpleicons.org/gnubash/4EAA25" },
  { name: "Netdata", icon: "https://cdn.simpleicons.org/netdata/00AB44" },
  { name: "Vault", icon: "https://cdn.simpleicons.org/vault/FFEC6E" },
  { name: "Active Directory", icon: "/icons/active-directory.svg" },
  { name: "ADFS", icon: "https://symbols.getvecta.com/stencil_31/1_active-directory-federation-services.f7b5702ada.svg" },
  { name: "Okta", icon: "https://cdn.simpleicons.org/okta/007DC1" },
  { name: "Authentik", icon: "https://cdn.simpleicons.org/authentik/FD4B2D" },
];

const AboutShowcase = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused && projects.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused]);

  const handleNavigate = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "next") return (prev + 1) % projects.length;
      return (prev - 1 + projects.length) % projects.length;
    });
  };

  return (
    <div className="bg-gradient-to-b from-[#0b1229] via-[#0d0b21] to-black text-white min-h-screen">
      <StickyButtons />
      <PageWrapper>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-8">
            <Link to="/about" className="inline-flex items-center gap-2 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to About
            </Link>
          </div>

          <section className="mb-10">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">Featured Projects</h2>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span>Auto-cycling</span>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                ref={sliderRef}
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project) => (
                  <div key={project.title} className="w-full flex-shrink-0 px-4 py-6 sm:px-6 sm:py-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-inner bg-white/5 p-3">
                        <img src={project.image} alt={`${project.title} preview`} className="w-full h-full object-contain" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">{project.title}</h3>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-md bg-transparent text-white text-[10px] sm:text-xs font-medium border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={project.detailPath}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 text-white text-xs font-semibold hover:bg-white/25 transition-colors"
                          >
                            View detail
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          {project.ctas
                            .filter((cta) => cta.type === "external" && cta.label.toLowerCase().includes("check it out"))
                            .map((cta) => (
                              <a
                                key={cta.label}
                                href={cta.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                              >
                                {cta.label}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                aria-label="Previous project"
                onClick={() => handleNavigate("prev")}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 text-white border border-white/30 rounded-full p-2 shadow-md hover:bg-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                aria-label="Next project"
                onClick={() => handleNavigate("next")}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 text-white border border-white/30 rounded-full p-2 shadow-md hover:bg-white transition"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          <section className="mb-14">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Technologies & Tools
              </h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5">
              {techStack.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white/5 border border-white/10">
                  <img src={tech.icon} alt={tech.name} className="w-12 h-12" />
                  <span className="text-xs text-white font-medium text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </PageWrapper>
    </div>
  );
};

export default AboutShowcase;

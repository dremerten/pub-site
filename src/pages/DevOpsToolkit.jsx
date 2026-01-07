import { ExternalLink, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import { useState, useEffect, useRef } from "react";
import { StickyButtons } from "@/components/StickyButtons";

const DevOpsToolkit = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const dropdownRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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

  const environments = [
    { name: "Development", value: "development", url: "https://dev-devops-toolkit.dremer10.com" },
    { name: "QA", value: "qa", url: "https://qa-devops-toolkit.dremer10.com" },
    { name: "Staging", value: "staging", url: "https://staging-devops-toolkit.dremer10.com" },
    { name: "Production", value: "production", url: "https://devops-toolkit.dremer10.com" }
  ];

  const galleryImages = [
    { src: "/images/main-push.png", alt: "Production CI/CD Pipeline", caption: "Production Branch Pipeline - Main deployment workflow" },
    { src: "/images/dev-push.png", alt: "Development CI/CD Pipeline", caption: "Development Branch Pipeline - Rapid iteration workflow" },
    { src: "/images/grafana.png", alt: "Grafana Monitoring Dashboard", caption: "Live Grafana Dashboard - Real-time cluster monitoring" }
  ];

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="bg-gradient-to-b from-[#050914] via-[#070b16] to-black text-white min-h-screen">
      <StickyButtons />
      <PageWrapper>
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Back to projects
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-white">DevOps Toolkit</span>
          </div>

          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            data-section="header"
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block mb-5">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2">Portfolio</div>
              <h1 className="text-3xl md:text-5xl font-normal tracking-tight text-white mb-5">DevOps Toolkit</h1>
              <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
          </div>

          <div
            ref={(el) => (sectionRefs.current[1] = el)}
            data-section="environments"
            className={`mb-12 flex flex-col items-center gap-5 transition-all duration-1000 delay-200 ${
              isVisible.environments ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="text-center">
              <p className="text-gray-300 text-xs font-semibold tracking-[0.2em] uppercase mb-1.5">Explore Live Environments</p>
              <p className="text-gray-400 text-[10px] font-normal">Click any environment to visit it instantly</p>
            </div>

            {/* New Environment Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
              {environments.map((env, index) => {
                const colors = {
                  development: { bg: "from-blue-500 to-blue-600", hover: "hover:from-blue-600 hover:to-blue-700", shadow: "shadow-blue-500/50" },
                  qa: { bg: "from-green-500 to-green-600", hover: "hover:from-green-600 hover:to-green-700", shadow: "shadow-green-500/50" },
                  staging: { bg: "from-amber-500 to-amber-600", hover: "hover:from-amber-600 hover:to-amber-700", shadow: "shadow-amber-500/50" },
                  production: { bg: "from-purple-500 to-purple-600", hover: "hover:from-purple-600 hover:to-purple-700", shadow: "shadow-purple-500/50" }
                };
                const color = colors[env.value];

                return (
                  <a
                    key={env.value}
                    href={env.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden bg-gradient-to-br ${color.bg} ${color.hover} rounded-xl p-4 transition-all duration-500 hover:scale-105 hover:shadow-xl ${color.shadow} cursor-pointer transform`}
                    style={{
                      animation: isVisible.environments ? `envCardSlideIn 0.6s ease-out ${index * 0.1}s both` : "none"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-bold text-sm text-center">{env.name}</span>
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="w-1.5 h-1.5 bg-white/5 rounded-full animate-pulse"></span>
                        <span className="text-white text-[10px] font-medium">Live</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-500"></div>
                  </a>
                );
              })}
            </div>

            <a
              href="https://grafana.devops-toolkit.dremer10.com/public-dashboards/f0c7dc746ec24ce3be08a7e74fdbd4f0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Live Monitoring
              <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            </a>
          </div>

          <div className="mb-12">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <article className="prose prose-lg max-w-none">
            <section
              ref={(el) => (sectionRefs.current[2] = el)}
              data-section="intro"
              className={`mb-24 transition-all duration-1000 delay-300 ${
                isVisible.intro ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h2
                className="text-4xl md:text-5xl font-normal tracking-tight text-white mb-8"
                style={{
                  animation: isVisible.intro ? "fadeInUp 0.6s ease-out 0.1s both" : "none"
                }}
              >
                DevOps Toolkit
              </h2>
              <p
                className="text-xl text-gray-200 leading-relaxed font-normal mb-6"
                style={{
                  animation: isVisible.intro ? "fadeInUp 0.6s ease-out 0.2s both" : "none"
                }}
              >
                A comprehensive full-stack DevOps platform demonstrating modern cloud-native development practices.
                This project embodies the principles of infrastructure as code, continuous integration and deployment,
                and complete observability.
              </p>
              <p
                className="text-lg text-gray-300 leading-loose font-normal mb-8"
                style={{
                  animation: isVisible.intro ? "fadeInUp 0.6s ease-out 0.3s both" : "none"
                }}
              >
                Built from the ground up to showcase production-ready DevOps engineering, this toolkit represents
                a complete journey from source code to deployed infrastructure, with security, monitoring, and
                automation at every step.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                {["Kubernetes", "Docker", "CI/CD", "Prometheus", "Grafana", "GitHub Actions", "Vue.js", "TypeScript"].map((tech, index) => (
                  <span
                    key={index}
                    className="text-sm text-gray-300 font-normal border-b border-gray-400 pb-0.5 transition-all duration-300 hover:border-gray-900 hover:text-white cursor-default inline-block hover:-translate-y-0.5"
                    style={{
                      animation: isVisible.intro ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none"
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes popFade {
                0% { opacity: 0; transform: translateY(-6px) scale(0.98); }
                60% { opacity: 1; transform: translateY(4px) scale(1.02); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
              }
              @keyframes glowPulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.35); }
                50% { box-shadow: 0 0 0 12px rgba(59,130,246,0); }
              }
              @keyframes attentionBounce {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-14px) scale(1.03); }
              }

              @keyframes slideInLeft {
                from {
                  opacity: 0;
                  transform: translateX(-30px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }

              @keyframes slideInRight {
                from {
                  opacity: 0;
                  transform: translateX(30px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }

              @keyframes expandWidth {
                from {
                  width: 0;
                  opacity: 0;
                }
                to {
                  width: 100%;
                  opacity: 1;
                }
              }

              .env-dropdown {
                animation: popFade 0.35s ease forwards;
                transform-origin: top center;
                filter: drop-shadow(0 10px 25px rgba(59,130,246,0.12));
              }
              .env-trigger {
                animation: glowPulse 2.4s ease-in-out infinite;
              }
              .attention-bounce {
                animation: attentionBounce 2.4s ease-in-out infinite, glowPulse 2.4s ease-in-out infinite;
              }

              @keyframes envCardSlideIn {
                from {
                  opacity: 0;
                  transform: translateY(20px) scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>

            <section
              ref={(el) => (sectionRefs.current[3] = el)}
              data-section="pipeline"
              className={`mb-24 transition-all duration-1000 delay-100 ${
                isVisible.pipeline ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <h3
                className="text-4xl font-normal tracking-tight text-white mb-8"
                style={{
                  animation: isVisible.pipeline ? "fadeInUp 0.6s ease-out 0.1s both" : "none"
                }}
              >
                The Automated Pipeline
              </h3>

              <div
                className="mb-16 group"
                style={{
                  animation: isVisible.pipeline ? "slideInLeft 0.8s ease-out 0.3s both" : "none"
                }}
              >
                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                        <span className="text-sm font-semibold text-white">Code Commit</span>
                      </div>
                      <p className="text-xs text-gray-200 font-normal">Developer pushes to main branch, triggering automated workflow</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                        <span className="text-sm font-semibold text-white">Build & Scan</span>
                      </div>
                      <p className="text-xs text-gray-200 font-normal">Docker image built and scanned for vulnerabilities with Trivy</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                        <span className="text-sm font-semibold text-white">Deploy</span>
                      </div>
                      <p className="text-xs text-gray-200 font-normal">Rolling update to Kubernetes cluster with zero downtime</p>
                    </div>
                  </div>

                  <div
                    className="overflow-hidden rounded-lg relative cursor-zoom-in group"
                    onClick={() => setActiveImageIndex(0)}
                    onMouseEnter={() => setActiveImageIndex(0)}
                  >
                    <img
                      src="/images/main-push.png"
                      alt="Production CI/CD Pipeline"
                      className="w-full max-w-6xl mx-auto rounded-lg shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <p
                  className="text-sm text-gray-400 text-center mt-4 font-normal italic transition-all duration-300"
                  style={{
                    animation: isVisible.pipeline ? "fadeInUp 0.6s ease-out 0.5s both" : "none"
                  }}
                >
                  Production Branch Pipeline - Main deployment workflow
                </p>
              </div>

              <p
                className="text-lg text-gray-200 leading-loose font-normal mb-6"
                style={{
                  animation: isVisible.pipeline ? "fadeInUp 0.6s ease-out 0.6s both" : "none"
                }}
              >
                Every commit triggers a sophisticated pipeline that builds, tests, scans, and deploys the application
                across multiple environments. The workflow demonstrates industry best practices in continuous integration
                and deployment, with automated security scanning, quality gates, and approval processes.
              </p>

              <div
                className="mb-16 group"
                style={{
                  animation: isVisible.pipeline ? "slideInRight 0.8s ease-out 0.7s both" : "none"
                }}
              >
                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                        <span className="text-sm font-semibold text-white">Rapid Testing</span>
                      </div>
                      <p className="text-xs text-gray-200 font-normal">Fast iteration cycle for development and QA environments</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                        <span className="text-sm font-semibold text-white">Quality Gates</span>
                      </div>
                      <p className="text-xs text-gray-200 font-normal">Automated checks before promoting to staging</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                        <span className="text-sm font-semibold text-white">Progressive Deploy</span>
                      </div>
                      <p className="text-xs text-gray-200 font-normal">Gradual rollout across environments before production</p>
                    </div>
                  </div>

                  <div
                    className="overflow-hidden rounded-lg relative cursor-zoom-in group"
                    onClick={() => setActiveImageIndex(1)}
                    onMouseEnter={() => setActiveImageIndex(1)}
                  >
                    <img
                      src="/images/dev-push.png"
                      alt="Development CI/CD Pipeline"
                      className="w-full max-w-6xl mx-auto rounded-lg shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <p
                  className="text-sm text-gray-400 text-center mt-4 font-normal italic transition-all duration-300"
                  style={{
                    animation: isVisible.pipeline ? "fadeInUp 0.6s ease-out 0.9s both" : "none"
                  }}
                >
                  Development Branch Pipeline - Rapid iteration workflow
                </p>
              </div>

              <p className="text-lg text-gray-200 leading-loose font-normal">
                The pipeline architecture separates concerns between development and production workflows, ensuring
                rapid iteration in lower environments while maintaining strict controls for production deployments.
                Trivy security scanning runs on every build, catching vulnerabilities before they reach production.
              </p>
            </section>

            <div className="mb-24">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <section
              ref={(el) => (sectionRefs.current[4] = el)}
              data-section="infrastructure"
              className={`mb-24 transition-all duration-1000 delay-200 ${
                isVisible.infrastructure ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3
                className="text-4xl font-normal tracking-tight text-white mb-8"
                style={{
                  animation: isVisible.infrastructure ? "fadeInUp 0.6s ease-out 0.1s both" : "none"
                }}
              >
                Cloud-Native Infrastructure
              </h3>

              <p
                className="text-lg text-gray-200 leading-loose font-normal mb-6"
                style={{
                  animation: isVisible.infrastructure ? "fadeInUp 0.6s ease-out 0.2s both" : "none"
                }}
              >
                The application runs on a Kubernetes cluster built with k3s, providing a lightweight yet powerful
                orchestration platform. The infrastructure demonstrates container orchestration at scale, with
                automated certificate management, ingress routing, and persistent storage.
              </p>

              <div
                className="bg-white/5 rounded-lg p-8 my-12 hover:shadow-lg transition-shadow duration-500"
                style={{
                  animation: isVisible.infrastructure ? "fadeInUp 0.8s ease-out 0.4s both" : "none"
                }}
              >
                <h4 className="text-2xl font-normal text-white mb-6">Cluster Architecture</h4>
                <div className="space-y-6">
                  <div
                    className="transform transition-all duration-300 hover:translate-x-2"
                    style={{
                      animation: isVisible.infrastructure ? "slideInLeft 0.6s ease-out 0.6s both" : "none"
                    }}
                  >
                    <p className="text-base font-normal text-white mb-2">NGINX Ingress Controller</p>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">
                      Handles external traffic routing with automatic SSL/TLS termination. Configured with
                      NodePort services for HTTP and HTTPS traffic with host-based routing.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:translate-x-2"
                    style={{
                      animation: isVisible.infrastructure ? "slideInLeft 0.6s ease-out 0.8s both" : "none"
                    }}
                  >
                    <p className="text-base font-normal text-white mb-2">Certificate Management</p>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">
                      cert-manager integrates with Let's Encrypt to provide automatic TLS certificate
                      provisioning and renewal, ensuring all traffic is encrypted without manual intervention.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:translate-x-2"
                    style={{
                      animation: isVisible.infrastructure ? "slideInLeft 0.6s ease-out 1.0s both" : "none"
                    }}
                  >
                    <p className="text-base font-normal text-white mb-2">Multi-Environment Namespaces</p>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">
                      Isolated namespaces for development, QA, staging, and production environments, each
                      running dedicated application pods with environment-specific configurations.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-200 leading-loose font-normal">
                Infrastructure as code principles govern the entire deployment, with all Kubernetes manifests
                version-controlled and automatically applied through the CI/CD pipeline. This ensures reproducible
                deployments and eliminates configuration drift across environments.
              </p>
            </section>

            <div className="mb-24">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <section
              ref={(el) => (sectionRefs.current[5] = el)}
              data-section="observability"
              className={`mb-24 transition-all duration-1000 delay-300 ${
                isVisible.observability ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h3
                className="text-4xl font-normal tracking-tight text-white mb-8"
                style={{
                  animation: isVisible.observability ? "fadeInUp 0.6s ease-out 0.1s both" : "none"
                }}
              >
                Complete Observability
              </h3>

              <p
                className="text-lg text-gray-200 leading-loose font-normal mb-6"
                style={{
                  animation: isVisible.observability ? "fadeInUp 0.6s ease-out 0.2s both" : "none"
                }}
              >
                A comprehensive monitoring stack powered by Prometheus and Grafana provides real-time visibility
                into application and infrastructure health. The monitoring solution collects metrics from multiple
                sources, creating a unified view of system performance.
              </p>

              <div
                className="bg-white/5 rounded-lg p-8 my-12 hover:shadow-lg transition-shadow duration-500"
                style={{
                  animation: isVisible.observability ? "fadeInUp 0.8s ease-out 0.4s both" : "none"
                }}
              >
                <h4 className="text-2xl font-normal text-white mb-6">Monitoring Stack</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: isVisible.observability ? "fadeInUp 0.6s ease-out 0.6s both" : "none"
                    }}
                  >
                    <p className="text-base font-normal text-white mb-2">Prometheus Metrics</p>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">
                      Time-series metrics collection with service discovery and auto-configuration.
                      Stores performance data and provides alerting capabilities.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: isVisible.observability ? "fadeInUp 0.6s ease-out 0.7s both" : "none"
                    }}
                  >
                    <p className="text-base font-normal text-white mb-2">Grafana Dashboards</p>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">
                      Custom visualizations with public dashboard access, providing stakeholders
                      with real-time insights into system health.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: isVisible.observability ? "fadeInUp 0.6s ease-out 0.8s both" : "none"
                    }}
                  >
                    <p className="text-base font-normal text-white mb-2">Node Exporter</p>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">
                      System-level metrics including CPU, memory, disk I/O, and network statistics
                      for comprehensive host monitoring.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: isVisible.observability ? "fadeInUp 0.6s ease-out 0.9s both" : "none"
                    }}
                  >
                    <p className="text-base font-normal text-white mb-2">cAdvisor</p>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">
                      Container-specific metrics providing visibility into resource utilization
                      and performance at the container level.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="mb-12 group"
                style={{
                  animation: isVisible.observability ? "fadeInUp 0.8s ease-out 1.0s both" : "none"
                }}
              >
                <div
                  className="overflow-hidden rounded-lg relative cursor-zoom-in group"
                  onClick={() => setActiveImageIndex(2)}
                  onMouseEnter={() => setActiveImageIndex(2)}
                >
                  <img
                    src="/images/grafana.png"
                    alt="Grafana Monitoring Dashboard"
                    className="w-full max-w-6xl mx-auto rounded-lg shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <p
                  className="text-sm text-gray-400 text-center mt-4 font-normal italic"
                  style={{
                    animation: isVisible.observability ? "fadeInUp 0.6s ease-out 1.2s both" : "none"
                  }}
                >
                  Live Grafana Dashboard - Real-time cluster monitoring
                </p>
              </div>

              <p className="text-lg text-gray-200 leading-loose font-normal">
                The observability stack runs within its own dedicated namespace, isolated from application
                workloads while maintaining access to cluster-wide metrics. Public dashboards allow demonstration
                of real-time monitoring capabilities without requiring authentication.
              </p>
            </section>

            <div className="mb-24">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <section
              ref={(el) => (sectionRefs.current[6] = el)}
              data-section="achievements"
              className={`mb-24 transition-all duration-1000 delay-400 ${
                isVisible.achievements ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <h3
                className="text-4xl font-normal tracking-tight text-white mb-8"
                style={{
                  animation: isVisible.achievements ? "fadeInUp 0.6s ease-out 0.1s both" : "none"
                }}
              >
                Technical Achievements
              </h3>

              <div className="space-y-8">
                <div
                  className="border-l-2 border-gray-300 pl-6 hover:border-gray-900 transition-all duration-300 hover:pl-8"
                  style={{
                    animation: isVisible.achievements ? "slideInLeft 0.6s ease-out 0.3s both" : "none"
                  }}
                >
                  <h4 className="text-2xl font-normal text-white mb-3">Production-Ready Architecture</h4>
                  <p className="text-lg text-gray-200 leading-loose font-normal">
                    A fully automated deployment pipeline spanning four environments, from development through
                    production. Each environment operates independently with environment-specific configurations,
                    demonstrating proper separation of concerns and progressive delivery practices.
                  </p>
                </div>

                <div
                  className="border-l-2 border-gray-300 pl-6 hover:border-gray-900 transition-all duration-300 hover:pl-8"
                  style={{
                    animation: isVisible.achievements ? "slideInLeft 0.6s ease-out 0.5s both" : "none"
                  }}
                >
                  <h4 className="text-2xl font-normal text-white mb-3">Security-First Approach</h4>
                  <p className="text-lg text-gray-200 leading-loose font-normal">
                    Integrated security scanning with Trivy catches vulnerabilities at build time. Automated
                    TLS certificate management ensures all traffic is encrypted. Kubernetes RBAC and network
                    policies provide defense in depth.
                  </p>
                </div>

                <div
                  className="border-l-2 border-gray-300 pl-6 hover:border-gray-900 transition-all duration-300 hover:pl-8"
                  style={{
                    animation: isVisible.achievements ? "slideInLeft 0.6s ease-out 0.7s both" : "none"
                  }}
                >
                  <h4 className="text-2xl font-normal text-white mb-3">Modern Development Workflow</h4>
                  <p className="text-lg text-gray-200 leading-loose font-normal">
                    GitOps principles govern all changes, with infrastructure and application code living in
                    version control. Automated testing, linting, and quality gates ensure code quality.
                    Zero-downtime rolling updates maintain service availability during deployments.
                  </p>
                </div>
              </div>
            </section>

            <div
              ref={(el) => (sectionRefs.current[7] = el)}
              data-section="closing"
              className={`text-center py-16 transition-all duration-1000 ${
                isVisible.closing ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="h-px mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-8 transition-all duration-1000"
                style={{
                  width: isVisible.closing ? "8rem" : "0rem"
                }}
              ></div>
              <p
                className="text-sm text-gray-400 font-normal tracking-wide"
                style={{
                  animation: isVisible.closing ? "fadeInUp 0.8s ease-out 0.5s both" : "none"
                }}
              >
                A demonstration of modern DevOps engineering practices
              </p>
            </div>
          </article>
        </div>
      </PageWrapper>
      <a
        href="https://devops-toolkit.dremer10.com"
        target="_blank"
        rel="noreferrer"
        className="fixed right-20 bottom-3 sm:right-28 sm:bottom-6 z-40 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-2 sm:px-5 sm:py-3 rounded-full shadow-lg sm:shadow-xl shadow-indigo-500/25 transition-all attention-bounce text-xs sm:text-base"
      >
        Check it out Live
        <ExternalLink className="w-4 h-4" />
      </a>

      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4" onClick={() => setActiveImageIndex(null)}>
          <div
            className="relative max-w-6xl w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 bg-black/80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => setActiveImageIndex(null)}
          >
            <img
              src={galleryImages[activeImageIndex].src}
              alt={galleryImages[activeImageIndex].alt}
              className="w-full h-full object-contain"
            />
            <button
              aria-label="Close"
              className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition"
              onClick={() => setActiveImageIndex(null)}
            >
              Close
            </button>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
              <div className="flex items-center justify-between text-sm text-blue-100">
                <p>{galleryImages[activeImageIndex].caption}</p>
                <span className="text-white/70">{activeImageIndex + 1} / {galleryImages.length}</span>
              </div>
            </div>
            <button
              aria-label="Previous"
              className="absolute left-3 bottom-16 p-3 rounded-full bg-white/85 text-white shadow-lg shadow-black/20 hover:bg-white/5 transition"
              onClick={handlePrev}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next"
              className="absolute right-3 bottom-16 p-3 rounded-full bg-white/85 text-white shadow-lg shadow-black/20 hover:bg-white/5 transition"
              onClick={handleNext}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevOpsToolkit;

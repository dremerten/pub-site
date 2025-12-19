import { ExternalLink, ChevronDown } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { useState, useEffect, useRef } from "react";

const Projects = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const dropdownRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'instant' });
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

  return (
    <div className="bg-white min-h-screen">
      <PageWrapper>
        <div className="max-w-4xl mx-auto px-8 py-24">
          {/* Scroll Header */}
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            data-section="header"
            className={`text-center mb-24 transition-all duration-1000 ${
              isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block mb-8">
              <div className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">Portfolio</div>
              <h1 className="text-7xl font-normal tracking-tight text-gray-900 mb-8">Featured Projects</h1>
              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
          </div>

          {/* Environment Selector */}
          <div
            ref={(el) => (sectionRefs.current[1] = el)}
            data-section="environments"
            className={`mb-20 flex flex-col items-center gap-6 transition-all duration-1000 delay-200 ${
              isVisible.environments ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <p className="text-gray-700 text-sm font-normal tracking-wide">NAVIGATE TO LIVE ENVIRONMENTS</p>
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 min-w-[280px] justify-between"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Select Environment
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-100">
                  {environments.map((env) => (
                    <a
                      key={env.value}
                      href={env.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left px-6 py-4 transition-all duration-200 flex items-center justify-between gap-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className="flex items-center gap-3 font-normal">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        {env.name}
                      </span>
                      <ExternalLink className="w-4 h-4 opacity-30" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://grafana.devops-toolkit.dremer10.com/public-dashboards/f0c7dc746ec24ce3be08a7e74fdbd4f0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-900 font-normal text-sm hover:text-gray-700 transition-colors underline decoration-dotted underline-offset-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Live Kubernetes Cluster Monitoring Dashboard
            </a>
          </div>

          {/* Decorative Divider */}
          <div className="mb-20">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Scroll Content */}
          <article className="prose prose-lg max-w-none">
            <section
              ref={(el) => (sectionRefs.current[2] = el)}
              data-section="intro"
              className={`mb-24 transition-all duration-1000 delay-300 ${
                isVisible.intro ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2
                className="text-5xl font-normal tracking-tight text-gray-900 mb-8"
                style={{
                  animation: isVisible.intro ? 'fadeInUp 0.6s ease-out 0.1s both' : 'none'
                }}
              >
                DevOps Toolkit
              </h2>
              <p
                className="text-xl text-gray-800 leading-relaxed font-normal mb-6"
                style={{
                  animation: isVisible.intro ? 'fadeInUp 0.6s ease-out 0.2s both' : 'none'
                }}
              >
                A comprehensive full-stack DevOps platform demonstrating modern cloud-native development practices.
                This project embodies the principles of infrastructure as code, continuous integration and deployment,
                and complete observability.
              </p>
              <p
                className="text-lg text-gray-700 leading-loose font-normal mb-8"
                style={{
                  animation: isVisible.intro ? 'fadeInUp 0.6s ease-out 0.3s both' : 'none'
                }}
              >
                Built from the ground up to showcase production-ready DevOps engineering, this toolkit represents
                a complete journey from source code to deployed infrastructure, with security, monitoring, and
                automation at every step.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                {['Kubernetes', 'Docker', 'CI/CD', 'Prometheus', 'Grafana', 'GitHub Actions', 'Vue.js', 'TypeScript'].map((tech, index) => (
                  <span
                    key={index}
                    className="text-sm text-gray-700 font-normal border-b border-gray-400 pb-0.5 transition-all duration-300 hover:border-gray-900 hover:text-gray-900 cursor-default inline-block hover:-translate-y-0.5"
                    style={{
                      animation: isVisible.intro ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
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
            `}</style>

            {/* CI/CD Pipeline Section */}
            <section
              ref={(el) => (sectionRefs.current[3] = el)}
              data-section="pipeline"
              className={`mb-24 transition-all duration-1000 delay-100 ${
                isVisible.pipeline ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <h3
                className="text-4xl font-normal tracking-tight text-gray-900 mb-8"
                style={{
                  animation: isVisible.pipeline ? 'fadeInUp 0.6s ease-out 0.1s both' : 'none'
                }}
              >
                The Automated Pipeline
              </h3>

              <div
                className="mb-16 group"
                style={{
                  animation: isVisible.pipeline ? 'slideInLeft 0.8s ease-out 0.3s both' : 'none'
                }}
              >
                <div className="relative">
                  {/* Pipeline explanation callouts */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                        <span className="text-sm font-semibold text-gray-900">Code Commit</span>
                      </div>
                      <p className="text-xs text-gray-700 font-normal">Developer pushes to main branch, triggering automated workflow</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                        <span className="text-sm font-semibold text-gray-900">Build & Scan</span>
                      </div>
                      <p className="text-xs text-gray-700 font-normal">Docker image built and scanned for vulnerabilities with Trivy</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                        <span className="text-sm font-semibold text-gray-900">Deploy</span>
                      </div>
                      <p className="text-xs text-gray-700 font-normal">Rolling update to Kubernetes cluster with zero downtime</p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg relative">
                    <img
                      src="/images/main-push.png"
                      alt="Production CI/CD Pipeline"
                      className="w-full max-w-6xl mx-auto rounded-lg shadow-2xl"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
                <p
                  className="text-sm text-gray-600 text-center mt-4 font-normal italic transition-all duration-300"
                  style={{
                    animation: isVisible.pipeline ? 'fadeInUp 0.6s ease-out 0.5s both' : 'none'
                  }}
                >
                  Production Branch Pipeline - Main deployment workflow
                </p>
              </div>

              <p
                className="text-lg text-gray-800 leading-loose font-normal mb-6"
                style={{
                  animation: isVisible.pipeline ? 'fadeInUp 0.6s ease-out 0.6s both' : 'none'
                }}
              >
                Every commit triggers a sophisticated pipeline that builds, tests, scans, and deploys the application
                across multiple environments. The workflow demonstrates industry best practices in continuous integration
                and deployment, with automated security scanning, quality gates, and approval processes.
              </p>

              <div
                className="mb-16 group"
                style={{
                  animation: isVisible.pipeline ? 'slideInRight 0.8s ease-out 0.7s both' : 'none'
                }}
              >
                <div className="relative">
                  {/* Development pipeline explanation callouts */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                        <span className="text-sm font-semibold text-gray-900">Rapid Testing</span>
                      </div>
                      <p className="text-xs text-gray-700 font-normal">Fast iteration cycle for development and QA environments</p>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-50 to-white border border-cyan-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                        <span className="text-sm font-semibold text-gray-900">Quality Gates</span>
                      </div>
                      <p className="text-xs text-gray-700 font-normal">Automated checks before promoting to staging</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                        <span className="text-sm font-semibold text-gray-900">Progressive Deploy</span>
                      </div>
                      <p className="text-xs text-gray-700 font-normal">Gradual rollout across environments before production</p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg relative">
                    <img
                      src="/images/dev-push.png"
                      alt="Development CI/CD Pipeline"
                      className="w-full max-w-6xl mx-auto rounded-lg shadow-2xl"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
                <p
                  className="text-sm text-gray-600 text-center mt-4 font-normal italic transition-all duration-300"
                  style={{
                    animation: isVisible.pipeline ? 'fadeInUp 0.6s ease-out 0.9s both' : 'none'
                  }}
                >
                  Development Branch Pipeline - Rapid iteration workflow
                </p>
              </div>

              <p className="text-lg text-gray-800 leading-loose font-normal">
                The pipeline architecture separates concerns between development and production workflows, ensuring
                rapid iteration in lower environments while maintaining strict controls for production deployments.
                Trivy security scanning runs on every build, catching vulnerabilities before they reach production.
              </p>
            </section>

            {/* Decorative Divider */}
            <div className="mb-24">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Infrastructure Section */}
            <section
              ref={(el) => (sectionRefs.current[4] = el)}
              data-section="infrastructure"
              className={`mb-24 transition-all duration-1000 delay-200 ${
                isVisible.infrastructure ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h3
                className="text-4xl font-normal tracking-tight text-gray-900 mb-8"
                style={{
                  animation: isVisible.infrastructure ? 'fadeInUp 0.6s ease-out 0.1s both' : 'none'
                }}
              >
                Cloud-Native Infrastructure
              </h3>

              <p
                className="text-lg text-gray-800 leading-loose font-normal mb-6"
                style={{
                  animation: isVisible.infrastructure ? 'fadeInUp 0.6s ease-out 0.2s both' : 'none'
                }}
              >
                The application runs on a Kubernetes cluster built with k3s, providing a lightweight yet powerful
                orchestration platform. The infrastructure demonstrates container orchestration at scale, with
                automated certificate management, ingress routing, and persistent storage.
              </p>

              <div
                className="bg-gray-50 rounded-lg p-8 my-12 hover:shadow-lg transition-shadow duration-500"
                style={{
                  animation: isVisible.infrastructure ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none'
                }}
              >
                <h4 className="text-2xl font-normal text-gray-900 mb-6">Cluster Architecture</h4>
                <div className="space-y-6">
                  <div
                    className="transform transition-all duration-300 hover:translate-x-2"
                    style={{
                      animation: isVisible.infrastructure ? 'slideInLeft 0.6s ease-out 0.6s both' : 'none'
                    }}
                  >
                    <p className="text-base font-normal text-gray-900 mb-2">NGINX Ingress Controller</p>
                    <p className="text-sm text-gray-700 font-normal leading-relaxed">
                      Handles external traffic routing with automatic SSL/TLS termination. Configured with
                      NodePort services for HTTP and HTTPS traffic with host-based routing.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:translate-x-2"
                    style={{
                      animation: isVisible.infrastructure ? 'slideInLeft 0.6s ease-out 0.8s both' : 'none'
                    }}
                  >
                    <p className="text-base font-normal text-gray-900 mb-2">Certificate Management</p>
                    <p className="text-sm text-gray-700 font-normal leading-relaxed">
                      cert-manager integrates with Let's Encrypt to provide automatic TLS certificate
                      provisioning and renewal, ensuring all traffic is encrypted without manual intervention.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:translate-x-2"
                    style={{
                      animation: isVisible.infrastructure ? 'slideInLeft 0.6s ease-out 1.0s both' : 'none'
                    }}
                  >
                    <p className="text-base font-normal text-gray-900 mb-2">Multi-Environment Namespaces</p>
                    <p className="text-sm text-gray-700 font-normal leading-relaxed">
                      Isolated namespaces for development, QA, staging, and production environments, each
                      running dedicated application pods with environment-specific configurations.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-800 leading-loose font-normal">
                Infrastructure as code principles govern the entire deployment, with all Kubernetes manifests
                version-controlled and automatically applied through the CI/CD pipeline. This ensures reproducible
                deployments and eliminates configuration drift across environments.
              </p>
            </section>

            {/* Decorative Divider */}
            <div className="mb-24">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Observability Section */}
            <section
              ref={(el) => (sectionRefs.current[5] = el)}
              data-section="observability"
              className={`mb-24 transition-all duration-1000 delay-300 ${
                isVisible.observability ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3
                className="text-4xl font-normal tracking-tight text-gray-900 mb-8"
                style={{
                  animation: isVisible.observability ? 'fadeInUp 0.6s ease-out 0.1s both' : 'none'
                }}
              >
                Complete Observability
              </h3>

              <p
                className="text-lg text-gray-800 leading-loose font-normal mb-6"
                style={{
                  animation: isVisible.observability ? 'fadeInUp 0.6s ease-out 0.2s both' : 'none'
                }}
              >
                A comprehensive monitoring stack powered by Prometheus and Grafana provides real-time visibility
                into application and infrastructure health. The monitoring solution collects metrics from multiple
                sources, creating a unified view of system performance.
              </p>

              <div
                className="bg-gray-50 rounded-lg p-8 my-12 hover:shadow-lg transition-shadow duration-500"
                style={{
                  animation: isVisible.observability ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none'
                }}
              >
                <h4 className="text-2xl font-normal text-gray-900 mb-6">Monitoring Stack</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: isVisible.observability ? 'fadeInUp 0.6s ease-out 0.6s both' : 'none'
                    }}
                  >
                    <p className="text-base font-normal text-gray-900 mb-2">Prometheus Metrics</p>
                    <p className="text-sm text-gray-700 font-normal leading-relaxed">
                      Time-series metrics collection with service discovery and auto-configuration.
                      Stores performance data and provides alerting capabilities.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: isVisible.observability ? 'fadeInUp 0.6s ease-out 0.7s both' : 'none'
                    }}
                  >
                    <p className="text-base font-normal text-gray-900 mb-2">Grafana Dashboards</p>
                    <p className="text-sm text-gray-700 font-normal leading-relaxed">
                      Custom visualizations with public dashboard access, providing stakeholders
                      with real-time insights into system health.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: isVisible.observability ? 'fadeInUp 0.6s ease-out 0.8s both' : 'none'
                    }}
                  >
                    <p className="text-base font-normal text-gray-900 mb-2">Node Exporter</p>
                    <p className="text-sm text-gray-700 font-normal leading-relaxed">
                      System-level metrics including CPU, memory, disk I/O, and network statistics
                      for comprehensive host monitoring.
                    </p>
                  </div>

                  <div
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: isVisible.observability ? 'fadeInUp 0.6s ease-out 0.9s both' : 'none'
                    }}
                  >
                    <p className="text-base font-normal text-gray-900 mb-2">cAdvisor</p>
                    <p className="text-sm text-gray-700 font-normal leading-relaxed">
                      Container-specific metrics providing visibility into resource utilization
                      and performance at the container level.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="mb-12 group"
                style={{
                  animation: isVisible.observability ? 'fadeInUp 0.8s ease-out 1.0s both' : 'none'
                }}
              >
                <div className="overflow-hidden rounded-lg relative">
                  <img
                    src="/images/grafana.png"
                    alt="Grafana Monitoring Dashboard"
                    className="w-full max-w-6xl mx-auto rounded-lg shadow-2xl"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
                <p
                  className="text-sm text-gray-600 text-center mt-4 font-normal italic"
                  style={{
                    animation: isVisible.observability ? 'fadeInUp 0.6s ease-out 1.2s both' : 'none'
                  }}
                >
                  Live Grafana Dashboard - Real-time cluster monitoring
                </p>
              </div>

              <p className="text-lg text-gray-800 leading-loose font-normal">
                The observability stack runs within its own dedicated namespace, isolated from application
                workloads while maintaining access to cluster-wide metrics. Public dashboards allow demonstration
                of real-time monitoring capabilities without requiring authentication.
              </p>
            </section>

            {/* Decorative Divider */}
            <div className="mb-24">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Technical Achievements */}
            <section
              ref={(el) => (sectionRefs.current[6] = el)}
              data-section="achievements"
              className={`mb-24 transition-all duration-1000 delay-400 ${
                isVisible.achievements ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <h3
                className="text-4xl font-normal tracking-tight text-gray-900 mb-8"
                style={{
                  animation: isVisible.achievements ? 'fadeInUp 0.6s ease-out 0.1s both' : 'none'
                }}
              >
                Technical Achievements
              </h3>

              <div className="space-y-8">
                <div
                  className="border-l-2 border-gray-300 pl-6 hover:border-gray-900 transition-all duration-300 hover:pl-8"
                  style={{
                    animation: isVisible.achievements ? 'slideInLeft 0.6s ease-out 0.3s both' : 'none'
                  }}
                >
                  <h4 className="text-2xl font-normal text-gray-900 mb-3">Production-Ready Architecture</h4>
                  <p className="text-lg text-gray-800 leading-loose font-normal">
                    A fully automated deployment pipeline spanning four environments, from development through
                    production. Each environment operates independently with environment-specific configurations,
                    demonstrating proper separation of concerns and progressive delivery practices.
                  </p>
                </div>

                <div
                  className="border-l-2 border-gray-300 pl-6 hover:border-gray-900 transition-all duration-300 hover:pl-8"
                  style={{
                    animation: isVisible.achievements ? 'slideInLeft 0.6s ease-out 0.5s both' : 'none'
                  }}
                >
                  <h4 className="text-2xl font-normal text-gray-900 mb-3">Security-First Approach</h4>
                  <p className="text-lg text-gray-800 leading-loose font-normal">
                    Integrated security scanning with Trivy catches vulnerabilities at build time. Automated
                    TLS certificate management ensures all traffic is encrypted. Kubernetes RBAC and network
                    policies provide defense in depth.
                  </p>
                </div>

                <div
                  className="border-l-2 border-gray-300 pl-6 hover:border-gray-900 transition-all duration-300 hover:pl-8"
                  style={{
                    animation: isVisible.achievements ? 'slideInLeft 0.6s ease-out 0.7s both' : 'none'
                  }}
                >
                  <h4 className="text-2xl font-normal text-gray-900 mb-3">Modern Development Workflow</h4>
                  <p className="text-lg text-gray-800 leading-loose font-normal">
                    GitOps principles govern all changes, with infrastructure and application code living in
                    version control. Automated testing, linting, and quality gates ensure code quality.
                    Zero-downtime rolling updates maintain service availability during deployments.
                  </p>
                </div>
              </div>
            </section>

            {/* Closing */}
            <div
              ref={(el) => (sectionRefs.current[7] = el)}
              data-section="closing"
              className={`text-center py-16 transition-all duration-1000 ${
                isVisible.closing ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="h-px mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-8 transition-all duration-1000"
                style={{
                  width: isVisible.closing ? '8rem' : '0rem'
                }}
              ></div>
              <p
                className="text-sm text-gray-600 font-normal tracking-wide"
                style={{
                  animation: isVisible.closing ? 'fadeInUp 0.8s ease-out 0.5s both' : 'none'
                }}
              >
                A demonstration of modern DevOps engineering practices
              </p>
            </div>
          </article>
        </div>
      </PageWrapper>
    </div>
  );
};

export default Projects;

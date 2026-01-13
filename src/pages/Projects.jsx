import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { StickyButtons } from "@/components/StickyButtons";

export const projects = [
  {
    title: "DevOps Quiz Lab",
    subtitle: "Browser terminal drills for core ops topics",
    description:
      "Interactive terminal that runs DevOps Interview Quiz with a custom frontend and ephemeral deployment backing each session.",
    tags: ["Kubernetes", "Security", "CLI"],
    image: "/images/devops_quiz.svg",
    accent: "from-emerald-400/30 via-blue-500/10 to-sky-400/20",
    detailPath: "/quiz",
    ctas: [
      { label: "View detail", to: "/quiz", type: "internal" },
      { label: "Check it Out (Terminal)", to: "/quiz", type: "internal" },
    ],
  },
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

const modalSteps = [
  {
    title: "What changed",
    body: "Traffic that previously routed through Ingress-NGINX now uses Gateway API with NGINX Gateway Fabric for consistent, spec-driven HTTPRoutes.",
  },
  {
    title: "Why it matters",
    bullets: [
      "Unified routing: shared Gateway + HTTPRoutes reduce annotation drift and misconfigurations.",
      "Better policy surface: native support for retries, weights, and cross-namespace routing primitives.",
      "Operational clarity: declarative CRDs replace ad-hoc ingress annotations.",
    ],
  },
  {
    title: "Security benefits",
    bullets: [
      "Isolated secrets: TLS material stays in namespace boundaries with ReferenceGrants instead of broad sharing.",
      "Principle of least privilege: HTTPRoute attachment is explicit, preventing accidental exposure.",
      "Defensible posture: consistent mTLS and policy controls lower the attack surface at the edge.",
    ],
  },
  {
    title: "Cutover path",
    bullets: [
      "Restructure to a single shared Gateway + HTTPRoutes across namespaces and handle TLS secrets/ReferenceGrants, then cut traffic over.",
      "Stage traffic shifts with per-route weights and health checks to avoid surprises.",
      "Watch telemetry during cutover: 4xx/5xx deltas, TLS errors, and latency SLOs.",
    ],
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [modalView, setModalView] = useState("info");
  const [showBanner, setShowBanner] = useState(true);
  const sectionRefs = useRef([]);
  const navigate = useNavigate();
  const totalModalSteps = modalSteps.length;

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

  const goNextStep = () => {
    setModalStep((prev) => {
      if (prev >= totalModalSteps - 1) {
        setShowModal(false);
        return prev;
      }
      return prev + 1;
    });
  };

  const goPrevStep = () => setModalStep((prev) => Math.max(0, prev - 1));
  const restartWalkthrough = () => setModalStep(0);
  const closeModal = () => {
    setShowModal(false);
    setModalStep(0);
    setModalView("info");
  };

  return (
    <div className="bg-gradient-to-b from-[#050914] via-[#070b16] to-black text-white min-h-screen">
      <StickyButtons />
      {showBanner && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-emerald-400/40 bg-slate-900/95 p-5 text-white shadow-2xl shadow-emerald-900/30">
            <div className="mb-3 text-center text-lg font-semibold">Gateway API + NGINX Gateway Fabric now live</div>
            <p className="text-sm text-gray-200 text-center mb-1">
              Traffic now routes through Gateway API with the nginx-gateway class on NGINX Gateway Fabric for safer, consistent edge handling.
            </p>
            <p className="text-xs text-emerald-100 text-center mb-4">Legacy Ingress-NGINX path is deprecated and being removed.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setShowModal(true);
                  setModalView("info");
                  setShowBanner(false);
                }}
                className="cursor-pointer rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                Learn more
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="cursor-pointer rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2 md:px-8">
          <div className="relative w-[95vw] max-w-3xl md:max-w-[55vw] h-[88vh] md:h-[85vh] max-h-[95vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-cyan-900/50">
            <div className="absolute right-3 top-3 flex gap-2">
              <button
                onClick={closeModal}
                className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/15"
                aria-label="Close modal"
              >
                Close
              </button>
            </div>

            {modalView === "info" ? (
              <div className="relative flex h-full flex-col gap-4 overflow-y-auto p-4 md:p-6">
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-emerald-400/30 blur-3xl"></div>
                  <div className="absolute right-6 bottom-12 h-36 w-36 rounded-full bg-cyan-400/25 blur-3xl"></div>
                  <div className="absolute left-1/2 top-1/3 h-16 w-16 -translate-x-1/2 rounded-full bg-blue-500/20 blur-2xl"></div>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 shadow-inner shadow-black/30 backdrop-blur">
                  <div className="inline-flex items-center gap-2 self-center rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                    Traffic Management Upgrade
                  </div>
                  <h2 className="text-center text-xl md:text-2xl font-semibold text-white">Traffic is now on Gateway API + NGINX Gateway Fabric</h2>
                  <p className="text-center text-xs md:text-sm text-gray-200">
                    This site now uses Kubernetes Gateway API with the nginx-gateway class on NGINX Gateway Fabric for ingress traffic; legacy ingress-nginx is deprecated and slated for removal.
                  </p>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/5 to-transparent p-4 shadow-lg shadow-emerald-900/20">
                      <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">What this means</p>
                      <p className="mt-2 text-sm text-gray-200">
                        Gateway API defines how traffic should flow into the cluster using modern, standardized Kubernetes resources.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/5 to-transparent p-4 shadow-lg shadow-cyan-900/20">
                      <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">NGINX Gateway Fabric</p>
                      <p className="mt-2 text-sm text-gray-200">
                        It enforces those rules by running and managing NGINX instances that actually handle the traffic.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/5 to-transparent p-4 shadow-lg shadow-blue-900/20">
                      <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">How it works together</p>
                      <p className="mt-2 text-sm text-gray-200">
                        Gateway API describes the intent → NGINX Gateway Fabric translates it into NGINX configuration → traffic is routed securely and consistently.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4 shadow-inner shadow-black/40">
                      <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">What changed from before</p>
                      <p className="mt-2 text-sm text-gray-200">
                        Retiring ingress-nginx (legacy Ingress model) in favor of Gateway API resources bound to the nginx-gateway class.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4 shadow-inner shadow-black/40">
                      <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">Architecture</p>
                      <p className="mt-2 text-sm text-gray-200">
                        New design separates routing, infrastructure, and policy for better scalability and flexibility.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4 shadow-inner shadow-black/40">
                      <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">Result</p>
                      <p className="mt-2 text-sm text-gray-200">
                        More reliable, scalable, and future-ready traffic management with no change to how you access the site.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30">
                    <div className="mb-3 flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white">Ingress-NGINX vs Gateway API</h3>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-200">Traffic management comparison</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-gray-200">
                        <thead className="text-[11px] uppercase tracking-[0.16em] text-gray-300 border-b border-white/10">
                          <tr>
                            <th className="py-2 pr-3">Category</th>
                            <th className="py-2 pr-3">Ingress-NGINX</th>
                            <th className="py-2 pr-3">Gateway API</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <tr><td className="py-2 pr-3">Purpose</td><td className="py-2 pr-3">Traditional Kubernetes ingress controller using Ingress resources</td><td className="py-2 pr-3">Next-generation Kubernetes networking API designed to replace Ingress</td></tr>
                          <tr><td className="py-2 pr-3">Maturity</td><td className="py-2 pr-3">Very mature, widely deployed, production proven</td><td className="py-2 pr-3">Newer, rapidly evolving, Kubernetes-native standard</td></tr>
                          <tr><td className="py-2 pr-3">API Style</td><td className="py-2 pr-3">Single Ingress object does most routing</td><td className="py-2 pr-3">Multiple composable objects: GatewayClass, Gateway, HTTPRoute, TLSRoute, etc.</td></tr>
                          <tr><td className="py-2 pr-3">Architecture</td><td className="py-2 pr-3">Controller-centric (NGINX manages everything)</td><td className="py-2 pr-3">Role-oriented and declarative (infra, platform, app teams separated)</td></tr>
                          <tr><td className="py-2 pr-3">Extensibility</td><td className="py-2 pr-3">Relies heavily on annotations (controller specific)</td><td className="py-2 pr-3">Native extensibility via standardized CRDs</td></tr>
                          <tr><td className="py-2 pr-3">Vendor Lock-in</td><td className="py-2 pr-3">Higher (annotations are NGINX-specific)</td><td className="py-2 pr-3">Lower (API is standardized, portable between implementations)</td></tr>
                          <tr><td className="py-2 pr-3">TLS Termination</td><td className="py-2 pr-3">Handled at the Ingress Controller</td><td className="py-2 pr-3">Defined at the Gateway level with explicit TLS configuration</td></tr>
                          <tr><td className="py-2 pr-3">Traffic Control</td><td className="py-2 pr-3">Basic routing, path and host rules</td><td className="py-2 pr-3">Advanced routing: header matching, traffic splitting, canary, blue/green</td></tr>
                          <tr><td className="py-2 pr-3">Multi-Team Use</td><td className="py-2 pr-3">Harder to safely share between teams</td><td className="py-2 pr-3">Designed for multi-tenant clusters</td></tr>
                          <tr><td className="py-2 pr-3">Configuration Clarity</td><td className="py-2 pr-3">Can become messy with many annotations</td><td className="py-2 pr-3">Strong object separation, clearer ownership boundaries</td></tr>
                          <tr><td className="py-2 pr-3">Policy Enforcement</td><td className="py-2 pr-3">Limited, mostly controller specific</td><td className="py-2 pr-3">First-class support for policy attachment</td></tr>
                          <tr><td className="py-2 pr-3">Observability</td><td className="py-2 pr-3">Depends on controller integrations</td><td className="py-2 pr-3">Designed for deep observability integration</td></tr>
                          <tr><td className="py-2 pr-3">Load Balancer</td><td className="py-2 pr-3">Usually one LB per ingress controller</td><td className="py-2 pr-3">One or more Gateways can map to LBs explicitly</td></tr>
                          <tr><td className="py-2 pr-3">Security Model</td><td className="py-2 pr-3">Flat permission model</td><td className="py-2 pr-3">Fine-grained RBAC across routes and gateways</td></tr>
                          <tr><td className="py-2 pr-3">Ecosystem Support</td><td className="py-2 pr-3">Huge ecosystem and tutorials</td><td className="py-2 pr-3">Growing ecosystem, future Kubernetes standard</td></tr>
                          <tr><td className="py-2 pr-3">Cloud Provider Support</td><td className="py-2 pr-3">Works everywhere</td><td className="py-2 pr-3">Natively supported by AWS, GCP, Azure implementations</td></tr>
                          <tr><td className="py-2 pr-3">Learning Curve</td><td className="py-2 pr-3">Easier to start</td><td className="py-2 pr-3">Steeper but far more powerful</td></tr>
                          <tr><td className="py-2 pr-3">Ideal Use Case</td><td className="py-2 pr-3">Simple apps, legacy clusters, quick setups</td><td className="py-2 pr-3">Large platforms, shared clusters, modern traffic management</td></tr>
                          <tr><td className="py-2 pr-3">Future Direction</td><td className="py-2 pr-3">Maintenance mode long-term</td><td className="py-2 pr-3">Strategic direction of Kubernetes networking</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                <div className="sticky bottom-0 left-0 right-0 mt-1 flex flex-col items-stretch justify-center gap-2 bg-slate-900/95 pt-2 pb-1 sm:static sm:flex-row sm:items-center sm:gap-3 sm:bg-transparent">
                  <button
                    onClick={() => setModalView("flow")}
                    className="cursor-pointer rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-emerald-500/40 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
                  >
                    View traffic flows
                  </button>
                  <button
                    onClick={closeModal}
                    className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
            <div className="flex h-full flex-col gap-3 p-4 md:p-5">
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <button
                  onClick={() => {
                    setModalView("info");
                  }}
                  className="cursor-pointer rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Back to summary
                </button>
              </div>

              <div className="flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/70 min-h-[80vh] md:min-h-[75vh]">
                <iframe
                  src="/images/flow2.html"
                  title="Traffic flows side by side"
                  className="h-full w-full"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          </div>
        </div>
      )}

      <PageWrapper>
        <div className="max-w-5xl mx-auto px-4 py-12">
          {showBanner && (
            <div className="mb-4 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 shadow-lg shadow-emerald-700/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="font-semibold">
                Gateway API + NGINX Gateway Fabric now handle all traffic — legacy ingress-nginx is deprecated and being removed for safer, consistent edge handling.
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setModalView("info");
                    setShowBanner(false);
                  }}
                  className="cursor-pointer rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
                >
                  Learn more
                </button>
                <button
                  onClick={() => setShowBanner(false)}
                  className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Close
                </button>
              </div>
            </div>
          )}

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
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-medium bg-transparent text-gray-300 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 md:gap-2 pt-1 md:pt-1.5">
                        {project.ctas
                          .filter((cta) => cta.type === "internal" || cta.label.toLowerCase().includes("check it out"))
                          .map((cta) =>
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

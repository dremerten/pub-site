import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Orbit, MousePointer2, Rocket, ExternalLink, MonitorSmartphone } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";

const SolarSystem = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRefs = useRef([]);

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

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleNext = () => {
    if (activeIndex === null) return;
    if (activeIndex >= screenshots.length - 1) {
      setActiveIndex(null);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex === null) return;
    if (activeIndex <= 0) {
      setActiveIndex(null);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const screenshots = [
    {
      src: "/images/solar_system1.png",
      alt: "3D Solar System hero view",
      caption: "High-fidelity render with interactive camera controls",
    },
    {
      src: "/images/earthnew.png",
      alt: "Earth close-up",
      caption: "Planetary detail with atmosphere glow and lighting",
    },
    {
      src: "/images/mars.png",
      alt: "Mars surface tone",
      caption: "Mars orbit and material shading tuned for depth",
    },
    {
      src: "/images/mercury.png",
      alt: "Mercury orbit view",
      caption: "Inner orbit scale with crisp labeling and shadows",
    },
  ];

  const featurePills = [
    "Realistic 3D models",
    "Animated orbits",
    "Scaled distances",
    "Mouse controls",
    "Built with Vite",
    "Responsive design",
  ];

  const highlights = [
    {
      title: "Immersive 3D space",
      copy: "Beautifully lit models of the Sun and planets with subtle glow and shadow to keep depth and realism front-and-center.",
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    },
    {
      title: "Smooth orbital motion",
      copy: "Planets glide along their orbits with synced rotations, giving you an at-a-glance feel for distance and timing.",
      icon: <Orbit className="w-5 h-5 text-blue-300" />,
    },
    {
      title: "Explorable controls",
      copy: "Zoom, pan, and rotate with the mouse to tour the system from any angle—desktop or mobile touch both feel fluid.",
      icon: <MousePointer2 className="w-5 h-5 text-emerald-300" />,
    },
    {
      title: "Built for speed",
      copy: "Vite-powered build and lean scene graph keep load times snappy so you get to the cosmos in seconds.",
      icon: <Rocket className="w-5 h-5 text-indigo-300" />,
    },
  ];

  const envLinks = [
    { label: "Live App", href: "https://solar.dremer10.com", tone: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="bg-gradient-to-b from-[#030712] via-[#050c1d] to-[#0b1229] text-white min-h-screen">
      <PageWrapper>
        <div className="max-w-5xl mx-auto px-6 py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -left-20 w-72 h-72 bg-indigo-600/20 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 blur-3xl"></div>
          </div>

          <div className="flex items-center gap-3 text-sm text-blue-100 mb-10 relative z-10">
            <Link to="/projects" className="inline-flex items-center gap-2 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to projects
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">3D Solar System Simulator</span>
          </div>

          <header
            ref={(el) => (sectionRefs.current[0] = el)}
            data-section="hero"
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-14 shadow-2xl ${
              isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } transition-all duration-1000`}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-amber-400/10 pointer-events-none"></div>
            <div className="grid lg:grid-cols-5 gap-10 items-center relative z-10">
              <div className="space-y-6 lg:col-span-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs tracking-[0.25em] uppercase text-blue-200">
                  3D Experience
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                  ✨3D Solar System Simulator 🌌
                </h1>
                <p className="text-base md:text-lg text-blue-100 leading-relaxed">
                  A visually interactive 3D Solar System simulation. Explore the planets, their orbits, and the beauty of our solar
                  neighborhood — all in your browser.
                </p>

                <div className="flex flex-wrap gap-3">
                  {featurePills.map((pill, idx) => (
                    <span
                      key={pill}
                      style={{ animation: isVisible.hero ? `fadeInUp 0.5s ease ${idx * 0.04}s both` : "none" }}
                    className="text-xs md:text-sm font-medium px-3 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur"
                  >
                    {pill}
                  </span>
                ))}
              </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {envLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full overflow-hidden border border-white/15 hover:border-white/30 transition-all"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${link.tone} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                      <span className="relative z-10 text-sm font-semibold flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative lg:col-span-3">
                <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 via-blue-500/10 to-amber-400/20 blur-3xl"></div>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_25px_70px_-25px_rgba(0,0,0,0.8)]">
                  <img
                    src={screenshots[0].src}
                    alt={screenshots[0].alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-white/90 bg-black/50 px-3 py-2 rounded-full backdrop-blur">
                    <MonitorSmartphone className="w-4 h-4" />
                    Live in browser
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section
            ref={(el) => (sectionRefs.current[1] = el)}
            data-section="highlights"
            className={`mt-16 grid md:grid-cols-2 gap-6 relative z-10 transition-all duration-1000 ${
              isVisible.highlights ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {highlights.map((item, idx) => (
              <div
                key={item.title}
                style={{ animation: isVisible.highlights ? `fadeInUp 0.6s ease ${idx * 0.08}s both` : "none" }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-blue-100 leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </section>

          <section
            ref={(el) => (sectionRefs.current[2] = el)}
            data-section="screens"
            className={`mt-20 relative z-10 transition-all duration-1000 ${
              isVisible.screens ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold">Screenshots</h2>
              <div className="h-px flex-1 ml-6 bg-gradient-to-r from-white/40 via-white/10 to-transparent"></div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {screenshots.map((shot, idx) => (
                <div
                  key={shot.src}
                  style={{ animation: isVisible.screens ? `fadeInUp 0.6s ease ${idx * 0.1}s both` : "none" }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur shadow-2xl cursor-zoom-in"
                  onClick={() => setActiveIndex(idx)}
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="w-full object-cover transition-transform duration-500 ease-out origin-center group-hover:scale-110 group-hover:translate-y-[-10px] group-hover:translate-x-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent p-4">
                    <p className="text-sm text-blue-100">{shot.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            ref={(el) => (sectionRefs.current[3] = el)}
            data-section="experience"
            className={`mt-20 relative z-10 transition-all duration-1000 ${
              isVisible.experience ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    Experience highlights
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    Each planet is scaled for clarity while keeping relative distances readable. Orbit speeds and spin are tuned for
                    a cinematic but truthful feeling of motion that invites exploration.
                  </p>
                  <ul className="space-y-3 text-sm text-blue-100">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                      Hover tooltips and smooth easing on interactions keep the focus on discovery.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-300"></div>
                      Lightweight assets and lazy scene loading deliver quick startup even on mobile.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-300"></div>
                      Responsive layout adapts the canvas, UI, and labels for phones, tablets, and desktops.
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-indigo-300" />
                    Tech stack
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["React", "Three.js", "Vite", "Tailwind CSS", "TypeScript-ready"].map((tech) => (
                      <div key={tech} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-blue-100">
                        {tech}
                      </div>
                    ))}
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    The simulator pairs a lean Vite toolchain with optimized Three.js scenes to keep performance high while rendering
                    dynamic orbital paths and lighting.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageWrapper>

      <a
        href="https://solar.dremer10.com"
        target="_blank"
        rel="noreferrer"
        className="fixed right-2 bottom-2 sm:right-6 sm:bottom-6 z-40 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-2 sm:px-5 sm:py-3 rounded-full shadow-lg sm:shadow-xl shadow-indigo-500/25 transition-all attention-bounce text-xs sm:text-base"
      >
        Check it out Live
        <ExternalLink className="w-4 h-4" />
      </a>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-w-6xl w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 bg-black/80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={screenshots[activeIndex].src}
              alt={screenshots[activeIndex].alt}
              className="w-full h-full object-contain"
            />
            <button
              aria-label="Close"
              className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition"
              onClick={() => setActiveIndex(null)}
            >
              Close
            </button>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
              <div className="flex items-center justify-between text-sm text-blue-100">
                <p>{screenshots[activeIndex].caption}</p>
                <span className="text-white/70">{activeIndex + 1} / {screenshots.length}</span>
              </div>
            </div>
            <button
              aria-label="Previous"
              className="absolute left-3 bottom-16 p-3 rounded-full bg-white/85 text-gray-900 shadow-lg shadow-black/20 hover:bg-white transition disabled:opacity-40 disabled:shadow-none"
              onClick={handlePrev}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next"
              className="absolute right-3 bottom-16 p-3 rounded-full bg-white/85 text-gray-900 shadow-lg shadow-black/20 hover:bg-white transition disabled:opacity-40 disabled:shadow-none"
              onClick={handleNext}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
          50% { box-shadow: 0 0 0 12px rgba(99,102,241,0); }
        }
        @keyframes attentionBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-14px) scale(1.03); }
        }
        .attention-bounce {
          animation: attentionBounce 2.4s ease-in-out infinite, glowPulse 2.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SolarSystem;

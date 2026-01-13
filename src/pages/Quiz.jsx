import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Lock, ShieldCheck, TerminalSquare, Zap } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { StickyButtons } from "@/components/StickyButtons";

const topics = [
  { id: "ansible", name: "Ansible", questions: 5, focus: "Playbooks, handlers, idempotency" },
  { id: "aws", name: "AWS", questions: 27, focus: "Networking, IAM guardrails, HA patterns" },
  { id: "azure", name: "Azure", questions: 5, focus: "Resource groups, identity, AKS" },
  { id: "cicd", name: "CI/CD", questions: 11, focus: "Pipelines, promotion flows, gating" },
  { id: "docker", name: "Docker", questions: 13, focus: "Images, layering, runtime flags" },
  { id: "git", name: "Git", questions: 11, focus: "Branching, rebases, release hygiene" },
  { id: "kubernetes", name: "Kubernetes", questions: 30, focus: "Workloads, networking, policy" },
  { id: "linux", name: "Linux", questions: 17, focus: "Processes, permissions, debugging" },
  { id: "monitoring", name: "Monitoring", questions: 5, focus: "SLOs, alerting, signals" },
  { id: "networking", name: "Networking", questions: 12, focus: "L4/L7, DNS, routing" },
  { id: "security", name: "Security", questions: 5, focus: "Secrets, hardening, controls" },
  { id: "terraform", name: "Terraform", questions: 11, focus: "State, modules, drift" },
];

const Quiz = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].id);
  const [copied, setCopied] = useState(false);
  const terminalBase = import.meta.env.VITE_QUIZ_TERMINAL_URL || "https://quiz.dremer10.com";
  const appOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const returnUrl = appOrigin ? `${appOrigin}/quiz` : "";
  const buildTerminalUrl = useCallback(
    (topicId) => `${terminalBase}?topic=${topicId}${returnUrl ? `&return=${encodeURIComponent(returnUrl)}` : ""}`,
    [terminalBase, returnUrl]
  );
  const terminalUrl = buildTerminalUrl(selectedTopic);
  const selectedIndex = useMemo(() => topics.findIndex((t) => t.id === selectedTopic), [selectedTopic]);
  const stepAngle = 360 / topics.length;
  const radius = 480;

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    const url = buildTerminalUrl(topicId);
    const opened = window.open(url, "_blank");
    if (!opened) {
      alert("Please allow pop-ups to launch the quiz terminal in a new tab.");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const command = useMemo(
    () => `docker run -it --rm moabukar/devops-interview-prep practice ${selectedTopic}`,
    [selectedTopic]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#0c1324] to-black text-white">
      <StickyButtons />
      <PageWrapper>
        <div className="w-full mx-auto py-8 md:py-12 space-y-8 md:space-y-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-blue-500/10 px-5 md:px-8 py-6 md:py-8">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-sky-500/40 blur-3xl"></div>
              <div className="absolute right-0 -bottom-10 h-44 w-44 rounded-full bg-emerald-500/30 blur-3xl"></div>
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-2xl"></div>
            </div>

            <div className="relative grid gap-6 md:grid-cols-[2fr_1fr] items-start">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-100">
                  <TerminalSquare className="w-3.5 h-3.5" />
                  DevOps Quiz Lab
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Secure, browser-based terminal for live DevOps drills
                </h1>
                <p className="text-sm md:text-base text-gray-200 max-w-3xl leading-relaxed">
                  Launch an isolated terminal, pick a topic, and run the curated DevOps practice container without installing anything locally. Every
                  session is ephemeral and scoped to a single topic so you can focus on the reps.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={terminalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    Launch secure terminal
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-200 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      Isolation
                    </p>
                    <p className="text-sm text-gray-200">Dedicated namespace + pod-level policy for each session.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-sky-200 mb-1 flex items-center gap-1.5">
                      <TerminalSquare className="w-4 h-4" />
                      CLI-first
                    </p>
                    <p className="text-sm text-gray-200">Runs a sandbox Docker container.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-indigo-200 mb-1 flex items-center gap-1.5">
                      <Lock className="w-4 h-4" />
                      Zero local deps
                    </p>
                    <p className="text-sm text-gray-200">Uses browser-based access; no Docker or kubeconfig required by end users.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-blue-500/10 p-5 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Topic coverage</p>
                <h2 className="text-xl md:text-2xl font-semibold text-white">Select a DevOps topic to get Quized on.</h2>
                <p className="text-sm text-gray-300">Rotate and select a topic to begin.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-100 border border-white/15">
                12 topical tracks
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-900/40 to-black shadow-inner shadow-blue-500/10 p-4 md:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(94,234,212,0.14),transparent_40%)] pointer-events-none" />
              <div className="relative grid gap-6 lg:grid-cols-[360px_1fr] items-start">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200">Now spinning</p>
                  <div className="rounded-2xl border border-white/15 bg-black/60 px-4 py-3 shadow-2xl shadow-emerald-500/15">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-semibold text-white">
                          {topics.find((t) => t.id === selectedTopic)?.name}
                        </p>
                        <p className="text-sm text-gray-300">
                          {topics.find((t) => t.id === selectedTopic)?.questions} questions ready
                        </p>
                      </div>
                      <div className="rounded-full border border-emerald-300/50 bg-emerald-400/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-emerald-100">
                        Live lane
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Use controls to rotate Topics. The Centered Topic may be selected to launch the terminal session.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-x-0 top-1/2 h-28 -translate-y-1/2 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />
                  <div
                    className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-inner"
                    style={{ perspective: 2400 }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(56,189,248,0.22),transparent_48%)] opacity-70" />
                    <div
                      className="absolute left-1/2 top-1/2"
                      style={{ transform: "translate(-50%, -35%) rotateX(-14deg)", transformStyle: "preserve-3d" }}
                    >
                      {topics.map((topic, idx) => {
                        const angle = (idx - selectedIndex) * stepAngle;
                        const isActive = topic.id === selectedTopic;
                        return (
                          <div
                            key={topic.id}
                            className="absolute left-1/2 top-1/2"
                            style={{
                              transform: `rotateY(${angle}deg) translateZ(${radius}px) translateX(-50%) translateY(-50%)`,
                              transformStyle: "preserve-3d",
                              transition: "transform 700ms cubic-bezier(0.4, 0.2, 0, 1)",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => handleTopicSelect(topic.id)}
                              className={`w-52 md:w-56 rounded-2xl border p-3.5 shadow-2xl backdrop-blur transition-all cursor-pointer ${
                                isActive
                                  ? "border-emerald-400/70 bg-emerald-500/20 shadow-emerald-500/25"
                                  : "border-white/15 bg-slate-950 shadow-blue-500/10"
                              }`}
                              style={{
                                transform: `rotateY(${-angle}deg) scale(${isActive ? 1.08 : 0.92}) translateY(${isActive ? "6px" : "0"})`,
                                opacity: isActive ? 1 : 0.96,
                                pointerEvents: isActive ? "auto" : "none",
                                transition: "transform 400ms ease, opacity 400ms ease",
                              }}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <p className="text-base font-semibold text-white">{topic.name}</p>
                                <span className="text-[10px] rounded-full bg-white/10 px-2 py-0.5 border border-white/15 text-gray-200">
                                  {topic.questions} qs
                                </span>
                              </div>
                              <p className="text-[13px] text-gray-300 leading-snug">{topic.focus}</p>
                              <p className="text-[10px] text-emerald-200 mt-2">
                                {isActive ? "Click to launch" : "Rotate to center"}
                              </p>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedTopic(topics[(selectedIndex - 1 + topics.length) % topics.length].id)
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:border-white/25 hover:bg-white/15 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTopic(topics[(selectedIndex + 1) % topics.length].id)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:border-white/25 hover:bg-white/15 transition"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Quiz container by{" "}
            <a
              className="text-emerald-300 underline hover:text-emerald-200"
              href="https://hub.docker.com/r/moabukar/devops-interview-prep"
              target="_blank"
              rel="noreferrer"
            >
              moabukar/devops-interview-prep
            </a>
            .
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default Quiz;

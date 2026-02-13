import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Cloud, ServerCog, Layers, ShieldCheck } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { StickyButtons } from "@/components/StickyButtons";

const IacSandbox = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const capabilities = [
    {
      title: "Mock AWS API Calls via LocalStack",
      copy: "Simulate VPC, compute, and service provisioning with repeatable IaC patterns.",
      icon: <Cloud className="w-5 h-5 text-sky-300" />,
    },
    {
      title: "Multi-tool orchestration",
      copy: "Compare workflows across Ansible playbooks, Terraform modules, and Pulumi Python stacks.",
      icon: <Layers className="w-5 h-5 text-emerald-300" />,
    },
    {
      title: "Infrastructure + config",
      copy: "Blend provisioning with configuration management to mirror production-like Deployments.",
      icon: <ServerCog className="w-5 h-5 text-amber-300" />,
    },
    {
      title: "Secure Sandbox Environment",
      copy: "Isolated ephemeral environment for safe experimentation without impacting real resources.",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-300" />,
    },
  ];

  const stack = ["Ansible", "Terraform", "Pulumi (Python)", "AWS", "Makefile", "Bash"];

  return (
    <div className="bg-gradient-to-b from-[#050914] via-[#0a1230] to-[#0b1f24] text-white min-h-screen">
      <StickyButtons />
      <PageWrapper>
        <div className="max-w-5xl mx-auto px-6 py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -left-16 w-64 h-64 bg-emerald-500/10 blur-3xl"></div>
            <div className="absolute top-32 right-0 w-72 h-72 bg-sky-500/10 blur-3xl"></div>
          </div>

          <div className="flex items-center gap-3 text-sm text-emerald-100 mb-10 relative z-10">
            <Link to="/projects" className="inline-flex items-center gap-2 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to projects
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Infrastructure as Code Sandbox</span>
          </div>

          <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-14 shadow-2xl mb-12">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-transparent to-sky-400/10 pointer-events-none"></div>
            <div className="grid lg:grid-cols-5 gap-10 items-center relative z-10">
              <div className="space-y-6 lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs tracking-[0.25em] uppercase text-emerald-200">
                  Interactive IaC Lab
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Infrastructure as Code Sandbox</h1>
                <p className="text-base md:text-lg text-emerald-100 leading-relaxed">
                  An interactive mock AWS deployment sandbox leveraging Ansible, Terraform, and Pulumi Python code for infrastructure
                  deployments and cloud configuration workflows.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://iac-sandbox.dremer10.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 transition-all"
                  >
                    Launch Sandbox
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-emerald-200">Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-emerald-100">
                    Designed for safe experimentation with infrastructure patterns before production rollout.
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="grid md:grid-cols-2 gap-6 relative z-10">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    {capability.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-white">{capability.title}</h2>
                </div>
                <p className="text-sm text-emerald-100 leading-relaxed">{capability.copy}</p>
              </div>
            ))}
          </section>
        </div>
      </PageWrapper>
    </div>
  );
};

export default IacSandbox;

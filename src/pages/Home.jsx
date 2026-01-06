import {personalInfo, coreSkills, experienceData} from "@/data/resume";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Github } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const [typedText, setTypedText] = useState("");
  const sectionRefs = useRef([]);
  const firstName = personalInfo.name.split(' ')[0];
  const fullHeroText = `Hi There! I'm ${firstName}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullHeroText.slice(0, index + 1));
      index++;
      if (index >= fullHeroText.length) {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [fullHeroText]);

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
    <div className="bg-white text-gray-900 relative min-h-screen">
      <div className="fixed right-3 top-32 sm:top-24 sm:right-6 z-20 flex gap-2 sm:gap-3">
        <a
          href="https://github.com/dremerten"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-xl shadow-gray-500/25 hover:-translate-y-1 transition-transform hover:bg-gray-800"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>
        <a
          href="https://www.linkedin.com/in/dremer10"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-xl shadow-blue-500/25 hover:-translate-y-1 transition-transform hover:bg-[#0957a6]"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>
      </div>
      {/* Hero Section */}
      <section
        id="hero"
        ref={(el) => (sectionRefs.current[0] = el)}
        data-section="hero"
        className={`min-h-[80vh] sm:min-h-screen flex flex-col justify-center items-center relative transition-all duration-1000 ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="relative z-10 text-center px-6 sm:px-8 max-w-6xl mx-auto py-20 sm:py-28">
          <div className="inline-block mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light mb-5 tracking-tight leading-tight text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                {typedText || fullHeroText}
              </span>
              <span className="ml-1 inline-block w-3 h-8 align-middle bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
            </h1>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-8"></div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-normal mb-6 text-gray-800 leading-relaxed max-w-4xl mx-auto">
            I'm looking for my next opportunity as a <span className="text-gray-900 font-medium">Platform Engineer</span> or <span className="text-gray-900 font-medium">(Infrastructure-Focused) DevOps Engineer</span>.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-normal">
            I build and maintain the internal tools, systems, and infrastructure that development teams rely on to build, test, and deploy software efficiently.
            My focus is on enabling teams through stable, scalable, and automated platforms—from CI/CD pipelines and container orchestration to cloud infrastructure and developer tooling.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 justify-center items-center max-w-4xl mx-auto">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about').scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              About me
            </a>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                navigate('/projects');
              }}
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300"
            >
              My Projects
            </button>
            <a
              href="https://www.linkedin.com/in/dremer10/details/recommendations/?detailScreenTabIndex=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-amber-300 font-medium px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:shadow-[0_0_28px_rgba(251,191,36,0.8)] relative overflow-hidden"
              style={{ textShadow: "0 0 8px rgba(251,191,36,0.8)" }}
            >
              Recommendations
            </a>
            
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="mb-24 relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => (sectionRefs.current[1] = el)}
        data-section="about"
        className={`py-12 sm:py-20 px-6 sm:px-8 bg-white relative z-10 transition-all duration-1000 ${
          isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 sm:mb-12 text-gray-900 tracking-tight">About Me</h2>
          <div className="space-y-6 text-base sm:text-lg text-gray-800 leading-relaxed sm:leading-loose mb-12 sm:mb-16">
            {personalInfo.summary.map((paragraph, index) => (
              <p key={index} className="font-normal">{paragraph}</p>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 sm:mb-12 text-gray-900 tracking-tight">My Technologies & Tools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 sm:gap-8">
              {/* Docker */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Docker</span>
              </div>

              {/* Kubernetes */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/kubernetes/326CE5" alt="Kubernetes" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Kubernetes</span>
              </div>

              {/* Python3 */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python3" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Python3</span>
              </div>

              {/* Shell Scripting */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/gnometerminal/241F31" alt="Shell" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Shell</span>
              </div>

              {/* YAML */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/yaml/CB171E" alt="YAML" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">YAML</span>
              </div>

              {/* JSON */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/json/000000" alt="JSON" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">JSON</span>
              </div>

              {/* Terraform */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/terraform/7B42BC" alt="Terraform" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Terraform</span>
              </div>

              {/* Ansible */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/ansible/EE0000" alt="Ansible" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Ansible</span>
              </div>

              {/* AWS */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="/icons/aws.svg" alt="AWS" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">AWS</span>
              </div>

              {/* Nginx */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/nginx/009639" alt="Nginx" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Nginx</span>
              </div>

              {/* HAProxy */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="/icons/haproxy.svg" alt="HAProxy" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">HAProxy</span>
              </div>

              {/* Caddy */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/caddy/1F88C0" alt="Caddy" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Caddy</span>
              </div>

              {/* GitHub Actions */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/githubactions/2088FF" alt="GitHub Actions" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">GitHub Actions</span>
              </div>

              {/* Jenkins */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/jenkins/D24939" alt="Jenkins" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Jenkins</span>
              </div>

              {/* Linux */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/linux/FCC624" alt="Linux" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Linux</span>
              </div>

              {/* Git */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/git/F05032" alt="Git" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Git</span>
              </div>

              {/* Bash */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/gnubash/4EAA25" alt="Bash" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Bash</span>
              </div>

              {/* Netdata */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/netdata/00AB44" alt="Netdata" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Netdata</span>
              </div>

              {/* HashiCorp Vault */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/vault/FFEC6E" alt="HashiCorp Vault" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Vault</span>
              </div>

              {/* Active Directory */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="/icons/active-directory.svg" alt="Active Directory" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Active Directory</span>
              </div>

              {/* ADFS */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://symbols.getvecta.com/stencil_31/1_active-directory-federation-services.f7b5702ada.svg" alt="ADFS" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">ADFS</span>
              </div>

              {/* Okta */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/okta/007DC1" alt="Okta" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Okta</span>
              </div>

              {/* Authentik */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <img src="https://cdn.simpleicons.org/authentik/FD4B2D" alt="Authentik" className="w-16 h-16" />
                <span className="text-sm text-gray-900 font-medium">Authentik</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="mb-24 relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => (sectionRefs.current[2] = el)}
        data-section="projects"
        className={`py-32 px-8 relative z-10 transition-all duration-1000 ${
          isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-5xl font-light mb-6 sm:mb-8 text-gray-900 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-8 sm:mb-10 font-normal leading-relaxed">
              Showcasing production-ready applications that demonstrate expertise in cloud-native development, infrastructure automation, and DevOps engineering
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                navigate('/projects');
              }}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Project Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] shadow-lg">
              <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                <div className="w-full md:w-1/2">
                  <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl aspect-square bg-gray-900 p-3">
                    <img src="/images/devopstoolkit.png" alt="DevOps Toolkit preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="inline-block">
                    <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-blue-400 font-medium">Featured Project</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-light text-white mb-2 tracking-tight">
                    DevOps Toolkit
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 font-normal leading-relaxed">
                    Production-ready cloud-native application with comprehensive CI/CD pipeline and full observability
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {['Kubernetes', 'Docker', 'CI/CD', 'Prometheus', 'Grafana', 'GitHub Actions'].map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-300 font-normal border-b border-blue-400 pb-0.5 hover:text-blue-400 hover:border-blue-300 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                    {[
                      { title: "Production Ready", copy: "Multi-environment deployment pipeline", border: "border-blue-500/30 hover:border-blue-500/60", badge: "bg-blue-500" },
                      { title: "Security First", copy: "Automated security scanning & TLS", border: "border-purple-500/30 hover:border-purple-500/60", badge: "bg-purple-500" },
                      { title: "Full Observability", copy: "Prometheus & Grafana monitoring", border: "border-emerald-500/30 hover:border-emerald-500/60", badge: "bg-emerald-500" },
                    ].map((item) => (
                      <div key={item.title} className={`bg-gray-800/50 border ${item.border} p-4 rounded-xl hover:shadow-lg transition-all duration-300 backdrop-blur-sm`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-9 h-9 rounded-lg ${item.badge} flex items-center justify-center shadow-lg`}>
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm sm:text-base font-medium text-white">{item.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">{item.copy}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        navigate('/projects/devops-toolkit');
                      }}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 hover:shadow-lg"
                    >
                      <span>Learn More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <a
                      href="https://devops-toolkit.dremer10.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
                    >
                      Live App
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 bg-white text-center border-t border-gray-200 relative z-10">
        <p className="mb-8 text-gray-700 text-sm font-normal tracking-wide">{personalInfo.name} © {new Date().getFullYear()}</p>
        <div className="flex justify-center gap-12 text-sm">
          <a href="https://github.com/dremerten" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors font-normal">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;

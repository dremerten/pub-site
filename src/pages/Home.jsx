import {personalInfo, coreSkills, experienceData} from "@/data/resume";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
    <div className="bg-white text-gray-900 relative min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        ref={(el) => (sectionRefs.current[0] = el)}
        data-section="hero"
        className={`min-h-screen flex flex-col justify-center items-center relative transition-all duration-1000 ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="relative z-10 text-center px-8 max-w-6xl mx-auto py-32">
          <div className="inline-block mb-12">
            <h1 className="text-7xl md:text-8xl font-light mb-8 tracking-tight leading-tight text-gray-900">
              Hi There! I'm <span className="font-normal bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">{personalInfo.name.split(' ')[0]}</span>
            </h1>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-12"></div>
          </div>
          <p className="text-2xl md:text-3xl font-normal mb-8 text-gray-800 leading-relaxed max-w-4xl mx-auto">
            I'm looking for my next opportunity as a <span className="text-gray-900 font-medium">Platform Engineer</span> or <span className="text-gray-900 font-medium">(Infrastructure-Focused) DevOps Engineer</span>.
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-16 max-w-3xl mx-auto leading-loose font-normal">
            I build and maintain the internal tools, systems, and infrastructure that development teams rely on to build, test, and deploy software efficiently.
            My focus is on enabling teams through stable, scalable, and automated platforms—from CI/CD pipelines and container orchestration to cloud infrastructure and developer tooling.
          </p>

          <div className="flex gap-4 justify-center items-center flex-wrap">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about').scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 text-base rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              About me
            </a>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                navigate('/projects');
              }}
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 text-base rounded-full transition-all duration-300"
            >
              My Projects
            </button>
            <a
              href="https://www.linkedin.com/in/dremer10/details/recommendations/?detailScreenTabIndex=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 text-base rounded-full transition-all duration-300"
            >
              Recommendations
            </a>
            <button
              onClick={() => {
                navigate('/overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 text-base rounded-full transition-all duration-300"
            >
              View DevOps Dashboard
            </button>
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
        className={`py-32 px-8 bg-white relative z-10 transition-all duration-1000 ${
          isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-6xl font-light mb-16 text-gray-900 tracking-tight">About Me</h2>
          <div className="space-y-8 text-xl text-gray-800 leading-loose mb-16">
            {personalInfo.summary.map((paragraph, index) => (
              <p key={index} className="font-normal">{paragraph}</p>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="mb-12">
            <h3 className="text-4xl font-light mb-12 text-gray-900 tracking-tight">My Technologies & Tools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
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
            <h2 className="text-6xl font-light mb-8 text-gray-900 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 font-normal leading-loose">
              Showcasing production-ready applications that demonstrate expertise in cloud-native development, infrastructure automation, and DevOps engineering
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                navigate('/projects');
              }}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 text-base rounded-full transition-all duration-300"
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
              <div className="p-12">
                <div className="mb-10">
                  <div className="inline-block mb-4">
                    <span className="text-xs tracking-[0.2em] uppercase text-blue-400 font-medium">Featured Project</span>
                  </div>
                  <h3 className="text-5xl font-light text-white mb-6 tracking-tight">
                    DevOps Toolkit
                  </h3>
                  <p className="text-gray-300 text-xl mb-8 font-normal leading-relaxed">
                    Production-ready cloud-native application with comprehensive CI/CD pipeline and full observability
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Kubernetes', 'Docker', 'CI/CD', 'Prometheus', 'Grafana', 'GitHub Actions'].map((tech, index) => (
                      <span
                        key={index}
                        className="text-sm text-gray-300 font-normal border-b border-blue-400 pb-0.5 hover:text-blue-400 hover:border-blue-300 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-gray-800/50 border border-blue-500/30 p-6 rounded-xl hover:shadow-lg hover:border-blue-500/60 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg font-medium text-white">Production Ready</span>
                    </div>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">Multi-environment deployment pipeline</p>
                  </div>

                  <div className="bg-gray-800/50 border border-purple-500/30 p-6 rounded-xl hover:shadow-lg hover:border-purple-500/60 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <span className="text-lg font-medium text-white">Security First</span>
                    </div>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">Automated security scanning & TLS</p>
                  </div>

                  <div className="bg-gray-800/50 border border-emerald-500/30 p-6 rounded-xl hover:shadow-lg hover:border-emerald-500/60 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <span className="text-lg font-medium text-white">Full Observability</span>
                    </div>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">Prometheus & Grafana monitoring</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'instant' });
                      navigate('/projects');
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 text-base rounded-full transition-all duration-300 hover:shadow-lg"
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
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-8 py-4 text-base rounded-full transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
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

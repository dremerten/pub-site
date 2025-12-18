import {personalInfo, coreSkills, experienceData} from "@/data/resume";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Trophy, FolderKanban } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Animated canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(81, 162, 233, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(81, 162, 233, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.fillStyle = 'rgb(26, 26, 26)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-[#1a1a1a] text-white relative min-h-screen">
      {/* Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[rgba(26,26,26,0.8)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="text-lg font-light text-white tracking-wide">
            {personalInfo.name.split(' ')[0]}
          </div>
          <div className="flex gap-10 text-sm font-light">
            <a href="#hero" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">About</a>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                navigate('/projects');
              }}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Projects
            </button>
            <button
              onClick={() => navigate('/overview')}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Canvas Background */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60"></canvas>

        <div className="relative z-10 text-center px-8 max-w-6xl mx-auto py-32">
          <h1 className="text-7xl md:text-8xl font-light mb-8 tracking-tight leading-tight">
            Hi There! I'm <span className="font-normal text-red-500">{personalInfo.name.split(' ')[0]}</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8 text-gray-300 leading-relaxed max-w-4xl mx-auto">
            I'm looking for my next opportunity as a <span className="text-white font-normal">Platform Engineer</span> or <span className="text-white font-normal">(Infrastructure-Focused) DevOps Engineer</span>.
          </p>
          <p className="text-lg md:text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-loose">
            I build and maintain the internal tools, systems, and infrastructure that development teams rely on to build, test, and deploy software efficiently.
            My focus is on enabling teams through stable, scalable, and automated platforms—from CI/CD pipelines and container orchestration to cloud infrastructure and developer tooling.
          </p>
          <div className="flex gap-4 justify-center items-center flex-wrap">
            <a
              href="#about"
              className="inline-block bg-white text-black font-light px-8 py-3 text-base rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              About me
            </a>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                navigate('/projects');
              }}
              className="inline-flex items-center gap-2 bg-white text-black font-light px-8 py-3 text-base rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              <FolderKanban className="w-4 h-4" />
              My Projects
            </button>
            <a
              href="https://www.linkedin.com/in/dremer10/details/recommendations/?detailScreenTabIndex=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-light px-8 py-3 text-base rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="text-yellow-400">★</span>
              Recommendations
            </a>
            <button
              onClick={() => {
                navigate('/overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white/10 text-white font-light px-8 py-3 text-base rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              View DevOps Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 bg-[#1a1a1a] relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-6xl font-light mb-16 text-white tracking-tight">About Me</h2>
          <div className="space-y-8 text-xl text-gray-300 leading-relaxed mb-16">
            {personalInfo.summary.map((paragraph, index) => (
              <p key={index} className="font-light">{paragraph}</p>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="mb-12">
            <h3 className="text-4xl font-light mb-12 text-white tracking-tight">My Technologies & Tools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
              {/* Docker */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Docker</span>
              </div>

              {/* Kubernetes */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/kubernetes/326CE5" alt="Kubernetes" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Kubernetes</span>
              </div>

              {/* Python3 */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python3" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Python3</span>
              </div>

              {/* Shell Scripting */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/gnometerminal/241F31" alt="Shell" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Shell</span>
              </div>

              {/* YAML */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/yaml/CB171E" alt="YAML" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">YAML</span>
              </div>

              {/* JSON */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/json/000000" alt="JSON" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">JSON</span>
              </div>

              {/* Terraform */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/terraform/7B42BC" alt="Terraform" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Terraform</span>
              </div>

              {/* Ansible */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/ansible/EE0000" alt="Ansible" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Ansible</span>
              </div>

              {/* AWS */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="/icons/aws.svg" alt="AWS" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">AWS</span>
              </div>

              {/* Nginx */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/nginx/009639" alt="Nginx" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Nginx</span>
              </div>

              {/* HAProxy */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="/icons/haproxy.svg" alt="HAProxy" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">HAProxy</span>
              </div>

              {/* Caddy */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/caddy/1F88C0" alt="Caddy" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Caddy</span>
              </div>

              {/* GitHub Actions */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/githubactions/2088FF" alt="GitHub Actions" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">GitHub Actions</span>
              </div>

              {/* Jenkins */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/jenkins/D24939" alt="Jenkins" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Jenkins</span>
              </div>

              {/* Linux */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/linux/FCC624" alt="Linux" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Linux</span>
              </div>

              {/* Git */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/git/F05032" alt="Git" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Git</span>
              </div>

              {/* Bash */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/gnubash/4EAA25" alt="Bash" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Bash</span>
              </div>

              {/* Netdata */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/netdata/00AB44" alt="Netdata" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Netdata</span>
              </div>

              {/* HashiCorp Vault */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/vault/FFEC6E" alt="HashiCorp Vault" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Vault</span>
              </div>

              {/* Active Directory */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="/icons/active-directory.svg" alt="Active Directory" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Active Directory</span>
              </div>

              {/* ADFS */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://symbols.getvecta.com/stencil_31/1_active-directory-federation-services.f7b5702ada.svg" alt="ADFS" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">ADFS</span>
              </div>

              {/* Okta */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/okta/007DC1" alt="Okta" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Okta</span>
              </div>

              {/* Authentik */}
              <div className="flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/authentik/FD4B2D" alt="Authentik" className="w-16 h-16" />
                <span className="text-sm text-[#fafafa]">Authentik</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-8 relative bg-[#1a1a1a] overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-light mb-8 text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Showcasing production-ready applications that demonstrate expertise in cloud-native development, infrastructure automation, and DevOps engineering
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                navigate('/projects');
              }}
              className="inline-flex items-center gap-2 bg-white text-black font-light px-8 py-3 text-base rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Project Card with 3D effect */}
          <div className="relative group perspective-1000">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>

            {/* Main card */}
            <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a] rounded-3xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 shadow-2xl">
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>

              <div className="relative p-12 border border-white/10">
                <div className="mb-10">
                  <div className="inline-block mb-4">
                    <span className="text-xs tracking-[0.2em] uppercase text-blue-400 font-light">Featured Project</span>
                  </div>
                  <h3 className="text-5xl font-light text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200">
                    DevOps Toolkit
                  </h3>
                  <p className="text-gray-300 text-xl mb-8 font-light leading-relaxed">
                    Production-ready cloud-native application with comprehensive CI/CD pipeline and full observability
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Kubernetes', 'Docker', 'CI/CD', 'Prometheus', 'Grafana', 'GitHub Actions'].map((tech, index) => (
                      <span
                        key={index}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-sm px-4 py-2 rounded-full font-light hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="relative group/card">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-xl blur opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-lg font-light text-white">Production Ready</span>
                      </div>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">Multi-environment deployment pipeline</p>
                    </div>
                  </div>

                  <div className="relative group/card">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl blur opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <span className="text-lg font-light text-white">Security First</span>
                      </div>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">Automated security scanning & TLS</p>
                    </div>
                  </div>

                  <div className="relative group/card">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent rounded-xl blur opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:border-pink-400/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/50">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-lg font-light text-white">Full Observability</span>
                      </div>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">Prometheus & Grafana monitoring</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'instant' });
                      navigate('/projects');
                    }}
                    className="relative flex items-center gap-2 bg-white text-black font-light px-8 py-4 text-base rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative">Learn More</span>
                    <svg className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <a
                    href="https://devops-toolkit.dremer10.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-light px-8 py-4 text-base rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
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
      <footer className="py-20 px-8 bg-[#1a1a1a] text-center border-t border-white/10 relative z-10">
        <p className="mb-8 text-gray-400 text-sm font-light tracking-wide">{personalInfo.name} © {new Date().getFullYear()}</p>
        <div className="flex justify-center gap-12 text-sm">
          <a href="https://github.com/dremerten" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors font-light">GitHub</a>
          <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition-colors font-light">Email</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import {personalInfo, coreSkills, experienceData} from "@/data/resume";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

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
    <div className="bg-[#1a1a1a] text-[#fafafa]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[rgba(26,26,26,0.95)] backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold text-[#fafafa]">
            {personalInfo.name.split(' ')[0]}
          </div>
          <div className="flex gap-8 text-base">
            <a href="#hero" className="text-[#fafafa] hover:text-[#51a2e9] transition-colors">Home</a>
            <a href="#about" className="text-[#fafafa] hover:text-[#51a2e9] transition-colors">About</a>
            <button
              onClick={() => navigate('/overview')}
              className="text-[#fafafa] hover:text-[#51a2e9] transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Canvas Background */}
      <section id="hero" className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-light mb-2 animate-slide-in-left">
            Hello, I'm <span className="font-normal text-[#ff4d5a]">{personalInfo.name.split(' ')[0]}</span>.
          </h1>
          <p className="text-4xl md:text-5xl font-light mb-12 animate-slide-in-right">
            I'm a {personalInfo.role}.
          </p>
          <div className="flex gap-6 justify-center items-center flex-wrap">
            <a
              href="#about"
              className="inline-block bg-[rgba(26,26,26,0.6)] border-2 border-[#ff4d5a] text-[#fafafa] font-medium px-10 py-4 text-2xl rounded hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-slide-in-bottom"
            >
              About me
            </a>
            <button
              onClick={() => {
                navigate('/overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#51a2e9] hover:bg-[#ff4d5a] text-[#fafafa] font-medium px-10 py-4 text-2xl rounded hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-slide-in-bottom"
            >
              View DevOps Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#282828] relative">
        <canvas className="absolute inset-0 w-full h-full opacity-20"></canvas>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-12 text-[#fafafa]">About</h2>
          <div className="space-y-6 text-xl text-[#fafafa] leading-relaxed mb-12">
            {personalInfo.summary.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="mb-12">
            <h3 className="text-3xl font-semibold mb-8 text-[#fafafa]">Technologies & Tools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
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

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1a1a1a] text-center border-t border-[#282828]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mb-6 text-[#51a2e9] hover:text-[#ff4d5a] transition-colors text-2xl"
        >
          ↑
        </button>
        <p className="mb-6 text-[#fafafa] text-lg font-semibold">{personalInfo.name.toUpperCase()} ©{new Date().getFullYear()}</p>
        <div className="flex justify-center gap-8 text-lg">
          <a href="#" className="text-[#fafafa] hover:text-[#51a2e9] transition-colors">GitHub</a>
          <a href="#" className="text-[#fafafa] hover:text-[#51a2e9] transition-colors">Email</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;

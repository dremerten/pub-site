import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/NavigationMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import {Activity, Code, Download, Award, Menu, X, Star, Github, Home, Trophy} from "lucide-react";
import {Button} from "@/components/ui/button";
import {LinkedInIcon} from "@/components/icons";
import { useState, useEffect, useRef } from "react";

const ResumePDF = "/files/RAM_Resume2025.pdf";
const ResumeDOCX = "/files/RAM_Resume2025.docx";

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [credentialsDropdownOpen, setCredentialsDropdownOpen] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const downloadDropdownRef = useRef(null);
  const mobileDownloadDropdownRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is inside either dropdown
      const isInsideDesktop = dropdownRef.current && dropdownRef.current.contains(event.target);
      const isInsideMobile = mobileDropdownRef.current && mobileDropdownRef.current.contains(event.target);
      const isInsideDownloadDesktop = downloadDropdownRef.current && downloadDropdownRef.current.contains(event.target);
      const isInsideDownloadMobile = mobileDownloadDropdownRef.current && mobileDownloadDropdownRef.current.contains(event.target);

      // Close if clicked outside both dropdowns
      if (!isInsideDesktop && !isInsideMobile) {
        setCredentialsDropdownOpen(false);
      }
      if (!isInsideDownloadDesktop && !isInsideDownloadMobile) {
        setDownloadDropdownOpen(false);
      }
    };

    if (credentialsDropdownOpen || downloadDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [credentialsDropdownOpen, downloadDropdownOpen]);

  const handleDownloadBoth = () => {
    // Download PDF
    const linkPDF = document.createElement('a');
    linkPDF.href = ResumePDF;
    linkPDF.download = 'RAM_Resume2025.pdf';
    document.body.appendChild(linkPDF);
    linkPDF.click();
    document.body.removeChild(linkPDF);

    // Download DOCX after a small delay
    setTimeout(() => {
      const linkDOCX = document.createElement('a');
      linkDOCX.href = ResumeDOCX;
      linkDOCX.download = 'RAM_Resume2025.docx';
      document.body.appendChild(linkDOCX);
      linkDOCX.click();
      document.body.removeChild(linkDOCX);
    }, 100);

    setDownloadDropdownOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className={`mx-auto transition-all duration-500 ${
        isScrolled ? 'px-4 max-w-[98%]' : 'px-6 max-w-7xl'
      }`}>
        <div className={`bg-black backdrop-blur-xl transition-all duration-500 ${
          isScrolled
            ? 'shadow-lg shadow-blue-500/20 rounded-full px-4 py-2 border border-blue-500/30'
            : 'shadow-md border-b border-blue-500/20 px-6 py-3'
        }`}>
          <div className="flex items-center justify-between">
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-3">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/home" className={`flex flex-row gap-1 items-center px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-sm ${
                    location.pathname === "/home"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20"
                  }`}>
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/overview" className={`flex flex-row gap-1 items-center px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-sm ${
                    location.pathname === "/overview"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20"
                  }`}>
                    <Activity className="w-4 h-4" />
                    Overview
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/projects" className={`flex flex-row gap-1 items-center px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-sm ${
                    location.pathname === "/projects"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20"
                  }`}>
                    <Trophy className="w-4 h-4" />
                    Projects
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/resume" className={`flex flex-row gap-1 items-center px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-sm ${
                    location.pathname === "/resume"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20"
                  }`}>
                    <Code className="w-4 h-4" />
                    k8s-resume deployment
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex md:hidden gap-2">
            <Link to="/home" className={`flex flex-row gap-2 items-center px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 ${
              location.pathname === "/home"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-[#0a0a0a] text-gray-300 hover:bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)]"
            }`}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link to="/overview" className={`flex flex-row gap-2 items-center px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 ${
              location.pathname === "/overview"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-[#0a0a0a] text-gray-300 hover:bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)]"
            }`}>
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </Link>
            <Link to="/projects" className={`flex flex-row gap-2 items-center px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 ${
              location.pathname === "/projects"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-[#0a0a0a] text-gray-300 hover:bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)]"
            }`}>
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </Link>
            <Link to="/resume" className={`flex flex-row gap-2 items-center px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 ${
              location.pathname === "/resume"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-[#0a0a0a] text-gray-300 hover:bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)]"
            }`}>
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">k8s-resume</span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover:bg-white/10 rounded transition-all border border-white/20 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex items-center gap-1.5">
            <Button asChild variant="ghost" href="/" title="LinkedIn" className="text-xs px-2 py-1 h-auto text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-md hover:shadow-blue-500/30">
              <a href="https://www.linkedin.com/in/dremer10" target="_blank" rel="noreferrer" className="flex items-center gap-1">
                <LinkedInIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </Button>
            <Button asChild variant="ghost" title="GitHub" className="text-xs px-2 py-1 h-auto text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-md hover:shadow-blue-500/30">
              <a href="https://github.com/dremerten" target="_blank" rel="noreferrer" className="flex items-center gap-1">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </Button>
            <Button asChild variant="ghost" title="Recommendations" className="text-xs px-2 py-1 h-auto text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-md hover:shadow-blue-500/30">
              <a href="https://www.linkedin.com/in/dremer10/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noreferrer" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>Recommendations</span>
              </a>
            </Button>
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                title="Professional Credentials"
                className="text-xs px-2 py-1 h-auto text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-md hover:shadow-blue-500/30"
                onClick={() => setCredentialsDropdownOpen(!credentialsDropdownOpen)}
              >
                <Award className="w-4 h-4" />
                <span className="ml-1">Professional Credentials</span>
              </Button>
              {credentialsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <div className="py-1">
                    <a
                      href="https://www.credly.com/badges/009b8d08-22da-4cc8-a720-934ea26add1e/linked_in_profile"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Award className="w-4 h-4" />
                      <span>IBM Apprenticeship Program - Professional Skills</span>
                    </a>
                    <a
                      href="https://www.credly.com/badges/6683b6f5-4907-4f11-b139-cbeafcf82cbd/linked_in_profile"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Award className="w-4 h-4" />
                      <span>IBM Software Engineer Apprenticeship</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" ref={downloadDropdownRef}>
              <Button
                variant="ghost"
                title="Download Resume"
                className="text-xs px-2 py-1 h-auto text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-md hover:shadow-blue-500/30"
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
              >
                <Download className="w-4 h-4" />
                <span className="ml-1">Download Resume</span>
              </Button>
              {downloadDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <div className="py-1">
                    <a
                      href={ResumePDF}
                      download="RAM_Resume2025.pdf"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setDownloadDropdownOpen(false)}
                    >
                      <Download className="w-4 h-4" />
                      <span>PDF Format</span>
                    </a>
                    <a
                      href={ResumeDOCX}
                      download="RAM_Resume2025.docx"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setDownloadDropdownOpen(false)}
                    >
                      <Download className="w-4 h-4" />
                      <span>DOCX Format</span>
                    </a>
                    <button
                      onClick={handleDownloadBoth}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                    >
                      <Download className="w-4 h-4" />
                      <span>Both Formats</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white/95 backdrop-blur-xl shadow-lg rounded-2xl p-4 border border-gray-200/50">
            <div className="flex flex-col gap-2">
            <Button asChild variant="ghost" href="/" title="LinkedIn">
              <a href="https://www.linkedin.com/in/dremer10" target="_blank" rel="noreferrer" className="justify-start">
                <LinkedInIcon />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="ghost" title="GitHub">
              <a href="https://github.com/dremerten" target="_blank" rel="noreferrer" className="justify-start">
                <Github />
                GitHub
              </a>
            </Button>
            <Button asChild variant="ghost" title="Recommendations">
              <a href="https://www.linkedin.com/in/dremer10/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noreferrer" className="justify-start">
                <Star />
                Recommendations
              </a>
            </Button>
            <div className="relative" ref={mobileDropdownRef}>
              <Button
                variant="ghost"
                title="Professional Credentials"
                className="w-full justify-start"
                onClick={() => setCredentialsDropdownOpen(!credentialsDropdownOpen)}
              >
                <Award />
                Professional Credentials
              </Button>
              {credentialsDropdownOpen && (
                <div className="mt-1 ml-4 flex flex-col gap-1 bg-[#0a0a0a]/90 rounded-lg p-2 border border-[rgba(255,255,255,0.08)]">
                  <a
                    href="https://www.credly.com/badges/009b8d08-22da-4cc8-a720-934ea26add1e/linked_in_profile"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#0f0f0f] rounded transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>Credential 1</span>
                  </a>
                  <a
                    href="https://www.credly.com/badges/6683b6f5-4907-4f11-b139-cbeafcf82cbd/linked_in_profile"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#0f0f0f] rounded transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>Credential 2</span>
                  </a>
                </div>
              )}
            </div>
            <div className="relative" ref={mobileDownloadDropdownRef}>
              <Button
                variant="ghost"
                title="Download Resume"
                className="w-full justify-start"
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
              >
                <Download />
                Download Resume
              </Button>
              {downloadDropdownOpen && (
                <div className="mt-1 ml-4 flex flex-col gap-1 bg-[#0a0a0a]/90 rounded-lg p-2 border border-[rgba(255,255,255,0.08)]">
                  <a
                    href={ResumePDF}
                    download="RAM_Resume2025.pdf"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#0f0f0f] rounded transition-colors"
                    onClick={() => setDownloadDropdownOpen(false)}
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF Format</span>
                  </a>
                  <a
                    href={ResumeDOCX}
                    download="RAM_Resume2025.docx"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#0f0f0f] rounded transition-colors"
                    onClick={() => setDownloadDropdownOpen(false)}
                  >
                    <Download className="w-4 h-4" />
                    <span>DOCX Format</span>
                  </a>
                  <button
                    onClick={handleDownloadBoth}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors text-left"
                  >
                    <Download className="w-4 h-4" />
                    <span>Both Formats</span>
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

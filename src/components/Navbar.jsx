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
  const isProjectsPath = location.pathname.startsWith("/projects");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [credentialsDropdownOpen, setCredentialsDropdownOpen] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const downloadDropdownRef = useRef(null);
  const mobileDownloadDropdownRef = useRef(null);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 md:px-5">
        <div className="w-full px-0.5 py-2">
          <div className="flex items-center justify-between">
          {/* Left: Home + Name */}
          <div className="flex items-center gap-2">
            {location.pathname !== "/home" && (
              <Link to="/home" className={`flex flex-row gap-1.5 items-center px-2.5 py-1.5 rounded-lg text-xs sm:text-sm transition-all hover:scale-105 ${
                location.pathname === "/home"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-[#0a0a0a] text-gray-200 hover:bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)]"
              }`}>
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            )}
            <div className="hidden md:block">
              <Link to="/home" className="text-white font-bold text-lg tracking-tight hover:text-blue-300 transition-colors cursor-pointer">
                Andre M.
              </Link>
            </div>

            {/* Mobile: Name */}
            <div className="md:hidden">
              <Link to="/home" className="text-white font-bold text-base tracking-tight cursor-pointer">
                Andre M.
              </Link>
            </div>
          </div>

          <div className="flex md:hidden gap-2">
            <Link to="/overview" className={`flex flex-row gap-2 items-center px-3 py-2 rounded-lg text-sm md:text-base transition-all hover:scale-105 ${
              location.pathname === "/overview"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-[#0a0a0a] text-gray-300 hover:bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)]"
            }`}>
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </Link>
            <Link to="/projects" className={`flex flex-row gap-2 items-center px-3 py-2 rounded-lg text-sm md:text-base transition-all hover:scale-105 ${
              isProjectsPath
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-[#0a0a0a] text-gray-300 hover:bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)]"
            }`}>
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </Link>
            <Link to="/resume" className={`flex flex-row gap-2 items-center px-3 py-2 rounded-lg text-sm md:text-base transition-all hover:scale-105 ${
              location.pathname === "/resume"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-[#0a0a0a] text-gray-300 hover:bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)]"
            }`}>
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Kubernetes</span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover:bg-white/10 rounded transition-all border border-white/20 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex items-center gap-1.5 ml-auto">
            {/* Navigation Menu Items */}
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/overview" className={`flex items-center gap-1.5 px-2 py-1 h-auto rounded-lg transition-all cursor-pointer text-xs ${
                      location.pathname === "/overview"
                        ? "bg-blue-600 text-white"
                        : "text-white hover:text-blue-300 hover:bg-white/10"
                    }`}>
                      <Activity className="w-3 h-3" />
                      <span>Overview</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/projects" className={`flex items-center gap-1.5 px-2 py-1 h-auto rounded-lg transition-all cursor-pointer text-xs ${
                      isProjectsPath
                        ? "bg-blue-600 text-white"
                        : "text-white hover:text-blue-300 hover:bg-white/10"
                    }`}>
                      <Trophy className="w-3 h-3" />
                      <span>Projects</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/resume" className={`flex items-center gap-1.5 px-2 py-1 h-auto rounded-lg transition-all cursor-pointer text-xs ${
                      location.pathname === "/resume"
                        ? "bg-blue-600 text-white"
                        : "text-white hover:text-blue-300 hover:bg-white/10"
                    }`}>
                      <Code className="w-3 h-3" />
                      <span>Kubernetes</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Recommendations */}
            <Button asChild variant="ghost" title="Recommendations" className="flex items-center gap-1 px-2 py-1 h-auto text-white hover:text-blue-300 hover:bg-white/10 text-xs">
              <a href="https://www.linkedin.com/in/dremer10/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noreferrer" className="flex items-center gap-1">
                <Star className="w-3 h-3 animate-pulse drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" color="#f59e0b" fill="#fbbf24" />
                <span>Recommendations</span>
              </a>
            </Button>

            {/* Professional Credentials */}
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                title="Professional Credentials"
                className="flex items-center gap-1 px-2 py-1 h-auto text-white hover:text-blue-300 hover:bg-white/10 cursor-pointer text-xs"
                onClick={() => setCredentialsDropdownOpen(!credentialsDropdownOpen)}
              >
                <Award className="w-3 h-3" />
                <span>Credentials</span>
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
            {/* Download Resume */}
            <div className="relative" ref={downloadDropdownRef}>
              <Button
                variant="ghost"
                title="Download Resume"
                className="flex items-center gap-1 px-2 py-1 h-auto text-white hover:text-blue-400 hover:bg-white/10 hover:shadow-md hover:shadow-blue-500/30 cursor-pointer text-xs"
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
              >
                <Download className="w-3 h-3" />
                <span>Resume Download</span>
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
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left cursor-pointer"
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
          <div className="md:hidden mt-4 bg-black/95 text-white backdrop-blur-xl shadow-lg rounded-2xl p-4 border border-white/10">
            <div className="flex flex-col gap-2">
            <Button asChild variant="ghost" title="Recommendations" className="justify-start text-white hover:bg-white/10">
              <a href="https://www.linkedin.com/in/dremer10/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noreferrer" className="justify-start">
                <Star className="animate-pulse drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" color="#f59e0b" fill="#fbbf24" />
                <span className="ml-2">Recommendations</span>
              </a>
            </Button>
            <div className="relative" ref={mobileDropdownRef}>
              <Button
                variant="ghost"
                title="Professional Credentials"
                className="w-full justify-start text-white hover:bg-white/10 cursor-pointer"
                onClick={() => setCredentialsDropdownOpen(!credentialsDropdownOpen)}
              >
                <Award />
                <span className="ml-2">Professional Credentials</span>
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
                className="w-full justify-start text-white hover:bg-white/10 cursor-pointer"
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
              >
                <Download />
                <span className="ml-2">Download Resume</span>
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
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors text-left cursor-pointer"
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

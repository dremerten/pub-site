import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/NavigationMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import {Activity, Code, Download, Award, Menu, X, Star} from "lucide-react";
import {Button} from "@/components/ui/button";
import {LinkedInIcon} from "@/components/icons";
import ResumePDF from "../../public/files/andre_resume_v4_ac.pdf";
import ResumeDOCX from "../../public/files/andre_resume_v4_ac.docx";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const location = useLocation();
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
    linkPDF.download = 'Andre_Remer_Resume.pdf';
    document.body.appendChild(linkPDF);
    linkPDF.click();
    document.body.removeChild(linkPDF);

    // Download DOCX after a small delay
    setTimeout(() => {
      const linkDOCX = document.createElement('a');
      linkDOCX.href = ResumeDOCX;
      linkDOCX.download = 'Andre_Remer_Resume.docx';
      document.body.appendChild(linkDOCX);
      linkDOCX.click();
      document.body.removeChild(linkDOCX);
    }, 100);

    setDownloadDropdownOpen(false);
  };

  return (
    <nav className="border-b">
      <div className="w-[90%] mx-auto py-4">
        <div className="flex items-center justify-between">
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-3">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/overview" className={`flex flex-row gap-2 items-center px-4 py-3 rounded-lg whitespace-nowrap transition-all hover:scale-105 ${
                    location.pathname === "/overview"
                      ? "bg-blue-600 text-white shadow-lg focus:bg-blue-600"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}>
                    <Activity />
                    Overview
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/resume" className={`flex flex-row gap-2 items-center px-4 py-3 rounded-lg whitespace-nowrap transition-all hover:scale-105 ${
                    location.pathname === "/resume"
                      ? "bg-blue-600 text-white shadow-lg focus:bg-blue-600"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}>
                    <Code />
                    Resume
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex md:hidden gap-3">
            <Link to="/overview" className={`flex flex-row gap-2 items-center px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 ${
              location.pathname === "/overview"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}>
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </Link>
            <Link to="/resume" className={`flex flex-row gap-2 items-center px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 ${
              location.pathname === "/resume"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}>
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover:bg-slate-800 rounded transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex items-center flex-wrap gap-2">
            <Button asChild variant="ghost" href="/" title="LinkedIn" className="text-xs lg:text-sm">
              <a href="https://www.linkedin.com/in/dremer10" target="_blank" rel="noreferrer">
                <LinkedInIcon />
                <span className="hidden lg:inline">LinkedIn</span>
              </a>
            </Button>
            <Button asChild variant="ghost" title="Recommendations" className="text-xs lg:text-sm">
              <a href="https://www.linkedin.com/in/dremer10/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noreferrer">
                <Star />
                <span className="hidden lg:inline">Recommendations</span>
              </a>
            </Button>
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                title="Professional Credentials"
                className="text-xs lg:text-sm"
                onClick={() => setCredentialsDropdownOpen(!credentialsDropdownOpen)}
              >
                <Award />
                <span className="hidden lg:inline">Professional Credentials</span>
              </Button>
              {credentialsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                  <div className="py-1">
                    <a
                      href="https://www.credly.com/badges/009b8d08-22da-4cc8-a720-934ea26add1e/linked_in_profile"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                      <Award className="w-4 h-4" />
                      <span>IBM Apprenticeship Program - Professional Skills</span>
                    </a>
                    <a
                      href="https://www.credly.com/badges/6683b6f5-4907-4f11-b139-cbeafcf82cbd/linked_in_profile"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
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
                className="text-xs lg:text-sm"
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
              >
                <Download />
                <span className="hidden lg:inline">Download Resume</span>
              </Button>
              {downloadDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                  <div className="py-1">
                    <a
                      href={ResumePDF}
                      download="Andre_Remer_Resume.pdf"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                      onClick={() => setDownloadDropdownOpen(false)}
                    >
                      <Download className="w-4 h-4" />
                      <span>PDF Format</span>
                    </a>
                    <a
                      href={ResumeDOCX}
                      download="Andre_Remer_Resume.docx"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                      onClick={() => setDownloadDropdownOpen(false)}
                    >
                      <Download className="w-4 h-4" />
                      <span>DOCX Format</span>
                    </a>
                    <button
                      onClick={handleDownloadBoth}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors w-full text-left"
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

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t flex flex-col gap-2">
            <Button asChild variant="ghost" href="/" title="LinkedIn">
              <a href="https://www.linkedin.com/in/dremer10" target="_blank" rel="noreferrer" className="justify-start">
                <LinkedInIcon />
                LinkedIn
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
                <div className="mt-1 ml-4 flex flex-col gap-1 bg-slate-800/50 rounded-lg p-2">
                  <a
                    href="https://www.credly.com/badges/009b8d08-22da-4cc8-a720-934ea26add1e/linked_in_profile"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>Credential 1</span>
                  </a>
                  <a
                    href="https://www.credly.com/badges/6683b6f5-4907-4f11-b139-cbeafcf82cbd/linked_in_profile"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors"
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
                <div className="mt-1 ml-4 flex flex-col gap-1 bg-slate-800/50 rounded-lg p-2">
                  <a
                    href={ResumePDF}
                    download="Andre_Remer_Resume.pdf"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors"
                    onClick={() => setDownloadDropdownOpen(false)}
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF Format</span>
                  </a>
                  <a
                    href={ResumeDOCX}
                    download="Andre_Remer_Resume.docx"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors"
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
        )}
      </div>
    </nav>
  );
}

export default Navbar;

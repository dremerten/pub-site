import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/NavigationMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import {Activity, Code, Download, Award, Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {LinkedInIcon} from "@/components/icons";
import Resume from "../../public/files/Andre-Resume2025-v3.pdf";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Button asChild variant="ghost" href="/" title="Professional Credentials" className="text-xs lg:text-sm">
              <a href="https://www.credly.com/badges/009b8d08-22da-4cc8-a720-934ea26add1e/linked_in_profile" target="_blank" rel="noreferrer">
                <Award />
                <span className="hidden lg:inline">Professional Credentials</span>
              </a>
            </Button>
            <Button asChild variant="ghost" href="/" className="text-xs lg:text-sm">
              <a href={Resume} download>
                <Download />
                <span className="hidden lg:inline">Download Resume</span>
              </a>
            </Button>
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
            <Button asChild variant="ghost" href="/" title="Professional Credentials">
              <a href="https://www.credly.com/badges/009b8d08-22da-4cc8-a720-934ea26add1e/linked_in_profile" target="_blank" rel="noreferrer" className="justify-start">
                <Award />
                Professional Credentials
              </a>
            </Button>
            <Button asChild variant="ghost" href="/">
              <a href={Resume} download className="justify-start">
                <Download />
                Download Resume
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

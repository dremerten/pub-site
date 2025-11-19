import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/NavigationMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import {Activity, Code, Download, Award} from "lucide-react";
import {Button} from "@/components/ui/button";
import {LinkedInIcon} from "@/components/icons";
import Resume from "../../public/files/Andre-Resume2025-v3.pdf";

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="border-b">
      <div className="w-[90%] mx-auto py-4">
        <div className="flex items-center justify-between">
          <NavigationMenu>
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
          <div className="flex items-center">
            <Button asChild variant="ghost" href="/" title="LinkedIn">
              <a href="https://www.linkedin.com/in/dremer10" target="_blank" rel="noreferrer">
                <LinkedInIcon />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="ghost" href="/" title="Professional Credentials">
              <a href="https://www.credly.com/badges/009b8d08-22da-4cc8-a720-934ea26add1e/linked_in_profile" target="_blank" rel="noreferrer">
                <Award />
                Professional Credentials
              </a>
            </Button>
            <Button asChild variant="ghost" href="/">
              <a href={Resume} download>
                <Download />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/NavigationMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import {Activity, Code} from "lucide-react";

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList className="gap-3">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/overview" className={`flex flex-row gap-2 items-center rounded-lg whitespace-nowrap transition-all ${
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
                  <Link to="/resume" className={`flex flex-row gap-2 items-center rounded-lg whitespace-nowrap transition-all ${
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
          {/*<ThemeToggle />*/}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

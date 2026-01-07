import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import { LinkedInIcon } from "@/components/icons";

export function StickyButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
      <Link
        to="/projects"
        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:translate-y-[-2px] attention-bounce"
      >
        My Featured Projects
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
      {/* LinkedIn Button */}
      <a
        href="https://www.linkedin.com/in/dremer10"
        target="_blank"
        rel="noreferrer"
        title="LinkedIn"
        className="group flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <LinkedInIcon className="w-6 h-6" />
      </a>

      {/* GitHub Button */}
      <a
        href="https://github.com/dremerten"
        target="_blank"
        rel="noreferrer"
        title="GitHub"
        className="group flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <Github className="w-6 h-6" />
      </a>
    </div>
  );
}

export default StickyButtons;

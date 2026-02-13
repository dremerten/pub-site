import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Overview from "./pages/Overview.jsx";
import Projects from "./pages/Projects.jsx";
import DevOpsToolkit from "./pages/DevOpsToolkit.jsx";
import SolarSystem from "./pages/SolarSystem.jsx";
import IacSandbox from "./pages/IacSandbox.jsx";
import Resume from "./pages/Resume.jsx";
import About from "./pages/About.jsx";
import AboutShowcase from "./pages/AboutShowcase.jsx";
import Quiz from "./pages/Quiz.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

const AppContent = () => {
  const [appVersion, setAppVersion] = useState(
    import.meta.env.VITE_APP_VERSION || "dev-local"
  );

  useEffect(() => {
    fetch("/version.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.version) {
          setAppVersion(data.version);
        }
      })
      .catch(() => {});
  }, []);
  const appRoutes = [
    {path: "/home", title: "Home", component: Home},
    {path: "/about", title: "About", component: About},
    {path: "/about/showcase", title: "About Showcase", component: AboutShowcase},
    {path: "/overview", title: "Dashboard", component: Overview},
    {path: "/projects", title: "Projects", component: Projects},
    {path: "/resume", title: "Resume", component: Resume},
    {path: "/quiz", title: "Quiz", component: Quiz}
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          {
            appRoutes.map(({path, component: Component}) => (
              <Route key={path} path={path} element={<Component />} />
            ))
          }
          <Route path="/projects/devops-toolkit" element={<DevOpsToolkit />} />
          <Route path="/projects/solar-system-simulator" element={<SolarSystem />} />
          <Route path="/projects/iac-sandbox" element={<IacSandbox />} />
        </Routes>
      </main>
      <div className="fixed left-1/2 bottom-4 -translate-x-1/2 z-40 text-[11px] sm:text-xs text-gray-300 pointer-events-none">
        Running version: {appVersion}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <Router basename={import.meta.env.BASE_URL}>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;

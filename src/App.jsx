import { BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Overview from "./pages/Overview.jsx";
import Projects from "./pages/Projects.jsx";
import DevOpsToolkit from "./pages/DevOpsToolkit.jsx";
import SolarSystem from "./pages/SolarSystem.jsx";
import Resume from "./pages/Resume.jsx";
import About from "./pages/About.jsx";
import AboutShowcase from "./pages/AboutShowcase.jsx";
import Quiz from "./pages/Quiz.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

const AppContent = () => {
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
        </Routes>
      </main>
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

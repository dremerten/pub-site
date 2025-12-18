import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Overview from "./pages/Overview.jsx";
import Projects from "./pages/Projects.jsx";
import Resume from "./pages/Resume.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

const App = () => {
  const appRoutes = [
    {path: "/home", title: "Home", component: Home},
    {path: "/overview", title: "Dashboard", component: Overview},
    {path: "/projects", title: "Projects", component: Projects},
    {path: "/resume", title: "Resume", component: Resume}
  ];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <Router basename={import.meta.env.BASE_URL}>
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
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

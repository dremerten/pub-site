import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import NavigationBar from "./ui-components/NavigationBar.jsx";
import About from "./pages/About.jsx";
import Resume from "./pages/Resume.jsx";
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme} from "./themes/themes";
import {GlobalStyle} from "./themes/Global";

const App = () => {
  const appRoutes = [
    {path: "/about", title: "About", component: About},
    {path: "/resume", title: "Resume", component: Resume}
  ];

  const theme = "light";

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <NavigationBar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
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

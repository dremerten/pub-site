import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import NavigationBar from "./components/NavigationBar.jsx";
import Overview from "./pages/Overview.jsx";
import Resume from "./pages/Resume.jsx";
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme} from "./themes/themes";
import {GlobalStyle} from "./themes/Global";

const App = () => {
  const appRoutes = [
    {path: "/overview", title: "Overview", component: Overview},
    {path: "/resume", title: "Resume", component: Resume}
  ];

  const theme = "light";

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router basename={import.meta.env.BASE_URL}>
        <div>
          <NavigationBar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
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

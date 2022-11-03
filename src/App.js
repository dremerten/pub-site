import React  from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import NavigationBar from "./ui-components/NavigationBar";
import About from "./pages/About";
import Bookstack from "./pages/Bookstack";
import Resume from "./pages/Resume";
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme} from "./themes/themes";
import {GlobalStyle} from "./themes/Global";

const App = () => {
  const appRoutes = [
    {path: "/about", title: "About", component: About},
    {path: "/bookstack", title: "BookStack", component: Bookstack},
    {path: "/resume", title: "Resume", component: Resume}
  ];

  const theme = "light";

  console.log("Host URL"+process.env.PUBLIC_URL);
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <NavigationBar />
          <main className="App">
            <Switch>
              <Route exact path= "/" render={() => (
                <Redirect to="/about"/>
              )}/>
              {
                appRoutes.map(({path, component}) => (
                  <Route key={path} path={path} component={component} />
                ))
              }
            </Switch>
        </main>
        </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;

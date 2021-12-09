import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Home from './components/home/home';
import RegistApt from './components/registApt/registApt';

function App({ authService, openApi }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService} />
          </Route>
          <Route path="/home">
            <Home openApi={openApi} authService={authService}/>
          </Route>
          <Route path="/registApt">
            <RegistApt openApi={openApi} authService={authService}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

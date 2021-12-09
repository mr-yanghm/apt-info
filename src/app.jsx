import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Home from './components/home/home';
import ManageApt from './components/manageApt/manageApt';

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
          <Route path="/manageApt">
            <ManageApt openApi={openApi} authService={authService}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

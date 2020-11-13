import React from 'react';
import PublicPage from './PublicPage/index';
import HomePage from './PublicPage/HomePage';
import About from './PublicPage/about';
import Registration from './Login/Registration';
import Game from './HiddenPage/Game';
import Welcome from './HiddenPage/Welcome';
import bgimg from './images/bgimg.jpg'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div style={{backgroundImage: `url(${bgimg})`, opacity: 0.9, backgroundRepeat: "no-repeat", width: "100%", height: "100vh", backgroundSize: "cover"}}>
        <PublicPage />
        <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/about' component={About} />
        <Route path='/Registration' component={Registration} />
        <Route path='/gameinfo' component={Game} /> 
        <Route path='/welcome' component={Welcome} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;

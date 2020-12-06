import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

//Routing Material
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

//Pages
import DemoPage from "./pages/demo/demo";
import PageNotFound from "./pages/404"
import MainPage from "./pages/index/index";
import CameraView from "./pages/cameraview/cameraview"
import Login from "./pages/login/login"
import Signup from "./pages/signup/signup"
import Welcome from "./pages/welcome/welcome"
import Notification from './pages/notifications/notifications'
import Stream from "./pages/stream/stream"
import Clips from "./pages/clips/clips"
import Account from "./pages/account/account"
import Settings from "./pages/settings/settings"
import WebRTCPeerConnectionWithServer from "./WebRTCPeerConnectionWithServer"
import MediaServerConnection from "./MediaServerConnect"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/404" component={PageNotFound} />
          <Route exact path="/demo" component={DemoPage} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cam_view" component={CameraView} />
          <Route exact path="/notifications" component={Notification} />
          <Route exact path="/stream" component={Stream} />
          <Route exact path="/clips" component={Clips} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/settings" component={Settings}/>
          <Route exact path="/webrtc" component={WebRTCPeerConnectionWithServer} />
          <Route exact path="/msc" component={MediaServerConnection} />

          <Redirect to="/404" />
        </Switch>

      </Router>
    );
  }
}

export default App;

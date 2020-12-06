import React, { Component } from "react";
import './index.css';
import store from 'store';


//Routing
import { Link } from "react-router-dom";


class MainIndexPage extends Component {

  constructor(props) {
    super(props)

    if (store.get('loggedIn') && store.get('accessToken') !== undefined) {
      this.props.history.push({
        pathname: '/welcome',
      });
    }

  };

  componentDidMount() {
    store.clearAll();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h2>
            Economic Home Security System.
        </h2>

          <p>
            Recycle your old smart phones by using them as security cameras.
        </p>

          <Link className="App-link"
            to="/Login"> Login </Link>
          <Link className="App-link"
            to="/Signup"> Sign Up </Link>
          <Link className="App-link"
            to="/Demo"> Demo </Link>

        </header>
      </div>
    );
  }
}




export default MainIndexPage;
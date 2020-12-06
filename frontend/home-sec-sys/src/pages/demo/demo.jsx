import React from 'react';
import './demo.css';
import { Link } from "react-router-dom";


function MainIndexPage() {

  return (
    <div className="App">
      <header className="App-header">

        <h2>
          Demo Page
        </h2>

        {/* <button>Use phone to view Stream</button> */}

        <Link className="App-link"
          to="/cam_view">Use device as camera </Link>
        <Link className="App-link"
          to="/404">Use to view stream </Link>


        
      </header>
    </div>
  );

}

export default MainIndexPage;
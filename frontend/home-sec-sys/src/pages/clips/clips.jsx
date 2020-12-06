import React, { Component } from 'react';
import "./clips.css";
//import "node_modules/video-react/dist/video-react.css";
import ReactPlayer from "react-player";

// import {Player} from 'video-react';
// import { Link } from "react-router-dom";

class Clips extends Component {

 
    constructor(props){
        super(props);

        var urlArray = ["https://www.youtube.com/watch?v=T9vz67FeUkA", "https://www.youtube.com/watch?v=XM52H97P4Tk", "https://www.youtube.com/watch?v=C6ruOHwYrtw", 
        "https://www.youtube.com/watch?v=MQuaMlj1rXg"];

        this.state = {
            myarray : urlArray,
            inputValue : " ",
            url:""
        }
    }


    handleChange = (event) =>{
        this.setState({inputValue : event.target.value})
    }

    // handleSubmit = (event) =>{
    //     event.preventDefault();
    //     this.setState({url: this.state.inputValue})
    // }
    render(){
        
        return(
            <div className="App">
                <header className="App-header">
                        <h2> Here are your clips </h2>
                        <h3> Security Camera 1</h3>
                        <p> 
                            
                        </p>
                        {/* <form onSubmit={this.handleSubmit}>
                            <input onChange={this.handleChange} style={{margin:"20px"}} 
                            className="form-control p-4" type="text" placeholder="a url 4 now"/>
                            <button style={{margin:"20px"}} className="btn btn-primary"> Play your clips</button>
                        </form> */}

                        {
                        this.state.myarray.map((ur) =>{
                            return (<div >
                                <ReactPlayer url = {ur} controls={true}/>
                            </div>)
                        })
                    }
                                        
                        
                   

                </header>
                
            </div>
        );
    }
}
export default Clips
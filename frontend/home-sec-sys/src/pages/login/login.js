import React, { Component } from "react";
import "./login.css";
import store from 'store';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
            username: '',
            encrypted_password: '',
        };
    };

      changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)

        //Post request
        axios.post('https://sdmay20-42.ece.iastate.edu/api/jwt/create/', {
            "username": this.state.username,
            "password": this.state.encrypted_password
        })
        .then(response => {
            console.log(response);
            store.set('loggedIn', true);
            store.set('accessToken', response.data.access)
            
            this.props.history.push({
                pathname: '/welcome',
            });
            
        }).catch(error => {
            alert(error)
            console.log(error)
        });

    }


    render() {

        const {  username, encrypted_password } = this.state

        return (
            <div className="Login">
                <form onSubmit={this.submitHandler}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" placeholder="Enter username" value={username} onChange={this.changeHandler}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="encrypted_password" placeholder="Enter password" value={encrypted_password} onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        {/* Forgot <a href="#">password?</a> */}
                    </p>
                </form>
                                  
            </div>
        );
    }
}

export default Login
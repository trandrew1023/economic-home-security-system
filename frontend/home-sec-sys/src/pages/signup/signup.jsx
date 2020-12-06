import React, { Component } from "react";
import "./signup.css";
import store from 'store';
import axios from 'axios';

class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            encrypted_password: '',
            email: ''
        };
    };


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)

        //Post request
        axios.post('https://sdmay20-42.ece.iastate.edu/api/users/', {
            "username": this.state.username, 
            "first_name": this.state.firstname, 
            "last_name": this.state.lastname, 
            "email": this.state.email, 
            "password": this.state.encrypted_password
        })
            .then(response => {
                console.log(response)
                store.set('username', response.data.username)
                store.set('email', response.data.email)
                store.set('id', response.data.id)
                this.props.history.push({
                    pathname: '/login',
                });
            }).catch(error => {
                alert(error)
            });

    }

    render() {
        const { firstname, lastname, username, encrypted_password, email } = this.state

        return (
            <div className="Login">
                <form onSubmit={this.submitHandler}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" name="firstname" placeholder="First name" value={firstname} onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" name="lastname" placeholder="Last name" value={lastname} onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" placeholder="Username" value={username} onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" value={email} onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="encrypted_password" placeholder="Enter password" value={encrypted_password} onChange={this.changeHandler} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        {/* Already registered <a href="#">sign in?</a> */}
                    </p>
                </form>
            </div>
        );
    }
}

export default Signup
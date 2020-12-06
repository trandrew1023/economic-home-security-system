import React, { Component } from 'react';
import store from 'store';
import "./welcome.css";

import { Link } from "react-router-dom";

class Welcome extends Component {


    constructor(props) {
        super(props)

        if (!store.get('loggedIn') || store.get('accessToken') === undefined) {
            this.props.history.push({
                pathname: '/login',
            });
        }

        this.state = {
            username: store.get('username'),
            firstname: store.get('firstname'),
            lastname: store.get('lastname'),
            id: store.get('lastname')
        };

    };

    // logOut() {
    //     store.clearAll();
    //     this.props.history.push("/")
    // }

    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <h2>
                        Welcome {this.state.username} to your Home Security System
                    </h2>

                    <h2>
                        Choose what you would like to do
                    </h2>

                    <Link
                        className="link-class"
                        to={{
                            pathname: '/Notifications',
                        }}

                    > Notifications
                        </Link>

                    <Link className="link-class"
                        to={{
                            pathname: '/Clips',
                        }}> Stored Clips </Link>

                    <Link className="link-class"
                        to={{
                            pathname: '/Stream',
                        }}>  Current Stream </Link>

                    <Link className="link-class"
                        to={{
                            pathname: '/account',
                        }}> Profile </Link>

                    <Link className="link-class"
                        to={{
                            pathname: '/settings',
                        }}
                    > Settings </Link>

                    <Link className="link-class"
                        to={{
                            pathname: '/cam_view',
                        }}
                    > Use Device as Camera </Link>

                    <Link className="link-class"
                        to={{
                            pathname: '/',
                        }}
                    > Log Out </Link>

                </header>
            </div>
        )
    }
}


export default Welcome
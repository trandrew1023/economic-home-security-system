import React, { Component } from 'react';
import store from 'store';
import "./account.css";


class Account extends Component {

    constructor(props) {
        super(props)

        if (!store.get('loggedIn') || store.get('accessToken') === undefined) {
            this.props.history.push({
                pathname: '/login',
            });
        }
    };


    render(){
        return(
            <div className="App">
                <header className="App-header">
                    <h2> Account </h2>
                </header>
            </div>

        );
    }
}
export default Account
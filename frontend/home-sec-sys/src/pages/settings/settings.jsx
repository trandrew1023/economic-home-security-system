import React, { Component } from 'react';
import "./settings.css";
import store from 'store';
import 'bootstrap/dist/css/bootstrap.min.css';


class Settings extends Component {


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


    render(){
        return(
            <div className="App">
                <header className="App-header">
                    <h2> Settings </h2>

                    <h4> If you would like to edit your system, select form the dropdown</h4>
                    
                     {/* <DropdownButton id="dropdown-button" title="dropdown">
                        <Dropdown.Item href="#/action-1">Person</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Animal</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Package</Dropdown.Item>
                    </DropdownButton>   */}
                </header>
            </div>

        );
    }
}

export default Settings
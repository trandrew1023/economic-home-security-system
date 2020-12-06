import React, { Component } from "react";
import "./notifications.css";
import store from 'store';


import axios from 'axios';

class Notification extends Component {
    constructor(props) {
        super(props)

        if(!store.get('loggedIn') || store.get('username') === undefined){
            this.props.history.push({
                pathname: '/login',
            });
        }


        this.state = {
            data: [],
            username: store.get('username'),
            firstname: store.get('firstname'),
            lastname: store.get('lastname'),
            id: store.get('lastname')
        };

    };

    componentDidMount() {
        this.interval = setInterval(() => {
            axios.get('https://sdmay20-42.ece.iastate.edu/api/notifications/'+this.state.id +'/')
            .then(response => {
                console.log(response);
                this.setState({
                    data: response.data.reverse()
                })

            }).catch(error => {
                console.log(error)
            });

        }, 3000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        const { data } = this.state
        console.log(data);

        return (
            <div className="App">
                <header className="App-header">

                    <h2>
                        Notifications
                    </h2>
                    {
                        this.state.data.map((messageObj) => {
                            return (<div>
                                <p>Time: {Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(messageObj.timestamp)}, Notification: {messageObj.notification}</p>
                            </div>)
                        })
                    }

                </header>
            </div>
        );
    }
}

export default Notification
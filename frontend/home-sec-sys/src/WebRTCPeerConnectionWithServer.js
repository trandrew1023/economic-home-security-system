import React from "react";
import "webrtc-adapter";
import faker from "faker";
import SignalingConnection from "./SignalingConnection";
import PeerConnection from "./PeerConnection";
import {Helmet} from "react-helmet";
import "./webrtc.css";


class WebRTCPeerConnectionWithServer extends React.Component {
    state = {
        startDisabled: true,
        callDisabled: true,
        hangUpDisabled: true,
        localStream: null,
        clientID: new Date().getTime() % 1000,
        username: faker.internet.userName(),
        userList: []
    };

    localVideoRef = React.createRef();
    remoteVideoRef = React.createRef();
    peerConnection = null;
    signalingConnection = null;

    setUsername = () => {
        const { username, clientID } = this.state;
        this.signalingConnection.sendToServer({
            name: username,
            date: Date.now(),
            id: clientID,
            type: "username"
        });
    };

    changeUsername = event =>
        this.setState({
            username: event.target.value
        });

    componentDidMount() {
        // this.signalingConnection = new SignalingConnection({
        //     // socketURL: "localhost:6503",
        //     socketURL: "webrtc-sample-cedgiiiply.now.sh",
        //     // socketURL: "websocket-server-8x45o0a4r.now.sh",
        //     onOpen: () =>
        //         this.setState({
        //             startDisabled: false
        //         }),
        //     onMessage: this.onSignalingMessage
        // });
    }

    onSignalingMessage = msg => {
        console.log("onsignalling message called <----- " + msg.type)
        switch (msg.type) {
            case "id":
                this.setState({
                    clientID: msg.id
                });
                this.setUsername();
                break;

            case "rejectusername":
                this.setState({
                    username: msg.name
                });
                console.log(
                    `Your username has been set to <${
                    msg.name
                    }> because the name you chose is in use`
                );
                break;

            case "userlist": // Received an updated user list
                this.setState({
                    userList: msg.users
                });
                break;

            // // Signaling messages: these messages are used to trade WebRTC
            // // signaling information during negotiations leading up to a video
            // // call.

            case "video-offer": // Invitation and offer to chat
                this.createPeerConnection();
                this.peerConnection.videoOffer(msg);
                break;
        }
    };

    gotStream = stream => {
        this.localVideoRef.current.srcObject = stream;
        this.setState({
            callDisabled: false,
            localStream: stream
        });
    };

    gotRemoteTrack = event => {
        console.log("Got remote track called");
        let remoteVideo = this.remoteVideoRef.current;

        if (remoteVideo.srcObject !== event.streams[0]) {
            remoteVideo.srcObject = event.streams[0];
        }

        this.setState({
            hangUpDisabled: false
        });
    };

    gotRemoteStream = event => {
        console.log("Got remote stream called");

        this.remoteVideoRef.current.srcObject = event.stream;
        this.setState({
            hangUpDisabled: false
        });
    };

    // initMedia = () => {
    //     this.setState({
    //         startDisabled: true
    //     });
    //     navigator.mediaDevices
    //         .getUserMedia({
    //             audio: true,
    //             video: true
    //         })
    //         .then(this.gotStream)
    //         .catch(e => alert("getUserMedia() error:" + e.name));
    // };


    initMedia = () => {
        // this.setState({
        //     startDisabled: true
        // });

        const url = "wss://"+window.location.hostname+":8000";
        console.log(url);

        navigator.mediaDevices.getUserMedia({
			audio: false,
			video: true
        }).then(this.gotStream)
        .then(function(stream){
            // var track = stream.getVideoTracks()[0];
            // console.log("getUserMedia sucess",stream);
            // this.localVideoRef.current.srcObject = stream;

        });


        // navigator.mediaDevices
        //     .getUserMedia({
        //         audio: true,
        //         video: true
        //     })
        //     .then(this.gotStream)
        //     .catch(e => alert("getUserMedia() error:" + e.name));
    };

    call = user => {
        console.log("call called")
        this.setState({
            targetUsername: user
        });
        this.createPeerConnection();
    };

    hangUp = () => {
        this.signalingConnection.sendToServer({
            name: this.state.username,
            target: this.state.targetUsername,
            type: "hang-up"
        });
        this.peerConnection.close();
    };

    createPeerConnection = () => {
        if (this.peerConnection) return;

        this.peerConnection = new PeerConnection({
            gotRemoteStream: this.gotRemoteStream,
            gotRemoteTrack: this.gotRemoteTrack,
            signalingConnection: this.signalingConnection,
            onClose: this.closeVideoCall,
            localStream: this.state.localStream,
            username: this.state.username,
            targetUsername: this.state.targetUsername
        });
    };

    closeVideoCall = () => {
        this.remoteVideoRef.current.srcObject &&
            this.remoteVideoRef.current.srcObject
                .getTracks()
                .forEach(track => track.stop());
        this.remoteVideoRef.current.src = null;

        this.setState({
            targetUsername: null,
            callDisabled: false
        });
    };

    render() {
        const {
            startDisabled,
            callDisabled,
            hangUpDisabled,
            username,
            userList
        } = this.state;

        return (
            <div className="App">
                <script src="svc.js"></script>
                <header className="App-header">
                    <div className="winput">
                        Username:{" "}
                        <input
                            type="text"
                            value={username}
                            onChange={this.changeUsername}
                        />
                        <button onClick={this.setUsername}> Set Username </button>
                    </div>
                    <video
                        ref={this.localVideoRef}
                        autoPlay
                        muted
                        style={{
                            width: "240px",
                            height: "180px"
                        }}
                    />
                    <video
                        ref={this.remoteVideoRef}
                        autoPlay
                        muted
                        style={{
                            width: "240px",
                            height: "180px"
                        }}
                    />
                    <div className="wbutton">
                        <button onClick={this.initMedia} >
                            Init Media
                    </button>
                        <button onClick={this.hangUp} disabled={hangUpDisabled}>
                            Hang Up
                    </button>
                    </div>
                    <div>
                        <ul>
                            {userList.map(user => (
                                <li key={user}>
                                    {user}
                                    {"  "}
                                    {user !== username ? (
                                        <button
                                            onClick={() => this.call(user)}
                                            disabled={callDisabled}
                                        >
                                            Call
                                    </button>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    </div>
                </header>
            </div>
        );
    }
}

export default WebRTCPeerConnectionWithServer;
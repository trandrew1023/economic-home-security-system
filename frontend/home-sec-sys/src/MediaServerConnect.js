import React from "react";
import "webrtc-adapter";
import "./webrtc.css";



class MediaServerConnect extends React.Component {

    state = {
        localStream: null,
    };

    localVideoRef = React.createRef();
    remoteVideoRef = React.createRef();
    peerConnection = null;
    signalingConnection = null;

    pc = null;
    sdp = null;

    gotStream = (stream) => {
        this.localVideoRef.current.srcObject = stream;
       console.log(stream.id)
        this.setState({
            localStream: stream
        });
    };


    initMedia = ()  => {
        const url = "wss://"+window.location.hostname+":8000/";
        this.pc = new RTCPeerConnection();
        console.log(this.pc);
        var ws = new WebSocket(url, "svc");
        ws.onopen = () => {
            console.log("opened");
            console.log(url);
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true
            }).then((stream) => {
                console.log(stream);
                this.gotStream(stream);
                //Add stream to peer connection
                this.pc.addStream(stream);
                return this.pc.createOffer();
            }).then((offer) => {
                console.log("create offer success");
                this.sdp = offer.sdp;
                this.pc.setLocalDescription(offer);
                console.log(this.sdp);
                ws.send(JSON.stringify({
                    cmd		: "OFFER",
				    offer		: this.sdp
                }));
                ws.send(JSON.stringify({
                    cmd		: "SELECT_LAYER",
                    spatialLayerId	: 1,
                    temporalLayerId	: 2
                }));
            }).catch((error) => {
                console.log(error);
            });
        };


        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            console.log("The message answer");

            console.log(msg.answer);

            this.pc.setRemoteDescription(new RTCSessionDescription({
                type:'answer',
				sdp: msg.answer
            }), function() {
                console.log("JOINED");
            }, function (error) {
                console.error("Error joining", error);
            });
        }

        ws.onerror = (error) => {
            console.log("error", error)
        }
    };

    
 

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    {/* <div className="winput">
                        Username:{" "}
                        <input
                            type="text"
                            value={username}
                            onChange={this.changeUsername}
                        />
                        <button onClick={this.setUsername}> Set Username </button>
                    </div> */}
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
                    </div>
                    {/* <div>
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
                    </div> */}
                </header>
            </div>
        );
    }
}

export default MediaServerConnect;

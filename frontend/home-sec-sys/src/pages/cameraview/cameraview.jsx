import React from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import './cameraview.css';
import store from 'store';
// import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props)

    if (!store.get('loggedIn') || store.get('accessToken') === undefined) {
      this.props.history.push({
        pathname: '/login',
      });
    }

    this.state = {
      person_detected_color: '#00FFFF',
      person_detected: false,
      timer_set: false
    };
  };


  videoRef = React.createRef();
  canvasRef = React.createRef();

  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment",
          }
        })
        .then(stream => {
          window.stream = stream;
          console.log(stream);

          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });
      const modelPromise = cocoSsd.load();
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  //If theres a person detected in frame
  personDetectedInFrame() {
    this.setState({
      timer_set: true,
      person_detected: true
    })

    //Run after 5 seconds of someone being detected in the frame
    setTimeout(
      function () {
        if (this.state.person_detected) { //If after 5 seconds the person is still in the frame, they are a danger, start streaming
          this.setState({
            person_detected_color: '#FF0000',
          })


          //Start Streaming
          //Send notification to the server if this is not a demo, IE the user signed in
          // if (typeof this.props.location.state.user != "undefined") {

          //   axios.post('https://sdmay20-42.ece.iastate.edu/api/notifications/', {
          //     user_id: this.props.location.state.user.id,
          //     notification: "A person has been detected by Camera A",
          //     timestamp: Date.now()
          //   })
          //     .then(response => {
          //       console.log(response)

          //     }).catch(error => {
          //       console.log(error)
          //     });

          // }
        } else { //If after 5 seconds, there is no one there, reset back to regular.
          this.setState({
            person_detected_color: '#00FFFF',
            person_detected: false
          })
        }
      }.bind(this), 5000
    )
    console.log("person detected")
  }

  //If theres on one detected in the frame, reset the state.
  personOutOfFrame() {
    this.setState({
      person_detected_color: '#00FFFF',
      person_detected: false,
      timer_set: false
    })
    console.log("person undetected")
  }

  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      // console.log(video)
      this.renderPredictions(predictions);
      // console.log(predictions);
      // console.log(predictions.includes("person"));

      if (predictions.some(item => item.class === 'person') && !this.state.person_detected && !this.state.timer_set) {
        this.personDetectedInFrame()
      } else if (!predictions.some(item => item.class === 'person') && this.state.person_detected) {
        this.personOutOfFrame()
      }

      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  };

  renderPredictions = predictions => {

    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.

      ctx.strokeStyle = "#FF0000";

      if (prediction.class === "person") {
        ctx.strokeStyle = this.state.person_detected_color;
      } else {
        ctx.strokeStyle = "#00FFFF";
      }

      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.

      ctx.fillStyle = "#FF0000";

      if (prediction.class === "person") {
        ctx.fillStyle = this.state.person_detected_color;
      } else {
        ctx.fillStyle = "#00FFFF";
      }

      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
      // console.log(prediction);
    });
  };

  render() {
    return (
      <div className="camView">
        <video
          className="size"
          autoPlay
          muted
          ref={this.videoRef}
          width="600"
          height="500"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="600"
          height="500"
        />
      </div>
    );
  }

}

export default App;


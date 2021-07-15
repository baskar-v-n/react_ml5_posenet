import React, { Component } from 'react';
import './pose-estimation.css';

import ml5 from 'ml5';

class PoseEstimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detected: false
        };
        this.modelLoaded = false;
        this.webCamRef = React.createRef();
    }

    initializeModel() {
        this.poseNet = ml5.poseNet(this.webCamRef.current, () => {
            console.log("Model Initilaized");
            this.modelLoaded = true;
            this.poseNet.on('pose', (result) => {
                this.poses = result;
                console.log(this.poses);            //  See the Console To Identify Poses 
                this.setState({
                    detected: result !== undefined && result.length > 0 ? true : false
                })

            });
        });
    }

    componentDidMount() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available');
        }
        navigator.mediaDevices
            .getUserMedia({
                'audio': false,
                'video': {
                    facingMode: 'user',
                    frameRate: 15,         // Reduce this if there's a stuttering in feed
                },
            }).then(res => {
                if (res != null) {
                    this.stream = res;
                    this.webCamRef.current.srcObject = this.stream;
                    this.webCamRef.current.play();
                    this.initializeModel();
                }
            });
    }

    componentWillUnmount() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }


    render() {
        return (
            <div>
                <video ref={this.webCamRef} className={'po-est__vid'} />
            </div>
        )
    }

}

export default PoseEstimation;
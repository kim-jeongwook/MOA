import React, { Component } from "react";

class UserCam extends Component{
    render(){
        if(this.props.stream) this.video.srcObject=this.props.stream;
        return(
            <video width="100%" height="450vw" ref={(el)=>{this.video=el}} controls></video>
        );
    }
}

export default UserCam;
import React, { Component } from "react";

class UserCam extends Component{
    render(){
        if(this.props.stream) this.video.srcObject=this.props.stream;
        return(
            <div><video ref={(el)=>{this.video=el}} controls></video></div>
        );
    }
}

export default UserCam;
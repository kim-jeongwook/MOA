import React, { Component } from "react";
import { Col } from "react-bootstrap";

class OtherCams extends Component{
    state={
        video:[]
    }
    componentDidMount(){
        if(this.state.video[this.props.index]) this.state.video[this.props.index].srcObject=this.props.stream;
        else this.setState({});
    }
    render(){
        return(
            <div><video width="30%" ref={(el)=>{this.state.video[this.props.index]=el}} controls></video></div>
        );
    }
}

export default OtherCams;
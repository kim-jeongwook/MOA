import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class Time extends Component{
    state ={
        time: "00:00:00",
    }

    componentDidMount(){
        /////////////////////////////////////////////////////////////////////////////
        // 시간 받기
        /////////////////////////////////////////////////////////////////////////////
        this.props.es.addEventListener("time", (result) => {
            this.setState({
                time: result.data.replace(/\"/g, ""),
            });
        });
    }
 
    render(){
        return <span>{this.state.time}</span>;
    }
}

export default Time;
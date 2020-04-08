import React, { Component } from "react";

class Time extends Component{
    state ={
        time: "00:00:00",
    }

    /* constructor(props){
        super(props);
        
    } */
    /////////////////////////////////////////////////////////////////////////////
    // 시간 받기
    /////////////////////////////////////////////////////////////////////////////
    req_time = () => {
        this.props.es.addEventListener("time", (result) => {
            this.setState({
                time: result.data,
            });
        });
    }

    componentDidMount(){
        this.req_time();
    }
 
    render(){
        return (
            <span>
                {this.state.time}
            </span>
        );
    }
}

export default Time;
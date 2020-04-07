import React, { Component } from "react";

class Time extends Component{
    state ={
        time: "00:00:00",
    }

    /////////////////////////////////////////////////////////////////////////////
    // sse 시간 받기
    /////////////////////////////////////////////////////////////////////////////
    sse = () => {
        this.props.es.onmessage = (e) => {
            this.setState({
                time: e.data,
            });
        };
    }

    componentDidMount(){
        this.sse();
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
import React, { Component } from "react";

class HeadCount extends Component{
    state ={
        headCount: 0,
    }

    componentDidMount = () => {
        this.props.es.addEventListener("headcount", (result) => {
            this.setState({
                headCount: result.data.replace(/\"/g, ""),
            });
        });
    }

    render(){
        return(<span>{this.state.headCount}</span>);  
    }
}

export default HeadCount
import React, { Component } from "react";

class Chat extends Component{
    render(){
        this.props.io.emit("chat","~~~")//채팅가능
        return(
            <div>chat</div>
        );
    }
}

export default Chat;
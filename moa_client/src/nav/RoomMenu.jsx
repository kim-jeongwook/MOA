import React, { Component } from "react";

class RoomMenu extends Component{
    render(){
        const menuStyle = { float: "right", margin: "1vw" };

        return(
            <div>
                <span style={menuStyle}>일정</span>
                <span style={menuStyle}>회의록</span>
            </div>
        );
    }
}

export default RoomMenu;
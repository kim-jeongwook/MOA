import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class RoomMenu extends Component{
    render(){
        return(
            <Nav>
                <Nav.Link>일정</Nav.Link>
                <Nav.Link>회의록</Nav.Link>
            </Nav>
        );
    }
}

export default RoomMenu;
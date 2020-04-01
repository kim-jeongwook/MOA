import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class LoginedMenu extends Component{
    render(){
        return(
            <Nav>
                <Nav.Link onClick={this.props.UserInfo}>내 정보</Nav.Link>
                <Nav.Link onClick={this.props.NotLogined}>로그아웃</Nav.Link>
            </Nav>
        );
    }
}

export default LoginedMenu;
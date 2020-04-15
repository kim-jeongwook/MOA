import React, { Component } from "react";
<<<<<<< HEAD
import { Nav } from "react-bootstrap";

class LoginedMenu extends Component{
    render(){
        return(
            <Nav>
                <Nav.Link onClick={this.props.UserInfo}>내 정보</Nav.Link>
                <Nav.Link onClick={this.props.NotLogined}>로그아웃</Nav.Link>
            </Nav>
        );
=======
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";

class LoginedMenu extends Component {
  logout = async () => {
    try {
      const result = await axios.get(process.env.REACT_APP_REQ + process.env.REACT_APP_REQ_LOGOUT);
      alert(result.data.message);
      this.props.NotLogined();
    } catch (err) {
      console.log(err);
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1
    }
  };

  render() {
    return (
      <Navbar bg="light" variant="light">
          <Navbar.Brand 
              onClick={this.props.Logined} 
              className="mr-auto">
              CompanyLogo
          </Navbar.Brand>
          <Nav>
            <Nav.Link onClick={this.props.UserInfo}>내 정보</Nav.Link>
            <Nav.Link onClick={this.logout}>로그아웃</Nav.Link>
          </Nav>
      </Navbar>
        
    );
  }
}

export default LoginedMenu;

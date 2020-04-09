import React, { Component } from "react";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";

class LoginedMenu extends Component {
  logout = async () => {
    try {
      const result = await axios.get("http://localhost:8080/member/logout");
      alert(result.data.message);
      this.props.NotLogined();
    } catch (err) {
      console.log(err);
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

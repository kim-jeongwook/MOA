import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../redux/reduxFun";
import { Navbar } from "react-bootstrap";

import LoginedMenu from "./LoginedMenu";
import RoomMenu from "./RoomMenu";

class Navigation extends Component {
    render(){
        let navView;

        switch(this.props.pageValue){
            case "NotLogined":
            case "Signup":
<<<<<<< HEAD
                navView = <div></div>;
=======
                navView = 
                <Navbar bg="light" variant="light">
                    <Navbar.Brand 
                        onClick={this.props.NotLogined} 
                        className="mr-auto">
                        CompanyLogo
                    </Navbar.Brand>
                </Navbar>;
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1
                break;
                
            case "Logined":
            case "UserInfo":
            case "CreateRoom":
<<<<<<< HEAD
                navView = <LoginedMenu 
                    NotLogined={this.props.NotLogined}
                    UserInfo={this.props.UserInfo}
=======
                navView = 
                    <LoginedMenu 
                        Logined={this.props.Logined}
                        NotLogined={this.props.NotLogined}
                        UserInfo={this.props.UserInfo}
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1
                    />;
                break;

            case "InRoom":
                navView = <RoomMenu Logined= {this.props.Logined} roomInfo={this.props.roomInfo} />;
                break;

            default:
                // 잘못된 접근. 로그 남기고 무슨 값 들어왔는지 체크해야됨
                // 404페이지로 전환
                navView = <span style={{float: "right"}}>404page</span>;
                break;
        }

<<<<<<< HEAD
        return(
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/" className="mr-auto">CompanyLogo</Navbar.Brand>
                {navView}
            </Navbar>
        );
=======
        return(<div>{navView}</div>);
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
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
                navView = <div></div>;
                break;
                
            case "Logined":
            case "UserInfo":
            case "CreateRoom":
                navView = <LoginedMenu 
                    NotLogined={this.props.NotLogined}
                    UserInfo={this.props.UserInfo}
                    />;
                break;

            case "InRoom":
                navView = <RoomMenu />;
                break;

            default:
                // 잘못된 접근. 로그 남기고 무슨 값 들어왔는지 체크해야됨
                // 404페이지로 전환
                navView = <span style={{float: "right"}}>404page</span>;
                break;
        }

        return(
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/" className="mr-auto">CompanyLogo</Navbar.Brand>
                {navView}
            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
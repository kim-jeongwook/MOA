import React, { Component } from "react";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../redux/reduxFun";

import LoginedMenu from "./LoginedMenu";
import RoomMenu from "./RoomMenu";

class Navigation extends Component {
    render(){
        let navView;

        switch(this.props.pageValue){
            case "NotLogined":
                navView = <div></div>;
                break;
                
            case "Logined":
            case "UserInfo":
            case "Signup":
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

        // style
        const headerStyle = {
            overflow: "hidden",
            backgroundColor: "f1f1f1",
            padding: "20px 10px",
        };

        const logoStyle = {
            fontSize: "25px",
            fontWeight: "bold",
        };

        return(
            <div style={headerStyle}>
                <a href="/" style={logoStyle}>CompanyLogo</a>
                {navView}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
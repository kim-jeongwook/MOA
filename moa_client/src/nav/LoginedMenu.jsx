import React, { Component } from "react";

class LoginedMenu extends Component{
    render(){
        const menuStyle = { float: "right", margin: "1vw" };

        return(
            <div>
                <div style={menuStyle} onClick={this.props.UserInfo} >내 정보</div>
                <div style={menuStyle} onClick={this.props.NotLogined}>로그아웃</div>
            </div>
        );
    }
}

export default LoginedMenu;
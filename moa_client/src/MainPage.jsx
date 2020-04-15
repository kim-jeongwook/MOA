import React, { Component } from "react";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./redux/reduxFun";

import NotLoginedPage from "./page/NotLoginedPage";
import Posts from "./page/Posts";
import UserInfo from "./page/UserInfo"
import Room from "./page/Room";
import SignupPage from "./page/SignupPage";
import CreateRoomPage from "./page/CreateRoomPage";

<<<<<<< HEAD
class MainPage extends Component{
    render(){
        let pageView;

        switch(this.props.pageValue){
            case "NotLogined":
                pageView = <NotLoginedPage  
                    Logined={this.props.Logined} 
                    Signup={this.props.Signup}/>;
                break;

            case "Logined":
                pageView = <Posts CreateRoom={this.props.CreateRoom} />;
                break;

            case "UserInfo":
                pageView = <UserInfo />;
                break;

            case "InRoom":
                pageView = <Room />;
                break;

            case "Signup":
                pageView = <SignupPage />
                break;

            case "CreateRoom":
                pageView = <CreateRoomPage />
                break;

            default:
                // 잘못된 접근. 로그 남기고 무슨 값 들어왔는지 체크해야됨
                // 404 페이지로 전환
                pageView = <NotLoginedPage />;
                break;
        }

        return (
            <div>{pageView}</div>
        );
    }
=======
class MainPage extends Component {
  render() {
    let pageView;

    switch (this.props.pageValue) {
      case "NotLogined":
        pageView = (
          <NotLoginedPage
            Logined={this.props.Logined}
            Signup={this.props.Signup}
          />
        );
        break;

      case "Logined":
        pageView = (
          <Posts
            InRoom={this.props.InRoom}
            CreateRoom={this.props.CreateRoom}
          />
        );
        break;

      case "UserInfo":
        pageView = <UserInfo NotLogined={this.props.NotLogined} />;
        break;

      case "InRoom":
        pageView = (
          <Room Logined={this.props.Logined} InRoom={this.props.InRoom} roomInfo={this.props.roomInfo} />
        );
        break;

      case "Signup":
        pageView = <SignupPage NotLogined={this.props.NotLogined} />;
        break;

      case "CreateRoom":
        pageView = <CreateRoomPage Logined={this.props.Logined} />;
        break;

      default:
        // 잘못된 접근. 로그 남기고 무슨 값 들어왔는지 체크해야됨
        // 404 페이지로 전환
        pageView = <NotLoginedPage />;
        break;
    }

    return <div className="mt-4">{pageView}</div>;
  }
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
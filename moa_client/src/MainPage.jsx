import React, { Component } from "react";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./redux/reduxFun";

import NotLoginedPage from "./page/NotLoginedPage";
import Posts from "./page/Posts";
import UserInfo from "./page/UserInfo";
import Room from "./page/Room";
import SignupPage from "./page/SignupPage";

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
        pageView = <Posts CreateRoom={this.props.CreateRoom} />;
        break;

      case "UserInfo":
        pageView = <UserInfo />;
        break;

      case "InRoom":
        pageView = <Room />;
        break;

      case "Signup":
        pageView = <SignupPage />;
        break;

      default:
        // 잘못된 접근. 로그 남기고 무슨 값 들어왔는지 체크해야됨
        // 404 페이지로 전환
        pageView = <NotLoginedPage />;
        break;
    }

    return <div>{pageView}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

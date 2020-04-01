import React, { Component } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // 같은 origin이라 보증
const headers = { withCredentials: true };

class NotLoginedPage extends Component {
  Logined = async () => {
    const send_param = {
      headers,
      email: this._id.value,
      password: this._pw.value
    };

    try {
      const result = await axios.post(
        "http://localhost:8080/member/Login",
        send_param
      );

      alert(result.data.msg);
      if (result.data.resultCode) {
        this.props.Logined();
      } else {
        this._id.value = "";
        this._pw.value = "";
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const ImgStyle = {
      backgroundImage: "url(/img/page_img_1.jpg)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      height: "30vw"
    };

    const containerStyle = {
      position: "absolute",
      right: 0,
      margin: "40px",
      maxWidth: "300px",
      padding: "16px",
      backgroundColor: "white"
    };

    const inputStyle = {
      width: "90%",
      padding: "15px",
      margin: "5px 0 22px 0",
      border: "none",
      background: "#f1f1f1"
    };

    const loginBtnStyle = {
      backgroundColor: "#4CAF50",
      color: "white",
      marginRight: "2%",
      padding: "16px 20px",
      border: "none",
      cursor: "pointer",
      width: "48%",
      opacity: "0.9"
    };

    const signupBtnStyle = {
      backgroundColor: "#6666ff",
      color: "white",
      padding: "16px 20px",
      border: "none",
      cursor: "pointer",
      width: "50%",
      opacity: "0.9"
    };

    return (
      <div style={ImgStyle}>
        <div style={containerStyle}>
          <h1>시작해볼까요?</h1>
          <label>
            <b>Email</b>
          </label>
          <input
            ref={ref => (this._id = ref)}
            type="email"
            placeholder="Enter Email"
            style={inputStyle}
            required
          />
          <label>
            <b>Password</b>
          </label>
          <input
            ref={ref => (this._pw = ref)}
            type="password"
            placeholder="Enter Password"
            style={inputStyle}
            required
          />
          <button onClick={this.Logined} style={loginBtnStyle}>
            로그인
          </button>
          <button onClick={this.props.Signup} style={signupBtnStyle}>
            회원가입
          </button>
        </div>
      </div>
    );
  }
}

export default NotLoginedPage;

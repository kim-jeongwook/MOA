import React, { Component } from "react";

class NotLoginedPage extends Component{
    render(){
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
            backgroundColor: "white",
        }

        const inputStyle = {
            width: "90%",
            padding: "15px",
            margin: "5px 0 22px 0",
            border: "none",
            background: "#f1f1f1",
        }

        const loginBtnStyle = {
            backgroundColor: "#4CAF50",
            color: "white",
            marginRight: "2%",
            padding: "16px 20px",
            border: "none",
            cursor: "pointer",
            width: "48%",
            opacity: "0.9",
        };

        const signupBtnStyle = {
            backgroundColor: "#6666ff",
            color: "white",
            padding: "16px 20px",
            border: "none",
            cursor: "pointer",
            width: "50%",
            opacity: "0.9",
        };

        return (
            <div style={ImgStyle}>
                <div style={containerStyle}>
                    <h1>Login</h1>

                    <label><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email" style={inputStyle} required />

                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" style={inputStyle} required />

                    <button onClick={this.props.Logined} style={loginBtnStyle} >로그인</button>
                    <button onClick={this.props.Signup} style={signupBtnStyle} >회원가입</button>
                </div>
            </div>
        );
    }
}

export default NotLoginedPage;
import React, { Component } from "react";
import { Jumbotron, Form, Button } from "react-bootstrap";
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

    return (
      <div style={ImgStyle}>
          <Jumbotron className="float-right my-4 mr-5">
              <Form>
                  <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="email" />
                  </Form.Group>
              
                  <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                  </Form.Group>

                  <Form.Group controlId="buttons">
                  <Button onClick={this.props.Logined} variant="primary">
                  로그인
                  </Button>
                  <Button onClick={this.props.Signup} variant="default">
                  회원가입
                  </Button>
                  </Form.Group>
              </Form>
          </Jumbotron>
      </div>
    );
  }
}

export default NotLoginedPage;

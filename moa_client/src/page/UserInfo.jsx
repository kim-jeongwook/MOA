import React, { Component } from "react";
import axios from "axios";
import { Jumbotron, Form, Button } from "react-bootstrap";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class UserInfo extends Component {
  Deletemember = async () => {
    const send_param = {
      headers,
      email: this._id.value,
      password: this._pw.value
    };
    try {
      const result = await axios.post(
        "http://localhost:8080/member/deletemember",
        send_param
      );
      alert(result.data.msg);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div>
        <Jumbotron className="float my-4 mr-5">
          내정보<br></br>
          <br></br>
          이메일:
          <br></br>
          닉네임:<input></input>
          <br></br>
          <Button variant="primary">정보 수정</Button>
          <br></br>
          <input ref={ref => (this._id = ref)} placeholder="아이디써"></input>
          <br></br>
          <input ref={ref => (this._pw = ref)} placeholder="비밀번호"></input>
          <Button onClick={this.Deletemember} variant="primary">
            회원 탈퇴
          </Button>
        </Jumbotron>
      </div>
    );
  }
}

export default UserInfo;

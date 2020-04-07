import React, { Component } from "react";
import axios from "axios";
import { Jumbotron, Form, Button } from "react-bootstrap";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class UserInfo extends Component {
  Memberupdate = async () => {
    const send_param = {
      headers,
      email: this._id.value,
      nickname: this._nickname.value,
      profileimg: this._img.value,
      password: this._pw.value,
    };

    const result = await axios.post(
      "http://localhost:8080/member/memberupdate",
      send_param
    );
    alert(result.data.msg);
  };

  Deletemember = async () => {
    const send_param = {
      email: this._id2.value,
      password: this._pw2.value,
    };
    try {
      const result = await axios.post(
        "http://localhost:8080/member/deletemember",
        send_param
      );
      alert(result.data.msg);
      console.log(result.data.resultCode);
      if (result.data.resultCode) {
        this.props.NotLogined();
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div>
        <Jumbotron className="float my-4 mr-5">
          내정보<br></br>
          아이디:
          <div></div>
          <input ref={(ref) => (this._id = ref)} placeholder="아이디"></input>
          <br></br>
          닉네임 :
          <input
            ref={(ref) => (this._nickname = ref)}
            placeholder="닉네임"
          ></input>
          프로필사진 :
          <input
            ref={(ref) => (this._img = ref)}
            placeholder="이미지.jpg"
          ></input>
          <br></br>
          비밀번호 :
          <input ref={(ref) => (this._pw = ref)} placeholder="비밀번호"></input>
          <br></br>
          비밀번호확인 :
          <input
            ref={(ref) => (this._pw1 = ref)}
            placeholder="비밀번호확인"
          ></input>
          <br></br>
          <br></br>
          <Button onClick={this.Memberupdate} variant="primary">
            정보 수정
          </Button>
          <br></br>
          <input ref={(ref) => (this._id2 = ref)} placeholder="아이디"></input>
          <input
            ref={(ref) => (this._pw2 = ref)}
            placeholder="비밀번호"
          ></input>
          <br></br>
          <Button onClick={this.Deletemember} variant="primary">
            회원 탈퇴
          </Button>
        </Jumbotron>
      </div>
    );
  }
}

export default UserInfo;

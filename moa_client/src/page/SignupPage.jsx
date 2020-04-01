import React, { Component } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // 같은 origin이라 보증
const headers = { withCredentials: true };

class SignupPage extends Component {
  state = {
    _id: ""
  };
  Join = async () => {
    try {
      const send_param = {
        headers,
        email: this._id.value,
        password: this._pw.value,
        nickname: this._nickname.value,
        f_profile: this._f_profile.value
      };

      const joinup_result = await axios.post(
        "http://localhost:8080/member/signup",
        send_param
      );
      if (joinup_result.data.resultCode) {
        alert(joinup_result.data.msg);

        // 가입이 성공하면 modal창 닫기
        this.ModalSwitch(false);
      } else {
        alert(joinup_result.data.msg);

        // 가입이 실패하면 입력창을 다 비워준다
        this._email.value = "";
        this._password.value = "";
        this._nickname.value = "";
        this._f_profile.value = "";
      }
    } catch (err) {
      // 에러 처리
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        회원가입<br></br>
        프로필사진 :{" "}
        <input
          ref={ref => (this._f_profile = ref)}
          placeholder="이미지.jpg"
        ></input>
        <br></br>
        닉네임 :{" "}
        <input ref={ref => (this._nickname = ref)} placeholder="닉네임"></input>
        <br></br>
        아이디 :{" "}
        <input ref={ref => (this._id = ref)} placeholder="아이디"></input>
        <br></br>
        비밀번호 :{" "}
        <input ref={ref => (this._pw = ref)} placeholder="비밀번호"></input>
        <br></br>
        비밀번호확인 :{" "}
        <input ref={ref => (this._pw1 = ref)} placeholder="비밀번호"></input>
        <br></br>
        <button onClick={this.Join}>회원가입</button>
      </div>
    );
  }
}

export default SignupPage;

import React, { Component } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // 같은 origin이라 보증

class SignupPage extends Component {
  state = {
    _id: "",
  };
  checkEmail = (id) => {
    var check_Email = id.search(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    );

    if (check_Email < 0) {
      alert("이메일 형식이 유효하지 않습니다.");
      return false;
    }
    return true;
  };

  checkPassword = (id, password) => {
    var checkNumber = password.search(/[0-9]/g);

    var checkEnglish = password.search(/[a-z]/gi);

    if (checkNumber < 0 || checkEnglish < 0) {
      alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");

      return false;
    }

    if (/(\w)\1\1\1/.test(password)) {
      alert("비밀번호는 444같은 문자를 4번 이상 사용하실 수 없습니다.");

      return false;
    }

    if (password.search(id) > -1) {
      alert("비밀번호에 아이디가 포함되었습니다.");

      return false;
    }

    return true;
  };

  Join = async () => {
<<<<<<< HEAD
    if (
      this.checkEmail(this._id.value) &&
      this.checkPassword(this._id.value, this._pw.value)
    ) {
      try {
        const send_param = {
          headers,
          email: this._id.value,
          password: this._pw.value,
          nickname: this._nickname.value,
          f_profile: this._f_profile.value,
        };
=======
    try {
      const send_param = {
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
>>>>>>> 0f7541b797b3b86dcf3432c8503a4acac938c0a5

        const joinup_result = await axios.post(
          "http://localhost:8080/member/signup",
          send_param
        );
        alert(joinup_result.data.msg);
        if (joinup_result.data.resultCode) {
          this.props.NotLogined();
        } else {
          alert("다시 입력하고 가입하세요.");
          /* // 가입이 실패하면 입력창을 다 비워준다
          this._email.value = "";
          this._password.value = "";
          this._nickname.value = "";
          this._f_profile.value = ""; */
        }
        /* if(checkPassword(_email,_password))
         */
      } catch (err) {
        // 에러 처리
        console.log(err);
      }
    }
  };

  render() {
    return (
      <div>
        회원가입<br></br>
        아이디 :{" "}
        <input ref={(ref) => (this._id = ref)} placeholder="아이디"></input>
        프로필사진 :{" "}
        <input
          ref={(ref) => (this._f_profile = ref)}
          placeholder="이미지.jpg"
        ></input>
        <br></br>
        닉네임 :{" "}
        <input
          ref={(ref) => (this._nickname = ref)}
          placeholder="닉네임"
        ></input>
        <br></br>
        비밀번호 :{" "}
        <input ref={(ref) => (this._pw = ref)} placeholder="비밀번호"></input>
        <br></br>
        비밀번호확인 :{" "}
        <input ref={(ref) => (this._pw1 = ref)} placeholder="비밀번호"></input>
        <br></br>
        <button onClick={this.Join}>회원가입</button>
      </div>
    );
  }
}

export default SignupPage;

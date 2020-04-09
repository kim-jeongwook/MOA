import React, { Component } from "react";
import axios from "axios";
import { Jumbotron, Form, Button } from "react-bootstrap";
import {
  getByDisplayValue,
  getDefaultNormalizer,
} from "@testing-library/react";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class UserInfo extends Component {
  state = {
    //////// 프로필 image 업로드 및 미리보기 위한 state
    file: "",
    previewURL: "",
    img_originalname: "",
    id: "",
  };

  //////////////////////////////////////////
  /////회원 정보수정, 탈퇴시 로그인 유지 기능//////////////
  ////////////////////////////////////////
  getEmail = async () => {
    try {
      const result = await axios.post("http://localhost:8080/member/getEmail", {
        headers,
      });
      if (result.data.email) {
        this.setState({
          id: result.data.email,
        });
      }
    } catch (err) {}
  };

  componentDidMount() {
    this.getEmail();
  }
  /////////////////////////////////////////////////////////////
  /////회원 정보수정시 정규식을 이용한 비밀번호 로직//////////////
  //////////////////////////////////////////////////////////////
  checkPassword = (password) => {
    if (!/^[a-zA-Z0-9]{8,15}$/.test(password)) {
      alert("숫자와 영문자 조합으로 8~15자리를 사용해야 합니다.");

      return false;
    }
    var checkNumber = password.search(/[0-9]/g);

    var checkEnglish = password.search(/[a-z]/gi);

    https: if (checkNumber < 0 || checkEnglish < 0) {
      alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");

      return false;
    }

    if (/(\w)\1\1\1/.test(password)) {
      alert("비밀번호는 444같은 문자를 4번 이상 사용하실 수 없습니다.");

      return false;
    }

    if (this._pw.value !== this._pw1.value) {
      alert("비밀번호를 다릅니다 다시 확인하세영");
      return false;
    }

    return true;
  };
  //////////////////////////////////////////
  /////회원 정보 수정 기능//////////////
  ////////////////////////////////////////
  Memberupdate = async () => {
    const originalname = this.state.img_originalname; ////// 프로필 image 등록 후, setState로 파일의 originalname 받아옴
    if (this.checkPassword(this._pw.value)) {
      try {
        const send_param = {
          headers,
          email: this._id.value,
          nickname: this._nickname.value,
          profileimg: originalname, //// DB에 originalname 으로 저장되게 함
          password: this._pw.value,
        };

        const result = await axios.post(
          "http://localhost:8080/member/memberupdate",
          send_param
        );
        alert(result.data.msg);
        if (result.data.resultCode) {
          alert("회원정보 수정 성공");
        } else {
          alert("다시 입력하세요.");
        }
      } catch (err) {
        // 에러 처리
        console.log(err);
      }
    }
  };
  //////////////////////////////////////////
  /////회원 탈퇴 기능//////////////
  ////////////////////////////////////////

  Deletemember = async () => {
    const send_param = {
      email: this._id.value,
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

  //////////////////////////////////////////
  /////프로필 이미지 업로드 기능//////////////
  ////////////////////////////////////////
  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile_img", event.target.profile_img.files[0]);
    this.register(formData);
  };
  register = (regiInfo) => {
    fetch("http://localhost:8080/member/img_upload", {
      method: "post",
      body: regiInfo,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        this.setState({
          img_originalname: data.originalname,
        });
      });
  };

  ///// 이미지 미리보기 기능, 사이즈 조절은 아직...
  handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    let profile_preview = null;
    if (this.state.file !== "") {
      profile_preview = (
        <img className="profile_preview" src={this.state.previewURL}></img>
      );
    }
    return (
      <div>
        <Jumbotron className="float my-4 mr-5">
          내정보<br></br>
          아이디:
          <input
            ref={(ref) => (this._id = ref)}
            defaultValue={this.state.id}
            readOnly
            disabled
          ></input>
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
          ></input>{" "}
          <br></br>
          비밀번호 :
          <input  type="password" ref={(ref) => (this._pw = ref)} placeholder="비밀번호"></input>
          <br></br> 
          비밀번호확인 :
          <input type="password"
            ref={(ref) => (this._pw1 = ref)}
            placeholder="비밀번호확인"
          ></input>
          <br></br>
          <br></br>
          <Button onClick={this.Memberupdate} variant="primary">
            정보 수정
          </Button>
          <br></br>
          <input type="password"
            ref={(ref) => (this._pw2 = ref)}
            placeholder="비밀번호"
          ></input>
          <Button onClick={this.Deletemember} variant="primary">
            회원 탈퇴
          </Button>
        </Jumbotron>
      </div>
    );
  }
}

export default UserInfo;

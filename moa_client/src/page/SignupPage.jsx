import React, { Component } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // 같은 origin이라 보증
const headers = { withCredentials: true };

class SignupPage extends Component {
  state = {
    //////// 프로필 image 업로드 및 미리보기 위한 state
    _id: "",
    file: "",
    previewURL: "",
    img_originalname: "",
  };
  /////////////////////////////////////////////////////////////////
  /////회원가입시 아이디를 이메일 형식으로 제한하는 기능//////////////
  //////////////////////////////////////////////////////////////////
  checkEmail = (id) => {
    var check_Email = id.search(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    );

    if (check_Email < 0) {
      alert("아이디는 이메일 형식이여야 합니다.");
      return false;
    }
    return true;
  };
  ////////////////////////////////////////////////////////////
  /////회원가입시 정규식을 이용한 비밀번호 로직  //////////////
  ///////////////////////////////////////////////////////////
  checkPassword = (id, password) => {
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

    if (password.search(id) > -1) {
      alert("비밀번호에 아이디가 포함되었습니다.");

      return false;
    }
    if (this._pw.value !== this._pw1.value) {
      alert("비밀번호를 다릅니다 다시 확인하세영");
      return false;
    }

    return true;
  };

  //////////////////////////////////////////
  /////회원가입 기능 //////////////
  ////////////////////////////////////////
  Join = async () => {
    const originalname = this.state.img_originalname; ////// 프로필 image 등록 후, setState로 파일의 originalname 받아옴

    if (
      this.checkEmail(this._id.value) &&
      this.checkPassword(this._id.value, this._pw.value)
    ) {
      try {
        const send_param = {
          email: this._id.value,
          password: this._pw.value,
          nickname: this._nickname.value,
          f_profile: originalname, //// DB에 originalname 으로 저장되게 함
        };

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
        회원가입<br></br>
        아이디 :{" "}
        <input ref={(ref) => (this._id = ref)} placeholder="아이디"></input>
        <br />
        프로필사진 :{" "}
        {/* <input type='file'
          ref={(ref) => (this._f_profile = ref)}
          placeholder="이미지.jpg"
        ></input> */}
        <form
          name="accountFrm"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <p>
            <input
              ref={(ref) => (this._f_profile = ref)}
              type="file"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              name="profile_img"
              onChange={this.handleFileOnChange}
            ></input>
          </p>
          {profile_preview}
          <p>
            <input type="submit" value="사진등록"></input>
          </p>
        </form>
        <br></br>
        닉네임 :{" "}
        <input
          ref={(ref) => (this._nickname = ref)}
          placeholder="닉네임"
        ></input>
        <br></br>
        비밀번호 :{" "}
        <input
          type="password"
          ref={(ref) => (this._pw = ref)}
          placeholder="비밀번호"
        ></input>
        <br></br>
        비밀번호확인 :{" "}
        <input
          type="password"
          ref={(ref) => (this._pw1 = ref)}
          placeholder="비밀번호"
        ></input>
        <br></br>
        <button onClick={this.Join}>회원가입</button>
      </div>
    );
  }
}

export default SignupPage;

import React, { Component } from "react";
import axios from "axios";
import { Jumbotron, Form, Button } from "react-bootstrap";

axios.defaults.withCredentials = true;

class UserInfo extends Component {
  
  state = {      //////// 프로필 image 업로드 및 미리보기 위한 state
    file:'',
    previewURL:'',
    img_originalname:''
  };

  Memberupdate = async () => {
    const originalname=this.state.img_originalname  ////// 프로필 image 등록 후, setState로 파일의 originalname 받아옴

    const send_param = {
   
      email: this._id.value,
      nickname: this._nickname.value,
      profileimg: originalname,   //// DB에 originalname 으로 저장되게 함
      password: this._pw.value,
      passwordcheck: this._pw1.value,
    };
    const result = await axios.post(
      "http://localhost:8080/member/memberupdate",
      send_param
    );
    alert(result.data.msg);
  };

  Deletemember = async () => {
    const send_param = {
      email: this._id.value,
      password: this._pw.value,
    };
    try {
      const result = await axios.post(
        "http://localhost:8080/member/deletemember",
        send_param
      );
      alert(result.data.msg);

      /*   if () {
        this.props.NotLogined();
      } */
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
    formData.append('profile_img', event.target.profile_img.files[0]);
    this.register(formData)
  }
  register = (regiInfo) => {
    fetch('http://localhost:8080/member/img_upload', {
      method:'post',
      body: regiInfo
    })
    .then(res => res.json())
    .then((data) => {
      alert(data.msg);
      this.setState({
       img_originalname:data.originalname
      })
      
    })
  }

  

  ///// 이미지 미리보기 기능, 사이즈 조절은 아직...
  handleFileOnChange=(event)=>{
    event.preventDefault();
    let reader= new FileReader();
    let file=event.target.files[0];
    reader.onloadend=()=>{
        this.setState({
            file:file,
            previewURL: reader.result
        })
    }
    reader.readAsDataURL(file);
  }

  render() {
    let profile_preview=null;
    if(this.state.file !== ''){
        profile_preview=<img className='profile_preview' src={this.state.previewURL}></img>
    }
    return (
      <div>
        <Jumbotron className="float my-4 mr-5">
          내정보<br></br>
          아이디: {""}
          <input ref={(ref) => (this._id = ref)} placeholder="아이디"></input>
          <br></br>
          닉네임 :{" "}
          <input
            ref={(ref) => (this._nickname = ref)}
            placeholder="닉네임"
          ></input>
          프로필사진 :{" "}
          <form name='accountFrm' onSubmit={this.handleSubmit} encType='multipart/form-data'>
          <p><input ref={ref=>this.change_pro_img=ref} type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' name='profile_img' onChange={this.handleFileOnChange}></input></p>
          {profile_preview}
          <p><input type='submit' value='사진등록'></input></p>
        </form>
          {/* <input
            ref={(ref) => (this._img = ref)}
            placeholder="이미지.jpg"
          ></input> */}
          <br></br>
          비밀번호 :{" "}
          <input ref={(ref) => (this._pw = ref)} placeholder="비밀번호"></input>
          <br></br>
          비밀번호확인 :{" "}
          <input
            ref={(ref) => (this._pw1 = ref)}
            placeholder="비밀번호"
          ></input>
          <br></br>
          <br></br>
          <Button onClick={this.Memberupdate} variant="primary">
            정보 수정
          </Button>
          <br></br>
          <input ref={(ref) => (this._id = ref)} placeholder="아이디써"></input>
          <br></br>
          <input ref={(ref) => (this._pw = ref)} placeholder="비밀번호"></input>
          <Button onClick={this.Deletemember} variant="primary">
            회원 탈퇴
          </Button>
        </Jumbotron>
      </div>
    );
  }
}

export default UserInfo;

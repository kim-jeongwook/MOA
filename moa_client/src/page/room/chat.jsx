import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

////////////////////////////////////////////////////////////
//////////////////////// chatform 클래스/////////////////////
/////////////////////////////////////////////////////////////
class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", message: "", filename: "", file_originalname: "" };
  }

  /////
  // 채팅 및 파일 경로 DB에 저장
  /////
  chatSave = async () => {
    const send_param = {
      room_id: this.props.room,
      name: this.state.name,
      message: this.state.message,
      filename: this.state.filename,
      file_originalname: this.state.file_originalname,
    };
    try {
      const result = await axios.post(
        "http://localhost:8080/file/chat",
        send_param
      );
    } catch (err) {
      console.log(err);
    }
  };

  // '전송' 버튼 실행 함수
  send = () => {
    this.chatSave();
    this.setState(
      { name: this.a.value, message: this.b.value, filename: this.c.value },
      () => {
        this.props.io.emit("chat-msg", {
          name: this.state.name,
          message: this.state.message,
          filename: "",
        });
      }
    );
  };

  // 파일 업로드 실행 함수, 이름/메시지도 같이 보내짐
  fileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile_img", event.target.profile_img.files[0]);
    this.register(formData);
  };
  register = (regiInfo) => {
    fetch("http://localhost:8080/file/file", {
      method: "post",
      body: regiInfo,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        this.setState(
          {
            name: this.a.value,
            message: this.b.value,
            filename: data.filename,
            file_originalname: data.originalname,
          },
          () => {
            this.props.io.emit("chat-msg", {
              name: this.state.name,
              message: this.state.message,
              filename: data.originalname,
              originalname: this.state.filename
            });
            this.chatSave();
            this.a.value = "";
            this.b.value = "";
            this.c.value = "";
          }
        );
      });
  };

  render() {
    return (
      <div>
        이름 : <input ref={(ref) => (this.a = ref)} />
        메시지 : <input ref={(ref) => (this.b = ref)} />
        <button onClick={this.send}>전송</button>
        <form
          name="accountFrm"
          onSubmit={this.fileUpload}
          encType="multipart/form-data"
        >
          <p>
            <input
              ref={(ref) => (this.c = ref)}
              type="file"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              name="profile_img"
            ></input>
          </p>
          <p>
            <input type="submit" value="파일전송"></input>
          </p>
        </form>
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////
///////////////////Chat 클래스////////////////////////////////
/////////////////////////////////////////////////////////////
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    };
  }

  // chatForm에서 emit => server에서 on후 emit=> 여기서 on
  componentDidMount() {
    this.props.io.on("chat-msg", (obj) => {
      const logs2 = this.state.logs;
      obj.key = "key_" + (this.state.logs.length + 1);
      console.log(obj);
      logs2.unshift(obj);
      this.setState({ logs: logs2 });
    });
  }

  // 파일 다운로드
  downloadEmployeeData = (file, origin) => {
    fetch("http://localhost:8080/file/download", {
      method:"post",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({fn:file, kind:origin}),
      credentials: "include" 
    })
    .then((response) => {
      response.blob()
      .then((blob) => {
          console.log(blob);
          let a = document.createElement("a");
          let url=window.URL.createObjectURL(blob);
          a.href=url;
          a.download="파일";
          a.click();
        });
      }
    );
  };

  render() {
    const messages = this.state.logs.map((e) => (
      <div key={e.key}>
        <span>{e.name}</span>
        <span>: {e.message}</span>
        <span>: {e.filename}</span>
        <span onClick={this.downloadEmployeeData.bind(this, e.originalname, e.filename)}>다운로드</span>
        <p style={{ clear: "both" }} />
      </div>
    ));
    return (
      <div>
                        <h1>실시간 채팅</h1>
        <ChatForm room={this.props.room} io={this.props.io} />
        <div>{messages}</div>
      </div>
    );
  }
}
export default Chat;

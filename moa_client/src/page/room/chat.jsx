import React, { Component } from "react";
import "./chat.css";
import axios from "axios";

axios.defaults.withCredentials = true;

class Chat extends Component {
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
				process.env.REACT_APP_REQ + process.env.REACT_APP_REQ_CHAT,
				send_param
			);
		} catch (err) {
			console.log(err);
		}
	};

	downloadEmployeeData = (file, origin) => {
		fetch(process.env.REACT_APP_REQ + process.env.REACT_APP_REQ_FILE_DOWNLOAD, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ fn: file, kind: origin }),
			credentials: "include",
		}).then((response) => {
			response.blob().then((blob) => {
				console.log(blob);
				let a = document.createElement("a");
				let url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = "파일";
				a.click();
			});
		});
	};
	////////////////////////////////////////////////
	////////server에서 emit한거 on하는 부분////////
	/////////////////////////////////////////////
	componentDidMount = () => {
		/* 접속 되었을 때 실행 */
		/* 이름을 입력받고 */
		var name = prompt("반갑습니다!", "");
		/* 이름이 빈칸인 경우 */
		if (!name) {
			name = "익명";
		}
		/* 서버에 새로운 유저가 왔다고 알림 */
		this.props.io.emit("newUser", name);
		/* 서버로부터 데이터 받은 경우 */
		this.props.io.on("update", function (data) {
			var chat = document.getElementById("chat");
			var message = document.createElement("div");
			var node = document.createTextNode(`${data.name}: ${data.message}`);
			var className = "";
			// 타입에 따라 적용할 클래스를 다르게 지정
			switch (data.type) {
				case "message":
					className = "other";
					break;
				case "connect":
					className = "connect";
					break;
				case "disconnect":
					className = "disconnect";
					break;
			}
			message.classList.add(className);
			message.appendChild(node);
			chat.appendChild(message);
		});

		/* 서버로부터 파일 데이터 받은 경우 */
		this.props.io.on("file_update", (data) => {
			var chat = document.getElementById("chat");

			var message = document.createElement("div");
			var node = document.createTextNode(`${data.file_originalname}`);
			var className = "";

			// 타입에 따라 적용할 클래스를 다르게 지정
			switch (data.type) {
				case "message":
					className = "other";
					break;
				case "file":
					className = "other";
					break;

				case "connect":
					className = "connect";
					break;

				case "disconnect":
					className = "disconnect";
					break;
			}

			message.classList.add(className);
			message.appendChild(node);
			message.addEventListener(
				"click",
				this.downloadEmployeeData.bind(
					this,
					data.filename,
					data.file_originalname
				)
			);
			chat.appendChild(message);
		});
	};

	//////* 메시지 전송 함수 *///////
	send = () => {
		this.chatSave();
		const message = this.test.value;
		this.test.value = "";
		/*     // 입력되어있는 데이터 가져오기
    var message = document.getElementById('test').value
    
    // 가져왔으니 데이터 빈칸으로 변경
    document.getElementById('test').value = '' */

		// 내가 전송할 메시지 클라이언트에게 표시
		var chat = document.getElementById("chat");
		var msg = document.createElement("div");
		var node = document.createTextNode(message);
		msg.classList.add("me");
		msg.appendChild(node);
		chat.appendChild(msg);

		// 서버로 message 이벤트 전달 + 데이터와 함께
		this.props.io.emit("message", { type: "message", message: message });
	};

	fileUpload2 = () => {
		const file_originalname = this.state.file_originalname;
		var chat = document.getElementById("chat");
		var msg = document.createElement("div");
		var node = document.createTextNode(file_originalname);
		msg.classList.add("me");
		msg.appendChild(node);
		msg.addEventListener("click", () => {
			this.downloadEmployeeData(
				this.state.filename,
				this.state.file_originalname
			);
		});
		chat.appendChild(msg);

		// 서버로 message 이벤트 전달 + 데이터와 함께
		this.props.io.emit("file", {
			type: "file",
			file_originalname: file_originalname,
			filename: this.state.filename,
		});
	};

	// 파일 업로드 실행 함수, 이름/메시지도 같이 보내짐
	fileUpload = async (event) => {
		event.stopPropagation();
		event.preventDefault();

		// 드래그앤드롭하면 파일이 들어옴
		const files = event.target.files || event.dataTransfer.files;

		// 파일 하나만
		if (files.length > 1) {
			alert("하나만 올려라.");
			return;
		}

		// 파일을 FormData에 담아서 서버로 전송
		try {
			const formData = new FormData();
			formData.append("profile_img", files[0]);
			const result = await axios.post(
				process.env.REACT_APP_REQ + process.env.REACT_APP_REQ_FILE_UPLOAD,
				formData
			);

			if (result.data.resultCode) {
				alert(result.data.msg);
				this.setState({
					filename: result.data.filename,
					file_originalname: result.data.file_originalname,
				});

				this.fileUpload2();
				this.chatSave();
			} else {
				console.log("파일을 넣을 수 없음");
			}
		} catch (err) {
			console.log("파일 전송 오류");
		}
	};

	DragHandler = (event) => {
		event.stopPropagation();
		event.preventDefault();
	};

	render() {
		return (
			<div id="main" onDrop={this.fileUpload} onDragOver={this.DragHandler}>
				                <div id="chat"></div>
				<div>
					<input
						type="text"
						ref={(ref) => (this.test = ref)}
						placeholder="메시지를 입력해주세요.."
					/>
					<button onClick={this.send}>전송</button>
				</div>
				            
			</div>
		);
	}
}
export default Chat;

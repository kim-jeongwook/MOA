import React, { Component } from "react";
import socketio from "socket.io-client";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

import UserCam from "./room/UserCam";
import OtherCams from "./room/OtherCams";
import Chat from "./room/chat";
import ClientList from "./room/ClientList";

axios.defaults.withCredentials = true;

var io = socketio.connect(process.env.REACT_APP_SOCKET);
const configuration = {
	iceServers: [
		{
			urls: process.env.REACT_APP_ICESERVER,
		},
	],
};
var pc = new RTCPeerConnection(configuration);

class Room extends Component {
	constructor(props) {
		super(props);
		io.emit("join", this.props.roomInfo.room_id);
		this.state = {
			otherCams: [],
			selfstream: null,
		};
	}

	req_outRoom = async (id) => {
		console.log(id);
		try {
			const result = await axios.post(process.env.REACT_APP_REQ + process.env.REACT_APP_REQ_ROOM_OUT, {
				id,
			});
			if(result){
				io.disconnect();
			io.connect();
			}
		} catch (err) {
			console.log(err);
		}
	};

	componentDidMount() {
		io.on("sdp", (evt) => {
			var signal = JSON.parse(evt);
			pc.setRemoteDescription(signal.sdp);
			pc.createAnswer(
				(desc) => {
					pc.setLocalDescription(desc);
					io.emit("answer", JSON.stringify({ sdp: desc }));
				},
				(err) => {}
			);
		});
		io.on("answer", (evt) => {
			var signal = JSON.parse(evt);
			pc.setRemoteDescription(
				new RTCSessionDescription(signal.sdp),
				(err) => {}
			);
		});
		io.on("onicecandidate", (evt) => {
			var signal = JSON.parse(evt);
			console.log(signal.candidate);
			if (signal.candidate)
				pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
		});

		io.on("out", (evt) => {
			for (var i = 0; i < this.state.otherCams.length; i++) {
				if (this.state.otherCams[i].key === evt)
					this.state.otherCams.splice(i, 1);
			}
			this.setState({});
		});

		navigator.getUserMedia(
			{ audio: true, video: true },
			(stream) => {
				pc = new RTCPeerConnection(configuration);
				pc.addStream(stream);

				pc.onaddstream = (evt) => {
					var tag = (
						<OtherCams
							key={evt.stream.id}
							index={evt.stream.id}
							stream={evt.stream}
						/>
					);
					this.state.otherCams.push(tag);
					this.setState({});
				};
				pc.onicecandidate = function (evt) {
					io.emit(
						"onicecandidate",
						JSON.stringify({ candidate: evt.candidate })
					);
				};

				pc.createOffer(
					(desc) => {
						pc.setLocalDescription(desc);
						io.emit("sdp", JSON.stringify({ sdp: desc }));
					},
					(err) => {}
				);

				io.emit("stream", stream.id);
				this.setState({
					selfstream: stream,
				});
			},
			function (err) {}
		);
	}

	componentWillUnmount = () => {
		this.props.roomInfo.es.close();
		this.req_outRoom(this.props.roomInfo.room_id);
	};

	render() {
		return (
			<Container fluid className="mx-2">
				<Row>
					<Col xs={8}>
						<Row>
							<UserCam stream={this.state.selfstream} />
						</Row>
						<Row>{this.state.otherCams}</Row>
					</Col>
					<Col>
						<Row>
							<ClientList es={this.props.roomInfo.es} />
						</Row>
						<Row>
							<Chat room={this.props.roomInfo.room_id} io={io} />
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Room;

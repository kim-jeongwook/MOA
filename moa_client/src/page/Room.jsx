import React, { Component } from "react";
import socketio from "socket.io-client";

import UserCam from "./room/UserCam";
import OtherCams from "./room/OtherCams";
import Chat from "./room/chat";

const io=socketio.connect("ws://localhost:8080"); //ip수정 및 room setting 필요
var pc=new RTCPeerConnection();

class Room extends Component{
    state={
        otherCams:[],
        selfstream:null
    }
    componentDidMount(){
        function gotDescription(desc) {
            pc.setLocalDescription(desc);
            io.emit("sdp",JSON.stringify({ "sdp": desc }));
        }
        pc.onicecandidate = function (evt) {
            io.emit("onicecandidate", JSON.stringify({ "candidate": evt.candidate}));
        };
        pc.onaddstream = (evt)=>{
            var tag=<OtherCams key={evt.stream.id} index={evt.stream.id} stream={evt.stream}/>
            this.state.otherCams.push(tag);
            this.setState({});
        };
        
        io.on("onicecandidate", (evt)=>{
            var signal=JSON.parse(evt);
            if(signal.candidate) pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
        })
        io.on("sdp", (evt)=>{
            var signal=JSON.parse(evt);
            if(pc.localDescription)
            {
                pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
                pc.createAnswer(gotDescription,(err)=>{});
            }
        })
        io.on("out", (evt)=>{
            for(var i=0; i<this.state.otherCams.length; i++)
            {
                if(this.state.otherCams[i].key==evt) this.state.otherCams.splice(i,1);
            }
            this.setState({});
        })
        
        navigator.getUserMedia({ "audio": true, "video": true }, (stream)=>{
            this.setState({
                selfstream:stream
            });
            io.emit("stream", stream.id);
            pc.addStream(stream);
            pc.createOffer(gotDescription,(err)=>{});
        },function(err){});
    }
    render(){
        const row = {
            display: "table",
            width: "100%",
        };

        const column = {
            display: "table-cell",
        };
    
        return(
            <div>
                <div style={row}>
                    <div style={column}>
                        <UserCam stream={this.state.selfstream}/>
                    </div>
                    <div style={column}>
                        {this.state.otherCams}
                    </div>
                    <div style={column}>
                        <Chat io={io}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Room;
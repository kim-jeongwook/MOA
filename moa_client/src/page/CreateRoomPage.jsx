import React, { Component } from "react";

class CreateRoomPage extends Component{
    render(){
        return(
            <div class="container">
                <form>
                    <label>방 이름</label>
                    <input type="text" style={inputStyle} placeholder="이름" />

                    <label>URL</label>
                    <input type="text" style={inputStyle} placeholder="URL" />

                    <label>비밀방 여부</label>
                    <input type="checkbox" style={inputStyle} value="secret_room" />

                    <label>비밀번호</label>
                    <input type="password" style={inputStyle} placeholder="비밀번호" />
                   
                    <button>만들기</button>
                    <button>뒤로</button>
                </form>
            </div>
        );
    }
}

export default CreateRoomPage;
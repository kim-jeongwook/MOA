import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;

class CreateRoomPage extends Component{
    /////////////////////////////////////////////
    // checkbox 상태 체크
    /////////////////////////////////////////////
    state = {
        checked: false
    };

    handleChange = (e) => {
        const { target: { checked } } = e;
        this.setState({ checked });
    };

    /////////////////////////////////////////////
    // 글 내용 보내기
    /////////////////////////////////////////////
    req_createRoom = async () => {
        const send_param = this.state.checked? 
        {
            title: this._room_title.value,
            url: this._room_url.value,
            isSecret: this.state.checked,
            password: this._room_pw.value,
        } : 
        {
            title: this._room_title.value,
            url: this._room_url.value,
            isSecret: this.state.checked,
        };

        try{
            const result = await axios.post("http://localhost:8080/room/create", send_param);
            if(result.data.resultCode){
                alert(result.data.msg);
                this.props.Logined();
            } else {
                this._room_title.value = "";
                this._room_url.value = "";
                this._room_pw = "";
                this.setState({ checked: false });
            }
        } catch(err){
            console.log(err);
        }
    }

    render(){
        const inputPwd = this.state.checked? 
        <Form.Group>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" ref={ref=>this._room_pw=ref} placeholder="비밀번호" />
        </Form.Group> :
        <div></div>;

        return(
            <Form style={{ width: "50%", margin: "0 auto" }}>
                <Form.Group>
                    <Form.Label>방 이름</Form.Label>
                    <Form.Control type="text"  ref={ref=>this._room_title=ref} placeholder="이름" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>URL</Form.Label>
                    <Form.Control type="text"  ref={ref=>this._room_url=ref} placeholder="URL" />
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" 
                    checked={this.state.checked}
                    onChange={this.handleChange} 
                    label="비밀방 여부" />
                </Form.Group>
                {inputPwd}
                
                <Row>
                    <Col><Button block onClick={this.req_createRoom} variant="primary">만들기</Button></Col>
                    <Col><Button block onClick={this.props.Logined} variant="outline-default">뒤로</Button></Col>
                </Row>
            </Form>
        );
    }
}

export default CreateRoomPage;
import React, { Component } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../redux/reduxFun";

import axios from "axios";
axios.defaults.withCredentials = true;

class Posts extends Component{
    state = {
        public_rooms: [],
        my_rooms: [],
    }

    /////////////////////////////////////////////////////////////////////
    // 방 들어가기
    /////////////////////////////////////////////////////////////////////
    req_enterRoom = async (id) => {
        try{
            const result = await axios.post("http://localhost:8080/room/enter", { id });
            if(result.data.resultCode){
                this.props.InRoom(result.data.msg);
            } else {
                console.log(result.data.msg);
            }
        } catch(err) {
            console.log(err);
        }
    }

    /////////////////////////////////////////////////////////////////////
    // 공개방, 자신이 참여했던 방을 불러옴
    /////////////////////////////////////////////////////////////////////
    componentDidMount = async () => {
        try{
            const result = await axios.get("http://localhost:8080/room");     
            this.setState({
                public_rooms: result.data.msg.public_rooms,
                my_rooms: result.data.msg.my_rooms,
            });
        } catch(err){
            console.log(err);
        }
    }

    render(){
        const public_rooms = this.state.public_rooms.length === 0?
            <tr><td className="text-center" colSpan="7">공개된 미팅룸이 없습니다</td></tr> : 
            this.state.public_rooms.map((room) => {
                return (<tr onClick={() => this.req_enterRoom(room.id)} key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.room_name}</td>
                    <td>{room.room_url}</td>
                    <td>{room.is_secret}</td>
                    <td>{room.password}</td>
                    <td>{room.master_id}</td>
                    <td>{room.createdAt}</td>
                </tr>);
            });

            const my_rooms = this.state.my_rooms.length === 0?
            <tr><td className="text-center" colSpan="7">참가한 미팅룸이 없습니다</td></tr> : 
            this.state.my_rooms.map((room) => {
                return (<tr onClick={() => this.req_enterRoom(room.id)} key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.room_name}</td>
                    <td>{room.room_url}</td>
                    <td>{room.is_secret}</td>
                    <td>{room.password}</td>
                    <td>{room.master_id}</td>
                    <td>{room.createdAt}</td>
                </tr>);
            });
       
        return(
            <Container>
                <Button onClick={this.props.CreateRoom} variant="outline-dark">+ 미팅룸 만들기</Button>
                <h1>내가 참여한 미팅룸</h1>
                <Table bordered hover className="my-4">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>url</th>
                            <th>secret</th>
                            <th>password</th>
                            <th>masterid</th>
                            <th>createdAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {my_rooms}
                    </tbody>
                </Table>
                <hr/>
                <h1>공개 미팅룸</h1>
                <Table bordered hover className="my-4">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>url</th>
                            <th>secret</th>
                            <th>password</th>
                            <th>masterid</th>
                            <th>createdAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {public_rooms}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
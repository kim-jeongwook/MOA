import React, { Component } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../redux/reduxFun";

import axios from "axios";

class Posts extends Component{
    state = {
        rooms: [],
    }

    componentDidMount = async () => {
        try{
            const result = await axios.get("http://localhost:8080/room");       
            this.setState({
                rooms: result.data.msg
            });
        } catch(err){
            console.log(err);
        }
    }

    render(){
        const rooms = this.state.rooms.length === 0?
            <tr><td className="text-center" colSpan="7">참가한 미팅룸이 없습니다</td></tr> : 
            this.state.rooms.map((room) => {
                return (<tr key={room.id}>
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
                <Button onClick={this.props.InRoom} >시험용 room</Button>
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
                        {rooms}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
import React, { Component } from "react";
<<<<<<< HEAD
import { Button, Table } from "react-bootstrap";
=======
import { Jumbotron, Card, Row, Col, Button } from "react-bootstrap";
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../redux/reduxFun";

import axios from "axios";
<<<<<<< HEAD

class Posts extends Component{
    state = {
        rooms: [],
    }

    componentDidMount = async () => {
        try{
            const result = await axios.get("http://localhost:8080/room");
            console.log(result);
            
            this.setState({
                rooms: result.data.msg
            });
           
        } catch(err){
            if (!err.response) {
                // network error
                console.log("Network Error");
                return;
            } else {
                console.log(err.response.data.message);
            }
        }
    }

    render(){
        const rooms = this.state.rooms.map((room) => {
            return (<td>{room}</td>);
        });

        const btnStyle = {
            border: "2px solid black",
            backgroundColor: "white",
            color: "black",
            padding: "14px 28px",
            fontSize: "16px",
            cursor: "pointer",
            /* Gray */
            borderColor: "#e7e7e7",
            Color: "black",
        }
       
        return(
            <div>
                <div onClick={this.props.InRoom}>Posts</div>
                <button onClick={this.props.CreateRoom} style={btnStyle}>+ 미팅룸 만들기</button>
                <table>
                    <tbody>
                    <tr>
                        {rooms}
                    </tr>
                    </tbody>
                </table>
            </div>
=======
axios.defaults.withCredentials = true;

class Posts extends Component {
  state = {
    public_rooms: [],
    my_rooms: [],
  };

  /////////////////////////////////////////////////////////////////////
  // 방 들어가기
  /////////////////////////////////////////////////////////////////////
  req_enterRoom = async (id) => {
    try {
      const result = await axios.post(process.env.REACT_APP_REQ + process.env.REACT_APP_REQ_ROOM_ENTER, {
        id,
      });
      if (result.data.resultCode) {
        const room = result.data.msg;
        room.es = new EventSource(
          process.env.REACT_APP_REQ + process.env.REACT_APP_REQ_ROOMSSE + room.room_id,
          { credentials: "include" }
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1
        );
        this.props.InRoom(result.data.msg);
      } else {
        console.log(result.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /////////////////////////////////////////////////////////////////////
  // 공개방, 자신이 참여했던 방을 불러옴
  /////////////////////////////////////////////////////////////////////
  componentDidMount = async () => {
    try {
      const result = await axios.get(process.env.REACT_APP_REQ + process.env.REACT_APP_REQ_ROOMLIST);
      this.setState({
        public_rooms: result.data.msg.public_rooms,
        my_rooms: result.data.msg.my_rooms,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const my_rooms =
      this.state.my_rooms.length === 0 ? (
        <Col className="text-center">공개된 미팅룸이 없습니다</Col>
      ) : (
        this.state.my_rooms.map((room, index) => {
          return (
            <Col key={index} sm={3}>
              <Card
                className="my-3"
                onClick={() => this.req_enterRoom(room.id)}
                key={room.id}
              >
                <Card.Body>
                  <Card.Title>{room.room_name}</Card.Title>
                  <Card.Text>url : {room.room_url}</Card.Text>
                  <Card.Text>비밀방 여부 : {room.is_secret}</Card.Text>
                  <Card.Text>방장 : {room.master_id}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      );

    const public_rooms =
      this.state.public_rooms.length === 0 ? (
        <Col className="text-center">공개된 미팅룸이 없습니다</Col>
      ) : (
        this.state.public_rooms.map((room) => {
          return (
            <Col sm={3}>
              <Card
                className="my-3"
                onClick={() => this.req_enterRoom(room.id)}
                key={room.id}
              >
                <Card.Body>
                  <Card.Title>{room.room_name}</Card.Title>
                  <Card.Text>url : {room.room_url}</Card.Text>
                  <Card.Text>비밀방 여부 : {room.is_secret}</Card.Text>
                  <Card.Text>방장 : {room.master_id}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      );

    return (
      <div>
        <Button onClick={this.props.CreateRoom} variant="outline-dark">+ 미팅룸 만들기</Button>
        <Jumbotron className="mx-4">
          <h1>내가 생성한 미팅방</h1>
          <hr />
          <Row>{my_rooms}</Row>
        </Jumbotron>
        <hr />
        <Jumbotron className="mx-4">
          <h1>공개 미팅방</h1>
          <hr />
          <Row>{public_rooms}</Row>
        </Jumbotron>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
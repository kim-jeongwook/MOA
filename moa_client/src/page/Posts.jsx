import React, { Component } from "react";
import { Jumbotron, Card, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../redux/reduxFun";

import axios from "axios";
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
      const result = await axios.post("http://localhost:8080/room/enter", {
        id,
      });
      if (result.data.resultCode) {
        const room = result.data.msg;
        room.es = new EventSource(
          "http://localhost:8080/room/sse?t=" + room.room_id,
          { credentials: "include" }
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
      const result = await axios.get("http://localhost:8080/room");
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
        this.state.my_rooms.map((room) => {
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

{
  /* <Button onClick={this.props.CreateRoom} variant="outline-dark">+ 미팅룸 만들기</Button>
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
                </Table> */
}

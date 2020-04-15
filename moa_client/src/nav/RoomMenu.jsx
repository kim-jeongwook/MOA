import React, { Component } from "react";
<<<<<<< HEAD
import { Nav } from "react-bootstrap";
=======
import { Navbar, Nav, Button, ButtonGroup } from "react-bootstrap";
import { PeopleCircle, Clock } from 'react-bootstrap-icons';
import Time from "./Time";
import HeadCount from "./HeadCount";
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1

class RoomMenu extends Component{
    render(){
        return(
<<<<<<< HEAD
            <Nav>
                <Nav.Link>일정</Nav.Link>
                <Nav.Link>회의록</Nav.Link>
            </Nav>
=======
            <Navbar bg="light" variant="light">
                <Nav className="mr-auto">
                    <Nav.Item><Nav.Link>{this.props.roomInfo.room_name} |</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link><PeopleCircle />  <HeadCount es={this.props.roomInfo.es} /></Nav.Link></Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item className="mr-2"><Nav.Link><Clock /> <Time es={this.props.roomInfo.es}/></Nav.Link></Nav.Item>
                    <Nav.Item><ButtonGroup>
                        <Button onClick={this.props.Logined} variant="outline-dark">나가기</Button>
                        <Button variant="outline-secondary">일정</Button>
                        <Button variant="outline-secondary">회의록</Button>
                    </ButtonGroup></Nav.Item>
                </Nav>
            </Navbar>
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1
        );
    }
}

export default RoomMenu;
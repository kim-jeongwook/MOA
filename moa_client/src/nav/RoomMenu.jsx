import React, { Component } from "react";
import { Navbar, Nav, Button, ButtonGroup } from "react-bootstrap";
import { PeopleCircle, Clock } from 'react-bootstrap-icons';
import Time from "./Time";
import HeadCount from "./HeadCount";

class RoomMenu extends Component{
    render(){
        return(
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
        );
    }
}

export default RoomMenu;
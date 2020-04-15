import React, { Component } from "react";
import { ListGroup, Container } from "react-bootstrap";

class ClientList extends Component{
    state ={
        clients: [],
    }

    /////////////////////////////////////////////////////////////////////////////
    // 채팅방 클라이언트 목록 받기
    /////////////////////////////////////////////////////////////////////////////
    componentDidMount(){
        this.props.es.addEventListener("clients", (result) => {
            const client_chunk = [];
            result.data.replace(/[\[\]\"]/gi, "").split(/,/gi).forEach((email) => {
                client_chunk.push(email);
            });
            if(this.state.clients.length !== client_chunk.length)
                this.setState({ clients: client_chunk });
        });
    }
 
    render(){
        let form_ClientList = this.state.clients.map((client, index) => {
            return <ListGroup.Item key={index} >{client}</ListGroup.Item>;
        });
        
        return (
            <Container fluid><ListGroup>
                <ListGroup.Item variant="dark">채팅 참여자</ListGroup.Item>
                {form_ClientList}
            </ListGroup></Container>
        );
    }
}

export default ClientList;
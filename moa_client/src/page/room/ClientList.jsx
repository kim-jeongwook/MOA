import React, { Component } from "react";

class ClientList extends Component{
    state ={
        clients: "",
    }

    /////////////////////////////////////////////////////////////////////////////
    // 채팅방 클라이언트 목록 받기
    /////////////////////////////////////////////////////////////////////////////
    req_ClientList = () => {
        this.props.es.addEventListener("clients", (result) => {
            this.setState({
                clients: result.data,
            });
        });
    }

    componentDidMount(){
        this.req_ClientList();
    }
 
    render(){
        /* const form_ClientList = this.state.clients.map((client) => {
            return <tr><td>{client}</td></tr>;
        });  */
        return (
            <span>
                <table>
                    <tbody>
                        <tr><td>{this.state.clients}</td></tr>
                    </tbody>
                </table>
            </span>
        );
    }
}

export default ClientList;
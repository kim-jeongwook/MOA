import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
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
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
import React, { Component } from "react";
import socketio from 'socket.io-client';
import {Link} from 'react-router-dom';

const socket=socketio.connect('http://localhost:8080');

/* class Chat extends Component{
    render(){
        this.props.io.emit("chat","~~~")//채팅가능
        return(
            <div>chat</div>
        );
    }
}

export default Chat; */

class ChatForm extends Component{
    constructor (props){
        super(props)
        this.state={name:'', message:'', filename:''}
    }
    send=()=>{
        this.setState({name:this.a.value, message:this.b.value, filename:this.c.value},()=>{
            socket.emit('chat-msg', {
            name: this.state.name,
            message: this.state.message,
            filename:''
        })

    })
       
    }
    
    
    fileUpload=(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('profile_img', event.target.profile_img.files[0]);
        this.register(formData)
        
        this.a.value=""
        this.b.value=""
        this.c.value=""
    }
    register = (regiInfo) => {
        fetch('http://localhost:8080/file/file', {
          method:'post',
          body: regiInfo
        })
        .then(res => res.json())
        .then(data => {
            alert(data.msg);
            this.setState({name:this.a.value, message:this.b.value, filename:data.filename}, ()=>{
                socket.emit('chat-msg', {
                    name: this.state.name,
                    message: this.state.message,
                    filename: this.state.filename
                })
            })
        })
    }
    
    
    render() {
        
        return(
            <div>
                <form>
                    이름 : <input ref={ref=>this.a=ref} />
                    메시지 : <input ref={ref=>this.b=ref} />
                    <button onClick={this.send}>전송</button>

                    <form name='accountFrm' onSubmit={this.fileUpload} encType='multipart/form-data'>
                    <p><input ref={ref=>this.c=ref} type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' name='profile_img'></input></p>
                    <p><input type='submit' value='파일전송'></input></p>
                    </form>
                  
                    
                </form>
                
            </div>
        )
    }
}
class Chat extends Component {
    constructor (props) {
        super(props)
            this.state ={
                logs: []
            }
    }

    componentDidMount () {
        socket.on('chat-msg', (obj) =>{
            const logs2 = this.state.logs
            obj.key='key_' + (this.state.logs.length +1)
            console.log(obj)
            logs2.unshift(obj)
            this.setState({logs: logs2})
        })
    }


    // 파일 다운로드 
    downloadEmployeeData = () => { // 아직 미완성.. 서버에 있는 파일 path 받아오는 법을 모르겠음
		fetch('http://localhost:8080/download')
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'employees.json'; // 다운로드 되는 파일 예시
					a.click();
				});
				//window.location.href = response.url;
		});
    }
    
    render() {
    const messages=this.state.logs.map(e=> (
        <div key={e.key} >
            <span>{e.name}</span>
            <span>: {e.message}</span>
            <Link
                to="/download"
                onClick={this.downloadEmployeeData}>
                <span>: {e.filename}</span>
            </Link>
            <p style={{clear:'both'}} />
        </div>
    ))
        return(
            <div>
                <h1>실시간 채팅</h1>
                <ChatForm />
                <div>{messages}</div>


            </div>
        );
    }
}
export default Chat;
import React, { Component } from "react";

import UserCam from "./room/UserCam";
import OtherCams from "./room/OtherCams";
import Chat from "./room/Chat";

class Room extends Component{
    render(){
        const row = {
            display: "table",
            width: "100%",
        };

        const column = {
            display: "table-cell",
        };
    
        return(
            <div>
                <div style={row}>
                    <div style={column}>
                        <UserCam />
                    </div>
                    <div style={column}>
                        <OtherCams />
                    </div>
                    <div style={column}>
                        <Chat />
                    </div>
                </div>
            </div>
        );
    }
}

export default Room;
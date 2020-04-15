const reducer = (state, action) => {
    if(state === undefined){
        return ({
            page_status : "NotLogined",
            roomInfo: {},
        });
    }

    switch(action.type){
        case "NotLogined":
            return { page_status: "NotLogined" };

        case "Logined":
            return { page_status: "Logined" };

        case "UserInfo":
            return { page_status: "UserInfo" };
            
        case "InRoom":
            return { 
                page_status: "InRoom",
                roomInfo: action.roomInfo,
            };

        case "Signup":
            return { page_status: "Signup" };

        case "CreateRoom":
            return { page_status: "CreateRoom" };
            
        default:
            return state;
    }
}

export default reducer;
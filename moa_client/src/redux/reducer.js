const reducer = (state, action) => {
    if(state === undefined){
        return ({
            page_status : "NotLogined",
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
            return { page_status: "InRoom"};

        default:
            return state;
    }
}

export default reducer;
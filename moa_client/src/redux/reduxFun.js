// 리덕스 상태를 컴포넌트 속성에 매핑
const mapStateToProps = (state) => {
    return {
        pageValue: state.page_status,
        roomInfo: state.roomInfo,
    };
}

// 리덕스 액션을 컴포넌트 속성에 매핑
const mapDispatchToProps = (dispatch) => {
    return {
        NotLogined: () => { return dispatch({ type: "NotLogined" }); },
        Logined:    () => { return dispatch({ type: "Logined" }); },
        UserInfo:   () => { return dispatch({ type: "UserInfo" }); },
        InRoom:     (roomInfo) => { 
            return dispatch({ 
                type: "InRoom",
                roomInfo,
            }); 
        },
        Signup:     () => { return dispatch({ type: "Signup" }); },
        CreateRoom: () => { return dispatch({ type: "CreateRoom" }); },
    };
}

export { mapStateToProps, mapDispatchToProps };
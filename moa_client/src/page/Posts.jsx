import React, { Component } from "react";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../redux/reduxFun";

class Posts extends Component{
    render(){
        return(
            <div onClick={this.props.InRoom}>Posts</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
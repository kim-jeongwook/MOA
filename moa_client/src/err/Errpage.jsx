import React, { Component } from "react";

class Errpage extends Component {
  render() {
    const error = {
      backgroundImage: "url(img/error.png)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      height: "40vw",
      width: " 80vw",
      margin: "auto",
    };

    return <div style={error}></div>;
  }
}

export default Errpage;

import React, { Component } from "react";

class Page404 extends Component {
  render() {
    const error = {
      backgroundImage: "url(img/404.jpg)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      height: "45vw",
    };

    return <div style={error}></div>;
  }
}

export default Page404;

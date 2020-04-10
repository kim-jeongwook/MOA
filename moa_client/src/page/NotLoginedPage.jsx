import React, { Component } from "react";
import { Jumbotron, Form, Button, Image } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true; // 같은 origin이라 보증

class NotLoginedPage extends Component {
  //////////////////////////////////////////
  /////로그인 기능 //////////////
  ////////////////////////////////////////
  Logined = async () => {
    const send_param = {
      email: this._id.value,
      password: this._pw.value,
    };

    try {
      const result = await axios.post(
        process.env.REACT_APP_REQ + process.env.REACT_APP_REQ_LOGIN,
        send_param
      );

      alert(result.data.msg);
      if (result.data.resultCode) {
        this.props.Logined();
      } else {
        this._id.value = "";
        this._pw.value = "";
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const ImgStyle = {
      backgroundImage: "url(/img/hi.jpg)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      height: "45vw",
    };

    const ImgStyle2 = {
      backgroundImage: "url(/img/hi2.jpg)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      height: "45vw",
    };

    const icon = {
      position: "relative",
      backgroundPosition: "center",
      height: "62px",
    };

    const border = {
      marginTop: 20,
    };

    const padding = {
      padding: 20,
    };

    return (
      <div>
        <div style={ImgStyle}>
          <Jumbotron className="float-right my-4 mr-5">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={(ref) => (this._id = ref)}
                  placeholder="email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={(ref) => (this._pw = ref)}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox"></Form.Group>

              <Form.Group controlId="buttons">
                <Button onClick={this.Logined} variant="primary">
                  로그인
                </Button>
                <Button onClick={this.props.Signup} variant="default">
                  회원가입
                </Button>
              </Form.Group>
            </Form>
          </Jumbotron>
        </div>
        <section className="page-section bg-primary" id="about">
          <div className="container" style={padding}>
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="text-white mt-0">We've got what you need!</h2>
                <hr className="divider light my-4" />
                <p className="text-white-50 mb-4">
                  Did you have a hard time meeting because of the corona?{" "}
                  <br></br>Now don't worry, there's a MOA. <br></br>We offer
                  video conferencing and document sharing for up to 8 people.
                  <br></br>
                  Experience MOA's efficient video conferencing
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-section" id="services">
          <div className="container" style={border}>
            <h2 className="text-center mt-0">At Your Service</h2>
            <hr className="divider my-4" />
            <div className="row">
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <i className="fas fa-4x fa-gem text-primary mb-4"></i>
                  <Image style={icon} src="/img/videoconference.png"></Image>
                  <h3 className="h4 mb-2" style={padding}>
                    화상회의
                  </h3>
                  <p className="text-muted mb-0">
                    간편하게<br></br> 화상회의를 할수있습니다!
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <i className="fas fa-4x fa-laptop-code text-primary mb-4"></i>
                  <Image style={icon} src="/img/chat.png"></Image>
                  <h3 className="h4 mb-2" style={padding}>
                    채팅
                  </h3>
                  <p className="text-muted mb-0">
                    회의와 함께 <br></br>채팅이 가능합니다!
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <i className="fas fa-4x fa-globe text-primary mb-4"></i>
                  <Image style={icon} src="/img/result.png"></Image>
                  <h3 className="h4 mb-2" style={padding}>
                    문서교환
                  </h3>
                  <p className="text-muted mb-0">
                    드래그엔 드롭으로<br></br> 간편하게 문서를 <br></br>교환할수
                    있습니다!
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <i className="fas fa-4x fa-heart text-primary mb-4"></i>
                  <Image style={icon} src="/img/free.png"></Image>
                  <h3 className="h4 mb-2" style={padding}>
                    무료 사용
                  </h3>
                  <p className="text-muted mb-0">
                    어려운 시기 우리 MOA는 <br></br>여러분에게 화상회의를
                    <br></br>무료로 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Jumbotron style={ImgStyle2}></Jumbotron>
        <section id="portfolio">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-lg-4 col-sm-6">
                <a
                  className="portfolio-box"
                  href="assets/img/portfolio/fullsize/1.jpg"
                >
                  <img
                    className="img-fluid"
                    src="assets/img/portfolio/thumbnails/1.jpg"
                    alt=""
                  />
                  <div className="portfolio-box-caption">
                    <div className="project-category text-white-50">Category</div>
                    <div className="project-name">Project Name</div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a
                  className="portfolio-box"
                  href="assets/img/portfolio/fullsize/2.jpg"
                >
                  <img
                    className="img-fluid"
                    src="assets/img/portfolio/thumbnails/2.jpg"
                    alt=""
                  />
                  <div className="portfolio-box-caption">
                    <div className="project-category text-white-50">Category</div>
                    <div className="project-name">Project Name</div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a
                  className="portfolio-box"
                  href="assets/img/portfolio/fullsize/3.jpg"
                >
                  <img
                    className="img-fluid"
                    src="assets/img/portfolio/thumbnails/3.jpg"
                    alt=""
                  />
                  <div className="portfolio-box-caption">
                    <div className="project-category text-white-50">Category</div>
                    <div className="project-name">Project Name</div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a
                  className="portfolio-box"
                  href="assets/img/portfolio/fullsize/4.jpg"
                >
                  <img
                    className="img-fluid"
                    src="assets/img/portfolio/thumbnails/4.jpg"
                    alt=""
                  />
                  <div className="portfolio-box-caption">
                    <div className="project-category text-white-50">Category</div>
                    <div className="project-name">Project Name</div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a
                  className="portfolio-box"
                  href="assets/img/portfolio/fullsize/5.jpg"
                >
                  <img
                    className="img-fluid"
                    src="assets/img/portfolio/thumbnails/5.jpg"
                    alt=""
                  />
                  <div className="portfolio-box-caption">
                    <div className="project-category text-white-50">Category</div>
                    <div className="project-name">Project Name</div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a
                  className="portfolio-box"
                  href="assets/img/portfolio/fullsize/6.jpg"
                >
                  <img
                    className="img-fluid"
                    src="assets/img/portfolio/thumbnails/6.jpg"
                    alt=""
                  />
                  <div className="portfolio-box-caption p-3">
                    <div className="project-category text-white-50">Category</div>
                    <div className="project-name">Project Name</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section" id="contact">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="mt-0">Let's Get In Touch!</h2>
                <hr className="divider my-4" />
                <p className="text-muted mb-5">
                  Ready to start your next project with us? Give us a call or
                  send us an email and we will get back to you as soon as
                  possible!
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
                <div>010-6893-3537</div>
              </div>
              <div className="col-lg-4 mr-auto text-center">
                <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
                <a className="d-block" href="mailto:contact@yourwebsite.com">
                  mybiggold@naver.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default NotLoginedPage;

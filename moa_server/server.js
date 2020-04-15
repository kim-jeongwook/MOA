'use strict'
const express = require("express");
const session = require("express-session");
const sequelize = require("./models").sequelize;
const connect = require("./schemas");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const app = express();
const cookieParser = require("cookie-parser");

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// helmet
/*
 * Strict-Transport-Security : 서버에 연결시 SSL/TLS 연결을 강제
 * X-Frame-Option : clickjacking 보호
 * X-XSS-Protection : XSS필터를 브라우저에 삽입
 * X-Content-Type-Options : 선언된 content-type과 다른 응답이 내려오는 경우 브라우저에서 MIME-sniffing공격 방지
 * Content-security-Policy : 넓은 범위 공격 방지, XSS 크로스사이트 인젝션 포함
 */
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
  },
     //
}));

// hpp
app.use(hpp()); 

// env_환경변수
dotenv.config({ path: "./.env" });

// sequlize
sequelize.sync();

// mongoose
connect();

// cors
/*
 * Client측에서 다음과 같이 사용
 * axios.defaults.withCredentials = true;		// 같은 origin이라 보증
 * const headers = { withCredentials: true };
 */
const corsOptions = {
  origin: true, // 헤더 요청 구성, true값은 요청 origin 반영
  credentials: true, // 헤더를 전달하려면 true
};

app.use(cors(corsOptions));

// session
app.use(
  session({
    resave: false, // 세션을 변경되지 않아도 무조건 저장할 지 정하는 값(false 권장)
    saveUninitialized: true, // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장
    secret: process.env.SESSION_SECRET_KEY, // np쿠키를 임의로 변조하는것을 방지하기 위한 값
    cookie: {
      httpOnly: true, // HttpOnly Set-Cookie 속성
      secure: false, // 쿠키 보안 설정(https 사용시 true 설정)
    },
  })
);
module.exports = io;
// router
app.use("/file", require("./routes/fileRouter"));
app.use("/member", require("./routes/memberRouter"));
app.use("/plan", require("./routes/planRouter"));
app.use("/room", require("./routes/roomRouter"));

http.listen(8080, () => {
  console.log("server ready");
});

const express = require("express");
const session = require("express-session");
const sequelize = require("./models").sequelize;
const connect = require("./schemas");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  credentials: true // 헤더를 전달하려면 true
};
app.use(cors(corsOptions));

// session
app.use(
  session({
    resave: false, // 세션을 변경되지 않아도 무조건 저장할 지 정하는 값(false 권장)
    saveUninitialized: true, // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장
    secret: process.env.SESSION_SECRET_KEY, // 쿠키를 임의로 변조하는것을 방지하기 위한 값
    cookie: {
      httpOnly: true, // HttpOnly Set-Cookie 속성
      secure: true // 쿠키 보안 설정(https 사용시 true 설정)
    }
  })
);

// router
app.use("/file", require("./routes/fileRouter"));
app.use("/member", require("./routes/memberRouter"));
app.use("/plan", require("./routes/planRouter"));
app.use("/room", require("./routes/roomRouter"));

http.listen(8080, () => {
  console.log("server ready");
});

var room=[];

io.on("connection",(socket)=>{
    socket.on("onicecandidate",(data)=>{
        socket.broadcast.emit("onicecandidate",data);
    })
    socket.on("sdp",(data)=>{
        socket.broadcast.emit("sdp",data);
    })
    socket.on("disconnect",(evt)=>{
        socket.broadcast.emit("out", room[socket.id]);
    })
    socket.on("stream",(data)=>{
        room[socket.id]=data;
    })
});

io.on('connection', (socket) =>{
  console.log('사용자 접속', socket.client.id)

  socket.on('chat-msg', (msg)=>{
      console.log('message', msg)

      io.emit('chat-msg', msg)
  })
})
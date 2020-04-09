const express = require("express");
const session = require("express-session");
const sequelize = require("./models").sequelize;
const connect = require("./schemas");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());	


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

// router
app.use("/file", require("./routes/fileRouter"));
app.use("/member", require("./routes/memberRouter"));
app.use("/plan", require("./routes/planRouter"));
app.use("/room", require("./routes/roomRouter"));

const server = http.listen(8080, () => {
  console.log("server ready");
});

var room = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join", (data) => {
    socket.join(data);
    socket.room_id = data;
    if(!room[socket.room_id]) room[socket.room_id] = [];
  });
  socket.on("onicecandidate", (data) => {
    socket.broadcast.to(socket.room_id).emit("onicecandidate", data);
  });
  socket.on("sdp", (data) => {
    socket.broadcast.to(socket.room_id).emit("sdp", data);
  });
  socket.on("disconnect", (evt) => {
    if (socket.room_id) {
      let itemToFind = room[socket.room_id].find(function(item) {return item.socket === socket.id});
      socket.broadcast.to(socket.room_id).emit("out", room[socket.room_id][room[socket.room_id].indexOf(itemToFind)].media);
      room[socket.room_id].splice(room[socket.room_id].indexOf(itemToFind),1);
      console.log(room[socket.room_id]);
      socket.leave(socket.room_id);
    }

  });
  socket.on("stream", (data) => {
    room[socket.room_id].push({socket:socket.id,media:data});
  });
  
  
    /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
    socket.on('newUser', function(name) {
      console.log(name + ' 님이 접속하였습니다.')
  
      /* 소켓에 이름 저장해두기 */
      socket.name = name
  
      /* 모든 소켓에게 전송 */
      io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'})
    })
  
    /* 전송한 메시지 받기 */
    socket.on('message', function(data) {
      /* 받은 데이터에 누가 보냈는지 이름을 추가 */
      data.name = socket.name
      
      console.log(data)
  
      /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
      socket.broadcast.emit('update', data);
      
    })
    
  
    /* 접속 종료 */
    socket.on('disconnect', function() {
      console.log(socket.name + '님이 나가셨습니다.')
  
      /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
      socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'});
    })
  
      /* 전송한 파일 받기 */
      socket.on('file', function(data) {
        /* 받은 데이터에 누가 보냈는지 이름을 추가 */
        data.name=socket.name
        
        console.log(data)
    
        /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
        socket.broadcast.emit('file_update', data);
      })

});

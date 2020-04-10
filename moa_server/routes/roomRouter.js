const SSE = require("sse-nodejs");
const express = require("express");
const router = express.Router();
const Room = require("../models").Room;
const io = require("../server");

// room class
class cRoom {
	constructor(id, room_name, is_secret, master) {
		this.room_id = id;
		this.room_name = room_name;
		this.is_secret = is_secret;
		this.headcount = 0;
		this.master = master;
		this.timestamp = new Date();
		this.clients = [];
	}
}

// room array
let rooms = [];

////////////////////////////////////////////////////////////////////////
// room time req(SSE)
////////////////////////////////////////////////////////////////////////
router.get("/sse", (req, res) => {
	const app = SSE(res);
	let time,
		clientnum = 0;

	if (rooms.length) {
		const result = rooms.filter((room) => {
			return room.room_id.toString() === req.query.t;
		});

        // 클라이언트 보내줌
		app.sendEvent(
			"clients",
			() => {
                return result[0].clients.map((client) => {
                    return client.nickname;
                });
			},
			1000
		);

        // 사람 수
        app.sendEvent(
			"headcount",
			() => {
				return result[0].clients.length;
			},
			1000
        );
        
        // 시간
		app.sendEvent(
			"time",
			() => {
				time = new Date() - result[0].timestamp;

				const Hour = Math.floor(
					(time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minute = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
				const second = Math.floor((time % (1000 * 60)) / 1000);

				return (
					(Hour >= 10 ? Hour : "0" + Hour) +
					":" +
					(minute >= 10 ? minute : "0" + minute) +
					":" +
					(second >= 10 ? second : "0" + second)
				);
			},
			1000
		);
	}
});

////////////////////////////////////////////////////////////////////////
// room list req
////////////////////////////////////////////////////////////////////////
router.post("/enter", async (req, res) => {
	const enter_room = rooms.findIndex((value) => {
		return value.room_id === req.body.id;
	});
	// 활성화 된 방이면 그냥 들어가면 됨
	if (enter_room !== -1 && enter_room !== undefined) {
		// 있는 방 찾아 들어가기
		rooms[enter_room].headcount = rooms[enter_room].clients.length + 1;
		rooms[enter_room].clients.push({
			nickname: req.session.nickname,
			socket: req.cookies.io,
			media: undefined,
		});

		res.json({
			resultCode: true,
			msg: {
				room_id: rooms[enter_room].room_id,
				room_name: rooms[enter_room].room_name,
				is_secret: rooms[enter_room].is_secret,
				headcount: rooms[enter_room].headcount,
				master: rooms[enter_room].master,
			},
		});
	} else {
		try {
			const find_result = await Room.findOne({ where: { id: req.body.id } });
			if (find_result) {
				const RoomItem = new cRoom(
					find_result.id,
					find_result.room_name,
					find_result.is_secret,
					find_result.master_id
				);
				RoomItem.clients.push({
					nickname: req.session.nickname,
					socket: req.cookies.io,
					media: undefined,
				});
				rooms.push(RoomItem);

				res.json({
					resultCode: true,
					msg: {
						room_id: RoomItem.room_id,
						room_name: RoomItem.room_name,
						is_secret: RoomItem.is_secret,
						headcount: RoomItem.headcount,
						master: RoomItem.master,
					},
				});
			} else {
				console.log("방을 찾을 수 없음");
				res.json({ resultCode: false, msg: "잠시 후 다시 시도해주세요" });
			}
		} catch (err) {
			console.log(err);
		}
	}
});

////////////////////////////////////////////////////////////////////////
// room list req
////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
	try {
		// 자기 방만 나올수 있도록 쿼리
		const find_result = await Room.findAll({ where: { is_secret: false } });
		res.json({
			resultCode: true,
			msg: {
				public_rooms: rooms.filter((value) => {
					return value.is_secret === false;
				}),
				my_rooms: find_result,
			},
		});
	} catch (err) {
		throw err;
		console.log(err);
		res.json({ resultCode: false, msg: "방 불러오기 오류" });
	}
});

////////////////////////////////////////////////////////////////////////
// room create req
////////////////////////////////////////////////////////////////////////
router.post("/create", async (req, res) => {
	const room_name = req.body.title;
	const room_url = req.body.url;
	const is_secret = req.body.isSecret;

	try {
		let insert_result;
		if (req.body.isSecret) {
			const password = req.body.password;
			insert_result = await Room.create({
				room_name,
				room_url,
				is_secret,
				password,
				master_id: req.session.email,
			});
		} else {
			insert_result = await Room.create({
				room_name,
				room_url,
				is_secret,
				master_id: req.session.email,
			});
		}

		res.json({ resultCode: true, msg: "미팅룸 생성이 완료되었습니다" });
	} catch (err) {
		res.json({ resultCode: false, msg: "미팅룸 생성이 실패" });
	}
});

router.post("/out", (req, res) => {
	const enter_room = rooms.findIndex((value) => {
		return value.room_id === req.body.id;
	});
	rooms[enter_room].headcount = rooms[enter_room].clients.length;
	res.json({});
});

io.on("connection", (socket) => {
<<<<<<< HEAD
	socket.on("join", (data) => {
		socket.enter_room = rooms.findIndex((value) => {
			return value.room_id === data;
		});
		socket.join(data);
	});
	socket.on("onicecandidate", (data) => {
		if (socket.enter_room !== undefined && socket.enter_room !== -1) {
			socket.broadcast
				.to(rooms[socket.enter_room].room_id)
				.emit("onicecandidate", data);
		}
	});
	socket.on("sdp", (data) => {
		if (socket.enter_room !== undefined && socket.enter_room !== -1) {
			socket.broadcast.to(rooms[socket.enter_room].room_id).emit("sdp", data);
		}
	});
	socket.on("answer", (data) => {
		if (socket.enter_room !== undefined && socket.enter_room !== -1) {
			socket.broadcast
				.to(rooms[socket.enter_room].room_id)
				.emit("answer", data);
		}
	});
	socket.on("disconnect", (evt) => {
		if (socket.enter_room !== undefined && socket.enter_room !== -1) {
			let itemToFind = rooms[socket.enter_room].clients.findIndex((item) => {
				return item.socket === socket.id;
			});
			if (itemToFind !== undefined && itemToFind !== -1) {
				socket.broadcast
					.to(rooms[socket.enter_room].room_id)
					.emit("out", rooms[socket.enter_room].clients[itemToFind].media);
				socket.broadcast.to(rooms[socket.enter_room].room_id).emit("update", {
					type: "disconnect",
					name: "SERVER",
					message: socket.name + "님이 나가셨습니다.",
				});
				socket.leave(rooms[socket.enter_room].room_id);
				rooms[socket.enter_room].clients.splice(itemToFind, 1);
			}
			rooms[socket.enter_room].headcount =
				rooms[socket.enter_room].clients.length;
			if (!rooms[socket.enter_room].clients.length)
				rooms.splice(socket.enter_room);
			console.log(rooms[socket.enter_room]);
		}
	});
	socket.on("stream", (data) => {
		if (socket.enter_room !== undefined && socket.enter_room !== -1) {
			let itemToFind = rooms[socket.enter_room].clients.findIndex((item) => {
				return item.socket === socket.id;
			});
			if (itemToFind !== undefined && itemToFind !== -1) {
				rooms[socket.enter_room].clients[itemToFind].media = data;
				console.log(rooms[socket.enter_room].clients);
			}
		}
	});

	socket.on("newUser", function (name) {
		/* 소켓에 이름 저장해두기 */
		socket.name = name;
		/* 모든 소켓에게 전송 */
		io.to(rooms[socket.enter_room].room_id).emit("update", {
			type: "connect",
			name: "SERVER",
			message: name + "님이 접속하였습니다.",
		});
	});
=======
  socket.on("join", (data) => {
    socket.enter_room = rooms.findIndex((value) => {
      return value.room_id === data;
    });
    socket.join(data);
  });
  socket.on("onicecandidate", (data) => {
    if (socket.enter_room !== undefined && socket.enter_room !== -1) {
      socket.broadcast
        .to(rooms[socket.enter_room].room_id)
        .emit("onicecandidate", data);
    }
  });
  socket.on("sdp", (data) => {
    if (socket.enter_room !== undefined && socket.enter_room !== -1) {
      socket.broadcast.to(rooms[socket.enter_room].room_id).emit("sdp", data);
    }
  });
  socket.on("answer", (data) => {
    if (socket.enter_room !== undefined && socket.enter_room !== -1) {
      socket.broadcast
        .to(rooms[socket.enter_room].room_id)
        .emit("answer", data);
    }
  });
  socket.on("disconnect", (evt) => {
    if (socket.enter_room !== undefined && socket.enter_room !== -1) {
      let itemToFind = rooms[socket.enter_room].clients.findIndex((item) => {
        return item.socket === socket.id;
      });
      if (itemToFind !== undefined && itemToFind !== -1) {
        socket.broadcast
          .to(rooms[socket.enter_room].room_id)
          .emit("out", rooms[socket.enter_room].clients[itemToFind].media);
        socket.broadcast.to(rooms[socket.enter_room].room_id).emit("update", {
          type: "disconnect",
          name: "SERVER",
          message: socket.name + "님이 나가셨습니다.",
        });
        socket.leave(rooms[socket.enter_room].room_id);
        rooms[socket.enter_room].clients.splice(itemToFind, 1);
      }
      rooms[socket.enter_room].headcount =
        rooms[socket.enter_room].clients.length;
      if (!rooms[socket.enter_room].clients.length)
        rooms.splice(socket.enter_room);
    }
  });
  socket.on("stream", (data) => {
    if (socket.enter_room !== undefined && socket.enter_room !== -1) {
      let itemToFind = rooms[socket.enter_room].clients.findIndex((item) => {
        return item.socket === socket.id;
      });
      if (itemToFind !== undefined && itemToFind !== -1) {
        rooms[socket.enter_room].clients[itemToFind].media = data;
      }
    }
  });

  socket.on("newUser", function (name) {
    if (socket.enter_room !== undefined && socket.enter_room !== -1) {
      let itemToFind = rooms[socket.enter_room].clients.findIndex((item) => {
        return item.socket === socket.id;
      });
      socket.name = "익명";
      if (itemToFind !== undefined && itemToFind !== -1) {
        if (rooms[socket.enter_room].clients[itemToFind].nickname)
          socket.name = rooms[socket.enter_room].clients[itemToFind].nickname;
        socket.emit("name", rooms[socket.enter_room].clients[itemToFind].email);
      }

      /* 모든 소켓에게 전송 */
      io.to(rooms[socket.enter_room].room_id).emit("update", {
        type: "connect",
        name: socket.name,
        message: socket.name + "님이 접속하였습니다.",
      });
    }
  });
>>>>>>> f160cd4885461fdc2ff3c9353edf49f9a0320107

	socket.on("message", function (data) {
		/* 받은 데이터에 누가 보냈는지 이름을 추가 */
		data.name = socket.name;
		/* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
		socket.broadcast.to(rooms[socket.enter_room].room_id).emit("update", data);
	});

	socket.on("file", function (data) {
		/* 받은 데이터에 누가 보냈는지 이름을 추가 */
		data.name = socket.name;
		/* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
		socket.broadcast
			.to(rooms[socket.enter_room].room_id)
			.emit("file_update", data);
	});
});

module.exports = router;

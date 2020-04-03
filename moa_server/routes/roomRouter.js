const express = require("express");
const router = express.Router();
const Room = require("../models").Room;

////////////////////////////////////////////////////////////////////////
// room list req
////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
    try{
        const find_result = await Room.findAll({});

        res.json({ resultCode: true, msg: find_result });
    } catch(err) {
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

    try{
        let insert_result;
        if(req.body.isSecret){
            const password = req.body.password;
            insert_result = await Room.create({ room_name, room_url, is_secret, password, master_id: 1 });
        } else {
            insert_result = await Room.create({ room_name, room_url, is_secret, master_id: 1 });
        }

        res.json({ resultCode: true, msg:"미팅룸 생성이 완료되었습니다"});
    } catch(err) {
        res.json({ resultCode: false, msg:"미팅룸 생성이 실패"});
    }
});

module.exports = router;
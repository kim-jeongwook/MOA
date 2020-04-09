const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const fs = require("fs");
const mime = require("mime");
const MeetingLog = require("../schemas/MeetingLog");

router.post("/upload", upload.single("profile_img"), function (req, res, next) {
  console.log(req.file);
  console.log(req.file.filename);
  console.log(req.file.originalname);
  res.send({
    resultCode: true,
    filename: req.file.filename,
    file_originalname: req.file.originalname,
    msg: "파일 도착",
  });
});

// 채팅 내용 및 filename DB에저장
router.post("/chat", async (req, res) => {
  console.log(req.body);
  const meetingLog = new MeetingLog({
    room_id: req.body.room_id,
    chat_contents: [
      {
        chat: req.body.name + ":" + req.body.message,
        filename: req.body.filename,
        file_originalname: req.body.file_originalname,
      },
    ],
  });
  try {
    const result = await meetingLog.save();

    res.json({ msg: result });
  } catch (err) {
    console.log(err);
  }
});

router.post("/download", async (req, res) => {
  const p = path.resolve("uploads/" + req.body.fn);
  const mimeType = mime.getType(req.body.kind);
  res.setHeader("Content-Type", mimeType);
  var file = fs.ReadStream(p);
  file.pipe(res);
});
module.exports = router;

const express = require("express");
const router = express.Router();
const models = require("../models");
const Member = require("../models").Member;
const multer = require("multer");
const upload = multer({ dest: "profile_uploads/" });

router.post("/getEmail", (req, res) => {
  //<<----회원정보수정,탈퇴시 이메일 가져오는 기능
  res.json({ email: req.session.email });
});

router.post("/Signup", async (req, res, next) => {
  //<<----회원가입기능
  const email = req.body.email;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const f_profile = req.body.f_profile;
  // const nickname = req.body.nickname;

  try {
    // 이메일 중복 조회, Member table insert, UserInfo table insert
    await models.sequelize.transaction(async (t) => {
      // 1. 이메일 중복 조회
      const search_result = await Member.findOne({ where: { email } });
      if (!search_result) {
        await Member.create({
          email,
          password,
          nickname,
          f_profile,
        });
      } else {
        res.json({ resultCode: false, msg: "중복된 이메일입니다" });
      }
    });

    res.json({ resultCode: true, msg: "가입이 완료되었습니다" });
  } catch (err) {
    // error 처리
    resultCode = 0;
    res.json({ resultCode: false, msg: "회원가입에 문제가 생겼습니다." });
    console.log(err);
  }
});

router.post("/Login", async (req, res, next) => {
  //<<----로그인기능
  const id = req.body.id;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const search_result = await Member.findOne({ where: { email, password } }); //db에서 맞는 이메일,비밀번호찾아 검증
    if (!search_result) {
      res.json({ resultCode: false, msg: "다시 로그인하세요" });
    } else {
      req.session.email = email; //세션생성
      req.session.uid = id; //세션생성
      console.log(req.session.uid);

      res.json({ resultCode: true, msg: "로그인 됨" });
    }
  } catch (err) {
    // error 처리
    resultCode = 0;
    res.json({ resultCode: false, msg: "로그인에 문제가 생겼습니다." });
    console.log(err);
  }
});

router.post("/Keeplogin", (req, res) => {
  //<<----새로고침시 로그인을 유지하는 기능
  console.log(req.session.uid); //<<----세션의 유무를 가지고 유지
  if (req.session.email) {
    res.json({ resultCode: true });
  } else {
    res.json({ resultCode: false });
  }
});

router.get("/logout", (req, res) => {
  //<<----로그아웃 기능
  req.session.destroy(() => {
    res.json({ message: "로그아웃됨" });
  });
});

router.post("/Deletemember", async (req, res, next) => {
  //<<----회원탈퇴 기능
  const email = req.body.email;
  const password = req.body.password;

  try {
    console.log(req.body.email);
    const search_result = await Member.destroy({
      //db삭제
      where: { email, password },
    });
    if (!search_result) {
      res.json({ resultCode: false, msg: "비밀번호 틀림 " });
    } else {
      res.json({ resultCode: true, msg: "ㅇㅋ ㅃㅃ ㅅㄱ" });
      req.session.destroy(() => {
        res.json({ message: "탈퇴됨" });
      });
    }
  } catch (err) {
    // error 처리
    resultCode = 0;
    res.json({ resultCode: false, msg: "오류." });
    console.log(err);
  }
});

router.post("/Memberupdate", async (req, res, next) => {
  //<<----회원정보수정 기능
  const email = req.body.email;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const f_profile = req.body.profileimg;

  try {
    const result = await Member.update(
      {
        password,
        nickname,
        f_profile,
      },
      { where: { email } }
    );

    res.json({ resultCode: true, msg: "변경완료" });
  } catch (err) {
    // error 처리
    resultCode = 0;
    res.json({ resultCode: false, msg: "정보수정 오류." });
    console.log(err);
  }
});

router.post("/img_upload", upload.single("profile_img"), function (
  //<<----프로필 이미지 업로드 기능
  req,
  res,
  next
) {
  console.log("/account", req.body);
  console.log(req.file);
  console.log(req.file.filename);
  res.send({ originalname: req.file.originalname, msg: "이미지 업로드 완료" });
});

module.exports = router;

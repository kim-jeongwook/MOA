const express = require("express");
const router = express.Router();
const multer=require('multer');
const upload=multer({dest:'uploads/'});

router.post('/file', upload.single('profile_img'), function (req,res, next) {
    console.log('/file', req.body);
    console.log(req.file);
    console.log(req.file.filename);
    console.log(req.file.originalname);
    res.send({filename:req.file.originalname, msg:'파일 도착'});
    
})

module.exports = router;
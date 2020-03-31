const mongoose = require("mongoose");

module.exports = () => {
    const connect = () => {

        // 개발환경이 아닐 때, 몽구스가 생성하는 쿼리 내용을 콘솔을 통해 확인
        if(process.env.NODE_ENV !== "production"){
            mongoose.set("debug", true);
        }

        // 몽구스 몽고디비 연결
        mongoose.connect("mongodb://" + 
            process.env.MONGODB_NAME + ":" + 
            process.env.MONGODB_PASSWORD + "@" +
            process.env.MONGODB_IP + ":" + 
            process.env.MONGODB_PORT + "/admin",
            {dbName: process.env.MONGODB_DBNAME}, 
        (error) => {
            if(error) {
                console.log("MongoDB connection error", error);
            } else {
                console.log("MongoDB connection success");
            }
        });
    };

    connect();

    // 몽구스 이벤트 리스너들
    mongoose.connection.on("error", (error) => {
        console.log("MongoDB connection error", error);
    });

    mongoose.connection.on("disconnected", () => {
        console.error("MongoDB disconnected. retry connection.");
        // connect();
    });

    // 연결할 스키마 설정
    require("./MeetingLog");
    require("./Calender");
};
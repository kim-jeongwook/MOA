const mongoose = require("mongoose");

const { Schema } = mongoose;
const MeetingLogSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    chat_contents: [{
        chat: { type: String, required: true },
        filename: { type: String, required: true },
        file_originalname:{ type: String, required: true },
        date: {type: Date, required: true, default: Date.now },
    }],
    room_id: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("MeetingLog", MeetingLogSchema, "MeetingLog");
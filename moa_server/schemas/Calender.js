const mongoose = require("mongoose");

const { Schema } = mongoose;
const calenderSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    cal_contents: {
        type: String,
        required: true,
    },
    room_id: {
        type: Number,
        required: true,
    },
    checklist: [{
        check_content: { type: String, required: true },
        complete: {type: Boolean, required: true, default: false },
    }],
});

module.exports = mongoose.model("Calender", calenderSchema, "Calender");
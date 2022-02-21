const mongoose = require("mongoose");

const userKeywordSchema = new mongoose.Schema({
    userIP: {
        type: String,
        required: true,
    },
    keyword: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("userKeyword", userKeywordSchema);
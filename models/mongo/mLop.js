const mongoose = require('mongoose');

const lopSchema = new mongoose.Schema({
    tenLop: {
        type: String,
        required: true
    },
    soLuongSinhVien: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Lop', lopSchema);
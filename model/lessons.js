const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    idCours: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String
    },
    duration: {
        type: Number //
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);
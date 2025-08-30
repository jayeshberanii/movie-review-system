import mongoose from "mongoose";

const movieSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Movie', movieSchema);
import mongoose from "mongoose";

const reviewSchema: mongoose.Schema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    reviewer: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: false
    }
}, {timestamps: true});

export default mongoose.model('Review', reviewSchema);
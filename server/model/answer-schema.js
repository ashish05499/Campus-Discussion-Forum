import Mongoose from "mongoose";

const AnswerSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    answers: {
        type: String,
        required: true
    }
})

const Answer = Mongoose.model('answer', AnswerSchema);

export default Answer;
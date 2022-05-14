import Mongoose from "mongoose";

const PostSchema = new Mongoose.Schema({
    question: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    category: {
        type: [String],
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
    },
});

const Post = Mongoose.model('post', PostSchema);

export default Post;
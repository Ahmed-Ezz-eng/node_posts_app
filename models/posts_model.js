import { model, Schema } from "mongoose";

const posts_schema = new Schema({
    creator: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

    tags: {
        type: [String],
        required: true
    },

    likes: {
        type: [String],
        default: []
    },

    imgUrl: String,

    createdAt: {
        type: Date,
        default: new Date().toGMTString()
    },
})

const Post = model("Post", posts_schema);
export default Post;
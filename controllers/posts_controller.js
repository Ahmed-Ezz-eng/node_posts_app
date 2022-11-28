
import mongoose from "mongoose";
import Post from "../models/posts_model.js";

export const createPosts = async (req, res) => {
    const post = req.body;
    try {
        const createdPost = await Post.create(post);
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getPosts = async (req, res) => {
    try {
        const allPosts = await Post.find({});
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(404).json({ message: "No posts found" })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send("No post with this id")
        } else {
            const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
            res.status(200).json(updatedPost)
        }
    } catch (error) {
        return res.status(404).json({ message: "No posts found" })
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: "No post with this id" })
        } else {
            await Post.findByIdAndDelete(_id);
            res.json({ message: "Post is deleted successfully" })
        }
    } catch (error) {
        return res.status(404).json({ message: "You cant delete this post now" })
    }
}

//  like post

export const likePost = async (req, res) => {

    const { id: _id } = req.params;
    try {
        if (!req.userId) return res.status(401).json({ message: "unauthorized" })
        if (mongoose.Types.ObjectId.isValid(_id)) res.status(400).json({ message: "invalid id" })
        const findPost = await Post.findById(_id);

        const index = findPost.likes.findIndex((post) => post._id === String(req.userId));
        if (index !== -1) {
            findPost.likes.push(req.userId)
        } else {
            findPost.likes = findPost.likes.filter(post => post._id !== String(req.userId))
        }
        if (findPost) {
            const updatePost = await Post.findByIdAndUpdate(_id, findPost, { new: true });

            res.status(200).json(updatePost)
        } else {
            res.status(404).json({ message: "This post is Not found" })
        }
    } catch (error) {
        res.status(400).json({ message: "You cant like this post" })
    }
}


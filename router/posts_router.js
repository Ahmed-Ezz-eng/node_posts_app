import express from "express";
import { createPosts, getPosts, updatePost, deletePost, likePost} from "../controllers/posts_controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createPosts);
router.get("/", getPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;

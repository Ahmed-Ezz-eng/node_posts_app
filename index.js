import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postsRouter from "./router/posts_router.js";
import usersRouter from "./router/users_router.js";
import cors from "cors";

dotenv.config()
const app = express();
app.use(cors());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));

const db_url = process.env.BD_URL;
const port = process.env.PORT;


mongoose.connect(db_url)
.then(() => {
    console.log("Connected to database");
    app.listen(port, () => console.log(`Server is running on port ${port}`))
})
.catch((error) => console.log("connected to database is failed", error.message))

app.use("/posts", postsRouter);
app.use("/users", usersRouter);


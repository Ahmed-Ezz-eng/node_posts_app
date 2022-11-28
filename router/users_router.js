import express from "express";
import {signIn, signUp} from "../controllers/users_controller.js"
const usersRouter = express.Router();


// localhost:7000/users/ signin
// localhost:7000/users/ signup
usersRouter.post("/signin", signIn);
usersRouter.post("/signup", signUp);

export default usersRouter;






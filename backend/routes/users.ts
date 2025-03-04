import express from "express";
import user from "../controllers/users";
const router = express.Router();

router.post("/sign-up", user.createUser);
router.post('/login', user.loginUser)
export default router;

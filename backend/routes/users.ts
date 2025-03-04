import express from "express";
import user from "../controllers/users";
const router = express.Router();

router.post("/auth/sign-up", user.createUser);
router.post('/auth/login', user.loginUser)
export default router;

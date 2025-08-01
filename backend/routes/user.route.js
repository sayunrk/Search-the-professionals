import { Router } from "express";
const router = Router();
import { getUserList } from "../controllers/user.controller.js";
import { searchUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

router.get("/list", authMiddleware, getUserList);

router.get("/search", authMiddleware, searchUser);

export default router;
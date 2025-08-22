import { Router } from "express";
const router = Router();
import { getUserList } from "../controllers/user.controller.js";
import { searchUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/user.controller.js";

router.get("/list", authMiddleware, getUserList);

router.get("/search", authMiddleware, searchUser);

router.put("/:id", authMiddleware, updateProfile);

export default router;
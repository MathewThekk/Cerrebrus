import express from "express";
import { authenticationCheck, adminCheck } from "../middleware/authMiddleware.js";
import { getAdmin, addAdmin, deleteAdmin } from "../controllers/auth/adminController.js";
import { userLogin } from "../controllers/auth/loginController.js";

const router = express.Router();
// import auth from "../middleware/auth.js";

router.get("/admin", authenticationCheck, adminCheck, getAdmin);
router.post("/admin", addAdmin);
router.delete("/admim", deleteAdmin)

router.post("/login", authenticationCheck, userLogin )

export default router;
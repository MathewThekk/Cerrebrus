import express from "express";
import { authenticationCheck, adminAuthorisationCheck, superAdminCheck } from "../middleware/authMiddleware.js";
import { getAdmin, addAdmin, deleteAdmin } from "../controllers/auth/adminController.js";
import { userLogin } from "../controllers/auth/loginController.js";

const router = express.Router();
// import auth from "../middleware/auth.js";

router.get("/admin", authenticationCheck, getAdmin);
router.post("/admin",authenticationCheck, superAdminCheck, addAdmin);
router.delete("/admin", deleteAdmin)

router.post("/login", authenticationCheck, userLogin )

export default router;
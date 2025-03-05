import { Router } from "express";

// Middleware
import { IsLoggedIn } from "../middlewares/isloggedin.middleware";

// Controller
import { LoggedInUser, ForgotPassword, ResetPassword } from "../controllers/user.controller";
import { IsUser } from "../middlewares/isuser.middleware";

const router: Router = Router();

router.get("/isloggedin", IsLoggedIn, LoggedInUser);

router.get("/forgot-password",IsUser, ForgotPassword);

router.put("/reset-password", ResetPassword);

export default router;

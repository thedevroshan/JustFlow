import express, {Router} from "express";

// Controller
import { 
    Register,
    VerifyEmail,
    ResendVerificationEmail,
    Login,
    Logout
} from "../controllers/auth.controller";

// Middleware
import { RegistrationSchemaCheck } from "../middlewares/registrationschemacheck.mddleware";
import { IsUser } from "../middlewares/isuser.middleware";

const router:Router = Router();

// Register User
router.post("/register", RegistrationSchemaCheck, Register);

// Verify Email
router.get("/verify/:verification_token", VerifyEmail);

// Resend Verification Email
router.post("/resend-verification-email", IsUser, ResendVerificationEmail);

// Login User
router.get("/login",IsUser, Login);

// Logout User
router.get("/logout",IsUser, Logout);


export default router;

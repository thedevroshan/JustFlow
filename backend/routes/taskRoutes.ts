import { Router } from "express";

// Middlewares
import { IsLoggedIn } from "../middlewares/isloggedin.middleware";

// Controller
import { CreateTask } from "../controllers/task.controller";

const router:Router = Router();

router.post('/:projectId',IsLoggedIn, CreateTask)

export default router;

import { Router } from "express";

// Middlewares
import { IsLoggedIn } from "../middlewares/isloggedin.middleware";

// Controller
import { UpdateTask, CreateTask, AssignRole } from "../controllers/task.controller";

const router: Router = Router();

router.post("/:projectId", IsLoggedIn, CreateTask);

router.put("/update", IsLoggedIn, UpdateTask);

router.put("/assign-role", IsLoggedIn, AssignRole);

export default router;

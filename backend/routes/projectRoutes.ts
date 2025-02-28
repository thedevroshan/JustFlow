import  {Router} from 'express';

// Middlewares
import { IsLoggedIn } from '../middlewares/isloggedin.middleware';

// Controller
import { CreateProject } from '../controllers/project.controller';

const router:Router  = Router();

// Create Project
router.post('/',IsLoggedIn, CreateProject)

export default router;

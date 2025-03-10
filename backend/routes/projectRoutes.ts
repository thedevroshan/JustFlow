import  {Router} from 'express';

// Middlewares
import { IsLoggedIn } from '../middlewares/isloggedin.middleware';

// Controller
import { 
    CreateProject,
    EditProjectInfo,
    RemoveProjectMember,
    ArchiveProject,
    UnarchiveProject,
    JoinProject,
    GetInvitationLink,
    GetProjectMembers,
    GetProject,
    GetAllProject,
    DeleteProject,
    ChangeScheduleViewStyle,
    ScheduleViewStyle
 } from '../controllers/project.controller';

// Middlewares
import { IsAuthorizedToEditProject } from '../middlewares/isauthorizedtoeditproject.middleware';

const router:Router  = Router();

// Create Project
router.post('/',IsLoggedIn, CreateProject)

router.put('/:projectId/info',IsLoggedIn, IsAuthorizedToEditProject, EditProjectInfo)

router.put('/:projectId/members/:memberId/remove',IsLoggedIn, IsAuthorizedToEditProject, RemoveProjectMember)

router.put('/archive/:projectId',IsLoggedIn, IsAuthorizedToEditProject, ArchiveProject)

router.put('/unarchive/:projectId',IsLoggedIn, IsAuthorizedToEditProject, UnarchiveProject)

router.put('/:projectId/join',IsLoggedIn, JoinProject)

router.put('/:projectId/schedule-view-style',IsLoggedIn, ChangeScheduleViewStyle)

router.get('/:projectId/schedule-view-style',IsLoggedIn, ScheduleViewStyle)

router.get('/:projectId/invitation-link',IsLoggedIn, GetInvitationLink)

router.get('/:projectId/members',IsLoggedIn, GetProjectMembers)

router.get('/:projectId',IsLoggedIn, GetProject)

router.get('/',IsLoggedIn, GetAllProject)

router.delete('/:projectId',IsLoggedIn, IsAuthorizedToEditProject, DeleteProject)

export default router;

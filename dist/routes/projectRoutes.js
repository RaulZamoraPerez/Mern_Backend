"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectController_1 = require("../controllers/ProjectController");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const TaskController_1 = require("../controllers/TaskController");
const project_1 = require("../middleware/project");
const task_1 = require("../middleware/task");
const auth_1 = require("../middleware/auth");
const TeamController_1 = require("../controllers/TeamController");
const NoteController_1 = require("../controllers/NoteController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate); //todos los apis tendran que estar autenticados
router.get('/', ProjectController_1.ProjectController.getAllProjects);
router.post('/', (0, express_validator_1.body)('projectName')
    .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'), (0, express_validator_1.body)('clientName')
    .notEmpty().withMessage('El nombre del Cliente es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La Descripcion  del Proyecto es Obligatorio'), validation_1.handleInputErrors, ProjectController_1.ProjectController.createProject);
router.get('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, ProjectController_1.ProjectController.getProjectById);
router.param('projectId', project_1.projectExists); //middleware que valida que el proyecto exista en tdos los metodos que tengan el parametro projectId
router.put('/:projectId', (0, express_validator_1.body)('projectName')
    .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'), (0, express_validator_1.body)('clientName')
    .notEmpty().withMessage('El nombre del Cliente es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La Descripcion  del Proyecto es Obligatorio'), (0, express_validator_1.param)('projectId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, task_1.hasAuthorization, ProjectController_1.ProjectController.updateProject);
router.delete('/:projectId', (0, express_validator_1.param)('projectId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, task_1.hasAuthorization, ProjectController_1.ProjectController.deleteProject);
/* Routes for tasks */
router.post('/:projectId/tasks', task_1.hasAuthorization, (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre de la tarea es Obligatoria'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La descripcion es  Obligatoria'), validation_1.handleInputErrors, TaskController_1.TaskController.createTask);
router.get('/:projectId/tasks', TaskController_1.TaskController.getProjectTasks);
//se ejeutan siempre que exista el parametro taskId
router.param('taskId', task_1.TaskExists);
router.param('taskId', task_1.TaskBelongsToProject);
router.get('/:projectId/tasks/:taskId', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, TaskController_1.TaskController.getTaskById);
router.put('/:projectId/tasks/:taskId', task_1.hasAuthorization, (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre de la tarea es Obligatoria'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La descripcion es  Obligatoria'), validation_1.handleInputErrors, TaskController_1.TaskController.updateTask);
router.delete('/:projectId/tasks/:taskId', task_1.hasAuthorization, (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, TaskController_1.TaskController.deleteTask);
router.post('/:projectId/tasks/:taskId/status', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), (0, express_validator_1.body)('status')
    .notEmpty().withMessage('El estado es Obligatorio'), validation_1.handleInputErrors, TaskController_1.TaskController.updateStatus);
router.get('/:projectId/team', TeamController_1.TeamMemberController.getProjectTeam);
router.post('/:projectId/team/find', (0, express_validator_1.body)('email')
    .isEmail().toLowerCase().withMessage('El email no es valido'), validation_1.handleInputErrors, TeamController_1.TeamMemberController.findMemberByEmail);
router.post('/:projectId/team', (0, express_validator_1.body)('id')
    .isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, TeamController_1.TeamMemberController.addMemberById);
router.delete('/:projectId/team/:userId', (0, express_validator_1.param)('userId')
    .isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, TeamController_1.TeamMemberController.removeMemberById);
/** routes for notes */
router.post('/:projectId/tasks/:taskId/notes', (0, express_validator_1.body)('content')
    .notEmpty().withMessage('El contenido de la nota es Obligatorio'), validation_1.handleInputErrors, NoteController_1.NoteController.createNote);
router.get('/:projectId/tasks/:taskId/notes', NoteController_1.NoteController.getTaskNotes);
router.delete('/:projectId/tasks/:taskId/notes/:noteId', (0, express_validator_1.param)('noteId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, NoteController_1.NoteController.deleteNote);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map
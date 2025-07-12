
import {Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExists } from '../middleware/project'
import { hasAuthorization, TaskBelongsToProject, TaskExists } from '../middleware/task'
import { authenticate } from '../middleware/auth'
import { TeamMemberController } from '../controllers/TeamController'
import { NoteController } from '../controllers/NoteController'


const router = Router()

router.use(authenticate);//todos los apis tendran que estar autenticados

router.get('/',  ProjectController.getAllProjects)

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion  del Proyecto es Obligatorio'),
        
    handleInputErrors,
    
    ProjectController.createProject)

    router.get('/:id',   
         param('id').isMongoId().withMessage('Id no valido'),
         handleInputErrors,
        ProjectController.getProjectById)



    router.param('projectId', projectExists)//middleware que valida que el proyecto exista en tdos los metodos que tengan el parametro projectId
    
        

    
    router.put('/:projectId',   
        body('projectName')
            .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
        body('clientName')
            .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
        body('description')
            .notEmpty().withMessage('La Descripcion  del Proyecto es Obligatorio'),
        param('projectId').isMongoId().withMessage('Id no valido'),

         handleInputErrors,
         hasAuthorization,
        ProjectController.updateProject)



        router.delete('/:projectId',   
            param('projectId').isMongoId().withMessage('Id no valido'),
            handleInputErrors,
            hasAuthorization,
           ProjectController.deleteProject)



 /* Routes for tasks */


   router.post('/:projectId/tasks',
    hasAuthorization,
        body('name')
            .notEmpty().withMessage('El nombre de la tarea es Obligatoria'),
        body('description')
            .notEmpty().withMessage('La descripcion es  Obligatoria'),
        handleInputErrors,
        TaskController.createTask
    )

    router.get('/:projectId/tasks',
        TaskController.getProjectTasks
    )

    //se ejeutan siempre que exista el parametro taskId
    router.param('taskId', TaskExists)
    router.param('taskId', TaskBelongsToProject)

    router.get('/:projectId/tasks/:taskId',
        param('taskId').isMongoId().withMessage('Id no valido'),
        handleInputErrors,
        TaskController.getTaskById
    )
    router.put('/:projectId/tasks/:taskId',
        hasAuthorization,
        param('taskId').isMongoId().withMessage('Id no valido'),
        body('name')
            .notEmpty().withMessage('El nombre de la tarea es Obligatoria'),
        body('description')
            .notEmpty().withMessage('La descripcion es  Obligatoria'),

        handleInputErrors,
        TaskController.updateTask
    )

    router.delete('/:projectId/tasks/:taskId',
        hasAuthorization,
        param('taskId').isMongoId().withMessage('Id no valido'),
        handleInputErrors,
        TaskController.deleteTask
    )

    router.post('/:projectId/tasks/:taskId/status',
          param('taskId').isMongoId().withMessage('Id no valido'),
          body('status')
            .notEmpty().withMessage('El estado es Obligatorio'),
          handleInputErrors,
            TaskController.updateStatus

    )


    router.get('/:projectId/team',
        TeamMemberController.getProjectTeam

    )

    router.post('/:projectId/team/find',
        body('email')
            .isEmail().toLowerCase().withMessage('El email no es valido'),

        handleInputErrors,
        TeamMemberController.findMemberByEmail
    )

    router.post('/:projectId/team',
        body('id')
          .isMongoId().withMessage('Id no valido'),
        handleInputErrors,
        TeamMemberController.addMemberById
    )

    router.delete('/:projectId/team/:userId',
        param('userId')
          .isMongoId().withMessage('Id no valido'),
        handleInputErrors,
        TeamMemberController.removeMemberById
    )



    /** routes for notes */

  router.post('/:projectId/tasks/:taskId/notes',
   body('content')
        .notEmpty().withMessage('El contenido de la nota es Obligatorio'),
        handleInputErrors,
        NoteController.createNote

  )

  router.get('/:projectId/tasks/:taskId/notes',
     NoteController.getTaskNotes
  )

  router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    NoteController.deleteNote
  )
export default router
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const Task_1 = __importDefault(require("../models/Task"));
class TaskController {
    static createTask = async (req, res) => {
        try {
            const task = new Task_1.default(req.body);
            task.project = req.project.id;
            req.project.task.push(task.id); //agrgeamos la tarea al proyecto   - viene de middleware donde se valida que el proyecto exista y lo guarda en req.project el proyecto
            await Promise.allSettled([task.save(), req.project.save()]);
            res.send('tarea creada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'hubo un error' });
        }
    };
    static getProjectTasks = async (req, res) => {
        try {
            const tasks = await Task_1.default.find({ project: req.project.id }).populate('project'); // se trae la tarea pero cruza con el id del proyecto y se trae la info del proyecto
            res.json({ tasks });
        }
        catch (error) {
            res.status(500).json({ error: 'hubo un error' });
        }
    };
    static getTaskById = async (req, res) => {
        try {
            const { taskId } = req.params;
            const task = await Task_1.default.findById(taskId)
                .populate({ path: 'completedBy.user', select: 'id name email' }) //trae la tarea por id y cruza con el id del usuario que completo la tarea
                .populate({ path: 'notes', populate: { path: 'createdBy', select: 'id name email' } }); //trae las notas de la tarea y cruza con el id del usuario que creo la nota
            if (!task) {
                const error = new Error('Tarea no encontrada');
                res.status(404).json({ error: error.message });
                return;
            }
            res.json(task);
        }
        catch (error) {
            res.status(500).json({ error: 'hubo un error' });
        }
    };
    static updateTask = async (req, res) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;
            await req.task.save();
            res.send('Tarea actualizada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'hubo un error' });
        }
    };
    static deleteTask = async (req, res) => {
        try {
            req.project.task = req.project.task.filter(task => task.toString() !== req.task.id.toString()); //eliminamos la tarea asociada al proyecto
            /// await task.deleteOne() //eliminamos la tarea
            // await req.project.save()
            await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
            res.send('Tarea eliminada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'hubo un error' });
        }
    };
    static updateStatus = async (req, res) => {
        try {
            const { status } = req.body;
            req.task.status = status;
            const data = {
                user: req.user.id,
                status
            };
            req.task.completedBy.push(data); // agregamos el usuario que completa la tarea y el estado de la tarea
            await req.task.save();
            res.send('Tarea actualizada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'hubo un error' });
        }
    };
}
exports.TaskController = TaskController;
//# sourceMappingURL=TaskController.js.map
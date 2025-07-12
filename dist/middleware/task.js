"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskExists = TaskExists;
exports.TaskBelongsToProject = TaskBelongsToProject;
exports.hasAuthorization = hasAuthorization;
const Task_1 = __importDefault(require("../models/Task"));
async function TaskExists(req, res, next) {
    try {
        const { taskId } = req.params;
        const task = await Task_1.default.findById(taskId);
        if (!task) {
            const error = new Error('Tarea  no encontrado');
            res.status(404).json({ error: error.message });
            return;
        }
        req.task = task;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Hubo un error' });
    }
}
function TaskBelongsToProject(req, res, next) {
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error(' Accion no valida');
        res.status(400).json({ error: error.message });
        return;
    }
    next();
}
function hasAuthorization(req, res, next) {
    if (req.user.id.toString() !== req.project.manager.toString()) {
        const error = new Error(' Accion no valida');
        res.status(400).json({ error: error.message });
        return;
    }
    next();
}
//los interfaces se pueden usar 2 con el mismo nombre,
//# sourceMappingURL=task.js.map
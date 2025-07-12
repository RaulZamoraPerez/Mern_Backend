"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Task_1 = __importDefault(require("./Task"));
const Note_1 = __importDefault(require("./Note"));
//mongoose 
const ProjectSchema = new mongoose_1.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    task: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Task' //  le decimos de donde obtiene la inf o q modelo es al que pertenecen esos id
        }
    ],
    manager: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User' //  referencia user
    },
    team: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'User' //  referencia user
        }
    ]
}, { timestamps: true });
//Middleware
ProjectSchema.pre('deleteOne', { document: true }, async function () {
    const projectId = this._id;
    if (!projectId)
        return;
    const tasks = await Task_1.default.find({ project: projectId }); //busca todas las tareas asociadas al proyecto que se va a eliminar,
    for (const task of tasks) {
        await Note_1.default.deleteMany({ task: task._id }); //elimina todas las notas asociadas a cada tarea que se va a eliminar
    }
    await Task_1.default.deleteMany({ project: projectId }); //elimina todas las tareas asociadas al proyecto que se va a eliminar
});
//agregar a la instancia de mongoose el modelo
const Project = mongoose_1.default.model('Project', ProjectSchema); //----------------NOMBRE modelo y esquema
exports.default = Project;
//.populate(): Acceso Completo a la Información Relacionada
// Cuando usas .populate(), Mongoose reemplaza los ObjectIds con los documentos completos de la colección relacionada.
//# sourceMappingURL=Project.js.map
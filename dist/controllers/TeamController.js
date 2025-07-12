"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberController = void 0;
const User_1 = __importDefault(require("../models/User"));
const Project_1 = __importDefault(require("../models/Project"));
class TeamMemberController {
    static getProjectTeam = async (req, res) => {
        const project = await Project_1.default.findById(req.project.id).populate({
            path: 'team',
            select: 'id name email'
        });
        res.json(project.team);
    };
    static findMemberByEmail = async (req, res) => {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email }).select('id email name');
        if (!user) {
            const error = new Error('Usuario no encontrado');
            res.status(404).json({ error: error.message });
            return;
        }
        res.json(user);
    };
    static addMemberById = async (req, res) => {
        const { id } = req.body;
        // Validar que no se agregue a sí mismo
        if (req.user && req.user.id === id) {
            res.status(400).json({ error: 'No puedes agregarte a ti mismo al proyecto' });
            return;
        }
        // Find user
        const user = await User_1.default.findById(id).select('id');
        if (!user) {
            const error = new Error('Usuario No Encontrado');
            res.status(404).json({ error: error.message });
            return;
        }
        if (req.project.team.some(team => team.toString() === user.id.toString())) {
            const error = new Error('El usuario ya existe en el proyecto');
            res.status(409).json({ error: error.message });
            return;
        }
        req.project.team.push(user.id);
        await req.project.save();
        res.send('Usuario agregado correctamente');
    };
    static removeMemberById = async (req, res) => {
        const { userId } = req.params;
        if (!req.project.team.some(team => team.toString() === userId.toString())) {
            const error = new Error('El usuario no existe en el proyecto');
            res.status(409).json({ error: error.message });
            return;
        }
        req.project.team = req.project.team.filter(team => team.toString() !== userId.toString());
        await req.project.save();
        res.send('Usuario eliminado correctamente');
    };
}
exports.TeamMemberController = TeamMemberController;
//# sourceMappingURL=TeamController.js.map
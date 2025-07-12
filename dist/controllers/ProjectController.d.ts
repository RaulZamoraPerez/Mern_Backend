import type { Request, Response } from 'express';
export declare class ProjectController {
    static createProject: (req: Request, res: Response) => Promise<void>;
    static getAllProjects: (req: Request, res: Response) => Promise<void>;
    static getProjectById: (req: Request, res: Response) => Promise<void>;
    static updateProject: (req: Request, res: Response) => Promise<void>;
    static deleteProject: (req: Request, res: Response) => Promise<void>;
}

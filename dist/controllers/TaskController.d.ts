import type { Request, Response } from 'express';
export declare class TaskController {
    static createTask: (req: Request, res: Response) => Promise<void>;
    static getProjectTasks: (req: Request, res: Response) => Promise<void>;
    static getTaskById: (req: Request, res: Response) => Promise<void>;
    static updateTask: (req: Request, res: Response) => Promise<void>;
    static deleteTask: (req: Request, res: Response) => Promise<void>;
    static updateStatus: (req: Request, res: Response) => Promise<void>;
}

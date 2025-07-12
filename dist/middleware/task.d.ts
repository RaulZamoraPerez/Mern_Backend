import type { Request, Response, NextFunction } from 'express';
import { ITask } from '../models/Task';
declare global {
    namespace Express {
        interface Request {
            task: ITask;
        }
    }
}
export declare function TaskExists(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function TaskBelongsToProject(req: Request, res: Response, next: NextFunction): void;
export declare function hasAuthorization(req: Request, res: Response, next: NextFunction): void;

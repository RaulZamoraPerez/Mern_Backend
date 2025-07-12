import { Request, Response } from "express";
export declare class TeamMemberController {
    static getProjectTeam: (req: Request, res: Response) => Promise<void>;
    static findMemberByEmail: (req: Request, res: Response) => Promise<void>;
    static addMemberById: (req: Request, res: Response) => Promise<void>;
    static removeMemberById: (req: Request, res: Response) => Promise<void>;
}

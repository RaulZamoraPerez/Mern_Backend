import type { Request, Response } from 'express';
import { INote } from '../models/Note';
import { Types } from 'mongoose';
type NoteParams = {
    noteId: Types.ObjectId;
};
export declare class NoteController {
    static createNote: (req: Request<{}, {}, INote>, res: Response) => Promise<void>;
    static getTaskNotes: (req: Request, res: Response) => Promise<void>;
    static deleteNote: (req: Request<NoteParams>, res: Response) => Promise<void>;
}
export {};

import mongoose, { Document, Types } from 'mongoose';
export interface INote extends Document {
    content: string;
    createdBy: Types.ObjectId;
    task: Types.ObjectId;
}
declare const Note: mongoose.Model<INote, {}, {}, {}, mongoose.Document<unknown, {}, INote, {}> & INote & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Note;

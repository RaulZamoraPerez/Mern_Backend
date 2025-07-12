import mongoose, { Document, PopulatedDoc } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";
/**haces es heredar las funciones ,
   todo el tipado de document y me permite a mi ir
   definiendo la propia forma que yo quiero en el type */
export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    task: PopulatedDoc<ITask & Document>[];
    manager: PopulatedDoc<IUser & Document>;
    team: PopulatedDoc<IUser & Document>[];
}
declare const Project: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}> & IProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Project;

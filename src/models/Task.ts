
import mongoose, { Schema, Document, Types } from "mongoose";
import Note from "./Note";


const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'

} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

//typescript type
export interface ITask extends Document {
    name: string
    description: string
    project: Types.ObjectId
    status: TaskStatus
    completedBy: {
        user: Types.ObjectId,
        status: TaskStatus
    }[] // es un array de objetos 
    notes: Types.ObjectId[] // array de notas asociadas a la tarea
}

//mongoose
export const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    },
    completedBy: [
      {
         user: {
            type: Types.ObjectId, //referencia usuario que completa la tarea
            ref: 'User',
            default: null //por defecto no hay usuario que complete la tareap
        },
        status:{
            type: String,
            enum: Object.values(taskStatus),
            default: taskStatus.PENDING
        }
      }
    ],
    notes:[
        {
            type: Types.ObjectId, //referencia a la nota
            ref: 'Note',
            default: []
        }
    ]
}, { timestamps: true })


//Middleware

TaskSchema.pre('deleteOne', {document: true}, async function() {

    const taskId = this._id;
    if(!taskId) return 
    await Note.deleteMany({ task: taskId });//elimiina todas las notas asociadas a la tarea que se va a eliminar
    
})

const Task = mongoose.model<ITask>('Task', TaskSchema)

export default Task;
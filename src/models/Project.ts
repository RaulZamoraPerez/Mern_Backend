import mongoose, {Schema, Document, PopulatedDoc, Types}  from "mongoose";
import Task, { ITask } from "./Task";
import { IUser } from "./User";
import Note from "./Note";

//Document & 
/**haces es heredar las funciones ,
   todo el tipado de document y me permite a mi ir 
   definiendo la propia forma que yo quiero en el type */


//typescript type
export interface IProject extends Document  {
    projectName: string,
    clientName: string,
    description: string,
    task: PopulatedDoc<ITask & Document>[]
    manager : PopulatedDoc<IUser & Document>
    team: PopulatedDoc<IUser & Document>[]
}

//mongoose 
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required :true,
        trim: true, 
        
    },
    clientName:{
        type: String,
        required :true,
        trim: true, 
    },
    description:{
        type: String,
        required :true,
        trim: true, 
    },
    task:[
      {
        type: Types.ObjectId,
        ref: 'Task'//  le decimos de donde obtiene la inf o q modelo es al que pertenecen esos id
      }
    ],
    manager:{
        type: Types.ObjectId,
        ref: 'User'//  referencia user
    },
    team:[
      {
        type: Types.ObjectId,
        ref: 'User'//  referencia user
      }
    ]
    
}, {timestamps: true})


//Middleware
ProjectSchema.pre('deleteOne', { document: true }, async function() {
  const projectId = this._id;
    if(!projectId) return


    const tasks = await Task.find({ project: projectId });//busca todas las tareas asociadas al proyecto que se va a eliminar,

    for (const task of tasks) {
        await Note.deleteMany({ task: task._id });//elimina todas las notas asociadas a cada tarea que se va a eliminar
    }
    await Task.deleteMany({ project: projectId });//elimina todas las tareas asociadas al proyecto que se va a eliminar


  
    })  
  
  

//agregar a la instancia de mongoose el modelo
const Project = mongoose.model<IProject>('Project', ProjectSchema);//----------------NOMBRE modelo y esquema

export default Project; 




//.populate(): Acceso Completo a la Información Relacionada
// Cuando usas .populate(), Mongoose reemplaza los ObjectIds con los documentos completos de la colección relacionada.
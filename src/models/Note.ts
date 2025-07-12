

import mongoose,  { Schema, Document, Types } from 'mongoose';


//ts
export interface INote extends Document{
   content: string
   createdBy: Types.ObjectId //usuario que crea la nota
   task: Types.ObjectId //tarea a la que pertenece la nota
}


const NoteSchema : Schema = new Schema({
   content: {
        type: String,
        required: true
   },
   createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
   },
    task: {
          type: Types.ObjectId,
          ref: 'Task',
          required: true
    }
},
  {timestamps: true} // Agrega createdAt y updatedAt automáticamente
 )

const Note = mongoose.model<INote>('Note', NoteSchema);
export default Note;
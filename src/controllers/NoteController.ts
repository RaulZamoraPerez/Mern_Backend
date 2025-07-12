
import type { Request, Response } from 'express';

import Note, { INote } from '../models/Note';
import { Types } from 'mongoose';

type NoteParams ={
    noteId: Types.ObjectId
}

export class NoteController {

    static  createNote = async( req: Request<{},{}, INote>, res: Response) => {
        const { content } = req.body;

        const note = new Note()

        note.content = content;
        note.createdBy = req.user.id;
        note.task = req.task.id

        req.task.notes.push(note.id);

        try{
            await Promise.allSettled([req.task.save(), note.save()])    
            res.send('nota creada correctamente');
        }
        catch (error) {
            res.status(500).json({error: 'Error al crear la nota'});
        }
    }

    static getTaskNotes = async (req: Request, res: Response) => {
        try {
            const notes = await Note.find({task: req.task.id})
            res.json(notes);
        } catch (error) {
            res.status(500).json({error: 'Error al obtener las notas de la tarea'});
        }
    }

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
         const { noteId } = req.params;

        const note = await Note.findById(noteId)
        if(!note){
            const error = new Error('Nota no encontrada');
            res.status(404).json({error: error.message});
            return;
        }

        // Verificar si la nota pertenece a la usuario que la está eliminando
        if(note.createdBy.toString() !== req.user.id){
            const error = new Error('No tienes permiso para eliminar esta nota');
            res.status(401).json({error: error.message});
            return;
        }

        //elminar la referencia de la nota en la tarea
          req.task.notes = req.task.notes.filter((noteId) => noteId.toString() !== note._id.toString());

        try {
            await Promise.allSettled([
                req.task.save(), // Guardar los cambios en la tarea
                note.deleteOne() // Eliminar la nota
            ]);
            res.send('Nota eliminada correctamente');

        } catch (error) {
            res.status(500).json({error: 'Error al eliminar la nota'});
            return;
        }
    }

}
import mongoose, { Schema, model, Document } from "mongoose";

export interface INote extends Document {
    _id: Schema.Types.ObjectId;
    title: string;
    body: string;
    createdAt: Date;
}

const NoteSchema = new Schema<INote>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Note = model<INote>("Note", NoteSchema);

module.exports = Note;
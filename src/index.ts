require('./database/mongoose');
import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { INote } from './models/notes/note';
const Note = require('./models/notes/note');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const app = express();
app.use(jsonParser);
app.use(urlencodedParser);

app.get('/', (req: Request, res: Response) => {
    res.send('Application works!');
});

app.post('/nps', (req: Request, res: Response) => {
    const { interceptor, appId, appToken } = req.body;
    console.log("registration: ", { interceptor, appId, appToken });
    res.status(500).send({
        data: null,
        // data: ["one", "two", "three", "four"],
        numbers: 156,
        app: "my cool test app"
    });
});

app.get('/notes', async (req: Request, res: Response) => {
    try {
        const notes = await Note.find({});
        res.send(notes);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/notes', async (req: Request, res: Response) => {
    const note = new Note({
        title: req.body.title,
        body: req.body.body
    });
    try {
        const notesave = await note.save();
        res.status(201).send(notesave);
    } catch (error) {
        res.status(400).send(error);
    }   
});

// update a note by id
app.patch('/notes/:id', async (req: Request, res: Response) => {
    try {
        console.log({object: req.body.note});
        const note: INote = await Note.findByIdAndUpdate(req.params.id, req.body.note, { new: true, runValidators: true });
        if (!note) {
            res.status(404).send();
        }
        console.log({ note });
        res.send(note);
    } catch (error) {
        res.status(400).send(error);
    }
});

// delete a note by id
app.delete('/notes/:id', async (req: Request, res: Response) => {
    try {
        console.log("delete note: ", req.params.id);
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            res.status(404).send();
        }
        res.send(note);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.listen(3021, () => {
    console.log('Application started on port 3000!');
});
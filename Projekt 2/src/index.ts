import express from 'express'
import { Request, Response } from 'express'
import { Note } from './note'
import { v4 as uuidv4 } from 'uuid'
import { parse } from 'path'
import { create } from 'domain'
import { unwatchFile } from 'fs'

const app = express()

app.use(express.json())

const notes: Note[] = []

app.get('/note', function (req: Request, res: Response) { // getting all notes
    res.status(200).send(notes)
})

app.get('/note/:id', function (req: Request, res: Response) { // getting single note by id
    const id = req.params.id
    const result = notes.find(el => el.id === id)

    if (result) {
        res.status(200).send(result)
        console.log(result)
    }
    else {
        res.status(404).send("Notatka nie istnieje")
    }

})
let noteId: number = 0;
app.post('/note', function (req: Request, res: Response) {

    const id = req.body.id
    const title = req.body.title
    const content = req.body.content
    let createDate = req.body.createDate
    const date_ob = new Date().toISOString();
    const note = req.body;

    if (createDate === undefined) {
        createDate = date_ob
    }

    if (title === undefined) {
        res.status(400).send('Podaj poprawny tytuł!')
        console.log("Podaj poprawny tytuł!")
    }

    if (content === undefined) {
        res.status(400).send('Podaj poprawna tresc!')
        console.log("Podaj poprawna tresc!")
    }

    noteId++ // random id
    const noteFinish = { ...note, id: noteId, createDate: createDate } // dodanie do obiektu "note" nowego param "id", "date"
    notes.push(noteFinish)

    console.log(noteFinish)
    res.status(201).send(noteFinish)
    console.log(notes)
})

app.delete('/note/:id', function (req: Request, res: Response) {

    const id = req.params.id
    const result = notes.find(el => el.id === id) // znalezienie note z danym id
    const index = notes.indexOf(result!, 0);

    if (index > -1) {
        notes.splice(index, 1);
    }
    res.status(204).send(notes)
    console.log(notes)

})

app.put('/note/:id', function (req: Request, res: Response) {
    const id = req.params.id
    const changeNote = req.body
    const title = req.body.title
    const content = req.body.content

    const result = notes.find(el => el.id === id)
    const index = notes.indexOf(result!, 0);

    if (title === undefined) {
        res.status(404).send('Podaj poprawny tytuł!')
        console.log("Podaj poprawny tytuł!")
    }

    if (content === undefined) {
        res.status(404).send('Podaj poprawna tresc!')
        console.log("Podaj poprawna tresc!")
    }

    if (index > -1) {
        notes[index] = changeNote
        res.status(204).send(notes)
    }
    else {
        res.status(404).send("Notatka nie istnieje")
    }
    console.log(notes)
})

app.listen(3000)
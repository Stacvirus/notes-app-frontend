import React, { useEffect } from "react";
import { useState } from "react";
import Note from "./Note";
import "./button.css"
import ServerData from "./Server"

function FormApp(props) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("")
    const [imp, setImp] = useState(false)

    useEffect(fetchNotes, [])

    function fetchNotes() {
        ServerData.getData()
            .then(resp => {
                console.log(resp)
                setNotes(resp)
            })
    }

    function processNotes(e) {
        e.preventDefault();
        const isExist = notes.filter(note => note.content == newNote ? true : false)
        isExist[0] ? updateNote(isExist[0]) : addNote()
        // setNewNote("")
    }

    function updateNote(changedNote) {
        const id = changedNote.id
        ServerData.updateNode(id, changedNote)
            .then(resp => {
                setNotes(notes.map(note => note.id != resp.id ? note : resp))
            })
    }

    function addNote() {
        const newObject = {
            content: newNote,
            important: Math.random != 1
        }
        ServerData.createNode(newObject)
            .then(resp => setNotes(notes.concat(resp)))
            .catch(error => {
                console.log(error.message)
            })
    }

    function handleNoteChange(e) {
        setNewNote(e.target.value);
    }

    function handleImpotance() {
        setImp(!imp)
    }

    function handleDel(id) {
        ServerData.deleteNote(id)
            .then(resp => console.log("deletion complete"))
        fetchNotes()
    }

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((note, id) => <Note note={note} key={id} state={imp} delSignal={handleDel} />)}
            </ul>
            <form onSubmit={processNotes}>
                <input type="text" value={newNote} onChange={handleNoteChange} />
                <button type="submit">Save</button>
            </form>
            <button onClick={handleImpotance}>important</button>
        </div>
    )
}

export default FormApp;
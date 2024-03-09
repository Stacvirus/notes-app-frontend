import { useState } from "react";

function NoteForm({ giveNote }) {

    const [newNote, setNewNote] = useState('');

    function handleNoteChange(e) {
        setNewNote(e.target.value);
    }

    function processNotes(e) {
        e.preventDefault()
        giveNote(newNote)
    }

    return (
        <div className="formDiv">
            <h2>Create a new note</h2>
            <form onSubmit={processNotes}>
                <input type='text' value={newNote} onChange={handleNoteChange} />
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default NoteForm
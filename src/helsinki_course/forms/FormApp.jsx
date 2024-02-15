import React, { useEffect, useState, useRef } from "react";
import Note from "./Note";
import "./button.css"
import ServerData from "./Server"
import Login from "./loginForm";
import Togglable from "./Togglable";

function FormApp(props) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [imp, setImp] = useState(false);
    const [user, setUser] = useState(undefined);

    const noteFormRef = useRef();

    useEffect(fetchNotes, []);

    function fetchNotes() {
        ServerData.getData()
            .then(resp => {
                console.log(resp);
                const fetchedNotes = resp;
                setNotes(fetchedNotes);
            })
    }

    //useeffect to read local storage
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            setUser(user);
            ServerData.setToken(user.token);
        }
    }, []);

    function processNotes(e) {
        e.preventDefault();
        const isExist = notes.filter(note => note.content == newNote ? true : false);
        isExist[0] ? updateNote(isExist[0]) : addNote();
        // setNewNote("")
    }

    function updateNote(changedNote) {
        const id = changedNote.id;
        ServerData.updateNode(id, changedNote)
            .then(resp => {
                setNotes(notes.map(note => note.id != resp.id ? note : resp))
            });
    }

    function addNote() {
        const newObject = {
            content: newNote,
            important: Math.random != 1
        }
        ServerData.createNode(newObject)
            .then(resp => setNotes(notes.concat(resp)))
            .catch(error => {
                console.log(error.message);
            })
        noteFormRef.current.handleVisibility();
    }

    function handleNoteChange(e) {
        setNewNote(e.target.value);
    }

    function handleImpotance() {
        setImp(!imp);
    }

    const handleDel = async (id) => {
        try {
            await ServerData.deleteNote(id);
            console.log("deletion complete");
            fetchNotes();
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async (userIds) => {
        try {
            const user = await ServerData.userLogin(userIds);
            setUser(user);

            // saving to local storage
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )

            ServerData.setToken(user.token);

        } catch (error) {
            setErrorMsg('wrong credentials');
            setTimeout(() => {
                setErrorMsg(null);
            }, 5000);
        }
    }

    function showLoginform() {
        return <Login login={login} />
    }

    function showNoteForm() {
        return (
            <form onSubmit={processNotes}>
                <input type="text" value={newNote} onChange={handleNoteChange} />
                <button type="submit">Save</button>
            </form>
        )
    }

    return (
        <div>
            <Togglable btnLabel="login">
                {!user && showLoginform()}
            </Togglable>
            <Togglable btnLabel="new blog" ref={noteFormRef}>
                {user && <div><p>{user.username} logged in</p> {showNoteForm()} </div>}
            </Togglable>
            <h1>Notes</h1>
            <ul>
                {notes.map((note, id) => <Note note={note} key={id} state={imp} delSignal={handleDel} />)}
            </ul>

            <button onClick={handleImpotance}>important</button>
        </div>
    )
}

export default FormApp;
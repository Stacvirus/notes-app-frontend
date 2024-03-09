import React, { useEffect, useState, useRef } from 'react';
import Note from './Note';
import './button.css'
import ServerData from './Server'
import Login from './loginForm';
import Togglable from './Togglable';
import NoteForm from './NoteForm';

function FormApp() {
    const [notes, setNotes] = useState([]);
    const [imp, setImp] = useState(false);
    const [user, setUser] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState('');

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

    function processNotes(newNote) {
        const isExist = notes.filter(note => note.content == newNote ? true : false);
        isExist[0] ? updateNote(isExist[0]) : addNote(newNote);
        // setNewNote('')
    }

    function updateNote(changedNote) {
        const id = changedNote.id;
        ServerData.updateNode(id, changedNote)
            .then(resp => {
                setNotes(notes.map(note => note.id != resp.id ? note : resp))
            });
    }

    function addNote(content) {
        const newObject = {
            content: content,
            important: Math.random != 1
        }
        ServerData.createNode(newObject)
            .then(resp => setNotes(notes.concat(resp)))
            .catch(error => {
                console.log(error.message);
            })
        noteFormRef.current.handleVisibility();
    }



    function handleImpotance() {
        setImp(!imp);
    }

    const handleDel = async (id) => {
        try {
            await ServerData.deleteNote(id);
            console.log('deletion complete');
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
            // <div className="formDiv">
            //     <h2>Create a new note</h2>
            //     <form onSubmit={processNotes}>
            //         <input type='text' value={newNote} onChange={handleNoteChange} />
            //         <button type='submit'>Save</button>
            //     </form>
            // </div>
            <NoteForm giveNote={processNotes} />
        )
    }

    return (
        <div>
            {user && <p>{user.username} logged in</p>}
            <Togglable btnLabel='login'>
                {!user && showLoginform()}
            </Togglable>
            <Togglable btnLabel='new note' ref={noteFormRef}>
                {user && <div> {showNoteForm()} </div>}
            </Togglable>
            <h1>Notes</h1>
            <ul>
                {notes.map((note, id) => {
                    if (imp) {
                        if (note.important) return <Note note={note} key={id} delSignal={handleDel} updateNote={updateNote} />
                    } else if (!imp) {
                        return <Note note={note} key={id} delSignal={handleDel} updateNote={updateNote} />
                    }
                })}
            </ul>

            <button onClick={handleImpotance}>important</button>
        </div>
    )
}

export default FormApp;
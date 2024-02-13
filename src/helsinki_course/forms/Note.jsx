function Note({note, state, delSignal}){
    function handleDel(){
        return delSignal(note.id)
    }

    if(state){
        return  state == note.important && <li>{note.content} <button onClick={handleDel}>Delete</button></li>
    } else{
        return  <li>{note.content} <button onClick={handleDel}>Delete</button></li>
    }
}

export default Note;
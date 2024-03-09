import PropTypes, { func } from 'prop-types'

function Note({ note, delSignal, updateNote }) {

    const btnLabel = note.important ? 'make not important' : 'make important'
    // console.log(note)
    // note.important ? setBtnLabel('make not important') : setBtnLabel('make important')

    function handleDel() {
        return delSignal(note.id)
    }
    function changedNote() {
        updateNote(note)
    }

    return <li className='note'>{note.content} <button onClick={handleDel}>Delete</button> <button onClick={changedNote}>{btnLabel}</button></li>
}

Note.propTypes = {
    note: PropTypes.object.isRequired,
    delSignal: PropTypes.func.isRequired
}

export default Note;
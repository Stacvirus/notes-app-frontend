import PropTypes from 'prop-types'

function Note({ note, state, delSignal }) {
    function handleDel() {
        return delSignal(note.id)
    }

    if (state) {
        return state == note.important && <li>{note.content} <button onClick={handleDel}>Delete</button></li>
    } else {
        return <li>{note.content} <button onClick={handleDel}>Delete</button></li>
    }
}

Note.propTypes = {
    note: PropTypes.object.isRequired,
    state: PropTypes.bool.isRequired,
    delSignal: PropTypes.func.isRequired
}

export default Note;
const { useState } = React
const { useOutletContext } = ReactRouterDOM

import { reactUtilService } from "../../../services/react-util.service.js"

import { NoteMenu } from "./NoteMenu.jsx"

export function NoteAdd() {

    const { activeElement, newNote, onAddNote } = useOutletContext()
    const [newNoteToSave, setNewNoteToSave] = useState({ ...newNote.current, id: 'new-note' })
    const [hoveredNoteId, setHoveredNoteId] = useState(null)
    const isHovered = newNoteToSave.id === hoveredNoteId

    function handleMouseEnter(noteId) {
        setHoveredNoteId(noteId)
    }

    function handleMouseLeave(noteId) {
        if (activeElement.noteId === noteId) return
        setHoveredNoteId(null)
    }

    function setNewNote(newProps) {
        setNewNoteToSave({ ...newNoteToSave, ...newProps })
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onAddNote(newNoteToSave)
    }

    const noteStyle = { backgroundColor: newNoteToSave.style.backgroundColor.color }

    return <div className="add-note">
        <div className="note outline-box1"
            onMouseEnter={() => handleMouseEnter(newNoteToSave.id)}
            onMouseLeave={() => handleMouseLeave(newNoteToSave.id)}
            style={noteStyle}
        >
            <form onSubmit={onSubmit}>
                <input
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    value={newNoteToSave.title}
                    name="title"
                    type="text"
                    placeholder="Title"
                />
                <input
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    value={newNoteToSave.info.txt}
                    name="info-txt"
                    type="text"
                    placeholder="Take a note..."
                />
                <button type="submit">Save</button>
            </form>
            <NoteMenu note={newNoteToSave} isHovered={isHovered} onSetNewNote={setNewNote} />
        </div>
    </div>
}
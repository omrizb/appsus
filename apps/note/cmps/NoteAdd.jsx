const { useState, useRef } = React
const { useOutletContext } = ReactRouterDOM

import { reactUtilService } from "../../../services/react-util.service.js"

import { NoteMenu } from "./NoteMenu.jsx"

export function NoteAdd() {

    const { activeElement, newNote, onAddNote } = useOutletContext()
    const [newNoteToSave, setNewNoteToSave] = useState({ ...newNote.current, id: 'new-note' })
    const [hoveredNoteId, setHoveredNoteId] = useState(null)
    const textareaRef = useRef(null)
    const addNoteBtnRef = useRef(null)
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

    function adjustTextareaHeight() {
        const textarea = textareaRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
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
                <textarea
                    ref={textareaRef}
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    onInput={adjustTextareaHeight}
                    value={newNoteToSave.info.txt}
                    name="info-txt"
                    type="text"
                    rows="1"
                    placeholder="Take a note..."
                />
                <button ref={addNoteBtnRef} type="submit" hidden></button>
            </form>
            <NoteMenu note={newNoteToSave} isHovered={isHovered} onSetNewNote={setNewNote} btnRef={addNoteBtnRef} />
        </div>
    </div>
}
const { useState } = React
const { useOutletContext } = ReactRouterDOM

import { NoteAdd } from "./NoteAdd.jsx"
import { NoteMenu } from "./NoteMenu.jsx"
import { NotePreview } from "./NotePreview.jsx"

export function NoteList() {

    const { notes, activeElement, onElementToggle, onSaveNote, onSendToTrash } = useOutletContext()
    const [hoveredNoteId, setHoveredNoteId] = useState(null)

    function handleMouseEnter(noteId) {
        setHoveredNoteId(noteId)
    }

    function handleMouseLeave(noteId) {
        if (activeElement.noteId === noteId) return
        setHoveredNoteId(null)
    }

    return <div className="note-list">
        <ul>
            {notes.map(note => {
                const noteStyle = { backgroundColor: note.style.backgroundColor.color }
                const isHovered = note.id === hoveredNoteId
                const isActive = isHovered || activeElement.noteId === note.id
                return (
                    <li key={note.id}
                        className={isActive ? 'box-shadow' : ''}
                        onMouseEnter={() => handleMouseEnter(note.id)}
                        onMouseLeave={() => handleMouseLeave(note.id)}
                        style={noteStyle}
                    >
                        <NotePreview note={note} />
                        <NoteMenu
                            activeElement={activeElement}
                            onElementToggle={onElementToggle}
                            onSaveNote={onSaveNote}
                            onSendToTrash={onSendToTrash}
                            isHovered={isHovered}
                            noteId={note.id}
                        />
                    </li>
                )
            }
            )}
        </ul>
    </div>
}

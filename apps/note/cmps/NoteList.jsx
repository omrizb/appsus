const { useState } = React
const { useOutletContext } = ReactRouterDOM

import { NoteMenu } from "./NoteMenu.jsx"
import { NotePreview } from "./NotePreview.jsx"
import { TrashMenu } from "./TrashMenu.jsx"

export function NoteList({ isTrash }) {

    const { notes, activeElement } = useOutletContext()
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
                        {(isTrash)
                            ? <TrashMenu
                                isHovered={isHovered}
                                note={note}
                            />
                            : <NoteMenu
                                isHovered={isHovered}
                                note={note}
                            />
                        }
                    </li>
                )
            }
            )}
        </ul>
    </div>
}

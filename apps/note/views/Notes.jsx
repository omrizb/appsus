const { useState } = React
const { useOutletContext } = ReactRouterDOM

import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"

export function Notes() {

    const { notes, newNotes } = useOutletContext()
    const [addNoteStyle, setAddNoteStyle] = useState(null)
    const hasPinned = notes.some(note => note.isPinned)

    function onSetStyle(style) {
        setAddNoteStyle(style)
    }

    return <div className="notes">
        <div className="add-note">
            <div className="note-container outline-box1" style={addNoteStyle}>
                <NoteEdit onSetStyle={onSetStyle} note={{ ...newNotes.current.NoteTxt, id: 'new-note' }} />
            </div>
        </div>
        {hasPinned && <div className="pinned-notes">
            <h3>Pinned</h3>
            <NoteList notesToShow={notes.filter(note => !note.isTrashed && note.isPinned)} allNotes={notes} />
        </div>}
        <div className="non-pinned-notes">
            {hasPinned && <h3>Others</h3>}
            <NoteList notesToShow={notes.filter(note => !note.isTrashed && !note.isPinned)} allNotes={notes} />
        </div>
    </div>
}

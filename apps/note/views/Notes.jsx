const { useOutletContext } = ReactRouterDOM

import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"

export function Notes() {

    const { notes } = useOutletContext()
    const hasPinned = notes.some(note => note.isPinned)

    return <div className="notes">
        <NoteEdit />
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

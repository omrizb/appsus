const { useOutletContext } = ReactRouterDOM

import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteList } from "../cmps/NoteList.jsx"

export function Notes() {

    const { notes } = useOutletContext()

    return <div className="notes">
        <NoteAdd />
        <div className="pinned-notes">
            <h3>Pinned</h3>
            <NoteList notes={notes.filter(note => note.isPinned)} />
        </div>
        <div className="non-pinned-notes">
            <h3>Others</h3>
            <NoteList notes={notes.filter(note => !note.isPinned)} />
        </div>
    </div>
}

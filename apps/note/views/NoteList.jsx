const { useOutletContext } = ReactRouterDOM

import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList() {
    const { notes } = useOutletContext()

    return <div className="note-list">
        <NoteAdd />
        <ul>
            {notes.map(note => <li key={note.id}>
                <NotePreview note={note} />
            </li>)}
        </ul>
    </div>
}

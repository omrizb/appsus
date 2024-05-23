const { useOutletContext } = ReactRouterDOM

import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList() {
    console.log(useOutletContext())
    const { notes } = useOutletContext()

    return <ul className="note-list">
        {notes.map(note => <li key={note.id}>
            <NotePreview note={note} />
        </li>)}
    </ul>
}

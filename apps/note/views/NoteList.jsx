const { useOutletContext } = ReactRouterDOM

import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList() {
    console.log(useOutletContext())
    const { notes } = useOutletContext()

    return <ul className="note-list">
        {notes.map(note => <li key={note.id}>
            <NotePreview />
            <pre>
                {JSON.stringify(note, null, 4)}
            </pre>
        </li>)}
    </ul>
}

import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
    return <ul className="note-list">
        {notes.map(note => <li key={note.id}>
            <NotePreview />
            <pre>
                {JSON.stringify(note, null, 4)}
            </pre>
        </li>)}
    </ul>
}

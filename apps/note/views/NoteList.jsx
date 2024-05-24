const { useOutletContext } = ReactRouterDOM

import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList() {
    const { notes, activeElement, onElementToggle, onSendToTrash } = useOutletContext()

    return <div className="note-list">
        <NoteAdd />
        <ul>
            {notes.map(note => <li key={note.id}>
                <NotePreview
                    note={note}
                    activeElement={activeElement}
                    onElementToggle={onElementToggle}
                    onSendToTrash={onSendToTrash}
                />
            </li>)}
        </ul>
    </div>
}

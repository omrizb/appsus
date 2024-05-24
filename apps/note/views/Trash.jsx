const { useState, useEffect, useRef } = React
const { useOutletContext } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

import { NotePreview } from "../cmps/NotePreview.jsx"

export function Trash() {

    const { activeElement, onElementToggle } = useOutletContext()

    const [notes, setNotes] = useState([])
    const filterBy = useRef({ ...noteService.getEmptyFilter, isTrashed: true })

    useEffect(() => {
        noteService.query(filterBy.current)
            .then(setNotes)
    }, [])

    return <div className="trash">
        <ul>
            {notes.map(note => <li key={note.id}>
                <NotePreview
                    note={note}
                    activeElement={activeElement}
                    onElementToggle={onElementToggle}
                />
            </li>)}
        </ul>
    </div>
}

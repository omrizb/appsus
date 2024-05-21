const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'

import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        noteService.query()
            .then(setNotes)
    }, [])

    return <section className="note-index">
        <h1>Notes</h1>
        <NoteList notes={notes} />
    </section>
}

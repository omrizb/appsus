const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM

import { noteService } from '../services/note.service.js'

import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteSideNav } from '../cmps/NoteSideNav.jsx'

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        noteService.query()
            .then(setNotes)
    }, [])

    return <section className="note-index">
        <NoteHeader />
        <NoteSideNav />
        <section className="note-main-view">
            <Outlet className="bbb" context={{ notes }} />
        </section>
    </section>
}

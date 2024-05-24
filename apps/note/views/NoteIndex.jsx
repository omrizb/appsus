const { useState, useEffect } = React
const { Outlet, useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteSideNav } from "../cmps/NoteSideNav.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        noteService.query(filterBy)
            .then(setNotes)
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    return <section className="note-index">
        <NoteHeader filterBy={filterBy} onFilter={onSetFilterBy} />
        <NoteSideNav />
        <section className="note-main-view">
            <Outlet context={{ notes }} />
        </section>
    </section>
}

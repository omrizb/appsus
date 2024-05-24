const { useState, useEffect, useRef } = React
const { Outlet, useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteSideNav } from "../cmps/NoteSideNav.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [activeElement, setActiveElement] = useState({ noteId: null, item: null })
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState({ ...noteService.getFilterFromSearchParams(searchParams), isTrashed: false })

    const containerRef = useRef(null)

    useEffect(() => {
        noteService.query(filterBy)
            .then(setNotes)
    }, [filterBy])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function sendToTrash(noteId) {
        noteService.setTrashProp(noteId)
            .then(() => {
                setFilterBy({ ...filterBy })
                showSuccessMsg('Note sent to Trash.')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Send note to Trash failed.')
            })
    }

    function handleElementToggle(noteId, item) {
        if (activeElement.noteId === noteId && activeElement.item === item) {
            setActiveElement({ noteId: null, item: null })
        } else {
            setActiveElement({ noteId, item })
        }
    }

    function handleClickOutside(ev) {
        if (containerRef.current && !containerRef.current.contains(ev.target)) {
            setActiveElement({ noteId: null, item: null })
        }
    }

    return <section ref={containerRef} className="note-index">
        <NoteHeader filterBy={filterBy} onFilter={onSetFilterBy} />
        <NoteSideNav />
        <section className="note-main-view">
            <Outlet context={{
                notes,
                activeElement,
                onElementToggle: handleElementToggle,
                onSendToTrash: sendToTrash
            }} />
        </section>
    </section>
}

const { useState, useEffect, useRef } = React
const { Outlet, useSearchParams, useLocation } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteSideNav } from "../cmps/NoteSideNav.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [activeElement, setActiveElement] = useState({ noteId: null, item: null })
    const [searchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(true)
    const containerRef = useRef(null)
    const currFolder = useRef(null)
    const location = useLocation()

    useEffect(() => {
        document.querySelector('#favicon').href = '../../../assets/favicons/note-favicon.png'
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])


    const [filterBy, setFilterBy] = useState({
        ...noteService.getEmptyFilter(),
        ...noteService.getFilterFromSearchParams(searchParams),
        isTrashed: false
    })

    useEffect(() => {
        const pathElements = location.pathname.split('/')
        const locationFolder = `/${pathElements[1]}/${pathElements[2]}/`

        if (currFolder.current === locationFolder) return

        currFolder.current = locationFolder
        const isTrashed = currFolder.current.includes('trash')
        setFilterBy(prevFilter => ({ ...prevFilter, isTrashed }))
    }, [location])

    useEffect(() => {
        setIsLoading(true)
        noteService.query(filterBy)
            .then(setNotes)
            .finally(() => setIsLoading(false))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function saveNote(newProps, noteId) {
        const noteToSave = { ...notes.find(note => note.id === noteId), ...newProps }
        noteService.save(noteToSave)
    }

    function sendNoteToTrash(noteId) {
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
            {isLoading
                ? <p>Loading...</p>
                : <Outlet context={{
                    notes,
                    activeElement,
                    onElementToggle: handleElementToggle,
                    onSaveNote: saveNote,
                    onSendToTrash: sendNoteToTrash
                }} />
            }
        </section>
    </section>
}

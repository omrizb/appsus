const { useState, useEffect, useRef } = React
const { Outlet, useSearchParams, useLocation, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteSideNav } from "../cmps/NoteSideNav.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [activeElement, setActiveElement] = useState({ noteId: null, item: null })
    const [searchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(true)
    const newNote = useRef(noteService.getEmptyNote('NoteTxt'))
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

    function updateNoteLocally(updatedNote) {
        setNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note))
    }

    function addNote(note) {
        delete note.id
        noteService.save(note)
            .then(savedNote => setNotes([...notes, savedNote]))
            .catch(err => {
                console.error('Error:', err);
                showErrorMsg('Failed to add note.');
            })
    }

    function saveNote(note, newProps = {}) {
        const updatedNote = { ...note, ...newProps }
        updateNoteLocally(updatedNote)

        noteService.save(updatedNote)
            .then(() => showSuccessMsg('Note updated successfully.'))
            .catch(err => {
                console.error('Error:', err);
                showErrorMsg('Failed to update note.');
                updateNoteLocally(note);
            })
    }

    function sendNoteToTrash(noteId) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
        noteService.setTrashProp(noteId)
            .then(() => {
                showSuccessMsg('Note sent to Trash.')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Send note to Trash failed.')
            })
    }

    function removeAllTrash() {
        setNotes([])
        noteService.removeAllTrash()
            .then(() => {
                showSuccessMsg('All trash removed.')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Remove all trash failed.')
            })
    }

    function removeNote(noteId) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
        noteService.remove(noteId)
            .then(() => {
                showSuccessMsg('Note removed.')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Note remove failed.')
            })
    }

    function undoTrash(noteToUndo) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteToUndo.id))
        noteService.save({ ...noteToUndo, isTrashed: false })
            .then(() => showSuccessMsg('Note is back to Notes.'))
            .catch(err => {
                console.error('Error:', err);
                showErrorMsg('Failed to return note to Notes.');
                updateNoteLocally(noteToUndo);
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
                    newNote,
                    activeElement,
                    onElementToggle: handleElementToggle,
                    onAddNote: addNote,
                    onSaveNote: saveNote,
                    onSendToTrash: sendNoteToTrash,
                    onRemoveAllTrash: removeAllTrash,
                    onRemoveNote: removeNote,
                    onUndoTrash: undoTrash
                }} />
            }
        </section>
    </section>
}

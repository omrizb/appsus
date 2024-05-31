const { useState, useEffect, useRef } = React
const { Outlet, useSearchParams, useLocation, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteSideNav } from "../cmps/NoteSideNav.jsx"

export function NoteIndex() {

    const location = useLocation()
    const navigate = useNavigate()

    const [notes, setNotes] = useState([])
    const [activeElement, setActiveElement] = useState({ noteId: null, item: null })
    const [searchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(true)
    const newNotes = useRef(noteService.getEmptyNoteAllTypes())
    const containerRef = useRef(null)
    const currFolder = useRef(getCurrFolder())
    const skipFilterRender = useRef(true)

    const [filterBy, setFilterBy] = useState({
        ...noteService.getEmptyFilter(),
        ...noteService.getFilterFromSearchParams(searchParams),
    })

    useEffect(() => {
        document.querySelector('#favicon').href = '../../../assets/favicons/note-favicon.png'
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    useEffect(() => {
        const locationFolder = getCurrFolder()
        if (currFolder.current !== locationFolder) {
            currFolder.current = locationFolder
            skipFilterRender.current = true
        }
    }, [location])

    useEffect(() => {
        if (!location.pathname.includes('/note/notes/add-note')) {
            return
        }

        const newNote = structuredClone(newNotes.current.NoteTxt)
        newNote.title = searchParams.get('title') || 'New note'
        newNote.isPinned = searchParams.get('isPinned') || false
        newNote.info.txt = searchParams.get('txt') || 'This is a new note.'
        addNote(newNote)
    }, [location])

    useEffect(() => {
        setIsLoading(true)
        noteService.query(filterBy)
            .then(setNotes)
            .finally(() => setIsLoading(false))
    }, [filterBy])

    function getCurrFolder() {
        const pathElements = location.pathname.split('/')
        return (pathElements[2])
            ? `/${pathElements[1]}/${pathElements[2]}`
            : `/${pathElements[1]}`
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function updateNoteLocally(updatedNote) {
        setNotes(prevNotes => prevNotes
            .map(note => note.id === updatedNote.id ? updatedNote : note)
            .sort(noteService.sortPinnedFirst))
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
            .catch(err => {
                console.error('Error:', err);
                showErrorMsg('Failed to update note.');
                updateNoteLocally(note);
            })
    }

    function sendNoteToTrash(noteId) {
        const noteToTrash = notes.find(note => note.id === noteId)
        updateNoteLocally({ ...noteToTrash, isTrashed: true })
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
        setNotes(prevNotes => prevNotes.filter(note => !note.isTrashed))
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
        updateNoteLocally({ ...noteToUndo, isTrashed: false })
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
            navigate(currFolder.current)
        }
    }

    return <section ref={containerRef} className="note-index">
        <NoteHeader filterBy={filterBy} onFilter={onSetFilterBy} skipFilterRender={skipFilterRender} />
        <NoteSideNav />
        <section className="note-main-view">
            {isLoading
                ? <p>Loading...</p>
                : <Outlet context={{
                    notes,
                    newNotes,
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

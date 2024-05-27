const { useState, useEffect, useRef } = React
const { useOutletContext } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { reactUtilService } from "../../../services/react-util.service.js"

import { NoteMenu } from "./NoteMenu.jsx"

export function NoteAdd() {

    const { activeElement, newNote, onAddNote } = useOutletContext()
    const [newNoteToSave, setNewNoteToSave] = useState({ ...newNote.current, id: 'new-note' })
    const [hoveredNoteId, setHoveredNoteId] = useState(null)
    const [isFocused, setIsFocused] = useState(false)
    const newNoteToSaveRef = useRef(null)
    const addNoteRef = useRef(null)
    const textareaRef = useRef(null)
    const addNoteBtnRef = useRef(null)
    const isHovered = newNoteToSave.id === hoveredNoteId

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    useEffect(() => {
        newNoteToSaveRef.current = newNoteToSave
    }, [newNoteToSave])

    function handleMouseEnter(noteId) {
        setHoveredNoteId(noteId)
    }

    function handleMouseLeave(noteId) {
        if (activeElement.noteId === noteId) {
            return
        }
        setHoveredNoteId(null)

    }

    function handleClickOutside(ev) {
        if (addNoteRef.current && addNoteRef.current.contains(ev.target)) {
            return
        }

        const cleanNote = { ...newNote.current, id: 'new-note' }

        if (!utilService.deepEqual(newNoteToSaveRef.current, cleanNote)) {
            addNoteBtnRef.current.click()
        }
        setIsFocused(false)
    }

    function setNewNote(newProps) {
        setNewNoteToSave({ ...newNoteToSave, ...newProps })
    }

    function adjustTextareaHeight() {
        const textarea = textareaRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onAddNote(newNoteToSave)
        setNewNoteToSave({ ...newNote.current, id: 'new-note' })
        setIsFocused(false)
    }

    const noteStyle = { backgroundColor: newNoteToSave.style.backgroundColor.color }

    return <div className="add-note">
        <div ref={addNoteRef} className="note outline-box1"
            onMouseEnter={() => handleMouseEnter(newNoteToSave.id)}
            onMouseLeave={() => handleMouseLeave(newNoteToSave.id)}
            style={noteStyle}
        >
            <form onSubmit={onSubmit}>
                {isFocused && <input
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    value={newNoteToSave.title}
                    name="title"
                    type="text"
                    placeholder="Title"
                />}
                <textarea
                    ref={textareaRef}
                    onFocus={() => setIsFocused(true)}
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    onInput={adjustTextareaHeight}
                    value={newNoteToSave.info.txt}
                    name="info-txt"
                    type="text"
                    rows="1"
                    placeholder="Take a note..."
                />
                <button ref={addNoteBtnRef} type="submit" hidden></button>
            </form>
            {isFocused && <NoteMenu
                note={newNoteToSave}
                isHovered={isHovered}
                onSetNewNote={setNewNote}
                btnRef={addNoteBtnRef}
            />}
        </div>
    </div>
}
const { useState, useEffect, useRef } = React
const { useOutletContext } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { reactUtilService } from "../../../services/react-util.service.js"

import { NoteMenu } from "./NoteMenu.jsx"

export function NoteEdit() {

    const { activeElement, newNotes, onAddNote } = useOutletContext()
    const [newNoteToSave, setNewNoteToSave] = useState({ ...newNotes.current.NoteTxt, id: 'new-note' })
    const [hoveredNoteId, setHoveredNoteId] = useState(null)
    const [isFocused, setIsFocused] = useState(false)
    const newNoteToSaveRef = useRef(newNoteToSave)
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

        const cleanNote = { ...newNotes.current.NoteTxt, id: 'new-note' }

        if (!utilService.deepEqual(newNoteToSaveRef.current, cleanNote)) {
            newNoteToSaveRef.current = null
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

    function toggleAddImage() {
        if (newNoteToSave.type === 'NoteImg') {
            setNewNoteToSave({
                ...newNoteToSave,
                type: 'NoteTxt',
                info: { ...newNotes.current.NoteTxt.info, txt: newNoteToSave.info.txt }
            })
            return
        }
        setNewNoteToSave({
            ...newNoteToSave,
            type: 'NoteImg',
            info: { ...newNotes.current.NoteImg.info, txt: newNoteToSave.info.txt }
        })
    }

    function onSubmit(ev) {
        if (ev) ev.preventDefault()
        onAddNote(newNoteToSave)
        setNewNoteToSave({ ...newNotes.current.NoteTxt, id: 'new-note' })
        setIsFocused(false)
    }

    const noteStyle = { backgroundColor: newNoteToSave.style.backgroundColor.color }

    return <div className="add-note">
        <form onSubmit={onSubmit}>
            <div ref={addNoteRef} className={`note outline-box1${isFocused ? ' open' : ''}`}
                onMouseEnter={() => handleMouseEnter(newNoteToSave.id)}
                onMouseLeave={() => handleMouseLeave(newNoteToSave.id)}
                style={noteStyle}
            >

                <input
                    className="big"
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    value={newNoteToSave.title}
                    name="title"
                    type="text"
                    placeholder="Title"
                />
                <textarea
                    ref={textareaRef}
                    className="always-open"
                    onFocus={() => setIsFocused(true)}
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    onInput={adjustTextareaHeight}
                    value={newNoteToSave.info.txt}
                    name="info-txt"
                    type="text"
                    rows="1"
                    placeholder="Take a note..."
                />
                {newNoteToSave.type === 'NoteImg' && <input
                    className="add-image"
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    value={newNoteToSave.info.url}
                    name="info-url"
                    type="text"
                    placeholder="Image url"
                />}
                <NoteMenu
                    isHovered={isHovered}
                    note={newNoteToSave}
                    newNoteToSave={newNoteToSave}
                    onToggleAddImage={toggleAddImage}
                    onSetNewNote={setNewNote}
                    btnRef={addNoteBtnRef}
                />
                <button ref={addNoteBtnRef} type="submit" style={{ display: 'none' }}></button>
            </div>
        </form>
    </div>
}
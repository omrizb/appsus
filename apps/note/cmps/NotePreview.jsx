const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

import { NoteMenu } from "./NoteMenu.jsx"

export function NotePreview({ note, activeElement, onElementToggle }) {

    const [currNote, setCurrNote] = useState(note)
    const [isNoteActive, setIsNoteActive] = useState(false)
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    useEffect(() => {
        if (activeElement.noteId === currNote.id) return
        setIsNoteActive(false)
        setIsMenuVisible(false)
    }, [activeElement])

    function handleMouseEnter() {
        setIsNoteActive(true)
        setIsMenuVisible(true)
    }

    function handleMouseLeave() {
        if (activeElement.noteId === currNote.id) return
        setIsNoteActive(false)
        setIsMenuVisible(false)
    }

    function saveNote(newProps) {
        const noteToSave = { ...currNote, ...newProps }
        noteService.save(noteToSave)
            .then(() => setCurrNote(noteToSave))
    }

    const noteStyle = { backgroundColor: currNote.style.backgroundColor.color }
    const noteClasses = isNoteActive ? ['note-preview', 'box-shadow'] : ['note-preview']
    const menuClasses = isMenuVisible ? [] : ['hide']

    return <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        className={noteClasses.join(' ')} style={noteStyle}>
        <h2>{currNote.title}</h2>
        <p>{currNote.info.txt}</p>
        <NoteMenu
            menuClasses={menuClasses}
            activeElement={activeElement}
            onElementToggle={onElementToggle}
            noteId={currNote.id}
            saveNote={saveNote}
        />
    </div>
}
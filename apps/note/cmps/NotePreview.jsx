const { useState, useRef } = React

import { noteService } from "../services/note.service.js"

import { NoteMenu } from "./NoteMenu.jsx"

export function NotePreview({ note }) {

    const [currNote, setCurrNote] = useState(note)
    const [menuVisible, setMenuVisible] = useState(false)
    const isMenuOpen = useRef(false)

    function handleMouseEnter() {
        setMenuVisible(true)
    }

    function handleMouseLeave() {
        if (isMenuOpen.current) return
        setMenuVisible(false)
    }

    function saveNote(newProps) {
        const noteToSave = { ...currNote, ...newProps }
        noteService.save(noteToSave)
            .then(() => setCurrNote(noteToSave))
    }

    const noteStyle = { backgroundColor: currNote.style.backgroundColor.color }
    const menuClasses = menuVisible ? [] : ['hide']

    return <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        className="note-preview" style={noteStyle}>
        <h2>{currNote.title}</h2>
        <p>{currNote.info.txt}</p>
        <NoteMenu menuClasses={menuClasses} isMenuOpen={isMenuOpen} saveNote={saveNote} />
    </div>
}
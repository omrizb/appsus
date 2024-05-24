const { useState, useRef } = React

import { NoteMenu } from "./NoteMenu.jsx"

export function NotePreview({ note }) {

    const [menuVisible, setMenuVisible] = useState(false)
    const isMenuOpen = useRef(false)

    function handleMouseEnter() {
        setMenuVisible(true)
    }

    function handleMouseLeave() {
        if (isMenuOpen.current) return
        setMenuVisible(false)
    }

    const noteStyle = { backgroundColor: note.style.backgroundColor.color }
    const menuClasses = menuVisible ? [] : ['hide']

    return <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        className="note-preview" style={noteStyle}>
        <h2>{note.title}</h2>
        <p>{note.info.txt}</p>
        <NoteMenu menuClasses={menuClasses} isMenuOpen={isMenuOpen} />
    </div>
}
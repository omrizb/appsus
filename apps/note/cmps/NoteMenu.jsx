const { useState } = React
const { Link } = ReactRouterDOM

import { ColorPalette } from "./ColorPalette.jsx"

export function NoteMenu({ menuClasses, activeElement, onElementToggle, noteId, saveNote }) {

    const isPaletteOpen = activeElement.noteId === noteId && activeElement.item === 'palette'

    function setNoteColor(color) {
        saveNote({ style: { backgroundColor: color } })
    }

    return <div className={`note-menu ${menuClasses.join(' ')}`}>

        <div className="pin-btn"><div className="fa-solid i-pin"></div></div>

        <Link to={''}><div className="fa-solid i-bell"></div></Link>

        <div className="color-palette-btn" onClick={() => onElementToggle(noteId, 'palette')}>
            <div className="fa-solid i-color-palette"></div>
            {isPaletteOpen && <ColorPalette setNoteColor={setNoteColor} />}
        </div>

        <Link to={''}><div className="fa-solid i-image"></div></Link>

        <Link to={''}><div className="fa-solid i-archive"></div></Link>

        <Link to={''}><div className="fa-solid i-more"></div></Link>

    </div>
}
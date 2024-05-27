const { Link, useOutletContext } = ReactRouterDOM

import { ColorPalette } from "./ColorPalette.jsx"
import { MoreNoteOptions } from "./MoreNoteOptions.jsx"

export function NoteMenu({ isHovered, note, onSetNewNote, btnRef }) {

    const { activeElement, onElementToggle, onSendToTrash } = useOutletContext()

    const isPaletteOpen = activeElement.noteId === note.id && activeElement.item === 'palette'
    const isMoreOptionsOpen = activeElement.noteId === note.id && activeElement.item === 'more-options'
    const isHidden = !(isHovered || isPaletteOpen || isMoreOptionsOpen)

    function handleBtnClick() {
        if (btnRef) btnRef.current.click()
    }

    return <div className={`note-menu${(isHidden) ? ' hide' : ''}`} onClick={ev => ev.stopPropagation()}>

        <div className="pin-btn"><div className="fa-solid i-pin"></div></div>

        <Link to={''}><div className="fa-solid i-bell"></div></Link>

        <div className={`color-palette-btn${isPaletteOpen ? ' active' : ''}`}
            onClick={() => onElementToggle(note.id, 'palette')}
        >
            <div className="fa-solid i-color-palette"></div>
            {isPaletteOpen && <ColorPalette note={note} onSetNewNote={onSetNewNote} />}
        </div>

        <Link to={''}><div className="fa-solid i-image"></div></Link>

        <Link to={''}><div className="fa-solid i-archive"></div></Link>

        <div className={`more-options-btn${isMoreOptionsOpen ? ' active' : ''}`}
            onClick={() => onElementToggle(note.id, 'more-options')}
        >
            <div className="fa-solid i-more"></div>
            {isMoreOptionsOpen && <MoreNoteOptions noteId={note.id} onSendToTrash={onSendToTrash} />}
        </div>

        {onSetNewNote && <button className="btn new-note-btn" onClick={handleBtnClick}>Close</button>}

    </div>
}
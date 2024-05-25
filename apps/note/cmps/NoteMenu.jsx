const { Link } = ReactRouterDOM

import { ColorPalette } from "./ColorPalette.jsx"
import { MoreNoteOptions } from "./MoreNoteOptions.jsx"

export function NoteMenu({ activeElement, onElementToggle, onSaveNote, onSendToTrash, isHovered, noteId }) {

    const isPaletteOpen = activeElement.noteId === noteId && activeElement.item === 'palette'
    const isMoreOptionsOpen = activeElement.noteId === noteId && activeElement.item === 'more-options'

    function setNoteColor(color) {
        onSaveNote({ style: { backgroundColor: color } }, noteId)
    }

    const isHidden = !(isHovered || isPaletteOpen || isMoreOptionsOpen)

    return <div className={`note-menu${(isHidden) ? ' hide' : ''}`}>

        <div className="pin-btn"><div className="fa-solid i-pin"></div></div>

        <Link to={''}><div className="fa-solid i-bell"></div></Link>

        <div className={`color-palette-btn${isPaletteOpen ? ' active' : ''}`}
            onClick={() => onElementToggle(noteId, 'palette')}
        >
            <div className="fa-solid i-color-palette"></div>
            {isPaletteOpen && <ColorPalette setNoteColor={setNoteColor} />}
        </div>

        <Link to={''}><div className="fa-solid i-image"></div></Link>

        <Link to={''}><div className="fa-solid i-archive"></div></Link>

        <div className={`more-options-btn${isMoreOptionsOpen ? ' active' : ''}`}
            onClick={() => onElementToggle(noteId, 'more-options')}
        >
            <div className="fa-solid i-more"></div>
            {isMoreOptionsOpen && <MoreNoteOptions noteId={noteId} onSendToTrash={onSendToTrash} />}
        </div>

    </div>
}
const { Link, useOutletContext } = ReactRouterDOM

import { ColorPalette } from "./ColorPalette.jsx"
import { MoreNoteOptions } from "./MoreNoteOptions.jsx"

export function NoteMenu({ isHovered, note }) {

    const { activeElement, onElementToggle, onSendToTrash } = useOutletContext()

    const isPaletteOpen = activeElement.noteId === note.id && activeElement.item === 'palette'
    const isMoreOptionsOpen = activeElement.noteId === note.id && activeElement.item === 'more-options'

    const isHidden = !(isHovered || isPaletteOpen || isMoreOptionsOpen)

    return <div className={`note-menu${(isHidden) ? ' hide' : ''}`}>

        <div className="pin-btn"><div className="fa-solid i-pin"></div></div>

        <Link to={''}><div className="fa-solid i-bell"></div></Link>

        <div className={`color-palette-btn${isPaletteOpen ? ' active' : ''}`}
            onClick={() => onElementToggle(note.id, 'palette')}
        >
            <div className="fa-solid i-color-palette"></div>
            {isPaletteOpen && <ColorPalette note={note} />}
        </div>

        <Link to={''}><div className="fa-solid i-image"></div></Link>

        <Link to={''}><div className="fa-solid i-archive"></div></Link>

        <div className={`more-options-btn${isMoreOptionsOpen ? ' active' : ''}`}
            onClick={() => onElementToggle(note.id, 'more-options')}
        >
            <div className="fa-solid i-more"></div>
            {isMoreOptionsOpen && <MoreNoteOptions noteId={note.id} onSendToTrash={onSendToTrash} />}
        </div>

    </div>
}
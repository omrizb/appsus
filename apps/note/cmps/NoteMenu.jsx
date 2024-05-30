const { useState, useEffect } = React
const { Link, useOutletContext } = ReactRouterDOM

import { ColorPalette } from "./ColorPalette.jsx"
import { MoreNoteOptions } from "./MoreNoteOptions.jsx"

export function NoteMenu({ isHovered, note, newNoteToSave, onToggleAddImage, onSetNewNote, btnRef }) {

    const { activeElement, onElementToggle, onSaveNote, onSendToTrash } = useOutletContext()

    const [selectedMenuButtons, setSelectedMenuButtons] = useState({
        isPinned: note.isPinned,
        isImage: newNoteToSave && newNoteToSave.type === 'NoteImg'
    })
    const isPaletteOpen = activeElement.noteId === note.id && activeElement.item === 'palette'
    const isMoreOptionsOpen = activeElement.noteId === note.id && activeElement.item === 'more-options'
    const isHidden = !(isHovered || isPaletteOpen || isMoreOptionsOpen)

    useEffect(() => {
        setSelectedMenuButtons({
            isPinned: note.isPinned,
            isImage: newNoteToSave && newNoteToSave.type === 'NoteImg'
        })
    }, [newNoteToSave])

    function handleImageBtnClick() {
        setSelectedMenuButtons({ ...selectedMenuButtons, isImage: !selectedMenuButtons.isImage })
        onToggleAddImage()
    }

    function handleCloseBtnClick() {
        console.log('clicked')
        if (btnRef) btnRef.current.click()
    }

    return <div className={`note-menu${isHidden ? ' hide' : ''}`} onClick={ev => ev.stopPropagation()}>

        <div
            className={`pin-btn${selectedMenuButtons.isPinned ? ' selected' : ''}`}
            onClick={() => onSaveNote(note, { isPinned: !note.isPinned })}
        >
            <div className="fa-solid i-pin"></div>
        </div>

        <Link to={''}><div className="fa-solid i-bell"></div></Link>

        <div
            className={`color-palette-btn${isPaletteOpen ? ' active' : ''}`}
            onClick={() => onElementToggle(note.id, 'palette')}
        >
            <div className="fa-solid i-color-palette"></div>
            {isPaletteOpen && <ColorPalette note={note} onSetNewNote={onSetNewNote} />}
        </div>

        <div
            className={`add-image-btn${selectedMenuButtons.isImage ? ' selected' : ''}`}
            onClick={() => handleImageBtnClick()}
        >
            <div className="fa-solid i-image"></div>
        </div>

        <Link to={''}><div className="fa-solid i-archive"></div></Link>

        <div className={`more-options-btn${isMoreOptionsOpen ? ' active' : ''}`}
            onClick={() => onElementToggle(note.id, 'more-options')}
        >
            <div className="fa-solid i-more"></div>
            {isMoreOptionsOpen && <MoreNoteOptions noteId={note.id} onSendToTrash={onSendToTrash} />}
        </div>

        {onSetNewNote && <button
            className="btn new-note-btn"
            onClick={handleCloseBtnClick}
            type="button">
            Close
        </button>}

    </div>
}
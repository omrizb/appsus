const { useState, useEffect } = React
const { useOutletContext, useLocation, useNavigate } = ReactRouterDOM

import { Modal } from "../../../cmps/Modal.jsx"
import { NoteDetails } from "../views/NoteDetails.jsx"
import { NoteMenu } from "./NoteMenu.jsx"
import { MenuBtnPin } from "./menu-buttons/MenuBtnPin.jsx"
import { MenuBtnReminder } from "./menu-buttons/MenuBtnReminder.jsx"
import { MenuBtnColorPalette } from "./menu-buttons/MenuBtnColorPalette.jsx"
import { MenuBtnArchive } from "./menu-buttons/MenuBtnArchive.jsx"
import { MenuBtnMoreOptions } from "./menu-buttons/MenuBtnMoreOptions.jsx"
import { MenuBtnRemoveNote } from "./menu-buttons/MenuBtnRemoveNote.jsx"
import { MenuBtnUndoTrash } from "./menu-buttons/MenuBtnUndoTrash.jsx"
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notesToShow, allNotes, isTrash }) {

    const { activeElement, onSaveNote, onRemoveNote, onUndoTrash } = useOutletContext()
    const [hoveredNoteId, setHoveredNoteId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalNote, setModalNote] = useState({})
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const pathElements = location.pathname.split('/')
        if (pathElements[3]) {
            const note = allNotes.find(note => note.id === pathElements[3])
            if (!note) {
                navigate('/note/notes')
                return
            }
            setModalNote(note)
            setIsModalOpen(true)
        } else {
            setIsModalOpen(false)
        }
    }, [location])

    function handleMouseEnter(noteId) {
        setHoveredNoteId(noteId)
    }

    function handleMouseLeave(noteId) {
        if (activeElement.noteId === noteId) return
        setHoveredNoteId(null)
    }

    function handleNoteClick(noteId) {
        if (isTrash) {
            return
        }
        navigate(`/note/notes/${noteId}`)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return <div className="note-list">
        <ul>
            {notesToShow.map(note => {
                const menuBtnParams = {
                    note: note,
                    setNote: onSaveNote,
                    onRemoveNote: onRemoveNote,
                    onUndoTrash: onUndoTrash
                }
                const bgColor = note.style.backgroundColor
                const borderColor = (bgColor.name === 'none') ? 'var(--gray-4)' : bgColor.color
                const noteStyle = {
                    backgroundColor: bgColor.color,
                    border: `1px solid ${borderColor}`
                }
                const isHovered = note.id === hoveredNoteId
                const isActive = isHovered || activeElement.noteId === note.id
                return (
                    <li key={note.id}
                        className={isActive ? 'box-shadow' : ''}
                        onMouseEnter={() => handleMouseEnter(note.id)}
                        onMouseLeave={() => handleMouseLeave(note.id)}
                        onClick={() => handleNoteClick(note.id)}
                        style={noteStyle}
                    >
                        <NotePreview note={note} />
                        {(isTrash)
                            ? <NoteMenu
                                isHovered={isHovered}
                                note={note}
                            >
                                <MenuBtnRemoveNote btnParams={menuBtnParams} classes={['remove-note-btn']} />
                                <MenuBtnUndoTrash btnParams={menuBtnParams} classes={['undo-trash-btn']} />
                            </NoteMenu>
                            : <NoteMenu
                                isHovered={isHovered}
                                note={note}
                            >
                                <MenuBtnPin btnParams={menuBtnParams} classes={['pin-btn', 'top-right-btn']} />
                                <MenuBtnReminder btnParams={menuBtnParams} classes={['reminder-btn']} />
                                <MenuBtnColorPalette btnParams={menuBtnParams} classes={['color-palette-btn']} />
                                <MenuBtnArchive btnParams={menuBtnParams} classes={['archive-btn']} />
                                <MenuBtnMoreOptions btnParams={menuBtnParams} classes={['more-options-btn']} />
                            </NoteMenu>
                        }

                    </li>
                )
            }
            )}
        </ul>
        {isModalOpen && <Modal closeModal={closeModal}>
            <NoteDetails note={modalNote} />
        </Modal>}
    </div>
}

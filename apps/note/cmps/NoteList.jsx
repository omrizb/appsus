const { useState, useEffect } = React
const { useOutletContext, useLocation, useNavigate } = ReactRouterDOM

import { Modal } from "../../../cmps/Modal.jsx"
import { NoteDetails } from "../views/NoteDetails.jsx"
import { NoteMenu } from "./NoteMenu.jsx"
import { NotePreview } from "./NotePreview.jsx"
import { TrashMenu } from "./TrashMenu.jsx"

export function NoteList({ isTrash }) {

    const { notes, activeElement } = useOutletContext()
    const [hoveredNoteId, setHoveredNoteId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalNote, setModalNote] = useState({})
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const pathElements = location.pathname.split('/')
        if (pathElements[3]) {
            const note = notes.find(note => note.id === pathElements[3])
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
            {notes.map(note => {
                const noteStyle = { backgroundColor: note.style.backgroundColor.color }
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
                            ? <TrashMenu
                                isHovered={isHovered}
                                note={note}
                            />
                            : <NoteMenu
                                isHovered={isHovered}
                                note={note}
                            />
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

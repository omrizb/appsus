const { useState } = React
const { useNavigate } = ReactRouterDOM

import { NoteEdit } from "../cmps/NoteEdit.jsx"

export function NoteDetails({ note }) {

    const navigate = useNavigate()

    const [editNoteStyle, setEditNoteStyle] = useState(null)

    function onSetStyle(style) {
        setEditNoteStyle(style)
    }

    return <section className="note-details" style={editNoteStyle}>
        <div className="media-container">
            {note.type === 'NoteImg' && <img src={note.info.url} className="note-image" />}
            {note.type === 'NoteVideo' && (
                <div className="video-player-wrapper">
                    <iframe src={note.info.url} className="video-player"></iframe>
                </div>
            )}
        </div>
        <NoteEdit onSetStyle={onSetStyle} note={note} executeOnSubmit={() => navigate('/note/notes/')} />
    </section>
}
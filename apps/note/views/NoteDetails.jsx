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
        <h1>Note Details</h1>
        <NoteEdit onSetStyle={onSetStyle} note={note} executeOnSubmit={() => navigate('/note/notes/')} />
    </section>
}
const { useState } = React

import { NoteEdit } from "../cmps/NoteEdit.jsx"

export function NoteDetails({ note }) {

    const [editNoteStyle, setEditNoteStyle] = useState(null)

    function onSetStyle(style) {
        setEditNoteStyle(style)
    }

    return <section className="note-details" style={editNoteStyle}>
        <h1>Note Details</h1>
        <NoteEdit onSetStyle={onSetStyle} />
    </section>
}
import { NoteMenu } from "./NoteMenu.jsx"

export function NotePreview({ note }) {
    const noteStyle = { backgroundColor: note.style.backgroundColor.color }

    return <div className="note-preview" style={noteStyle}>
        <h2>{note.title}</h2>
        <p>{note.info.txt}</p>
        <NoteMenu />
    </div>
}
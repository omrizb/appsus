export function NotePreview({ note }) {
    return <div className="note-preview">
        <h2>{note.title}</h2>
        <p>{note.info.txt}</p>
    </div>
}
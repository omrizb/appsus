export function NoteImg({ note, isPreview = false }) {

    if (isPreview) {
        return <div className="image-note-preview">
            <img src={note.info.url} />
            <h2>{note.title}</h2>
            <p>{note.info.txt}</p>
        </div>
    }

    return <div className="image-note-details">
        <img src={note.info.url} />
        <h2>{note.title}</h2>
        <p>{note.info.txt}</p>
    </div>
}
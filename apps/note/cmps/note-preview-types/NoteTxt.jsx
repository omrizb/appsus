export function NoteTxt({ note, isPreview = false }) {

    if (isPreview) {
        return <div className="text-note-preview">
            <h2>{note.title}</h2>
            <p>{note.info.txt}</p>
        </div>
    }

    return <div className="text-note-details">
        <h2>{note.title}</h2>
        <p>{note.info.txt}</p>
    </div>
}
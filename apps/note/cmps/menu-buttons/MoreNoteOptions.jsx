export function MoreNoteOptions({ noteId, onSendToTrash }) {

    const positionStyle = { bottom: '-110px', right: '-60px' }

    return <div className="more-note-options outline-box2" style={positionStyle}>
        <div onClick={() => onSendToTrash(noteId)}>Remove</div>
        <div>Duplicate</div>
        <div>Send</div>
    </div>
}
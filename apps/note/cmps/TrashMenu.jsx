const { useOutletContext } = ReactRouterDOM

export function TrashMenu({ isHovered, note }) {

    const { onRemoveNote, onUndoTrash } = useOutletContext()

    const isHidden = !isHovered

    return <div className={`trash-menu${(isHidden) ? ' hide' : ''}`}>
        <div className="remove-btn">
            <div
                className="fa-solid i-trash"
                onClick={() => onRemoveNote(note.id)}>
            </div>
        </div>

        <div className="undo-btn">
            <div
                className="fa-solid i-undo"
                onClick={() => onUndoTrash(note)}>
            </div>
        </div>
    </div>
}
export function MenuBtnRemoveNote({ btnParams, classes }) {

    return <div className={classes.join(' ')}>
        <div
            className="fa-solid i-trash"
            onClick={() => btnParams.onRemoveNote(btnParams.note.id)}>
        </div>
    </div>
}
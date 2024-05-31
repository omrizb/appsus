export function MenuBtnUndoTrash({ btnParams, classes }) {

    return <div className={classes.join(' ')}>
        <div
            className="fa-solid i-undo"
            onClick={() => btnParams.onUndoTrash(btnParams.note)}>
        </div>
    </div>
}
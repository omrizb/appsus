export function NoteAdd() {
    return <div className="add-note">
        <form>
            <input placeholder="title" />
            <input placeholder="Take a note..." />
            <button>Save</button>
            <button>Close</button>
        </form>
    </div>
}
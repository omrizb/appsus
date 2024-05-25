import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteList } from "../cmps/NoteList.jsx"

export function Notes() {
    return <div className="notes">
        <NoteAdd />
        <NoteList />
    </div>
}

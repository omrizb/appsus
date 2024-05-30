const { useOutletContext } = ReactRouterDOM

import { NoteList } from "../cmps/NoteList.jsx"

export function Trash() {

    const { notes, onRemoveAllTrash } = useOutletContext()

    return <div className="trash">
        <button className="btn" onClick={() => onRemoveAllTrash()}>Empty trash</button>
        <NoteList isTrash={true} notesToShow={notes.filter(note => note.isTrashed)} allNotes={notes} />
    </div>
}
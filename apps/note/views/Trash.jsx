const { useOutletContext } = ReactRouterDOM

import { NoteList } from "../cmps/NoteList.jsx"

export function Trash() {

    const { onRemoveAllTrash } = useOutletContext()

    return <div className="trash">
        <button className="btn" onClick={() => onRemoveAllTrash()}>Empty trash</button>
        <NoteList isTrash={true} />
    </div>
}
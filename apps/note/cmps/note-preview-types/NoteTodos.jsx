const { useState } = React
const { useOutletContext } = ReactRouterDOM

import { reactUtilService } from "../../../../services/react-util.service.js"

import { ShortTxt } from "../../../../cmps/ShortTxt.jsx"

export function NoteTodos({ note, isPreview = false }) {

    const { onSaveNote } = useOutletContext()
    const [noteToSave, setNoteToSave] = useState(note)

    function onToggleCheckbox({ target }, todo) {
        const updatedTodos = noteToSave.info.todos.map(t =>
            t.id === todo.id ? { ...t, doneAt: target.checked ? Date.now() : null } : t
        )
        const newNote = {
            ...noteToSave,
            info: {
                ...noteToSave.info,
                todos: updatedTodos
            }
        }

        onSaveNote(newNote)
        setNoteToSave(newNote)
    }

    if (isPreview) {
        return <div className="todos-note-preview">
            <h2><ShortTxt txt={noteToSave.title} length={30} /></h2>
            <ShortTxt txt={noteToSave.info.txt} length={100} />
            <ul className="todo-list" onClick={ev => ev.stopPropagation()}>
                {noteToSave.info.todos.map((todo, index) => <label className="todo-item" key={index}>
                    <input
                        onChange={ev => onToggleCheckbox(ev, todo)}
                        data-todo-id={todo.id}
                        checked={todo.doneAt ? true : false}
                        type="checkbox"
                    />
                    <p>{todo.txt}</p>
                </label>)}
            </ul>
        </div>
    }

    <input
        className="big"
        onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
        value={newNoteToSave.title}
        name="title"
        type="text"
        placeholder="Title"
    />

    return <div className="todos-note-details">
        <img src={note.info.url} />
        <h2>{note.title}</h2>
        <p>{note.info.txt}</p>
    </div>
}
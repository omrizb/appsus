const { useState, useEffect } = React

import { utilService } from "../../../services/util.service.js"

export function TodosEdit({ noteToSave, onSetNoteToSave, inputStyle }) {

    const [todos, setTodos] = useState(noteToSave.info.todos)

    function handleTodoChange({ target }, todoId) {
        const value = target.value
        setTodos(todos.map(todo => (todo.id === todoId) ? { ...todo, txt: value } : todo))
    }

    useEffect(() => {
        const newNoteToSave = {
            ...noteToSave,
            info: {
                ...noteToSave.info,
                todos: todos
            }
        }
        onSetNoteToSave(newNoteToSave)
    }, [todos])

    function handleAddTodo() {
        const newToDo = {
            txt: '',
            doneAt: null,
            id: utilService.makeId(6)
        }
        setTodos([...todos, newToDo])
    }

    function handleRemoveTodo(ev, todoId) {
        ev.stopPropagation()
        setTodos([...todos.filter(todo => todo.id !== todoId)])
    }

    return <div className="todos-edit">

        {!todos.length
            ? <div></div>
            : <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <button className="btn btn-circle" type="button" onClick={ev => handleRemoveTodo(ev, todo.id)}>
                            <div className="fa-solid i-minus"></div>
                        </button>
                        <input
                            onChange={ev => handleTodoChange(ev, todo.id)}
                            value={todo.txt}
                            placeholder="Enter something to do"
                            style={inputStyle}
                        />
                    </li>
                ))}
            </ul>
        }
        <button className="btn" type="button" onClick={handleAddTodo}>Add todo</button>
    </div>
}
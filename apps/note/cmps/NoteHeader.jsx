const { useState, useEffect, useRef } = React

import { utilService } from "../../../services/util.service.js"
import { reactUtilService } from "../../../services/react-util.service.js"

export function NoteHeader({ filterBy, onFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const setSearchDebounce = useRef(utilService.debounce(onFilter, 500))

    useEffect(() => {
        if (JSON.stringify(filterByToEdit) !== JSON.stringify(filterBy)) {
            setFilterByToEdit({ ...filterBy })
        }
    }, [filterBy])

    useEffect(() => {
        setSearchDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    return <section className="note-header">
        <h1>Note</h1>
        <input onChange={ev => reactUtilService.handleChange(ev, setFilterByToEdit)}
            value={filterByToEdit.txt}
            name="txt" type="text"
            placeholder="Search..."
        />
    </section>
}
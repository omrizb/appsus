const { useState, useEffect, useRef } = React

import { utilService } from "../../../services/util.service.js"
import { reactUtilService } from "../../../services/react-util.service.js"

export function NoteHeader({ filterBy, onFilter, skipFilterRender }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const setSearchDebounce = useRef(utilService.debounce(onFilter, 500))

    useEffect(() => {
        if (JSON.stringify(filterByToEdit) !== JSON.stringify(filterBy)) {
            setFilterByToEdit({ ...filterBy })
        }
    }, [filterBy])

    useEffect(() => {
        if (skipFilterRender && skipFilterRender.current) {
            skipFilterRender.current = false
            return
        }
        setSearchDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    return <section className="note-header">
        <img className="note-logo-image" src="https://github.com/omrizb/appsus/blob/master/assets/img/light-bulb-logo.jpg" />
        <h1>Note</h1>
        <div className="search-box">
            <label htmlFor="input-search-box"><div className="fa-solid i-search"></div></label>
            <input onChange={ev => reactUtilService.handleChange(ev, setFilterByToEdit)}
                value={filterByToEdit.txt}
                id="input-search-box"
                name="txt"
                type="text"
                placeholder="Search..."
            />
        </div>
    </section>
}
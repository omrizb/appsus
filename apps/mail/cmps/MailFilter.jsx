const { useState, useEffect } = React

export function MailFilter({ filterBy, onFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type, checked } = target
        let value
        switch (type) {
            case 'checkbox':
                value = checked ? true : null
                break
            case 'number':
                value = +target.value
                break
            default:
                value = target.value
                break;
        } 
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    const { txt, isRead } = filterByToEdit
    return (
        <section className="mail-filter">
            <input
                onChange={handleChange}
                value={txt}
                name="txt"
                type="text"
                placeholder="Search" />
            <label>
                <input
                    onChange={handleChange}
                    checked={isRead===true}
                    name="isRead"
                    type="checkbox" />
                Show Read Emails Only
            </label>
        </section>
    )
}
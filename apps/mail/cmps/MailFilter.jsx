const { useState, useEffect } = React

export function MailFilter({ filterBy, onFilter }) {

    let selectedValue
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {

        // console.log('useEffect happened filterByToEdit:', filterByToEdit)
        onFilter(filterByToEdit)

    }, [filterByToEdit])

    function handleChange({ target }) {
        let value = target.value
        let updatedFilter
        if (target.type === "text") {
            updatedFilter = { txt: value }
        }
        else {
            switch (value) {
                case 'read':
                    updatedFilter = { isRead: true, isStarred: null }
                    break
                case 'unread':
                    updatedFilter = { isRead: false, isStarred: null }
                    break
                case 'starred':
                    updatedFilter = { isRead: null, isStarred: true }
                    break
                case 'unstarred':
                    updatedFilter = { isRead: null, isStarred: false }
                    break
                case 'all':
                    updatedFilter = { isRead: null, isStarred: null }
                    break;
            }
        }

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, ...updatedFilter }))


    }

    selectedValue = 'all';
    if (filterBy.isRead === true) selectedValue = 'read';
    else if (filterBy.isRead === false) selectedValue = 'unread';
    else if (filterBy.isStarred === true) selectedValue = 'starred';
    else if (filterBy.isStarred === false) selectedValue = 'unstarred';
    console.log('selectedValue:', selectedValue)

    return (

        <section className="mail-filter">
            <input
                onChange={handleChange}
                value={filterBy.txt}
                name="txt"
                type="text"
                placeholder="Search" />
            <label>
                filterBy:
                <select
                    onChange={handleChange} value={selectedValue}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                    <option value="starred">Starred</option>
                    <option value="unstarred">Unstarred</option>
                </select>

            </label>
        </section>
    )
}
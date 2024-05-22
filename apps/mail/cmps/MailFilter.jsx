const { useState, useEffect } = React

export function MailFilter({ filterBy, onFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        // console.log('useEffect happened filterByToEdit:', filterByToEdit)
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        // console.log('target:', target.type)
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

    const selectedValue = ((filterByToEdit.isRead === null || filterByToEdit.isRead === '') && (filterByToEdit.isStarred === null || filterByToEdit.isStarred === '')) ? 'all'
        : (filterByToEdit.isRead === true) ? 'read'
            : (filterByToEdit.isRead === false) ? 'unread'
                : (filterByToEdit.isStarred === true) ? 'starred'
                    : 'unstarred';

    return (
        <section className="mail-filter">
            <input
                onChange={handleChange}
                value={filterByToEdit.txt}
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
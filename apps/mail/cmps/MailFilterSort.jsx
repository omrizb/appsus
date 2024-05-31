const { useState, useEffect } = React

export function MailFilterSort({ filterBy, onFilter, sortBy, onSort }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])


    useEffect(() => {
        onSort(sortByToEdit)
    }, [sortByToEdit])

    function handleFilterChange({ target }) {
        let value = target.value
        let updatedFilter
        if (target.type === "text") {
            updatedFilter = { txt: value }
        } else {
            switch (value) {
                case 'read':
                    updatedFilter = { folder: filterBy.folder, isRead: true, isStarred: null }
                    break
                case 'unread':
                    updatedFilter = { folder: filterBy.folder, isRead: false, isStarred: null }
                    break
                case 'starred':
                    updatedFilter = { folder: filterBy.folder, isRead: null, isStarred: true }
                    break
                case 'unstarred':
                    updatedFilter = { folder: filterBy.folder, isRead: null, isStarred: false }
                    break
                case 'all':
                    updatedFilter = { folder: filterBy.folder, isRead: null, isStarred: null }
                    break
            }
        }

        setFilterByToEdit(prevFilterBy => {
            return { ...prevFilterBy, ...updatedFilter }
        })
    }

    function handleSortChange(sortField) {
        let newValue = sortByToEdit[sortField]
        if (newValue === '') {
            newValue = 'asc'
        } else if (newValue === 'asc') {
            newValue = 'desc'
        } else if (newValue === 'desc') {
            newValue = ''
        }
        setSortByToEdit(prevSortBy => ({ ...prevSortBy, [sortField]: newValue }))
    }


    let selectedValue = 'all'
    if (filterBy.isRead === true) {
        selectedValue = 'read'
    } else if (filterBy.isRead === false) {
        selectedValue = 'unread'
    } else if (filterBy.isStarred === true) {
        selectedValue = 'starred'
    } else if (filterBy.isStarred === false) { selectedValue = 'unstarred' }


    const sortOptions = {
        date: ['inbox', 'sent', 'draft', 'trash'],
        subject: ['inbox', 'sent', 'draft', 'trash'],
        from: ['inbox', 'trash'],
        to: ['sent', 'draft', 'trash']
    }

    return (
        <section className="mail-filter-sort">
            <label className="mail-filter-search">
                <div className="fa-solid i-search"></div>
                <input
                    onChange={handleFilterChange}
                    value={filterBy.txt}
                    name="txt"
                    type="text"
                    placeholder="Search mail" />
            </label>
            <div className="mail-filter-sort-options">
                <label>
                    <select className="mail-filter"
                        onChange={handleFilterChange} value={selectedValue}>
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                        <option value="starred">Starred</option>
                        <option value="unstarred">Unstarred</option>
                    </select>
                </label>
                {Object.keys(sortOptions).map((sortField) => (
                    sortOptions[sortField].includes(filterBy.folder) && (
                        <label key={sortField} className={`sort-btn sort-btn ${sortBy[sortField] ? 'sorted' : ''}`}>
                            {sortBy[sortField] &&
                                ((sortBy[sortField] === 'asc')
                                    ? <div className="fa-solid i-sort-asc"></div>
                                    : <div className="fa-solid i-sort-desc"></div>)
                            }
                            <button onClick={() => handleSortChange(sortField)}>
                                {sortField.charAt(0).toUpperCase() + sortField.slice(1)}
                            </button>
                        </label>
                    )
                ))}
            </div>
        </section>
    )
}
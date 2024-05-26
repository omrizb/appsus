const { useState, useEffect } = React

export function MailFilterSort({ filterBy, onFilter, sortBy, onSort }) {

    let selectedValue
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])


    useEffect(() => {
        onSort(sortByToEdit);
    }, [sortByToEdit])

    function handleFilterChange({ target }) {
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

    function handleSortChange({ target }) {
        const { name, value } = target;
        setSortByToEdit(prevSortBy => ({ ...prevSortBy, [name]: value }))
    }

    selectedValue = 'all'
    if (filterBy.isRead === true) selectedValue = 'read'
    else if (filterBy.isRead === false) selectedValue = 'unread'
    else if (filterBy.isStarred === true) selectedValue = 'starred'
    else if (filterBy.isStarred === false) selectedValue = 'unstarred'
    // console.log('selectedValue:', selectedValue)

    return (
        <section className="mail-filter-sort">
            <input
                onChange={handleFilterChange}
                value={filterBy.txt}
                name="txt"
                type="text"
                placeholder="Search" />
            <label>
                filterBy:
                <select
                    onChange={handleFilterChange} value={selectedValue}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                    <option value="starred">Starred</option>
                    <option value="unstarred">Unstarred</option>
                </select>
            </label>
            <label>
                Sort By:
                <select name="sortBy" onChange={handleSortChange} value={sortBy.sortBy}>
                    <option value="date">Date</option>
                    <option value="subject">Subject</option>
                    {['inbox', 'trash'].includes(filterBy.folder) && (
                        <option value="from">From</option>
                    )}
                    {['drafts', 'sent', 'trash'].includes(filterBy.folder) && (
                        <option value="to">To</option>
                    )}
                </select>
            </label>
            <label>
                Direction:
                <select name="direction" onChange={handleSortChange} value={sortBy.direction}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
        </section>
    )
}
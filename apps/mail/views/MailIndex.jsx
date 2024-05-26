const { useState, useEffect } = React
const { useSearchParams, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilterSort } from '../cmps/MailFilterSort.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'


export function MailIndex() {
    const [mails, setMails] = useState([])
    const [unreadCounts, setUnreadCounts] = useState({})

    const [searchParams, setSearchParams] = useSearchParams()
    const { filterBy: initialFilterBy, sortBy: initialSortBy } = mailService.getFilterSortFromSearchParams(searchParams)
    const [filterBy, setFilterBy] = useState(initialFilterBy)
    const [sortBy, setSortBy] = useState(initialSortBy)

    useEffect(() => {
        setSearchParams({ ...filterBy, ...sortBy })
        mailService.query(filterBy, sortBy)
            .then(mails => setMails(mails))
    }, [filterBy, sortBy])

    useEffect(() => {
        mailService.getUnreadCountByFolder()
            .then(counts => setUnreadCounts(counts))
    }, [])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function onSetSortBy(newSort) {
        setSortBy(newSort)
    }

    function handleFolderClick(folder) {
        setFilterBy({ folder, txt: '', isRead: '', isStarred: '' })
    }

    const isMails = mails.length > 0
    return (
        <section className="mail-index">
            <aside>
                <h1>My Mail</h1>
                <Link className="mail-compose-btn" to="/mail/compose">
                    <button>Compose Mail</button>
                </Link>
                <MailFolderList onFolderClick={handleFolderClick} unreadCounts={unreadCounts} activeFolder={filterBy.folder} />
            </aside>
            <main>
                <section className="mail-filter-sort">
                    <MailFilterSort filterBy={filterBy} onFilter={onSetFilterBy} sortBy={sortBy} onSort={onSetSortBy} />
                </section>
                {isMails
                    ? <MailList mails={mails} />
                    : <div>No mails to show...</div>
                }
            </main>

        </section >
    )
}








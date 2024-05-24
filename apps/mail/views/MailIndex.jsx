const { useState, useEffect } = React
const { useSearchParams, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'


export function MailIndex() {
    const [mails, setMails] = useState([])
    const [unreadCounts, setUnreadCounts] = useState({})

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    // console.log('mailService.getFilterFromSearchParams(searchParams):', mailService.getFilterFromSearchParams(searchParams))
    // …filterBy, …sortBy
    useEffect(() => {
        // console.log('filterBy:', filterBy)
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then(mails => setMails(mails))
    }, [filterBy])

    useEffect(() => {
        mailService.getUnreadCountByFolder()
            .then(counts => setUnreadCounts(counts))
    }, [])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function handleFolderClick(folder) {
        setFilterBy({ folder, txt: '', isRead: '', isStarred: '' })
    }

    const isMails = mails.length > 0
    return (
        <section className="mail-index">
            <aside>
                <h1>My Mail</h1>
                <Link className="mail-compose-btn" to="/mail/compose"><button>Compose Mail</button></Link>
                <MailFolderList onFolderClick={handleFolderClick} unreadCounts={unreadCounts} activeFolder={filterBy.folder} />
            </aside>
            <main>
                <section className="mail-filter-sort">
                    <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
                </section>
                {isMails
                    ? <MailList mails={mails} />
                    : <div>No mails to show...</div>
                }
            </main>

        </section >
    )
}








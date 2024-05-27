const { useState, useEffect } = React
const { useSearchParams, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilterSort } from '../cmps/MailFilterSort.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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
        setSortBy({ ...newSort })
    }

    function handleFolderClick(folder) {
        (folder === 'starred') ? setFilterBy({ isStarred: true }) : setFilterBy({ folder, txt: '', isRead: '', isStarred: '' })
    }

    function handleMailStarToggle(mail) {
        setIsLoading(true)
        const updatedMail = { ...mail, isStarred: !mail.isStarred }
        mailService.save(updatedMail, mail.folder)
            .then(() => {
                setMails(prevMails => prevMails.map(m => m.id === mail.id ? updatedMail : m))
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('There was a problem')
            })
            .finally(() => setIsLoading(false))
    }

    function handleMailReadToggle(mail) {
        const updatedMail = { ...mail, isRead: !mail.isRead }
        mailService.save(updatedMail, mail.folder)
            .then(() => {
                setMails(prevMails => prevMails.map(m => m.id === mail.id ? updatedMail : m))
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('There was a problem')
            })
            .finally(() => setIsLoading(false))
    }

    const isMails = mails.length > 0
    return (
        <div className="mail-index-wrapper">
            <section className="mail-index">
                <h1>My Mail</h1>
                <MailFilterSort filterBy={filterBy} onFilter={onSetFilterBy} sortBy={sortBy} onSort={onSetSortBy} />
                <Link to="/mail/compose">
                    <label className="mail-compose-btn">
                        <div className="fa-solid i-compose"></div>
                        <button>Compose</button>
                    </label>
                </Link>
                {isMails
                    ? <MailList isLoading={isLoading} mails={mails} onMailStarToggle={handleMailStarToggle} onMailReadToggle={handleMailReadToggle} />
                    : <div>No mails to show...</div>
                }
                <MailFolderList onFolderClick={handleFolderClick} unreadCounts={unreadCounts} activeFolder={filterBy.folder} />

            </section >
        </div>
    )
}








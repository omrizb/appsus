const { useState, useEffect } = React
const { useSearchParams, Link, useLocation } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilterSort } from '../cmps/MailFilterSort.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export function MailIndex() {

    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [unreadCounts, setUnreadCounts] = useState({})

    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()

    const { filterBy: initialFilterBy, sortBy: initialSortBy } = mailService.getFilterSortFromSearchParams(searchParams)
    const [filterBy, setFilterBy] = useState(initialFilterBy)
    const [sortBy, setSortBy] = useState(initialSortBy)

    const [selectedMail, setSelectedMail] = useState(null)
    const [isShowComposeMailModal, setIsShowComposeMailModal] = useState(false)


    useEffect(() => {
        setSearchParams({ ...filterBy, ...sortBy })
        mailService.query(filterBy, sortBy)
            .then(mails => setMails(mails))
    }, [filterBy, sortBy])

    useEffect(() => {
        mailService.getUnreadCountByFolder()
            .then(counts => setUnreadCounts(counts))
    }, [mails])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function onSetSortBy(newSort) {
        setSortBy({ ...newSort })
    }

    function handleFolderClick(folder) {
        (folder === 'starred') ? setFilterBy({ isStarred: true }) : setFilterBy({ folder, txt: '', isRead: '', isStarred: '' })
    }

    function onOpenModal(mail) {

        const selectedMail = (!mail.id) ? mailService.getEmptyMail() : mail
        console.log('selectedMail:', selectedMail)
        setSelectedMail(selectedMail)
        setIsShowComposeMailModal(true)

    }

    function onCloseModal() {
        setIsShowComposeMailModal(false)
        setSelectedMail(null)
    }

    function handleMailUpdate(orgMail, updates, successMsg, errorMsg) {
        setIsLoading(true)
        const updatedMail = { ...orgMail, ...updates }
        const folder = updates.folder || orgMail.folder

        mailService.save(updatedMail, folder)

            .then(() => {
                setMails(prevMails => prevMails.map(mail => mail.id === orgMail.id ? updatedMail : mail))
                if (successMsg) showSuccessMsg(successMsg)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(errorMsg ? errorMsg : 'There was a problem')
            })
            .finally(() => setIsLoading(false))
    }

    const isMails = mails.length > 0
    return (
        <div className="mail-index-wrapper">
            <section className="mail-index">
                <h1>My Mail</h1>
                <MailFilterSort filterBy={filterBy} onFilter={onSetFilterBy} sortBy={sortBy} onSort={onSetSortBy} />
                <label className="mail-compose-btn">
                    <div className="fa-solid i-compose"></div>
                    <button onClick={onOpenModal}>Compose</button>
                </label>
                {(isMails) && (
                    <MailList
                        mails={mails}
                        onMailUpdate={handleMailUpdate}
                        onOpenModal={onOpenModal}
                    />
                )}
                {(!isMails) && (<div>No mails to show...</div>)}
                {(isShowComposeMailModal) && (
                    <MailCompose
                        selectedMail={selectedMail}
                        onMailUpdate={handleMailUpdate}
                        onCloseModal={onCloseModal}
                    />
                )}
                <MailFolderList onFolderClick={handleFolderClick} unreadCounts={unreadCounts} activeFolder={filterBy.folder} />

            </section >
        </div>
    )
}








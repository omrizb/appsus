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
    const [changeInFolder, setChangeInFolder] = useState(false)

    const [selectedMail, setSelectedMail] = useState(null)
    const [isShowComposeMailModal, setIsShowComposeMailModal] = useState(false)

    const [selectedMails, setSelectedMails] = useState([])

    useEffect(() => {
        setSearchParams({ ...filterBy, ...sortBy })
        mailService.query(filterBy, sortBy)
            .then(mails => {
                setMails(mails)
                setChangeInFolder(false)
            }
            )
    }, [filterBy, sortBy, changeInFolder])

    useEffect(() => {
        mailService.getUnreadCountByFolder()
            .then(counts => {
                setUnreadCounts(counts)
                setChangeInFolder(false)
            })
    }, [changeInFolder])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function onSetSortBy(newSort) {
        setSortBy({ ...newSort })
    }

    function handleFolderClick(folder) {
        if (folder === 'starred') { setFilterBy({ isStarred: true }) }
        else { setFilterBy({ folder, txt: '', isRead: '', isStarred: '' }) }
        setChangeInFolder(true)
    }

    function onOpenModal(mail) {
        if (!mail || !mail.id) {
            mailService.addMail().then(newMail => {
                setSelectedMail(newMail)
                setIsShowComposeMailModal(true)
            })
        } else {
            setSelectedMail(mail);
            setIsShowComposeMailModal(true)
        }
    }

    function onCloseModal() {
        setIsShowComposeMailModal(false)
        setSelectedMail(null)
    }

    function onMailSelected(mail) {
        setSelectedMails(prevSelectedMails => {
            if (prevSelectedMails.some(selectedMail => selectedMail.id === mail.id)) {
                return prevSelectedMails.filter(selectedMail => selectedMail.id !== mail.id)
            } else {
                return [...prevSelectedMails, mail]
            }
        })

    }
    console.log('SelectedMails:', selectedMails)
    function onMailsUpdate(action) {
        selectedMails.forEach(mail => {
            if (action === 'isStarred') {
                handleMailUpdate(mail, { isStarred: !mail.isStarred })
            } else if (action === 'isRead') {
                handleMailUpdate(mail, { isRead: !mail.isRead })
            } else if (action === 'trash') {
                handleMailUpdate(
                    mail,
                    { folder: 'trash', isStarred: false, removedAt: Date.now() },
                    'Your mail was moved to trash...',
                    'There was a problem',
                    true
                )
            }
        })
    }

    function handleMailUpdate(orgMail, updates, successMsg, errorMsg, isRemove = false) {
        setIsLoading(true)
        const updatedMail = { ...orgMail, ...updates }
        const folder = updates.folder || orgMail.folder
        if (isRemove && orgMail.folder === 'trash') {
            mailService.remove(updatedMail.id)
                .then(() => {
                    setChangeInFolder(true)
                    showSuccessMsg(`Your mail was deleted permanently!`)
                })
                .catch(err => {
                    setChangeInFolder(true)
                    console.log('err:', err)
                    showErrorMsg('There was a problem')
                })
                .finally(() => setIsLoading(false))
        }
        else {
            mailService.save(updatedMail, folder)

                .then(() => {
                    setMails(prevMails => prevMails.map(mail => mail.id === orgMail.id ? updatedMail : mail))
                    setChangeInFolder(true)
                    if (successMsg) showSuccessMsg(successMsg)
                })
                .catch(err => {
                    console.log('err:', err)
                    showErrorMsg(errorMsg ? errorMsg : 'There was a problem')
                })
                .finally(() => setIsLoading(false))
        }
    }

    const isMails = mails.length > 0
    return (
        <div className="mail-index-wrapper">
            <section className="mail-index">
                <h1>My Mail</h1>
                <MailFilterSort filterBy={filterBy} onFilter={onSetFilterBy} sortBy={sortBy} onSort={onSetSortBy} />
                <section className="action-checkboxes">
                    <label className="checkbox">
                        <div className="fa-regular i-note icon"></div>
                        <input
                            hidden
                            type="checkbox"
                        // onChange={onSaveAsNotes}
                        />
                    </label>
                    <label className="checkbox">
                        <div className={(selectedMails && selectedMails.length > 0 && selectedMails[0].isStarred) ? `fa-solid i-star` : `fa-regular i-unstar`}></div>
                        <input
                            hidden
                            type="checkbox"
                            onChange={() => onMailsUpdate('isStarred')}
                        />
                    </label>
                    <label className="checkbox">
                        <div className={(selectedMails && selectedMails.length > 0 && selectedMails[0].isRead) ? `fa-regular i-read` : `fa-regular i-unread`}></div>
                        <input
                            hidden
                            type="checkbox"
                            onChange={() => onMailsUpdate('isRead')}
                        />
                    </label>
                    <label className="checkbox">
                        <div className="fa-regular i-trash icon"></div>
                        <input
                            hidden
                            type="checkbox"
                            onChange={() =>
                                onMailsUpdate('trash')}
                        />
                    </label>
                </section>
                <label className="mail-compose-btn">
                    <div className="fa-solid i-compose"></div>
                    <button onClick={() => onOpenModal(null)}>Compose</button>
                </label>
                {(isMails) && (
                    <MailList
                        mails={mails}
                        onMailUpdate={handleMailUpdate}
                        onOpenModal={onOpenModal}
                        onMailSelected={onMailSelected}
                    />
                )}
                {(!isMails) && (<div className="no-mail-list" >No mails to show...</div>)}
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








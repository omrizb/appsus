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
    const [isShowActionCheckboxes, setIsShowActionCheckboxes] = useState(false)

    useEffect(() => {
        setSearchParams({ ...filterBy, ...sortBy })
        mailService.query(filterBy, sortBy)
            .then(mails => {
                setMails(mails)
                console.log('Mails fetched:', mails)
                setChangeInFolder(false)
            }
            )
    }, [filterBy, sortBy, changeInFolder])

    useEffect(() => {
        mailService.getUnreadCountByFolder()
            .then(counts => {
                setUnreadCounts(counts)
                console.log('Unread counts fetched:', counts)
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
        console.log('Selecting Mail ID:', mail.id)
        setSelectedMails(prevSelectedMails => {
            const isMailSelected = prevSelectedMails.some(selectedMail => selectedMail.id === mail.id)
            console.log('Is Mail Selected:', isMailSelected)
            let updatedSelectedMails

            if (isMailSelected) {
                updatedSelectedMails = prevSelectedMails.filter(selectedMail => selectedMail.id !== mail.id)
            } else {
                updatedSelectedMails = [...prevSelectedMails, mail]
            }

            console.log('Updated Selected Mails:', updatedSelectedMails)

            if (!isMailSelected && prevSelectedMails.length === 0) {
                setIsShowActionCheckboxes(true)
            }
            if (isMailSelected && prevSelectedMails.length === 1) {
                setIsShowActionCheckboxes(false)
            }
            return updatedSelectedMails
        })
    }

    function onMailsUpdate(action) {
        if (selectedMails.length === 0) return

        const updates = {}
        const firstSelectedMail = selectedMails[0]

        if (action === 'isStarred') {
            updates.isStarred = !firstSelectedMail.isStarred
        } else if (action === 'isRead') {
            updates.isRead = !firstSelectedMail.isRead
        } else if (action === 'trash') {
            updates.folder = 'trash'
            updates.isStarred = false
            updates.removedAt = Date.now()
        }

        console.log('Action:', action)
        console.log('Updates:', updates)


        setMails(prevMails => {
            const updatedMails = prevMails.map(mail =>
                selectedMails.some(selectedMail => selectedMail.id === mail.id) ? { ...mail, ...updates } : mail
            )
            console.log('Updated Mails:', updatedMails)
            return updatedMails
        })

        selectedMails.forEach(mail => {
            console.log('Updating Mail ID:', mail.id)
            handleMailUpdate(mail, updates,
                action === 'trash' ? 'Your mail was moved to trash...' : '',
                action === 'trash' ? 'There was a problem' : '',
                action === 'trash'
            )
        })

    }

    function handleMailUpdate(orgMail, updates, successMsg, errorMsg, isRemove = false) {
        setIsLoading(true)
        const updatedMail = { ...orgMail, ...updates }
        const folder = updates.folder || orgMail.folder

        console.log('Original Mail:', orgMail)
        console.log('Updates:', updates)
        console.log('Updated Mail:', updatedMail)
        console.log('Folder:', folder)

        if (isRemove && orgMail.folder === 'trash') {
            mailService.remove(updatedMail.id)
                .then(() => {
                    setChangeInFolder(true)
                    showSuccessMsg(`Your mail was deleted permanently!`)
                })
                .catch(err => {
                    console.log('Error:', err)
                    showErrorMsg('There was a problem')
                })
                .finally(() => setIsLoading(false))
        } else {
            mailService.save(updatedMail, folder)
                .then(() => {
                    setChangeInFolder(true)
                    if (successMsg) showSuccessMsg(successMsg)
                })
                .catch(err => {
                    console.log('Error:', err)
                    showErrorMsg(errorMsg || 'There was a problem')
                })
                .finally(() => setIsLoading(false))
        }
    }

    const isMails = mails.length > 0
    return (
        <div className="mail-index-wrapper">
            <section className="mail-index">
                <section className="mail-header">
                    <div className="header-elements">
                        <h1>My Mail</h1>
                        <label className="header-compose-btn">
                            <div className="fa-solid i-compose"></div>
                            <button onClick={() => onOpenModal(null)}>Compose</button>
                        </label>
                    </div>
                    <MailFilterSort filterBy={filterBy} onFilter={onSetFilterBy} sortBy={sortBy} onSort={onSetSortBy} />
                    {(isShowActionCheckboxes) && (
                        <section className="action-checkboxes hidden">
                            <label className="checkbox">
                                <div className="fa-regular i-note icon"></div>
                                <input
                                    hidden
                                    type="checkbox"
                                // onChange={onSaveAsNotes}
                                />
                            </label>
                            <label className="checkbox">
                                <div className={(selectedMails && selectedMails.length > 0 && !selectedMails[0].isStarred) ? `fa-solid i-star` : `fa-regular i-unstar`}></div>
                                <input
                                    hidden
                                    type="checkbox"
                                    onChange={() => onMailsUpdate('isStarred')}
                                />
                            </label>
                            <label className="checkbox">
                                <div className={(selectedMails && selectedMails.length > 0 && !selectedMails[0].isRead) ? `fa-regular i-read` : `fa-regular i-unread`}></div>
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
                    )}
                </section >

                <MailFolderList onFolderClick={handleFolderClick} unreadCounts={unreadCounts} activeFolder={filterBy.folder} />
                <section className="mail-main-view">
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

                </section>
            </section>
        </div>
    )
}








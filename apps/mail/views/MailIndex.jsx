const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then(mails => setMails(mails))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
    }, [])

    const isMails = mails.length > 0
    return (
        <section className="mail-index">
            <MailFolderList />

            <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
            {isMails
                ? <MailList isLoading={isLoading} mails={mails} />
                : <div>No mails to show...</div>
            }

        </section >
    )
}








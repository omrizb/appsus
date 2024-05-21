
const { useState, useEffect } = React

import { mailService } from "..../services/mail.service.js"
import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
    }, [])

    const isMails = mails.length > 0
    return (
        <section className="mail-index ">
            <h1>Mails</h1>
            {isMails
                ? <MailList isLoading={isLoading} mails={mails} />
                : <div>No mails to show...</div>
            }
        </section>
    )
}









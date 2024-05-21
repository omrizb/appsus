
const { useState, useEffect } = React

import { mailService } from "..../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
    }, [])

    return <section className="mail-index">
        <h1>Mails</h1>
        <pre>{JSON.stringify(mails,null,2)}</pre>    
        </section>
}
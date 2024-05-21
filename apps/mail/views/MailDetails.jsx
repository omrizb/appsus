const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { utilService } from '../services/util.service.js'
import { mailService } from '../services/mail.service.js'
import { LongTxt } from '../cmps/long-txt.jsx'
import { Loader } from '../cmps/loader.jsx'
import { ReviewAdd } from '../cmps/review-add.jsx'
import { ReviewList } from '../cmps/review-list.jsx'
import { showErrorMsg, } from '../services/event-bus.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const navigate = useNavigate()
    const { mailId } = useParams()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId).then((mail) => setMail(mail))
    }

    function onRemoveMail() {
        mailService.removeMail(mail.id).then(() => onGoBack())
    }

    function onGoBack() {
        navigate('/mail')
    }

    if (!mail) return <Loader />

    const {
        subject,
        body,
        isRead,
        sentAt,
        removedAt,
        from,
        to,
    } = mail

    return (
        <section>
            <div className='mail-details'>
                <div className='mail-container'>
                    <h2>{subject}</h2>
                    <h3>From: {from} | To: {to}</h3>
                    <button onClick={onGoBack}>Go back</button>
                    <button onClick={onRemoveMail}>Remove book</button>
                    <hr />
                    <p>{body}</p>
                </div>
            </div>
        </section>
    )
}

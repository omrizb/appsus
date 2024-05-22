const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'
import { Loader } from '../cmps/loader.jsx'


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
        mailService.remove(mail.id).then(() => onGoBack())
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
        folder
    } = mail

    return (
        <section>
            <div className='mail-details'>
                <div className='mail-container'>
                    <button onClick={onGoBack}>Go back</button>
                    <button onClick={onRemoveMail}>Remove</button>
                    <hr />
                    <h3>{subject}</h3>
                    <p>From: {from} | To: {to}</p>
                    <p>folder: {folder}  | sent at: {utilService.formatDate(sentAt)} | removed at: {utilService.formatDate(removedAt)}</p>
                    <hr />
                    <p>{body}</p>
                </div>
            </div>
        </section>
    )
}

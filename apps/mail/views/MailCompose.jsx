const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { mailService } from '../services/mail.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function MailCompose() {

    const [mail, setMail] = useState(mailService.getEmptyMail())

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.mailId) return
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
    }, [])

    function handleChange({ target }) {
        const { name, value } = target;
        setMail(prevMail => ({ ...prevMail, [name]: value }))

    }

    function onSaveAsDraft(ev) {
        ev.preventDefault()
        mailService.save(mail, 'drafts')
            .then(() => {
                showSuccessMsg(`Your mail was moved to draft...`)
                navigate('/mail')
            })
            .catch(() => {
                showErrorMsg('Could not save as draft')
                navigate('/mail');
            })
    }


    function onSend(ev) {
        ev.preventDefault();
        const mailToSend = { ...mail, sentAt: Date.now() }
        mailService.save(mailToSend, 'sent')
            .then(() => {
                showSuccessMsg(`Your mail was sent...`)
                navigate('/mail')
            })
            .catch(() => {
                showErrorMsg('Could not send email')
                navigate('/mail');
            })
    }

    return (
        <section className="mail-compose">

            <form>
                <div>
                    <label htmlFor="to">To:</label>
                    <input
                        type="email"
                        id="to"
                        name="to"
                        value={mail.to}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={mail.subject}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        name="body"
                        value={mail.body}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={onSaveAsDraft}>Save as Draft</button>
                <button onClick={onSend}>Send</button>
            </form>
        </section>
    )
}
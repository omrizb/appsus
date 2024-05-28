const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

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
        const { name, value } = target
        setMail(prevMail => ({ ...prevMail, [name]: value }))

    }

    function onSaveAsDraft(ev) {
        ev.preventDefault()
        mailService.save(mail, 'draft')
            .then(() => {
                showSuccessMsg(`Your mail was moved to draft...`)
                onGoBack()
            })
            .catch(() => {
                showErrorMsg('Could not save as draft')
                onGoBack()
            })
    }


    function onSend(ev) {
        ev.preventDefault()
        const mailToSend = { ...mail, sentAt: Date.now() }
        mailService.save(mailToSend, 'sent')
            .then(() => {
                showSuccessMsg(`Your mail was sent...`)
                onGoBack()
            })
            .catch(() => {
                showErrorMsg('Could not send email')
                onGoBack()
            })
    }

    function onGoBack() {
        navigate('/mail')
    }
    return (
        <section className="mail-compose">
            <div className="mail-modal">
                <h2>New Message</h2>
                <Link to='/mail'>
                    <button className="close-modal-btn">x</button>
                </Link>
                <form>
                    <div>From: {mail.from}</div>
                    <div>
                        <label>To:
                            <input
                                type="email"
                                id="to"
                                name="to"
                                value={mail.to}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={mail.subject}
                                onChange={handleChange}
                                placeholder="Subject:"
                            />
                        </label>
                    </div>
                    <textarea
                        id="body"
                        name="body"
                        cols='70'
                        rows='20'
                        value={mail.body}
                        onChange={handleChange}
                    />
                    <section className="actions">
                        <button onClick={onSaveAsDraft}>Save as Draft</button>
                        <button onClick={onSend}>Send</button>
                    </section>
                </form>
            </div>
        </section>
    )
}
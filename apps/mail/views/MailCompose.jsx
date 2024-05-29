const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link, useLocation } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function MailCompose() {
    // console.log('im in compose')
    const [mail, setMail] = useState(mailService.getEmptyMail())

    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

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

    function onRemoveMail(ev) {
        // console.log('hi');
        ev.preventDefault()
        const mailRemoved = { ...mail, isStarred: false, removedAt: Date.now() }
        mailService.save(mailRemoved, 'trash')
            .then(() => {
                showSuccessMsg(`Your mail was moved to trash...`)
                onGoBack()
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('There was a problem')
                onGoBack()
            })
    }

    function onGoBack() {
        navigate(`/mail${location.search}`)
    }
    return (
        <section className="mail-compose">
            <div className="mail-modal">
                <h2>New Message</h2>
                <button className="close-modal-btn" onClick={onGoBack}>x</button>
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
                        {(!mail.id) && (
                            <button className="action-btn" onClick={onSaveAsDraft}>Save as Draft</button>
                        )}
                        <button className="action-btn" onClick={onSend}>Send</button>
                        {(mail.id) && (
                            <label className="icon-btn">
                                <div className="fa-regular i-trash icon"></div>
                                <button onClick={onRemoveMail}></button>
                            </label>
                        )}
                    </section>
                </form>
            </div>
        </section>
    )
}
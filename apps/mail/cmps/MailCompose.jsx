const { useState, useEffect, useRef } = React

import { mailService } from '../services/mail.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function MailCompose({ selectedMail, onMailUpdate, onCloseModal }) {
    // console.log('im in compose')
    const inputRef = useRef()
    const [mail, setMail] = useState(selectedMail)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function handleChange({ target }) {
        const { name, value } = target
        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    function onSaveAsDraft(ev) {
        ev.preventDefault()
        console.log('mail:', mail)
        onMailUpdate(
            mail,
            { folder: 'draft' },
            'Your mail was moved to draft...'
        )
        onCloseModal()
    }


    function onSend(ev) {
        ev.preventDefault()
        onMailUpdate(
            mail,
            { folder: 'sent', sentAt: Date.now() },
            'Your mail was sent...'
        )
        onCloseModal()
    }

    function onRemove(ev) {
        ev.preventDefault()
        onMailUpdate(
            mail,
            { folder: 'trash', isStarred: false, removedAt: Date.now() },
            'Your mail was moved to trash'
        )
        onCloseModal()
    }

    return (
        <section className="mail-compose">
            <div className="mail-modal">
                <h2>New Message</h2>
                <button className="close-modal-btn" onClick={onCloseModal}>x</button>
                <form>
                    <div>From: {mail.from}</div>
                    <div>
                        <label>To:
                            <input
                                autoFocus
                                ref={inputRef}
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
                                <button onClick={onRemove}></button>
                            </label>
                        )}
                    </section>
                </form>
            </div>
        </section>
    )
}
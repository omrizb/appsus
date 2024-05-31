const { Link, useLocation, useNavigate } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function MailList({ mails, onMailUpdate, onMailSelected, onOpenModal }) {
    const location = useLocation()
    const navigate = useNavigate()

    function onSaveAsNote(mail) {
        console.log('hi');
        navigate(`/note/notes/add-note?title=${mail.subject}&txt=${mail.body}&isPinned='false'`)
    }

    return (
        <section className="mail-list">
            <ul>
                {mails.map(mail =>
                    <li key={mail.id} className={`${mail.isRead ? 'read' : 'unread'}`}>
                        <section className="mail-checkboxes">
                            <label className="mail-checkbox">
                                <input
                                    type="checkbox"
                                    // checked={selectedMails.some(selectedMail => selectedMail.id === mail.id)}
                                    onChange={() => onMailSelected(mail)}
                                />
                            </label>
                            <label className="mail-checkbox">
                                <div className={mail.isStarred ? `fa-solid i-star` : `fa-regular i-unstar`}></div>
                                <input
                                    hidden
                                    type="checkbox"
                                    checked={mail.isStarred}
                                    onChange={() => onMailUpdate(mail, { isStarred: !mail.isStarred })}
                                />
                            </label>
                        </section>
                        {(mail.folder === 'draft') && (
                            <div onClick={() => onOpenModal(mail)}>
                                <MailPreview mail={mail} />
                            </div>
                        )}
                        {(mail.folder !== 'draft') && (
                            <Link to={`/mail/${mail.id}${location.search}`}>
                                <MailPreview mail={mail} />
                            </Link>
                        )}
                        <section className="action-checkboxes">
                            <label className="action-checkbox">
                                <div className="fa-regular i-note icon"></div>
                                <input
                                    hidden
                                    type="checkbox"
                                    onChange={() => onSaveAsNote(mail)}
                                />
                            </label>
                            <label className="action-checkbox">
                                <div className={mail.isRead ? `fa-regular i-read` : `fa-regular i-unread`}></div>
                                <input
                                    hidden
                                    type="checkbox"
                                    checked={mail.isRead}
                                    onChange={() => onMailUpdate(mail, { isRead: !mail.isRead })}
                                />
                            </label>
                            <label className="action-checkbox">
                                <div className="fa-regular i-trash icon"></div>
                                <input
                                    hidden
                                    type="checkbox"
                                    onChange={() =>
                                        onMailUpdate(
                                            mail,
                                            { folder: 'trash', isStarred: false, removedAt: Date.now() },
                                            'Your mail was moved to trash...',
                                            'There was a problem',
                                            true
                                        )}
                                />
                            </label>
                        </section>
                    </li>)
                }
            </ul>
        </section>
    )
}
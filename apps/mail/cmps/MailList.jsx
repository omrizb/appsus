const { Link, useLocation } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'
import { mailService } from '../services/mail.service.js'

export function MailList({ mails, isLoading, onMailStarToggle, onMailReadToggle }) {
    const location = useLocation()
    return (
        <section style={{ opacity: isLoading ? 0.5 : 1 }} className="mail-list">
            <ul>
                {mails.map(mail =>
                    <li key={mail.id} className={`${mail.isRead ? 'read' : 'unread'}`}>
                        <section className="mail-checkboxes">
                            <label className="mail-checkbox">
                                <input
                                    type="checkbox"
                                />
                            </label>
                            <label className="mail-checkbox">
                                <div className={mail.isStarred ? `fa-solid i-star` : `fa-regular i-unstar`}></div>
                                <input
                                    hidden
                                    type="checkbox"
                                    checked={mail.isStarred}
                                    onChange={() => onMailStarToggle(mail)}
                                />
                            </label>
                        </section>
                        {(mail.folder === 'draft') && (
                            <Link to={`/mail/compose/${mail.id}${location.search}`}>
                                <MailPreview mail={mail} />
                            </Link>
                        )}
                        {(mail.folder !== 'draft') && (
                            <Link to={`/mail/${mail.id}${location.search}`}>
                                <MailPreview mail={mail} />
                            </Link>
                        )}
                        <label className="read-checkbox">
                            <div className={mail.isRead ? `fa-regular i-read` : `fa-regular i-unread`}></div>
                            <input
                                hidden
                                type="checkbox"
                                checked={mail.isRead}
                                onChange={() => onMailReadToggle(mail)}
                            />
                        </label>
                    </li>)
                }
            </ul>
        </section>
    )
}
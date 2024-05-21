const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, isLoading }) {
    return (
        <section style={{ opacity: isLoading ? 0.5 : 1 }} className="mail-list">
            <ul>
                {mails.map(mail =>
                    <li key={mail.id}>
                        <Link to={`/mail/${mail.id}`}><MailPreview mail={mail} /></Link>
                    </li>)
                }
            </ul>
        </section>
    )
}
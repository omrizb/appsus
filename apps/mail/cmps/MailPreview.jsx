import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
    return (
        <article className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>
            <h4>{mail.subject}</h4>

            <p>{mail.body.substring(0, 100)}...</p>
            <small>From: {mail.from} | To: {mail.to}</small>
            <small>{utilService.formatDateDynamic(mail.sentAt)}</small>

        </article>
    )
}
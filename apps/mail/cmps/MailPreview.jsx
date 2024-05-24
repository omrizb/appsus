import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
    return (
        <article className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>
            <div className="mail-header">
                {(mail.folder === 'drafts' || mail.folder === 'inbox') && (
                    <p>From: {mail.from}</p>
                )}
                {mail.folder === 'sent' && (
                    <p>To: {mail.to}</p>
                )}
                {mail.folder === 'trash' && (
                    <p>From: {mail.from} | To: {mail.to}</p>
                )}
                <small>{utilService.formatDateDynamic(mail.sentAt)}</small>
            </div>
            <div className="mail-content">
                <p className="mail-subject">{mail.subject}</p>
                <p className="mail-body">{mail.body.substring(0, 70)}...</p>
            </div>
        </article>
    )
}
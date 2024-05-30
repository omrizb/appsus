import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
    return (
        <article className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>
            <div className="mail-header">
                {(mail.folder === 'inbox' || mail.folder === 'trash') && (
                    <p className={`${mail.isRead ? 'read' : 'unread-bold'}`}>{mail.from.split('@')[0]}</p>
                )}
                {(mail.folder === 'sent') && (
                    <p>To: {mail.to.split('@')[0]}</p>
                )}
                {(mail.folder === 'draft') && (
                    <p style={{ color: 'red' }}>Draft</p>
                )}
            </div>
            <div className="mail-content">
                {(mail.subject) && (
                    <p className={`${mail.isRead ? 'read' : 'unread-bold'}`}>{mail.subject}</p>
                )}
                {(mail.body) && (
                    <p className="mail-body">{mail.body.substring(0, 70)}...</p>
                )}
            </div>
            <small className={`${mail.isRead ? 'read' : 'unread-bold'}`}>{utilService.formatDateDynamic(mail.sentAt)}</small>
        </article>
    )
}
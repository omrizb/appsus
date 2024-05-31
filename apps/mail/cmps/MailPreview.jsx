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
            <div className="content">
                <div className={`${mail.isRead ? 'read' : 'unread-bold'}`}>{mail.subject}</div>
                <div className="mail-body">{mail.body.substring(0, 70)}...</div>
            </div>
            <div className={`${mail.isRead ? 'read' : 'unread-bold'}`}>{utilService.formatDateDynamic(mail.sentAt)}</div>
        </article>
    )
}
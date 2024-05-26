const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'



export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then((mail) => {
                setMail(mail)
                if (!mail.isRead) {
                    mail.isRead = true
                    mailService.save(mail, mail.folder)
                }
            })
            .catch(() => {
                showErrorMsg('Couldnt get car...')
                navigate('/car')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function onRemoveMail() {
        if (folder === 'trash') {
            mailService.remove(mail.id)
                .then(() => {
                    showSuccessMsg(`Your mail was deleted permanently!`)
                    onGoBack()
                })
                .catch(err => {
                    console.log('err:', err)
                    showErrorMsg('There was a problem')
                })
                .finally(() => setIsLoading(false))

        } else {
            const mailRemoved = { ...mail, removedAt: Date.now() }
            mailService.save(mailRemoved, 'trash')
                .then(() => {
                    showSuccessMsg(`Your mail was moved to trash...`)
                    onGoBack()
                })
                .catch(err => {
                    console.log('err:', err)
                    showErrorMsg('There was a problem')
                })
                .finally(() => setIsLoading(false))
        }
    }

    function onGoBack() {
        navigate('/mail')
    }

    if (isLoading) return <h3>Loading...</h3>

    const {
        subject,
        body,
        isRead,
        sentAt,
        removedAt,
        from,
        to,
        folder
    } = mail

    return (
        <section>
            <div className='mail-details'>
                <div className='mail-container'>
                    <button onClick={onGoBack}>Go back</button>
                    <button onClick={onRemoveMail}> {folder === 'trash' ? 'Delete Permanently' : 'Delete'} </button>
                    {folder === 'draft' && (
                        <Link to={`/mail/compose/${mail.id}`}><button>Edit</button></Link>
                    )}
                    <hr />
                    <h3>{subject}</h3>
                    <p>From: {from}
                        {to ? ` | to: ${to}` : ''}
                    </p>
                    <p>
                        Folder: {folder}
                        {sentAt ? ` | Sent at: ${utilService.formatDate(sentAt)}` : ''}
                        {removedAt ? ` | Removed at: ${utilService.formatDate(removedAt)}` : ''}
                    </p>
                    <hr />
                    <p>{body}</p>
                </div>
            </div>
        </section>
    )
}

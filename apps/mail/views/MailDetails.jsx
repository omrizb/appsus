const { useState, useEffect } = React
const { useNavigate, useParams, Link, useLocation } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'



export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

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
                showErrorMsg('Couldnt get mail...')
                onGoBack()
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
                    onGoBack()
                })
                .finally(() => setIsLoading(false))

        } else {
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
                .finally(() => setIsLoading(false))
        }
    }

    function onGoBack() {
        // console.log('im in deatils');
        // console.log('location.search:', location.search)
        navigate(`/mail${location.search}`)
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
                    <section className="mail-details-actions">
                        <label className="icon-btn">
                            <div className="fa-solid i-goback icon"></div>
                            <button onClick={onGoBack}></button>
                        </label>
                        {(folder === 'trash') && (
                            <button className="action-btn" onClick={onRemoveMail}>Delete forever</button>
                        )}
                        {(folder !== 'trash') && (
                            <label className="icon-btn">
                                <div className="fa-regular i-trash icon"></div>
                                <button onClick={onRemoveMail}></button>
                            </label>
                        )}
                    </section>
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

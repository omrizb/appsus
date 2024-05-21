// mail service
import { utilService } from "....../share-services/util.service.js"
import { storageService } from "....../share-services/async-storage.service.js"

const MAIL_KEY = 'emailDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }


_createMails()

export const mailService = {
    query,

}
// For Debug (easy access from console):
window.ms = mailService


function query() {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            return mails
        })
}


function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        const subjects = ['Miss you!', 'Meeting Reminder', 'Check out this offer', 'Updates on the project'];
        const bodies = ['Would love to catch up sometimes', 'Just a friendly reminder about our meeting tomorrow', 'Don\'t miss out on our latest deals!', 'Here are the latest updates on the project'];
        const mailsAddresses = ['momo@momo.com', 'john@example.com', 'jane@example.com', 'info@example.com'];

        for (let i = 0; i < 11; i++) {
            const subject = subjects[i % subjects.length]
            const body = bodies[i % bodies.length]
            const from = mailsAddresses[i % mailsAddresses.length]
            const to = 'user@appsus.com'
            mails.push(_createEmail(subject, body, from, to))
        }
        utilService.saveToStorage(MAIL_KEY, mails)

        for (let i = 0; i < 11; i++) {
            const subject = subjects[i % subjects.length]
            const body = bodies[i % bodies.length]
            const from = 'user@appsus.com'
            const to = mailsAddresses[i % mailsAddresses.length]
            mails.push(_createEmail(subject, body, from, to))
        }
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createEmail(subject, body, from, to) {
    const email = {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: utilService.randomTimestamp(2023),
        removedAt: null,
        from,
        to,
        folder: from==='user@appsus.com'? 'sent':'inbox',
    }
    return email
}


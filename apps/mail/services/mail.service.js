// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }



_createMails()

export const mailService = {
    query,
    get,
    remove,
    getDefaultFilter,
    getFilterFromSearchParams,

}
// For Debug (easy access from console):
window.ms = mailService


function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => 
                    regExp.test(mail.subject) ||
                    regExp.test(mail.body) ||
                    regExp.test(mail.from) ||
                    regExp.test(mail.to)
                )
            }
            if (filterBy.isRead !== null) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail = _setNextPrevMailId(mail)
            return mail
        })
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function getDefaultFilter(filterBy = { txt: '',isRead: null }) {
    return { txt: filterBy.txt , isRead: filterBy.isRead }
}

function getFilterFromSearchParams(searchParams) {
    return {
        txt: searchParams.get('txt') || '',
        isRead: searchParams.get('isRead') || null,
    }
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
            mails.push(_createMail(subject, body, from, to))
        }
        utilService.saveToStorage(MAIL_KEY, mails)

        for (let i = 0; i < 11; i++) {
            const subject = subjects[i % subjects.length]
            const body = bodies[i % bodies.length]
            const from = 'user@appsus.com'
            const to = mailsAddresses[i % mailsAddresses.length]
            mails.push(_createMail(subject, body, from, to))
        }
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, from, to) {
    const mail = {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: utilService.randomTimestamp(2023),
        removedAt: null,
        from,
        to,
        folder: from===loggedinUser.email? 'sent':'inbox',
    }
    return mail
}
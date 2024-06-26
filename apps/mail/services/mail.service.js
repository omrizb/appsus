// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

_createMails()

export const mailService = {
    query,
    get,
    addMail,
    save,
    remove,
    getFilterSortFromSearchParams,
    getEmptyMail,
    getUnreadCountByFolder
}
// For Debug (easy access from console):
window.ms = mailService


function query(filterBy = {}, sortBy = {}) {

    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.folder) {
                mails = mails.filter(mail => mail.folder === filterBy.folder)
            }

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail =>
                    regExp.test(mail.subject) ||
                    regExp.test(mail.body) ||
                    regExp.test(mail.from) ||
                    regExp.test(mail.to)
                )
            }

            if (filterBy.isRead !== null && filterBy.isRead !== '' && filterBy.isRead !== undefined) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }

            if (filterBy.isStarred !== null && filterBy.isStarred !== '' && filterBy.isStarred !== undefined) {
                mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
            }


            // if (filterBy.labels !== undefined && filterBy.labels.length > 0) {
            //     mails = mails.filter(mail => filterBy.labels.some(label => mail.labels.includes(label)))
            // }

            if (sortBy.date !== null && sortBy.date !== '' && sortBy.date !== undefined) {
                if (sortBy.date === 'asc') {
                    mails.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
                } else if (sortBy.date === 'desc') {
                    mails.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
                }
            }
            if (sortBy.subject !== null && sortBy.subject !== '' && sortBy.subject !== undefined) {
                if (sortBy.subject === 'asc') {
                    mails.sort((a, b) => a.subject.localeCompare(b.subject))
                } else if (sortBy.subject === 'desc') {
                    mails.sort((a, b) => b.subject.localeCompare(a.subject))
                }
            }
            if (sortBy.from !== null && sortBy.from !== '' && sortBy.from !== undefined) {
                if (sortBy.from === 'asc') {
                    mails.sort((a, b) => a.from.localeCompare(b.from))
                } else if (sortBy.from === 'desc') {
                    mails.sort((a, b) => b.from.localeCompare(a.from))
                }
            }
            if (sortBy.to !== null && sortBy.to !== '' && sortBy.to !== undefined) {
                if (sortBy.to === 'asc') {
                    mails.sort((a, b) => a.to.localeCompare(b.to))
                } else if (sortBy.to === 'desc') {
                    mails.sort((a, b) => b.to.localeCompare(a.to))
                }
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function getEmptyMail(
    id = utilService.makeId(),
    subject = '',
    body = '',
    isRead = false,
    isStarred = false,
    sentAt = null,
    removedAt = null,
    from = loggedinUser.email,
    to = '',
    folder = 'draft'
) {
    return { id, subject, body, isRead, isStarred, sentAt, removedAt, from, to, folder }
}

function addMail() {
    const mail = getEmptyMail()
    return storageService.post(MAIL_KEY, mail)
}

function save(mail, folder) {
    mail.folder = folder
    if (!mail.id) return
    return storageService.put(MAIL_KEY, mail)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function getFilterSortFromSearchParams(searchParams) {
    const filterBy = {
        folder: parseBooleanOrNull(searchParams.get('folder')) || 'inbox',
        txt: parseBooleanOrNull(searchParams.get('txt')) || '',
        isRead: parseBooleanOrNull(searchParams.get('isRead')) || '',
        isStarred: parseBooleanOrNull(searchParams.get('isStarred')) || '',
    }

    const sortBy = {
        date: parseBooleanOrNull(searchParams.get('date')) || 'desc',
        subject: parseBooleanOrNull(searchParams.get('subject')) || '',
        from: parseBooleanOrNull(searchParams.get('from')) || '',
        to: parseBooleanOrNull(searchParams.get('to')) || '',
    }

    return { filterBy, sortBy }
}

function parseBooleanOrNull(value) {
    if (value === 'true') return true
    if (value === 'false') return false
    if (value === 'null') return null
    // if (value === 'null' || value === null) return null
    return value
}

function getUnreadCountByFolder() {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            const unreadCountByFolder = mails.reduce((map, mail) => {
                if (!mail.isRead) {
                    if (!map[mail.folder]) map[mail.folder] = 0
                    map[mail.folder]++
                }
                return map
            }, {})
            return unreadCountByFolder
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        const subjects = ['Miss you!', 'Meeting Reminder', 'Check out this offer', 'Updates on the project']
        // const bodies = ['Would love to catch up sometimes', 'Just a friendly reminder about our meeting tomorrow', 'Don\'t miss out on our latest deals!', 'Here are the latest updates on the project']
        const mailsAddresses = ['momo@momo.com', 'john@example.com', 'jane@example.com', 'info@example.com']

        for (let i = 0; i < 11; i++) {
            const subject = subjects[i % subjects.length]
            // const body = bodies[i % bodies.length]
            const body = utilService.makeLorem()
            const from = mailsAddresses[i % mailsAddresses.length]
            const to = 'user@appsus.com'
            mails.push(_createMail(subject, body, from, to))
        }
        utilService.saveToStorage(MAIL_KEY, mails)

        for (let i = 0; i < 11; i++) {
            const subject = subjects[i % subjects.length]
            // const body = bodies[i % bodies.length]
            const body = utilService.makeLorem()
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
        isStarred: false,
        sentAt: utilService.randomTimestamp(2023),
        removedAt: null,
        from,
        to,
        folder: from === loggedinUser.email ? 'sent' : 'inbox',
    }
    return mail
}
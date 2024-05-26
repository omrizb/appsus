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
    save,
    getFilterSortFromSearchParams,
    getEmptyMail,
    getUnreadCountByFolder
}
// For Debug (easy access from console):
window.ms = mailService


function query(filterBy = {}, sortBy = {}) {
    // console.log({ filterBy });
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
                // console.log('mails before isRead filter', { mails });
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
                // console.log('mails after isRead filter', { mails });
            }

            if (filterBy.isStarred !== null && filterBy.isStarred !== '' && filterBy.isStarred !== undefined) {
                mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
            }


            // if (filterBy.labels !== undefined && filterBy.labels.length > 0) {
            //     mails = mails.filter(mail => filterBy.labels.some(label => mail.labels.includes(label)))
            // }

            if (sortBy.sortBy === 'date') {
                if (sortBy.direction === 'asc') {
                    mails.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
                } else if (sortBy.direction === 'desc') {
                    mails.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
                }
            } else if (sortBy.sortBy === 'subject') {
                if (sortBy.direction === 'asc') {
                    mails.sort((a, b) => a.subject.localeCompare(b.subject))
                } else if (sortBy.direction === 'desc') {
                    mails.sort((a, b) => b.subject.localeCompare(a.subject))
                }
            } else if (sortBy.sortBy === 'from') {
                if (sortBy.direction === 'asc') {
                    mails.sort((a, b) => a.from.localeCompare(b.from))
                } else if (sortBy.direction === 'desc') {
                    mails.sort((a, b) => b.from.localeCompare(a.from))
                }
            } else if (sortBy.sortBy === 'to') {
                if (sortBy.direction === 'asc') {
                    mails.sort((a, b) => a.to.localeCompare(b.to))
                } else if (sortBy.direction === 'desc') {
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
    subject = '',
    body = '',
    isRead = false,
    sentAt = null,
    removedAt = null,
    from = loggedinUser.email,
    to = '',
    folder = 'draft'
) {
    return { subject, body, isRead, sentAt, removedAt, from, to, folder }

}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail, folder) {
    mail.folder = folder
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}
// function getDefaultFilter(filterBy = { folder: 'inbox', txt: '', isRead: '', isStarred: '' }) {
//     return { folder: filterBy.folder, txt: filterBy.txt, isRead: filterBy.isRead, isStarred: filterBy.isStarred }
// }

function getFilterSortFromSearchParams(searchParams) {
    const filterBy = {
        folder: searchParams.get('folder') || 'inbox',
        txt: searchParams.get('txt') || '',
        isRead: searchParams.get('isRead') || '',
        isStarred: searchParams.get('isStarred') || '',
    }

    const sortBy = {
        sortBy: searchParams.get('sortBy') || 'date',
        direction: searchParams.get('direction') || 'asc',
    }

    return { filterBy, sortBy }
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
        const subjects = ['Miss you!', 'Meeting Reminder', 'Check out this offer', 'Updates on the project'];
        // const bodies = ['Would love to catch up sometimes', 'Just a friendly reminder about our meeting tomorrow', 'Don\'t miss out on our latest deals!', 'Here are the latest updates on the project'];
        const mailsAddresses = ['momo@momo.com', 'john@example.com', 'jane@example.com', 'info@example.com'];

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
        sentAt: utilService.randomTimestamp(2023),
        removedAt: null,
        from,
        to,
        folder: from === loggedinUser.email ? 'sent' : 'inbox',
    }
    return mail
}
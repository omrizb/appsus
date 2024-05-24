export const utilService = {
    loadFromStorage,
    saveToStorage,
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomItems,
    getRandomColor,
    randomTimestamp,
    padNum,
    getDayName,
    getMonthName,
    formatDate,
    formatDateDynamic,
    rgbToHex,
    debounce
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getRandomItems(items, size = 1, duplicationAllowed = false) {
    if (size > items.length && !duplicationAllowed) return

    const res = []
    const srcArray = (duplicationAllowed) ? items : [...items]
    for (let i = 0; i < size; i++) {
        if (!duplicationAllowed && srcArray.length === 0) break
        const randIdx = Math.floor(Math.random() * srcArray.length)
        res.push(srcArray[randIdx])
        if (!duplicationAllowed) srcArray.splice(randIdx, 1)
    }
    return (size === 1) ? res[0] : res
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function randomTimestamp(startYear) {
    const start = new Date(startYear, 0, 1); // January 1, startYear
    const end = new Date(); // Current date
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return randomDate.getTime()
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}


function formatDate(timestamp) {
    if (!timestamp) return ""
    const date = new Date(timestamp)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

function formatDateDynamic(timestamp) {
    if (!timestamp) return ""
    const date = new Date(timestamp)
    const now = new Date()

    // If the date is today, display hh:mm
    if (date.toDateString() === now.toDateString()) {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    // If the date is this year but not today, display dd month name
    if (date.getFullYear() === now.getFullYear()) {
        const options = { day: '2-digit', month: 'short' }
        return date.toLocaleDateString(undefined, options)
    }

    // Otherwise, display dd/mm/yyyy
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g)
    return `#${((1 << 24) + (+result[0] << 16) + (+result[1] << 8) + +result[2]).toString(16).slice(1).toLowerCase()}`
}

function debounce(callback, wait) {
    let timeoutId = null
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args)
        }, wait)
    }
}
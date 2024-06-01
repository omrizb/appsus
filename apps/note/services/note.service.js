import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

import { videos } from "./videos.js"

const BACKGROUND_COLORS = [
    { name: 'none', color: '#ffffff' },
    { name: 'coral', color: '#faafa8' },
    { name: 'peach', color: '#f39f76' },
    { name: 'sand', color: '#fff8b8' },
    { name: 'mint', color: '#e2f6d3' },
    { name: 'sage', color: '#b4ddd3' },
    { name: 'fog', color: '#d4e4ed' },
    { name: 'storm', color: '#aeccdc' },
    { name: 'dusk', color: '#d3bfdb' },
    { name: 'blossom', color: '#f6e2dd' },
    { name: 'clay', color: '#e9e3d4' },
    { name: 'chalk', color: '#efeff1' }
]
const NOTE_KEY = 'noteDB'

_createNotes(12)

export const noteService = {
    query,
    get,
    remove,
    save,
    setTrashProp,
    removeAllTrash,
    getEmptyNote,
    getEmptyNoteAllTypes,
    getEmptyFilter,
    getFilterFromSearchParams,
    getBackgroundColors,
    sortPinnedFirst,
}

// Debug:
// window.ns = noteService

function query(filterBy = {}, sortByPinned = true) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => (
                    regExp.test(note.title) ||
                    regExp.test(note.info.txt)
                ))
            }

            if (filterBy.isTrashed !== null) {
                notes = notes.filter(note => note.isTrashed === filterBy.isTrashed)
            }

            if (sortByPinned) {
                notes.sort(sortPinnedFirst)
            }

            notes.sort((note1, note2) => note2.updatedAt - note1.updatedAt)

            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function setTrashProp(noteId, isTrashed = true) {
    return get(noteId)
        .then(note => {
            note.isTrashed = isTrashed
            return save(note)
        })
}

function removeAllTrash() {
    return storageService.removeAll(NOTE_KEY, 'isTrashed', true)
}

function getEmptyNote(type) {
    return {
        type,
        title: '',
        isPinned: false,
        isTrashed: false,
        info: { ..._getNoteInfo(type) },
        style: {
            backgroundColor: { name: 'none', color: '#ffffff' }
        }
    }
}

function getEmptyNoteAllTypes() {
    const noteTypes = ['NoteTxt', 'NoteImg', 'NoteVideo', 'NoteTodos']
    const emptyNotes = {}
    noteTypes.forEach(type => emptyNotes[type] = getEmptyNote(type))
    return emptyNotes
}

function getEmptyFilter() {
    return {
        txt: '',
        isTrashed: null
    }
}

function getFilterFromSearchParams(searchParams) {
    return {
        txt: searchParams.get('txt') || '',
    }
}

function getBackgroundColors() {
    return BACKGROUND_COLORS
}

function sortPinnedFirst(note1, note2) {
    if (note1.isPinned && !note2.isPinned) return -1
    if (!note1.isPinned && note2.isPinned) return 1
    return 0
}

function _getNoteInfo(type) {
    switch (type) {
        case 'NoteTxt':
            return {
                txt: ''
            }
        case 'NoteImg':
            return {
                txt: '',
                url: ''
            }
        case 'NoteVideo':
            return {
                txt: '',
                thumbnail: '',
                url: ''
            }
        case 'NoteTodos':
            return {
                txt: '',
                todos: [{ txt: '', doneAt: null, id: utilService.makeId(6) }]
            }
        default:
            throw new Error('Unknown note type. Type should be one of the following: NoteTxt, NoteImg, NoteVideo, NoteTodos.')
    }
}

function _createNotes(size) {
    let notes = utilService.loadFromStorage(NOTE_KEY)

    if (notes && notes.length) return

    notes = []
    for (let i = 0; i < size; i++) {
        notes.push(_createNote())
    }

    utilService.saveToStorage(NOTE_KEY, notes)
}

function _createNote() {
    const noteTypes = ['NoteTxt', 'NoteImg', 'NoteVideo', 'NoteTodos']
    const noteType = utilService.getRandomItems(noteTypes)
    const note = getEmptyNote(noteType)

    note.title = utilService.makeLorem(2)
    note.isPinned = (Math.random() > 0.7)
    note.style.backgroundColor = utilService.getRandomItems(BACKGROUND_COLORS)
    note.id = utilService.makeId(5)
    note.createdAt = Date.now()
    note.updatedAt = Date.now()

    switch (noteType) {
        case 'NoteTxt':
            note.info.txt = utilService.makeLorem(10)
            break
        case 'NoteImg':
            const randWidth = utilService.getRandomIntInclusive(500, 800)
            const randHeight = utilService.getRandomIntInclusive(300, 600)
            note.info.url = `https://picsum.photos/${randWidth}/${randHeight}`
            note.info.txt = utilService.makeLorem(10)
            break
        case 'NoteVideo':
            const randVideo = utilService.getRandomItems(videos)
            note.info.url = randVideo.videoUrl
            note.info.thumbnail = randVideo.thumbnail
            note.info.txt = utilService.makeLorem(10)
            break
        case 'NoteTodos':
            note.info.txt = utilService.makeLorem(6)
            note.info.todos = _createTodos(utilService.getRandomIntInclusive(1, 4))
            break
    }

    return note
}

function _createTodos(size) {
    const todos = []
    for (let i = 0; i < size; i++) {
        const msecInWeek = 7 * 24 * 60 * 60 * 1000
        const randomTime = utilService.getRandomIntInclusive(Date.now() - msecInWeek, Date.now())
        const todo = {
            txt: utilService.makeLorem(6),
            doneAt: (Math.random() > 0.7) ? randomTime : null,
            id: utilService.makeId(6)
        }
        todos.push(todo)
    }
    return todos
}
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

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
    { name: 'chalk', color: '#e9e3d4' }
]
const NOTE_KEY = 'noteDB'

_createNotes(10)

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
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

function getEmptyNote(type) {
    return {
        type,
        isPinned: false,
        info: { ..._getNoteInfo(type) },
        style: {
            backgroundColor: '#fff'
        }
    }
}

function _getNoteInfo(type) {
    switch (type) {
        case 'NoteTxt':
            return {
                txt: ''
            }
        case 'NoteImg':
            return {}
        case 'NoteVideo':
            return {}
        case 'NoteTodos':
            return {}
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
    const note = getEmptyNote('NoteTxt')

    note.isPinned = (Math.random() > 0.7)
    note.info.txt = utilService.makeLorem(10)
    note.style.backgroundColor = utilService.getRandomItems(BACKGROUND_COLORS)
    note.id = utilService.makeId(5)

    return note
}
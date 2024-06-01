const { useState, useEffect, useRef } = React
const { useOutletContext } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { reactUtilService } from "../../../services/react-util.service.js"

import { NoteMenu } from "./NoteMenu.jsx"
import { MenuBtnPin } from "./menu-buttons/MenuBtnPin.jsx"
import { MenuBtnReminder } from "./menu-buttons/MenuBtnReminder.jsx"
import { MenuBtnColorPalette } from "./menu-buttons/MenuBtnColorPalette.jsx"
import { MenuBtnAddImage } from "./menu-buttons/MenuBtnAddImage.jsx"
import { MenuBtnAddVideo } from "./menu-buttons/MenuBtnAddVideo.jsx"
import { MenuBtnAddTodos } from "./menu-buttons/MenuBtnAddTodos.jsx"
import { MenuBtnCustom } from "./menu-buttons/MenuBtnCustom.jsx"
import { TodosEdit } from "./TodosEdit.jsx"

export function NoteEdit({ note, onSetStyle, executeOnSubmit }) {

    const { newNotes, onAddNote, onSaveNote } = useOutletContext()
    const [noteToSave, setNoteToSave] = useState(note)
    const [isHovered, setIsHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(note.id !== 'new-note')
    const noteToSaveRef = useRef(noteToSave)
    const noteStyleRef = useRef({ backgroundColor: noteToSave.style.backgroundColor.color })
    const addNoteRef = useRef(null)
    const textareaRef = useRef(null)
    const addNoteBtnRef = useRef(null)

    useEffect(() => {
        adjustTextareaHeight()
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    useEffect(() => {
        noteToSaveRef.current = noteToSave
    }, [noteToSave])

    useEffect(() => {
        noteStyleRef.current = { backgroundColor: noteToSave.style.backgroundColor.color }
        if (onSetStyle) onSetStyle(noteStyleRef.current)
    }, [noteToSave.style])

    function handleClickOutside(ev) {
        if (addNoteRef.current && addNoteRef.current.contains(ev.target)) {
            return
        }

        if (!utilService.deepEqual(noteToSaveRef.current, note)) {
            noteToSaveRef.current = null
            addNoteBtnRef.current.click()
        }
        setIsFocused(false)
    }

    function setNote(note, newProps = {}) {
        setNoteToSave({ ...note, ...newProps })
    }

    function adjustTextareaHeight() {
        const textarea = textareaRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    function toggleAddNoteType(type) {
        if (noteToSave.type === type) {
            setNoteToSave({
                ...noteToSave,
                type: 'NoteTxt',
                info: { ...newNotes.current.NoteTxt.info, txt: noteToSave.info.txt }
            })
            return
        }
        setNoteToSave({
            ...noteToSave,
            type,
            info: { ...newNotes.current[type].info, txt: noteToSave.info.txt }
        })
    }

    function onSubmit(ev) {
        if (ev) ev.preventDefault()

        if (utilService.deepEqual(noteToSave, note)) {
            clearAndClose()
            return
        }

        if (noteToSave.id === 'new-note') {
            onAddNote(noteToSave)
        } else {
            onSaveNote(noteToSave)
        }
        clearAndClose()
    }

    function clearAndClose() {
        if (executeOnSubmit) executeOnSubmit()
        setIsFocused(false)
        setNoteToSave(note)
    }

    const menuBtnParams = {
        note: noteToSave,
        setNote: setNote,
        onToggleAddNoteType: toggleAddNoteType,
        customBtnClick: () => addNoteBtnRef.current.click(),
        customBtnTxt: 'Close'
    }

    return <div className="edit-note">
        <form onSubmit={onSubmit}>
            <button ref={addNoteBtnRef} type="submit" style={{ display: 'none' }}></button>
            <div ref={addNoteRef} className={`note ${isFocused ? ' open' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={noteStyleRef.current}
            >

                <input
                    className="big"
                    onChange={ev => reactUtilService.handleChange(ev, setNoteToSave)}
                    value={noteToSave.title}
                    name="title"
                    type="text"
                    placeholder="Title"
                    style={noteStyleRef.current}
                />
                <textarea
                    ref={textareaRef}
                    className="always-open"
                    onFocus={() => setIsFocused(true)}
                    onChange={ev => reactUtilService.handleChange(ev, setNoteToSave)}
                    onInput={adjustTextareaHeight}
                    value={noteToSave.info.txt}
                    name="info-txt"
                    type="text"
                    rows="1"
                    placeholder="Take a note..."
                    style={noteStyleRef.current}
                />
                {noteToSave.type === 'NoteImg' && <input
                    className="add-image"
                    onChange={ev => reactUtilService.handleChange(ev, setNoteToSave)}
                    value={noteToSave.info.url}
                    name="info-url"
                    type="text"
                    placeholder="Image url"
                    style={noteStyleRef.current}
                />}
                {noteToSave.type === 'NoteVideo' && <input
                    className="add-video-url"
                    onChange={ev => reactUtilService.handleChange(ev, setNoteToSave)}
                    value={noteToSave.info.url}
                    name="info-url"
                    type="text"
                    placeholder="Video url"
                    style={noteStyleRef.current}
                />}
                {noteToSave.type === 'NoteVideo' && <input
                    className="add-video-thumbnail"
                    onChange={ev => reactUtilService.handleChange(ev, setNoteToSave)}
                    value={noteToSave.info.thumbnail}
                    name="info-thumbnail"
                    type="text"
                    placeholder="Video thumbnail"
                    style={noteStyleRef.current}
                />}
                {noteToSave.type === 'NoteTodos' && <TodosEdit
                    noteToSave={noteToSave}
                    onSetNoteToSave={setNote}
                    inputStyle={noteStyleRef.current}
                />}
                <NoteMenu
                    isHovered={isHovered}
                    note={noteToSave}
                >
                    <MenuBtnPin btnParams={menuBtnParams} classes={['pin-btn', 'top-right-btn']} />
                    <MenuBtnReminder btnParams={menuBtnParams} classes={['reminder-btn']} />
                    <MenuBtnColorPalette btnParams={menuBtnParams} classes={['color-palette-btn']} />
                    <MenuBtnAddImage btnParams={menuBtnParams} classes={['add-image-btn']} />
                    <MenuBtnAddVideo btnParams={menuBtnParams} classes={['add-video-btn']} />
                    <MenuBtnAddTodos btnParams={menuBtnParams} classes={['add-todo-btn']} />
                    <MenuBtnCustom btnParams={menuBtnParams} classes={['btn', 'new-note-btn']} />
                </NoteMenu>


            </div>
        </form>
    </div>
}
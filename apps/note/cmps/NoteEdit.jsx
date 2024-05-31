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
import { MenuBtnAddTodo } from "./menu-buttons/MenuBtnAddTodo.jsx"
import { MenuBtnCustom } from "./menu-buttons/MenuBtnCustom.jsx"

export function NoteEdit() {

    const { newNotes, onAddNote } = useOutletContext()
    const [newNoteToSave, setNewNoteToSave] = useState({ ...newNotes.current.NoteTxt, id: 'new-note' })
    const [isHovered, setIsHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const newNoteToSaveRef = useRef(newNoteToSave)
    const addNoteRef = useRef(null)
    const textareaRef = useRef(null)
    const addNoteBtnRef = useRef(null)

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    useEffect(() => {
        newNoteToSaveRef.current = newNoteToSave
    }, [newNoteToSave])

    function handleClickOutside(ev) {
        if (addNoteRef.current && addNoteRef.current.contains(ev.target)) {
            return
        }

        const cleanNote = { ...newNotes.current.NoteTxt, id: 'new-note' }

        if (!utilService.deepEqual(newNoteToSaveRef.current, cleanNote)) {
            newNoteToSaveRef.current = null
            addNoteBtnRef.current.click()
        }
        setIsFocused(false)
    }

    function setNewNote(note, newProps) {
        setNewNoteToSave({ ...note, ...newProps })
    }

    function adjustTextareaHeight() {
        const textarea = textareaRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    function toggleAddNoteType(type) {
        if (newNoteToSave.type === type) {
            setNewNoteToSave({
                ...newNoteToSave,
                type: 'NoteTxt',
                info: { ...newNotes.current.NoteTxt.info, txt: newNoteToSave.info.txt }
            })
            return
        }
        setNewNoteToSave({
            ...newNoteToSave,
            type,
            info: { ...newNotes.current[type].info, txt: newNoteToSave.info.txt }
        })
    }

    function onSubmit(ev) {
        if (ev) ev.preventDefault()
        onAddNote(newNoteToSave)
        setNewNoteToSave({ ...newNotes.current.NoteTxt, id: 'new-note' })
        setIsFocused(false)
    }

    const noteStyle = { backgroundColor: newNoteToSave.style.backgroundColor.color }

    const menuBtnParams = {
        note: newNoteToSave,
        setNote: setNewNote,
        onToggleAddNoteType: toggleAddNoteType,
        customBtnClick: () => addNoteBtnRef.current.click(),
        customBtnTxt: 'Close'
    }

    return <div className="add-note">
        <form onSubmit={onSubmit}>
            <button ref={addNoteBtnRef} type="submit" style={{ display: 'none' }}></button>
            <div ref={addNoteRef} className={`note outline-box1${isFocused ? ' open' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={noteStyle}
            >

                <input
                    className="big"
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    value={newNoteToSave.title}
                    name="title"
                    type="text"
                    placeholder="Title"
                />
                <textarea
                    ref={textareaRef}
                    className="always-open"
                    onFocus={() => setIsFocused(true)}
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    onInput={adjustTextareaHeight}
                    value={newNoteToSave.info.txt}
                    name="info-txt"
                    type="text"
                    rows="1"
                    placeholder="Take a note..."
                />
                {newNoteToSave.type === 'NoteImg' && <input
                    className="add-image"
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    value={newNoteToSave.info.url}
                    name="info-url"
                    type="text"
                    placeholder="Image url"
                />}
                {newNoteToSave.type === 'NoteVideo' && <input
                    className="add-video-url"
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    value={newNoteToSave.info.url}
                    name="info-url"
                    type="text"
                    placeholder="Video url"
                />}
                {newNoteToSave.type === 'NoteVideo' && <input
                    className="add-video-thumbnail"
                    onChange={ev => reactUtilService.handleChange(ev, setNewNoteToSave)}
                    value={newNoteToSave.info.thumbnail}
                    name="info-thumbnail"
                    type="text"
                    placeholder="Video thumbnail"
                />}
                <NoteMenu
                    isHovered={isHovered}
                    note={newNoteToSave}
                >
                    <MenuBtnPin btnParams={menuBtnParams} classes={['pin-btn', 'top-right-btn']} />
                    <MenuBtnReminder btnParams={menuBtnParams} classes={['reminder-btn']} />
                    <MenuBtnColorPalette btnParams={menuBtnParams} classes={['color-palette-btn']} />
                    <MenuBtnAddImage btnParams={menuBtnParams} classes={['add-image-btn']} />
                    <MenuBtnAddVideo btnParams={menuBtnParams} classes={['add-video-btn']} />
                    <MenuBtnAddTodo btnParams={menuBtnParams} classes={['add-todo-btn']} />
                    <MenuBtnCustom btnParams={menuBtnParams} classes={['btn', 'new-note-btn']} />
                </NoteMenu>


            </div>
        </form>
    </div>
}
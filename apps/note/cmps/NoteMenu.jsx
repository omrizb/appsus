const { useState, useEffect, Children, cloneElement } = React
const { useOutletContext } = ReactRouterDOM

export function NoteMenu({ children, isHovered, note }) {

    const { activeElement } = useOutletContext()
    const [selectedMenuButtons, setSelectedMenuButtons] = useState({
        pin: note.isPinned,
        image: note.type === 'NoteImg'
    })
    const [openSideMenus, setOpenSideMenus] = useState({
        palette: activeElement.noteId === note.id && activeElement.item === 'palette',
        moreOptions: activeElement.noteId === note.id && activeElement.item === 'more-options'
    })
    const isHidden = !(isHovered || openSideMenus.palette || openSideMenus.moreOptions)

    useEffect(() => {
        setOpenSideMenus({
            palette: activeElement.noteId === note.id && activeElement.item === 'palette',
            moreOptions: activeElement.noteId === note.id && activeElement.item === 'more-options'
        })
    }, [activeElement])

    useEffect(() => {
        setSelectedMenuButtons({
            pin: note.isPinned,
            image: note.type === 'NoteImg'
        })
    }, [note])

    function setSelectedMenuButton(btnName, value) {
        setSelectedMenuButtons({ ...selectedMenuButtons, [btnName]: value })
    }

    return <div className={`note-menu${isHidden ? ' hide' : ''}`} onClick={ev => ev.stopPropagation()}>
        {Children.map(children, (child) => (
            cloneElement(child, { selectedMenuButtons, setSelectedMenuButton, openSideMenus })
        ))}
    </div>
}
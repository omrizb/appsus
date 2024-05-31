const { useOutletContext } = ReactRouterDOM

import { ColorPalette } from "./ColorPalette.jsx"

export function MenuBtnColorPalette({ btnParams, classes, openSideMenus }) {

    const { onElementToggle } = useOutletContext()

    return <div
        className={`${classes.join(' ')}${openSideMenus.palette ? ' active' : ''}`}
        onClick={() => onElementToggle(btnParams.note.id, 'palette')}
    >
        <div className="fa-solid i-color-palette"></div>
        {openSideMenus.palette && <ColorPalette note={btnParams.note} setNote={btnParams.setNote} />}
    </div>
}
const { useOutletContext } = ReactRouterDOM

import { MoreNoteOptions } from "./MoreNoteOptions.jsx"

export function MenuBtnMoreOptions({ btnParams, classes, openSideMenus }) {

    const { onElementToggle, onSendToTrash } = useOutletContext()

    return <div className={`${classes.join(' ')}${openSideMenus.moreOptions ? ' active' : ''}`}
        onClick={() => onElementToggle(btnParams.note.id, 'more-options')}
    >
        <div className="fa-solid i-more"></div>
        {openSideMenus.moreOptions && <MoreNoteOptions noteId={btnParams.note.id} onSendToTrash={onSendToTrash} />}
    </div>
}
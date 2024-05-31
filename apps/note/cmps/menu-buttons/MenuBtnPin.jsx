export function MenuBtnPin({ btnParams, classes, selectedMenuButtons }) {

    function handlePinBtnClick() {
        btnParams.setNote(btnParams.note, { isPinned: !btnParams.note.isPinned })
    }

    return <div
        className={`${classes.join(' ')}${selectedMenuButtons.pin ? ' selected' : ''}`}
        onClick={handlePinBtnClick}
    >
        <div className="fa-solid i-pin"></div>
    </div>
}
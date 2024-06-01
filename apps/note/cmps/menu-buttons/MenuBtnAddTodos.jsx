export function MenuBtnAddTodos({ btnParams, classes, selectedMenuButtons, setSelectedMenuButton }) {

    function handleTodoBtnClick() {
        setSelectedMenuButton({ ...selectedMenuButtons, todo: !selectedMenuButtons.todo })
        btnParams.onToggleAddNoteType('NoteTodos')
    }

    return <div
        className={`${classes.join(' ')}${selectedMenuButtons.todo ? ' selected' : ''}`}
        onClick={handleTodoBtnClick}
    >
        <div className="fa-solid i-todo"></div>
    </div>
}
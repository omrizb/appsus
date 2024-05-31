export function MenuBtnAddTodo({ btnParams, classes, selectedMenuButtons, setSelectedMenuButton }) {

    function handleTodoBtnClick() {
        setSelectedMenuButton({ ...selectedMenuButtons, todo: !selectedMenuButtons.todo })
        btnParams.onToggleAddTodo()
    }

    return <div
        className={`${classes.join(' ')}${selectedMenuButtons.todo ? ' selected' : ''}`}
        onClick={handleTodoBtnClick}
    >
        <div className="fa-solid i-todo"></div>
    </div>
}
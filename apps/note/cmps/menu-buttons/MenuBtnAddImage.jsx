export function MenuBtnAddImage({ btnParams, classes, selectedMenuButtons, setSelectedMenuButton }) {

    function handleImageBtnClick() {
        setSelectedMenuButton({ ...selectedMenuButtons, image: !selectedMenuButtons.image })
        btnParams.onToggleAddImage()
    }

    return <div
        className={`${classes.join(' ')}${selectedMenuButtons.image ? ' selected' : ''}`}
        onClick={handleImageBtnClick}
    >
        <div className="fa-solid i-image"></div>
    </div>
}
export function MenuBtnAddImage({ btnParams, classes, selectedMenuButtons, setSelectedMenuButton }) {

    function handleImageBtnClick() {
        setSelectedMenuButton({ ...selectedMenuButtons, isImage: !selectedMenuButtons.isImage })
        btnParams.onToggleAddImage()
    }

    return <div
        className={`${classes.join(' ')}${selectedMenuButtons.isImage ? ' selected' : ''}`}
        onClick={handleImageBtnClick}
    >
        <div className="fa-solid i-image"></div>
    </div>
}
export function MenuBtnAddVideo({ btnParams, classes, selectedMenuButtons, setSelectedMenuButton }) {

    function handleVideoBtnClick() {
        setSelectedMenuButton({ ...selectedMenuButtons, video: !selectedMenuButtons.video })
        btnParams.onToggleAddVideo()
    }

    return <div
        className={`${classes.join(' ')}${selectedMenuButtons.video ? ' selected' : ''}`}
        onClick={handleVideoBtnClick}
    >
        <div className="fa-solid i-video"></div>
    </div>
}
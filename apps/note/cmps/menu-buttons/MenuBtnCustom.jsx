export function MenuBtnCustom({ btnParams, classes }) {

    return <button
        className={`${classes.join(' ')}`}
        onClick={btnParams.customBtnClick}
        type="button">
        {btnParams.customBtnTxt}
    </button>
}
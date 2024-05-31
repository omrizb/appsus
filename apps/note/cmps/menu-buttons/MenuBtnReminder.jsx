export function MenuBtnReminder({ btnParams, classes, selectedMenuButtons }) {
    function handleReminderBtnClick() {
        console.log('Reminder button click!')
    }

    return <div
        className={`${classes.join(' ')}`}
        onClick={handleReminderBtnClick}
    >
        <div className="fa-solid i-bell"></div>
    </div>
}
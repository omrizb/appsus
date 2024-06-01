const { NavLink } = ReactRouterDOM

export function NoteSideNav() {
    return <section className="note-side-nav">
        <NavLink to={'notes'}>
            <span className="fa-solid i-lightbulb"></span>
            <span className="link">Notes</span>
        </NavLink>
        <NavLink to={'reminders'}>
            <span className="fa-solid i-bell"></span>
            <span className="link">Reminders</span>
        </NavLink>
        <NavLink to={'edit-labels'}>
            <span className="fa-solid i-pencil"></span>
            <span className="link">Edit Labels</span>
        </NavLink>
        <NavLink to={'archive'}>
            <span className="fa-solid i-archive"></span>
            <span className="link">Archive</span>
        </NavLink>
        <NavLink to={'trash'}>
            <span className="fa-solid i-trash"></span>
            <span className="link">Trash</span>
        </NavLink>
    </section>
}
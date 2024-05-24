const { NavLink } = ReactRouterDOM

export function NoteSideNav() {
    return <section className="note-side-nav">
        <NavLink to={'notes'}><span className="fa-solid i-lightbulb"></span>Notes</NavLink>
        <NavLink to={'reminders'}><span className="fa-solid i-bell"></span>Reminders</NavLink>
        <NavLink to={'edit-labels'}><span className="fa-solid i-pencil"></span>Edit Labels</NavLink>
        <NavLink to={'archive'}><span className="fa-solid i-archive"></span>Archive</NavLink>
        <NavLink to={'trash'}><span className="fa-solid i-trash"></span>Trash</NavLink>
    </section>
}
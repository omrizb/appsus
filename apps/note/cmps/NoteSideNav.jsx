const { Link } = ReactRouterDOM

export function NoteSideNav() {
    return <section className="note-side-nav">
        <Link to={''}>Notes</Link>
        <Link to={'reminders'}>Reminders</Link>
        <Link to={'edit-labels'}>Edit Labels</Link>
        <Link to={'archive'}>Archive</Link>
        <Link to={'trash'}>Trash</Link>
    </section>
}
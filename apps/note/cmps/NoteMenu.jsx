const { Link } = ReactRouterDOM

export function NoteMenu() {
    return <div className="note-menu">
        <Link to={''}><div className="fa-solid bell"></div></Link>
        <Link to={''}><div className="fa-solid color-palette"></div></Link>
        <Link to={''}><div className="fa-solid image"></div></Link>
        <Link to={''}><div className="fa-solid archive"></div></Link>
        <Link to={''}><div className="fa-solid more"></div></Link>
    </div>
}
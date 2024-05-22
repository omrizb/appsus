const { Link } = ReactRouterDOM

export function MailFolderList({ onFolderClick }) {
    const folders = ['inbox', 'sent', 'drafts', 'trash']

    return (
        <section className="mail-folder-list">
            <ul>
                {folders.map(folder =>
                    <li key={folder}>
                        <Link to="#" onClick={() => onFolderClick(folder)}>
                            <span className="folder-name">{folder.charAt(0).toUpperCase() + folder.slice(1)}</span>
                        </Link>
                    </li>)
                }
            </ul>
        </section>
    )
}


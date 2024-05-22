const { Link } = ReactRouterDOM

export function MailFolderList({ onFolderClick, unreadCounts }) {
    const folders = ['inbox', 'sent', 'drafts', 'trash']

    return (
        <section className="mail-folder-list">
            <ul>
                {folders.map(folder =>
                    <li key={folder}>
                        <Link to="#" onClick={() => onFolderClick(folder)}>
                            <span className="folder-name">{folder.charAt(0).toUpperCase() + folder.slice(1)}
                                {unreadCounts[folder] > 0 && (
                                    <span className="unread-count"> ({unreadCounts[folder]})</span>
                                )}
                            </span>
                        </Link>
                    </li>)
                }
            </ul>
        </section>
    )
}


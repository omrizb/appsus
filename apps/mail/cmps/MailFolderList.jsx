const { Link } = ReactRouterDOM

export function MailFolderList({ onFolderClick, unreadCounts, activeFolder }) {
    const folders = ['inbox', 'sent', 'drafts', 'trash']

    return (
        <section className="mail-folder-list">
            <ul>
                {folders.map(folder => (
                    <Link key={folder} to="#" onClick={() => onFolderClick(folder)}>
                        <li className={`${activeFolder === folder ? 'active-folder' : ''}`}>
                            <span className="folder-name">{folder.charAt(0).toUpperCase() + folder.slice(1)}</span>
                            {unreadCounts[folder] > 0 && (
                                <span className="unread-count">({unreadCounts[folder]})</span>
                            )}
                        </li>
                    </Link>
                ))}
            </ul>
        </section >
    )
}


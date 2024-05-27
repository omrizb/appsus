const { Link } = ReactRouterDOM

export function MailFolderList({ onFolderClick, unreadCounts, activeFolder }) {
    const folders = ['inbox', 'starred', 'sent', 'draft', 'trash']

    return (
        <section className="mail-folder-list">
            <ul>
                {folders.map(folder => (
                    <Link key={folder} to="#" onClick={() => onFolderClick(folder)}>
                        <li className={`${activeFolder === folder ? 'active-folder' : ''}`}>
                            <label className={folder === 'inbox' ? `fa-solid i-${folder}` : `fa-regular i-${folder}`}></label>
                            <div className="folder-info">
                                <span>
                                    {folder.charAt(0).toUpperCase() + folder.slice(1)}
                                </span>
                                {unreadCounts[folder] > 0 && (
                                    <span className="unread-count">({unreadCounts[folder]})</span>
                                )}
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </section >
    )
}


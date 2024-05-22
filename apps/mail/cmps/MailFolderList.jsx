export function MailFolderList({ onSetFilterBy }) {
    const folders = ['inbox', 'sent', 'drafts', 'trash']

    const handleFolderClick = (folder) => {
        onSetFilterBy({ folder, txt: '', isRead: '', isStarred: '' })
    }

    return (
        <section className="mail-folder-list">
            <ul>
                {folders.map(folder =>
                    <li key={folder}>
                        <div className="folder-item" onClick={() => handleFolderClick(folder)}>
                            <span className="folder-name">{folder.charAt(0).toUpperCase() + folder.slice(1)}</span>
                        </div>
                    </li>)
                }
            </ul>
        </section>
    )
}
export function MailFolderList() {
    const folders = ['inbox', 'sent', 'drafts', 'trash']
    return (
        <section className="mail-folder-list">
            <ul>
                {folders.map(folder =>
                    <li key={folder}>
                        <div className="folder-item">
                            <span className="folder-name">{folder.charAt(0).toUpperCase() + folder.slice(1)}</span>
                        </div>
                    </li>)
                }
            </ul>
        </section>
    )
}
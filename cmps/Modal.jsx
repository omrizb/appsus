export function Modal({ children, closeModal }) {

    return (<div className="modal">
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={ev => ev.stopPropagation}>
                {children}
                <button className="modal-close-btn" onClick={closeModal}>x</button>
            </div>
        </div>
    </div>)
}
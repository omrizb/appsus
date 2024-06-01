export function Modal({ children, closeModal }) {

    return (<div className="modal">
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={ev => ev.stopPropagation()}>
                {children}
            </div>
        </div>
    </div>)
}
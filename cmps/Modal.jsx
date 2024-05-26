const { useState, useEffect } = React

import { eventBusService } from "../services/event-bus.service.js"

export function Modal() {

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-modal', () => {
            setShowModal(true)
        })
        return unsubscribe
    }, [])

    function closeModal() {
        setShowModal(false)
    }

    if (!showModal) return <div className="modal"></div>
    return (<div className="modal">
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={ev => ev.stopPropagation}>
                <h1>HELLO!!!!</h1>
                <button className="btn" onClick={closeModal}>Close</button>
            </div>
        </div>
    </div>)
}
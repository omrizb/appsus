const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function mailCompose() {

    const [mail, setMail] = useState(mailService.getEmptyMail())

    const navigate = useNavigate()

    useEffect(() => {
        if (!params.mailId) return
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
    }, [])

    function onSave(ev) {
        ev.preventDefault()
        mailService.save(mail)
            .then(() => navigate('/mail'))
            .catch(() => {
                showErrorMsg('Couldnt save')
                navigate('/mail')
            })
    }

    return (
        <section className="mail-edit">
            <h1>{params.mailId ? 'Edit mail' : 'Add mail'}</h1>

            <form onSubmit={onSave}>
                <label htmlFor="vendor">Vendor</label>
                <input
                    onChange={handleChange} value={mail.vendor}
                    id="vendor" name="vendor"
                    type="text" placeholder="vendor" />

                <label htmlFor="maxSpeed">Speed</label>
                <input
                    onChange={handleChange} value={mail.maxSpeed}
                    id="maxSpeed" name="maxSpeed"
                    type="number" placeholder="speed" />

                <button>Save</button>
            </form>
        </section>
    )
}
const { Route, Routes, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"
import { MailCompose } from "./apps/mail/views/MailCompose.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { Notes } from "./apps/note/views/Notes.jsx"
import { Reminders } from "./apps/note/views/Reminders.jsx"
import { LabelEdit } from "./apps/note/views/LabelEdit.jsx"
import { Archive } from "./apps/note/views/Archive.jsx"
import { Trash } from "./apps/note/views/Trash.jsx"


export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/mail/compose/" element={<MailCompose />} />
                <Route path="/mail/compose/:mailId" element={<MailCompose />} />
                <Route path="/note" element={<NoteIndex />}>
                    <Route path="" element={<Navigate to="notes" />} />
                    <Route path="notes" element={<Notes />} />
                    <Route path="notes/:noteId" element={<Notes />} />
                    <Route path="reminders" element={<Reminders />} />
                    <Route path="edit-labels" element={<LabelEdit />} />
                    <Route path="archive" element={<Archive />} />
                    <Route path="Trash" element={<Trash />} />
                </Route>
            </Routes>
            <UserMsg />
        </section>
    </Router>
}

import { NoteTxt } from "./note-preview-types/NoteTxt.jsx"
import { NoteImg } from "./note-preview-types/NoteImg.jsx"
import { NoteTodos } from "./note-preview-types/NoteTodos.jsx"
import { NoteVideo } from "./note-preview-types/NoteVideo.jsx"

export function NotePreview({ note }) {
    return <div className="note-preview">
        <NoteType note={note} isPreview={true} />
    </div>
}

function NoteType(props) {
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
    }

}
import { ShortTxt } from "../../../../cmps/ShortTxt.jsx"

export function NoteTxt({ note, isPreview = false }) {

    if (isPreview) {
        return <div className="text-note-preview">
            <h2><ShortTxt txt={note.title} length={30} /></h2>
            <p><ShortTxt txt={note.info.txt} length={100} /></p>
        </div>
    }

    return <div className="text-note-details">
        <h2>{note.title}</h2>
        <p>{note.info.txt}</p>
    </div>
}
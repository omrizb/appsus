import { ShortTxt } from "../../../../cmps/ShortTxt.jsx"

export function NoteImg({ note }) {

    return <div className="image-note-preview">
        <img src={note.info.url} />
        <h2><ShortTxt txt={note.title} length={30} /></h2>
        <ShortTxt txt={note.info.txt} length={100} />
    </div>
}
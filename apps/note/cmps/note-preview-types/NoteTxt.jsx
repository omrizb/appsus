import { ShortTxt } from "../../../../cmps/ShortTxt.jsx"

export function NoteTxt({ note }) {

    return <div className="text-note-preview">
        <h2><ShortTxt txt={note.title} length={30} /></h2>
        <ShortTxt txt={note.info.txt} length={100} />
    </div>
}
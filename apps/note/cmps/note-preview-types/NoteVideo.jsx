import { ShortTxt } from "../../../../cmps/ShortTxt.jsx"

export function NoteVideo({ note }) {

    return <div className="video-note-preview">
        <div className="thumbnail-container">
            <img src="/omrizb/appsus/blob/master/assets/img/play-video.svg" className="thumbnail" />
            {(note.info.thumbnail)
                ? <img src={note.info.thumbnail} />
                : <div className="no-video-thumbnail"></div>}
        </div>
        <h2><ShortTxt txt={note.title} length={30} /></h2>
        <ShortTxt txt={note.info.txt} length={100} />
    </div>
}
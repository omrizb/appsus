import { ShortTxt } from "../../../../cmps/ShortTxt.jsx"

export function NoteVideo({ note, isPreview = false }) {

    if (isPreview) {
        return <div className="video-note-preview">
            <div className="thumbnail-container">
                <img src="../../../../assets/img/play-video.svg" className="thumbnail" />
                <img src={note.info.thumbnail} />
            </div>
            <h2><ShortTxt txt={note.title} length={30} /></h2>
            <p><ShortTxt txt={note.info.txt} length={100} /></p>
        </div>
    }

    return <div className="video-note-details">
        <img src={note.info.url} />
        <h2>{note.title}</h2>
        <p>{note.info.txt}</p>
    </div>
}
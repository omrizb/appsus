export function ShortTxt({ txt, length = 100 }) {

    if (txt.length > length) {
        txt = txt.substring(0, length) + '...'
    }
    const lines = txt.split('\n')

    return <React.Fragment>
        {lines.map((line, index) => <p key={index}>{line}</p>)}
    </React.Fragment>
}
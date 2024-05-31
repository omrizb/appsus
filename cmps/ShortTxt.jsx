export function ShortTxt({ txt, length = 100 }) {

    return (txt.length <= length)
        ? <React.Fragment>{txt}</React.Fragment>
        : <React.Fragment>{txt.substring(0, length) + '...'}</React.Fragment>
}
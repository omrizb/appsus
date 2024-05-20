const { useState } = React

export function LongTxt({ txt, length = 100 }) {

    if (txt.length <= length) return <div className="long-text-display">{txt}</div>

    const shortTxt = txt.substring(0, length) + '...'
    const [displayShortTxt, setDisplayShortTxt] = useState(true)

    function toggleDisplayShortTxt() {
        setDisplayShortTxt(prevState => !prevState)
    }

    function readMoreOrLess() {
        return (displayShortTxt) ? 'Read more' : 'Read less'
    }

    return <div className="long-text-display">
        {(displayShortTxt) ? shortTxt : txt}
        <span onClick={toggleDisplayShortTxt} className="more-or-less"> {readMoreOrLess()}</span>
    </div>

}
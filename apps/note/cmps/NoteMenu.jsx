const { useState } = React
const { Link } = ReactRouterDOM

import { ColorPalette } from "./ColorPalette.jsx"

export function NoteMenu({ menuClasses, isMenuOpen }) {

    const [showPalette, setShowPalette] = useState(false)

    function handleColorPaletteClick() {
        setShowPalette(prev => {
            isMenuOpen.current = !prev
            return !prev
        })
    }

    return <div className={`note-menu ${menuClasses.join(' ')}`}>

        <div className="pin-btn"><div className="fa-solid i-pin"></div></div>

        <Link to={''}><div className="fa-solid i-bell"></div></Link>

        <div onClick={handleColorPaletteClick} className="color-palette-btn">
            <div className="fa-solid i-color-palette"></div>
            {showPalette && <ColorPalette />}
        </div>

        <Link to={''}><div className="fa-solid i-image"></div></Link>

        <Link to={''}><div className="fa-solid i-archive"></div></Link>

        <Link to={''}><div className="fa-solid i-more"></div></Link>

    </div>
}
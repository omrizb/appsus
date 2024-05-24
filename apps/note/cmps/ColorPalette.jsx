const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function ColorPalette() {

    const colors = noteService.getBackgroundColors()

    const positionStyle = { top: '25px', left: '-20px' }

    function handleMouseEnter({ target }) {
        target.style.border = '2px solid var(--clr-border-dark)'
    }

    function handleMouseLeave({ target }) {
        const originalBorder = target.getAttribute('data-original-border')
        target.style.border = `2px solid ${originalBorder}`
    }

    return <div className="color-palette outline-box" style={positionStyle}>
        {colors.map(color => {
            const borderColor = (color.name === 'none') ? 'var(--clr-border-light)' : color.color
            const colorStyle = {
                backgroundColor: color.color,
                border: `2px solid ${borderColor}`
            }
            return <div
                key={color.name}
                style={colorStyle}
                data-original-border={borderColor}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            ></div>
        })}
    </div>
}
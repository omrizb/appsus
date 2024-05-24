const { useState, useEffect } = React

import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"

export function ColorPalette({ setNoteColor }) {

    const colors = noteService.getBackgroundColors()

    const positionStyle = { top: '25px', left: '-20px' }

    function handleMouseEnter({ target }) {
        target.style.border = '2px solid var(--clr-border-dark)'
    }

    function handleMouseLeave({ target }) {
        const originalBorder = target.getAttribute('data-original-border')
        target.style.border = `2px solid ${originalBorder}`
    }

    function handleColorClick({ target }) {
        const color = {
            name: target.getAttribute('data-color-name'),
            color: utilService.rgbToHex(target.style.backgroundColor)
        }
        setNoteColor(color)
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
                data-color-name={color.name}
                data-original-border={borderColor}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleColorClick}
            ></div>
        })}
    </div>
}
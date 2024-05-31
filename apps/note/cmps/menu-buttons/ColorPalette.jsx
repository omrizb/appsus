import { utilService } from "../../../../services/util.service.js"
import { noteService } from "../../services/note.service.js"

export function ColorPalette({ note, setNote }) {

    const colors = noteService.getBackgroundColors()

    const positionStyle = { top: '25px', left: '-150px' }

    function handleMouseEnter({ target }) {
        target.style.border = '2px solid var(--gray-8)'
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
        setNote(note, { style: { backgroundColor: color } })
    }

    return <div className="color-palette outline-box1" style={positionStyle}>
        {colors.map(color => {
            const borderColor = (color.name === 'none') ? 'var(--gray-4)' : color.color
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
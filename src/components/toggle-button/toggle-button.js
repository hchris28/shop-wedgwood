import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as toggleButtonStyles from './toggle-button.module.scss'

const TOGGLE_OFF = false
const TOGGLE_ON = true

const ToggleButton = ({ icon, iconSize, text, initialState = false, onClick = () => {} }) => {

    const [toggleState, setToggleState] = useState(initialState);

    const handleClick = (e) => {
        if (toggleState === TOGGLE_OFF) {
            setToggleState(TOGGLE_ON)
            onClick(TOGGLE_ON)
        } else {
            setToggleState(TOGGLE_OFF)
            onClick(TOGGLE_OFF)
        }
    }

    return (
        <button
            type='button'
            className={`${toggleButtonStyles.button} ${toggleState ? toggleButtonStyles.buttonOn : toggleButtonStyles.buttonOff }`}
            onClick={handleClick}>
            {
                icon &&
                <FontAwesomeIcon 
                    icon={icon} 
                    size={iconSize} 
                    className={toggleButtonStyles.icon} />
            }
            <span>{text}</span>
        </button>
    )
}

export default ToggleButton
export { TOGGLE_ON, TOGGLE_OFF }
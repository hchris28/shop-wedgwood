import React, { useState } from 'react'

import * as menuButtonStyles from './menu-button.module.scss' 

import MenuIcon from '../icons/menu'
import ArrowRightIcon from '../icons/arrow-right'

const MENU_BUTTON_STATE_CLOSED = 0
const MENU_BUTTON_STATE_ACTIVE = 1

const MenuButton = ({ className, onClick = () => {} }) => {

    const [buttonState, setButtonState] = useState(MENU_BUTTON_STATE_CLOSED)

    const handleMenuButtonClick = () => {
        if (buttonState === MENU_BUTTON_STATE_CLOSED) {
            setButtonState(MENU_BUTTON_STATE_ACTIVE)
            onClick(MENU_BUTTON_STATE_ACTIVE)
        } else {
            setButtonState(MENU_BUTTON_STATE_CLOSED)
            onClick(MENU_BUTTON_STATE_CLOSED)
        }
    }

    return (
        <button
            className={`${menuButtonStyles.button} ${className}`}
            onClick={handleMenuButtonClick}>
            {
                buttonState === MENU_BUTTON_STATE_CLOSED
                    ? <MenuIcon />
                    : <ArrowRightIcon />
            }
            
        </button>
    )
}

export default MenuButton
export { MENU_BUTTON_STATE_CLOSED, MENU_BUTTON_STATE_ACTIVE }
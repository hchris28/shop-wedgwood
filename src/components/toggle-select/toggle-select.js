import React, { useState, useEffect } from 'react'

import * as toggleSelectStyles from './toggle-select.module.scss'

const ToggleSelect = ({ storageKey, buttons, initialValue, onClick = () => { } }) => {

    const [activeValue, setActiveValue] = useState(initialValue)

    const handleClick = (value) => {
        setActiveValue(value)
        onClick(value)
    }

    const localStorageKeyValueKey = 'toggle-select-value-' + storageKey

    useEffect(() => {
        const storedActiveValue = localStorage.getItem(localStorageKeyValueKey) || initialValue
        setActiveValue(storedActiveValue)
        onClick(storedActiveValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem(localStorageKeyValueKey, activeValue)
    }, [activeValue, localStorageKeyValueKey])

    return (
        <div>
            {
                buttons.map(({ icon, text, value }) => {
                    return (
                        <button
                            key={value}
                            type='button'
                            className={`${toggleSelectStyles.button} ${value === activeValue ? toggleSelectStyles.buttonOn : toggleSelectStyles.buttonOff}`}
                            onClick={() => handleClick(value)}>
                            {icon}
                            <span>{text}</span>
                        </button>
                    )
                })
            }
        </div>
    )
}

export default ToggleSelect
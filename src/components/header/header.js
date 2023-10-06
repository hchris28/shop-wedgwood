import React, { useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"

import Menu from '../menu/menu'
import MenuButton, { MENU_BUTTON_STATE_ACTIVE } from '../menu-button/menu-button'

import * as headerStyles from './header.module.scss'

const MENU_STATE_CLOSED = 0
const MENU_STATE_ACTIVE = 1

const Header = (props) => {

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    const [menuState, setMenuState] = useState(MENU_STATE_CLOSED)

    const handleMenuButtonClick = (menuButtonState) => {
        if (menuButtonState === MENU_BUTTON_STATE_ACTIVE) {
            setMenuState(MENU_STATE_ACTIVE)
        } else {
            setMenuState(MENU_STATE_CLOSED)
        }
    }

    return (
        <header className={headerStyles.container}>
            <div className={headerStyles.content}>
                <Link to="/">
                    <div className={headerStyles.siteTitle}>
                        <StaticImage className={headerStyles.logo} src="./trees.png" alt="Shop Wedgwood logo" height={75} />
                        {data.site.siteMetadata.title}
                    </div>
                </Link>
                <div className={`${headerStyles.menuContainer} ${menuState === MENU_STATE_CLOSED ? headerStyles.menuCollapsed : ''}`}>
                    <MenuButton className={headerStyles.menuToggle} onClick={handleMenuButtonClick} />
                    <Menu />
                </div>
            </div>
        </header>
    )
}

export default Header
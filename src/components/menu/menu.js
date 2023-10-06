import React from 'react'
import { Link } from 'gatsby'

const Menu = ({ className }) => {
    return (
        <nav className={className}>
            <Link to="/directory/eat-drink">Eat/Drink</Link>
            <Link to="/directory/shop">Shop</Link>
            <Link to="/directory/services">Services</Link>
            <Link to="/directory/search">Search</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </nav>

    )
}

export default Menu
import React from 'react'

import * as footerStyles from './footer.module.scss'

const Footer = (props) => {
    return (
        <footer className={footerStyles.container}>
            <div className={footerStyles.content}>
                Powered by the <a href="http://www.wedgwoodcc.org" target="_blank" rel="noreferrer">Wedgwood Community Council</a>
            </div>
        </footer>
    )
}

export default Footer
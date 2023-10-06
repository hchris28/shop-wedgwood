import React, { Children } from 'react'
import { Helmet } from 'react-helmet'

import Header from '../header/header'
import Footer from '../footer/footer'

import '..//../styles/base.scss'
import * as layoutStyles from './layout.module.scss'

const Layout = (props) => {
    return (
        <div className={layoutStyles.container}>
            <Helmet>
                <title>Shop Wedgwood</title>
                <meta name="description" content="Shop Wedgwood - A neighborhood in NE Seattle" />
            </Helmet>
            <Header />
            {
                props.hero &&
                <div className={[layoutStyles.hero, props.heroClass].join(' ')}>
                    {props.hero}
                </div>
            }
            {
                Children.toArray(props.children).length > 0 &&
                <main className={layoutStyles.content}>
                    {props.children}
                </main>
            }
            <Footer />
        </div>
    )
}

export default Layout
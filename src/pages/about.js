import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout/layout'
import AboutContent from '../components/about-content/about-content'

const AboutPage = () => {
    return (
        <Layout>
            <Helmet>
                <title>About Shop Wedgwood!</title>
            </Helmet>
            <AboutContent />
        </Layout>
    )
}

export default AboutPage

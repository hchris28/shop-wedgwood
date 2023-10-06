import React from 'react'

import Layout from '../components/layout/layout'
import HomeHero from '../components/home-hero/home-hero'
// import HomeContent from '../components/home-content/home-content'

const IndexPage = () => {
    return (
        <Layout hero={<HomeHero />}>
            {/* <HomeContent /> */}
        </Layout>
    )
}

export default IndexPage

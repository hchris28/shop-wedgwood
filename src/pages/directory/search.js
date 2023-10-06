import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../../components/layout/layout'
import SearchContent from '../../components/search-content/search-content'

const SearchPage = () => {
    return (
        <Layout>
            <Helmet>
                <title>Search Wedgwood Businesses</title>
            </Helmet>
            <SearchContent />
        </Layout>
    )
}

export default SearchPage

import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout/layout'
import ContactContent from '../components/contact-content/contact-content'

const ContactPage = () => {
    return (
        <Layout>
            <Helmet>
                <title>Contact Shop Wedgwood!</title>
            </Helmet>
            <ContactContent />
        </Layout>
    )
}

export default ContactPage

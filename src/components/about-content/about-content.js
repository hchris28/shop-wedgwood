import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"

import * as aboutContentStyles from './about-content.module.scss'

const AboutContent = () => {

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    const { title } = data.site.siteMetadata

    return (
        <div className={aboutContentStyles.container}>
            <h1>About {title}</h1>
            <StaticImage src="../../images/wcc-logo.jpg" alt="WCC Logo" width={400} className={aboutContentStyles.wccLogoContainer} />
            <p>
                <span style={{fontWeight: '600'}}>{title}</span> was created and is maintained by the <a href="http://www.wedgwoodcc.org" target="_blank" rel="noreferrer">Wedgwood Community Council</a>.
            </p>
            <p>
                Please feel free to <Link to="/contact">contact us</Link> with any questions or concerns regarding this web site.
            </p>
        </div>
    )
}

export default AboutContent
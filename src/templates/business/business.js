import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'

import MapIcon from '../../components/icons/map'
import GlobeIcon from '../../components/icons/globe'
import PhoneIcon from '../../components/icons/phone'
import EmailIcon from '../../components/icons/email'
import InstagramIcon from '../../components/icons/instagram'
import FacebookIcon from '../../components/icons/facebook'
import LocalBadgeIcon from '../../components/icons/local-badge'
import Obfuscate from 'react-obfuscate';

import Layout from '../../components/layout/layout'
import GoogleMap from '../../components/google-map/google-map'

import * as businessStyles from './business.module.scss'
import MapMarker from '../../components/google-map/map-marker'

export const query = graphql`
    query (
        $slug: String
    ) {
        markdownRemark (
            fields: {
                slug: {
                    eq: $slug
                }
            }
        ) {
            frontmatter {
                name,
                website,
                email,
                phone,
                address,
                facebook,
                instagram,
                photo {
                    childImageSharp {
                        gatsbyImageData
                   } 
                },
                tags,
                local,
                lat,
                lng
            },
            html,
            excerpt
        } 
    }
`

const BusinessPage = (props) => {

    const {
        name,
        website,
        email,
        phone,
        address,
        facebook,
        instagram,
        lat,
        lng,
        local
    } = props.data.markdownRemark.frontmatter

    const photo = props.data.markdownRemark.frontmatter.photo?.childImageSharp.gatsbyImageData

    const tags = props.data.markdownRemark.frontmatter.tags?.split(',')

    const mapMarker = <MapMarker name={name} lat={lat} lng={lng} />

    return (
        <Layout hero={<GoogleMap className={businessStyles.map} center={{ lat, lng }} zoom={18}>{mapMarker}</GoogleMap>}>
            <Helmet>
                <title>{name} - Shop Wedgwood!</title>
                <meta name="description" content={props.data.markdownRemark.excerpt}></meta>
            </Helmet>
            <div className={businessStyles.container}>
                <div className={businessStyles.header}>
                    <h1>{name}</h1>
                    <p className={businessStyles.address}>
                        <MapIcon />
                        <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} target="_blank" rel="noreferrer">{address}</a>
                    </p>
                    {
                        local &&
                        <div className={businessStyles.localBadge}>
                            <LocalBadgeIcon /> LOCAL
                        </div>
                    }
                </div>
                <div className={businessStyles.contactLinks}>
                    {
                        website &&
                        <span className={businessStyles.contactLink}>
                            {
                                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                            }<a href={website} target="_blank" rel="noreferrer"><GlobeIcon /></a>
                            <a href={website} target="_blank" rel="noreferrer" className={businessStyles.contactLinkLabel}>{website}</a>
                        </span>
                    }
                    {
                        phone &&
                        <span className={businessStyles.contactLink}>
                            <Obfuscate tel={phone} target="_blank" rel="noreferrer"><PhoneIcon /></Obfuscate>
                            <Obfuscate tel={phone} target="_blank" rel="noreferrer" className={businessStyles.contactLinkLabel} />
                        </span>
                    }
                    {
                        email &&
                        <span className={businessStyles.contactLink}>
                            <Obfuscate email={email} target="_blank" rel="noreferrer"><EmailIcon /></Obfuscate>
                            <Obfuscate email={email} target="_blank" rel="noreferrer" className={businessStyles.contactLinkLabel} />
                        </span>
                    }
                    <span style={{ whiteSpace: 'nowrap', display: 'flex' }}>
                        {
                            facebook &&
                            <span className={businessStyles.socialLink}>
                                <a href={facebook} target="_blank" rel="noreferrer">
                                    <FacebookIcon />
                                </a>
                            </span>
                        }
                        {
                            instagram &&
                            <span className={businessStyles.socialLink}>
                                <a href={instagram} target="_blank" rel="noreferrer">
                                    <InstagramIcon />
                                </a>
                            </span>
                        }
                    </span>
                </div>

                <div className={businessStyles.mdContentContainer}>
                    <div className={businessStyles.mdPhoto}>{photo && <GatsbyImage image={photo} alt={name} />}</div>
                    <div className={businessStyles.mdContent} dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
                </div>

                <ul className={businessStyles.tags}>
                    {
                        tags &&
                        tags.map((tag) => {
                            return (
                                <li className={businessStyles.tag} key={tag}>{tag}</li>
                            )
                        })
                    }
                </ul>

            </div>
        </Layout>
    )
}

export default BusinessPage
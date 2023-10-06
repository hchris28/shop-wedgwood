import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

import LocalBadgeIcon from '../icons/local-badge'

import * as businessCardStyles from './business-card.module.scss'

const BusinessCard = ({ name, photo, slug, tags, local }) => {
    return (
        <Link to={`/business/${slug}`} style={{ textDecoration: "none", color: "#444" }} className={businessCardStyles.container}>
            <div className={businessCardStyles.photoContainer}>
                {
                    photo
                        ? <GatsbyImage image={photo} alt={name} />
                        : <StaticImage src="./placeholder.jpg" alt={name} />
                }
                {
                    local &&
                    <div className={businessCardStyles.localBadge}>
                        <LocalBadgeIcon /> LOCAL
                    </div>
                }
            </div>
            <div className={businessCardStyles.textContainer}>
                <p className={businessCardStyles.name}>{name}</p>
                <ul className={businessCardStyles.tags}>
                    {
                        tags &&
                        tags.map((tag) => {
                            return (
                                <li className={businessCardStyles.tag} key={tag}>{tag}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </Link>
    )
}

export default BusinessCard
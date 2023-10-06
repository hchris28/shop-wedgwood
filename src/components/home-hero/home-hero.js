import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

import * as homeHeroStyles from './home-hero.module.scss'
import BusinessList, { DIRECTION_VERT } from '../../components/business-list/business-list'
import TagList from '../tag-list/tag-list'

import CoffeeIcon from '../icons/coffee'
import ShoppingBasketIcon from '../icons/shopping-basket'
import PrescriptionIcon from '../icons/prescription'

const HomeHero = () => {

    const shopData = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                limit: 2,
                filter: {frontmatter: {featured: {eq: true}}}
                sort: {frontmatter: {name: ASC}}
            ) {
                edges {
                    node {
                        frontmatter {
                            name,
                            category,
                            photo {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            },
                            tags,
                            local,
                            lat,
                            lng,
                            featured
                        },
                        excerpt,
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    const featuredShops = shopData.allMarkdownRemark.edges

    return (
        <div className={homeHeroStyles.container}>
            <div className={homeHeroStyles.content}>

                <div className={homeHeroStyles.directoryNavContainer}>

                    <div className={homeHeroStyles.directoryNav}>

                        <div className={homeHeroStyles.directoryNavItem}>
                            <CoffeeIcon className={homeHeroStyles.directoryNavIcon} />
                            <div className={homeHeroStyles.linksContainer}>
                                <Link to="/directory/eat-drink" className={homeHeroStyles.directoryLink}>Eat/Drink</Link>
                                <TagList category="eat-drink" />
                            </div>
                        </div>

                        <div className={homeHeroStyles.directoryNavItem}>
                            <ShoppingBasketIcon className={homeHeroStyles.directoryNavIcon} />
                            <div className={homeHeroStyles.linksContainer}>
                                <Link to="/directory/shop" className={homeHeroStyles.directoryLink}>Shop</Link>
                                <TagList category="shop" />
                            </div>
                        </div>

                        <div className={homeHeroStyles.directoryNavItem}>
                            <PrescriptionIcon className={homeHeroStyles.directoryNavIcon} />
                            <div className={homeHeroStyles.linksContainer}>
                                <Link to="/directory/services" className={homeHeroStyles.directoryLink}>Services</Link>
                                <TagList category="services" />
                            </div>
                        </div>

                    </div>

                </div>

                <div className={homeHeroStyles.featuredBusinessContainer}>
                    <BusinessList items={featuredShops} direction={DIRECTION_VERT} />
                </div>

            </div>
        </div>
    )
}

export default HomeHero
import React from 'react'

import BusinessCard from '../business-card/business-card'

import * as businessListStyles from './business-list.module.scss'

const DIRECTION_HORZ = '--horz'
const DIRECTION_VERT = '--vert'

const BusinessList = ({ items, direction }) => {

    let listStyles = [businessListStyles.list]
    if (!direction || direction === DIRECTION_HORZ) {
        listStyles.push(businessListStyles.listHorz)
    } else {
        listStyles.push(businessListStyles.listVert)    
    }

    return (
        <div className={businessListStyles.container}>
            <ul className={listStyles.join(' ')}>
                {
                    items.map((edge) => {
                        return (
                            <li key={edge.node.fields.slug} className={businessListStyles.listItem}>
                                <BusinessCard
                                    name={edge.node.frontmatter.name}
                                    photo={edge.node.frontmatter.photo?.childImageSharp.gatsbyImageData}
                                    slug={edge.node.fields.slug}
                                    tags={edge.node.frontmatter.tags?.split(',')}
                                    local={edge.node.frontmatter.local}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default BusinessList
export { DIRECTION_HORZ, DIRECTION_VERT }
import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import ChevronUpIcon from '../icons/chevron-up'
import ChevronDownIcon from '../icons/chevron-down'

import * as tagListStyles from './tag-list.module.scss'

const TagList = ({ category, className }) => {

    const [showAll, setShowAll] = useState(false);

    const tagData = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            category,
                            tags
                        }
                    }
                }
            }
        }
    `)

    const tags = []
    tagData.allMarkdownRemark.edges.forEach(edge => {
        var { category: edgeCategory, tags: edgeTags } = edge.node.frontmatter
        if (!category || category === edgeCategory) {
            edgeTags.split(',').forEach(tag => {
                tag = tag.trim().toLowerCase()
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag)
                }
            })
        }
    })

    let containerStyles = [tagListStyles.tagLinks]
    if (!showAll) {
        containerStyles.push(tagListStyles.tagLinksCollapsed)
    }

    const handleClick = (e) => {
        setShowAll(!showAll)
    }

    return (
        <div className={containerStyles.join(' ')}>
            {
                tags.sort().map((tag) => {
                    let urlEncodedTag = tag.trim().replace(/ /i, '+').toLowerCase()
                    return (
                        <a href={`directory/search/?q=${urlEncodedTag}`} key={tag}>{tag}</a>
                    )
                })
            }
            <button onClick={handleClick}>
                { 
                    showAll 
                        ? <ChevronUpIcon /> 
                        : <ChevronDownIcon />
                }
            </button>
        </div>
    )
}

export default TagList
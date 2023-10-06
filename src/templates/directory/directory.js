import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../../components/layout/layout'
import DirectoryHero from '../../components/directory-hero/directory-hero'
import BusinessList from '../../components/business-list/business-list'

import * as directoryStyles from './directory.module.scss'

export const query = graphql`
    query (
        $category: String
    ) {
        allMarkdownRemark (
            filter: {frontmatter: {category: {eq: $category}}}
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
                        local
                    },
                    excerpt,
                    fields {
                        slug
                    }
                }
            }
        }
    }
`

function humanizeCategorySlug(slug) {
    // dash to sapce
    slug = slug.replace(/-/g, ' ')
    // title case
    var words = slug.toLowerCase().split(' ');
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1)
    }
    let humanized = words.join(' ')
    if (humanized === 'Eat Drink')
        humanized = humanized.replace(/ /g, '/')
    return humanized
}

const DirectoryPage = (props) => {
    return (
        <Layout hero={<DirectoryHero category={props.pageContext.category} />}>
            <Helmet>
                <title>{humanizeCategorySlug(props.pageContext.category)} - Shop Wedgwood!</title>
            </Helmet>
            <div className={directoryStyles.container}>
                <div className={directoryStyles.header}>
                    <h1>{humanizeCategorySlug(props.pageContext.category)}</h1>
                </div>
                <BusinessList items={props.data.allMarkdownRemark.edges} />
            </div>
        </Layout>
    )
}

export default DirectoryPage

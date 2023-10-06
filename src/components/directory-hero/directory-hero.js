import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as directoryHeroStyles from './directory-hero.module.scss'
// import { isAbsolute } from 'upath'

const DirectoryHero = ({ category }) => {

    const data = useStaticQuery(graphql`
        query {
            allFile (
                filter: {
                    relativePath: { regex: "^components/directory-hero/.+(png|jpg)$/" },
                }
            ) {
                edges {
                    node {
                        name,
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
    `)
    
    const heroImageData = 
        data.allFile.edges.find((edge) => edge.node.name === category)
        ?? data.allFile.edges.find((edge) => edge.node.name === 'directory-hero')

    const heroImage = getImage(heroImageData.node.childImageSharp)

    return (
        <div className={directoryHeroStyles.container}>
            <div className={directoryHeroStyles.content}>
                <GatsbyImage 
                    image={heroImage} 
                    alt={`${category} image`} 
                    className={directoryHeroStyles.photo} 
                    style={ { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 } } 
                />
            </div>
        </div>
    )
}

export default DirectoryHero
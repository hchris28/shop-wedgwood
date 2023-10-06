import React, { useEffect, useReducer } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useQueryParam, StringParam } from "use-query-params"
import { initialSearchState, searchStateReducer, VIEW_CARD, VIEW_MAP } from './searchStateReducer'

import MapIcon from '../icons/map'
import CardsIcon from '../icons/cards'

import SearchInput from './search-input/search-input'
import SearchMap from './search-map/search-map'
import BusinessList from '../../components/business-list/business-list'
import BusinessCard from '../business-card/business-card'
import ToggleSelect from '../../components/toggle-select/toggle-select'

import * as searchContentStyles from './search-content.module.scss'

const SearchContent = () => {

    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
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
                            lng
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

    const allShops = data.allMarkdownRemark.edges
    const [q] = useQueryParam("q", StringParam);
    const [searchState, searchStateDispatch] = useReducer(searchStateReducer, initialSearchState);

    const filterShops = (query) => {
        const filteredShops = allShops.filter(business => {
            const { name, tags } = business.node.frontmatter
            return (
                name.toLowerCase().includes(query.toLowerCase()) ||
                tags.toLowerCase().includes(query.toLowerCase())
            )
        })
        return filteredShops
    }

    const searchChange = (e) => {
        const query = e.target.value
        searchStateDispatch({
            type: 'searchChange',
            payload: {
                query,
                queryResults: filterShops(query)
            }
        })
    }

    const searchClear = () => {
        searchStateDispatch({
            type: 'searchChange',
            payload: {
                query: '',
                queryResults: allShops
            }
        })
    }

    const viewStateChange = (value) => {
        searchStateDispatch({
            type: 'viewStateChange',
            payload: {
                viewState: value
            }
        })
    }

    const markerClick = (edge) => {
        searchStateDispatch({
            type: 'markerClick',
            payload: {
                markerKey: edge.node.frontmatter.name,
                card: <BusinessCard
                    name={edge.node.frontmatter.name}
                    excerpt={edge.node.excerpt}
                    photo={edge.node.frontmatter.photo?.childImageSharp.gatsbyImageData}
                    slug={edge.node.fields.slug}
                    tags={edge.node.frontmatter.tags?.split(',')}
                />
            }
        })
    }

    const mapDetailClose = () => {
        searchStateDispatch({
            type: 'mapDetailClose'
        })
    }

    const mapChange = ({ center, zoom }) => {
        localStorage.setItem('search-map-settings', JSON.stringify({ center, zoom }))
    }

    useEffect(() => {
        // check query parameter and local storage for search query
        const query =
            (q || localStorage.getItem('search-query') || '')
                .toLowerCase()
                .replace(/\+/i, ' ')

        searchStateDispatch({
            type: 'searchChange',
            payload: {
                query,
                queryResults: filterShops(query)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem('search-query', searchState.query)
    }, [searchState.query])

    return (
        <div className={searchContentStyles.container}>
            <SearchInput
                searchState={searchState}
                onChange={searchChange}
                onClear={searchClear}
            />

            <div className={searchContentStyles.viewButtons}>
                <ToggleSelect
                    storageKey='search-view'
                    buttons={[
                        { icon: <CardsIcon />, text: 'List', value: VIEW_CARD },
                        { icon: <MapIcon />, text: 'Map', value: VIEW_MAP },
                    ]}
                    initialValue={VIEW_CARD}
                    onClick={viewStateChange}
                />
            </div>

            {searchState.viewState === VIEW_CARD
                ? <BusinessList items={searchState.queryResults} />
                : <SearchMap
                    searchState={searchState}
                    onChange={mapChange}
                    markerClick={markerClick}
                    mapDetailClose={mapDetailClose}
                />
            }
        </div>
    )
}

export default SearchContent
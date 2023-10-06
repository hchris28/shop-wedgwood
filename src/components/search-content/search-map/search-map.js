import React from 'react'
import GoogleMap from '../../google-map/google-map'
import MapMarker from '../../google-map/map-marker'
import CloseIcon from '../../icons/close'

import * as styles from './search-map.module.scss'

const defaultMapSettings = {
    center: { lat: 47.68866506485377, lng: -122.29062243844143 },
    zoom: 14
}

const SearchMap = ({
    searchState = {},
    onChange = () => { },
    markerClick = () => { },
    mapDetailClose = () => { },
}) => {
    return (
        <div className={styles.mapContainer}>
            <GoogleMap
                className={styles.map}
                center={defaultMapSettings.center}
                zoom={defaultMapSettings.zoom}
                recenterMap={searchState.recenterMap}
                onChange={onChange}
            >
                {searchState.queryResults.map((edge) => {
                    const { name, lat, lng } = edge.node.frontmatter
                    return (
                        <MapMarker
                            className={name === searchState.activeShop.markerKey ? styles.activeMarker : ''}
                            key={name}
                            name={name}
                            lat={lat}
                            lng={lng}
                            onClick={() => { markerClick(edge) }}
                        />
                    )
                })}
            </GoogleMap>
            {searchState.activeShop?.card &&
                <div className={styles.mapShopDetail}>
                    <button
                        type='button'
                        onClick={mapDetailClose}
                        className={styles.mapShopDetailClose}>
                        <span>Close</span>
                        <CloseIcon />
                    </button>
                    {searchState.activeShop.card}
                </div>
            }
        </div>
    )
}

export default SearchMap
import React from 'react'
import LocationMarkerIcon from '../icons/location-marker'

import * as mapMarkerStyles from './map-marker.module.scss'

const MapMarker = ({ name, lat, lng, className, onClick = () => {} }) => {
    return (
        <div 
            className={mapMarkerStyles.container} 
            onClick={() => { onClick() }}
            onKeyDown={() => {}}
            role='button'
            tabIndex='0'
            title={name}>
            <LocationMarkerIcon className={`${mapMarkerStyles.icon} ${className ? className : ''}`} />
        </div>
    )
}

export default MapMarker
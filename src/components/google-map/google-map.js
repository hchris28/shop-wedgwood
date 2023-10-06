import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { graphql, useStaticQuery } from 'gatsby'

//import * as mapStyles from './google-map.module.scss'

export default function GoogleMap({
    className,
    center,
    zoom,
    children,
    recenterMap,
    onChange = () => { }
}) {

    const [googleApi, setGoogleApi] = useState(null)

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    googleMapsKey
                }
            }
        }
    `)

    function mapOptionsCreator(map) {
        return {
            fullscreenControl: false,
            maxZoom: 17,
            zoomControlOptions: {
                position: map.ControlPosition.RIGHT_CENTER,    // as long as this is not set it works
                style: map.ZoomControlStyle.SMALL
            },
        }
    }

    const mapOptions = {
        center: {
            lat: center?.lat,
            lng: center?.lng
        },
        zoom: zoom || 17,
    }
    const { googleMapsKey } = data.site.siteMetadata

    const googleApiIsLoaded = (map, maps) => {
        setGoogleApi({ map, maps })
    }

    useEffect(() => {
        // wait for Google API to load so we can access the map/maps objects
        if (!googleApi)
            return

        if (!recenterMap)
            return

        if (children.length > 0) {
            var bounds = new googleApi.maps.LatLngBounds();
            for (var i = 0; i < children.length; i++) {
                const { lat, lng } = children[i].props
                if (!lat || !lng)
                    continue
                var geoCode = new googleApi.maps.LatLng(lat, lng);
                bounds.extend(geoCode);
            }
            googleApi.map.fitBounds(bounds);
        } else {
            googleApi.map.setZoom(mapOptions.zoom)
            googleApi.map.setCenter(mapOptions.center)
        }

    }, [recenterMap, children, googleApi, mapOptions.center, mapOptions.zoom]);

    return (
        // Important! Always set the container height explicitly
        <div className={className}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: googleMapsKey }}
                defaultCenter={mapOptions.center}
                defaultZoom={mapOptions.zoom}
                options={mapOptionsCreator}
                onChange={onChange}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => googleApiIsLoaded(map, maps)}
            >
                {children}
            </GoogleMapReact>
        </div>
    )
}
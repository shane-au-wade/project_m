import * as React from 'react'
import { createUseStyles } from 'react-jss'

import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { useBikeLaneDisplay } from './bikeLaneDisplay'

const useStyles = createUseStyles({

    mapContainer: {
        height: '100%',
        width: '100%'
    }
})

const STARTING_LOCATION = [37.75599059794778, -122.44846343994142]

type BikeLane = {
    id: number,
    class: string,
    bike_lane_type: string
    lat_lngs: Array<[number, number]>
}

type BikeLaneMap = {
    id: 'default'
    bike_lanes: Record<number, Array<BikeLane>>
}


export default function map(props: {
    bikeLaneMap: BikeLaneMap
}) {

    const { bikeLaneMap } = props

    const classes = useStyles()

    const mapContainerRef = React.useRef<HTMLDivElement>()

    const [map, setMap] = React.useState<L.Map | null>(null)

    React.useEffect(() => {
        const osm = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        )

        const stamen_toner = L.tileLayer(
            'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
            {
                attribution:
                    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 20,
            }
        )

        const _map = L.map(mapContainerRef.current, {
            center: STARTING_LOCATION,
            zoom: 13,
            layers: [stamen_toner, osm]
        });

        const baseMaps = {
            "Stamen Toner": stamen_toner,
            "Open Street Map": osm,
        };

        L.control.layers(baseMaps).addTo(_map);

        setMap(_map)
    }, [mapContainerRef])

    React.useEffect(() => {
        if (map === null) return
        useBikeLaneDisplay(map, bikeLaneMap)
    }, [map])

    return (
        <div id="mapContainer"
            className={classes.mapContainer}
            ref={mapContainerRef as React.RefObject<HTMLDivElement>}
        >

        </div>
    )
}


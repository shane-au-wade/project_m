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

    const {bikeLaneMap} = props

    const classes = useStyles()

    const mapContainerRef = React.useRef<HTMLDivElement>()

    const [map, setMap] = React.useState<L.Map | null>(null)

    React.useEffect(() => {
        const _map = L.map(mapContainerRef.current, {
            center: STARTING_LOCATION,
            zoom: 13
        });

        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        ).addTo(_map);
        setMap(_map)
    }, [mapContainerRef])

    React.useEffect(() => {
      if(map === null) return
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


import { Polyline } from "leaflet"
import { Colors } from '@blueprintjs/core'

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


function styleLane(lane: BikeLane) {
    if (lane.class === 'CLASS I') {
        return {
            color: Colors.FOREST2,
            fillOpacity: 0.5,
            weight: 2
        }
    }
    if (lane.class === 'CLASS II') {
        return {
            color: Colors.ORANGE3,
            fillOpacity: 0.5,
            weight: 2,
        }
    }
    if (lane.class === 'CLASS III') {
        return {
            color: Colors.VERMILION3,
            fillOpacity: 0.5,
            weight: 2,
        }
    }
    if (lane.class === 'CLASS IV') {
        return {
            color: Colors.FOREST3,
            fillOpacity: 0.5,
            weight: 2,
        }
    }
    return { color: Colors.COBALT3, fillOpacity: 0.5, weight: 2 }
}


export function useBikeLaneDisplay(
    map: L.Map,
    bikeLaneMap: BikeLaneMap
) {
    const bike_lanes = bikeLaneMap.bike_lanes
    Object.keys(bike_lanes).forEach((group_id: number) => {
        bike_lanes[group_id].forEach((lane: BikeLane) => {
            const style = styleLane(lane)
            const polyline = new Polyline(lane.lat_lngs, { ...style })

            polyline.bindPopup(`<p>${JSON.stringify(lane, null, 2)}</p>`)
            polyline.on('mouseover', () => {
                const style = styleLane(lane)
                polyline.setStyle({ ...style, weight: 5 })
            })

            polyline.on('mouseout', () => {
                const style = styleLane(lane)
                polyline.setStyle({ ...style, weight: 2 })
            })

            polyline.addTo(map)
        })
    })

}
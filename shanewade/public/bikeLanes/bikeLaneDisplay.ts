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


export function useBikeLaneDisplay(
    map: L.Map,
    bikeLaneMap: BikeLaneMap
) {
    const bike_lanes = bikeLaneMap.bike_lanes
    Object.keys(bike_lanes).forEach((group_id: number) => {
        bike_lanes[group_id].forEach((lane: BikeLane) => {
            console.log(lane)
            const polyline = new Polyline(lane.lat_lngs, {color: Colors.COBALT3} )

            polyline.addTo(map)
        })
    })

}
import * as L from "leaflet"
import { Colors } from '@blueprintjs/core'
import type * as geojson from 'geojson'
import * as leafletHeatmap from 'leaflet-heatmap'

type CollisionSeverity =
    'Injury (Severe)' |
    'Injury (Complaint of Pain)' |
    'Injury (Other Visible)' |
    'Fatal'

function styleCollision(collision) {

    const severity: CollisionSeverity = collision.collision_severity
    if (severity === 'Injury (Severe)') {
        return { color: Colors.RED3, fillOpacity: 0.5, weight: 2, radius: 2 }
    }
    if (severity === 'Injury (Complaint of Pain)') {
        return { color: Colors.GOLD3, fillOpacity: 0.5, weight: 2, radius: 2 }
    }
    if (severity === 'Injury (Other Visible)') {
        return { color: Colors.ORANGE3, fillOpacity: 0.5, weight: 2, radius: 2 }
    }
    if (severity === 'Fatal') {
        return { color: Colors.BLACK, fillOpacity: 0.5, weight: 2, radius: 2 }
    }

    console.log(severity)
    return { color: Colors.COBALT3, fillOpacity: 0.5, weight: 2, radius: 2 }
}

// var testData = {
//     max: 8,
//     data: [{lat: 24.6408, lng:46.7728, count: 3},{lat: 50.75, lng:-1.55, count: 1}, ...]
//   }

// var cfg = {
//     // radius should be small ONLY if scaleRadius is true (or small radius is intended)
//     // if scaleRadius is false it will be the constant radius used in pixels
//     "radius": 2,
//     "maxOpacity": .8,
//     // scales the radius based on map zoom
//     "scaleRadius": true,
//     // if set to false the heatmap uses the global maximum for colorization
//     // if activated: uses the data maximum within the current map boundaries
//     //   (there will always be a red spot with useLocalExtremas true)
//     "useLocalExtrema": true,
//     // which field name in your data represents the latitude - default "lat"
//     latField: 'lat',
//     // which field name in your data represents the longitude - default "lng"
//     lngField: 'lng',
//     // which field name in your data represents the data value - default "value"
//     valueField: 'count'
//   };

type HeatMapData = {
    max: number,
    data: Array<{ lat: number, lng: number, count: number }>
}

export function useCollisionsDisplay(
    map: L.Map,
    collisionsData: geojson.FeatureCollection,
    collisionsHeatMap: leafletHeatmap,
    layerControl: L.Control
) {

    const features: Array<geojson.Feature> = collisionsData.features

    console.log(features[0])
    const heat_map_data: HeatMapData = {
        max: 1,
        data: [],
    }

    const collision_layers = new L.LayerGroup()

    features.forEach((feature) => {
        const style = styleCollision(feature)
        const lat_lng: [number, number] = [feature.latitude, feature.longitude]

        heat_map_data.data.push(
            {
                lat: feature.latitude,
                lng: feature.longitude,
                count: 1
            }
        )

        const marker = new L.CircleMarker(lat_lng, { ...style })
        collision_layers.addLayer(marker)
    })

    console.log(heat_map_data)

    collisionsHeatMap.setData(heat_map_data)
    layerControl.addOverlay(collision_layers, 'Collisions')
    collision_layers.addTo(map)

}
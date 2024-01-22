import * as React from 'react'
import { createUseStyles } from 'react-jss'

import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as leafletHeatmap from 'leaflet-heatmap'

import { useBikeLaneDisplay } from './bikeLaneDisplay'
import { useCollisionsDisplay } from './collisionsDisplay'

import type * as geojson from 'geojson'

const useStyles = createUseStyles({
  mapContainer: {
    height: '100%',
    width: '100%',
  },
})

const STARTING_LOCATION = [37.75599059794778, -122.44846343994142]

type BikeLane = {
  id: number
  class: string
  bike_lane_type: string
  lat_lngs: Array<[number, number]>
}

type BikeLaneMap = {
  id: 'default'
  bike_lanes: Record<number, Array<BikeLane>>
}

export default function map(props: { bikeLaneMap: BikeLaneMap; collisionsData: geojson.FeatureCollection }) {
  const { bikeLaneMap, collisionsData } = props

  const classes = useStyles()

  const mapContainerRef = React.useRef<HTMLDivElement>()

  const [map, setMap] = React.useState<L.Map | null>(null)

  const [collisionsHeatMap, setCollisionsHeatMap] = React.useState<leafletHeatmap | null>(null)

  const [layerControl, setLayerControl] = React.useState<L.Control | null>(null)

  React.useEffect(() => {
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })

    const stamen_toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png', {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
    })

    const cfg = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      radius: 10,
      maxOpacity: 0.8,
      // scales the radius based on map zoom
      scaleRadius: false,
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries
      //   (there will always be a red spot with useLocalExtremas true)
      useLocalExtrema: true,
      // which field name in your data represents the latitude - default "lat"
      latField: 'lat',
      // which field name in your data represents the longitude - default "lng"
      lngField: 'lng',
      // which field name in your data represents the data value - default "value"
      valueField: 'count',
    }

    const _collisionsHeatmap = new leafletHeatmap(cfg)

    const _map = L.map(mapContainerRef.current, {
      center: STARTING_LOCATION,
      zoom: 13,
      layers: [stamen_toner, osm, _collisionsHeatmap],
      preferCanvas: true,
    })

    const baseMaps = {
      'Stamen Toner': stamen_toner,
      'Open Street Map': osm,
    }

    const mapOverlays = {
      'Collisions Heat Map': _collisionsHeatmap,
    }

    var testData = {
      max: 8,
      data: [
        { lat: 24.6408, lng: 46.7728, count: 1 },
        { lat: 50.75, lng: -1.55, count: 1 },
      ],
    }

    console.log(_collisionsHeatmap)

    _collisionsHeatmap.setData(testData)

    const _layer_control = L.control
      .layers(baseMaps, mapOverlays, {
        collapsed: false,
      })
      .addTo(_map)

    _layer_control.expand()

    setMap(_map)
    setCollisionsHeatMap(_collisionsHeatmap)
    setLayerControl(_layer_control)
  }, [mapContainerRef])

  React.useEffect(() => {
    if (map === null) return
    if (collisionsHeatMap === null) return
    if (layerControl === null) return
    useBikeLaneDisplay(map, bikeLaneMap, layerControl)
    useCollisionsDisplay(map, collisionsData, collisionsHeatMap, layerControl)
  }, [map, collisionsHeatMap, layerControl])

  return (
    <div
      id="mapContainer"
      className={classes.mapContainer}
      ref={mapContainerRef as React.RefObject<HTMLDivElement>}
    ></div>
  )
}

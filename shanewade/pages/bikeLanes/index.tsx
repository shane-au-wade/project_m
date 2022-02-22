import type { GetStaticProps, NextPage } from 'next'
import * as React from 'react'
import { createUseStyles } from 'react-jss'

import dynamic from 'next/dynamic';
import path from 'path'
import * as fs from 'fs'

import { useBikeLaneMap } from '../../public/bikeLanes/bikeLaneMap'

const Map = dynamic(() => import('../../public/bikeLanes/map'), { ssr: false });

const useStyles = createUseStyles({
    container: {
        width: '100%',
        height: '100vh',
        // padding: '10px'
    },
    mapContainer: {

    },
    '@media screen and (max-width: 1100px)': {
        fig: {
            fontSize: '.7em',
        }
    },
    '@media screen and (max-width: 800px)': {
        fig: {
            fontSize: '.5em',
        }
    },
    '@media screen and (max-width: 600px)': {
        fig: {
            fontSize: '.25em',
        }
    },
    '@media screen and (max-width: 500px)': {
        fig: {
            fontSize: '5px',
        }
    },
    '@media screen and (max-width: 450px)': {
        fig: {
            fontSize: '4px',
        }
    },
    '@media screen and (max-width: 300px)': {
        fig: {
            fontSize: '.20em',
        }
    },
})

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

type Props = {
    bikeLaneMapData: string
}

const BikeLaneMapPage: NextPage = (props: Props) => {
    const classes = useStyles()
    const { bikeLaneMapData } = props
    const bike_lane_map: BikeLaneMap = useBikeLaneMap(bikeLaneMapData)

    return (
        <div className={classes.container}>
            <Map bikeLaneMap={bike_lane_map}></Map>
        </div>
    )
}

export default BikeLaneMapPage

export const getStaticProps: GetStaticProps = async (context) => {
    const data_path = path.join(process.cwd(), 'public/bikewaynetwork.csv')
    const file_contents = fs.readFileSync(data_path, 'utf8')
    return {
        props: {
            bikeLaneMapData: file_contents
        }, // will be passed to the page component as props
    }
}



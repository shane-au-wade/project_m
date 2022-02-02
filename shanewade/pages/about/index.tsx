import type { NextPage } from 'next'
import * as React from 'react'

import { createUseStyles } from 'react-jss'

import InProgress from '../../public/components/inProgress'

const HEIGHT = '250px'

const useStyles = createUseStyles({
    container: {
        width: '100%',
        height: '100vh',
        backgroundColor: 'black'
    },
    spacer: {
        height: `calc(50vh - (${HEIGHT}/2) - 40px)`
    },
    fig: {
        height: HEIGHT,
        color: 'white',
        width: 'fit-content',
        margin: '0 auto',
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

const AboutPage: NextPage = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.spacer} />
            <div className={classes.fig}>
                <InProgress />
            </div>
        </div>
    )
}

export default AboutPage
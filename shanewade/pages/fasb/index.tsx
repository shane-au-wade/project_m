import type { NextPage } from 'next'
import * as React from 'react'

import { createUseStyles } from 'react-jss'

import InProgress from '../../public/components/inProgress'

const useStyles = createUseStyles({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        display: 'grid'
    },
    fig: {
        alignSelf: 'center',
        writingMode: 'vertical-rl',
        fontWeight: 'bolder',
        fontSize: '0.5rem',
        margin: '0 auto',
    },
})

const Page: NextPage = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.fig}>
                <InProgress />
            </div>
        </div>
    )
}

export default Page
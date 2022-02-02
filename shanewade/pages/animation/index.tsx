// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();
// <Setup Blueprint>

import { useRouter } from 'next/router'

import * as React from 'react'

import {
    Card,
    Button,
    ProgressBar
} from '@blueprintjs/core'

import { createUseStyles } from 'react-jss'

import { blimp_path } from '../../public/blimp.svg.js'
import { table_mountain_path } from '../../public/tableMountain.svg.js'

const TOP_BAR_HEIGHT = '50px'

const useStyles = createUseStyles({
    topBar: {
        height: TOP_BAR_HEIGHT,
        width: '100%',
        backgroundColor: 'black'
    },
    in_progress: {
        fontSize: '15px'
    },
    container: {
        width: '100%',
        backgroundColor: 'black',
        padding: '15px'
    },
    tile_container: {
        height: 'fit-content',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
        paddingBottom: '10px'
    },
    tile_row: {
        display: 'flex',
        flexDirection: 'row',
        margin: '0 auto'
    },
    tile: {
        width: '300px',
        height: '400px',
        margin: '25px',
        padding: '2px'
    },
    pulse: {
        animation: `$pulsate 2500ms ease-in 200ms infinite, backgroundcolor-change 50s infinite alternate `,
        borderRadius: '50px'
    },
    progressBar: {
        '& div': {
            animation: `backgroundcolor-change 10s infinite alternate, $grow_width 3s ease-in-out 500ms 4 alternate`,
        }
    },
    blimp_background: {
        backgroundColor: 'rgb(47, 119, 235)',
        height: '100%',
        widht: '100%',
        animation: '$clouds 2.5s  ease-in-out 500ms infinite alternate',
        padding: '0px',
    },
    blimp: {
        position: 'relative',
        top: '160px',
        left: '45px',
        animation: '$pulse_translate 2.5s ease-in-out 500ms infinite alternate'
    },
    blimp_animation: {
        fill: 'rgb(252, 3, 53)',
        animation: '$blimp 2.5s ease-in-out 500ms infinite alternate',
    },
    mountain: {
        animation: '$pulse_width 2.5s ease-in-out 500ms infinite alternate',
    },
    '@keyframes blimp': {
        '0%': {
            fill: 'rgb(252, 3, 53)',
        },
        '100%': {
            fill: 'rgb(245, 110, 12)',
        },
    },

    '@keyframes pulse_translate': {
        '0%': {
            transform: 'translateX(0%) translateY(0%)',
        },
        '50%': {
            transform: 'translateX(-10%) translateY(-10%)',
        },
        '100%': {
            transform: 'translateX(0%) translateY(0%)',
        },
    },

    '@keyframes pulse_width': {
        '0%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(0.62)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },

    '@keyframes clouds': {
        '0%': {
            backgroundColor: 'rgb(47, 119, 235)',
        },
        '50%': {
            backgroundColor: 'rgb(67, 130, 232)',
        },
        '100%': {
            backgroundColor: 'rgb(73, 142, 252)',
        },
    },
    '@keyframes pulsate': {
        '0%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(0.92)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
    '@keyframes grow_width': {
        '0%': {
            width: '1%',
        },
        '100%': {
            width: '100%',
        },
    },
    '@media screen and (max-width: 600px)': {
        tile_row: {
            flexDirection: 'column',
        },
        tile: {
            width: '230px',

        },
        in_progress: {
            fontSize: '1.2vw'
        }
    }

})

const in_progress = String.raw`
 __     __   __        ______   ______     ______     ______     ______     ______     ______     ______
/\ \   /\ "-.\ \      /\  == \ /\  == \   /\  __ \   /\  ___\   /\  == \   /\  ___\   /\  ___\   /\  ___\
\ \ \  \ \ \-.  \     \ \  _-/ \ \  __<   \ \ \/\ \  \ \ \__ \  \ \  __<   \ \  __\   \ \___  \  \ \___  \
 \ \_\  \ \_\\"\_\     \ \_\    \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \/\_____\  \/\_____\
  \/_/   \/_/ \/_/      \/_/     \/_/ /_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/_____/   \/_____/
`

export type AppState = {

}

const AnimationStation = () => {

    const router = useRouter()

    const classes = useStyles()

    return (
        <div>
            <div className={classes.topBar}>
                <Button
                    style={{ margin: '10px' }}
                    text={'back'}
                    icon={'undo'}
                    intent={'primary'}
                    onClick={() => {
                        router.push('/')
                    }}
                    outlined
                />
            </div>

            <div className={classes.container}>
                <div style={{ width: 'fit-content' }}>
                    <pre style={{ margin: '0' }} className={`${classes.in_progress} rgb_color`}>
                        {in_progress}
                    </pre>
                </div>

                <div style={{ height: '20px' }}></div>
                <div>
                    <ProgressBar className={classes.progressBar} stripes={false} animate={true} value={0.01}>

                    </ProgressBar>
                </div>
                <div className={classes.tile_container}>
                    <div className={classes.tile_row}>
                        <Card className={classes.tile}>
                            <div className={classes.blimp_background}>
                                <div className={classes.blimp}>
                                    <svg
                                        width="150"
                                        viewBox="0 0 541.875 294.375"
                                    >
                                        <path
                                            style={{ height: '80px', width: '120px' }}
                                            className={classes.blimp_animation}
                                            d={blimp_path}
                                            id="path4218"
                                        />
                                    </svg>
                                </div>
                                <div style={{
                                    width: '160px',
                                    marginTop: '240px',
                                    float: 'right',

                                }}
                                    className={classes.mountain}
                                >
                                    <svg
                                        width="100%"
                                        viewBox="0 0 2525.625 852.1875"
                                    >
                                        <path
                                            style={{ fill: 'white', height: '80px', width: '115px' }}
                                            d={table_mountain_path}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Card>
                        <Card className={classes.tile}>

                        </Card>
                        <Card className={classes.tile}>

                        </Card>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default AnimationStation
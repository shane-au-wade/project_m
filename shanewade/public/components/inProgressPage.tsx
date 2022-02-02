import type { NextPage } from 'next'
import * as React from 'react'

import { createUseStyles } from 'react-jss'

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

const in_progress = String.raw`
 __     __   __        ______   ______     ______     ______     ______     ______     ______     ______
/\ \   /\ "-.\ \      /\  == \ /\  == \   /\  __ \   /\  ___\   /\  == \   /\  ___\   /\  ___\   /\  ___\
\ \ \  \ \ \-.  \     \ \  _-/ \ \  __<   \ \ \/\ \  \ \ \__ \  \ \  __<   \ \  __\   \ \___  \  \ \___  \
 \ \_\  \ \_\\"\_\     \ \_\    \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \/\_____\  \/\_____\
  \/_/   \/_/ \/_/      \/_/     \/_/ /_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/_____/   \/_____/
`

type rgb = { red: number, green: number, blue: number }

const AboutPage: NextPage = () => {
    const classes = useStyles()

    const randomRGB = React.useCallback((): rgb => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return {
            red: r,
            green: g,
            blue: b,
        }
    }, [])

    // in action
    const INIT_COLOR: rgb = { red: 0, green: 0, blue: 0 }
    const INIT_END_COLOR: rgb = { red: 70, green: 217, blue: 227 }
    const FADE_INTERVAL = 3000

    const [state, setState] = React.useState<rgb>(INIT_COLOR)

    // linear interpolation between two values a and b
    // u controls amount of a/b and is in range [0.0,1.0]
    const lerp = (a: number, b: number, u: number) => {
        return (1 - u) * a + u * b;
    }

    const fade = (start: rgb, end: rgb, duration: number) => {
        let interval = 100;
        let steps = duration / interval;
        let step_u = 1.0 / steps;
        let u = 0.0;

        const theInterval = setInterval(() => {
            if (u >= 1.0) {
                clearInterval(theInterval)
                const start_color = end
                const end_color: rgb = randomRGB()
                fade(start_color, end_color, FADE_INTERVAL)
            }
            const r = lerp(start.red, end.red, u)
            const g = lerp(start.green, end.green, u)
            const b = lerp(start.blue, end.blue, u)
            u += step_u
            1
            const new_color: rgb = { red: r, green: g, blue: b }
            setState(new_color)
        }, interval);
    }

    React.useEffect(() => {
        fade(INIT_COLOR, INIT_END_COLOR, FADE_INTERVAL)
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.spacer} />
            <pre className={classes.fig} style={{ color: `rgb(${state.red},${state.green},${state.blue})` }}>
                {in_progress}
            </pre>
        </div>
    )
}

export default AboutPage
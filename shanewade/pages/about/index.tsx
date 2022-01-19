import type { NextPage } from 'next'



import {
    Button,
    Card,
    Elevation,
    Menu,
    MenuItem,
    MenuDivider
} from '@blueprintjs/core'
import { Popover2 } from "@blueprintjs/popover2";

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    app: {
        height: '100vh',
        width: '100vw',
    },
})

const AboutPage: NextPage = () => {
    const classes = useStyles()

    return (
        <div className={classes.app}>

            <Card
                interactive={true}
            >
                <h1>about me!</h1>
            </Card>

        </div>
    )
}

export default AboutPage
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// Setup Blueprint
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'

// Turn off focus styling for blueprint components
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import {
  Card,
  Button,
} from '@blueprintjs/core'

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  app: {
    height: '100vh',
    width: '100vw',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '80%',
    margin: '0 auto',

  },
  cardContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  card: {
    flex: 'grow',
    width: '300px',
    height: '300px',
    margin: "20px"
  }
})

const cardData = [
  {
    title: "about",
    href: '/about',
    icon: 'bookmark'
  },
  {
    title: "Typing Test",
    href: '/typingTest',
    icon: 'citation'
  }
]

const Home: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.app}>
      <div className={classes.cardContainer}>
        <div className={classes.cardContainerRow}>
          {
          cardData.map((card) => {
            return <Card
              className={classes.card}
              interactive={true}
              // elevation={Elevation.TWO}
              onClick={() => {
                router.push(card.href)
              }}
            >
              <Button
               minimal
               large
               text={card.title}
               icon={card.icon}
               />
            </Card>
          })
          }
        </div>
      </div>
    </div>
  )
}

export default Home

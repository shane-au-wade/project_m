import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();
// <Setup Blueprint>

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

type HomePageCard = {
  title: string,
  href: string,
  icon: string,
}

const cardData: Array<HomePageCard> = [
  {
    title: "about",
    href: '/about',
    icon: 'bookmark'
  },
  {
    title: "Typing Test",
    href: '/typingTest',
    icon: 'citation'
  },
  {
    title: "Animation",
    href: '/animation',
    icon: 'draw'
  },
  {
    title: "SF Bike Lanes",
    href: '/bikeLanes',
    icon: 'cycle'
  }
]

const Home: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.app}>
      <div className={classes.cardContainer}>
        <div id='test' className={classes.cardContainerRow}>
          {
          cardData.map((card, index) => {
            return <Card
              className={classes.card}
              interactive={true}
              key={index}
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

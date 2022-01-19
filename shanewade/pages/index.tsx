import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'


import { server } from '../config';

// Setup Blueprint
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'

// Turn off focus styling for blueprint components
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

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
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '80%',
    margin: '0 auto'
  },
  cardContainerRow: {
    display: 'flex',
    flexDirection: 'row',
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
    href: '/about'
  },
  {
    title: "typing",
    href: '/typingTest'
  },
  {
    title: "blog",
    href: '/blog'
  },
  {
    title: "blog",
    href: '/blog',
  },
  {
    title: "map",
    href: '/map',
  },
]



const Home: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.app}>

      <div className={classes.cardContainer}>
        <Button

          onClick={async () => {
            const hello_json = await (await fetch('api/hello')).json()
            console.log(hello_json)
          }}
        >

          next api test
        </Button>
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
              <h4>{card.title}</h4>

              <h1 className="title">
                Read{' '}
                <Link href={card.href}>
                  <a>this page!</a>
                </Link>
              </h1>

            </Card>

          })
          }

        </div>
      </div>

    </div>
  )
}

export default Home

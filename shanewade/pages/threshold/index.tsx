import type { NextPage } from 'next'
import Image from 'next/image'
import * as React from 'react'

import { createUseStyles } from 'react-jss'

import './index.css'
// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

import { Button, Tabs, Tab, Icon } from '@blueprintjs/core'

const PRIMARY = '#f2f2f2'
const SECONDARY = '#292933'
const ACCENT = '#72c1f2'

const useStyles = createUseStyles({
  container: {
    // height: '100%',
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    background: PRIMARY,
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
      <section
        id="header"
        style={{
          height: '7rem',
          padding: '1rem',
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'grid',
            height: '100%',
          }}
        >
          <img src="/threshold/main_logo.svg" style={{ height: '2.25rem', alignSelf: 'center' }} />
        </div>
        <div id="spacer" style={{ width: '100%' }} />
        <div
          style={{
            display: 'grid',
            height: '100%',
          }}
        >
          <div id="header_buttons" style={{ alignSelf: 'center', marginRight: '4rem' }}>
            <Tabs large selectedTabId={'HOME'}>
              <Tab id="HOME" title="Home"></Tab>
              <Tab id="ABOUT" title="About"></Tab>
              <Tab id="BLOG" title="Blog"></Tab>
            </Tabs>
          </div>
        </div>
      </section>

      <div
        id="hero"
        style={{
          height: '31rem',
          display: 'grid',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            margin: '0 auto',
            color: 'white',
            maxWidth: '30rem',
          }}
        >
          <h1 style={{ fontFamily: 'terminal, monospace', fontSize: '2rem' }}>
            Get fast{' '}
            <em>
              <u>and</u>
            </em>{' '}
            high detail aerial photos
          </h1>
          <br />
          <h2
            style={{
              fontSize: '1.5rem',
            }}
          >
            Unleash the power of multi-UAV control software for faster, high detail aerial photographs
          </h2>
          <br />
          <br />
          <Button text="Book a free consultation" intent="primary" large />
        </div>
      </div>

      {/* <section id="hero"></section> */}

      <section id="problem_solution" style={{ backgroundColor: PRIMARY }}>
        <div
          style={{
            display: 'flex',
            maxWidth: '70rem',
            margin: '0 auto'
          }}
        >
          <div style={{ display: 'grid', width: '50%' }}>
            <iframe
              style={{ alignSelf: 'center', margin: '0 auto' }}
              data-ux="Embed"
              height={270}
              width={350}
              allowFullScreen
              frameBorder="0"
              src="//player.vimeo.com/video/835227969?h=ede8b80c29&amp;autoplay=0&amp;title=0&amp;portrait=0&amp;byline=0&amp;badge=0"
              data-aid="VIDEO_VIDEO_RENDERED0"
              // class=""
            ></iframe>
          </div>

          <div style={{ width: '50%', paddingTop: '3rem', paddingBottom: '3rem' }}>
            <p style={{ fontSize: '20px' }}>
              <strong>Single UAV photography trades speed for resolution.</strong> Drone operators need to understand
              what their client wants to accomplish with the photos, and then dial in flight settings that balance
              flight time, and photo quality. The result is usually the lowest quality for the fastest time, based on
              the drone operators estimate.
            </p>
            <br />

            <p style={{ fontSize: '18px' }}>
              <strong>The photos didn{"'"}t have the detail you needed.</strong> You needed photos of your field before
              an upcoming hail storm. You got the quote that fit your budget and time-frame but when you gave the photos
              to the insurance company, they couldn{"'"}t use them to adjust your claim.
            </p>
            <br />
            <p style={{ fontSize: '16px' }}>
              <strong>Never trade quality for speed again.</strong> Our drone control software enables multi-UAV
              photography. You will get the detail you need when you need it.
            </p>
          </div>
        </div>
      </section>

      <section id="benefits" style={{paddingBottom: '1rem'}}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            color: ACCENT,
            padding: '2rem',
          }}
        >
          The Threshold Advantage
        </h2>
        <div id="three_benifits" style={{ display: 'flex', gap: '1rem', maxWidth: '55rem', margin: '0 auto' }}>
          <div className="benifit">
            <Icon icon="repeat" size={45} />
            <br />
            <br />
            <h3>Easily do it again</h3>
            <br />
            <p>Reusable mission plans, so you can easily repeat the same photo session</p>
          </div>
          <div className="benifit">
            <Icon icon="fast-forward" size={45} />
            <br />
            <br />
            <h3>Rapid Photography</h3>
            <br />
            <p>Assign multiple UAVs to a mission to get it done faster, with the same detail</p>
          </div>
          <div className="benifit">
            <Icon icon="fork" size={45} />
            <br />
            <br />
            <h3>Faster Delivery</h3>
            <br />
            <p>Stitch and deliver the final orthomosaic photos in record time with our image processing pipeline</p>
          </div>
        </div>
      </section>

      <section
        id="social_proof"
        style={{
          backgroundColor: ACCENT,
          paddingBottom: '3rem',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            color: SECONDARY,
            padding: '2rem',
          }}
        >
          You{"'"}re ready for the next level.
        </h2>
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            color: SECONDARY,
            // padding: '2rem',
          }}
        >
          <strong>Industry leaders trust us to deliver the data they need, when they need it</strong>
        </p>
        <br />
        <br />
        <div
          className="business_logos"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            margin: '0 auto',
            width: 'fit-content',
          }}
        >
          <div style={{ display: 'flex', gap: '3rem' }}>
            <Image src="/threshold/decisive-farming.webp" alt="decisive farming logo" width={225} height={75} />
            <Image src="/threshold/Thrive-SV-Ventures.png" alt="thrive svg logo" width={255} height={75} />
            <Image src="/threshold/olds_header-logo.png" alt="alberta innovates logo" width={300} height={75} />
          </div>
          <div style={{ display: 'flex', gap: '3rem' }}>
            <Image src="/threshold/alberta_innovates.svg" alt="thrive svg" width={255} height={75} />
            <Image src="/threshold/nrc-irap.png" alt="thrive svg" width={255} height={75} />
            <Image src="/threshold/ABCatalyzer.png" alt="thrive svg" width={255} height={75} />
          </div>
        </div>
      </section>

      <section id="by_the_numbers"></section>
    </div>
  )
}

export default Page

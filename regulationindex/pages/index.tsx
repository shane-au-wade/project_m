import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager, InputGroup } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

import { Card, Button, Icon } from '@blueprintjs/core'

import { createUseStyles } from 'react-jss'

import React from 'react'

const useStyles = createUseStyles({
  main: {
    backgroundColor: '#F9E6D6',
    backgroundImage:
      'url(data:image/png;base64,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)',
    '& section': {
      maxWidth: '50rem',
      margin: '0 auto'
    },
  },
})

const Home: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <main className={classes.main}>
      <section id="header" style={{ padding: '1rem' }}>
        <div
          id="logo"
          style={{
            position: 'relative',
            width: '12rem',
            height: '5rem',
          }}
        >
          <div
            id="pipe"
            style={{
              background:
                'linear-gradient(to right, #8D7D90 , #B89CA5, #8D7D90, #B89CA5, #8D7D90 , #B89CA5, #8D7D90, #8D7D90 )',
              width: '100%',
              height: '100%',
              borderRadius: '7px',
              position: 'absolute',
              backgroundSize: '400% 400%',
              animation: 'gradient 10s ease infinite',
            }}
          />
          <div
            style={{
              height: '4.5rem',
              width: '4.5rem',
              top: '0.25rem',
              left: '3rem',
              backgroundColor: '#2F4858',
              borderRadius: '5rem',
              position: 'absolute',
              boxShadow: '-2px 0px 0px 0px  #FFFFFF',
            }}
          />
          <div
            style={{
              height: '0.5rem',
              width: '2rem',
              top: '2.2rem',
              left: '3.2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '5rem',
              position: 'absolute',
            }}
          />
        </div>
        <h1 style={{ width: '12rem', letterSpacing: '0.02rem' }}>-Regulation Index-</h1>
      </section>

      {/* why */}
      <section
        id="why?"
        style={{
          padding: '1.5rem',
        }}
      >
        <h1
          style={{
            margin: '0 auto',
          }}
        >
          AI needs to know the rules...
          <br />
          and we are here to help!
        </h1>
        <p>Regulation Index provides AI agents with the necessary industry-specific context to do real work.</p>
        <div>
          <Button minimal large outlined intent="primary" text="Learn More"></Button>
        </div>
        <br />
        <br />
        <div style={{ width: 'fit-content', margin: '0 auto' }}>
          <Image
            alt="engaging picture of a book"
            src="/robots_reading_x2.png"
            height={312}
            width={312}
            style={{
              borderRadius: '0.5rem',
              outline: '1px white solid',
            }}
          />
        </div>
      </section>

      {/* what */}
      <section
        id="what?"
        style={{
          padding: '1.5rem',
          position: 'relative',
        }}
      >
        <h2>Data Curation and Semantic Search</h2>
        <p>
          We are partnering with regulators and agencies to curate industry-specific knowledge and will then provide
          developers with an API to integrate into their agents.
        </p>
        <br />
        <div style={{ width: 'fit-content', margin: '0 auto' }}>
          <Image
            alt="engaging picture of a book"
            src="/books.png"
            height={312}
            width={312}
            style={{
              borderRadius: '0.5rem',
              outline: '1px white solid',
            }}
          />
        </div>
        <br />
        <h3>Initial Industries</h3>
        <p>Financial Accounting: FASB Accounting Standards Codification</p>
        <p>Construction: OSHA General Industry and Construction Standards</p>
        <br />
        <h3>What standards are you looking for?</h3>
        <InputGroup
          large
          placeholder="Industry standard or regulatory body"
          rightElement={<Button minimal icon="manually-entered-data" />}
        />
        <br />
        <Button text="Submit Suggestion" intent="primary" minimal outlined />
      </section>
      <br />

      {/* how: deep dive into data curation and api access */}
      <section
        id="call-to-action"
        style={{
          padding: '1.5rem',
        }}
      >
        <h2>API Inbound</h2>
        <p>Join the waitlist today and we will let you know when our first dataset is ready for work.</p>
        <InputGroup placeholder="Company*" large rightElement={<Button intent="primary" minimal />} />
        <br />
        <InputGroup placeholder="Your email" large rightElement={<Button intent="primary" minimal icon="envelope" />} />
        <br />
        <Button text="Sign me up" intent="primary" minimal outlined />
        <br />
        <sub>*Company is not required</sub>
      </section>

      <section
        id="call-to-action"
        style={{
          padding: '1.5rem',
        }}
      >
        <h2>Work with us!</h2>
        <p>If you are a regulatory body or agency, we want to work with you to create a safer future.</p>
        <InputGroup
          placeholder="Regulatory agency"
          large
          rightElement={<Button intent="primary" minimal icon="manual" />}
        />
        <br />
        <InputGroup placeholder="Your email" large rightElement={<Button intent="primary" minimal icon="envelope" />} />
        <br />
        <Button text="Submit" intent="primary" minimal outlined />
      </section>

      {/* Relevant news */}
      <section
        id="relevant-news"
        style={{
          padding: '1.5rem',
        }}
      >
        <h1>AI in the news</h1>
        <article style={{ width: '100%' }}>
          <a href="https://time.com/6278144/european-union-artificial-intelligence-regulation/">
            European Union Set to Be Trailblazer in Global Rush to Regulate Artificial Intelligence
          </a>
        </article>

        <br />
        <article style={{ width: '100%' }}>
          <a href="https://www.whitehouse.gov/ostp/ai-bill-of-rights/">
            Blueprint for an AI Bill of Rights: MAKING AUTOMATED SYSTEMS WORK FOR THE AMERICAN PEOPLE
          </a>
        </article>

        <br />
        <article style={{ width: '100%' }}>
          <a href="https://www.axios.com/2023/05/08/china-ai-regulation-race">
            China races ahead of U.S. on AI regulation
          </a>
        </article>

        <br />
        <article style={{ width: '100%' }}>
          <a href="https://www.reuters.com/technology/us-begins-study-possible-rules-regulate-ai-like-chatgpt-2023-04-11/">
            US begins study of possible rules to regulate AI like ChatGPT
          </a>
        </article>
      </section>
    </main>
  )
}

export default Home

import { Button } from '@blueprintjs/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import * as React from 'react'

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  main: {
    backgroundColor: '#F9E6D6',
    backgroundImage:
      'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W/Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip/ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==)',
    padding: '1rem',
    '& section': {
      maxWidth: '34rem',
      margin: '0 auto',
    },
    '& p': {
      marginTop: '1.5rem',
    },
  },
})

const Page: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <main className={classes.main}>
      <section
        id="header"
        style={{
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <h3>{'{RI}'}</h3>
        <Button
          minimal
          outlined
          intent="primary"
          text="Go Home"
          onClick={() => {
            router.push('/')
          }}
        />
        {/* <Button minimal outlined intent="primary" text="State of Affairs Today" /> */}
      </section>
      <div>
        <hr
          style={{
            maxWidth: '35rem',
            border: '1px floralwhite solid',
          }}
        />
      </div>

      <br />
      <section id="content" style={{}}>
        <h1>AI needs access to regulatory documents.</h1>

        <p>
          Artificially intelligent software systems that utilize text data to produce a series of outputs with the goal
          of completing a high-level task must have access to the related regulatory documentation of the domain of the
          high-level task.
        </p>
        <br />
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Image
            src="/robot_shaking_hand.png"
            width={'512'}
            height={'512'}
            alt="cyborg and robot shaking hands in agreement"
            style={{
              borderRadius: '0.5rem',
              border: '1px white solid',
              maxWidth: '20rem',
              maxHeight: '20rem',
            }}
          />
        </div>

        <p>That is dense, so lets unpack it.</p>
        <p>
          &quot;Artificially intelligent software systems&quot; refers to any software program powered by{' '}
          <a href="https://www.databricks.com/glossary/machine-learning-models">machine learning models</a>. I will call
          them &quot;models&quot; in the rest of the article. Models are trained on various datasets to effectively &quot;learn&quot; how to
          classify or predict. Humans learn in a similar way! We read, try, fail and learn. Eventually we figure out to
          complete the task at hand.
        </p>
        <p>
          Moving forward, I describe &quot;[AI systems] that utilize text data to produce a series of outputs&quot;, which refers
          to programs that attempt to string together calls to models. This could be thought of as &quot;planning&quot; or
          breaking down a problem into sub-components which can then be solved. In the software engineering world, this
          would be attached to the Agile process.
        </p>
        <p>
          I then state, &quot;with the goal of completing a high-level task&quot; which refers to the completion of an over
          arching goal, which is accomplished by the completion of sub tasks. This is like baking a cake! The goal is to
          bake a cake (and it should be tasty) so you need to find a recipe, read the recipe, travel to the store or get
          the ingredient delivered, find a baking tray, mix up the batter and BOOM! cake. My point is that high-level
          goals are complex and are composed of many small tasks.
        </p>
        <p>
          In summary, I am discussing any software system that uses machine learning models to effectively complete a
          high-level task. That is the &quot;who&quot;.
        </p>
        <p>
          I finish the sentence with, &quot;[they] must have access to the related regulatory documentation of the domain of
          the high-level task&quot;. This statement is a suggestion for AI regulation (the &quot;what&quot;). Essentially, it states
          that if an AI system is going to operate in a specific domain, then it must have access to the regulatory
          documents within that domain. Regulatory documents are the rules and standards that humans and human operated
          company&quot;s adhere to ensure the safety and well being of the of the human participants.
        </p>
        <br />
        <br />
        <h2>A case study on self-driving vehicles</h2>
        <p>high-level task: &quot;drive a car from point A to point B&quot;</p>
        <p>
          Does an autonoumous vehicle system string together calls to models? Definitely. Perception engineers work
          diligently to ensure import features in the driving scene are segmented and labeled for downstream algorithms.
          Things like drive-able surface, street signs, pedestrians, road obstacles and so forth. Planning engineers
          synthesize an optimal path based on the perceived digital model of the world and the control system executes
          the path to the best of it&quot;s abilities.
        </p>
        <p>An important caveat for the high level task: the vehicle must drive safely and legally.</p>
        <p>
          This is where the final statement comes into play. The self driving system must have access to regulatory
          information to complete the task safety and legally. The necessary regulatory information in this case is
          speed limits, understanding of traffic signs, understanding &quot;right of way&quot;, etc. Note that regulatory
          information often has a locale:{' '}
          <a href="https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/laws-and-rules-of-the-road/">
            California
          </a>
          likely has different laws than Texas for example.
        </p>
        <br />
        <br />
        <h2>Why does this matter?</h2>
        <p>
          The notion of &quot;AI Regulation&quot; or &quot;Regulation for AI&quot; is not new necessarily, but it has reached new heights
          recently. Never before has it been so easy for developers to integrate powerful machine learning models into
          their programs. AI powered tools are exploding onto the market today
        </p>
        <ul style={{ fontSize: '0.75rem' }}>
          {[
            'https://allthingsai.com/',
            'https://www.insidr.ai/ai-tools/',
            'https://www.synthesia.io/post/ai-tools',
            'https://www.producthunt.com/topics/artificial-intelligence',
            'https://www.palantir.com/offerings/defense/',
          ].map((link, index) => (
            <li key={index}>
              <a href="link">{link}</a>
            </li>
          ))}
        </ul>
        <p>
          With that said, Venture Capitalists and Technologists alike are most excited by the concept of &quot;Agents&quot;: fully
          autonomous programs that complete high-level objects. Here is a{' '}
          <a href="https://towardsdatascience.com/4-autonomous-ai-agents-you-need-to-know-d612a643fa92">
            Medium article
          </a>{' '}
          summerizing today&quot;s initiatives.
        </p>
        <p>
          further more, analysis on the google keyword planner suggests that the search frequency of &quot;ai for regulation&quot;
          keywords has increased dramatically over the past three months and year-over-year.
        </p>
        <br />
        <div
          style={{
            overflowX: 'auto',
            textAlign: 'center',
          }}
        >
          <Image
            src="/keyword_search.png"
            height={180}
            width={574}
            alt="screen shot from google keyword planner, keywords ai regulation and regulation for ai"
          />
        </div>
        <p></p>
        <p>
          For me, it is obvious.{' '}
          <strong>Agents need to know the rules if they are going to operate and influence the real world.</strong>
        </p>
      </section>
      <br />
      <div>
        <hr
          style={{
            maxWidth: '35rem',
            border: '1px floralwhite solid',
          }}
        />
      </div>
      <br />
      <section>
        <Image
          src="/ai_generated_shane_wade.png"
          height={100}
          width={100}
          alt="ai generated version of shane wade"
          style={{
            borderRadius: '50px',
            border: '1px white solid',
          }}
        />

        <h3>Written by Shane Wade</h3>
        <div>Founder, software engineer and AI mechanic</div>
        <br />
        <Button
          minimal
          outlined
          intent="primary"
          text="Go Home"
          onClick={() => {
            router.push('/')
          }}
        />
      </section>
      <br />
      <br />
    </main>
  )
}

export default Page

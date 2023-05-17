import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { Button, Dialog, DialogBody, DialogFooter, InputGroup } from '@blueprintjs/core'

import { createUseStyles } from 'react-jss'

import React from 'react'

import hljs from 'highlight.js'

const useStyles = createUseStyles({
  main: {
    backgroundColor: '#F9E6D6',
    backgroundImage:
      'url(data:image/png;base64,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)',
    '& section': {
      maxWidth: '45rem',
      margin: '0 auto',
    },
    '& p': {
      marginTop: '1rem',
    },
  },
})

const Article = (props: { title: String; href: String; image_url: String; description?: String }) => {
  const { title, href, image_url, description } = props
  return (
    <article
      style={{
        maxWidth: '18rem',
        padding: '1rem',
        background: 'floralWhite',
        borderRadius: '0.5rem',
      }}
    >
      <a
        href={href?.toString()}
        style={{
          color: 'black',
        }}
      >
        <h2>{title}</h2>
        <br />
        <img
          style={{
            maxWidth: '16rem',
          }}
          src={image_url?.toString()}
        ></img>
        <br />
        <br />
        <p>{description}</p>
      </a>
    </article>
  )
}

const Home: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()

  const [api_open, setApiOpen] = React.useState(false)

  // React.useEffect(() => {
  //   // if (api_open) return

  // }, [])

  return (
    <main className={classes.main}>
      <section id="header" style={{ padding: '1.5rem', paddingBottom: '0' }}>
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
        <br />
        <h1
          style={{
            fontSize: '2rem',
            // width: '12rem',
            letterSpacing: '0.02rem',
          }}
        >
          {'{'}Regulation Index{'}'}
        </h1>
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
          <Button
            minimal
            large
            outlined
            intent="primary"
            text="Learn More"
            onClick={() => {
              document.querySelector('a[href="#what"]')?.scrollIntoView()
            }}
          />
        </div>
        <br />
        <div>
          <Button
            minimal
            large
            outlined
            intent="primary"
            text="Read Our Thesis"
            onClick={() => {
              router.push('/thesis')
            }}
          />
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
      <a href="#what" />
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
        <div>
          <Button
            minimal
            large
            outlined
            intent="primary"
            text="Get In Touch"
            onClick={() => {
              document.querySelector('a[href="#call_to_action"]')?.scrollIntoView()
            }}
          />
        </div>

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
        <p>
          Financial Accounting: <a href="https://asc.fasb.org/Login">FASB Accounting Standards Codification</a>
        </p>
        <p style={{
          margin: '0'
        }}>
          Construction: <a href="https://www.osha.gov/laws-regs">OSHA General Industry and Construction Standards</a>
        </p>
        <br />
        <h3>What standards are you looking for?</h3>
        <br/>
        <div>
          <InputGroup
            large
            placeholder="Industry standard or regulatory body"
            rightElement={<Button minimal icon="manually-entered-data" />}
          />
        </div>

        <br />
        <Button large text="Submit Suggestion" intent="primary" minimal outlined />
      </section>
      <br />

      {/* how: deep dive into data curation and api access */}

      <a href="#call_to_action" />
      <section
        id="call_to_action"
        style={{
          padding: '1.5rem',
        }}
      >
        <h2>API Inbound</h2>
        <p>Join the waitlist today and we will let you know when our first dataset is ready for work.</p>
        <InputGroup placeholder="Company*" large rightElement={<Button intent="primary" minimal icon="manual" />} />
        <br />
        <InputGroup placeholder="Your email" large rightElement={<Button intent="primary" minimal icon="envelope" />} />
        <br />
        <Button large text="Sign me up" intent="primary" minimal outlined />
        <br />
        <sub>*Company is not required</sub>
        <br />
        <br />
        <Button
          large
          text="View Proposed API"
          intent="primary"
          minimal
          outlined
          onClick={() => {
            setApiOpen(true)
          }}
        />
        <Dialog
          className="api-docs"
          title="Proposed API"
          icon="code"
          isOpen={api_open}
          onOpening={() => {
            hljs.highlightAll()
          }}
          onClose={() => {
            setApiOpen(false)
          }}
        >
          <DialogBody>
            <h3>Search</h3>

            <pre>
              <code className="language-python">{`import regulationindex as ri

relevant_documents = ri.search(
  knowledge_base='fasb-revenue', 
  text='''
  what do I need to know to accurately 
  report reccuring revenue for a public company?
  '''
)

## insert relevant documents 
## into downstream  prompts
`}</code>
            </pre>
            <p style={{ maxWidth: '30rem' }}>
              The Search API is designed to enable developers to incorporate industry-specific knowledge into their AI
              systems or agents.
            </p>
            <p style={{ maxWidth: '30rem' }}>
              The Regulation Index will host and curate knowledge, as well as develop robust search algorithms, to
              ensure your agents have the necessary context they need to do real work.
            </p>
            <br />
            <h3>Suggestion</h3>
            <pre>
              <code className="language-python">{`import regulationindex as ri

relevant_knowledge_bases = ri.get_suggestion(
text='''
what do I need to know to accurately 
report reccuring revenue for a public company?
'''
)

## choose the best knowledge base
## based on your own criteria. 
## You can then search that 
## knowledge base for relevant documents
`}</code>
            </pre>
            <p style={{ maxWidth: '30rem' }}>
              The Suggestion API is designed to enable fully autonomous agents to select the most suitable knowledge
              bases for searching.
            </p>
            <p style={{ maxWidth: '30rem' }}>
              The knowledge base suggestion will function similarly to the search endpoint. However, this time we will
              curate metadata about each knowledge base to provide the agent with a high-quality selection.
            </p>
            <p style={{ maxWidth: '30rem' }}>
              Once a knowledge base is selected, it can be searched with the search API.{' '}
            </p>
          </DialogBody>
          <DialogFooter
            actions={
              <Button
                intent="primary"
                text="Close"
                onClick={() => {
                  setApiOpen(false)
                }}
              />
            }
          />
        </Dialog>
      </section>

      <section
        id="call_to_action"
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
        <Button large text="Submit" intent="primary" minimal outlined />
      </section>

      {/* Relevant news */}
      <section
        id="relevant-news"
        style={{
          padding: '1.5rem',
        }}
      >
        <h1>AI in the news</h1>
        <br />

        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Article
            title="European Union Set to Be Trailblazer in Global Rush to Regulate Artificial Intelligence"
            href="https://time.com/6278144/european-union-artificial-intelligence-regulation/"
            image_url="https://api.time.com/wp-content/uploads/2023/05/eu-ai-regulation.jpg?quality=85&w=1200&h=628&crop=1"
            description="The EU’s AI Act could become the de facto global standard for artificial intelligence"
          />

          <Article
            title="China races ahead of U.S. on AI regulation"
            href="https://www.axios.com/2023/05/08/china-ai-regulation-race"
            image_url="https://images.axios.com/AR1bnvnsrPBO03X4afV1YXh5CFU=/0x0:1920x1080/1366x768/2023/05/07/1683501144945.jpg"
            description="Beijing sees strong rules for AI as a prerequisite for winning public acceptance of the new technology."
          />

          <Article
            title="Blueprint for an AI Bill of Rights: MAKING AUTOMATED SYSTEMS WORK FOR THE AMERICAN PEOPLE"
            href="https://www.whitehouse.gov/ostp/ai-bill-of-rights/"
            image_url="https://www.whitehouse.gov/wp-content/uploads/2021/01/wh_social-share.png"
            description="Among the great challenges posed to democracy today is the use of technology, data, and automated systems in ways that threaten the rights of the American public. Too often, these tools are used to limit our opportunities and prevent our access to critical resources or services. These problems are w..."
          />

          <Article
            title="US begins study of possible rules to regulate AI like ChatGPT"
            href="https://www.reuters.com/technology/us-begins-study-possible-rules-regulate-ai-like-chatgpt-2023-04-11/"
            image_url="https://www.reuters.com/resizer/eq7peIfJ2izv3zZL0r303UA9MWk=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/TCVJ74GY5ZMBTAWYYNPPHM35EY.jpg"
            description="The Biden administration said Tuesday it is seeking public comments on potential accountability measures for artificial intelligence (AI) systems as questions loom about its impact on national security and education."
          />
        </section>

        {/* <Button
          icon="lab-test"
          onClick={() => {
            fetch('/api/get_open_graph_info').then((res) => {
              console.log(res)
              console.log(
                res.json().then((json) => {
                  console.log(json)
                })
              )
            })
          }}
        /> */}
      </section>
      <div
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <section
          id="footer"
          style={{
            backgroundColor: 'floralwhite',
            height: '2rem',
            borderRadius: '0.5rem 0.5rem 0 0',
            boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
            padding: '0.2rem',
            paddingLeft: '1rem',
          }}
        >
          <sub>
            <strong>{'@Regulation Index'}</strong> all rights reserved |{' '}
            <a target="_blank" href="https://www.linkedin.com/in/shane-au-wade/">
              linkedin
            </a>{' '}
          </sub>
        </section>
      </div>
    </main>
  )
}

export default Home

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

import { Card, Button, Icon } from '@blueprintjs/core'

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  app: {
    backgroundImage: 'linear-gradient(whitesmoke, white)',
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
    flexWrap: 'wrap',
  },
  card: {
    flex: 'grow',
    width: '300px',
    height: '300px',
    margin: '20px',
  },
})

type HomePageCard = {
  title: string
  href: string
  icon: string
}

const projects = [
  {
    title: 'My electric longboard jounrey',
    href: '',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaXAPCjl-Svlvw1HcLY_XvXbRGtEWu2HWo5ruRqHHqNPbv3-ooRGcCEB0Rz_99F4gzifbG85tsi8ye-cW8e4MOnK9H-kEcaHK1NFOnKlHkLHlcQ_97bcZKtJrc3jCbTIvuO8cqw9wdTq0-uHQq0gzWd5=w1716-h1145-s-no?authuser=1',
    description:
      'Electric longboards are the closest thing that we have to hoverboards.  I rode my boards everywhere and met some very interesting people along the way.',
  },
  {
    title: 'Electric bikes',
    href: '',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaU3vl-7x6HDbJ0zeAGizM1xbIpwzcjn_UKGJKdgpkHBTXyJPScCLOECWLnzGLaD-I0D8oDaLwbROEgLz1nPd7f3pTlYs8_CcMQBVh8ODwtzpBvIt1UxZRpJf3UYdQjoHqAcyLg_kA-aYBwdFYCkn-RV=w1716-h1287-s-no?authuser=1',
    description: "Maybe you do want mechanical brakes when you're bombing a hill?",
  },
  {
    title: 'The electric motorcycle failure',
    href: '',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaWtaVFW3u_f1A4lv88M8mOE4v9yXGz7O9IsI4_H44minjvQFXSKn-ZRcYJkDrj8Yl31yWzwVgMcdscgzlTAgAbUzcH8KOGWBBkArzz8BBwqfEm9kCIXNz7ywGwkWiX4xiFRdrervDnwA2rSUB7fR4l7=w1716-h1287-s-no?authuser=1',
    description: 'Of course I had to keep my electric vehicle journey going, the obvious next step was a motorcycle',
  },
  {
    title: 'The 2 stroke pivot: vintage mopeds',
    href: '',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaXgnFm-1mhCsLEmuDVs-Ydqo8FtzLgBr4U6nET8D7mBBc0BBk3lkq7JGjD0NKVpRcmIwt9VCbIFQ5dtR0Pz4UUxrVFCLYK7fmfcyNLbx_RyC6Grugbv4MDqBzfW1mBCrYtBwpvVaaTDhk2S-ZItG3g4=w1716-h1287-s-no?authuser=1',
    description:
      "I learned a few good lessons from the electric motorcycle project.  I wasn't ready to give up on my two-wheel-dreams so I pivoted to 2-stroke mopeds. *BRAAAAPPPPPP",
  },
  {
    title: 'Bob Ross Night!',
    href: '',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaXRXH2M4Nu9FB0Q6sLxgtGPhHokDaPoV8KxBtfxhg0otSZZXODsgJoXXuNZSeWUpkkv0uWn0X0s9_fTAaEBS0elhzOy5v0ZqecW9uspbnpX-l14bLjvV-6RNClyaZs0PM-bFaoeaNFKiYYMa8vfPTP8=w640-h480-s-no?authuser=1',
    description: "We're going to need a bigger easel...",
  },
  {
    title: 'AI Auction House',
    href: '',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaVm4zsTNb00v1dGJqt7T-fqps2PGBc3arQ0ihKTY8ulA0WnFtS_6k-nu2Myhhb6If-9-yZH1hSLQLvrLkxbgD9sHTHEO_4kVRs8nZWMP6fpLOQoq9O2FJ_djUMmghBsQD3X6GSvg5sbpgPoeUpU2dKX=w512-h512-s-no?authuser=1',
    description: 'An intro experience to the monetization of generative AI',
  },
].reverse()

const blog_posts = [
  {
    title: 'The Power of Structured Thinking',
    href: 'https://www.linkedin.com/pulse/power-structured-thinking-shane-wade',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaXAu-r690ZcPAMLxJ0flbCGHjkbwnp73wFL7F2KGkm8qrPaTLJLf9N8BUSdqTK6OvQlhvp_3Jc4S7p_hHq9WfmI4VxeRCRncM8RAgVxUKn9-RssbxOz6Z5Gf69hC7YNijtreOdtRq8YeWzEHsRiQ-Xs=w512-h512-s-no?authuser=1',
    description:
      'Senior vs Junior? In the workforce, the distinction between a Senior and Junior employee often lies in their experience and the way they approach problem-solving. Senior employees have developed structured thinking patterns that help them navigate complex situations with ease.',
  },
  {
    title: 'I Nuked Our Production Database... And Lived to Tell the Tale',
    href: 'https://www.linkedin.com/pulse/i-nuked-our-production-database-lived-tell-tale-shane-wade',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaUfGE7arrMw321hyLPjxb0CCLxwh_0na-dge1L3PzqaklF6sF_NUQ5_rBRI2ckpyjYAsEOrsPrpndiMXesITN_rUhbijHBKYt1SySw44w09mi8boqvIQsPFDjzfPwVIkQKwMZWqEXhnT8QVpD61kgE2=w512-h512-s-no?authuser=1',
    description: 'It was a dark and stormy night..',
  },
]

const blog_post_ideas = [
  {
    title: 'How technology evolves: a case study on bicycles',
    description:
      'An article that aims to understand the mechanisms of iterative innovation, understood through the humble bicycle',
  },
  {
    title: 'Bikepacking: an engineers approach',
    description:
      'A fun write up on my experience getting into bikepacking: building bikes, riding, modifying, choosing equipment, etc',
  },
  {
    title: "AI hasn't taken over yet... but whats stopping it?",
    description:
      'A discussion about my experience building an LLM powered product and the current technical hurdles associated with it',
  },
  {
    title: 'Hardware vs Software, which one is for me?',
    description:
      'A chat about my understand of the two discipliones and why you should consider NOT following your passion',
  },
  {
    title: 'Case Study: Shane Here',
    description:
      'Shane Here is an incredibly talented American engineer/youtuber.  He is peak engineer/maker and I think thats worth talking about',
  },
]

const Home: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.app}>
      <div style={{ width: '100%', textAlign: 'center', padding: '1rem' }}>
        <Image
          src={'/profile_pic.jpeg'}
          alt="profile picture of shane wade"
          width={300}
          height={300}
          style={{
            padding: '.10rem',
            height: '15rem',
            width: '15rem',
            borderRadius: '.5rem',
            boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
          }}
        />
        <br />
        <br />
        <h1
          style={{
            fontSize: '1.25rem',
            maxWidth: '34rem',
            margin: '0 auto',
          }}
        >
          Hello 👋 I&lsquo;m Shane Wade, a software engineer and AI mechanic 🔧 🤖 that loves bicycles and building
          products
        </h1>
        <br />
        <h3>Feel free to reach out for a chat!</h3>
        <br />
        <div
          style={{
            display: 'flex',
            margin: '0 auto',
            width: 'fit-content',
            gap: '1rem',
          }}
        >
          <a href="https://www.linkedin.com/in/shane-au-wade" target="_blank">
            <Image
              src="/linkedin.svg"
              alt="linkedin social media icon"
              width={50}
              height={50}
              style={{
                width: '2.5rem',
                height: 'auto',
              }}
            />
          </a>

          <a href="https://github.com/shane-au-wade" target="_blank">
            <Image
              src="/github-mark.svg"
              alt="github octocat icon"
              width={50}
              height={50}
              style={{
                width: '2.5rem',
                height: 'auto',
              }}
            />
          </a>
        </div>
      </div>

      {/* page content container  */}
      <div style={{ padding: '1rem' }}>
        <h2 style={{ marginTop: '0' }}>Products</h2>
        <br />
        <section style={{padding: '1rem'}}>
          <Card
            style={{
              maxWidth: '25rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Image
              src="/low_poly_torch.png"
              alt="immigration gpt torch logo"
              height={112}
              width={112}
              style={{
                height: '8rem',
                width: '8rem',
                margin: '0 auto',
              }}
            />
            <br />
            <h3>
              <a href="https://immigrationlaw.chat/" target="_blank">
                ImmigrationGPT
              </a>
            </h3>
            <p>An AI for your US immigration questions</p>
            <br />
            <summary style={{ textAlign: 'left' }}>
              <p>
                I built this LLM powered product with two other engineers in about a month. This product is intended to
                provide actionable advice and answers to your immigration questions.
              </p>
              <p>
                Built with <a href="https://www.linkedin.com/in/phillip-haeusler/">Phillip Haeusler</a> and{' '}
                <a href="https://www.linkedin.com/in/sepehrard/">Sepehr Ardebilianfard</a>
              </p>
            </summary>
          </Card>
        </section>

        <br />
        {/* Blog Posts */}
        <h2>Blog Posts</h2>
        <section style={{ display: 'flex', gap: '1rem', overflowY: 'auto', padding: '2rem' }}>
          {blog_posts.map((post, index) => (
            <Card
              key={index}
              interactive
              onClick={() => {
                window.open(post.href, '_blank')
              }}
              style={{
                maxWidth: '25rem',
                textAlign: 'center',
              }}
            >
              <img
                alt={`${post.title}, main image`}
                src={post.image}
                style={{ height: '15rem', borderRadius: '7px' }}
              />
              <br />
              <br />
              <summary style={{ textAlign: 'left' }}>
                <h3>{post.title}</h3>
                <br />
                <p>{post.description}</p>
              </summary>
            </Card>
          ))}
        </section>
        <br />

        {/* Projects */}
        <h2>Projects</h2>
        <section style={{ display: 'flex', gap: '1rem', overflowY: 'auto', padding: '2rem' }}>
          {projects.map((post, index) => (
            <Card
              key={index}
              interactive
              onClick={() => {
                window.open(post.href, '_blank')
              }}
              style={{
                maxWidth: '25rem',
                textAlign: 'center',
              }}
            >
              <img alt={`${post.title}, main image`} src={post.image} style={{ width: '15rem', borderRadius: '7px' }} />
              <br />
              <br />
              <summary style={{ textAlign: 'left' }}>
                <h3>{post.title}</h3>
                <br />
                <p>{post.description}</p>
              </summary>
            </Card>
          ))}
        </section>
        <br />

        {/* prototypes */}
        <h2>Prototypes</h2>
        <section style={{ display: 'flex', gap: '1rem', overflowY: 'auto', padding: '2rem' }}>
          <Card
            style={{
              maxWidth: '25rem',
              textAlign: 'center',
              minWidth: '18rem',
            }}
          >
            {/* <img alt={`${post.title}, main image`} src={post.image} style={{ width: '15rem', borderRadius: '7px' }} /> */}
            <summary style={{ textAlign: 'left' }}>
              <h3>Do Work Faster (w/ AI)</h3>
              <br />
              <p>
                AI hustlers are already puting ChatGPT to work. They are opening up a few browser windows and flexing
                their &quot;copy & paste&quot; skills
              </p>
              <p>Why are these tools so spread out?</p>
              <p>What if there was a single portal that brought your work + generative AI tools together.</p>
            </summary>
            <br />
            <figure
              style={{
                outline: '1px gray solid',
                borderRadius: '7px',
                padding: '7px',
                backgroundColor: 'whitesmoke',
                width: '100%',
                margin: 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  marginBottom: '7px',
                }}
              >
                <div style={{ background: 'green', height: '10px', width: '10px', borderRadius: '10px' }} />
                <div style={{ background: 'orange', height: '10px', width: '10px', borderRadius: '10px' }} />
                <div style={{ background: 'red', height: '10px', width: '10px', borderRadius: '10px' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'lightgray',
                    height: '10rem',
                    width: '50%',
                    borderRadius: '7px',
                    display: 'grid',
                  }}
                >
                  <strong
                    style={{
                      alignSelf: 'center',
                    }}
                  >
                    Your Work
                  </strong>
                </div>
                <div style={{ width: '7px' }} />
                <div
                  style={{
                    backgroundColor: 'lightblue',
                    height: '10rem',
                    width: '50%',
                    borderRadius: '7px',
                    display: 'grid',
                  }}
                >
                  <strong
                    style={{
                      alignSelf: 'center',
                    }}
                  >
                    Your AI Tools
                  </strong>
                </div>
              </div>
            </figure>
            <br />
            <Button
              text="Check it out"
              intent="primary"
              onClick={() => {
                router.push('/doworkfaster')
              }}
            ></Button>
          </Card>
          <Card
            style={{
              maxWidth: '25rem',
              minWidth: '18rem',
              textAlign: 'center',
            }}
          >
            <summary style={{ textAlign: 'left' }}>
              <h3>SF Bike Lane Viz</h3>
              <span
                style={{
                  color: 'darkgreen',
                }}
              >
                ___
              </span>
              <Icon icon="cycle" />
              <span
                style={{
                  color: 'darkgreen',
                }}
              >
                ______________
              </span>
              <br />
              <br />
              <p>
                I love bikes. I think they are wonderful peices of engineering and I think they are an excellent option
                for the sustainable commuter.
              </p>
              <p>
                I&lsquo;ve had the opportunity to chat with many people about bike commuting and their main concerns are
                safety and time.
              </p>
              <p>
                A significant component of bike safety is the bike infrastructure in a city. I pulled bike lane and
                collision data from the city of San Francsico to understand where the problems are on the streets that I
                ride.
              </p>
            </summary>
            <br />
            <Button
              text="View Collisions"
              intent="primary"
              onClick={() => {
                router.push('/bikeLanes')
              }}
            />
          </Card>
          <Card
            style={{
              maxWidth: '25rem',
              minWidth: '18rem',
              textAlign: 'center',
            }}
          >
            <summary style={{ textAlign: 'left' }}>
              <h3>Typing Test</h3>
              <br />
              <p>
                I&apos;ve always enjoyed mechanical keyboards and the experience they provide when typing. I really
                enjoyed the typing tests that I found online like{' '}
                <a href="https://10fastfingers.com/typing-test/english">10 Fast Fingers</a> and{' '}
                <a href="https://play.typeracer.com/">Type Racer</a> so I decided to make my own typing test.
              </p>
            </summary>
            <br />
            <figure
              style={{
                outline: '1px solid gray',
                width: '15rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                fontSize: '1.25rem',
              }}
            >
              <div
                style={{
                  color: 'darkgreen',
                  padding: '0.5rem',
                }}
              >
                the
              </div>
              <div
                style={{
                  color: 'darkgreen',
                  padding: '0.5rem',
                }}
              >
                quick
              </div>
              <div
                style={{
                  color: 'darkred',
                  padding: '0.5rem',
                }}
              >
                brown
              </div>
              <div
                style={{
                  color: 'darkgreen',
                  padding: '0.5rem',
                }}
              >
                fox
              </div>
              <div
                style={{
                  background: 'lightgray',
                  padding: '0.5rem',
                  borderRadius: '7px',
                }}
              >
                jumped
              </div>
              <div style={{ padding: '0.5rem' }}>over</div>
              <div
                style={{
                  padding: '0.5rem',
                }}
              >
                the
              </div>

              <div
                style={{
                  padding: '0.5rem',
                }}
              >
                lazy
              </div>
              <div
                style={{
                  padding: '0.5rem',
                }}
              >
                dog
              </div>
            </figure>
            <br />
            <Button
              text="What is your WPM?"
              intent="primary"
              onClick={() => {
                router.push('/typingTest')
              }}
            />
          </Card>
        </section>

        {/* <h2>Recommendations</h2> */}
        {/* <h2>Experience</h2> */}
      </div>
    </div>
  )
}

export default Home

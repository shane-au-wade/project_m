import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

import { Card, Button } from '@blueprintjs/core'

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  app: {},
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

const cardData: Array<HomePageCard> = [
  {
    title: 'about',
    href: '/about',
    icon: 'bookmark',
  },
  {
    title: 'Typing Test',
    href: '/typingTest',
    icon: 'citation',
  },
  {
    title: 'Animation',
    href: '/animation',
    icon: 'draw',
  },
  {
    title: 'SF Bike Lanes',
    href: '/bikeLanes',
    icon: 'cycle',
  },
]

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
]

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
        <h1>Shane Wade</h1>
        <p>Engineer and AI Mechanic 🔧 🤖</p>
        <br />
        <a href="https://www.linkedin.com/in/shane-au-wade/" target="_blank">
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
      </div>

      <div style={{ padding: '1rem' }}>
        <h2>Blog Posts</h2>
        <section style={{ display: 'flex', gap: '1rem', overflowY: 'auto', padding: '1rem' }}>
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
              <summary style={{ textAlign: 'left' }}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </summary>
            </Card>
          ))}
        </section>

        <h2>Projects</h2>
        <section style={{ display: 'flex', gap: '1rem', overflowY: 'auto', padding: '1rem' }}>
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
              <img
                alt={`${post.title}, main image`}
                src={post.image}
                style={{ height: '15rem', borderRadius: '7px' }}
              />
              <summary style={{ textAlign: 'left' }}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </summary>
            </Card>
          ))}
        </section>
        <h2>Prototypes</h2>
        <h2>Products</h2>
        <a>ImmigrationGPT</a>
        <h2>Recommendations</h2>
        <h2>Experience</h2>
      </div>

      <div className={classes.cardContainer}>
        <div id="test" className={classes.cardContainerRow}>
          {cardData.map((card, index) => {
            return (
              <Card
                className={classes.card}
                interactive={true}
                key={index}
                onClick={() => {
                  router.push(card.href)
                }}
              >
                <Button minimal large text={card.title} icon={card.icon} />
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home

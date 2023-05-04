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
  { title: 'My electric longboards', href: '' },
  { title: 'My electric bikes', href: '' },
  { title: 'The electric motorcycle failure', href: '' },
  { title: 'The 2 stroke pivot: vintage mopeds', href: '' },
  { title: 'Bob Ross Night!', href: '' },
  { title: 'AI Auction House', href: '' },
]

const blog_posts = [
  {
    title: 'The Power of Structured Thinking',
    href: 'https://www.linkedin.com/pulse/power-structured-thinking-shane-wade',
    image:
      'https://media.licdn.com/dms/image/D5612AQEv9w9j_c-mJA/article-cover_image-shrink_600_2000/0/1682483156602?e=2147483647&v=beta&t=5i71NgCWhmhkUlFi-pQIhU7Y6V_UhmmMwS0lIz1CKEY',
    description:
      'Senior vs Junior? In the workforce, the distinction between a Senior and Junior employee often lies in their experience and the way they approach problem-solving. Senior employees have developed structured thinking patterns that help them navigate complex situations with ease.',
  },
  {
    title: 'I Nuked Our Production Database... And Lived to Tell the Tale',
    href: 'https://www.linkedin.com/pulse/i-nuked-our-production-database-lived-tell-tale-shane-wade',
    image:
      'https://media.licdn.com/dms/image/D5612AQGSZLVUPoOW_w/article-cover_image-shrink_600_2000/0/1681241234495?e=2147483647&v=beta&t=wwDtEj7KIEAG9e4JZxNLVHwvtweKWwu7sU4Ng_kWmqg',
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
          width={1}
          height={1}
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
            width={1}
            height={1}
            style={{
              width: '2.5rem',
              height: 'auto',
            }}
          />
        </a>
      </div>
      <div style={{ padding: '1rem' }}>
        <h2>Blog Posts</h2>
        <section style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap' }}>
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
        <section>
          <img src="https://lh3.googleusercontent.com/pw/AJFCJaWtaVFW3u_f1A4lv88M8mOE4v9yXGz7O9IsI4_H44minjvQFXSKn-ZRcYJkDrj8Yl31yWzwVgMcdscgzlTAgAbUzcH8KOGWBBkArzz8BBwqfEm9kCIXNz7ywGwkWiX4xiFRdrervDnwA2rSUB7fR4l7=w1716-h1287-s-no?authuser=0"></img>
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

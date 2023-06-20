import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

import { Card, Button, Icon, Tag } from '@blueprintjs/core'

import { createUseStyles } from 'react-jss'

import React from 'react'

import InProgress from '../public/components/inProgress'

const useStyles = createUseStyles({
  app: {
    backgroundColor: '#F9E6D6',
    backgroundImage:
      'url(data:image/png;base64,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)',
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
    href: '/projects/eSk8',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaXAPCjl-Svlvw1HcLY_XvXbRGtEWu2HWo5ruRqHHqNPbv3-ooRGcCEB0Rz_99F4gzifbG85tsi8ye-cW8e4MOnK9H-kEcaHK1NFOnKlHkLHlcQ_97bcZKtJrc3jCbTIvuO8cqw9wdTq0-uHQq0gzWd5=w1716-h1145-s-no?authuser=1',
    description:
      'Electric longboards are the closest thing that we have to hoverboards.  I rode my boards everywhere and met some very interesting people along the way.',
  },
  {
    title: 'Electric bikes',
    href: '/projects/eBikes',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaU3vl-7x6HDbJ0zeAGizM1xbIpwzcjn_UKGJKdgpkHBTXyJPScCLOECWLnzGLaD-I0D8oDaLwbROEgLz1nPd7f3pTlYs8_CcMQBVh8ODwtzpBvIt1UxZRpJf3UYdQjoHqAcyLg_kA-aYBwdFYCkn-RV=w1716-h1287-s-no?authuser=1',
    description: "Maybe you do want mechanical brakes when you're bombing a hill?",
  },
  {
    title: 'The electric motorcycle failure',
    href: '/projects/eMotoL',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaWtaVFW3u_f1A4lv88M8mOE4v9yXGz7O9IsI4_H44minjvQFXSKn-ZRcYJkDrj8Yl31yWzwVgMcdscgzlTAgAbUzcH8KOGWBBkArzz8BBwqfEm9kCIXNz7ywGwkWiX4xiFRdrervDnwA2rSUB7fR4l7=w1716-h1287-s-no?authuser=1',
    description: 'Of course I had to keep my electric vehicle journey going, the obvious next step was a motorcycle',
  },
  {
    title: 'The 2 stroke pivot: vintage mopeds',
    href: '/projects/vintageMopeds',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaXgnFm-1mhCsLEmuDVs-Ydqo8FtzLgBr4U6nET8D7mBBc0BBk3lkq7JGjD0NKVpRcmIwt9VCbIFQ5dtR0Pz4UUxrVFCLYK7fmfcyNLbx_RyC6Grugbv4MDqBzfW1mBCrYtBwpvVaaTDhk2S-ZItG3g4=w1716-h1287-s-no?authuser=1',
    description:
      "I learned a few good lessons from the electric motorcycle project.  I wasn't ready to give up on my two-wheel-dreams so I pivoted to 2-stroke mopeds. *BRAAAAPPPPPP",
  },
  {
    title: 'Bob Ross Night!',
    href: '/projects/bobRoss',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaXRXH2M4Nu9FB0Q6sLxgtGPhHokDaPoV8KxBtfxhg0otSZZXODsgJoXXuNZSeWUpkkv0uWn0X0s9_fTAaEBS0elhzOy5v0ZqecW9uspbnpX-l14bLjvV-6RNClyaZs0PM-bFaoeaNFKiYYMa8vfPTP8=w640-h480-s-no?authuser=1',
    description: "We're going to need a bigger easel...",
  },
  {
    title: 'AI Auction House',
    href: '/projects/AAH',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaVm4zsTNb00v1dGJqt7T-fqps2PGBc3arQ0ihKTY8ulA0WnFtS_6k-nu2Myhhb6If-9-yZH1hSLQLvrLkxbgD9sHTHEO_4kVRs8nZWMP6fpLOQoq9O2FJ_djUMmghBsQD3X6GSvg5sbpgPoeUpU2dKX=w512-h512-s-no?authuser=1',
    description: 'An intro experience to the monetization of generative AI',
  },
].reverse()

const blog_posts = [
  {
    title: 'AI After Hours - #TechWeek write up',
    href: 'https://www.linkedin.com/pulse/ai-after-hours-techweek-write-up-shane-wade/?trackingId=wwUFNJyIQKOOqVr962xrfA%3D%3D',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaX5AqAaDsHt6PbfvwnzVgE8Ws3pU1S-AD46L75iESErpurGNpNGFRovvUrBK646D1a4NkrqLg9tYXpZ1ePHyHD04mgrMO3eS0trRkgC9JAwNBg9ZLhl1pSgzTwoUrzLsOoEXhjXxOmNPnCv3Md7Yfup=w1300-h1296-s-no?authuser=1',
    description:
      "Yesterday, Bloomberg Beta hosted their AI After Hours event. The venue was Bloomberg's high rise office space, complete with light snacks and some delicious kombucha floats: sorbet with kombucha, like the original rootbeer float.",
  },
  {
    title: 'Side Hustle Sunday Part 1',
    href: 'https://www.linkedin.com/pulse/side-hustle-sunday-part-1-shane-wade/',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaXvELKJXoU4hfTu_2QnU49WDMxCszgomTEg1EssruJJzr17LjVK_IgE_y5bskqxqZ1yNr0uxS4hV44RJcvQuvXDCVYfAE-oGjDGg7VbHJ6OopvO0yjJJdfFnk3UYII6rOQhsk4X2VUTApyFk-fbbpn-=w1296-h1296-s-no?authuser=1',
    description:
      "Selling digital seamless patterns If you haven't see the copious 'AI Side Hustles' on the internet then..",
  },
  {
    title: "Creative Space That's all you",
    href: 'https://www.linkedin.com/pulse/creative-space-thats-all-you-shane-wade/',
    image:
      'https://lh3.googleusercontent.com/pw/AJFCJaWBEb-wDIVQzFFOVdAmudIXCj8qOrjaWPkAxZB4OZE94oqVaqVZucP-A3IXz92ymOaf93pucXdZuD--FKps__2Tr42WdULHOewlBMpija8h1uQNNiGo3cWsmytYE5HjdjgFVHi2TtIhFC0dnqZZd1g_=w1024-h1024-s-no?authuser=1',
    description: 'Unleash Your Digital Identity: Crafting a Personal Website that Tells Your Unique Story',
  },
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

  // const products_ref = React.useRef()
  const blogs_ref = React.useRef<HTMLElement | null>(null)
  const projects_ref = React.useRef<HTMLElement | null>(null)
  const prototypes_ref = React.useRef<HTMLElement | null>(null)

  React.useLayoutEffect(() => {
    if (!blogs_ref.current) return
    if (!prototypes_ref.current) return
    if (!projects_ref.current) return

    let blogs_ref_init = true
    let projects_ref_init = true
    let prototypes_ref_init = true

    const blogs_observer = new IntersectionObserver(
      () => {
        if (!blogs_ref.current) return
        if (blogs_ref_init) {
          blogs_ref_init = false
          return
        }

        blogs_ref.current.scrollTo(150, 0)
        setTimeout(() => {
          if (!blogs_ref.current) return
          blogs_ref.current.scrollTo(0, 0)
          blogs_observer.unobserve(blogs_ref.current)
        }, 500)
      },
      {
        threshold: 0.75,
      }
    )

    const projects_observer = new IntersectionObserver(
      () => {
        if (!projects_ref.current) return
        if (projects_ref_init) {
          projects_ref_init = false
          return
        }
        projects_ref.current.scrollTo(150, 0)
        setTimeout(() => {
          if (!projects_ref.current) return
          projects_ref.current.scrollTo(0, 0)
          projects_observer.unobserve(projects_ref.current)
        }, 500)
      },
      {
        threshold: 0.75,
      }
    )

    const prototypes_observer = new IntersectionObserver(
      () => {
        if (!prototypes_ref.current) return
        if (prototypes_ref_init) {
          prototypes_ref_init = false
          return
        }

        prototypes_ref.current.scrollTo(150, 0)
        setTimeout(() => {
          if (!prototypes_ref.current) return
          prototypes_ref.current.scrollTo(0, 0)
          prototypes_observer.unobserve(prototypes_ref.current)
        }, 500)
      },
      {
        threshold: 0.75,
      }
    )

    blogs_observer.observe(blogs_ref.current)
    projects_observer.observe(projects_ref.current)
    prototypes_observer.observe(prototypes_ref.current)

    return () => {
      if (!blogs_ref.current) return
      if (!prototypes_ref.current) return
      if (!projects_ref.current) return
      blogs_observer.unobserve(blogs_ref.current)
      projects_observer.unobserve(projects_ref.current)
      prototypes_observer.unobserve(prototypes_ref.current)
    }
  }, [blogs_ref, projects_ref, prototypes_ref])

  return (
    <div className={classes.app}>
      <div style={{ width: '100%', textAlign: 'center', padding: '1rem' }}>
        <Image
          src={'/profile_pic.jpeg'}
          alt="profile picture of shane wade"
          priority
          width={300}
          height={300}
          style={{
            padding: '.10rem',
            height: '15rem',
            width: '15rem',
            borderRadius: '.5rem',
            animation: 'opacityFadeIn 2.5s ease-out',
          }}
        />
        <br />
        <br />
        <h1
          style={{
            fontSize: '1.25rem',
            maxWidth: '34rem',
            margin: '0 auto',
            animation: 'textFadeIn 2s ease-out',
          }}
        >
          Hello 👋
        </h1>
        <br />
        <h1
          style={{
            fontSize: '1.25rem',
            maxWidth: '36rem',
            margin: '0 auto',
            animation: 'textFadeIn 4.5s ease-out',
          }}
        >
          I&lsquo;m Shane Wade, a software engineer and AI mechanic 🔧 🤖
        </h1>
        <h1
          style={{
            fontSize: '1.25rem',
            maxWidth: '34rem',
            margin: '0 auto',
            animation: 'textFadeIn 5s ease-out',
          }}
        >
          I love bicycles and building products
        </h1>
        <br />
        <h3
          style={{
            animation: 'textFadeIn 5.5s ease-out',
          }}
        >
          Feel free to reach out for a chat!
        </h3>
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
      <div style={{ padding: '0rem', maxWidth: '80rem', margin: 'auto' }}>
        <h2 style={{ marginTop: '0' }}>Current Projects</h2>
        <br />
        <section style={{ padding: '1rem', display: 'flex', gap: '1rem', overflowX: 'auto' }}>
          <Card
            elevation={1}
            style={{
              maxWidth: '25rem',
              minWidth: '20rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              <Tag intent="primary">Ideation</Tag>
              <Tag intent="primary">Validation</Tag>
              <Tag intent="none">Prototype</Tag>
            </div>
            <br />
            <Image
              src="/fasb_logo.png"
              alt="Financial accounting standards board logo, no background"
              height={100}
              width={250}
              style={{
                height: '8rem',
                width: '10rem',
                margin: '0 auto',
              }}
            />
            <br />
            <h3>
              <Link href="/fasb">FASB ASC Chat</Link>
            </h3>
            <p>AI for the FASB Accounting Standards Codification</p>
            <br />
            <summary style={{ textAlign: 'left' }}>
              <p>
                This chat demo serves as a proof of concept that AI software can be benificial in the technical
                accounting field. I built this P.O.C for myself to understand if it was even possible. Now I am
                validating this concept with the intent of building a startup.
              </p>
              <p>This prototype is open for evaluation, feel free to try it out and DM me on linkedin.</p>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <Button
                  text="Start FASB Chat"
                  intent="success"
                  onClick={() => {
                    router.push('/fasb')
                  }}
                ></Button>
              </div>
              <p>
                Tested by <a href="https://www.linkedin.com/in/ryanfrederickmuller/">Ryan Müller CA(SA), CPA</a>
              </p>
              <p>
                Ryan was able to give the system context of a transaction then
                <ul style={{margin: '0', paddingLeft: '1rem'}}>
                  <li>generate accounting implications based on relevant asc guidance</li>
                  <li>generate an impairment accounting memo based on the accounting implication conclusion</li>
                  <li>create a draft journal entry for the transaction</li>
                </ul>
              </p>
            </summary>
          </Card>
          <Card
            elevation={1}
            style={{
              maxWidth: '25rem',
              minWidth: '20rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                textAlign: 'left',
              }}
            >
              <Tag intent="success">Deployed</Tag>
            </div>
            <br />
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
        <section
          ref={blogs_ref}
          style={{ display: 'flex', gap: '1rem', overflowY: 'auto', padding: '2rem', scrollBehavior: 'smooth' }}
        >
          {blog_posts.map((post, index) => (
            <Card
              elevation={1}
              key={index}
              interactive
              onClick={() => {
                if (post.href == '') return
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
        <section
          ref={projects_ref}
          style={{ display: 'flex', gap: '1rem', overflowY: 'auto', padding: '2rem', scrollBehavior: 'smooth' }}
        >
          {projects.map((post, index) => (
            <Card
              elevation={1}
              key={index}
              interactive
              onClick={() => {
                if (post.href == '') return
                window.open(post.href, '_blank')
                // router.push(post.href)
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
        <section
          ref={prototypes_ref}
          style={{ display: 'flex', gap: '1rem', overflowY: 'auto', padding: '2rem', scrollBehavior: 'smooth' }}
        >
          <Card
            elevation={1}
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
            elevation={1}
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
            elevation={1}
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

        <h2>Recommendations</h2>
        <br />
        <section
          style={{
            fontSize: '.3rem',
            background: 'black',
            padding: '1rem',
            paddingTop: '0.5rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            fontWeight: 'bolder',
            backgroundImage:
              'url(data:image/png;base64,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)',
          }}
        >
          <InProgress />
        </section>
        <br />
      </div>
      <footer style={{ width: '100%', padding: '1rem' }}>
        <Card
          elevation={1}
          style={{
            backgroundColor: 'lightgray',
            maxWidth: '25rem',
            minWidth: '18rem',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            margin: '0 auto',
            backgroundImage:
              'url(data:image/png;base64,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)',
          }}
        >
          <section
            style={{
              margin: '0 auto',
              display: 'flex',
              gap: '1rem',
              width: 'fit-content',
            }}
          >
            <a href="https://www.linkedin.com/in/shane-au-wade" target="_blank">
              <Image
                src="/linkedin.svg"
                alt="linkedin social media icon"
                width={50}
                height={50}
                style={{
                  width: '2rem',
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
                  width: '2rem',
                  height: 'auto',
                }}
              />
            </a>
          </section>
        </Card>
      </footer>
    </div>
  )
}

export default Home

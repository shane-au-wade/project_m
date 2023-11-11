import React from 'react'
import Image from 'next/image'

// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

import { Button, Collapse } from '@blueprintjs/core'

const JobEntry = (props) => {
  const [is_open, setIsOpen] = React.useState(false)
  const { time_frame, company, position, location, children } = props
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <span
          style={{
            minWidth: '10rem',
          }}
        >
          {time_frame}
        </span>
        <span style={{ minWidth: '8rem' }}>{company}</span>
        <span style={{ minWidth: '14rem' }}>{position}</span>
        <span style={{ minWidth: '7rem' }}>{location}</span>
        <Button minimal icon="insert" large onClick={() => setIsOpen(!is_open)} />
      </div>
      <Collapse transitionDuration="300" isOpen={is_open}>
        {children}
      </Collapse>
    </div>
  )
}

const Page = () => {
  return (
    <main>
      <section
        id="hero"
        style={{
          display: 'flex',
        }}
      >
        <p>{`It's nice to meet you! I'm Shane Wade`}</p>
        <figure>
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
        </figure>
      </section>
      <section id="professional_summary">
        <p>
          {`Results-oriented Software Engineer with 4+ years of experience in developing and implementing high-quality
          software solutions. Certified 600+ miles of US highway data for use in an autonomous vehicle system,
          contributing to zero on-road incidents at Embark Trucks. Adaptable and self-motivated, with a strong track
          record of delivering projects on time and exceeding client expectations. Excels in collaborating with
          cross-functional teams to drive innovation and achieve business objectives.`}
        </p>
      </section>
      <section
        id="experience"
        style={{
          margin: '0 auto',
          maxWidth: '50rem',
        }}
      >
        <JobEntry time_frame="Current" company="Threshold Uav" position="Head of Software" location="Calgary">
          <ul>
            <li>
              {`Architected a multi-UAV mission planner and drone telemetry system. I integrated it with our drone control android app in 10 days, before an upcoming demo at AgSmart 2023.`}
            </li>
            <li>
              {`Rewrote our android flight control app from scratch, wrote a small webserver, and web app which constitutes our multi-uav control system. Architected, developed, and hardened the MVP in ~4 months.`}
            </li>
            <li>{`Flown 50+ multi-UAV flights to-date *11-08-2023`}</li>
            <li>{`Designed, developed, and delivered our custom website in 3 weeks.`}</li>
          </ul>
        </JobEntry>
        <JobEntry
          time_frame="Nov, 2020 - Feb, 2023"
          company="Embark Trucks"
          position="Software Engineer, Mapping"
          location="San Francisco"
        >
          <ul>
            <li>
              {`Developed an in-house 3D map visualizer and editor that allowed a team of two engineers and two QA specialists to quality assure 500+ miles of US highway.`}
            </li>
            <li>
              {`The in-housing tooling significantly decreased the amount of time required to update a section of highway: from 20 days on average, from initial request to a production fix, to 4 days on average.`}
            </li>
            <li>
              {`Developed a data specification based on cross functional requirements from our Perception and Planning teams.`}
            </li>
            <li>
              {`Lead the development of a scalable QA process, onboarded and trained QA specailists to run the process and then coordinated QA jobs.`}
            </li>
          </ul>
        </JobEntry>
        <JobEntry time_frame="Jul, 2020 - Dec, 2020" company="Oshu" position="Software Engineer" location="Los Angeles">
          this is a test
        </JobEntry>
      </section>
    </main>
  )
}

export default Page

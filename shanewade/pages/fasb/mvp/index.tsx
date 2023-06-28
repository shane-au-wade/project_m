import type { NextPage } from 'next'
import * as React from 'react'

import { createUseStyles } from 'react-jss'

// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager, InputGroup, Tag } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

import { Card, Collapse, RadioGroup, Radio, Checkbox, Button, Icon, TextArea, Spinner } from '@blueprintjs/core'

const useStyles = createUseStyles({
  container: {
    height: '100%',
    width: '100%',
    padding: '1rem',
    // backgroundColor: 'black',
    // display: 'grid',
  },

  pageContent: {
    //  / alignSelf: 'center',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // padding: '0px',
    width: '100%',
    '@media (min-width: 800px)': {
      maxWidth: '50rem',
    },
  },
})

type APP_STATE = {
  facts_context_selection: String
  relevant_guidance: Array<String>
  guidance_approved: boolean
  facts_ref: React.Ref<string>
  facts_avaliable: boolean
}

const INIT_STATE = {
  facts_context_selection: 'USE_INITIAL_FACTS',
  relevant_guidance: ['ASC 605-25-25-2', 'ASC 605-25-25-3', 'ASC 605-25-25-5', 'ASC 605-25-25-6', 'ASC 605-25-30-4'],
  guidance_approved: false,
  facts_ref: null,
  facts_avaliable: false,
}

const Page: NextPage = () => {
  const classes = useStyles()

  const [collapseState, setCollapseState] = React.useState({
    abstraction: true,
  })

  const [state, setState] = React.useState<APP_STATE>(INIT_STATE)

  state.facts_ref = React.useRef<string>('')

  const facts_timer = React.useRef()

//   console.log(state)

  return (
    <div className={classes.container}>
      <h1
        style={{
          fontSize: '1rem',
        }}
      >
        <span className="rgb_color">{`{`}</span> <span>neokeeper</span> <span className="rgb_color">{`}`}</span>
      </h1>
      <h2>
        <span>Abstract a Transaction</span>
      </h2>
      <br />
      <div
        className={classes.pageContent}
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <section>
          {/* <Button text="log state" onClick={() => console.log(state)} /> */}
          <p>To abstract a contract or transaction:</p>
          <ol>
            <li>Define the facts</li>
            <li>Find and approve relevant guidance</li>
            <li>Generate the appropriate content</li>
          </ol>
        </section>

        {/* Define the facts section */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h3>Define the facts</h3>
          <TextArea
            fill
            style={{ height: '12rem' }}
            onChange={(e) => {
              clearTimeout(facts_timer.current)

              state.facts_ref.current = e.currentTarget.value

              facts_timer.current = setTimeout(() => {
                if (state.facts_ref.current.length > 10) {
                  setState({
                    ...state,
                    facts_avaliable: true,
                  })
                  return
                }

                setState({
                  ...state,
                  facts_avaliable: false,
                })
              }, 500)
            }}
          />
          <div>
            <Button
              disabled={!state.facts_avaliable}
              minimal
              large
              icon="predictive-analysis"
              intent="primary"
              text="Generated a summary"
            />
          </div>
          <TextArea disabled={!state.facts_avaliable} fill style={{ height: '12rem' }}></TextArea>
          <div>
            {/* context selection radio */}
            <RadioGroup
              onChange={(e) => {
                if (!e.currentTarget.value) return state
                const new_state = {
                  ...state,
                  facts_context_selection: e.currentTarget.value,
                }
                setState(new_state)
              }}
              selectedValue={state.facts_context_selection.toString()}
            >
              <Radio label="Use summary" value="USE_SUMMARY" />
              <Radio label="Use initial facts" value="USE_INITIAL_FACTS" />
            </RadioGroup>
          </div>
        </section>

        <br />
        <hr style={{ width: '95%', color: 'burlywood', border: '1px dashed' }} />
        <br />

        {/* relevant guidance section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3>Find and approve relevant guidance</h3>

          <div>
            <p>Documents</p>
            <Checkbox label="FASB ASC" defaultChecked={true} />
            <Checkbox label="SOX" />
            <Checkbox label="PCAOB Auditing Standards" />
            <Checkbox label="Delloite Audit Roadmap" />
          </div>

          <div>
            <Button minimal large icon="predictive-analysis" intent="primary" text={'Find relevant guidance'} />
          </div>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              padding: '1rem',
              borderRadius: '0.7rem',
              border: '1px solid burlywood',
            }}
          >
            {state.relevant_guidance.map((topic_id, index) => (
              <Tag
                key={index}
                large
                rightIcon={
                  <Button
                    icon={
                      <Icon
                        icon="cross-circle"
                        color="white"
                        onClick={() => {
                          const index = state.relevant_guidance.indexOf(topic_id)
                          const new_state = {
                            ...state,
                            relevant_guidance: [...state.relevant_guidance],
                          }

                          if (index > -1) new_state.relevant_guidance.splice(index, 1)

                          setState(new_state)
                        }}
                      />
                    }
                    minimal
                  />
                }
              >
                {topic_id}
              </Tag>
            ))}
          </div>
          <div
            style={{
              width: '25rem',
            }}
          >
            <sub
              style={{
                paddingBottom: '1rem',
              }}
            >
              Add Topic
            </sub>
            <InputGroup type="text" rightElement={<Button text="Add" icon="add" />}></InputGroup>
          </div>

          <div>
            <Checkbox
              large
              label="I approve this guidance"
              onChange={(e) => {
                setState({
                  ...state,
                  guidance_approved: e.currentTarget.checked,
                })
              }}
              checked={state.guidance_approved}
            />
          </div>
        </section>

        <br />
        <hr style={{ width: '95%', color: 'burlywood', border: '1px dashed' }} />
        <br />

        {/* Generate content */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3>Generate Content</h3>
          <div>
            <Button
              disabled={!state.guidance_approved}
              minimal
              large
              intent="primary"
              icon="predictive-analysis"
              text="Generate accounting implications"
            />
            <TextArea disabled={!state.guidance_approved} fill style={{ height: '12rem' }}></TextArea>
          </div>

          <div>
            <Button
              disabled={!state.guidance_approved}
              minimal
              large
              intent="primary"
              icon="predictive-analysis"
              text="Draft a technical memo"
            />
            <TextArea disabled={!state.guidance_approved} fill style={{ height: '12rem' }}></TextArea>
          </div>

          <div>
            <Button
              disabled={!state.guidance_approved}
              minimal
              large
              intent="primary"
              icon="predictive-analysis"
              text="Draft a journal entry"
            />
            <TextArea disabled={!state.guidance_approved} fill style={{ height: '12rem' }}></TextArea>
            <sub>Connect your ERP software to enable automatic updates</sub>
            <br />
            <Button disabled={!state.guidance_approved} minimal intent="warning" text="Connect ERP"></Button>
          </div>
        </section>

        <br />
        <hr style={{ width: '95%', color: 'burlywood', border: '1px dashed' }} />
        <br />

        {/* follow up chat */}
        {/* <section>
          <h3>Follow up chat</h3>
          <div
            style={{
              display: 'flex',
              gap: '0.2rem',
            }}
          >
            <Button large minimal icon={<Icon icon={'cross-circle'} size={20} />} />

            <TextArea fill large growVertically />

            <Button
              large
              minimal
              icon={
                <div style={{ width: '1rem', textAlign: 'center' }}>
                  {'READY' == 'READY' ? (
                    <Icon icon={'send-message'} className={'send-message-icon'} size={20} />
                  ) : (
                    <Spinner size={20} intent="primary" />
                  )}
                </div>
              }
            />
          </div>
        </section> */}
      </div>
    </div>
  )
}

export default Page

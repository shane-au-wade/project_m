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

import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  credentials: 'include',
}

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
  model_state: 'GENERATING' | 'READY'
  relevant_guidance: Array<string>
  relevant_guidance_text: string
  guidance_approved: boolean
  facts_ref: React.Ref<string>
  facts_summary_ref: React.Ref<string>
  facts_avaliable: boolean
  facts_context_selection: 'USE_SUMMARY' | 'USE_INITIAL_FACTS'
  documents: Array<string>
  accounting_implications_ref: React.Ref<string>
  technical_memo_ref: React.Ref<string>
  journal_entry_ref: React.Ref<string>
  hot_reload: boolean
}

// ['ASC 605-25-25-2', 'ASC 605-25-25-3', 'ASC 605-25-25-5', 'ASC 605-25-25-6', 'ASC 605-25-30-4'],

const INIT_STATE: APP_STATE = {
  model_state: 'READY',
  relevant_guidance: [],
  relevant_guidance_text: '',
  guidance_approved: false,
  facts_ref: null,
  facts_summary_ref: null,
  facts_avaliable: true,
  facts_context_selection: 'USE_INITIAL_FACTS',
  documents: ['FASB_ASC'],
  accounting_implications_ref: null,
  technical_memo_ref: null,
  journal_entry_ref: null,
  hot_reload: false,
}

const example_facts = `- A truck was purchased on September 1 2002, using vehicle financing. The cost price of the truck was $100,000 on September 1, 2002. Trucks are depreciated on a straight line basis over a 36 month period starting on the date of purchase.
- The fair value of the vehicle financing on September 1, 2002 is comprised of the principle balance of $80,000. The Company elects to expense the interest component of $20,000 on a monthly basis.
- On October 1, 2003 the Company sold the truck for $110,000. The fair value of the vehicle financing on October 1, 2003 was $75,000. The buyer settled the outstanding balance on the vehicle financing and paid the seller the remaining balance.`

const Page: NextPage = () => {
  const classes = useStyles()

  const [state, setState] = React.useState<APP_STATE>(INIT_STATE)

  state.facts_ref = React.useRef<string>('')
  state.facts_summary_ref = React.useRef<string>('')
  state.accounting_implications_ref = React.useRef<string>('')
  state.technical_memo_ref = React.useRef<string>('')
  state.journal_entry_ref = React.useRef<string>('')

  const topic_input_ref = React.useRef<HTMLInputElement>()

  const facts_timer = React.useRef()

  const handleDocumentsChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const checked = e.currentTarget.checked
    if (checked) {
      state.documents.push(e.currentTarget.value)
      return
    }
    const document_index = state.documents.indexOf(value)
    if (document_index > -1) state.documents.splice(document_index, 1)
  }

  const ModelIcon = (props: { model_state: 'GENERATING' | 'READY' }) => {
    const { model_state } = props
    const ICON_SIZE = 16

    if (model_state == 'GENERATING') {
      return <Spinner intent="primary" size={ICON_SIZE}></Spinner>
    }
    return <Icon size={ICON_SIZE} icon="predictive-analysis" />
  }

  //   console.log(state)

  return (
    <div className={classes.container}>
      <h1
        style={{
          fontSize: '1rem',
        }}
      >
        <span className="rgb_color">{`{`}</span>{' '}
        <span
          onClick={() => {
            console.log(state)
            // console.log(JSON.stringify(state))
          }}
        >
          neokeeper
        </span>{' '}
        <span className="rgb_color">{`}`}</span>
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
          <p>To abstract a contract or transaction:</p>
          <ol>
            <li>Define the facts</li>
            <li>Find and approve relevant guidance</li>
            <li>Generate the appropriate content</li>
          </ol>
        </section>
        <hr style={{ width: '95%', color: 'burlywood', border: '1px dashed' }} />
        <br />

        {/* Define the facts section */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h3>
            <span className="rgb_color">1. </span>Define the facts
          </h3>
          <p>Define the facts of the financial transaction.</p>
          <div>
            <Button
              minimal
              intent={'warning'}
              text="Copy example to clipboard"
              icon={'clipboard'}
              onClick={() => {
                navigator.clipboard.writeText(String(example_facts)).then(() => {
                  console.log('copied example facts to clipboard')
                })
              }}
            />
          </div>

          <TextArea
            fill
            defaultValue={state.facts_ref.current}
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
              icon={<ModelIcon model_state={state.model_state} />}
              intent="primary"
              text="Generate a summary"
              onClick={() => {
                const new_state: APP_STATE = {
                  ...state,
                  model_state: 'GENERATING',
                }

                setState(new_state)

                console.log(new_state)

                const payload = {
                  query: new_state.facts_ref.current,
                  model: 'gpt-3.5-turbo-16k',
                }

                console.log('payload', payload)

                fetch('/api/summerize', {
                  ...DEFAULT_FETCH_OPTIONS,
                  method: 'POST',
                  body: JSON.stringify(payload),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then(async (res) => {
                    const data = res.body
                    if (!data) {
                      return
                    }

                    const onParse = (event: ParsedEvent | ReconnectInterval) => {
                      if (event.type === 'event') {
                        const data = event.data
                        try {
                          const text = JSON.parse(data).text ?? ''

                          new_state.facts_summary_ref.current = new_state.facts_summary_ref.current + text

                          // to render the stream, we would have to trigger a state change
                          // here, toggling a boolean is probably the simplest trigger
                        } catch (e) {
                          console.error(e)
                        }
                      }
                    }

                    // https://web.dev/streams/#the-getreader-and-read-methods
                    const reader = data.getReader()
                    const decoder = new TextDecoder()
                    const parser = createParser(onParse)
                    let done = false
                    while (!done) {
                      const { value, done: doneReading } = await reader.read()
                      done = doneReading
                      const chunkValue = decoder.decode(value)
                      parser.feed(chunkValue)
                    }

                    setState({
                      ...new_state,
                      facts_context_selection: 'USE_SUMMARY',
                      model_state: 'READY',
                    })
                  })
                  .catch((err) => {
                    console.warn(err)
                  })
              }}
            />
            <br />
            <p>Generate a concise summary of the provided facts.</p>
          </div>
          <TextArea
            disabled={!state.facts_avaliable}
            value={state.facts_summary_ref.current}
            fill
            style={{ height: '12rem' }}
          ></TextArea>
          <div>
            <p>Select which facts to use for the next steps</p>
            {/* context selection radio */}
            <RadioGroup
              onChange={(e) => {
                if (!e.currentTarget.value) return state
                const value = e.currentTarget.value as 'USE_SUMMARY' | 'USE_INITIAL_FACTS'
                const new_state = {
                  ...state,
                  facts_context_selection: value,
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
          <h3>
            <span className="rgb_color">2. </span>Find and approve relevant guidance
          </h3>
          <p>Given the facts of the transaction, find relevant accounting guidance.</p>

          <div>
            <h4 style={{ margin: '0' }}>Documents</h4>
            <p>Select which guidance documents should be search and then run the AI Search.</p>
            <Checkbox
              disabled
              label="FASB ASC"
              value="FASB_ASC"
              defaultChecked={state.documents.includes('FASB_ASC')}
              onChange={handleDocumentsChange}
            />
            <Checkbox
              disabled
              label="SOX"
              value="SOX"
              defaultChecked={state.documents.includes('SOX')}
              onChange={handleDocumentsChange}
            />
            <Checkbox
              disabled
              label="PCAOB Auditing Standards"
              value="PCAOB"
              defaultChecked={state.documents.includes('PCAOB')}
              onChange={handleDocumentsChange}
            />
            <Checkbox
              disabled
              label="Deloitte Audit Roadmap"
              value="DELOITTE_ROADMAP"
              defaultChecked={state.documents.includes('DELOITTE_ROADMAP')}
              onChange={handleDocumentsChange}
            />
          </div>

          <div>
            <Button
              minimal
              large
              icon={<ModelIcon model_state={state.model_state} />}
              intent="primary"
              text={'Find relevant guidance'}
              onClick={() => {
                const new_state: APP_STATE = {
                  ...state,
                  model_state: 'GENERATING',
                }

                setState(new_state)

                console.log(new_state)

                const payload = {
                  query:
                    new_state.facts_context_selection == 'USE_INITIAL_FACTS'
                      ? new_state.facts_ref.current
                      : new_state.facts_summary_ref.current,
                  model: 'gpt-3.5-turbo-16k',
                }

                console.log('payload', payload)

                fetch('/api/guidance', {
                  ...DEFAULT_FETCH_OPTIONS,
                  method: 'POST',
                  body: JSON.stringify(payload),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then(async (res) => {
                    const data = await res.json()
                    if (!data) {
                      return
                    }

                    const { relevant_guidance, relevant_guidance_text } = data

                    setState({
                      ...new_state,
                      relevant_guidance: [...relevant_guidance],
                      relevant_guidance_text: relevant_guidance_text,
                      model_state: 'READY',
                    })
                  })
                  .catch((err) => {
                    console.warn(err)
                  })
              }}
            />
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
                style={{
                  fontSize: '0.9rem',
                }}
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
              maxWidth: '25rem',
            }}
          >
            <p style={{ paddingBottom: '0.2rem', margin: 0 }}>Manually add topics as necessary.</p>
            <InputGroup
              large
              type="text"
              inputRef={topic_input_ref}
              rightElement={
                <Button
                  text="Add"
                  icon="add"
                  onClick={() => {
                    if (!topic_input_ref.current) return
                    const topic = topic_input_ref.current.value
                    // clear input value
                    topic_input_ref.current.value = ''
                    const new_relevant_guidance = [...state.relevant_guidance]
                    new_relevant_guidance.push(topic)
                    setState({
                      ...state,
                      relevant_guidance: new_relevant_guidance,
                    })
                  }}
                />
              }
            />
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
            <p>*Your approved guidance will be used in the next step.</p>
          </div>
        </section>

        <br />
        <hr style={{ width: '95%', color: 'burlywood', border: '1px dashed' }} />
        <br />

        {/* Generate content */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3>
            <span className="rgb_color">3. </span>Generate Content
          </h3>
          <div>
            <p>Given the facts of the transaction and the relevant guidance:</p>
            <Button
              disabled={!state.guidance_approved}
              minimal
              large
              intent="primary"
              icon={<ModelIcon model_state={state.model_state} />}
              text="Generate accounting implications"
              onClick={() => {
                const new_state: APP_STATE = {
                  ...state,
                  model_state: 'GENERATING',
                }

                setState(new_state)

                console.log(new_state)

                const thread = [
                  {
                    role: 'user',
                    content: `TRANSACTION
---
${
  new_state.facts_context_selection == 'USE_INITIAL_FACTS'
    ? new_state.facts_ref.current
    : new_state.facts_summary_ref.current
}
---

What are the accounting implications for the transaction?`,
                  },
                ]

                const payload = {
                  thread: thread,
                  relevant_guidance_text: new_state.relevant_guidance_text,
                  model: 'gpt-3.5-turbo-16k',
                }

                console.log('payload', payload)

                fetch('/api/chat', {
                  ...DEFAULT_FETCH_OPTIONS,
                  method: 'POST',
                  body: JSON.stringify(payload),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then(async (res) => {
                    const data = res.body
                    if (!data) {
                      return
                    }

                    const onParse = (event: ParsedEvent | ReconnectInterval) => {
                      if (event.type === 'event') {
                        const data = event.data
                        try {
                          const text = JSON.parse(data).text ?? ''

                          new_state.accounting_implications_ref.current =
                            new_state.accounting_implications_ref.current + text

                          // to render the stream, we would have to trigger a state change
                          // here, toggling a boolean is probably the simplest trigger
                        } catch (e) {
                          console.error(e)
                        }
                      }
                    }

                    // https://web.dev/streams/#the-getreader-and-read-methods
                    const reader = data.getReader()
                    const decoder = new TextDecoder()
                    const parser = createParser(onParse)
                    let done = false
                    while (!done) {
                      const { value, done: doneReading } = await reader.read()
                      done = doneReading
                      const chunkValue = decoder.decode(value)
                      parser.feed(chunkValue)
                    }

                    setState({
                      ...new_state,
                      model_state: 'READY',
                    })
                  })
                  .catch((err) => {
                    console.warn(err)
                  })
              }}
            />
            <TextArea
              disabled={!state.guidance_approved}
              value={state.accounting_implications_ref.current}
              fill
              style={{ height: '12rem' }}
            ></TextArea>
          </div>

          <div>
            <Button
              disabled={!state.guidance_approved}
              minimal
              large
              intent="primary"
              icon={<ModelIcon model_state={state.model_state} />}
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
              icon={<ModelIcon model_state={state.model_state} />}
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

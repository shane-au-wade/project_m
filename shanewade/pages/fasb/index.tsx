import type { NextPage } from 'next'
import * as React from 'react'

import { createUseStyles } from 'react-jss'

// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager, OverflowList } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

import { TextArea, Button, Spinner, Tag, Icon, useHotkeys } from '@blueprintjs/core'

import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

const useStyles = createUseStyles({
  container: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'black',
    // display: 'grid',
  },

  pageContent: {
    //  / alignSelf: 'center',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    width: '100%',
    '@media (min-width: 800px)': {
      maxWidth: '50rem',
    },
  },
})

type ChatMessage = {
  user_short_id: String
  timestamp: String
  message: String
  message_id: String
  links: Array<WebLink> // a list of urls that we used to generate the response
  suggestions: Array<String> // a list of AI generated follow up questions
  downloads: Record<string, String> // { file_name: url_for_file }
}

type ModelState = 'GENERATING' | 'READY'

type ChatState = {
  model_state: ModelState
  chat_history: Array<ChatMessage>
  thread_id: Number | null
}

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  credentials: 'include',
}
function putNewChatMessage(message: String) {
  const new_message = {
    query: message,
  }
  console.log(new_message)
  return fetch('/api/fasb', {
    ...DEFAULT_FETCH_OPTIONS,
    method: 'POST',
    body: JSON.stringify(new_message),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const INIT_CHAT_STATE: ChatState = {
  model_state: 'READY',
  chat_history: [],
  thread_id: null,
}

const Page: NextPage = () => {
  const classes = useStyles()

  const [state, setState] = React.useState<ChatState>(INIT_CHAT_STATE)
  const message_ref = React.useRef<HTMLInputElement>(null)
  const message = React.useRef<String>('')

  React.useLayoutEffect(() => {
    if (!state.chat_history) return
    console.log('reading chat history')
    const _chat_history = JSON.parse(window.localStorage.getItem('user-chat') ?? '[]')
    setState({
      ...state,
      chat_history: [..._chat_history],
    })
  }, [])

  const handleSubmit = React.useCallback(() => {
    if (message.current == '') return
    if (state.model_state == 'GENERATING') return

    const new_message = message.current

    message.current = ''
    if (message_ref.current) {
      message_ref.current.value = ''
      message_ref.current.style.height = '61px'
    }

    const new_chat_state: ChatState = {
      ...state,
      model_state: 'GENERATING',
      // model_state: 'READY',
      chat_history: [
        ...state.chat_history,
        {
          user_short_id: 'user',
          timestamp: 'na',
          message: new_message,
          message_id: 'test',
          links: [], // a list of urls that we used to generate the response
          suggestions: [], // a list of AI generated follow up questions
          downloads: {}, // { file_name: url_for_file }
        },
        {
          user_short_id: 'ai',
          timestamp: 'na',
          message: '',
          message_id: 'test',
          links: [], // a list of urls that we used to generate the response
          suggestions: [], // a list of AI generated follow up questions
          downloads: {}, // { file_name: url_for_file }
        },
      ],
    }

    // submitMessageAndGenerateResponse(new_message, `${user.given_name.charAt(0)}`, state, setState)
    setState(new_chat_state)

    // store the last 100 entries of the chat in localStorage
    window.localStorage.setItem('user-chat', JSON.stringify(new_chat_state.chat_history.slice(0, 100)))

    putNewChatMessage(new_message).then(async (res) => {
      // const data: {
      //   chat_id: String
      //   message: String
      //   products: []
      // } = await res.json()

      // console.log(data)

      const data = res.body
      if (!data) {
        return
      }

      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          try {
            const text = JSON.parse(data).text ?? ''

            const iterated_state = {
              ...new_chat_state,
              chat_history: [...new_chat_state.chat_history],
            }

            iterated_state.chat_history[iterated_state.chat_history.length - 1].message =
              iterated_state.chat_history[iterated_state.chat_history.length - 1].message + text

            setState(iterated_state)
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

      setState((state) => {
        // store the last 100 entries of the chat in localStorage
        window.localStorage.setItem('user-chat', JSON.stringify(new_chat_state.chat_history.slice(0, 100)))
        return {
          ...state,
          model_state: 'READY',
        }
      })
    })
  }, [message_ref, message, state])

  const updateMessage = React.useCallback(
    (new_message: String) => {
      message.current = new_message
      if (message_ref.current) message_ref.current.value = new_message.toString()
    },
    [message_ref, message]
  )

  const hotkeys = React.useMemo(
    () => [
      {
        combo: 'enter',
        global: true,
        allowInInput: true,
        label: 'text input',
        onKeyDown: handleSubmit,
        preventDefault: true,
      },
    ],
    [handleSubmit]
  )

  const { handleKeyDown } = useHotkeys(hotkeys, {})

  const chat_anchor_ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!chat_anchor_ref.current) return
    chat_anchor_ref.current.scrollIntoView()
  }, [state.chat_history])

  return (
    <div className={classes.container} onKeyDown={handleKeyDown}>
      <div className={classes.pageContent}>
        <div style={{ flexGrow: 1 }} />
        <div
          id="chat_display"
          style={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '100%',
            overflowY: 'auto',
          }}
        >
          {state.chat_history.map((chat_msg, index) => (
            <div
              key={index}
              style={{
                width: '100%',
                display: 'flex',
                lineHeight: '1.75rem',
              }}
            >
              {chat_msg.user_short_id == 'ai' ? (
                <>
                  <p
                    style={{
                      whiteSpace: 'pre-line',
                      maxWidth: '45rem',
                      minWidth: '20rem',
                      backgroundColor: '#E5E8EB',
                      color: 'black',
                      fontSize: '1.25rem',
                      padding: '0.5rem',
                      borderRadius: '7px',
                    }}
                  >
                    {chat_msg.message}
                  </p>
                  <div style={{ flexGrow: '1' }} />
                </>
              ) : (
                <>
                  <div style={{ flexGrow: '1' }} />
                  <p
                    style={{
                      maxWidth: '35rem',
                      minWidth: '20rem',
                      backgroundColor: '#184A90',
                      color: 'floralWhite',
                      fontSize: '1.25rem',
                      padding: '0.5rem',
                      borderRadius: '7px',
                    }}
                  >
                    {chat_msg.message}
                  </p>
                </>
              )}
            </div>
          ))}
          <div ref={chat_anchor_ref}></div>
        </div>

        <div
          id="text_input_container"
          style={{
            marginTop: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '0.2rem',
            }}
          >
            <Button
              large
              minimal
              icon={<Icon icon={'cross-circle'} size={20} />}
              onClick={(e) => {
                e.preventDefault()
                updateMessage('')
              }}
            />

            <TextArea
              fill
              large
              growVertically
              type="text"
              inputRef={message_ref}
              onChange={(e) => {
                message.current = e.target.value
              }}
            />

            <Button
              large
              minimal
              icon={
                <div style={{ width: '1rem', textAlign: 'center' }}>
                  {state.model_state == 'READY' ? (
                    <Icon icon={'send-message'} className={'send-message-icon'} size={20} />
                  ) : (
                    <Spinner size={20} intent="primary" />
                  )}
                </div>
              }
              onClick={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            />
          </div>
          <div style={{ height: '5rem' }}>
            {state.chat_history.at(-1)?.message !== '' || state.model_state == 'GENERATING' ? (
              <Button large minimal icon="repeat" text="Resend" disabled={true} />
            ) : (
              <Button
                large
                minimal
                intent="primary"
                icon="repeat"
                text="Resend"
                onClick={() => {
                  console.log('resubmitting last message')

                  const new_message = state.chat_history.at(-2)?.message

                  const new_chat_state: ChatState = {
                    ...state,
                    chat_history: [...state.chat_history],
                  }

                  if (!new_message) return

                  putNewChatMessage(new_message).then(async (res) => {
                    const data = res.body
                    if (!data) {
                      return
                    }
                    const onParse = (event: ParsedEvent | ReconnectInterval) => {
                      if (event.type === 'event') {
                        const data = event.data
                        try {
                          const text = JSON.parse(data).text ?? ''

                          const iterated_state = {
                            ...new_chat_state,
                            chat_history: [...new_chat_state.chat_history],
                          }

                          iterated_state.chat_history[iterated_state.chat_history.length - 1].message =
                            iterated_state.chat_history[iterated_state.chat_history.length - 1].message + text

                          setState(iterated_state)
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

                    setState((state) => {
                      // store the last 100 entries of the chat in localStorage
                      window.localStorage.setItem(
                        'user-chat',
                        JSON.stringify(new_chat_state.chat_history.slice(0, 100))
                      )
                      return {
                        ...state,
                        model_state: 'READY',
                      }
                    })
                  })
                }}
              />
            )}
            <br />
            <sub
              style={{
                padding: '1rem',
              }}
            >
              *the last 100 messages are stored locally via cookies
            </sub>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

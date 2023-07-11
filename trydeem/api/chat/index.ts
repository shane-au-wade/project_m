import { OPENAI_API_KEY } from '../config'

import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

function getChatSystemPrompt(guidance_text: string) {
  return `
relevant guidance
---
${guidance_text}
---

You are an expert financial accounting AI
You will answer the user's query using ONLY the provided relevant guidance`
}

type Models =
  | 'gpt-3.5-turbo-16k-0613'
  | 'gpt-3.5-turbo-16k'
  | 'gpt-3.5-turbo-0613'
  | 'gpt-3.5-turbo'
  | 'gpt-4-0613'
  | 'gpt-4'

export async function chat(
  thread: Array<{
    role: 'assistant' | 'user'
    content: string
  }>,
  relevant_guidance_text: string,
  model: Models
) {
  console.log('INFO: chatting, please wait...')

  console.log('INFO: using model ', model)

  const chat_system = getChatSystemPrompt(relevant_guidance_text)

  console.log('INFO: chat system prompt', chat_system)

  const completion_playload = {
    model: model,
    stream: true,
    messages: [
      {
        role: 'system',
        content: chat_system,
      },
      ...thread.slice(-5),
    ],
  }

  return OpenAIChatCompletionStream(completion_playload, [])
}

export type ChatGPTAgent = 'user' | 'system'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

export interface OpenAIStreamPayload {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  n: number
}

export async function OpenAIChatCompletionStream(payload: OpenAIStreamPayload, meta_data) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const readableStream = new ReadableStream({
    async start(controller) {
      // callback
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          controller.enqueue(encoder.encode(data))
        }
      }

      // optimistic error handling
      if (res.status !== 200) {
        const data = {
          status: res.status,
          statusText: res.statusText,
          body: await res.text(),
        }
        console.log(`Error: recieved non-200 status code, ${JSON.stringify(data)}`)
        controller.close()
        return
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  let counter = 0
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const data = decoder.decode(chunk)
      // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
      if (data === '[DONE]') {
        // stream additional string meta data

        for await (const entry of meta_data as string) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                text: `${entry}`,
              })}\n\n`
            )
          )
        }

        controller.enqueue(encoder.encode('[*DONE]'))

        // controller.terminate()
        // return
      }

      if (data === '[*DONE]') {
        controller.terminate()
        return
      }

      try {
        const json = JSON.parse(data)
        const text = json.choices[0].delta?.content || ''
        if (counter < 2 && (text.match(/\n/) || []).length) {
          // this is a prefix character (i.e., "\n\n"), do nothing
          return
        }
        // stream transformed JSON resposne as SSE
        const payload = { text: text }
        // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`))
        counter++
      } catch (e) {
        // maybe parse error
        controller.error(e)
      }
    },
  })

  return readableStream.pipeThrough(transformStream)
}

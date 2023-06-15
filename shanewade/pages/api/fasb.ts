import { converse } from '../../fasb'

import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
  regions: 'pdx1', // optional
}

export default async (request: Request) => {
  const { query } = await request.json()
  try {
    const message_stream = await converse(query)

    return new Response(message_stream, {
      headers: new Headers({
        // since we don't use browser's EventSource interface, specifying content-type is optional.
        // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
        // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server

        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      }),
    })
  } catch (error) {
    return new Response(String(error), {
      status: 500,
    })
  }
}

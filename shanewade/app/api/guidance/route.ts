import { findRelevantGuidance } from '.'

export async function POST(request: Request) {
  const { query, model } = await request.json()
  try {
    const relevant_ids = await findRelevantGuidance(query, model ? model : 'gpt-3.5-turbo-16k')

    return new Response(JSON.stringify(relevant_ids), {
      headers: new Headers({
        // since we don't use browser's EventSource interface, specifying content-type is optional.
        // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
        // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server

        // 'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      }),
    })
  } catch (error) {
    return new Response(String(error), {
      status: 500,
    })
  }
}

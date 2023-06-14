// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
import { converse } from '../../fasb'

type Data = {
  message: string
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method === 'POST') {
//     // Process a POST request
//     const { query } = req.body
//     const message = await converse(query)
//     res.status(200).json({
//       message: message,
//     })
//   }
// }

import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async (request: NextRequest) => {
  const { query } = await request.json()
  const message = await converse(query)

  return NextResponse.json({
    message: message,
  })
}

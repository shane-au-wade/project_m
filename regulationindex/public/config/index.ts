const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:7777' : 'https://www.regulationindex.com'
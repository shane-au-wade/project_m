export const OPENAI_API_KEY = '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'

export const CHROMADB_URL = process.env.CHROMADB_URL ?? "http://localhost:8000"

export const MODELS_CONFIG = {
  'gpt-3.5': {
    name: 'gpt-3.5-turbo',
    temperature: 0.1,
    max_output_tokens: 512,
    max_context_tokens: 4097,
  },
  'gpt-4': {
    name: 'gpt-4',
    temperature: 0.1,
    max_output_tokens: 512,
    max_context_tokens: 8192,
  },
  'gpt-4-32k': {
    name: 'gpt-4-32k',
    temperature: 0.1,
    max_output_tokens: 512,
    max_context_tokens: 32768,
  },
}

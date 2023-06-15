// jest --env @edge-runtime/jest-environment
// ❌ Fail
// Error name:    "EvalError"
// Error message: "Code generation from strings disallowed for this context"

import { converse } from '../fasb'

test('should load', async () => {
  const result = await converse('How should stock-based compensation be accounted for according to ASC 718?')

  expect(result)
})

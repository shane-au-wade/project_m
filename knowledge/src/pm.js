const { spawn } = require('child_process')

function runProgram(program, args, retries = 5) {
  // Spawn a new child process to run the program
  const child = spawn(program, args)

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)

    // If there are retries left, run the program again
    if (retries > 0) {
      console.log(`Relaunching program (${retries} retries left)...`)
      runProgram(program, args, retries - 1)
    }
  })

  child.on('error', (error) => {
    console.error(`Failed to start subprocess: ${error}`)
  })

  child.on('close', (code) => {
    if (code !== 0) {
      console.log(`Program exited with code ${code}`)
      // If there are retries left, run the program again
      if (retries > 0) {
        console.log(`Relaunching program (${retries} retries left)...`)
        runProgram(program, args, retries - 1)
      }
    }
  })
}

// Example usage:
runProgram('node', ['knowledge/src/fasb_chromadb_loader.js'], 5)

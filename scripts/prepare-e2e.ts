import { join, resolve } from 'path'
import fse from 'fs-extra'
import { execaCommandSync } from 'execa'

const exampleDir = resolve(__dirname, '..', 'e2e/playground/basic')
const defaultExecaOptions = {
  cwd: exampleDir,
  stdout: process.stdout,
  stderr: process.stderr,
  stdin: process.stdin,
}

async function prepareE2E() {
  if (!fse.existsSync(resolve(__dirname, '../dist'))) {
    execaCommandSync('pnpm build', {
      cwd: resolve(__dirname, '..'),
    })
  }

  execaCommandSync('npx playwright install', {
    cwd: join(__dirname, '..'),
    stdout: process.stdout,
    stderr: process.stderr,
    stdin: process.stdin,
  })

  execaCommandSync('pnpm i', defaultExecaOptions)

  execaCommandSync('pnpm dev', defaultExecaOptions)
}

prepareE2E()

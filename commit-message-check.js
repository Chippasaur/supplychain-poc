const fs = require('fs')

const editMessageFileContent = fs.readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf-8')
const [commitMessage] = editMessageFileContent.split('\n')

if (/^Revert "/.test(commitMessage)) {
  process.exit(0)
}

if (/^\[SVPOC-\d+] (feat|fix|docs|style|refactor|test|chore): .*$/.test(commitMessage)) {
  process.exit(0)
}

console.log('============ Commit message invalid =============')
console.log(
  'Please check whether your submission conforms to the specification -> \n' +
    '[SVPOC-{0-9}] (feat|fix|docs|style|refactor|test|chore): ***** ',
)
console.log('=================================================')

process.exit(1)

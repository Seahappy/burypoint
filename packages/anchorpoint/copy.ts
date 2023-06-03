import fs from 'fs'
const packBuffer: Buffer = fs.readFileSync('package.json')
const arr = ['devDependencies', 'scripts']

const packData = JSON.parse(String(packBuffer))
const packStr = Object.keys(packData).reduce((prev: string, c: string) => {
    !arr.includes(c) && (prev += `\n\t"${c}": ${JSON.stringify(packData[c]).replace(/dist\//, '')},`)
    return prev
}, `{`)
fs.writeFileSync('dist/package.json', packStr.slice(0, -1) + `\n}`)

fs.cpSync('README.md', 'dist/README.md')

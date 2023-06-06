import fs from 'fs'

const packageFileUrl = "package.json"
const packBuffer: Buffer = fs.readFileSync(packageFileUrl);
const excludeData = ['devDependencies', 'scripts', "files"];
const packData = JSON.parse(String(packBuffer));
const packStr = Object.keys(packData).reduce((prev: string, c: string) => {
    !excludeData.includes(c) && (prev += `\n\t"${c}": ${JSON.stringify(packData[c]).replace(/dist\//, '')},`)
    return prev
}, `{`);
fs.writeFileSync('dist/' + packageFileUrl, packStr.slice(0, -1) + `\n}`);

const readmeFileUrl = "README.md"
fs.cpSync(readmeFileUrl, 'dist/' + readmeFileUrl);

const conView = '\x1B[36m%s\x1B[0m → \x1B[1m\x1B[32mdist/%s\x1B[39m\x1B[0m'
console.log('\x1B[32mcopy ' + conView + ', ' + conView, packageFileUrl, packageFileUrl, readmeFileUrl, readmeFileUrl)

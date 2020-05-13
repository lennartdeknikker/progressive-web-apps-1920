// build script inspired by https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/
const fs = require('fs-extra')
const path = require('path')
const minifyStream = require('minify-stream')
const minifyCssStream = require('minify-css-stream')
const MinifyHtmlStream = require('minify-html-stream').Minifier
const { promisify } = require('util')
const globP = promisify(require('glob'))

const distPath = './public'

function minifyJsFiles() {
  globP('**/*.js', { cwd: `${distPath}/scripts` })
    .then((jsFiles) => {
      jsFiles.forEach(async (jsFile) => {
        const fileData = path.parse(jsFile)
        const readStream = fs.createReadStream(`${distPath}/scripts/${jsFile}`)
        const writeStream = fs.createWriteStream(`${distPath}/scripts/${fileData.name}.min.js`)
        readStream.pipe(minifyStream()).pipe(writeStream)
      })
    })
}

function minifyCssFiles() {
  globP('**/*.css', { cwd: `${distPath}/stylesheets` })
    .then((cssFiles) => {
      cssFiles.forEach(async (cssFile) => {
        const fileData = path.parse(cssFile)
        const readStream = fs.createReadStream(`${distPath}/stylesheets/${cssFile}`)
        const writeStream = fs.createWriteStream(`${distPath}/stylesheets/${fileData.name}.min.css`)

        readStream.pipe(minifyCssStream()).pipe(writeStream)
      })
    })
}

function minifyHtmlFiles() {
  globP('**/*.html', { cwd: `${distPath}` })
    .then((htmlFiles) => {      
      htmlFiles.forEach(async (htmlFile) => {
        
        const fileName = htmlFile.replace('pages/', '')
        const destPath = `${distPath}/${fileName}`
        const readStream = fs.createReadStream(`${distPath}/${htmlFile}`)
        const writeStream = fs.createWriteStream(destPath)

        readStream.pipe(new MinifyHtmlStream()).pipe(writeStream)
      })
    })
}


fs.mkdirs(`${distPath}/details`)
minifyJsFiles()
minifyCssFiles()
minifyHtmlFiles()
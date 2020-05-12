// build script inspired by https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/
const fs = require('fs-extra')
const path = require('path')
const { promisify } = require('util')
const ejsRenderFile = promisify(require('ejs').renderFile)
const globP = promisify(require('glob'))
const createDataObject = require('../site.config')

const Api = require('../src/helpers/api')

const srcPath = './src'
const distPath = './public'

fs.emptyDirSync(distPath)
fs.copy(`${srcPath}/assets`, distPath)

async function generatePages() {
  globP('**/[!_]*.ejs', { cwd: `${srcPath}/pages` })
    .then((files) => {
      console.log('static:', files)
      
      files.forEach(async (file) => {
        const config = await createDataObject(file.slice(0, -4))
        const fileData = path.parse(file)
        const destPath = path.join(distPath, fileData.dir)

        fs.mkdirs(destPath)
          .then(() => ejsRenderFile(`${srcPath}/pages/${file}`, { ...config }))
          .then((pageContents) => ejsRenderFile(`${srcPath}/layouts/index.ejs`, { ...config, body: pageContents }))
          .then((layoutContent) => {
            fs.writeFile(`${destPath}/pages/${fileData.name}.html`, layoutContent)
          })
          .catch((err) => { console.error(err) })
      })
    })
    .catch((err) => { console.error(err) })
}

async function generateDynamicPages() {
  const dynamicFiles = await globP('**/_*.ejs', { cwd: `${srcPath}/pages` })
  const file = dynamicFiles[0]
  const fileName = file.slice(0, -4).replace('_', '')
  const fileData = path.parse(file)
  const destPath = path.join(distPath, 'pages', fileName)

  
  await fs.mkdirs(destPath)


  Api.get().then((allLaunches) => {
    console.log('obtained data for', allLaunches.length, 'launches')
    allLaunches.forEach(async (launch) => {      
      const config = await createDataObject(fileName, launch)
      
      ejsRenderFile(`${srcPath}/pages/${file}`, { ...config })
        .then((pageContents) => ejsRenderFile(`${srcPath}/layouts/details.ejs`, { ...config, body: pageContents }))
        .then((layoutContent) => {
          fs.writeFile(`${destPath}/${launch.flight_number}.html`, layoutContent)
        })
        .catch((err) => { console.error(err) })      
    })
  })
}

generatePages()
generateDynamicPages()
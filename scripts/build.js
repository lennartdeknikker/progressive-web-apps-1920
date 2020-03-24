// build script inspired by https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/
const fs = require('fs-extra');
const path = require('path');
const minifyStream = require('minify-stream');
const minifyCssStream = require('minify-css-stream');
const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const globP = promisify(require('glob'));
const createDataObject = require('../site.config');

const srcPath = './src';
const distPath = './public';

fs.emptyDirSync(distPath);
fs.copy(`${srcPath}/assets`, distPath);

function minifyScripts() {
  fs.mkdir(`${distPath}/scripts`);
  const readStream = fs.createReadStream(`${srcPath}/assets/scripts/countdown.js`);
  const WriteStream = fs.createWriteStream(`${distPath}/scripts/countdown.min.js`);

  readStream.pipe(minifyStream())
    .pipe(WriteStream);
}

function minifyCss() {
  fs.mkdir(`${distPath}/stylesheets`);
  const readStream = fs.createReadStream(`${srcPath}/assets/stylesheets/main.css`);
  const WriteStream = fs.createWriteStream(`${distPath}/stylesheets/main.min.css`);

  readStream.pipe(minifyCssStream())
    .pipe(WriteStream);
}

minifyScripts();
minifyCss();

async function generatePages() {
  globP('**/*.ejs', { cwd: `${srcPath}/pages` })
    .then((files) => {
      files.forEach(async (file) => {
        const config = await createDataObject(file.slice(0, -4));
        const fileData = path.parse(file);
        const destPath = path.join(distPath, fileData.dir);

        fs.mkdirs(destPath)
          .then(() => ejsRenderFile(`${srcPath}/pages/${file}`, { ...config }))
          .then((pageContents) => ejsRenderFile(`${srcPath}/layouts/index.ejs`, { ...config, body: pageContents }))
          .then((layoutContent) => {
            fs.writeFile(`${destPath}/${fileData.name}.html`, layoutContent);
          })
          .catch((err) => { console.error(err); });
      });
    })
    .catch((err) => { console.error(err); });
}

generatePages();

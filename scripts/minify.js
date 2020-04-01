// build script inspired by https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/
const fs = require('fs-extra');
const path = require('path');
const minifyStream = require('minify-stream');
const minifyCssStream = require('minify-css-stream');
const MinifyHtmlStream = require('minify-html-stream').Minifier;
const { promisify } = require('util');
const globP = promisify(require('glob'));

const srcPath = './src';
const distPath = './public';

fs.emptyDirSync(distPath);
fs.copy(`${srcPath}/assets`, distPath);

function minifyJsFiles() {
  fs.mkdir(`${distPath}/scripts`);
  globP('**/*.js', { cwd: `${srcPath}/assets/scripts` })
    .then((jsFiles) => {
      jsFiles.forEach(async (jsFile) => {
        console.log(jsFile);
        const fileData = path.parse(jsFile);
        const readStream = fs.createReadStream(`${srcPath}/assets/scripts/${jsFile}`);
        const writeStream = fs.createWriteStream(`${distPath}/scripts/${fileData.name}.min.js`);

        readStream.pipe(minifyStream()).pipe(writeStream);
      });
    });
}

function minifyCssFiles() {
  fs.mkdir(`${distPath}/stylesheets`);
  globP('**/*.css', { cwd: `${srcPath}/assets/stylesheets` })
    .then((cssFiles) => {
      cssFiles.forEach(async (cssFile) => {
        console.log(cssFile);
        const fileData = path.parse(cssFile);
        const readStream = fs.createReadStream(`${srcPath}/assets/stylesheets/${cssFile}`);
        const writeStream = fs.createWriteStream(`${distPath}/stylesheets/${fileData.name}.min.css`);

        readStream.pipe(minifyCssStream()).pipe(writeStream);
      });
    });
}

function minifyHtmlFiles() {
  fs.mkdir(`${distPath}/pages`);
  globP('**/*.html', { cwd: `${srcPath}` })
    .then((htmlFiles) => {
      htmlFiles.forEach(async (htmlFile) => {
        console.log(htmlFile);
        const fileData = path.parse(htmlFile);
        const readStream = fs.createReadStream(`${srcPath}/${htmlFile}`);
        const writeStream = fs.createWriteStream(`${distPath}/pages/${fileData.name}.min.css`);

        readStream.pipe(new MinifyHtmlStream()).pipe(writeStream);
      });
    });
}


minifyJsFiles();
minifyCssFiles();
minifyHtmlFiles();
const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const globP = promisify(require('glob'));
const config = require('../site.config');

console.log(config);

const srcPath = './src';
const distPath = './public';

fse.emptyDirSync(distPath);

fse.copy(`${srcPath}/assets`, `${distPath}/assets`);

globP('**/*.ejs', { cwd: `${srcPath}/pages` })
  .then((files) => {
    files.forEach((file) => {
      const fileData = path.parse(file);
      const destPath = path.join(distPath, fileData.dir);

      fse.mkdirs(destPath)
        .then(() => ejsRenderFile(`${srcPath}/pages/${file}`, { ...config }))
        .then((pageContents) => ejsRenderFile(`${srcPath}/layouts/index.ejs`, { ...config, body: pageContents }))
        .then((layoutContent) => {
          fse.writeFile(`${destPath}/${fileData.name}.html`, layoutContent);
        })
        .catch((err) => { console.error(err); });
    });
  })
  .catch((err) => { console.error(err); });

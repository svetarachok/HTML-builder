const path = require('path')
const fs = require('fs');
const fsPromises = fs.promises;



fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', ()=> {})  
const writable = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8')

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;

  let cssFiles = files.filter(file => path.extname(`${file}`) === '.css');

  for (let i=0; i<cssFiles.length; i++) {
    let readable = fs.createReadStream(path.join(__dirname, 'styles', `${files[i]}`), 'utf-8')
    readable.pipe(writable)
  }
})

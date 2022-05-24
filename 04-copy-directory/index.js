const path = require('path')
const fs = require('fs');
const fsPromises = fs.promises;
  

async function copyFiles (currFolder, newFolder) {
  try {
    await fsPromises.mkdir(newFolder, {recursive: true})
  
    const files = await fsPromises.readdir(currFolder, { withFileTypes: true }, ()=>{})
      files.forEach(file => {
        if (file.isFile()) {
          fsPromises.writeFile(path.join(currFolder, `${file.name}`), path.join(newFolder, `${file.name}`))
        } else {
          copyFiles(path.join(currFolder, `${file.name}`), path.join(newFolder, `${file.name}`))
        }
      })
      
  } catch {
    console.log('Cannot create folder');
  }}

  copyFiles (path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'))


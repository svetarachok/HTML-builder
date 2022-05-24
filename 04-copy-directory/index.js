const path = require('path')
const fs = require('fs');
const fsPromises = fs.promises;
  

async function copyFiles (currFolder, newFolder) {
  try {
    await fsPromises.rm(newFolder, {recursive: true, force: true})
    await fsPromises.mkdir(newFolder, {recursive: true})
  
    const files = await fsPromises.readdir(currFolder, { withFileTypes: true }, ()=>{})
      files.forEach(file => {

        if (file.isFile()) {
          fs.readFile(path.join(currFolder, `${file.name}`), 'utf-8', (err, data) => {
            if (err) throw err; 

            fsPromises.writeFile(path.join(newFolder, `${file.name}`), `${data}`)
          })
        } else {
          copyFiles(path.join(currFolder, `${file.name}`), path.join(newFolder, `${file.name}`))
        }
      })
      
  } catch {
    console.log('Cannot create folder');
  }}

  copyFiles (path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'))


const path = require('path')
const fs = require('fs');
const fsPromises = fs.promises;
  
fsPromises.mkdir(path.join(__dirname, 'files-copy'), {recursive: true})
.then( () => {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err;
  
    files.forEach(file => {
      fs.readFile(path.join(__dirname, 'files', `${file}`), 'utf-8',   (err, data) => {
        if (err) throw err;
        fs.writeFile(path.join(__dirname, 'files-copy', `${file}`), `${data}`, ()=> {})  
      })
    })
  
  })
    
})
.catch( () => {
    console.log('Cannot create folder');
});



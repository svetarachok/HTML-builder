const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const enc = 'utf-8';
//Paths
const templatePath = path.join(__dirname, 'template.html')
const componentsPath = path.join(__dirname, 'components');



//folder
async function createFolder (path) {
await fsPromises.mkdir(path, {recursive: true}, (err)=> {if (err) throw err;})
}
createFolder(path.join(__dirname, 'project-dist'))

// read to Index
fsPromises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err)=> {if (err) throw err;})  
  
fs.readdir(componentsPath, enc, ((err, arr)=>{
  let templateString = '';
    fs.readFile(templatePath, enc, ((err, string) =>{
        if (err) throw err; 
    
        templateString += string;
    
    for (let i=0; i < arr.length; i++) {
    fs.readFile(path.join(__dirname, 'components', `${arr[i]}`), enc, (err, data)=>{
        if (err) throw err; 

        let regex = `{{${path.parse(arr[i]).name}}}`
        templateString = templateString.replace(regex, `${data}`)
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), `${templateString}`, ()=> {})
      })
    }  
  
  }))
}));


// read CSS

fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', ()=> {})  
const writable = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), 'utf-8')

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;

  let cssFiles = files.filter(file => path.extname(`${file}`) === '.css');

  for (let i=0; i<cssFiles.length; i++) {
    let readable = fs.createReadStream(path.join(__dirname, 'styles', `${files[i]}`), 'utf-8')
    readable.pipe(writable)
  }
})


// copy assets

async function copyFiles (currFolder, newFolder) {
  try {
  await fsPromises.mkdir(newFolder, {recursive: true})
  
  const files = await fsPromises.readdir(currFolder, { withFileTypes: true }, ()=>{})
    files.forEach(file => {
      if (file.isFile()) {
        fsPromises.copyFile(path.join(currFolder, `${file.name}`), path.join(newFolder, `${file.name}`))
      } else {
        copyFiles(path.join(currFolder, `${file.name}`), path.join(newFolder, `${file.name}`))
      }
    })
  }
  catch {
    console.log('Cannot copy folder');
  }
  }

  copyFiles (path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'))



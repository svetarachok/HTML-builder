const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, data) => {
  if (err) throw err;

  data.forEach(file => {
    if (file.isFile()) {

      fs.stat(path.join(__dirname, 'secret-folder', `${file.name}`), (err, data)=> {
        if (err) throw err ;
        let fileName = path.parse(`${file.name}`)
        console.log(fileName.name + ' -- ' + fileName.ext.slice(1) + ' -- ' + data.size/1000+'kb')
      })
    }
  })

})
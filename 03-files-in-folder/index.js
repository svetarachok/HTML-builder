const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, data) => {
  if (err) throw err;

  data.forEach(file => {
    if (file.isFile()) {

      fs.stat(path.join(__dirname, 'secret-folder', `${file.name}`), (err, data)=> {
        if (err) throw err ;

        console.log(file.name + ' -- ' + path.parse(`${file.name}`).ext + ' -- ' + data.size+'kb')
      })
    }
  })

})
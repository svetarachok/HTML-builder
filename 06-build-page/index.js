const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;


const readTemplate = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');


readTemplate.on('data', (data) => {
  
  let templateString = '';
  templateString += data.toString() 
  console.log(templateString)
  
  // let filesArr = [];
  fs.readdir(path.join(__dirname, 'components'), 'utf-8', (err, arr)=>{

    console.log(arr)


    let info = '';
    fs.readFile(path.join(__dirname, 'components', `${arr[0]}`), 'utf-8', (err, data)=>{
      info += data;
      return info
    })

    console.log(info)
    

  })
  
})




  
// fs.readdir(path.join(__dirname, 'components'), 'utf-8', ((err, arr)=>{

    // fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', ((err, string) =>{
  //   if (err) throw err; 
    
  //   templateString += string;
    
  //   for (let i=0; i<arr.length; i++) {
  //    let info = fs.readFile(path.join(__dirname, 'components', `${arr[i]}`), 'utf-8', (err, data)=>{
  //       if (err) throw err; 

  //       // console.log(string.replace(`{{${path.parse(arr[i]).name}}}`, `${data}`))
  //     return data
  //     })
  //     console.log(info)
  //   }  
    

  // }))
    
  // }));




const fs = require('fs');
const path = require('path')
const { stdin, stdout } = require('process');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt')); 

const readline = require('readline').createInterface({
  input: stdin,
  output: stdout
});

fs.writeFile(path.join(__dirname, 'text.txt'), '', ()=>{})

stdout.write('Put some text here: ')


readline.on('line', (line) => {
  if (line !== 'exit') {
    stdout.write('Please, proceed: ')
  } else {
    console.log('Bye and check the text.txt file')
    process.exit(0);
  }
})
.on('close', () => {
  console.log('Bye and check the text.txt file')
  process.exit(0);
})

process.stdin.pipe(writeStream);

// stdin.on("data", data => { 
//   writeStream.write(data)

// })
 
 




const fs = require('fs')
const jsonContent = fs.readFileSync('./data/inventory.json', 'utf8')

const position = 9968
console.log(jsonContent.substring(position - 20, position + 20))
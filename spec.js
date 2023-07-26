const os = require('os')

console.log('Free Memory in GB: ' + (os.freemem() / 1024 / 1024 / 1024))
console.log('Total Memory in GB: ' + (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB')
console.log('CPU', os.cpus());
console.log('Total Memory in GB: ' + (os.totalmem() / 1024 /)
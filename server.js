// Copy the correct environment config file.
const ENV_NAME = process.env.BOXFUSE_ENV;
console.log('Environment Name = ' + ENV_NAME);
var fs = require('fs');
fs.createReadStream('app/config/config-' + ENV_NAME + '.json').pipe(fs.createWriteStream('app/config/config.json'));

const PORT = process.env.PORT;
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(PORT, function(){
    console.log('Server running on ' + PORT);
});
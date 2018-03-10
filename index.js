const http = require("http");
const os = require("os");
const osName = require('os-name');
const osLocale = require('os-locale');

const hostname = '127.0.0.1';
const port = 3000;

/* GETTING SYSTEM INFORMATION
    ipaddress	"121.7.3.9"
    language	"en-US"
    software	"Macintosh; Intel Mac OS X 10.12; rv:60.0" */
var resultObj = {};
var netIntObj = os.networkInterfaces();
resultObj.ipaddress = netIntObj.lo0[0].address;

var cpu = os.cpus()[0].model;
var release = os.release();
var osRel = osName(os.platform(), os.release());
resultObj.software = cpu + " " + osRel + " " + release;

osLocale().then(locale => {
    resultObj.language = locale;
    console.log(resultObj);
});

// HTTP REQUESTS HANDLING
const server = http.createServer((req, res) => {
    res.write(JSON.stringify(resultObj));
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

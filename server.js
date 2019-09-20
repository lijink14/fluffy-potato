var http = require('http');
var fs = require('fs');
var path = require('path');
var hostname = 'localhost';
var port = 3000;
var server = http.createServer((req, resp) => {
    if (req.method == "GET") {
        var fileUrl;
        if (req.url == "/") { fileUrl = "/index.html"; }
        else { fileUrl = req.url; }
        var filepath = path.resolve('./' + fileUrl);
        var fileex = path.extname(filepath);
        if (fileex == ".html") {
            fs.exists(filepath, (exists) => {
                if (!exists) {
                    resp.statusMessage = "Error:file not found"
                    resp.statusCode = 404;
                    resp.setHeader('Content-Type', 'text/html');
                    resp.end('<html><h1>the file not found error</h1></html>');
                    return;
                }
                else {
                    resp.setHeader('Content-Type', 'text/html');
                    resp.statusCode = 200;
                    fs.createReadStream(filepath).pipe(resp);
                    resp.statusMessage = "Sucess";
                }
            })
        }
        else {
            resp.statusCode = 500;
            resp.statusMessage = "the file is not an html";
            resp.setHeader('Content-Type', 'text/text');
            resp.end('<html><h1>the file is not an html</h1></html>');
            return;
        }
    }
    else {
        resp.statusCode = 500;
        resp.statusMessage = "failed";
        resp.setHeader('Content-Type', 'text/html')
        resp.end('<html><h1>the method was not get</h1></html>')
        return;
    }
})
server.listen(port, hostname, () => {
    console.log(`The server is listining to the port http://${port}:${hostname}`);
})
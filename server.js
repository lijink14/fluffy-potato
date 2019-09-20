var http = require('http');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer((req,resp)=>{

    console.log("the request recieved headers"+"   "+JSON.stringify(req.headers));

    resp.statusCode=200;
    resp.statusMessage= "sucess";
    resp.setHeader('Content-Type','text/html')
    resp.end('<html><h1>Hello</h1></html>') 
})

server.listen(port,hostname,()=>{

    console.log(`The server is listining to the port http://${port}:${hostname}`);
})
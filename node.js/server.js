var http = require ("http");
var port = 3000;

http.createServer(function(req, res) {

    res.writeHead(200, {"Content-type": "text/html"});
    res.write("<h1>Hola Mundo</h1>");
    res.end();

}).listen(port);

console.log("El servidor está corriendo en el puerto" + port);


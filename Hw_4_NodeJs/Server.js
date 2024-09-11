var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var port = 8080;

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url);
    var filePath = '';

    if (parsedUrl.pathname === '/') {
        filePath = path.join(__dirname, 'pages', 'index.html');
        serveFile(filePath, 'text/html', res);
    } else if (parsedUrl.pathname === '/reg') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });

            req.on('end', function () {
                var postData = new URLSearchParams(body);
                console.log("Received Registration Data: ", Object.fromEntries(postData.entries()));

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end('<h2>Registration Successful</h2><a href="/">Back to Home</a>');
            });

            req.on('error', function (err) {
                console.error('Error processing request: ', err);
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('Internal Server Error');
            });
        } else {
            filePath = path.join(__dirname, 'pages', 'register.html');
            serveFile(filePath, 'text/html', res);
        }
    } else if (parsedUrl.pathname === '/auth') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });

            req.on('end', function () {
                var postData = new URLSearchParams(body);
                console.log("Received Login Data: ", Object.fromEntries(postData.entries()));

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end('<h2>Login Successful</h2><a href="/">Back to Home</a>');
            });

            req.on('error', function (err) {
                console.error('Error processing request: ', err);
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('Internal Server Error');
            });
        } else {
            filePath = path.join(__dirname, 'pages', 'auth.html');
            serveFile(filePath, 'text/html', res);
        }
    } else if (parsedUrl.pathname === '/about') {
        filePath = path.join(__dirname, 'pages', 'about.html');
        serveFile(filePath, 'text/html', res);
    } else if (parsedUrl.pathname === '/styles.css') {
        filePath = path.join(__dirname, 'pages', 'styles.css');
        serveFile(filePath, 'text/css', res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('Page not found');
    }
});

function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        }
    });
}

server.listen(port, function () {
    console.log('Server running on port ' + port);
});

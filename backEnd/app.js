const express = require('express');
const app = express();
var path = require('path');

//app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
    // res.sendFile('../frontEnd/index.html');
    let filePath = path.join(__dirname, '../frontEnd/index.html')
    res.sendFile(filePath)
});

app.use(express.static(path.join(__dirname, '../frontEnd')))

var port = process.env.PORT || 3000;
app.listen(port);
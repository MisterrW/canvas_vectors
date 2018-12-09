const express = require('express');
const app = express();
var path = require('path');

app.get('/', function(req, res) {
    let filePath = path.join(__dirname, '../frontEnd/index.html')
    res.sendFile(filePath)
});

app.use(express.static(path.join(__dirname, '../frontEnd')))

var port = process.env.PORT || 3000;
app.listen(port);
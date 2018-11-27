const express = require('express');
const app = express();
const products = require('./products');

app.use(express.static("assets"));

app.use('/products-list', function(req, res){
    res.json(products);
});

app.get('/', function(req, res){
    res.sendfile('index.html');
});
const PORT = process.env.port || 3001;

app.listen(PORT,function(){
    console.log('Server is running on PORT'+PORT);
})
const express = require("express");
//const cors = require("cors");
const fs = require('fs');
const app = express();
const bodyParser = require("body-parser");

// app.use(cors());

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/cart', (req, res) => {
    fs.readFile('db/userCart.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.json(JSON.parse(data));
        }
    })
});

app.put('/api/cart', (req, res) => {
    const { totalPrice, cartGoods } = req.body;
    fs.writeFile('db/userCart.json', JSON.stringify({ totalPrice, cartGoods }, null, 2), (err, data) => {
        if(err){
            res.sendStatus(500, JSON.stringify({result:0, text: err}));
        } else {
            res.json({
                totalPrice, cartGoods
            });
        }
    });
});

app.get('/api/products', (req, res) => {
    fs.readFile('db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.json(JSON.parse(data));
        }
    })
});
app.listen(3000, () => console.log("Started on 3000"))
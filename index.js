const express = require('express');
const app = express();
const port = 3000;
var fs = require ('fs');

app.use (express.static('html'));
app.use ('/', express.urlencoded({extended:true}));

var someObject = require('./bd.json')

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, access-control-allow-origin")
    next();
  });

app.get('/', (req, res) => res.send("received"));

app.post('/', (req, res) => {
    var date = fs.readFileSync("bd.json");
    var ob = JSON.parse(date);
    ob.push(req.body);
    fs.writeFileSync("bd.json", JSON.stringify(ob));
    someObject = JSON.stringify(ob);
    res.send({Status: 'OK'});

});

app.get('/info', (req, res) => {
  res.send(someObject);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
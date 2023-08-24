require('dotenv').config();
let express = require('express');
let app = express();

//app.listen(3000);

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname+'/public'));

app.get('/json', (request, response) => {
    if(process.env.MESSAGE_STYLE === 'uppercase'){
        response.json({"message":"HELLO JSON"});
    }else{
        response.json({"message":"Hello json"});
    };
});



module.exports = app;

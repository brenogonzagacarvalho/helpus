const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set("app", path.resolve(__dirname, "views/ejs"));
app.use('/css', express.static(path.resolve(__dirname,"front-end/css")));
app.use('/js', express.static(path.resolve(__dirname,"front-end/js")));
app.use('/img', express.static(path.resolve(__dirname,"front-end/img")));

app.get('/login',(req,res) =>{
    res.send();
})

//require('./app/controllers/index.js')(app);
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
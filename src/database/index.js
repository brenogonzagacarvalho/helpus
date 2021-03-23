const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/helpusdb',{ useUnifiedTopology: true } ).then((result) => {
    console.log('Banco conectado'+ result);
}).catch((err) =>{
    console.log('deu erro'+ err)
});

module.exports = mongoose;
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/helpusdb',{ 
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: tru

}).then((result) => {
    console.log('Banco conectado'+ result);
}).catch((err) =>{
    console.log('deu erro'+ err)
});

module.exports = mongoose;
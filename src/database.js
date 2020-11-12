import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/rest-api-jwt-rols",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
        .then( db => console.log('Db is connected'))
        .catch( error => console.log(error))
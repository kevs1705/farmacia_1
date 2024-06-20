const mysql = require('mysql');
const coneccion = mysql.createConnection({
    host:'farmacia.mysql.database.azure.com',
    user:'farmacia',
    password:'76515243E.',
    database:'farmacia_1'
});
//Conexión a la database
coneccion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("¡Conexión exitosa a la base de datos!");
    }
});

module.exports = coneccion;

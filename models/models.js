var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite 
var sequelize = new Sequelize(null,null,null, {dialect: "sqlite", storage: "quiz.sqlite"});


//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz=Quiz; //exportar la definición de la tabla Quiz

sequelize.sync().then(function(){
                         Quiz.count().success(function(count){
                                if(count ===0){
                                Quiz.create({pregunta: 'Capital Roma',
                                            respuesta: 'Roma'
                        }).then(function(){console.log('Base de datos inicializada');});
                        };
        });
}); 

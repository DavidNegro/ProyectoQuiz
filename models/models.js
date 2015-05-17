var path = require('path');
var url =process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user    = (url[2]||null);
var pwd     = (url[3]||null);
var protocol= (url[1]||null);
//var dialect = (url[1]||null);
var port    = (url[5]||null);
var host    = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite 
var sequelize = new Sequelize(DB_name,user,pwd, 
                              {dialect: protocol, 
                               storage: protocol,
                              port: port,
                              host: host,
                              storage: storage,
                              omitNull: true});


//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
var Comment= sequelize.import(path.join(__dirname,'comment'));

Comment.belongsTo(Quiz); //los comentarios pertenecen a los quizes
Quiz.hasMany(Comment);  //Un quiz pueede tener muchos comentariors
//Relación 1-N

exports.Quiz=Quiz; //exportar la definición de la tabla Quiz
exports.Comment=Comment; //exportamos la definición de la tabla Comment

sequelize.sync().then(function(){
                         Quiz.count().success(function(count){
                                if(count ===0){
                                Quiz.create({pregunta: 'Capital de Italia',
                                            respuesta: 'Roma'
                        }).then(function(){console.log('Base de datos inicializada');});
                        };
        });
}); 
